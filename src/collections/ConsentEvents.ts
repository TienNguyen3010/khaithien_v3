import type { CollectionConfig } from 'payload'

export const ConsentEvents: CollectionConfig = {
  slug: 'consentEvents',
  admin: { useAsTitle: 'contactRequest', group: 'Leads' },
  fields: [
    { name: 'contactRequest', type: 'relationship', relationTo: 'contactRequests' },
    { name: 'consentType', type: 'text' },
    { name: 'policyVersion', type: 'text' },
    {
      name: 'consentLocale',
      type: 'select',
      options: [
        { label: 'vi', value: 'vi' },
        { label: 'en', value: 'en' },
      ],
    },
    { name: 'granted', type: 'checkbox', defaultValue: true },
    { name: 'occurredAt', type: 'date' },
    { name: 'ipHash', type: 'text' },
    { name: 'userAgent', type: 'text' },
  ],
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: () => false,
    delete: () => false,
  },
}
