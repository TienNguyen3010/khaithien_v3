import Link from 'next/link'
import type { Locale } from '@/i18n/config'

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale
  dict: {
    footer: { tagline: string; contactTitle: string; legalTitle: string; privacy: string; terms: string; copyright: string; phone: string; email: string; address: string; website: string }
    nav: Record<string, string>
  }
}) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img src="/brand/logo.png" alt="Khải Thiên" width={48} height={48} style={{ borderRadius: '50%', background: '#fff', objectFit: 'contain', marginBottom: 8 }} />
          <br />
          <strong>Khải Thiên</strong>
          <p>{dict.footer.tagline}</p>
          <p style={{ color: 'rgba(255,255,255,0.85)', margin: '4px 0' }}>{dict.footer.phone}</p>
          <p style={{ margin: '4px 0' }}><a href={`mailto:${dict.footer.email}`}>{dict.footer.email}</a></p>
          <p style={{ color: 'rgba(255,255,255,0.7)', margin: '4px 0', maxWidth: 280 }}>{dict.footer.address}</p>
          <p style={{ margin: '4px 0' }}><a href={dict.footer.website} target="_blank" rel="noopener noreferrer">{dict.footer.website}</a></p>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>© {dict.footer.copyright}</p>
        </div>
        <nav aria-label="Footer">
          <h4>{dict.footer.contactTitle}</h4>
          <ul className="site-nav" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <li><Link href={`/${locale}`}>{dict.nav.home}</Link></li>
            <li><Link href={`/${locale}/about`}>{dict.nav.about}</Link></li>
            <li><Link href={`/${locale}/services`}>{dict.nav.services}</Link></li>
            <li><Link href={`/${locale}/projects`}>{dict.nav.projects}</Link></li>
            <li><Link href={`/${locale}/contact`}>{dict.nav.contact}</Link></li>
          </ul>
        </nav>
        <div>
          <h4>{dict.footer.legalTitle}</h4>
          <ul className="site-nav" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <li><Link href={`/${locale}/privacy`}>{dict.footer.privacy}</Link></li>
            <li><Link href={`/${locale}/terms`}>{dict.footer.terms}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
