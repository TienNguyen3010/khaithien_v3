import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = getDictionary(lang as Locale)
  return (
    <div className="container">
      <section className="section">
        <h1 className="section-title">{dict.nav.about}</h1>
        <p style={{ maxWidth: 720, color: 'var(--color-muted)' }}>
          {lang === 'vi'
            ? 'Khải Thiên là đối tác truyền thông và giải trí, đồng hành cùng thương hiệu qua các activation, sự kiện và chiến dịch có đo lường.'
            : 'Khải Thiên is a communication and entertainment partner helping brands through measurable activation, events and campaigns.'}
        </p>
        <section className="section">
          <h2 className="section-title">{dict.home.approachTitle}</h2>
          <div className="card-grid">
            {([1, 2, 3, 4] as const).map((i) => (
              <article key={i}>
                <h3>{`0${i}. ${dict.approach[`step${i}Title` as const]}`}</h3>
                <p style={{ color: 'var(--color-muted)' }}>{dict.approach[`step${i}Body` as const]}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </div>
  )
}
