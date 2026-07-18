import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getPayloadClient } from '@/lib/payload-content'

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = getDictionary(locale)

  let services: { id: string | number; title?: string; slug?: string; summary?: string }[] = []
  let projects: { id: string | number; title?: string; slug?: string; clientDisplayName?: string; year?: number }[] = []
  try {
    const payload = await getPayloadClient()
    const [svc, prj] = await Promise.all([
      payload.find({ collection: 'services', locale, limit: 6, where: { translationState: { equals: 'published' } }, fallbackLocale: false }),
      payload.find({ collection: 'projects', locale, limit: 3, where: { and: [{ translationState: { equals: 'published' } }, { isPublic: { equals: true } }] }, fallbackLocale: false }),
    ])
    services = svc.docs
    projects = prj.docs
  } catch {
    // DB may be empty in dev; render static shell
  }

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">{dict.home.heroEyebrow}</p>
          <h1>{dict.home.heroTitle}</h1>
          <p className="hero-body">{dict.home.heroBody}</p>
          <div className="hero-actions">
            <Link href={`/${locale}/contact`} className="btn btn-primary">{dict.cta.primary}</Link>
            <Link href={`/${locale}/projects`} className="btn btn-secondary" style={{ color: '#fff', borderColor: '#fff' }}>{dict.cta.viewProjects}</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">{dict.home.servicesTitle}</h2>
        <div className="card-grid">
          {services.map((s) => (
            <article key={s.id} className="card">
              <h3>{s.title || '—'}</h3>
              <p style={{ color: 'var(--color-muted)' }}>{s.summary || ''}</p>
            </article>
          ))}
          {services.length === 0 && <p style={{ color: 'var(--color-muted)' }}>{locale === 'vi' ? 'Đang cập nhật dịch vụ.' : 'Services coming soon.'}</p>}
        </div>
      </section>

      <section className="section section--ice">
        <h2 className="section-title">{dict.home.featuredProjectsTitle}</h2>
        <div className="card-grid">
          {projects.map((p) => (
            <article key={p.id} className="card">
              <h3>{p.title || '—'}</h3>
              <p className="meta">{p.clientDisplayName || ''} {p.year ? `· ${p.year}` : ''}</p>
              <Link href={`/${locale}/projects/${p.slug || p.id}`}>{dict.common.readMore}</Link>
            </article>
          ))}
          {projects.length === 0 && <p style={{ color: 'var(--color-muted)' }}>{locale === 'vi' ? 'Đang cập nhật dự án.' : 'Projects coming soon.'}</p>}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">{dict.home.approachTitle}</h2>
        <div className="card-grid">
          {([1, 2, 3, 4] as const).map((i) => (
            <article key={i} className="card">
              <h3>{`0${i}. ${dict.approach[`step${i}Title` as const]}`}</h3>
              <p style={{ color: 'var(--color-muted)' }}>{dict.approach[`step${i}Body` as const]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ textAlign: 'center' }}>
        <h2 className="section-title">{dict.home.finalCtaTitle}</h2>
        <p style={{ color: 'var(--color-muted)', maxWidth: 600, margin: '0 auto 24px' }}>{dict.home.finalCtaBody}</p>
        <Link href={`/${locale}/contact`} className="btn btn-primary">{dict.cta.primary}</Link>
      </section>
    </div>
  )
}
