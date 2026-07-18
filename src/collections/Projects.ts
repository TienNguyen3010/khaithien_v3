import type { CollectionConfig } from 'payload'
import {
  translationStateField,
  approvedByField,
  approvedAtField,
  seoField,
  ctaField,
} from './_shared'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: { useAsTitle: 'title', group: 'Content' },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'slug', type: 'text', localized: true, required: true, unique: true, index: true },
    { name: 'clientDisplayName', type: 'text', localized: true },
    { name: 'year', type: 'number' },
    { name: 'summary', type: 'textarea', localized: true },
    { name: 'body', type: 'richText', localized: true, label: 'Challenge / Approach / Execution' },
    { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    { name: 'featuredMedia', type: 'upload', relationTo: 'media' },
    {
      name: 'metrics',
      type: 'array',
      label: 'Outcomes / metrics',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'value', type: 'text', required: true },
        { name: 'unit', type: 'text', localized: true },
        { name: 'isPublic', type: 'checkbox', defaultValue: false },
        { name: 'sourceNote', type: 'text' },
      ],
    },
    { name: 'testimonial', type: 'group', localized: true, fields: [
      { name: 'quote', type: 'text' },
      { name: 'author', type: 'text' },
      { name: 'role', type: 'text' },
    ] },
    { name: 'isPublic', type: 'checkbox', defaultValue: false, label: 'Publicly visible' },
    seoField,
    ctaField,
    translationStateField,
    approvedByField,
    approvedAtField,
  ],
  access: { read: () => true },
}
