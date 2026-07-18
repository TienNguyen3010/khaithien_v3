import Link from 'next/link'
import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'

// Localized 404 — rendered within [lang] layout when notFound() is called.
export default async function NotFound({ params }: { params?: Promise<{ lang: string }> }) {
  const lang = (await params?.then((p) => p.lang).catch(() => 'vi')) || 'vi'
  const locale = (lang === 'en' ? 'en' : 'vi') as Locale
  const dict = getDictionary(locale)
  return (
    <div className="container">
      <section className="section" style={{ textAlign: 'center', paddingTop: 'var(--space-24)' }}>
        <h1 className="section-title">404</h1>
        <p style={{ color: 'var(--color-muted)' }}>{dict.common.notFoundBody}</p>
        <Link href={`/${locale}`} className="btn btn-primary">{dict.common.backHome}</Link>
      </section>
    </div>
  )
}
