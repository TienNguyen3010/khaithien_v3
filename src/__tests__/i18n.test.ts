import { describe, it, expect } from 'vitest'
import { locales, isLocale, resolveLocale, defaultLocale } from '@/i18n/config'

describe('i18n contract (ADR §5.1, SRS BR-06, I18N matrix)', () => {
  it('I18N-01/02: only vi and en are valid, others -> default', () => {
    expect(isLocale('vi')).toBe(true)
    expect(isLocale('en')).toBe(true)
    expect(isLocale('fr')).toBe(false)
    expect(isLocale('EN')).toBe(false)
    expect(resolveLocale('fr')).toBe(defaultLocale)
  })

  it('default locale is vi', () => {
    expect(defaultLocale).toBe('vi')
  })

  it('allowlist has exactly two locales', () => {
    expect(locales).toEqual(['vi', 'en'])
  })
})

describe('localized-url (ADR §5.4, §9)', () => {
  it('builds prefixed URLs without mixed-locale fallback', () => {
    const { localizedUrl } = require('@/lib/localized-url')
    expect(localizedUrl('vi', 'projects/x')).toBe('/vi/projects/x')
    expect(localizedUrl('en', '/about')).toBe('/en/about')
    expect(localizedUrl('vi')).toBe('/vi')
  })

  it('switch preserves base path, only changes prefix', () => {
    const { switchLocaleUrl } = require('@/lib/localized-url')
    expect(switchLocaleUrl('vi', 'en', '/projects/sample')).toBe('/en/projects/sample')
  })
})
