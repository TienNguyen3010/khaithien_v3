import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

const SERVICES = [
  {
    key: 'event',
    titleVi: 'Tổ chức sự kiện trọn gói',
    titleEn: 'Full-package Event Organization',
    img: '/brand/event-grand-opening.png',
    descVi:
      'Hội nghị khách hàng, Họp báo, Khai trương, Tiệc Tất niên – Tân niên. Khải Thiên lo từ A – Z: kịch bản, sân khấu, trang trí, nhân sự và điều phối chuyên nghiệp.',
    descEn:
      'Customer conferences, press conferences, grand openings, year-end & new-year parties. Khải Thiên handles A–Z: script, stage, decor, staffing and on-site coordination.',
  },
  {
    key: 'booking',
    titleVi: 'Booking Ca sĩ, Nghệ sĩ, KOLs',
    titleEn: 'Artist, Celebrity & KOL Booking',
    img: '/brand/team-uniform.png',
    descVi:
      'Biểu diễn, Chụp hình, Quảng cáo, Livestream. Kết nối nhanh với ca sĩ, nghệ sĩ và KOLs phù hợp thông điệp thương hiệu của bạn.',
    descEn:
      'Performances, photo shoots, advertising, livestreams. Fast connection to singers, artists and KOLs that fit your brand message.',
  },
  {
    key: 'staffing',
    titleVi: 'Cung cấp nhân sự',
    titleEn: 'Event Staffing',
    img: '/brand/office-team.png',
    descVi:
      'Vũ đoàn, nhóm múa, PG, lễ tân, MC. Đội ngũ được đào tạo, chỉn chu và sẵn sàng đồng hành cùng mọi sự kiện.',
    descEn:
      'Dance troupe, dancers, PGs, receptionists, MCs. A trained, polished team ready to support any event.',
  },
  {
    key: 'tvc',
    titleVi: 'Quay / Dựng TVC, Viral clip',
    titleEn: 'TVC & Viral Video Production',
    img: '/brand/tvc-production.png',
    descVi:
      'Sản xuất TVC quảng cáo, viral video, phim doanh nghiệp, video sản phẩm. Đội ngũ sáng tạo – chuyên nghiệp – giàu kinh nghiệm, thiết bị điện ảnh hiện đại.',
    descEn:
      'TVC ads, viral videos, corporate films, product videos. Creative, professional, experienced crew with modern cinematic equipment.',
  },
  {
    key: 'rental',
    titleVi: 'Cho thuê thiết bị sự kiện',
    titleEn: 'Event Equipment Rental',
    img: '/brand/filming-meeting.png',
    descVi:
      'Âm thanh, ánh sáng, màn hình LED và các dịch vụ kỹ thuật khác. Thiết bị chất lượng, lắp đặt và vận hành bởi kỹ thuật viên chuyên môn.',
    descEn:
      'Sound, lighting, LED screens and other technical services. Quality gear, installed and operated by skilled technicians.',
  },
]

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = lang as Locale
  const dict = getDictionary(locale)
  const isVi = locale === 'vi'
  return (
    <div className="container">
      <section className="section">
        <h1 className="section-title">{dict.nav.services}</h1>
        <p style={{ color: 'var(--color-muted)', maxWidth: 720 }}>
          {isVi
            ? 'Khải Thiên Media & Entertainment giải quyết mọi vấn đề truyền thông từ A – Z. Dưới đây là 5 nhóm dịch vụ cốt lõi.'
            : 'Khải Thiên Media & Entertainment solves every communication need end to end. Here are our 5 core service groups.'}
        </p>

        <div style={{ display: 'grid', gap: 'var(--space-12)', marginTop: 'var(--space-8)' }}>
          {SERVICES.map((svc, i) => (
            <article
              key={svc.key}
              className="card"
              style={{
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr',
                gap: 'var(--space-8)',
                alignItems: 'center',
                padding: 'var(--space-8)',
              }}
            >
              <img
                src={svc.img}
                alt={isVi ? svc.titleVi : svc.titleEn}
                style={{ width: '100%', borderRadius: 'var(--radius)', objectFit: 'cover', maxHeight: 320 }}
              />
              <div>
                <h2 style={{ color: 'var(--color-navy)', marginTop: 0 }}>
                  {i + 1}. {isVi ? svc.titleVi : svc.titleEn}
                </h2>
                <p style={{ color: 'var(--color-muted)' }}>{isVi ? svc.descVi : svc.descEn}</p>
                <Link href={`/${locale}/contact`} className="btn btn-primary" style={{ marginTop: 8 }}>
                  {dict.cta.primary}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
