import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export default async function LegalPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = getDictionary(locale)
  const isPrivacy = true
  return (
    <div className="container">
      <section className="section">
        <h1 className="section-title">{isPrivacy ? dict.footer.privacy : dict.footer.terms}</h1>
        <p style={{ color: 'var(--color-muted)', maxWidth: 720 }}>
          {locale === 'vi'
            ? 'Nội dung chính sách đang được Legal Owner duyệt theo quy trình Phrase 2. Vui lòng quay lại sau.'
            : 'This policy is being reviewed by the Legal Owner per the Phase 2 process. Please check back later.'}
        </p>
      </section>
    </div>
  )
}
