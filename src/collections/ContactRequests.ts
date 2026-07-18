import type { CollectionConfig } from 'payload'

export const ContactRequests: CollectionConfig = {
  slug: 'contactRequests',
  admin: { useAsTitle: 'publicReference', group: 'Leads' },
  fields: [
    { name: 'publicReference', type: 'text', unique: true, index: true },
    { name: 'name', type: 'text', required: true },
    { name: 'company', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'serviceInterestCode', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'submissionLocale',
      type: 'select',
      required: true,
      options: [
        { label: 'vi', value: 'vi' },
        { label: 'en', value: 'en' },
      ],
    },
    { name: 'policyVersion', type: 'text' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Converted', value: 'converted' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    { name: 'sourceUrl', type: 'text' },
    { name: 'utm', type: 'json' },
    { name: 'ipHash', type: 'text' },
    { name: 'userAgent', type: 'text' },
    { name: 'idempotencyKeyHash', type: 'text', index: true },
  ],
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // public creation goes through custom API, not Payload REST
  },
}

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
