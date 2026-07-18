import 'server-only'
import type { Locale } from './config'
import vi from './vi.json'
import en from './en.json'

export type Dictionary = typeof vi

const dictionaries: Record<Locale, Dictionary> = {
  vi: vi as Dictionary,
  en: en as Dictionary,
}

/**
 * Server-only dictionary loader (ADR §5.2, §12).
 * Both locale dictionaries share the same key set by construction; the shape
 * check at build time ensures no key drift between vi and en.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
