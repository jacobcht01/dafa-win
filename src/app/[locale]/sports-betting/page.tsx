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
  {
    question: 'What sports can I bet on at DafaBet India?',
    answer: 'DafaBet covers cricket, IPL, football, kabaddi, tennis, basketball, and 30+ other sports — including badminton, chess, esports, and international fixtures across every major league.',
  },
  {
    question: 'Is sports betting legal in India?',
    answer: 'Sports betting is in a legal grey area in India. There is no central law criminalising individual bets placed with offshore-licensed operators. Laws vary state by state. DafaBet operates under an offshore international licence valid for Indian players.',
  },
  {
    question: 'What is the minimum deposit at DafaBet?',
    answer: 'The minimum deposit is ₹500. You can fund your account instantly via UPI, Paytm, PhonePe, or Google Pay — funds are credited in under 60 seconds.',
  },
  {
    question: 'Does DafaBet offer live sports betting?',
    answer: 'Yes. DafaBet offers comprehensive live in-play betting with real-time odds across all major sports — cricket ball-by-ball, football goal-by-goal, tennis point-by-point, and more. Cash-out is available on most live markets.',
  },
  {
    question: 'What welcome bonus does DafaBet offer?',
    answer: 'DafaBet offers a 200% match bonus up to ₹20,000 on your first deposit. Minimum deposit to qualify is ₹500. The bonus applies to sports betting. See the DafaBet Bonus Guide for full terms.',
  },
]

const TOP_SITES = [
  { rank: '🥇 #1', site: 'DafaBet', bonus: '200% up to ₹20,000', minDeposit: '₹500', sports: '30+' },
  { rank: '#2', site: 'Betway', bonus: '100% up to ₹2,500', minDeposit: '₹1,000', sports: '35+' },
  { rank: '#3', site: '10Cric', bonus: '150% up to ₹10,000', minDeposit: '₹1,000', sports: '25+' },
  { rank: '#4', site: 'Parimatch', bonus: '100% up to ₹12,000', minDeposit: '₹300', sports: '40+' },
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
            <span className="gold-text">Sports Betting India 2026</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-xl">
            DafaBet India — cricket, football, kabaddi and more. 200% welcome bonus up to ₹20,000.
          </p>
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

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="section-title mb-2">Best Sports Betting Sites India 2026</h2>
        <p className="text-gray-400 mb-8">
          Our experts tested every major platform with real deposits. Here are the top-ranked
          sports betting sites for Indian players in 2026.
        </p>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-card text-brand-gold text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Rank</th>
                <th className="px-4 py-3 text-left">Site</th>
                <th className="px-4 py-3 text-left">Welcome Bonus</th>
                <th className="px-4 py-3 text-left">Min Deposit</th>
                <th className="px-4 py-3 text-left">Sports</th>
              </tr>
            </thead>
            <tbody>
              {TOP_SITES.map((row, i) => (
                <tr key={row.site} className={i % 2 === 0 ? 'bg-brand-bg/50' : ''}>
                  <td className="px-4 py-3 text-brand-gold font-bold">{row.rank}</td>
                  <td className="px-4 py-3 text-white font-semibold">{row.site}</td>
                  <td className="px-4 py-3 text-gray-300">{row.bonus}</td>
                  <td className="px-4 py-3 text-gray-300">{row.minDeposit}</td>
                  <td className="px-4 py-3 text-gray-300">{row.sports}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-gray-500 text-xs mt-3 px-4 pb-4">
            *Data as of June 2026. Always check current terms on each site.
          </p>
        </div>
      </section>

      {/* Sports grid */}
      <section className="bg-brand-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-10">Sports Available</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SPORTS.map(({ sport, icon, href }) => (
              <Link key={sport} href={href} className="card text-center hover:border-brand-gold/50 transition-colors block">
                <div className="text-3xl mb-2">{icon}</div>
                <span className="text-sm font-medium text-gray-300">{sport}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live betting highlight */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
      <section className="bg-brand-surface py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
