import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getPayloadClient } from '@/lib/payload-content'

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = getDictionary(locale)
  let projects: { id: string | number; title?: string; slug?: string; clientDisplayName?: string; year?: number; summary?: string }[] = []
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'projects', locale, limit: 50,
      where: { and: [{ translationState: { equals: 'published' } }, { isPublic: { equals: true } }] },
      fallbackLocale: false, sort: '-year',
    })
    projects = res.docs
  } catch {}
  return (
    <div className="container">
      <section className="section">
        <h1 className="section-title">{dict.nav.projects}</h1>
        <div className="card-grid">
          {projects.map((p) => (
            <article key={p.id} className="card">
              <h3>{p.title || '—'}</h3>
              <p style={{ color: 'var(--color-muted)' }}>{p.clientDisplayName || ''} {p.year ? `· ${p.year}` : ''}</p>
              <p>{p.summary || ''}</p>
              <Link href={`/${locale}/projects/${p.slug || p.id}`}>{dict.common.readMore}</Link>
            </article>
          ))}
          {projects.length === 0 && <p style={{ color: 'var(--color-muted)' }}>{locale === 'vi' ? 'Chưa có dự án được công bố.' : 'No published projects yet.'}</p>}
        </div>
      </section>
    </div>
  )
}
