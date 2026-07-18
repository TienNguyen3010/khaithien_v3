'use client'

import { useState } from 'react'
import type { Locale } from '@/i18n/config'

type Props = {
  locale: Locale
  dict: {
    contact: {
      name: string; company: string; email: string; phone: string; service: string; message: string
      consent: string; submit: string; submitting: string
      successTitle: string; successBody: string; errorTitle: string; errorBody: string
      required: string; emailInvalid: string; consentRequired: string
    }
  }
}

export function ContactForm({ locale, dict }: Props) {
  const c = dict.contact
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrors({})
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      name: String(fd.get('name') || ''),
      company: String(fd.get('company') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      serviceInterest: String(fd.get('service') || ''),
      message: String(fd.get('message') || ''),
      submissionLocale: locale,
      privacyConsent: fd.get('consent') === 'on',
      policyVersion: `privacy-${locale}-2026-01`,
      sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
      website: String(fd.get('website') || ''),
    }
    const idem = crypto.randomUUID()
    try {
      const res = await fetch('/api/v1/contact-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idem },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        const fld = data?.error?.fields || {}
        const mapped: Record<string, string> = {}
        for (const k of Object.keys(fld)) mapped[k] = c.emailInvalid // generic; map per code in real impl
        if (!payload.privacyConsent) mapped.consent = c.consentRequired
        setErrors(mapped)
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby="form-status">
      {status === 'success' && (
        <div className="alert alert-success" id="form-status" role="status">
          <strong>{c.successTitle}</strong> {c.successBody}
        </div>
      )}
      {status === 'error' && (
        <div className="alert alert-error" id="form-status" role="alert">
          <strong>{c.errorTitle}</strong> {c.errorBody}
        </div>
      )}
      <div className="form-field">
        <label htmlFor="name">{c.name}</label>
        <input id="name" name="name" required aria-required="true" />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-field">
        <label htmlFor="company">{c.company}</label>
        <input id="company" name="company" />
      </div>
      <div className="form-field">
        <label htmlFor="email">{c.email}</label>
        <input id="email" name="email" type="email" required aria-required="true" />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="form-field">
        <label htmlFor="phone">{c.phone}</label>
        <input id="phone" name="phone" />
      </div>
      <div className="form-field">
        <label htmlFor="service">{c.service}</label>
        <input id="service" name="service" />
      </div>
      <div className="form-field">
        <label htmlFor="message">{c.message}</label>
        <textarea id="message" name="message" rows={5} required aria-required="true" />
        {errors.message && <span className="error">{errors.message}</span>}
      </div>
      {/* Honeypot — must stay empty (API Contract §4) */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
        <label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="form-field">
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontWeight: 400 }}>
          <input type="checkbox" name="consent" /> {c.consent}
        </label>
        {errors.consent && <span className="error">{errors.consent}</span>}
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
        {status === 'submitting' ? c.submitting : c.submit}
      </button>
    </form>
  )
}
