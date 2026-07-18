import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // App Router is used; no extra experimental flags required for Payload 3.x
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  env: {
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET || 'kt-dev-secret-2026-fixed-0000000000',
  },
}

export default withPayload(nextConfig)
