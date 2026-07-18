import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { ContactForm } from '@/components/ContactForm'

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = getDictionary(locale)
  return (
    <div className="container">
      <section className="section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)' }}>
        <div>
          <h1 className="section-title">{dict.contact.title}</h1>
          <p style={{ color: 'var(--color-muted)' }}>{dict.contact.intro}</p>
        </div>
        <div>
          <ContactForm locale={locale} dict={dict} />
        </div>
      </section>
    </div>
  )
}
