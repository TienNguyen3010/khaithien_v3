import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    group: 'Admin',
  },
  auth: true,
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Publisher', value: 'publisher' },
        { label: 'Reviewer', value: 'reviewer' },
      ],
    },
  ],
  access: {
    admin: ({ req: { user } }) => Boolean(user?.roles?.includes('admin')),
    read: () => true,
  },
}
