import type { CollectionConfig } from 'payload'

/**
 * Media — Database Design §6 media.
 * Localized alt/caption; rights_status gates public display.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    group: 'Content',
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 432, position: 'centre' },
      { name: 'hero', width: 1600, height: 900, position: 'centre' },
    ],
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [
    {
      name: 'rightsStatus',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Approved', value: 'approved' },
        { label: 'Pending review', value: 'pending' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: { description: 'Media rights/usage approval (Database Design §6).' },
    },
    { name: 'rightsOwner', type: 'text' },
    { name: 'rightsExpiry', type: 'date' },
    {
      name: 'isPublic',
      type: 'checkbox',
      defaultValue: true,
      label: 'Publicly displayable',
    },
    { name: 'alt', type: 'text', localized: true },
    { name: 'caption', type: 'text', localized: true },
    {
      name: 'focalPoint',
      type: 'group',
      fields: [
        { name: 'x', type: 'number' },
        { name: 'y', type: 'number' },
      ],
    },
    {
      name: 'virusScanStatus',
      type: 'select',
      defaultValue: 'not_scanned',
      options: [
        { label: 'Clean', value: 'clean' },
        { label: 'Not scanned', value: 'not_scanned' },
        { label: 'Flagged', value: 'flagged' },
      ],
    },
  ],
  access: {
    read: ({ req: { user } }) => Boolean(user),
  },
}
