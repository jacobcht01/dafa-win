import type { Metadata } from 'next'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { JsonLd } from '@/components/JsonLd'
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

const PAGE_TITLE =
  'India vs Pakistan Betting — Where to Bet, Best Markets & Odds | DafaWin'
const PAGE_DESCRIPTION =
  'Where Indian punters can bet on India vs Pakistan, which markets matter, and an honest look at head-to-head context. Reviewed by Rahul Sharma.'
const PAGE_SLUG = '/india-vs-pakistan-betting/'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const alts = pageAlternates(locale, PAGE_SLUG)
  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    alternates: { canonical: alts.canonical, languages: alts.languages },
  }
}

const faqs = [
  {
    question: 'Where can I bet on India vs Pakistan in India?',
    answer:
      'DafaBet is the recommended operator for IND vs PAK betting. Open an account, deposit via UPI, and find the fixture in the cricket section.',
  },
  {
    question: 'What is the best market for IND vs PAK betting?',
    answer:
      'Match winner is the entry point. Top batter and total runs are better for informed bettors who know the conditions and squad.',
  },
  {
    question: 'What is the minimum deposit at DafaBet?',
    answer: '₹500 across UPI, Paytm, PhonePe, and net banking.',
  },
  {
    question: 'How many markets does DafaBet offer for IND vs PAK?',
    answer:
      '200+ markets per fixture including match winner, top batter, top bowler, total runs, and live in-play markets.',
  },
]

const operators = [
  {
    name: 'DafaBet',
    recommended: true,
    markets: '200+ markets per fixture',
    live: 'Yes',
    offer: '200% up to ₹20,000 (min ₹500)',
  },
  {
    name: 'Bet365',
    recommended: false,
    markets: 'Wide market depth',
    live: 'Yes',
    offer: 'Varies',
  },
  {
    name: 'Betway',
    recommended: false,
    markets: 'Core markets',
    live: 'Yes',
    offer: 'Check site',
  },
  {
    name: '10Cric',
    recommended: false,
    markets: 'India-focused',
    live: 'Yes',
    offer: 'Check site',
  },
]

const markets = [
  {
    title: 'Match Winner',
    desc: 'The headline market. A ₹500 stake at 1.85 returns ₹925.',
  },
  {
    title: 'Top Batter',
    desc: 'Back a specific batter to top-score. Bigger prices, higher variance.',
  },
  {
    title: 'Top Bowler',
    desc: 'Frontline seamers and lead spinners dominate. Prices drift wider on change bowlers.',
  },
  {
    title: 'Total Runs',
    desc: 'Set as a line by operator. Pitch, dew, and toss matter more than H2H record.',
  },
  {
    title: 'Method of Dismissal',
    desc: 'Caught, bowled, LBW, run-out. A novelty market — prices are correct but rarely an edge.',
  },
]

const h2hStats = [
  { format: 'ODIs', summary: 'Pakistan lead 73–58 (136 ODIs)' },
  { format: 'T20Is', summary: 'India lead 14–3 (17 T20Is)' },
  { format: 'Tests', summary: 'Pakistan lead 12–9 with 38 draws (59 Tests)' },
  { format: '50-over World Cups', summary: 'India won all 8 meetings' },
]

const steps = [
  { title: 'Open DafaBet account', desc: 'Register in minutes with your mobile number or email.' },
  {
    title: 'Deposit via UPI (min ₹500)',
    desc: '200% bonus credits are applied automatically on your first deposit.',
  },
  {
    title: 'Open cricket section, find IND vs PAK fixture',
    desc: 'Browse pre-match and live listings — IND vs PAK fixtures are pinned at the top.',
  },
  {
    title: 'Choose market — match winner is the standard starting point',
    desc: 'Select from 200+ markets ranging from match winner to ball-by-ball live options.',
  },
  {
    title: 'Enter stake (start small), confirm and place bet',
    desc: 'Review your betslip, confirm odds, and submit. Winnings are credited instantly after settlement.',
  },
]

