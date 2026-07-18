import type { CollectionConfig } from 'payload'

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
