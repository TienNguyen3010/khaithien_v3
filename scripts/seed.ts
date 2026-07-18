// Ensure PAYLOAD_SECRET is present for getPayload (it reads process.env directly).
if (!process.env.PAYLOAD_SECRET || process.env.PAYLOAD_SECRET.length === 0) {
  process.env.PAYLOAD_SECRET = 'kt-dev-secret-2026-fixed-0000000000'
}
import { getPayload, sanitizeConfig } from 'payload'
import config from '@/payload.config'

/**
 * Technical spike seed (Pre-Development Readiness §2, §3).
 * Seeds demo content so the public site has data to render.
 * Run: pnpm tsx scripts/seed.ts  (dev sandbox uses SQLite)
 */
async function seed() {
  const payload = await getPayload({ config: sanitizeConfig((config as any)()) })

  await payload.create({
    collection: 'services',
    data: {
      title: { vi: 'Activation', en: 'Activation' },
      slug: { vi: 'activation', en: 'activation' },
      summary: { vi: 'Tổ chức activation thương hiệu.', en: 'Brand activation programs.' },
      sortOrder: 1,
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
      sortOrder: 1,
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
      sortOrder: 2,
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
