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
  const t = await getTranslations({ locale, namespace: 'cricket' })
  const alts = pageAlternates(locale, '/cricket-betting/')
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: alts.canonical, languages: alts.languages },
  }
}

function CricketBettingContent({ locale }: { locale: string }) {
  const t = useTranslations('cricket')
  const tCommon = useTranslations('common')

  const pageUrl = locale === 'te' ? `${SITE_URL}/te/cricket-betting/` : `${SITE_URL}/cricket-betting/`
  const faqs = [
    {
      question: 'What is the best cricket betting site in India?',
      answer: 'DafaBet is our #1 recommendation for cricket betting in India. It offers a 200% welcome bonus up to ₹20,000, instant UPI deposits, and the deepest cricket markets — 30+ per match including ball-by-ball live betting.',
    },
    {
      question: 'Is cricket betting legal in India?',
      answer: 'Cricket betting is in a legal grey area in India. There is no central law criminalising individual bets placed with offshore-licensed operators. Laws vary state by state — Goa, Sikkim, and Meghalaya have regulated some forms. DafaBet operates under an offshore international licence and accepts Indian players.',
    },
    {
      question: 'How do I bet on cricket online?',
      answer: 'Register at DafaBet (under 5 minutes), deposit via UPI (minimum ₹500), navigate to Cricket in the sportsbook, select your match, choose a market, enter your stake, and confirm your bet.',
    },
    {
      question: 'What cricket markets are available?',
      answer: 'DafaBet offers match winner, top batsman, top bowler, total runs, over/under, first wicket method, toss winner, player of the match, and live in-play markets. There are 30+ markets per match, with even more for IPL fixtures.',
    },
    {
      question: 'Does dew affect betting odds?',
      answer: 'Yes. At dew-heavy grounds, evening matches tilt 5–10% toward the chasing team once the outfield dampens — spinners lose grip and fielders lose footing. Wankhede (Mumbai), Eden Gardens (Kolkata), and Chinnaswamy (Bengaluru) are the Indian grounds where dew tilt is most pronounced and most reliable.',
    },
  ]

  const schemaData = [
    articleSchema({ headline: t('title'), description: t('description'), url: pageUrl, datePublished: '2025-01-01' }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL + '/' },
      { name: 'Cricket Betting', url: pageUrl },
    ]),
  ]

  const sportFeatures = [
    { emoji: '🏆', title: 'IPL', subtitle: '500+ markets per match' },
    { emoji: '📺', title: 'Test Cricket', subtitle: 'Best odds guaranteed' },
    { emoji: '⚡', title: 'T20', subtitle: 'Live in-play betting' },
    { emoji: '🏏', title: 'One Day', subtitle: 'Top batsman & bowler' },
  ]

  const markets = [
    { title: 'Match Winner', desc: 'Back your team to win at the best available price.' },
    { title: 'Top Batsman', desc: 'Pick the highest run-scorer in the innings.' },
    { title: 'Top Bowler', desc: 'Choose the bowler who takes the most wickets.' },
    { title: 'Total Runs', desc: 'Predict the total runs scored in a match or innings.' },
    { title: 'Over / Under', desc: 'Bet whether the total falls above or below the line.' },
    { title: 'Live In-Play', desc: 'React to every ball with real-time odds updates.' },
  ]

  const steps = [
    { title: 'Create Your Account', desc: 'Register at DafaBet in under 2 minutes with your email or mobile number.' },
    { title: 'Deposit via UPI', desc: 'Add funds instantly using PhonePe, Google Pay, or any UPI app.' },
    { title: 'Find Your Match', desc: 'Navigate to Cricket, pick a match, and browse all available markets.' },
    { title: 'Place Your Bet', desc: 'Enter your stake, confirm your slip, and watch the action live.' },
  ]

  const topSites = [
    { rank: '🥇 #1', site: 'DafaBet', bonus: '200% up to ₹20,000', minDeposit: '₹500', markets: '30+ per match', live: true },
    { rank: '#2', site: 'Betway', bonus: '100% up to ₹2,500', minDeposit: '₹1,000', markets: '25+ per match', live: true },
    { rank: '#3', site: '10Cric', bonus: '150% up to ₹10,000', minDeposit: '₹1,000', markets: '20+ per match', live: true },
    { rank: '#4', site: 'Parimatch', bonus: '100% up to ₹12,000', minDeposit: '₹300', markets: '15+ per match', live: true },
  ]

  const groundCards = [
    {
      name: 'Wankhede Stadium, Mumbai',
      characteristic: 'Fast outfield, sea breeze, heavy evening dew. IPL totals frequently clear 190.',
      lean: 'Back chasers in night matches. Death-over pace bowlers dominate top-bowler markets over spinners.',
    },
    {
      name: 'MA Chidambaram (Chepauk), Chennai',
      characteristic: 'Slow, low, sharp turn from ball one. The lowest-scoring IPL ground over five seasons.',
      lean: 'Back under on total-runs markets. Wrist spinners dominate top-bowler props.',
    },
    {
      name: 'M. Chinnaswamy, Bengaluru',
      characteristic: 'Altitude (920m), short square boundaries, fastest outfield in the country. IPL run-rates above 9.0 are the norm.',
      lean: 'Back pace bowlers; spinners get hit. Totals run hot — favour overs on six-count props.',
    },
    {
      name: 'Eden Gardens, Kolkata',
      characteristic: 'Heavy dew in the second IPL half, true batting surface, drift for left-arm spin under lights.',
      lean: 'Chase-friendly par excellence. Back the team batting second in evening fixtures.',
    },
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Hero */}
      <section className="relative h-[350px] md:h-[420px] overflow-hidden">
        <Image
          src="/images/sports-betting.webp"
          alt="Cricket betting at DafaBet India"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <span className="red-badge mb-4">🏏 LIVE CRICKET</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-xl">
            Cricket Betting in India <span className="gold-text">2026</span>
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-md">
            Best cricket odds on IPL, T20 World Cup, India vs Pakistan and all matches — 200% welcome bonus up to ₹20,000.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/dafabet-registration" className="btn-primary">
              Bet on Cricket →
            </Link>
            <Link href="/cricket-betting" className="btn-secondary">
              See All Markets
            </Link>
          </div>
        </div>
      </section>

      {/* Sport feature cards */}
      <section className="bg-brand-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sportFeatures.map((feat) => (
              <div key={feat.title} className="card text-center">
                <div className="text-3xl mb-2">{feat.emoji}</div>
                <h3 className="text-brand-gold font-bold mb-1">{feat.title}</h3>
                <p className="text-gray-400 text-sm">{feat.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Picks Comparison Table */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">Best Cricket Betting Sites India: Our Top Picks</h2>
          <p className="text-gray-400 mb-8">
            After testing every major platform with real deposits, here are our rankings for 2026.
          </p>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-brand-card text-brand-gold text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Rank</th>
                  <th className="px-4 py-3 text-left">Site</th>
                  <th className="px-4 py-3 text-left">Welcome Bonus</th>
                  <th className="px-4 py-3 text-left">Min Deposit</th>
                  <th className="px-4 py-3 text-left">Cricket Markets</th>
                  <th className="px-4 py-3 text-left">Live Betting</th>
                </tr>
              </thead>
              <tbody>
                {topSites.map((row, i) => (
                  <tr key={row.site} className={i % 2 === 0 ? 'bg-brand-bg/50' : ''}>
                    <td className="px-4 py-3 text-brand-gold font-bold">{row.rank}</td>
                    <td className="px-4 py-3 text-white font-semibold">{row.site}</td>
                    <td className="px-4 py-3 text-gray-300">{row.bonus}</td>
                    <td className="px-4 py-3 text-gray-300">{row.minDeposit}</td>
                    <td className="px-4 py-3 text-gray-300">{row.markets}</td>
                    <td className="px-4 py-3 text-gray-300">{row.live ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-gray-500 text-xs mt-3 px-4 pb-4">
              *Data as of June 2026. Always check current terms on each site.
            </p>
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="bg-brand-surface py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">Cricket Betting Markets</h2>
          <p className="text-gray-400 mb-8">Explore every market available at DafaBet India.</p>
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

      {/* Dew Factor & Pitch Notes */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">Reading Dew &amp; Pitch: The Real Edge</h2>
          <p className="text-gray-400 mb-8">
            Indian grounds are not interchangeable. The same total of 165 is a chase-down at Bengaluru
            and a defended trophy at Chennai. Dew arrives at most North and West Indian grounds in
            evening fixtures, dampening spinners&apos; grip and tilting the balance toward chasing
            teams by <strong className="text-white">5–10%</strong> over the pre-toss baseline. Read
            the ground before you read the form guide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {groundCards.map((g) => (
              <div key={g.name} className="card">
                <h3 className="text-brand-gold font-bold mb-2">{g.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{g.characteristic}</p>
                <p className="text-gray-300 text-sm">
                  <span className="text-brand-gold font-semibold">Betting lean: </span>
                  {g.lean}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2026 Cricket Calendar */}
      <section className="bg-brand-surface py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">2026 Cricket Calendar</h2>
          <p className="text-gray-400 mb-8">
            The 2026 calendar is unusually rich for Indian cricket bettors — three formats, two world
            events touching Indian shores, and a packed home season fill almost every week of the year.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-brand-gold font-bold mb-4">Already Concluded in 2026</h3>
              <ul className="text-gray-400 text-sm space-y-3">
                <li>
                  <span className="text-white font-semibold">ICC Men&apos;s T20 World Cup 2026</span>
                  <br />
                  Co-hosted in India &amp; Sri Lanka (Feb–Mar). Knockout-stage liquidity was the
                  highest of the cricket year.
                </li>
                <li>
                  <span className="text-white font-semibold">IPL 2026</span>
                  <br />
                  74 matches, full home-and-away double round-robin (Mar–May). By far the largest
                  sustained betting event of the Indian calendar.
                </li>
                <li>
                  <span className="text-white font-semibold">Women&apos;s Premier League 2026</span>
                  <br />
                  Match-winner and top-batter markets were live for every fixture (Feb–Mar).
                </li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-brand-gold font-bold mb-4">Coming Up — Second Half of 2026</h3>
              <ul className="text-gray-400 text-sm space-y-3">
                <li>
                  <span className="text-white font-semibold">Asia Cup 2026</span>
                  <br />
                  T20 format. Strong outright markets and full ball-by-ball live betting at DafaBet.
                </li>
                <li>
                  <span className="text-white font-semibold">India Home Bilateral Season (Oct–Dec)</span>
                  <br />
                  Tests and white-ball series at major Indian venues. Watch for swing-friendly Tests in
                  November and dew-affected ODIs.
                </li>
                <li>
                  <span className="text-white font-semibold">Ranji Trophy 2026–27</span>
                  <br />
                  Starts October. Soft pricing on domestic markets — informed bettors with state-level
                  knowledge regularly find value here.
                </li>
                <li>
                  <span className="text-white font-semibold">ICC Women&apos;s T20 World Cup 2026</span>
                  <br />
                  England, June–July.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to bet */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-10 text-center">How to Bet on Cricket</h2>
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
        </div>
      </section>

      {/* Types of Cricket Bets */}
      <section className="bg-brand-surface py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">Types of Cricket Bets in India</h2>
          <p className="text-gray-400 mb-8">
            Understanding cricket betting markets is key to consistent profits. Here are the most
            popular bet types at Dafabet India:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Match Winner', desc: 'Back one team to win the match. Available pre-match and live.' },
              { title: 'Top Batsman', desc: 'Pick the player who scores the most runs in an innings.' },
              { title: 'Top Bowler', desc: 'Select the bowler who takes the most wickets.' },
              { title: 'Total Runs Over/Under', desc: 'Predict whether total runs will be over or under a set line.' },
              { title: 'Player of Match', desc: 'Correctly predict the star player of the game.' },
              { title: 'Live In-Play', desc: 'Bet as the action unfolds with odds updating ball-by-ball.' },
            ].map((bet) => (
              <div key={bet.title} className="card">
                <h3 className="text-brand-gold font-bold mb-2">{bet.title}</h3>
                <p className="text-gray-400 text-sm">{bet.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cricket Betting Strategy Tips */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">Cricket Betting Tips for Indian Players</h2>
          <p className="text-gray-400 mb-8">
            Sharpen your edge with these proven strategies used by experienced cricket bettors in
            India. Knowledge of local conditions and market timing separates winning bettors from
            recreational ones.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Track Pitch Conditions 🏟',
                desc: 'Indian pitches favour spinners. Check pitch reports before betting on bowler markets. Home advantage is significant in Test cricket.',
              },
              {
                title: 'Shop for Best Odds 📊',
                desc: 'Compare odds at Dafabet before placing. Even 0.1 difference in odds adds up over hundreds of bets.',
              },
              {
                title: 'Focus on IPL Trends 📈',
                desc: 'High-scoring T20 matches make over/under and boundary markets lucrative. First-innings totals are often set too low.',
              },
              {
                title: 'Bet Responsibly 🛡',
                desc: 'Set a budget before each session. Dafabet India has deposit limits and self-exclusion tools available.',
              },
            ].map((tip) => (
              <div key={tip.title} className="card-hover">
                <h3 className="text-brand-gold font-bold mb-2">{tip.title}</h3>
                <p className="text-gray-400 text-sm">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IPL Betting Guide */}
      <section className="bg-brand-surface py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-surface rounded-xl p-6 border border-brand-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="red-badge">IPL 2026</span>
              <h2 className="section-title mb-0">IPL Betting Guide 2026</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: schedule info */}
              <div>
                <p className="text-gray-400 text-sm mb-5">
                  The Indian Premier League (IPL) runs March–May each year across 10 franchise
                  teams. Dafabet covers every single IPL match with 50+ betting markets per game
                  including ball-by-ball live options.
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {['MI', 'CSK', 'RCB', 'KKR', 'SRH', 'DC', 'PBKS', 'RR', 'GT', 'LSG'].map(
                    (team) => (
                      <span
                        key={team}
                        className="bg-brand-card rounded px-2 py-1 text-xs text-brand-gold text-center"
                      >
                        {team}
                      </span>
                    )
                  )}
                </div>
              </div>
              {/* Right: tips box */}
              <div className="verdict-box">
                <p className="text-brand-gold font-bold mb-3">Top IPL Betting Markets</p>
                <ul className="text-gray-400 text-sm space-y-2 list-disc list-inside">
                  <li>Match Winner</li>
                  <li>Top Run-Scorer</li>
                  <li>6+ Sixes in Match</li>
                  <li>Man of the Match</li>
                  <li>Next Wicket Method</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8">Dafabet vs Other Cricket Betting Sites in India</h2>
          <div className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-brand-card text-brand-gold text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Site</th>
                  <th className="px-4 py-3 text-left">Cricket Markets</th>
                  <th className="px-4 py-3 text-left">UPI</th>
                  <th className="px-4 py-3 text-left">Welcome Bonus</th>
                  <th className="px-4 py-3 text-left">Live Betting</th>
                  <th className="px-4 py-3 text-left">Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-brand-bg/50">
                  <td className="px-4 py-3 text-white font-semibold">Dafabet</td>
                  <td className="px-4 py-3 text-gray-300">500+</td>
                  <td className="px-4 py-3 text-gray-300">✓ Instant</td>
                  <td className="px-4 py-3 text-gray-300">₹20,000</td>
                  <td className="px-4 py-3 text-gray-300">✓ Ball-by-ball</td>
                  <td className="px-4 py-3 text-brand-gold font-bold">⭐ 9.2/10</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white font-semibold">Betway</td>
                  <td className="px-4 py-3 text-gray-300">200+</td>
                  <td className="px-4 py-3 text-gray-300">✓</td>
                  <td className="px-4 py-3 text-gray-300">₹15,000</td>
                  <td className="px-4 py-3 text-gray-300">✓</td>
                  <td className="px-4 py-3 text-brand-gold font-bold">⭐ 8.1/10</td>
                </tr>
                <tr className="bg-brand-bg/50">
                  <td className="px-4 py-3 text-white font-semibold">10Cric</td>
                  <td className="px-4 py-3 text-gray-300">300+</td>
                  <td className="px-4 py-3 text-gray-300">✓</td>
                  <td className="px-4 py-3 text-gray-300">₹10,000</td>
                  <td className="px-4 py-3 text-gray-300">✓</td>
                  <td className="px-4 py-3 text-brand-gold font-bold">⭐ 7.8/10</td>
                </tr>
              </tbody>
            </table>
            <p className="text-gray-500 text-xs mt-3 px-4 pb-4">
              *Data as of June 2026. Always check current terms.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-surface py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8">Cricket Betting FAQ</h2>
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

      {/* CTA */}
      <section className="relative h-[220px] overflow-hidden">
        <Image
          src="/images/sports-betting.webp"
          alt="Start betting on cricket"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">
            Start Betting on Cricket Today
          </h2>
          <Link href="/dafabet-registration" className="btn-primary w-full max-w-xs md:w-auto">
            {tCommon('bet_now')}
          </Link>
        </div>
      </section>
    </>
  )
}

export default async function CricketBettingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <CricketBettingContent locale={locale} />
}
