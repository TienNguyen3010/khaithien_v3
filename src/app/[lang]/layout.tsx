import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import '../globals.css'

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export const metadata: Metadata = {
  title: 'Khải Thiên Communication & Entertainment',
  description: 'Big thinking. Reliable execution. Measurable outcomes.',
  icons: {
    icon: '/brand/logo.png',
    apple: '/brand/logo.png',
  },
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = getDictionary(locale)

  return (
    <html lang={locale === 'vi' ? 'vi' : 'en'}>
      <body>
        <a href="#main" className="skip-link">{locale === 'vi' ? 'Bỏ qua đến nội dung' : 'Skip to content'}</a>
        <SiteHeader locale={locale} dict={dict} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  )
}
