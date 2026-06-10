import type { Metadata } from 'next'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { JsonLd } from '@/components/JsonLd'
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'sports' })
  const alts = pageAlternates(locale, '/sports-betting/')
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: alts.canonical,
      languages: alts.languages,
    },
  }
}

const SPORTS = [
  { sport: 'Cricket', icon: '🏏', href: '/cricket-betting' },
  { sport: 'IPL', icon: '🏆', href: '/ipl-betting' },
  { sport: 'Football', icon: '⚽', href: '/football-betting' },
  { sport: 'Kabaddi', icon: '🤼', href: '/kabaddi-betting' },
  { sport: 'Tennis', icon: '🎾', href: '/sports-betting' },
  { sport: 'Basketball', icon: '🏀', href: '/sports-betting' },
  { sport: 'Hockey', icon: '🏑', href: '/sports-betting' },
  { sport: 'Boxing', icon: '🥊', href: '/sports-betting' },
] as const

const FAQS = [
  { question: 'What sports can I bet on at DafaBet India?', answer: 'DafaBet covers cricket, IPL, football, kabaddi, tennis, basketball, and 20+ other sports.' },
  { question: 'Is sports betting legal in India?', answer: 'Online sports betting is in a legal grey area. DafaBet operates under an offshore licence valid for Indian players.' },
  { question: 'How do I start sports betting at DafaBet?', answer: 'Register an account, make a deposit via UPI or Paytm, and then navigate to the sports section to place your first bet.' },
  { question: 'Does DafaBet offer live sports betting?', answer: 'Yes, DafaBet offers comprehensive live in-play betting with real-time odds across all major sports.' },
]

function SportsBettingContent({ locale }: { locale: string }) {
  const t = useTranslations('sports')
  const tCommon = useTranslations('common')

  const pageUrl = locale === 'te' ? `${SITE_URL}/te/sports-betting/` : `${SITE_URL}/sports-betting/`

  const schemaData = [
    articleSchema({
      headline: t('title'),
      description: t('description'),
      url: pageUrl,
      datePublished: '2025-01-01',
      dateModified: new Date().toISOString().split('T')[0],
    }),
    faqSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL + '/' },
      { name: 'Sports Betting', url: pageUrl },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Hero */}
      <section className="relative h-[320px] md:h-[400px] flex items-center overflow-hidden">
        <Image
          src="/images/sports-betting.webp"
          alt="Sports Betting India"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gold-text">{t('hero_title')}</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-xl">{t('hero_subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dafabet-registration" className="btn-primary text-lg px-8 py-4">
              Start Betting
            </Link>
            <Link href="/sports-betting" className="btn-secondary text-lg px-8 py-4">
              See All Sports
            </Link>
          </div>
        </div>
      </section>

      {/* Sports grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="section-title text-center mb-10">Sports Available</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SPORTS.map(({ sport, icon, href }) => (
            <Link key={sport} href={href} className="card text-center hover:border-brand-gold/50 transition-colors block">
              <div className="text-3xl mb-2">{icon}</div>
              <span className="text-sm font-medium text-gray-300">{sport}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Live betting highlight */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="card border-brand-gold/40 bg-brand-surface text-center py-8">
          <span className="red-badge mb-4 inline-block">LIVE</span>
          <h2 className="text-2xl font-bold text-white mb-3">Live In-Play Betting</h2>
          <p className="text-gray-400">Bet on matches as they happen with real-time odds. Experience the thrill of in-play betting on cricket, football, kabaddi, and more.</p>
          <Link href="/dafabet-registration" className="btn-primary mt-6 inline-block px-8 py-3">
            Bet Live Now
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="section-title mb-8">Sports Betting FAQ</h2>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <details key={faq.question} className="card">
              <summary className="flex justify-between items-start cursor-pointer list-none py-1">
                <span className="font-semibold text-white">{faq.question}</span>
                <span className="text-brand-gold text-xl flex-shrink-0 ml-4">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}

export default async function SportsBettingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <SportsBettingContent locale={locale} />
}
