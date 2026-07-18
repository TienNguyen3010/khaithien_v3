import type { CollectionConfig } from 'payload'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: { useAsTitle: 'sourcePath', group: 'Content' },
  fields: [
    { name: 'sourcePath', type: 'text', required: true, index: true },
    { name: 'destinationPath', type: 'text', required: true },
    {
      name: 'sourceLocale',
      type: 'select',
      options: [
        { label: 'vi', value: 'vi' },
        { label: 'en', value: 'en' },
        { label: 'any', value: 'any' },
      ],
    },
    {
      name: 'destinationLocale',
      type: 'select',
      options: [
        { label: 'vi', value: 'vi' },
        { label: 'en', value: 'en' },
        { label: 'any', value: 'any' },
      ],
    },
    { name: 'statusCode', type: 'select', defaultValue: '301', options: [
      { label: '301', value: '301' },
      { label: '302', value: '302' },
    ] },
    { name: 'enabled', type: 'checkbox', defaultValue: true },
  ],
  hooks: {
    // Prevent redirect loops / cross-locale collisions (Database Design §6).
    beforeValidate: [
      ({ data }) => {
        if (data?.sourcePath && data.sourcePath === data.destinationPath) {
          throw new Error('Redirect source and destination must differ')
        }
        return data
      },
    ],
  },
  access: { read: () => true },
}

export const AuditEvents: CollectionConfig = {
  slug: 'auditEvents',
  admin: { useAsTitle: 'action', group: 'Admin' },
  fields: [
    { name: 'actor', type: 'relationship', relationTo: 'users' },
    { name: 'documentId', type: 'text' },
    { name: 'collection', type: 'text' },
    {
      name: 'locale',
      type: 'select',
      options: [
        { label: 'vi', value: 'vi' },
        { label: 'en', value: 'en' },
      ],
    },
    { name: 'action', type: 'text' },
    { name: 'previousState', type: 'text' },
    { name: 'nextState', type: 'text' },
    { name: 'occurredAt', type: 'date' },
  ],
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
  },
}
