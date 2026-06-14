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
  const t = await getTranslations({ locale, namespace: 'kabaddi' })
  const alts = pageAlternates(locale, '/kabaddi-betting//')
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: alts.canonical, languages: alts.languages },
  }
}

const PKL_TEAMS = [
  { name: 'Patna Pirates', icon: '⚔️', desc: 'Three-time PKL champions' },
  { name: 'Jaipur Pink Panthers', icon: '🐆', desc: 'Inaugural PKL champions' },
  { name: 'UP Yoddhas', icon: '🛡️', desc: 'Top contenders every season' },
  { name: 'Puneri Paltan', icon: '🏅', desc: 'Pune\'s PKL powerhouse' },
]

const PKL_MARKET_TYPES = [
  { name: 'Match Winner', desc: 'Bet on which team wins the PKL match. Two-way market with competitive overround.' },
  { name: 'Total Points', desc: 'Over/under on the combined points scored by both teams across the full 40 minutes.' },
  { name: 'Top Raider', desc: 'Pick the match\'s highest-scoring raider. Available on all marquee PKL fixtures at DafaBet.' },
  { name: 'Handicap', desc: 'One team gets a virtual points head start. Levels the field when one side is a heavy favourite.' },
  { name: 'Live In-Play', desc: 'Match winner and total points markets stay open through all 40 minutes with live repricing.' },
  { name: 'Super Tackle Props', desc: 'Will there be a super tackle? A specialist market available on selected PKL fixtures.' },
]

const MARKETS = [
  { name: 'Match Winner', desc: 'Bet on which team wins the PKL match.' },
  { name: 'Points Handicap', desc: 'Handicap betting to level the competition.' },
  { name: 'Total Points', desc: 'Bet over or under the total combined points.' },
  { name: 'Top Raider', desc: 'Predict the match\'s highest-scoring raider.' },
]

const FAQS = [
  { question: 'What is the best site for Kabaddi betting?', answer: 'DafaBet is our #1 pick — full PKL market coverage with live in-play betting on every match, including top raider, top defender, and total points markets.' },
  { question: 'What kabaddi markets are available?', answer: 'DafaBet offers match winner, total points, top raider, handicap, and live in-play markets. Marquee PKL fixtures also carry super-tackle props and first-team-to-30-points markets.' },
  { question: 'What is the minimum deposit?', answer: '₹500 via UPI, Paytm, PhonePe, or Google Pay. Funds appear instantly so you are ready before the opening raid.' },
  { question: 'What welcome bonus is available?', answer: 'New players receive a 200% match bonus up to ₹20,000 on their first deposit at DafaBet. See the DafaBet bonus page for full T&Cs.' },
]

function KabaddiBettingContent({ locale }: { locale: string }) {
  const t = useTranslations('kabaddi')
  const tCommon = useTranslations('common')

  const pageUrl = locale === 'te' ? `${SITE_URL}/te/kabaddi-betting/` : `${SITE_URL}/kabaddi-betting/`

  const schemaData = [
    faqSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL + '/' },
      { name: 'Kabaddi Betting', url: pageUrl },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Hero */}
      <section className="relative h-[320px] md:h-[400px] flex items-center overflow-hidden">
        <Image
          src="/images/sports-betting.webp"
          alt="Kabaddi Betting India"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="red-badge mb-4 inline-block">PKL LIVE</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gold-text">Kabaddi Betting India 2026</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-xl">Pro Kabaddi League betting at DafaBet India — full PKL markets, in-play coverage, UPI deposits and a 200% welcome bonus up to ₹20,000.</p>
          <Link href="/dafabet-registration" className="btn-primary text-lg px-8 py-4">
            Bet on Kabaddi →
          </Link>
        </div>
      </section>

      {/* PKL Teams */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="section-title text-center mb-10">Pro Kabaddi League Teams</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PKL_TEAMS.map((team) => (
            <div key={team.name} className="card text-center">
              <div className="text-3xl mb-3">{team.icon}</div>
              <h3 className="font-semibold text-brand-gold mb-1">{team.name}</h3>
              <p className="text-gray-400 text-sm">{team.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PKL Market Types */}
      <section className="bg-brand-surface py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">PKL Market Types at DafaBet</h2>
          <p className="text-gray-400 mb-8">Full breakdown of the kabaddi betting markets available on Pro Kabaddi League at DafaBet India.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PKL_MARKET_TYPES.map((market) => (
              <div key={market.name} className="card-hover">
                <h3 className="font-semibold text-brand-gold mb-2">{market.name}</h3>
                <p className="text-gray-400 text-sm">{market.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="section-title text-center mb-10">Kabaddi Betting Markets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <h2 className="section-title mb-8">Kabaddi Betting FAQ</h2>
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

export default async function KabaddiBettingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <KabaddiBettingContent locale={locale} />
}
