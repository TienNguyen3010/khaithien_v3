/**
 * Bilingual locale contract — ADR §5.1, SRS FR-011/012, BR-06.
 * Supported locales: vi (default), en. Anything else -> 404.
 */
export const locales = ['vi', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'vi'

export const localeNames: Record<Locale, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
}

export const htmlLang: Record<Locale, string> = {
  vi: 'vi',
  en: 'en',
}

export const ogLocale: Record<Locale, string> = {
  vi: 'vi_VN',
  en: 'en_US',
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

export function resolveLocale(value: unknown): Locale {
  return isLocale(value) ? value : defaultLocale
}
