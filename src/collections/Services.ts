import type { CollectionConfig } from 'payload'
import {
  translationStateField,
  approvedByField,
  approvedAtField,
  seoField,
  ctaField,
} from './_shared'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title', group: 'Content' },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'slug', type: 'text', localized: true, required: true, unique: true, index: true },
    { name: 'summary', type: 'textarea', localized: true },
    { name: 'body', type: 'richText', localized: true },
    { name: 'deliverables', type: 'array', localized: true, fields: [{ name: 'item', type: 'text' }] },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
    { name: 'iconKey', type: 'text', admin: { description: 'Stable icon identifier for UI.' } },
    seoField,
    ctaField,
    translationStateField,
    approvedByField,
    approvedAtField,
  ],
  access: { read: () => true },
}
