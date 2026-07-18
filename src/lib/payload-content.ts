import { getPayload, sanitizeConfig } from 'payload'
import config from '@/payload.config'

export async function getPayloadClient() {
  return getPayload({ config: sanitizeConfig((config as any)()) })
}
