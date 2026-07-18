import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = getDictionary(locale)
  const isVi = locale === 'vi'

  const values = [
    {
      titleVi: 'Tư duy lớn',
      titleEn: 'Big thinking',
      bodyVi: 'Mỗi chiến dịch bắt đầu từ một ý tưởng có tầm nhìn, không chỉ làm cho xong.',
      bodyEn: 'Every campaign starts with a visionary idea, not just getting it done.',
    },
    {
      titleVi: 'Thực thi tin cậy',
      titleEn: 'Reliable execution',
      bodyVi: 'Từ set up đến từng khung hình — chuẩn bị chỉn chu, đúng tiến độ, đúng ngân sách.',
      bodyEn: 'From setup to every frame — carefully prepared, on schedule, on budget.',
    },
    {
      titleVi: 'Kết quả đo lường được',
      titleEn: 'Measurable outcomes',
      bodyVi: 'Chúng tôi theo dõi và tối ưu dựa trên dữ liệu thực tế, không chỉ cảm tính.',
      bodyEn: 'We track and optimize on real data, not just intuition.',
    },
  ]

  const team = [
    { img: '/brand/team-uniform.png', capVi: 'Đội ngũ đồng phục Khải Thiên C&E', capEn: 'Khải Thiên C&E uniformed team' },
    { img: '/brand/office-team.png', capVi: 'Văn phòng làm việc năng lượng', capEn: 'Energetic office workspace' },
    { img: '/brand/team-meeting-1.png', capVi: 'Cuộc họp trao đổi ý tưởng', capEn: 'Brainstorming meeting' },
    { img: '/brand/filming-meeting.png', capVi: 'Đội quay phim sự kiện', capEn: 'Event filming crew' },
  ]

  return (
    <div className="container">
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <img src="/brand/logo.png" alt="Khải Thiên" width={96} height={96} style={{ borderRadius: '50%', background: '#fff', objectFit: 'contain', marginBottom: 16 }} />
          <h1>{isVi ? 'Về Khải Thiên' : 'About Khải Thiên'}</h1>
          <p className="hero-body">
            {isVi
              ? 'Khải Thiên Communication & Entertainment – Giải quyết mọi vấn đề truyền thông và giải trí từ A – Z.'
              : 'Khải Thiên Communication & Entertainment – Solving every communication & entertainment need end to end.'}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <h2 className="section-title">{isVi ? 'Sứ mệnh' : 'Our Mission'}</h2>
        <p style={{ maxWidth: 760, color: 'var(--color-muted)', fontSize: '1.1rem' }}>
          {isVi
            ? 'Khải Thiên giúp thương hiệu kết nối khách hàng qua activation, sự kiện và truyền thông có bằng chứng. Chúng tôi đồng hành cùng khách hàng từ kịch bản, tổ chức đến đo lường kết quả.'
            : 'Khải Thiên helps brands connect with customers through proven activation, events and communication. We partner with clients from script and organization to measured results.'}
        </p>
      </section>

      {/* Values */}
      <section className="section section--ice">
        <h2 className="section-title">{isVi ? 'Giá trị cốt lõi' : 'Core Values'}</h2>
        <div className="card-grid">
          {values.map((v) => (
            <article key={v.titleEn} className="card">
              <h3 style={{ color: 'var(--color-navy)' }}>{isVi ? v.titleVi : v.titleEn}</h3>
              <p style={{ color: 'var(--color-muted)' }}>{isVi ? v.bodyVi : v.bodyEn}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <h2 className="section-title">{isVi ? 'Đội ngũ & Thực tế' : 'Our Team in Action'}</h2>
        <div className="card-grid">
          {team.map((t) => (
            <figure key={t.img} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <img src={t.img} alt={isVi ? t.capVi : t.capEn} style={{ width: '100%', height: 240, objectFit: 'cover', display: 'block' }} />
              <figcaption style={{ padding: 'var(--space-4)', color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                {isVi ? t.capVi : t.capEn}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center' }}>
        <h2 className="section-title">{isVi ? 'Sẵn sàng bắt đầu?' : 'Ready to start?'}</h2>
        <p style={{ color: 'var(--color-muted)', maxWidth: 600, margin: '0 auto 24px' }}>
          {isVi ? 'Hãy trao đổi để chúng tôi đề xuất hướng đi phù hợp.' : 'Let’s talk and we’ll propose the right direction.'}
        </p>
        <Link href={`/${locale}/contact`} className="btn btn-primary">{dict.cta.primary}</Link>
      </section>
    </div>
  )
}
