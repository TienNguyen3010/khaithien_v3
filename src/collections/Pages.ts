import type { CollectionConfig } from 'payload'
import {
  translationStateField,
  approvedByField,
  approvedAtField,
  seoField,
  ctaField,
} from './_shared'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title', group: 'Content' },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      localized: true,
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'template',
      type: 'select',
      defaultValue: 'generic',
      options: [
        { label: 'Generic', value: 'generic' },
        { label: 'Home', value: 'home' },
        { label: 'About', value: 'about' },
        { label: 'Services', value: 'services' },
        { label: 'Contact', value: 'contact' },
        { label: 'Privacy', value: 'privacy' },
        { label: 'Terms', value: 'terms' },
      ],
    },
    { name: 'summary', type: 'textarea', localized: true },
    { name: 'layout', type: 'blocks', localized: true, blocks: [] },
    seoField,
    ctaField,
    translationStateField,
    approvedByField,
    approvedAtField,
  ],
  access: {
    read: () => true,
  },
}
