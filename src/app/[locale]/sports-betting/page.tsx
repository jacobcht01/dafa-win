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
  {
    question: 'What is the minimum bet amount?',
    answer: 'The minimum bet at DafaBet is ₹50 on most sports markets. This low floor makes it straightforward to test a new market or manage your stakes on smaller-budget days.',
  },
  {
    question: 'Can I bet on live matches at DafaBet?',
    answer: 'Yes. DafaBet offers full in-play betting with real-time odds that update in under 2 seconds. You can bet ball-by-ball on cricket, goal-by-goal on football, and point-by-point on tennis. Cash-out is available on most live markets so you can lock in a profit or cut a loss before the event ends.',
  },
  {
    question: 'Does DafaBet offer a dedicated cricket betting bonus?',
    answer: 'Yes. During IPL season DafaBet runs promotions including enhanced odds on featured matches, free bets on qualifying wagers, and cashback on selected markets. Check the promotions page for current offers — they change week to week.',
  },
]

const TOP_SITES = [
  { rank: '🥇 #1', site: 'DafaBet', bonus: '200% up to ₹20,000', minDeposit: '₹500', sports: '35+' },
  { rank: '#2', site: 'Betway', bonus: '100% up to ₹2,500', minDeposit: '₹1,000', sports: '30+' },
  { rank: '#3', site: '10Cric', bonus: '150% up to ₹10,000', minDeposit: '₹1,000', sports: '28+' },
  { rank: '#4', site: 'Parimatch', bonus: '100% up to ₹12,000', minDeposit: '₹300', sports: '25+' },
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
      locale,
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

      {/* English content — only for non-te locales */}
      {locale !== 'te' && (
        <>
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

      {/* Section A: How Odds Work */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">How Odds Work at DafaBet India</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          DafaBet displays odds in decimal format by default — the format most Indian betting sites use because it is the easiest to calculate. A decimal odd tells you exactly how much you get back per rupee staked, including your original stake.
        </p>
        <p className="text-gray-300 leading-relaxed mb-6">
          <span className="text-brand-gold font-semibold">How to read decimal odds:</span> If Team India is priced at 1.90 to win a T20I match, a ₹1,000 bet returns ₹1,900 in total — that is ₹900 profit plus your ₹1,000 stake back. If your selection loses, you lose the ₹1,000 stake. The calculation is simply: <span className="text-brand-gold">stake × odds = total return</span>.
        </p>
        <p className="text-gray-300 leading-relaxed mb-6">
          <span className="text-brand-gold font-semibold">Fractional odds</span> (e.g. 9/10) are occasionally shown on older markets. The numerator is your profit if you win; the denominator is the stake required. So 9/10 means stake ₹1,000, profit ₹900 — the same as decimal 1.90.
        </p>
        <p className="text-gray-300 leading-relaxed mb-6">
          <span className="text-brand-gold font-semibold">Cricket worked example:</span> It is the last over of an IPL match. RCB need 14 runs off 6 balls. DafaBet offers RCB at 3.50 and SRH at 1.35. A ₹500 bet on RCB returns ₹1,750 total (₹1,250 profit) if RCB pulls it off; a ₹500 bet on SRH returns ₹675 total (₹175 profit) as the shorter-odds favourite. Odds below 2.00 mean the bookmaker considers that outcome more likely than not.
        </p>
        <p className="text-gray-300 leading-relaxed mb-6">
          Odds shift in real time during live markets. A wicket falling, a rain interruption, or a big six can move a 1.60 price to 2.20 within seconds. Watching those movements before you bet gives you a feel for where the market believes the match is heading.
        </p>
      </section>

      {/* Section B: Per-Sport Deep Dives */}
      <section className="bg-brand-surface py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-8">Sports Betting Guides</h2>

          {/* Cricket */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">🏏 Cricket at DafaBet</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Cricket is DafaBet&apos;s flagship sport. The platform covers every format — IPL, Test matches, T20 Internationals, and One Day Internationals — with 500+ cricket markets running simultaneously across all active fixtures. A single IPL match alone carries 30+ betting markets.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Market types go well beyond &quot;match winner&quot;. You can bet on the top run-scorer, top wicket-taker, fall of the next wicket (what total will the batting side reach when the next wicket falls?), player props (will Virat Kohli score 50+?), innings runs totals, and the result at the end of each over. Ball-by-ball in-play markets update every delivery, letting you trade positions as momentum shifts.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The cash-out feature is available on most cricket in-play bets. If you backed a team to win and they have built a strong lead by the 15th over, you can accept a guaranteed partial return rather than risk the match swinging away. DafaBet&apos;s cash-out values update automatically so you always see a live offer.
            </p>
          </div>

          {/* Football */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">⚽ Football / Soccer at DafaBet</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Football coverage spans the Indian Super League, English Premier League, UEFA Champions League, and FIFA World Cup qualifying campaigns. Kick-off times for European fixtures (8:30 PM–11:30 PM IST) suit Indian viewers watching from home, making live betting on EPL and UCL matches genuinely practical.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Popular markets include 1X2 (home win, draw, away win), Both Teams to Score (BTTS), Asian handicap — which removes the draw by giving one side a goal head-start — correct score, and first goal scorer. Over/Under 2.5 goals is the most-traded market in European football and DafaBet covers it across all top divisions.
            </p>
          </div>

          {/* Kabaddi */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">🤼 Pro Kabaddi at DafaBet</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Pro Kabaddi League is one of the most-watched sports leagues in India, and DafaBet covers every PKL season match with full pre-match and live markets. For Indian bettors who follow kabaddi closely, the market range here is better than on most international platforms that treat kabaddi as an afterthought.
            </p>
            <p className="text-gray-300 leading-relaxed">
              You can bet on match winner, handicap points, over/under total points, and — uniquely for kabaddi — raid success markets. A raid success bet asks you to predict whether the raider will score on a specific raid. These micro-markets open and settle within minutes, giving active bettors constant action throughout the match.
            </p>
          </div>

          {/* Tennis & Badminton */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">🎾 Tennis &amp; Badminton at DafaBet</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Tennis coverage includes all four Grand Slams (Australian Open, Roland Garros, Wimbledon, US Open) plus ATP and WTA tour events. Markets run from match winner down to set betting (predict the exact set score, e.g. 2–1 to Djokovic) and game handicap (one player spotted games in a set). Live in-play tennis is particularly dynamic because the next game can flip a match.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Badminton coverage focuses on BWF Super Series events and the Thomas &amp; Uber Cup. With PV Sindhu and Lakshya Sen regularly competing, Indian bettors have a strong interest in international tour markets. DafaBet offers set betting and game handicap on featured BWF fixtures.
            </p>
          </div>

          {/* Esports */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">🎮 Esports at DafaBet</h3>
            <p className="text-gray-300 leading-relaxed">
              Esports is the fastest-growing segment of the Indian betting market. DafaBet covers BGMI (Battlegrounds Mobile India), Valorant, and CS2, three titles with the largest Indian player and viewer bases. You can bet on match winner, map winner within a best-of series, and tournament outright winner. Esports events run year-round and matches typically conclude within 30–45 minutes, so settlement is quick. As Indian esports organisations rise in global tournaments, the pre-match and live odds for Indian team fixtures attract significant attention.
            </p>
          </div>
        </div>
      </section>

      {/* Section C: Bet Types Explained */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-12">
        <h2 className="section-title text-center mb-8">Bet Types Explained</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          Before placing any bet it helps to understand the six core bet types. All of these are available on DafaBet across sports.
        </p>
        <ul className="space-y-5">
          <li className="flex items-start gap-3 text-gray-300 text-sm">
            <span className="text-brand-gold font-bold flex-shrink-0 mt-0.5">01</span>
            <div>
              <span className="text-white font-semibold">Match Winner (1X2)</span> — The simplest bet: pick which team or player wins. In football &quot;1X2&quot; covers three outcomes: home win (1), draw (X), or away win (2). In cricket head-to-heads there is no draw option, so it is a straight two-way market. Example: back India to beat Australia at 1.75 — ₹1,000 stake returns ₹1,750.
            </div>
          </li>
          <li className="flex items-start gap-3 text-gray-300 text-sm">
            <span className="text-brand-gold font-bold flex-shrink-0 mt-0.5">02</span>
            <div>
              <span className="text-white font-semibold">Handicap</span> — A fictional head-start is given to one side to level uneven contests. If MI are heavy favourites against DC, DafaBet might offer MI −12.5 runs. You win only if MI win by 13 or more runs. DC +12.5 means you win if DC lose by 12 or fewer, or if they win outright. This creates near-even odds on both sides.
            </div>
          </li>
          <li className="flex items-start gap-3 text-gray-300 text-sm">
            <span className="text-brand-gold font-bold flex-shrink-0 mt-0.5">03</span>
            <div>
              <span className="text-white font-semibold">Over/Under (Totals)</span> — Predict whether a stat — runs scored, goals, points — will be above or below a set line. Example: DafaBet sets the total runs line at 168.5 for a T20 match. Bet &quot;Over&quot; and you need 169+ total runs; bet &quot;Under&quot; and you need 168 or fewer. The line is chosen to create a near-50/50 split.
            </div>
          </li>
          <li className="flex items-start gap-3 text-gray-300 text-sm">
            <span className="text-brand-gold font-bold flex-shrink-0 mt-0.5">04</span>
            <div>
              <span className="text-white font-semibold">Accumulator (Parlay)</span> — Combine three or more selections into a single bet. All selections must win for the accumulator to pay out. Odds multiply together, so three selections at 1.80 each give combined odds of 5.83 (1.80 × 1.80 × 1.80). The trade-off: one wrong result voids the whole bet. Accumulators are popular for weekend football — pick five EPL results, multiply the odds, and a small stake can return significantly.
            </div>
          </li>
          <li className="flex items-start gap-3 text-gray-300 text-sm">
            <span className="text-brand-gold font-bold flex-shrink-0 mt-0.5">05</span>
            <div>
              <span className="text-white font-semibold">Both Teams to Score (BTTS)</span> — A football-only market. You predict simply whether both teams will score at least one goal in the match (Yes or No), regardless of who wins. It is popular because a 0–0 draw or a team keeping a clean sheet is the only way &quot;Yes&quot; loses. Example: a Premier League game with both teams in good attacking form might be priced at 1.65 for BTTS Yes.
            </div>
          </li>
          <li className="flex items-start gap-3 text-gray-300 text-sm">
            <span className="text-brand-gold font-bold flex-shrink-0 mt-0.5">06</span>
            <div>
              <span className="text-white font-semibold">Cash Out</span> — This is not a bet type per se but a feature that applies to many open bets. If a match is in play and your selection is winning, DafaBet will offer you a cash-out value — a guaranteed return lower than the full payout. Accept it to pocket a sure profit. If the match is going against you, cash out to recover part of your stake. The value updates every few seconds to reflect live match state.
            </div>
          </li>
        </ul>
      </section>

      {/* Section D: How to Place Your First Sports Bet */}
      <section className="bg-brand-surface py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-8">How to Place Your First Sports Bet</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            If you have never placed a sports bet before, the process at DafaBet takes under five minutes once your account is funded. Here is a concrete seven-step walkthrough.
          </p>
          <ol className="space-y-4">
            <li className="flex items-start gap-4 text-gray-300 text-sm">
              <span className="text-brand-gold font-bold text-lg flex-shrink-0 w-6">1.</span>
              <div><span className="text-white font-semibold">Register</span> — Visit DafaBet India and click &quot;Register&quot;. Enter your mobile number, set a password, and verify via OTP. The process takes about 90 seconds.</div>
            </li>
            <li className="flex items-start gap-4 text-gray-300 text-sm">
              <span className="text-brand-gold font-bold text-lg flex-shrink-0 w-6">2.</span>
              <div><span className="text-white font-semibold">Deposit ₹500 via UPI</span> — Go to Cashier → Deposit. Select UPI and enter ₹500 (the minimum). Approve the payment in your UPI app (Google Pay, PhonePe, or Paytm). Funds hit your account in under 60 seconds.</div>
            </li>
            <li className="flex items-start gap-4 text-gray-300 text-sm">
              <span className="text-brand-gold font-bold text-lg flex-shrink-0 w-6">3.</span>
              <div><span className="text-white font-semibold">Navigate to Sports</span> — Click the &quot;Sports&quot; tab in the top navigation. The default view shows upcoming fixtures sorted by popularity — cricket usually tops the list for Indian users.</div>
            </li>
            <li className="flex items-start gap-4 text-gray-300 text-sm">
              <span className="text-brand-gold font-bold text-lg flex-shrink-0 w-6">4.</span>
              <div><span className="text-white font-semibold">Find Your Match</span> — Browse by sport or use the search bar. Click on a fixture to expand the full market list. You will see the match name, start time, and a summary of available markets.</div>
            </li>
            <li className="flex items-start gap-4 text-gray-300 text-sm">
              <span className="text-brand-gold font-bold text-lg flex-shrink-0 w-6">5.</span>
              <div><span className="text-white font-semibold">Choose a Market</span> — For your first bet, start with &quot;Match Winner&quot;. Click the odds next to the team or player you want to back. The selection moves into your bet slip on the right side of the screen.</div>
            </li>
            <li className="flex items-start gap-4 text-gray-300 text-sm">
              <span className="text-brand-gold font-bold text-lg flex-shrink-0 w-6">6.</span>
              <div><span className="text-white font-semibold">Enter Your Stake</span> — Type the amount you want to bet (minimum ₹50). The bet slip instantly shows your potential return. Check the odds are correct before proceeding.</div>
            </li>
            <li className="flex items-start gap-4 text-gray-300 text-sm">
              <span className="text-brand-gold font-bold text-lg flex-shrink-0 w-6">7.</span>
              <div><span className="text-white font-semibold">Confirm the Bet Slip</span> — Click &quot;Place Bet&quot;. A confirmation screen shows your bet reference number. Your bet is now live and will settle automatically once the event ends. You can track it under &quot;My Bets&quot;.</div>
            </li>
          </ol>
        </div>
      </section>

      {/* Section E: Sports Betting Payments */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-12">
        <h2 className="section-title text-center mb-8">Sports Betting Payments at DafaBet</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          DafaBet supports the payment methods Indian bettors use daily. UPI is the fastest option — deposits via UPI (Google Pay, PhonePe, Paytm) are credited in under 60 seconds, with a minimum deposit of ₹500. There are no transaction fees charged by DafaBet on deposits or withdrawals.
        </p>
        <p className="text-gray-300 leading-relaxed mb-6">
          For withdrawals, the minimum is ₹500. UPI withdrawals typically process within 1–4 hours of approval; bank transfers arrive within 1–3 business days. Winnings are paid directly to the same UPI handle or bank account you used to deposit, which keeps the process straightforward and traceable.
        </p>
        <p className="text-gray-300 leading-relaxed">
          DafaBet operates under Curaçao eGaming licence 1668/JAZ, which requires the operator to segregate player funds and meet minimum financial standards. Your deposited balance and winnings are held separately from operational funds. The welcome bonus (200% up to ₹20,000, minimum ₹500 deposit) carries an 8× wagering requirement within a 30-day window — meet those terms and your bonus balance becomes withdrawable cash.
        </p>
      </section>

        </>
      )}

      {/* Telugu Section */}
      {locale === 'te' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          <h2 className="section-title mb-8">స్పోర్ట్స్ బెట్టింగ్ ఇండియా 2026 — DafaBet గైడ్</h2>

          {/* Section 1: క్రికెట్ బెట్టింగ్ గైడ్ */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">క్రికెట్ బెట్టింగ్ గైడ్</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              క్రికెట్ అనేది భారతదేశంలో అత్యంత జనాదరణ పొందిన క్రీడ, మరియు DafaBet క్రికెట్‌కి బలంగా ఉంది. IPL సీజన్‌లో అన్ని 10 జట్లు, 74 మ్యాచ్‌లు, మ్యాచ్‌కు 30 కంటే ఎక్కువ మార్కెట్లతో పూర్తి కవరేజ్ అందించబడుతుంది. మ్యాచ్ విన్నర్ నుండి టాప్ బ్యాటర్, టాప్ బౌలర్, ఫాల్ ఆఫ్ వికెట్, ఓవర్ రన్స్ వరకు ప్రతి మార్కెట్ అందుబాటులో ఉంటుంది.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              <span className="text-brand-gold font-semibold">IPL మార్కెట్లు:</span> సన్‌రైజర్స్ హైదరాబాద్ హోమ్ మ్యాచ్‌లో DafaBet మ్యాచ్ విన్నర్, మొదటి 6 ఓవర్లలో రన్స్, పవర్‌ప్లే స్కోర్ ఓవర్/అండర్, ఐదవ వికెట్ పడే స్కోర్ వంటి మార్కెట్లను ఆఫర్ చేస్తుంది. ముంబై ఇండియన్స్ vs RCB మ్యాచ్‌లో 40 కంటే ఎక్కువ మార్కెట్లు తెరుచుకుంటాయి — ఏ ఓవర్‌లో మొదటి సిక్స్ అడతారు, ఏ బ్యాటర్ మొదటి వికెట్ కోల్పోతాడు అనేవి కూడా పందెం వేయగలరు.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              <span className="text-brand-gold font-semibold">అంతర్జాతీయ క్రికెట్:</span> T20 వరల్డ్ కప్, ODI వరల్డ్ కప్, Asia Cup, IND vs AUS, IND vs ENG సిరీస్‌లు అన్నీ DafaBet లో కవర్ అవుతాయి. ఇండియా vs ఆస్ట్రేలియా టెస్ట్ మ్యాచ్‌లో సెషన్ బెట్టింగ్ కూడా అందుబాటులో ఉంటుంది — మొదటి సెషన్‌లో ఎన్ని రన్స్ పడతాయి, లంచ్ సమయానికి ఎంత స్కోర్ ఉంటుంది అనే మార్కెట్లు ఒక్కో సెషన్‌కూ అందుబాటులో ఉంటాయి.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              <span className="text-brand-gold font-semibold">లైవ్ బెట్టింగ్ అనుభవం:</span> DafaBet లో లైవ్ బెట్టింగ్ అత్యంత ఉత్తేజకరంగా ఉంటుంది. ఒక్కో బాల్‌కూ ఆడ్స్ మారతాయి — వికెట్ పడినప్పుడు, నో-బాల్ వచ్చినప్పుడు, సిక్స్ అడిచినప్పుడు అన్నింటికీ ఆడ్స్ వేగంగా అప్‌డేట్ అవుతాయి. క్యాష్-అవుట్ అవకాశం కూడా ఉంటుంది — మీ జట్టు మ్యాచ్ గెలుస్తున్నట్టు కనిపిస్తే, పూర్తి సెటిల్‌మెంట్ ముందే ఒక నిర్ణీత మొత్తానికి క్యాష్-అవుట్ తీసుకోవచ్చు.
            </p>
            <p className="text-gray-400 leading-relaxed">
              సన్‌రైజర్స్ హైదరాబాద్ అభిమానులకు ప్రత్యేకంగా — SRH హోమ్ మ్యాచ్‌లలో DafaBet ప్రత్యేక ప్రమోషన్లు అందిస్తుంది. ముంబై ఇండియన్స్ హెవీ ఫేవరెట్‌గా ఉన్నప్పుడు కూడా SRH కి పందెం వేయడానికి మంచి ఆడ్స్ అందుబాటులో ఉంటాయి. RCB అభిమానులకు కూడా — బెంగళూరు హైదరాబాద్ మ్యాచ్‌లో అనేక మార్కెట్లు ఉంటాయి.
            </p>
          </div>

          {/* Section 2: ఫుట్‌బాల్ & ISL */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">ఫుట్‌బాల్ &amp; ISL బెట్టింగ్</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaBet ఫుట్‌బాల్ విభాగంలో Indian Super League (ISL), English Premier League (EPL), UEFA Champions League (UCL) మరియు మరిన్ని అంతర్జాతీయ లీగ్‌లు కవర్ అవుతాయి. ISL లో హైదరాబాద్ FC మ్యాచ్‌లకు తెలుగు అభిమానుల్లో ఎక్కువ డిమాండ్ ఉంది.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              <span className="text-brand-gold font-semibold">ప్రముఖ మార్కెట్లు:</span> 1X2 (హోమ్ విన్, డ్రా, అవే విన్), BTTS — Both Teams to Score (రెండు జట్లూ గోల్ వేస్తాయా లేదా అనేది), ఏషియన్ హ్యాండీక్యాప్ (ఒక జట్టుకు గోల్ అడ్వాంటేజ్ ఇచ్చి ఆడ్స్ సమానంగా చేయడం), Over/Under 2.5 గోల్స్ వంటివి అన్ని లీగ్‌లలో అందుబాటులో ఉంటాయి.
            </p>
            <p className="text-gray-400 leading-relaxed">
              EPL మరియు UCL మ్యాచ్‌లు భారత కాలమానం ప్రకారం రాత్రి 8:30 నుండి 11:30 వరకు ఉంటాయి — ఇంట్లో ఉండి లైవ్ బెట్టింగ్ చేయడానికి అనువైన సమయం. UCL నాకౌట్ దశలో DafaBet ఉత్తేజకరమైన ఆడ్స్ మరియు ప్రత్యేక మార్కెట్లు ఆఫర్ చేస్తుంది.
            </p>
          </div>

          {/* Section 3: కబడ్డీ */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">కబడ్డీ — Pro Kabaddi League</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Pro Kabaddi League (PKL) భారతదేశంలో అత్యంత వేగంగా ఎదుగుతున్న స్పోర్ట్స్ లీగ్‌లలో ఒకటి. DafaBet PKL అన్ని మ్యాచ్‌లకు లైవ్ కవరేజ్ అందిస్తుంది — ప్రీ-మ్యాచ్ మరియు లైవ్ ఇన్-ప్లే రెండూ.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              <span className="text-brand-gold font-semibold">PKL మార్కెట్లు:</span> మ్యాచ్ విన్నర్, హ్యాండీక్యాప్ పాయింట్స్ (ఒక జట్టుకు పాయింట్ల అడ్వాంటేజ్ ఇవ్వడం), Over/Under మొత్తం పాయింట్లు, రైడ్ సక్సెస్ మార్కెట్లు అందుబాటులో ఉంటాయి. రైడ్ సక్సెస్ మార్కెట్‌లో ఒక రైడర్ నిర్దిష్ట రైడ్‌లో పాయింట్ సాధిస్తాడా లేదా అని పందెం వేయవచ్చు.
            </p>
            <p className="text-gray-400 leading-relaxed">
              PKL మ్యాచ్‌లలో రైడ్ సక్సెస్ మార్కెట్లు చాలా వేగంగా సెటిల్ అవుతాయి — కొన్ని నిమిషాల్లోనే ఫలితం తెలుస్తుంది. యాక్టివ్ బెట్టర్లకు ఇది నిరంతర యాక్షన్ ఇస్తుంది. పటనా పైరేట్స్, జైపూర్ పింక్ పాంథర్స్, బెంగళూరు బుల్స్ వంటి జట్ల మ్యాచ్‌లలో ఆడ్స్ చాలా ఆకర్షణీయంగా ఉంటాయి.
            </p>
          </div>

          {/* Section 4: ఆడ్స్ ఎలా చదవాలి */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">ఆడ్స్ ఎలా చదవాలి</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaBet లో ఆడ్స్ డెసిమల్ ఫార్మాట్‌లో చూపించబడతాయి — ఇది అర్థం చేసుకోవడం చాలా సులభం. డెసిమల్ ఆడ్స్ మీరు పెట్టిన ప్రతి రూపాయికి మొత్తం రిటర్న్ (స్టేక్ సహా) చూపిస్తాయి.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              <span className="text-brand-gold font-semibold">లెక్క సులభం:</span> ఆడ్స్ 1.90 అంటే — ₹1,000 పెట్టడం వల్ల మొత్తం ₹1,900 తిరిగి వస్తుంది. అందులో ₹900 లాభం, ₹1,000 మీ పెట్టుబడి తిరిగి. సూత్రం: <span className="text-brand-gold">స్టేక్ × ఆడ్స్ = మొత్తం రిటర్న్</span>. అంటే మీరు ₹500 పెట్టి, ఆడ్స్ 2.50 అయితే — ₹500 × 2.50 = ₹1,250 తిరిగి వస్తుంది, లాభం ₹750.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              <span className="text-brand-gold font-semibold">ఆచరణాత్మక ఉదాహరణ:</span> IPL లో చివరి ఓవర్‌లో RCB కి 14 రన్స్ కావాలి. DafaBet RCB కి 3.50 ఆడ్స్, SRH కి 1.35 ఆడ్స్ ఇస్తోంది. మీరు ₹500 RCB కి పెడితే — ₹500 × 3.50 = ₹1,750 తిరిగి వస్తుంది (₹1,250 లాభం). SRH కి ₹500 పెడితే — ₹500 × 1.35 = ₹675 తిరిగి వస్తుంది (₹175 లాభం). SRH ఫేవరెట్ కాబట్టి ఆడ్స్ తక్కువ, RCB అండర్‌డాగ్ కాబట్టి ఆడ్స్ ఎక్కువ.
            </p>
            <p className="text-gray-400 leading-relaxed">
              2.00 కంటే తక్కువ ఆడ్స్ ఉన్న జట్టు బుక్‌మేకర్ దృష్టిలో ఫేవరెట్. 2.00 కంటే ఎక్కువ ఉంటే అండర్‌డాగ్. లైవ్ బెట్టింగ్‌లో ఆడ్స్ ఒక్కో బాల్‌కూ మారతాయి — వికెట్ పడినప్పుడు, సిక్స్ అడిచినప్పుడు, వైడ్ వచ్చినప్పుడు అన్నింటికీ వేగంగా అప్‌డేట్ అవుతాయి.
            </p>
          </div>

          {/* Section 5: బెట్ రకాలు */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">బెట్ రకాలు</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaBet లో అనేక రకాల బెట్లు వేయవచ్చు. ప్రతి రకం అర్థం తెలుసుకుంటే మీరు స్మార్ట్‌గా పందెం వేయగలరు:
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed space-y-4">
              <li>
                <span className="text-brand-gold font-semibold">మ్యాచ్ విన్నర్ (1X2):</span> అత్యంత సరళమైన బెట్ — ఏ జట్టు గెలుస్తుందో ఎంచుకోండి. ఫుట్‌బాల్‌లో 1X2 అంటే హోమ్ విన్ (1), డ్రా (X), అవే విన్ (2) అనే మూడు ఆప్షన్లు. క్రికెట్‌లో డ్రా ఉండదు కాబట్టి రెండే ఆప్షన్లు ఉంటాయి.
              </li>
              <li>
                <span className="text-brand-gold font-semibold">హ్యాండీక్యాప్:</span> అసమాన మ్యాచ్‌లలో ఫేవరెట్‌కు నెగటివ్ హ్యాండీక్యాప్ ఇస్తారు. ఉదాహరణకు MI కి −12.5 రన్స్ హ్యాండీక్యాప్ అంటే, MI 13+ రన్స్ తేడాతో గెలిస్తేనే మీ బెట్ గెలుస్తుంది. DC కి +12.5 అంటే DC 12 లేదా తక్కువ రన్స్ తేడాతో ఓడినా, లేదా గెలిచినా మీ బెట్ గెలుస్తుంది.
              </li>
              <li>
                <span className="text-brand-gold font-semibold">Over/Under (Totals):</span> ఒక మ్యాచ్‌లో మొత్తం రన్స్, గోల్స్, పాయింట్లు నిర్ణీత సంఖ్యకు పైన ఉంటాయా కిందన ఉంటాయా అని పందెం. T20 మ్యాచ్‌లో లైన్ 168.5 అంటే — Over బెట్ వేస్తే 169+ రన్స్ పడాలి, Under వేస్తే 168 లేదా తక్కువ రన్స్ పడాలి.
              </li>
              <li>
                <span className="text-brand-gold font-semibold">Accumulator (పార్లే):</span> మూడు లేదా ఎక్కువ సెలెక్షన్లు కలిపి ఒకే బెట్‌గా వేయడం. అన్నీ సరిగ్గా ఉంటేనే పే-అవుట్. ఆడ్స్ గుణించబడతాయి — 3 సెలెక్షన్లు 1.80 చొప్పున అయితే 1.80 × 1.80 × 1.80 = 5.83 కంబైన్డ్ ఆడ్స్ వస్తాయి. ₹500 పెడితే ₹2,915 తిరిగి వస్తుంది. కానీ ఒక్క సెలెక్షన్ తప్పయినా మొత్తం బెట్ వదిలిపోతుంది.
              </li>
            </ul>
          </div>

          {/* Section 6: మొదటి బెట్ ఎలా వేయాలి */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">మొదటి బెట్ ఎలా వేయాలి — 7 దశలు</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaBet లో మొట్టమొదటి బెట్ వేయడం చాలా సులభం. ఖాతా సిద్ధంగా ఉంటే 5 నిమిషాల్లో పూర్తవుతుంది:
            </p>
            <ol className="text-gray-400 text-sm leading-relaxed space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold flex-shrink-0 w-5">1.</span>
                <div><span className="text-white font-semibold">నమోదు చేయండి</span> — DafaBet వెబ్‌సైట్ లేదా యాప్ తెరవండి. &quot;రిజిస్టర్&quot; నొక్కండి, మీ మొబైల్ నంబర్ నమోదు చేయండి, OTP ద్వారా వెరిఫై చేయండి. ఈ ప్రక్రియ 90 సెకన్లలో పూర్తవుతుంది.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold flex-shrink-0 w-5">2.</span>
                <div><span className="text-white font-semibold">₹500 UPI ద్వారా జమ చేయండి</span> — Cashier → Deposit నొక్కండి. UPI ఎంచుకోండి, ₹500 నమోదు చేయండి. PhonePe, GPay, లేదా Paytm లో పేమెంట్ ఆమోదించండి. 60 సెకన్లలోనే మీ ఖాతాలో జమ అవుతుంది.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold flex-shrink-0 w-5">3.</span>
                <div><span className="text-white font-semibold">Sports నొక్కండి</span> — పై నావిగేషన్‌లో &quot;Sports&quot; ట్యాబ్ నొక్కండి. భారతీయ యూజర్లకు క్రికెట్ అగ్రస్థానంలో కనిపిస్తుంది.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold flex-shrink-0 w-5">4.</span>
                <div><span className="text-white font-semibold">మ్యాచ్ కనుగొనండి</span> — స్పోర్ట్ ద్వారా బ్రౌజ్ చేయండి లేదా సెర్చ్ బార్ వాడండి. మీకు కావలసిన మ్యాచ్ నొక్కండి, మార్కెట్ జాబితా తెరుచుకుంటుంది.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold flex-shrink-0 w-5">5.</span>
                <div><span className="text-white font-semibold">మార్కెట్ ఎంచుకోండి</span> — మొదటిసారి అయితే &quot;మ్యాచ్ విన్నర్&quot; ఎంచుకోండి. మీకు నచ్చిన జట్టు పక్కన ఉన్న ఆడ్స్ నొక్కండి — సెలెక్షన్ బెట్ స్లిప్‌లో చేరుతుంది.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold flex-shrink-0 w-5">6.</span>
                <div><span className="text-white font-semibold">స్టేక్ నమోదు చేయండి</span> — మీరు ఎంత పెట్టాలనుకుంటున్నారో నమోదు చేయండి (కనీసం ₹50). బెట్ స్లిప్ మీ సంభావ్య రిటర్న్ వెంటనే చూపిస్తుంది.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-gold font-bold flex-shrink-0 w-5">7.</span>
                <div><span className="text-white font-semibold">బెట్ నిర్ధారించండి</span> — &quot;Place Bet&quot; నొక్కండి. కన్ఫర్మేషన్ స్క్రీన్‌లో బెట్ రిఫరెన్స్ నంబర్ చూపిస్తుంది. మ్యాచ్ ముగిశాక &quot;My Bets&quot; లో ఫలితం చూడవచ్చు.</div>
              </li>
            </ol>
          </div>

          {/* Section 7: AP/తెలంగాణ నోట్ */}
          <div className="card mb-6 border-yellow-600/40">
            <h3 className="text-brand-gold font-bold text-lg mb-4">ఆంధ్రప్రదేశ్ &amp; తెలంగాణ — చట్టపరమైన నోట్</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              ఆంధ్రప్రదేశ్ 2020 లో Gaming Act లో సవరణ చేసి ఆన్‌లైన్ గేమింగ్ మరియు పందెం నిషేధించింది. తెలంగాణ 2017 లో Telangana Gaming Act (Amendment) ద్వారా ఆన్‌లైన్ గేమ్స్‌కు ఆంక్షలు విధించింది.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaBet ఒక ఆఫ్‌షోర్ ఆపరేటర్ — Curaçao లైసెన్స్ కింద నడుస్తుంది. AP లేదా తెలంగాణలో నివాసించే వ్యక్తులు ఈ ప్లాట్‌ఫామ్ వాడే ముందు స్వంత నిర్ణయం తీసుకోవాలి. స్థానిక చట్టాల గురించి స్వతంత్రంగా సమాచారం సేకరించండి.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm">
              <strong className="text-white">గమనిక:</strong> ఇది చట్టపరమైన సలహా కాదు. DafaWin ఒక రివ్యూ వెబ్‌సైట్ మాత్రమే — ఇక్కడ ఇవ్వబడిన సమాచారం సాధారణ మార్గదర్శకత్వం కోసం మాత్రమే. స్పోర్ట్స్ బెట్టింగ్ మీ రాష్ట్రంలో చట్టబద్ధమైందా కాదా అని మీ స్వంత న్యాయవాది లేదా అధికారిక వనరుల ద్వారా నిర్ధారించుకోండి.
            </p>
          </div>

          {/* Section 8: FAQ Telugu */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">తరచుగా అడిగే ప్రశ్నలు (Telugu FAQ)</h3>
            <div className="space-y-4">
              <details className="border-b border-brand-border pb-4">
                <summary className="flex justify-between items-start cursor-pointer list-none py-1">
                  <span className="font-semibold text-white text-sm">DafaBet లో ఏ క్రీడలపై పందెం వేయవచ్చు?</span>
                  <span className="text-brand-gold text-xl flex-shrink-0 ml-4">+</span>
                </summary>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  DafaBet లో క్రికెట్ (IPL, T20 వరల్డ్ కప్, ODI వరల్డ్ కప్, Asia Cup, అంతర్జాతీయ సిరీస్‌లు), ఫుట్‌బాల్ (ISL, EPL, UCL, FIFA), కబడ్డీ (PKL), టెన్నిస్, బ్యాడ్మింటన్, బాస్కెట్‌బాల్, హాకీ, బాక్సింగ్, ఎస్‌పోర్ట్స్ (BGMI, Valorant, CS2) మరియు మరిన్ని 35 కంటే ఎక్కువ క్రీడలపై పందెం వేయవచ్చు. IPL మరియు T20 అంతర్జాతీయ మ్యాచ్‌లకు అత్యధిక మార్కెట్ వైవిధ్యం అందుబాటులో ఉంటుంది.
                </p>
              </details>
              <details className="border-b border-brand-border pb-4">
                <summary className="flex justify-between items-start cursor-pointer list-none py-1">
                  <span className="font-semibold text-white text-sm">స్పోర్ట్స్ బెట్టింగ్ కనీస పందెం ఎంత?</span>
                  <span className="text-brand-gold text-xl flex-shrink-0 ml-4">+</span>
                </summary>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  DafaBet లో చాలా స్పోర్ట్స్ మార్కెట్లలో కనీస పందెం ₹50. ఇది చాలా తక్కువ అమౌంట్ కాబట్టి కొత్త బెట్టర్లు తక్కువ రిస్క్‌తో ప్రారంభించవచ్చు. కనీస డిపాజిట్ ₹500 — UPI, PhonePe, GPay, Paytm ద్వారా ₹500 జమ చేస్తే 10 వేర్వేరు ₹50 బెట్లు వేయవచ్చు. ఇది బెట్టింగ్ నేర్చుకోవడానికి మంచి మార్గం.
                </p>
              </details>
              <details className="border-b border-brand-border pb-4">
                <summary className="flex justify-between items-start cursor-pointer list-none py-1">
                  <span className="font-semibold text-white text-sm">లైవ్ బెట్టింగ్ అంటే ఏమిటి?</span>
                  <span className="text-brand-gold text-xl flex-shrink-0 ml-4">+</span>
                </summary>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  లైవ్ బెట్టింగ్ అంటే మ్యాచ్ జరుగుతున్నప్పుడు రియల్-టైమ్‌లో పందెం వేయడం. DafaBet లో క్రికెట్‌లో ఒక్కో బాల్‌కూ ఆడ్స్ మారతాయి — వికెట్ పడినప్పుడు, నో-బాల్ వచ్చినప్పుడు, సిక్స్ అడిచినప్పుడు అన్నింటికీ. ఫుట్‌బాల్‌లో ఒక్కో గోల్‌కూ, కబడ్డీలో ఒక్కో రైడ్‌కూ ఆడ్స్ అప్‌డేట్ అవుతాయి. క్యాష్-అవుట్ ఫీచర్ చాలా లైవ్ బెట్లకు అందుబాటులో ఉంటుంది — మ్యాచ్ ముగియక ముందే నిర్ణీత మొత్తం తీసుకోవచ్చు.
                </p>
              </details>
              <details className="pb-2">
                <summary className="flex justify-between items-start cursor-pointer list-none py-1">
                  <span className="font-semibold text-white text-sm">వేజరింగ్ కోసం స్పోర్ట్స్ బెట్‌లు లెక్కింపబడతాయా?</span>
                  <span className="text-brand-gold text-xl flex-shrink-0 ml-4">+</span>
                </summary>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  అవును. DafaBet వెల్‌కం బోనస్ (200% వరకు ₹20,000) 8× వేజరింగ్ అవసరకత కలిగి ఉంటుంది. స్పోర్ట్స్ బెట్లు ఈ వేజరింగ్ అవసరకత పూర్తి చేయడానికి 100% లెక్కింపబడతాయి. అంటే ₹500 బోనస్ పొంది, 8× = ₹4,000 వేయాలంటే, ₹4,000 విలువ స్పోర్ట్స్ బెట్లు వేయాలి. ఆడ్స్ 1.50 కంటే ఎక్కువ ఉన్న బెట్లు మాత్రమే వేజరింగ్‌లో లెక్కింపబడతాయి — నిబంధనలు వెబ్‌సైట్‌లో నిర్ధారించుకోండి.
                </p>
              </details>
            </div>
          </div>

          {/* Section 9: బాధ్యతాయుత జూదం */}
          <div className="card mb-6 border-red-800/40 bg-red-950/20">
            <h3 className="text-brand-gold font-bold text-lg mb-4">బాధ్యతాయుత జూదం — సహాయ వనరులు</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              స్పోర్ట్స్ బెట్టింగ్ వినోదం కోసం మాత్రమే. <span className="text-white font-semibold">18+ మాత్రమే</span> DafaBet లో ఖాతా తెరవగలరు. మీరు లేదా మీకు తెలిసిన వ్యక్తి జూద సమస్యల వల్ల ఇబ్బంది పడుతుంటే, ఈ క్రింది సహాయ వనరులను సంప్రదించండి:
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed space-y-2 mb-4">
              <li>
                <span className="text-brand-gold font-semibold">Vandrevala Foundation:</span> <span className="text-white">1860-2662-345</span> — 24/7, ఉచితం, రహస్యం. తెలుగులో కూడా మాట్లాడవచ్చు.
              </li>
              <li>
                <span className="text-brand-gold font-semibold">iCall (TISS):</span> <span className="text-white">9152987821</span> — సోమవారం–శనివారం, ఉదయం 8 నుండి రాత్రి 10 వరకు.
              </li>
            </ul>
            <p className="text-gray-400 text-sm leading-relaxed">
              నష్టాలు వెంబడించకండి — ఓడిపోయిన డబ్బు తిరిగి రాబట్టుకోవడానికి పెద్ద మొత్తాలు వేయకండి. మీ బడ్జెట్ నిర్ణయించుకోండి, దానికి కట్టుబడి ఉండండి. DafaBet లో డిపాజిట్ లిమిట్లు, సెల్ఫ్-ఎక్స్‌క్లూజన్ ఆప్షన్లు అందుబాటులో ఉంటాయి — అవసరమైతే వాటిని వాడుకోండి.
            </p>
          </div>

          {/* Quick Links */}
          <div className="card">
            <h3 className="text-brand-gold font-bold text-base mb-4">సంబంధిత గైడ్‌లు</h3>
            <div className="flex flex-col gap-2">
              <Link href="/cricket-betting" className="text-brand-gold hover:underline text-sm">క్రికెట్ బెట్టింగ్ గైడ్</Link>
              <Link href="/ipl-betting" className="text-brand-gold hover:underline text-sm">IPL బెట్టింగ్</Link>
              <Link href="/dafabet-bonus" className="text-brand-gold hover:underline text-sm">DafaBet బోనస్</Link>
            </div>
          </div>

        </section>
      )}

      {/* FAQ — English only */}
      {locale !== 'te' && (
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
      )}
    </>
  )
}

export default async function SportsBettingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <SportsBettingContent locale={locale} />
}
