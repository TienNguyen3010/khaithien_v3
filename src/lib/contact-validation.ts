import { z } from 'zod'

/**
 * Contact request schema — API Contract §4, SRS FR-006/016, BR-06.
 * submissionLocale must be in allowlist; server never trusts client locale beyond allowlist.
 */
export const contactSchema = z.object({
  name: z.string().min(1).max(200),
  company: z.string().max(200).optional().default(''),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().default(''),
  serviceInterest: z.string().max(100).optional().default(''),
  message: z.string().min(1).max(8000),
  submissionLocale: z.enum(['vi', 'en']),
  privacyConsent: z.boolean(),
  policyVersion: z.string().max(100).optional(),
  sourceUrl: z.string().max(500).optional(),
  utm: z.record(z.string()).optional(),
  website: z.string().max(200).optional().default(''), // honeypot
})

export type ContactInput = z.infer<typeof contactSchema>

export type FieldErrorCode = 'REQUIRED' | 'EMAIL_INVALID' | 'CONSENT_REQUIRED' | 'LOCALE_INVALID'

export function toFieldErrors(issues: z.ZodIssue[]): Record<string, string[]> {
  const map: Record<string, string[]> = {}
  for (const issue of issues) {
    const key = issue.path[0]?.toString() ?? 'form'
    if (!map[key]) map[key] = []
    if (issue.code === 'invalid_string' && issue.validation === 'email') map[key].push('EMAIL_INVALID')
    else map[key].push('REQUIRED')
  }
  return map
}
