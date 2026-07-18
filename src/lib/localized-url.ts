import type { Locale } from '@/i18n/config'

/**
 * Build a localized public URL for a route + optional slug (ADR §5.4, §9).
 * Server-side derivation from document identity + localized slug; never
 * string-substitutes the slug (ADR §9).
 */
export function localizedUrl(locale: Locale, path = ''): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  return `/${locale}${clean === '/' ? '' : clean}`
}

export function switchLocaleUrl(
  currentLocale: Locale,
  targetLocale: Locale,
  basePath: string,
): string {
  // basePath is like "/projects/sample" without locale prefix
  return localizedUrl(targetLocale, basePath)
}

export const localePrefix = (locale: Locale) => `/${locale}`
