import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getPayloadClient } from '@/lib/payload-content'

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const locale = lang as Locale
  const dict = getDictionary(locale)
  let article: { id: string | number; title?: string; excerpt?: string } | null = null
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'articles', locale, limit: 1, where: { and: [{ slug: { equals: slug } }, { translationState: { equals: 'published' } }] }, fallbackLocale: false })
    article = res.docs[0] || null
  } catch {}
  if (!article) notFound()
  return (
    <div className="container">
      <section className="section">
        <h1 className="section-title">{article.title || '—'}</h1>
        <p style={{ maxWidth: 720, color: 'var(--color-muted)' }}>{article.excerpt || ''}</p>
        <Link href={`/${locale}/insights`} className="btn btn-secondary">{dict.nav.insights}</Link>
      </section>
    </div>
  )
}
