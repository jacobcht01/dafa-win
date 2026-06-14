import type { Metadata } from 'next'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { JsonLd } from '@/components/JsonLd'
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const alts = pageAlternates(locale, '/t20-world-cup-betting/')
  return {
    title: 'T20 World Cup Betting — Odds, Markets & Best Sites | DafaWin',
    description:
      "Indian punter's guide to betting on the ICC T20 World Cup — format, markets, outright strategy, and where to bet.",
    alternates: { canonical: alts.canonical, languages: alts.languages },
  }
}

function T20WorldCupBettingContent({ locale }: { locale: string }) {
  const pageUrl =
    locale === 'te'
      ? `${SITE_URL}/te/t20-world-cup-betting/`
      : `${SITE_URL}/t20-world-cup-betting/`

  const faqs = [
    {
      question: 'When does the T20 World Cup happen?',
      answer:
        'The ICC schedules it roughly every two years; exact dates published ahead of each edition.',
    },
    {
      question: 'How early can I bet outrights?',
      answer:
        'Most operators open outright markets months out. Earliest prices are softer; sharper prices arrive as squad announcements approach.',
    },
    {
      question: 'What is the minimum deposit at DafaBet?',
      answer:
        '₹500 across UPI, Paytm, PhonePe, and net banking. 200% welcome bonus up to ₹20,000 credits automatically.',
    },
    {
      question: 'Does DafaBet cover ICC live betting?',
      answer:
        'Yes. In-play coverage includes next-over runs, next-batter dismissal, runs-in-the-over markets plus rolling match winner prices.',
    },
  ]

  const schemaData = [
    articleSchema({
      headline: 'T20 World Cup Betting — Odds, Markets & Best Sites | DafaWin',
      description:
        "Indian punter's guide to betting on the ICC T20 World Cup — format, markets, outright strategy, and where to bet.",
      url: pageUrl,
      datePublished: '2025-01-01',
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'T20 World Cup Betting', url: pageUrl },
    ]),
  ]

  const markets = [
    {
      title: 'Outright Tournament Winner',
      desc: '₹500 at 5.00 returns ₹2,500. Outrights settle at the final.',
    },
    {
      title: 'Top Run-Scorer',
      desc: 'Volume favours openers from sides that go deep. ₹500 at 9.00 returns ₹4,500.',
    },
    {
      title: 'Top Wicket-Taker',
      desc: 'Frontline seamers of long-run sides win this most often.',
    },
    {
      title: 'India Match Winner',
      desc: 'Per-match for every Indian fixture. Tight margin means a fair read.',
    },
    {
      title: 'Group Stage Outright',
      desc: 'Cheaper to price than the trophy. Good entry-level market.',
    },
  ]

  const strategyTips = [
    {
      title: 'Time Your Entry',
      desc: 'Prices move most at squad announcement and after opening round games.',
    },
    {
      title: 'Target Deep-Run Sides',
      desc: 'Top scorer/wicket-taker reward picking sides that go deep in the tournament.',
    },
    {
      title: 'Group Outrights First',
      desc: 'Group-stage outrights are cheaper to read than the trophy — a good starting point.',
    },
    {
      title: 'Hosting Edge',
      desc: 'Hosting matters at the margins — market typically prices it correctly, so look for value elsewhere.',
    },
    {
      title: 'Line-Shop Outrights',
      desc: 'Line-shop outrights if you hold accounts at multiple operators to secure the best price.',
    },
  ]

  const steps = [
    {
      title: 'Open DafaBet Account',
      desc: 'Register with your real name and address — KYC will check these at withdrawal.',
    },
    {
      title: 'Deposit via UPI',
      desc: 'Minimum ₹500 via UPI. The 200% welcome bonus credits automatically — no code needed.',
    },
    {
      title: 'Navigate to Cricket',
      desc: 'Open the cricket section. The T20 World Cup hub appears at the top during the tournament.',
    },
    {
      title: 'Choose Your Market',
      desc: 'Outright winner and India match winner are solid starting points for new punters.',
    },
    {
      title: 'Place Your Bet',
      desc: "Enter your stake, confirm, and place. Your bet appears immediately under 'My Bets'.",
    },
  ]

  const operators = [
    {
      name: 'DafaBet',
      recommended: true,
      coverage: 'Full tournament, outrights to props',
      liveBetting: 'Yes',
      offer: '200% up to ₹20,000 (min ₹500)',
    },
    {
      name: 'Bet365',
      recommended: false,
      coverage: 'Wide market depth',
      liveBetting: 'Yes',
      offer: 'Varies',
    },
    {
      name: 'Betway',
      recommended: false,
      coverage: 'Core markets',
      liveBetting: 'Yes',
      offer: 'Check site',
    },
    {
      name: '10Cric',
      recommended: false,
      coverage: 'India-focused',
      liveBetting: 'Yes',
      offer: 'Check site',
    },
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Hero */}
      <section className="relative h-[350px] md:h-[420px] overflow-hidden">
        <Image
          src="/images/sports-betting.webp"
          alt="T20 World Cup betting guide for Indian fans"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <span className="red-badge mb-4">ICC T20 WORLD CUP</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-xl">
            T20 World Cup <span className="gold-text">Betting</span>
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-md">
            Odds, markets, outright strategy, and where to bet for Indian fans.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/dafabet-registration" className="btn-primary">
              Bet on the T20 World Cup →
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
          <h2 className="section-title mb-2">Best T20 World Cup Betting Sites</h2>
          <p className="text-gray-400 mb-8">
            Operators ranked by tournament coverage, live-betting depth, and payout speed for Indian
            accounts.
          </p>
          <div className="bg-brand-dark border border-brand-border rounded-xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-brand-card text-brand-gold text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Operator</th>
                  <th className="px-4 py-3 text-left">Coverage</th>
                  <th className="px-4 py-3 text-left">Live Betting</th>
                  <th className="px-4 py-3 text-left">Welcome Offer</th>
                </tr>
              </thead>
              <tbody>
                {operators.map((op, i) => (
                  <tr key={op.name} className={i % 2 === 0 ? 'bg-brand-bg/50' : ''}>
                    <td className="px-4 py-3 font-semibold text-white">
                      {op.name}
                      {op.recommended && (
                        <span className="ml-2 text-xs bg-brand-gold/20 text-brand-gold rounded px-1.5 py-0.5">
                          Recommended
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-300">{op.coverage}</td>
                    <td className="px-4 py-3 text-gray-300">{op.liveBetting}</td>
                    <td className="px-4 py-3 text-gray-300">{op.offer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-gray-500 text-xs px-4 pb-4 pt-2">
              *Offers subject to change. Always verify current terms on the operator's site.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Markets */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">Popular T20 World Cup Markets</h2>
          <p className="text-gray-400 mb-8">
            Five markets that attract the most volume — and what the numbers mean in practice.
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

      {/* Format Overview */}
      <section className="bg-brand-surface py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-6">T20 World Cup Format</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                Each innings is capped at 20 overs per side, with a Super Over used to break ties.
                Teams progress through group stages into knockout rounds; squads name 15 players for
                the tournament.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Six nations have won the trophy: India (2007, 2024), England, West Indies (2 titles
                each), Australia, Pakistan, and Sri Lanka. No side has won back-to-back editions.
              </p>
            </div>
            <div className="card">
              <p className="text-brand-gold font-bold mb-4">Format at a Glance</p>
              <ul className="text-gray-400 text-sm space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">▸</span>
                  <span>20 overs per side — fastest major international format</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">▸</span>
                  <span>Super Over decides ties — any team can win in one over</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">▸</span>
                  <span>Groups feed into knockouts; squad size is 15 players</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">▸</span>
                  <span>Six different champions to date — parity keeps odds competitive</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-gold mt-0.5">▸</span>
                  <span>No side has retained the title — back-to-back wins are uncharted</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Outright Strategy */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">Outright Betting Strategy</h2>
          <p className="text-gray-400 mb-8">
            Outright markets reward research done before the market sharpens. Five principles to
            keep your edge.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategyTips.map((tip) => (
              <div key={tip.title} className="card-hover">
                <h3 className="text-brand-gold font-bold mb-2">{tip.title}</h3>
                <p className="text-gray-400 text-sm">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Bet Steps */}
      <section className="bg-brand-surface py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-10 text-center">How to Bet on the T20 World Cup</h2>
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
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8">T20 World Cup Betting FAQ</h2>
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
          alt="Bet on the ICC T20 World Cup at DafaBet"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">
            Bet on the T20 World Cup at DafaBet
          </h2>
          <Link href="/dafabet-registration" className="btn-primary w-full max-w-xs md:w-auto">
            Claim 200% Welcome Bonus
          </Link>
        </div>
      </section>
    </>
  )
}

export default async function T20WorldCupBettingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <T20WorldCupBettingContent locale={locale} />
}
