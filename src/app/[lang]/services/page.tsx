import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getPayloadClient } from '@/lib/payload-content'

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = getDictionary(locale)
  let services: { id: string | number; title?: string; slug?: string; summary?: string }[] = []
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'services', locale, limit: 50, where: { translationState: { equals: 'published' } }, fallbackLocale: false, sort: 'sortOrder' })
    services = res.docs
  } catch {}
  return (
    <div className="container">
      <section className="section">
        <h1 className="section-title">{dict.nav.services}</h1>
        <div className="card-grid">
          {services.map((s) => (
            <article key={s.id} className="card">
              <h3>{s.title || '—'}</h3>
              <p style={{ color: 'var(--color-muted)' }}>{s.summary || ''}</p>
              <Link href={`/${locale}/contact`}>{dict.cta.primary}</Link>
            </article>
          ))}
          {services.length === 0 && <p style={{ color: 'var(--color-muted)' }}>{locale === 'vi' ? 'Đang cập nhật dịch vụ.' : 'Services coming soon.'}</p>}
        </div>
      </section>
    </div>
  )
}
