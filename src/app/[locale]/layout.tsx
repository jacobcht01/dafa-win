import type { Metadata } from 'next'
import { Inter, Noto_Sans_Telugu } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSansTelugu = Noto_Sans_Telugu({
  subsets: ['telugu'],
  variable: '--font-noto-telugu',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dafawin.in'

  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        en: '/en/',
        te: '/te/',
        'x-default': '/en/',
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'te')) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`dark ${inter.variable} ${notoSansTelugu.variable}`}
    >
      <head>
        <link rel="alternate" hrefLang="en" href="/en/" />
        <link rel="alternate" hrefLang="te" href="/te/" />
        <link rel="alternate" hrefLang="x-default" href="/en/" />
      </head>
      <body
        className={`bg-brand-dark text-white min-h-screen ${
          locale === 'te' ? 'font-telugu' : 'font-sans'
        }`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
