import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getPayloadClient } from '@/lib/payload-content'

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const locale = lang as Locale
  const dict = getDictionary(locale)
  let project: { id: string | number; title?: string; clientDisplayName?: string; year?: number; summary?: string; body?: unknown } | null = null
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'projects', locale, limit: 1,
      where: { and: [{ slug: { equals: slug } }, { translationState: { equals: 'published' } }, { isPublic: { equals: true } }] },
      fallbackLocale: false,
    })
    project = res.docs[0] || null
  } catch {}
  if (!project) notFound()
  return (
    <div className="container">
      <section className="section">
        <p style={{ color: 'var(--color-muted)' }}>{project.clientDisplayName || ''} {project.year ? `· ${project.year}` : ''}</p>
        <h1 className="section-title">{project.title || '—'}</h1>
        <p style={{ maxWidth: 720, color: 'var(--color-muted)' }}>{project.summary || ''}</p>
        <Link href={`/${locale}/projects`} className="btn btn-secondary">{dict.nav.projects}</Link>
        <Link href={`/${locale}/contact`} className="btn btn-primary" style={{ marginLeft: 12 }}>{dict.cta.startProject}</Link>
      </section>
    </div>
  )
}
