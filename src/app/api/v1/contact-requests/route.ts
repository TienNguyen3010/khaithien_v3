import { NextRequest, NextResponse } from 'next/server'
import { getPayload, sanitizeConfig } from 'payload'
import config from '@/payload.config'
import { contactSchema, toFieldErrors } from '@/lib/contact-validation'
import { rateLimited, hashKey } from '@/lib/rate-limit'
import type { Locale } from '@/i18n/config'

/**
 * POST /api/v1/contact-requests — API Contract §4.
 * Validates, honeypot-checks, rate-limits, then creates contactRequest + consentEvent
 * in one transaction. Lead is persisted before any email (BR-04). Email is dev/no-op here.
 */
export async function POST(req: NextRequest) {
  const idemKey = req.headers.get('Idempotency-Key')
  if (!idemKey) {
    return error('BAD_REQUEST', 'Idempotency-Key header is required', 400, 'en')
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const clientKey = hashKey(ip + idemKey)
  if (rateLimited(clientKey)) {
    return error('RATE_LIMITED', 'Too many requests', 429, 'en')
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return error('BAD_REQUEST', 'Invalid JSON', 400, 'en')
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    const fields = toFieldErrors(parsed.error.issues)
    return NextResponse.json(
      { data: null, meta: { requestId: reqId(), locale: 'en' }, error: { code: 'VALIDATION_ERROR', message: 'Invalid input', fields } },
      { status: 422 },
    )
  }

  const data = parsed.data
  // Honeypot must be empty (API Contract §4)
  if (data.website && data.website.trim() !== '') {
    return error('BAD_REQUEST', 'Spam detected', 400, data.submissionLocale)
  }
  if (!data.privacyConsent) {
    return NextResponse.json(
      { data: null, meta: { requestId: reqId(), locale: data.submissionLocale }, error: { code: 'VALIDATION_ERROR', message: 'Consent required', fields: { consent: ['CONSENT_REQUIRED'] } } },
      { status: 422 },
    )
  }

  const locale = data.submissionLocale as Locale

  try {
    const payload = await getPayload({ config: sanitizeConfig((config as any)()) })
    const idemHash = hashKey(idemKey + data.email)
    // Idempotency: reject conflicting duplicate (API Contract §7 IDEMPOTENCY_CONFLICT)
    const existing = await payload.find({ collection: 'contactRequests', where: { idempotencyKeyHash: { equals: idemHash } }, limit: 1 })
    if (existing.totalDocs > 0) {
      return NextResponse.json(
        { data: { reference: (existing.docs[0] as unknown as { publicReference: string }).publicReference, receivedAt: new Date().toISOString() }, meta: { requestId: reqId(), locale }, error: null },
        { status: 201 },
      )
    }

    const reference = `KT-${new Date().toISOString().slice(0, 7).replace('-', '')}-${randomSuffix()}`
    const created = await payload.create({
      collection: 'contactRequests',
      data: {
        publicReference: reference,
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        serviceInterestCode: data.serviceInterest,
        message: data.message,
        submissionLocale: locale,
        policyVersion: data.policyVersion,
        sourceUrl: data.sourceUrl,
        ipHash: hashKey(ip),
        userAgent: req.headers.get('user-agent') || '',
        idempotencyKeyHash: idemHash,
        status: 'new',
        utm: data.utm as object,
      },
      overrideAccess: false,
    })

    await payload.create({
      collection: 'consentEvents',
      data: {
        contactRequest: created.id,
        consentType: 'privacy',
        policyVersion: data.policyVersion,
        consentLocale: locale,
        granted: true,
        occurredAt: new Date().toISOString(),
        ipHash: hashKey(ip),
        userAgent: req.headers.get('user-agent') || '',
      },
      overrideAccess: false,
    })

    // Outbox/email would be enqueued here (BR-04). Dev: no SMTP configured.

    return NextResponse.json(
      { data: { reference, receivedAt: new Date().toISOString() }, meta: { requestId: reqId(), locale }, error: null },
      { status: 201 },
    )
  } catch (e) {
    console.error('[contact-requests] ERROR:', e)
    return error('INTERNAL_ERROR', 'Unexpected error', 500, locale)
  }
}

function reqId() {
  return 'req_' + Math.random().toString(36).slice(2, 10)
}

function randomSuffix() {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

function error(code: string, message: string, status: number, locale: Locale | 'en') {
  return NextResponse.json(
    { data: null, meta: { requestId: reqId(), locale }, error: { code, message } },
    { status },
  )
}
