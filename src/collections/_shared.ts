import type { Field } from 'payload'

/**
 * Per-locale publication/translation workflow (Database Design §8).
 * States: missing -> draft -> in_review -> approved -> published -> archived.
 */
export const translationStateField: Field = {
  name: 'translationState',
  type: 'select',
  localized: true,
  defaultValue: 'draft',
  options: [
    { label: 'Missing', value: 'missing' },
    { label: 'Draft', value: 'draft' },
    { label: 'In review', value: 'in_review' },
    { label: 'Approved', value: 'approved' },
    { label: 'Published', value: 'published' },
    { label: 'Archived', value: 'archived' },
  ],
  admin: { description: 'Translation/readiness state per locale (SRS US-07).' },
}

export const approvedByField: Field = {
  name: 'approvedBy',
  type: 'relationship',
  relationTo: 'users',
  localized: true,
  admin: { description: 'Reviewer who approved this locale.' },
}

export const approvedAtField: Field = {
  name: 'approvedAt',
  type: 'date',
  localized: true,
}

export const seoField: Field = {
  name: 'seo',
  type: 'group',
  localized: true,
  label: 'SEO',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'ogTitle', type: 'text' },
    { name: 'ogDescription', type: 'textarea' },
  ],
}

export const richTextField: Field = {
  name: 'body',
  type: 'richText',
  localized: true,
  label: 'Body',
}

export const ctaField: Field = {
  name: 'cta',
  type: 'group',
  localized: true,
  label: 'Call to action',
  fields: [
    { name: 'label', type: 'text' },
    { name: 'href', type: 'text' },
  ],
}
