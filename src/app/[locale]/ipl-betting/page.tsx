import type { Metadata } from 'next'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { JsonLd } from '@/components/JsonLd'
import { articleSchema, sportsEventSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ipl' })
  const alts = pageAlternates(locale, '/ipl-betting/')
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: alts.canonical,
      languages: alts.languages,
    },
  }
}

function IplBettingContent({ locale }: { locale: string }) {
  const t = useTranslations('ipl')
  const tCommon = useTranslations('common')

  const faqs = [
    { question: 'What is the best site for IPL betting?', answer: 'DafaBet is our #1 pick — 500+ markets per match including ball-by-ball live betting, UPI deposits from ₹500, and a 200% welcome bonus up to ₹20,000.' },
    { question: 'How many markets does DafaBet offer per IPL match?', answer: 'DafaBet offers 500+ markets per IPL match, including ball-by-ball live betting, top batter, top bowler, fall-of-wicket bands, toss winner, and player of the match.' },
    { question: 'Can I bet on IPL live?', answer: 'Yes. DafaBet offers comprehensive live in-play betting on all IPL matches with real-time odds updates ball-by-ball.' },
    { question: 'What is the minimum deposit?', answer: '₹500 via UPI, Paytm, or PhonePe. Funds appear instantly so you never miss the toss.' },
    { question: 'Which IPL team has the best odds in 2026?', answer: 'Odds change daily based on form, injuries, and match conditions — visit DafaBet for current prices on all 10 IPL 2026 teams.' },
  ]

  const schemaData = [
    articleSchema({
      headline: t('title'),
      description: t('description'),
      url: locale === 'te' ? `${SITE_URL}/te/ipl-betting/` : `${SITE_URL}/ipl-betting/`,
      datePublished: '2025-01-01',
      dateModified: new Date().toISOString().split('T')[0],
    }),
    sportsEventSchema({
      name: 'IPL 2026 — Indian Premier League',
      description: 'Indian Premier League cricket tournament 2026 season.',
      url: locale === 'te' ? `${SITE_URL}/te/ipl-betting/` : `${SITE_URL}/ipl-betting/`,
      startDate: '2026-03-22',
      endDate: '2026-05-25',
      location: 'India',
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL + '/' },
      { name: 'Cricket Betting', url: `${SITE_URL}/cricket-betting/` },
      { name: 'IPL Betting', url: locale === 'te' ? `${SITE_URL}/te/ipl-betting/` : `${SITE_URL}/ipl-betting/` },
    ]),
  ]

  const iplTeams = [
    { code: 'MI', name: 'Mumbai Indians' },
    { code: 'CSK', name: 'Chennai Super Kings' },
    { code: 'RCB', name: 'Royal Challengers Bengaluru' },
    { code: 'KKR', name: 'Kolkata Knight Riders' },
    { code: 'DC', name: 'Delhi Capitals' },
    { code: 'PBKS', name: 'Punjab Kings' },
    { code: 'RR', name: 'Rajasthan Royals' },
    { code: 'SRH', name: 'Sunrisers Hyderabad' },
    { code: 'LSG', name: 'Lucknow Super Giants' },
    { code: 'GT', name: 'Gujarat Titans' },
  ]

  const markets = [
    { title: 'Match Winner', desc: 'Best IPL odds on match winner markets at DafaBet India.' },
    { title: 'Top Batsman', desc: 'Pick the highest scorer across any IPL innings.' },
    { title: 'Top Bowler', desc: 'Back the bowler who takes the most wickets.' },
    { title: 'Total Runs', desc: 'Over/under on total runs in an IPL match.' },
    { title: 'Player of the Match', desc: 'Predict the star performer before a ball is bowled.' },
    { title: 'Live In-Play', desc: 'Real-time odds on every over during IPL matches.' },
  ]

  const comparisonSites = [
    { rank: '🥇 #1', site: 'DafaBet', bonus: '200% up to ₹20,000', minDeposit: '₹500', markets: '500+ per match', highlight: true },
    { rank: '#2', site: 'Betway', bonus: '100% up to ₹2,500', minDeposit: '₹1,000', markets: '200+ per match', highlight: false },
    { rank: '#3', site: '10Cric', bonus: '150% up to ₹10,000', minDeposit: '₹1,000', markets: '150+ per match', highlight: false },
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Hero */}
      <section className="relative h-[350px] md:h-[420px] overflow-hidden">
        <Image
          src="/images/sports-betting.webp"
          alt="IPL betting at DafaBet India"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <span className="red-badge mb-4">🏆 IPL 2026 — LIVE BETTING</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-xl">
            <span className="gold-text">IPL Betting 2026</span>
          </h1>
          <p className="text-gray-300 text-lg mb-2 max-w-md">Best IPL 2026 betting odds, team analysis, and player props — 200% welcome bonus up to ₹20,000 at DafaBet.</p>
          <p className="text-brand-red font-semibold text-sm mb-6">⚡ IPL season live now!</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/dafabet-registration" className="btn-red">
              Bet on IPL Now →
            </Link>
            <Link href="/ipl-betting" className="btn-secondary">
              All IPL Markets
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">Best IPL Betting Sites 2026</h2>
          <p className="text-gray-400 mb-8">Compare the top sites for IPL 2026 betting in India.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-border">
                  <th className="text-left py-3 px-4 text-brand-gold font-semibold">Rank</th>
                  <th className="text-left py-3 px-4 text-brand-gold font-semibold">Site</th>
                  <th className="text-left py-3 px-4 text-brand-gold font-semibold">Welcome Bonus</th>
                  <th className="text-left py-3 px-4 text-brand-gold font-semibold">Min Deposit</th>
                  <th className="text-left py-3 px-4 text-brand-gold font-semibold">IPL Markets</th>
                </tr>
              </thead>
              <tbody>
                {comparisonSites.map((row) => (
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
                    <td className="py-3 px-4 text-gray-300">{row.markets}</td>
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

      {/* IPL Teams */}
      <section className="bg-brand-surface py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-6">All IPL 2026 Teams</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {iplTeams.map((team) => (
              <div
                key={team.code}
                className="bg-brand-card border border-brand-border rounded-lg p-3 text-center"
              >
                <p className="text-brand-gold text-sm font-bold">{team.code}</p>
                <p className="text-gray-400 text-xs mt-1">{team.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">IPL Betting Markets</h2>
          <p className="text-gray-400 mb-8">500+ IPL markets available at DafaBet India including ball-by-ball live betting.</p>
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

      {/* Expert tip */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="verdict-box border-l-4 border-brand-gold">
            <p className="text-brand-gold font-bold mb-2 text-sm uppercase tracking-wide">Expert Tip</p>
            <p className="text-white font-semibold">
              CSK and MI have the best historical odds value on match day.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Backing these franchises in their home fixtures consistently delivers above-average returns at DafaBet.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-surface py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8">IPL Betting FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="card group">
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

      {/* CTA */}
      <section className="relative h-[220px] overflow-hidden">
        <Image
          src="/images/promo-767-3.jpg"
          alt="IPL betting bonus at DafaBet"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">
            Bet on Every IPL Match Today
          </h2>
          <Link href="/dafabet-registration" className="btn-primary">
            {tCommon('bet_now')}
          </Link>
        </div>
      </section>
    </>
  )
}

export default async function IplBettingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <IplBettingContent locale={locale} />
}
