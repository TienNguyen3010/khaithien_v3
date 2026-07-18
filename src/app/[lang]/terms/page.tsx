import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = getDictionary(locale)
  return (
    <div className="container">
      <section className="section">
        <h1 className="section-title">{dict.footer.terms}</h1>
        <p style={{ color: 'var(--color-muted)', maxWidth: 720 }}>
          {locale === 'vi'
            ? 'Điều khoản sử dụng đang được cập nhật. Vui lòng quay lại sau.'
            : 'Terms of use are being updated. Please check back later.'}
        </p>
      </section>
    </div>
  )
}
