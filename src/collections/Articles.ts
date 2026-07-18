import type { CollectionConfig } from 'payload'
import {
  translationStateField,
  approvedByField,
  approvedAtField,
  seoField,
} from './_shared'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: { useAsTitle: 'title', group: 'Content' },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'slug', type: 'text', localized: true, required: true, unique: true, index: true },
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'body', type: 'richText', localized: true },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    { name: 'author', type: 'text' },
    { name: 'publishedDate', type: 'date' },
    { name: 'featuredMedia', type: 'upload', relationTo: 'media' },
    seoField,
    translationStateField,
    approvedByField,
    approvedAtField,
  ],
  access: { read: () => true },
}
