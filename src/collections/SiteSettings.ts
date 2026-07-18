import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  admin: { group: 'Content' },
  fields: [
    { name: 'siteName', type: 'text', localized: true, defaultValue: 'Khải Thiên' },
    {
      name: 'defaultSeo',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    { name: 'contactEmail', type: 'email' },
    { name: 'contactPhone', type: 'text' },
    { name: 'contactAddress', type: 'text', localized: true },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    { name: 'headerCtaLabel', type: 'text', localized: true },
    { name: 'headerCtaHref', type: 'text', localized: true },
  ],
}
