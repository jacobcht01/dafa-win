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
  { question: 'What football leagues can I bet on?', answer: 'DafaBet covers ISL, Premier League, La Liga, Serie A, Bundesliga, Champions League, and more than 50 other leagues worldwide.' },
  { question: 'What is the minimum deposit?', answer: '₹500 via UPI, Paytm, PhonePe, or Google Pay. Funds appear instantly before kick-off.' },
  { question: 'Is live betting available for football?', answer: 'Yes. DafaBet offers live in-play football betting with real-time odds on all major matches, including ISL, Premier League, and Champions League fixtures.' },
  { question: 'What welcome bonus is available?', answer: 'New players receive a 200% match bonus up to ₹20,000 on their first deposit. See our DafaBet bonus page for full T&Cs.' },
]

const COMPARISON_SITES = [
  { rank: '🥇 #1', site: 'DafaBet', bonus: '200% up to ₹20,000', minDeposit: '₹500', leagues: 'ISL, EPL, UCL, 50+ more', highlight: true },
  { rank: '#2', site: 'Betway', bonus: '100% up to ₹2,500', minDeposit: '₹1,000', leagues: 'EPL, UCL, selected ISL', highlight: false },
  { rank: '#3', site: 'Bet365', bonus: 'Refer-a-friend offer', minDeposit: '₹500', leagues: 'All major leagues', highlight: false },
  { rank: '#4', site: '10Cric', bonus: '150% up to ₹10,000', minDeposit: '₹1,000', leagues: 'EPL, UCL, headline ISL', highlight: false },
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
            <span className="gold-text">Football Betting India 2026</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-xl">Football betting at DafaBet India — ISL, Premier League and Champions League odds, with UPI deposits and a 200% welcome bonus up to ₹20,000.</p>
          <Link href="/dafabet-registration" className="btn-primary text-lg px-8 py-4">
            Bet on Football →
          </Link>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">Best Football Betting Sites in India 2026</h2>
          <p className="text-gray-400 mb-8">Compare the top sites for ISL, Premier League, and Champions League betting.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-border">
                  <th className="text-left py-3 px-4 text-brand-gold font-semibold">Rank</th>
                  <th className="text-left py-3 px-4 text-brand-gold font-semibold">Site</th>
                  <th className="text-left py-3 px-4 text-brand-gold font-semibold">Welcome Bonus</th>
                  <th className="text-left py-3 px-4 text-brand-gold font-semibold">Min Deposit</th>
                  <th className="text-left py-3 px-4 text-brand-gold font-semibold">Leagues Covered</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_SITES.map((row) => (
                  <tr
                    key={row.site}
                    className={`border-b border-brand-border ${row.highlight ? 'bg-brand-surface' : ''}`}
                  >
                    <td className="py-3 px-4 text-white font-semibold">{row.rank}</td>
                    <td className="py-3 px-4">
                      <span className={`font-bold ${row.highlight ? 'text-brand-gold' : 'text-white'}`}>
                        {row.site}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{row.bonus}</td>
                    <td className="py-3 px-4 text-gray-300">{row.minDeposit}</td>
                    <td className="py-3 px-4 text-gray-300">{row.leagues}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-center">
            <Link href="/dafabet-registration" className="btn-primary">
              Claim 200% Bonus at DafaBet →
            </Link>
          </div>
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
