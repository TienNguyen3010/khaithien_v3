import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getPayloadClient } from '@/lib/payload-content'

export default async function InsightsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = getDictionary(locale)
  let articles: { id: string | number; title?: string; slug?: string; excerpt?: string; publishedDate?: string }[] = []
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'articles', locale, limit: 50, where: { translationState: { equals: 'published' } }, fallbackLocale: false, sort: '-publishedDate' })
    articles = res.docs
  } catch {}
  return (
    <div className="container">
      <section className="section">
        <h1 className="section-title">{dict.nav.insights}</h1>
        <div className="card-grid">
          {articles.map((a) => (
            <article key={a.id} className="card">
              <h3>{a.title || '—'}</h3>
              <p style={{ color: 'var(--color-muted)' }}>{a.excerpt || ''}</p>
              <Link href={`/${locale}/insights/${a.slug || a.id}`}>{dict.common.readMore}</Link>
            </article>
          ))}
          {articles.length === 0 && <p style={{ color: 'var(--color-muted)' }}>{locale === 'vi' ? 'Chưa có bài viết.' : 'No insights yet.'}</p>}
        </div>
      </section>
    </div>
  )
}
