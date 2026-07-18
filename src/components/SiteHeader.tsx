'use client'

import Link from 'next/link'
import type { Locale } from '@/i18n/config'

const navKeys = ['home', 'about', 'services', 'projects', 'insights', 'contact'] as const

export function LanguageSwitcher({
  locale,
  dict,
}: {
  locale: Locale
  dict: { nav: Record<string, string>; languageSwitcher: { label: string; current: string; switchTo: string } }
}) {
  const other: Locale = locale === 'vi' ? 'en' : 'vi'
  return (
    <span className="lang-switch" role="group" aria-label={dict.languageSwitcher.label}>
      <Link href={`/${locale}`} aria-current={locale === 'vi' ? 'true' : undefined} className={locale === 'vi' ? 'active' : ''}>
        VI
      </Link>
      <span aria-hidden="true">|</span>
      <Link href={`/${other}`} aria-label={dict.languageSwitcher.switchTo} className={other === 'vi' ? 'active' : ''}>
        EN
      </Link>
    </span>
  )
}

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale
  dict: { nav: Record<string, string>; languageSwitcher: { label: string; current: string; switchTo: string }; cta: { primary: string } }
}) {
  return (
    <header className="site-header">
      <Link href={`/${locale}`} className="brand" aria-label="Khải Thiên Communication & Entertainment">
        <img src="/brand/logo.png" alt="Khải Thiên Communication & Entertainment" className="brand-logo" width={40} height={38} />
        <strong>Khải Thiên</strong>
      </Link>
      <nav aria-label="Primary">
        <ul className="site-nav">
          {navKeys.map((key) => (
            <li key={key}>
              <Link href={`/${locale}/${key === 'home' ? '' : key}`.replace(/\/$/, '') || `/${locale}`}>
                {dict.nav[key]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <LanguageSwitcher locale={locale} dict={dict} />
        <Link href={`/${locale}/contact`} className="btn btn-primary">
          {dict.cta.primary}
        </Link>
      </div>
    </header>
  )
}
