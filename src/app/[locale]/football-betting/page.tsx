import type { Metadata } from 'next'
import Image from 'next/image'
import { pageAlternates, SITE_URL } from '@/lib/seo'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { JsonLd } from '@/components/JsonLd'
import { faqSchema, breadcrumbSchema } from '@/lib/schema'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'football' })
  const alts = pageAlternates(locale, '/football-betting//')
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: alts.canonical, languages: alts.languages },
  }
}

const LEAGUES = [
  { name: 'ISL', icon: '🏆', desc: 'Indian Super League — top football odds' },
  { name: 'EPL', icon: '🌍', desc: 'English Premier League — best markets' },
  { name: 'La Liga', icon: '⚽', desc: 'Spanish football top odds' },
  { name: 'Champions League', icon: '🔵', desc: 'Europe\'s biggest club competition' },
]

const MARKETS = [
  { name: 'Match Winner', desc: 'Bet on the full-time result of any match.' },
  { name: 'Both Teams Score', desc: 'Predict if both teams will find the net.' },
  { name: 'Over/Under 2.5', desc: 'Wager on total goals in the game.' },
  { name: 'Asian Handicap', desc: 'Level the playing field with handicap betting.' },
  { name: 'First Scorer', desc: 'Pick which player scores the opening goal.' },
  { name: 'Half Time/Full Time', desc: 'Predict the result at half time and full time.' },
]

const FAQS = [
  { question: 'Is football betting legal in India?', answer: 'Online football betting exists in a legal grey area in India. DafaBet operates under an international offshore licence accepted by Indian players.' },
  { question: 'Which football leagues can I bet on at DafaBet?', answer: 'You can bet on ISL, Premier League, La Liga, Champions League, Bundesliga, Serie A, and over 50 other football leagues worldwide.' },
  { question: 'Does DafaBet offer live football betting?', answer: 'Yes, DafaBet offers full in-play football betting with real-time odds updates on all major matches.' },
  { question: 'What is the minimum football bet at DafaBet?', answer: 'Minimum bet starts at ₹10 for most pre-match football markets and ₹20 for in-play markets.' },
]

function FootballBettingContent({ locale }: { locale: string }) {
  const t = useTranslations('football')
  const tCommon = useTranslations('common')

  const pageUrl = locale === 'te' ? `${SITE_URL}/te/football-betting/` : `${SITE_URL}/football-betting/`

  const schemaData = [
    faqSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL + '/' },
      { name: 'Football Betting', url: pageUrl },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Hero */}
      <section className="relative h-[320px] md:h-[400px] flex items-center overflow-hidden">
        <Image
          src="/images/sports-betting.webp"
          alt="Football Betting India"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="red-badge mb-4 inline-block">LIVE FOOTBALL</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gold-text">{t('hero_title')}</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-xl">{t('hero_subtitle')}</p>
          <Link href="/dafabet-registration" className="btn-primary text-lg px-8 py-4">
            Bet on Football →
          </Link>
        </div>
      </section>

      {/* Leagues */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="section-title text-center mb-10">Top Football Leagues</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {LEAGUES.map((league) => (
            <div key={league.name} className="card text-center">
              <div className="text-3xl mb-3">{league.icon}</div>
              <h3 className="font-semibold text-brand-gold mb-1">{league.name}</h3>
              <p className="text-gray-400 text-sm">{league.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Markets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="section-title text-center mb-10">Football Betting Markets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MARKETS.map((market) => (
            <div key={market.name} className="card-hover">
              <h3 className="font-semibold text-brand-gold mb-2">{market.name}</h3>
              <p className="text-gray-400 text-sm">{market.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="section-title mb-8">Football Betting FAQ</h2>
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

export default async function FootballBettingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <FootballBettingContent locale={locale} />
}
