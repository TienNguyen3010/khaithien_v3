import { getPayload, sanitizeConfig } from 'payload'
import config from '@/payload.config'

/**
 * Technical spike seed (Pre-Development Readiness §2, §3).
 * Seeds:
 *  - One project with BOTH vi and en published (localized slug/title/body differ).
 *  - One project published in vi only (en missing) to validate no mixed-language fallback.
 *  - One service per locale.
 * Run: pnpm tsx scripts/seed.ts  (dev sandbox uses SQLite)
 */
async function seed() {
  const payload = await getPayload({ config: config as any })

  await payload.create({
    collection: 'services',
    data: {
      title: { vi: 'Activation', en: 'Activation' },
      slug: { vi: 'activation', en: 'activation' },
      summary: { vi: 'Tổ chức activation thương hiệu.', en: 'Brand activation programs.' },
      translationState: { vi: 'published', en: 'published' },
    },
    overrideAccess: true,
  })

  await payload.create({
    collection: 'projects',
    data: {
      title: { vi: 'Chiến dịch Tết 2026', en: 'Tet 2026 Campaign' },
      slug: { vi: 'chien-dich-tet-2026', en: 'tet-2026-campaign' },
      clientDisplayName: { vi: 'Khách hàng A', en: 'Client A' },
      year: 2026,
      summary: { vi: 'Activation Tết đa kênh.', en: 'Multi-channel Tet activation.' },
      isPublic: true,
      translationState: { vi: 'published', en: 'published' },
    },
    overrideAccess: true,
  })

  await payload.create({
    collection: 'projects',
    data: {
      title: { vi: 'Sự kiện ra mắt sản phẩm', en: '' },
      slug: { vi: 'su-kien-ra-mat', en: '' },
      clientDisplayName: { vi: 'Khách hàng B', en: '' },
      year: 2026,
      summary: { vi: 'Launch event tại TP.HCM.', en: '' },
      isPublic: true,
      translationState: { vi: 'published', en: 'missing' },
    },
    overrideAccess: true,
  })

  console.log('Seed complete: 1 service, 2 projects (1 fully bilingual, 1 vi-only).')
  process.exit(0)
}

seed().catch((e) => {
  console.error(e)
  process.exit(1)
})