function IndiaVsPakistanBettingContent({ locale }: { locale: string }) {
  const pageUrl =
    locale === 'te'
      ? `${SITE_URL}/te${PAGE_SLUG}`
      : `${SITE_URL}${PAGE_SLUG}`

  const schemaData = [
    articleSchema({
      headline: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: pageUrl,
      datePublished: '2025-01-01',
      dateModified: '2026-06-14',
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Cricket Betting', url: `${SITE_URL}/cricket-betting/` },
      { name: 'India vs Pakistan Betting', url: pageUrl },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Hero */}
      <section className="relative h-[350px] md:h-[420px] overflow-hidden">
        <Image
          src="/images/sports-betting.webp"
          alt="India vs Pakistan cricket betting at DafaBet India"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <span className="red-badge mb-4">🏏 IND vs PAK</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-2xl">
            India vs Pakistan <span className="gold-text">Betting</span>
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-md">
            Where to bet on IND vs PAK, which markets matter, and head-to-head context.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/dafabet-registration" className="btn-primary">
              Bet on IND vs PAK →
            </Link>
            <Link href="/cricket-betting" className="btn-secondary">
              All Cricket Markets
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sites Comparison Table */}
      <section className="bg-brand-surface py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">Best Sites to Bet on IND vs PAK</h2>
          <p className="text-gray-400 mb-8">
            Operators ranked for Indian punters looking to bet on India vs Pakistan fixtures.
          </p>
          <div className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-brand-card text-brand-gold text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Operator</th>
                  <th className="px-4 py-3 text-left">Markets</th>
                  <th className="px-4 py-3 text-left">Live Betting</th>
                  <th className="px-4 py-3 text-left">Welcome Offer</th>
                </tr>
              </thead>
              <tbody>
                {operators.map((op, i) => (
                  <tr
                    key={op.name}
                    className={i % 2 === 0 ? 'bg-brand-bg/50' : ''}
                  >
                    <td className="px-4 py-3 font-semibold text-white">
                      {op.name}
                      {op.recommended && (
                        <span className="ml-2 text-xs bg-brand-gold/20 text-brand-gold rounded px-1.5 py-0.5">
                          Recommended
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-300">{op.markets}</td>
                    <td className="px-4 py-3 text-gray-300">{op.live}</td>
                    <td className="px-4 py-3 text-gray-300">{op.offer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-gray-500 text-xs mt-3 px-4 pb-4">
              *Data as of 2026. Always check current terms before depositing.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Markets */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">Popular IND vs PAK Betting Markets</h2>
          <p className="text-gray-400 mb-8">
            The markets that matter most when India meets Pakistan — with honest notes on where edge exists.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {markets.map((m) => (
              <div key={m.title} className="card-hover">
                <h3 className="text-brand-gold font-bold mb-2">{m.title}</h3>
                <p className="text-gray-400 text-sm">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Head-to-Head History */}
      <section className="bg-brand-surface py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">India vs Pakistan — Historical Head-to-Head</h2>
          <p className="text-gray-400 mb-8">
            Context before you bet: the long H2H record is useful for format-specific markets,
            but recent form and conditions carry more weight on match day.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {h2hStats.map((stat) => (
              <div key={stat.format} className="card text-center">
                <p className="text-brand-gold font-bold text-sm uppercase tracking-wide mb-2">
                  {stat.format}
                </p>
                <p className="text-white text-sm">{stat.summary}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-brand-card border border-brand-border rounded-lg p-4">
            <p className="text-gray-400 text-sm">
              <span className="text-brand-gold font-semibold">Betting note:</span> India&apos;s
              perfect 8–0 record in 50-over World Cup encounters is the most-cited stat, but
              tournament knockout pressure and neutral venues make each fixture its own entity.
              T20I dominance (14–3 to India) is more relevant for short-format betting.
            </p>
          </div>
        </div>
      </section>

      {/* How to Bet */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-10 text-center">
            How to Bet on India vs Pakistan at DafaBet
          </h2>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={step.title} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center font-bold text-black">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/dafabet-registration" className="btn-primary">
              Open DafaBet Account →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-surface py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8">India vs Pakistan Betting FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="card">
                <summary className="font-semibold text-white cursor-pointer list-none flex justify-between">
                  {faq.question}
                  <span className="text-brand-gold ml-3">+</span>
                </summary>
                <p className="text-gray-400 mt-3 text-sm">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative h-[220px] overflow-hidden">
        <Image
          src="/images/sports-betting.webp"
          alt="Bet on India vs Pakistan at DafaBet"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">
            Ready to Bet on the Biggest Rivalry in Cricket?
          </h2>
          <Link href="/dafabet-registration" className="btn-primary w-full max-w-xs md:w-auto">
            Claim 200% Bonus at DafaBet
          </Link>
        </div>
      </section>
    </>
  )
}

export default async function IndiaVsPakistanBettingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <IndiaVsPakistanBettingContent locale={locale} />
}
