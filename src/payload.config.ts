import 'dotenv/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

import { locales, defaultLocale } from '@/i18n/config'
import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Services } from '@/collections/Services'
import { Projects } from '@/collections/Projects'
import { Articles } from '@/collections/Articles'
import { Categories } from '@/collections/Categories'
import { ContactRequests } from '@/collections/ContactRequests'
import { ConsentEvents } from '@/collections/ConsentEvents'
import { Redirects } from '@/collections/Redirects'
import { AuditEvents } from '@/collections/AuditEvents'
import { SiteSettings } from '@/collections/SiteSettings'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default function buildConfig() {
  return {
    admin: {
      user: Users.slug,
      importMap: {
        baseDir: path.resolve(__dirname),
      },
    },
    collections: [
      Users,
      Media,
      Pages,
      Services,
      Projects,
      Articles,
      Categories,
      ContactRequests,
      ConsentEvents,
      Redirects,
      AuditEvents,
    ],
    globals: [SiteSettings],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET && process.env.PAYLOAD_SECRET.length > 0
      ? process.env.PAYLOAD_SECRET
      : 'kt-dev-secret-2026-fixed-0000000000',
    typescript: {
      outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    // Pre-Development Readiness §2: PostgreSQL adapter is the locked production choice.
    // For local/dev without Postgres, fall back to SQLite.
    //  - Docker: volume mounts ./data -> /data  (persistent DB)
    //  - Local: /data may not exist -> fall back to ./khaithien_v3.db in project root
    db: process.env.DATABASE_URL
      ? postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL } })
      : sqliteAdapter({
          client: {
            url: process.env.SQLITE_FILE
              || (fs.existsSync('/data')
                ? 'file:/data/khaithien_v3.db'
                : 'file:' + path.resolve(__dirname, 'khaithien_v3.db')),
          },
        }),
    sharp,
    plugins: [],
    localization: {
      locales: locales.map((code) => ({
        code,
        label: code === 'vi' ? 'Tiếng Việt' : 'English',
      })),
      defaultLocale,
      fallback: false,
    },
  }
}
