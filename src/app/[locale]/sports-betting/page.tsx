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

      {/* Telugu Section */}
      {locale === 'te' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="section-title mb-6">స్పోర్ట్స్ పందెం తెలుగు గైడ్</h2>

          {/* Block 1: Sports overview */}
          <div className="card mb-6">
            <h3 className="font-semibold text-brand-gold mb-2">తెలుగు ఆటగాళ్ళకు ముఖ్యమైన క్రీడలు</h3>
            <ul className="text-gray-400 text-sm leading-relaxed space-y-2">
              <li><span className="text-brand-gold font-semibold">క్రికెట్:</span> IPL, T20 వరల్డ్ కప్, ఇండియా vs పాకిస్తాన్ — DafaWin క్రికెట్‌కి బలంగా ఉంది. సన్‌రైజర్స్ హైదరాబాద్ IPL జట్టుపై ప్రత్యేక దృష్టి.</li>
              <li><span className="text-brand-gold font-semibold">ఫుట్‌బాల్:</span> ISL హైదరాబాద్ FC, ప్రీమియర్ లీగ్, చాంపియన్స్ లీగ్ — AP, తెలంగాణ సపోర్టర్ క్లబ్‌లు ఉన్న లీగ్‌లు అన్నీ కవర్.</li>
              <li><span className="text-brand-gold font-semibold">కబడ్డీ:</span> Pro Kabaddi League — ప్రతి PKL మ్యాచ్‌కి పూర్తి లైవ్ కవరేజ్.</li>
            </ul>
          </div>

          {/* Block 2: Comparison table */}
          <div className="card mb-6 overflow-x-auto">
            <h3 className="font-semibold text-brand-gold mb-4">దాఫాబెట్ vs ఇతర సైట్‌లు — తెలుగు ఆటగాళ్ళకు</h3>
            <table className="w-full text-sm border border-brand-border">
              <thead>
                <tr className="border-b border-brand-border bg-brand-surface">
                  <th className="text-left py-2 px-3 text-brand-gold font-semibold">సైట్</th>
                  <th className="text-left py-2 px-3 text-brand-gold font-semibold">వెల్‌కం బోనస్</th>
                  <th className="text-left py-2 px-3 text-brand-gold font-semibold">కనీస జమ</th>
                  <th className="text-left py-2 px-3 text-brand-gold font-semibold">క్రికెట్</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-brand-border bg-brand-surface">
                  <td className="py-2 px-3 text-brand-gold font-bold">దాఫాబెట్ ⭐</td>
                  <td className="py-2 px-3 text-gray-400">200% రూ.20,000 వరకు</td>
                  <td className="py-2 px-3 text-gray-400">రూ.500</td>
                  <td className="py-2 px-3 text-gray-400">250+ మార్కెట్లు/మ్యాచ్</td>
                </tr>
                <tr className="border-b border-brand-border">
                  <td className="py-2 px-3 text-white font-semibold">Betway</td>
                  <td className="py-2 px-3 text-gray-400">100% రూ.2,500 వరకు</td>
                  <td className="py-2 px-3 text-gray-400">రూ.1,000</td>
                  <td className="py-2 px-3 text-gray-400">150+ మార్కెట్లు/మ్యాచ్</td>
                </tr>
                <tr className="border-b border-brand-border">
                  <td className="py-2 px-3 text-white font-semibold">10Cric</td>
                  <td className="py-2 px-3 text-gray-400">150% రూ.10,000 వరకు</td>
                  <td className="py-2 px-3 text-gray-400">రూ.1,000</td>
                  <td className="py-2 px-3 text-gray-400">100+ మార్కెట్లు/మ్యాచ్</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Block 3: Quick links */}
          <div className="card">
            <p className="text-gray-400 text-sm mb-3">సంబంధిత పేజీలు:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/cricket-betting" className="btn-primary text-sm px-4 py-2">క్రికెట్ పందెం</Link>
              <Link href="/ipl-betting" className="btn-primary text-sm px-4 py-2">IPL పందెం</Link>
              <Link href="/football-betting" className="btn-primary text-sm px-4 py-2">ఫుట్‌బాల్ పందెం</Link>
              <Link href="/kabaddi-betting" className="btn-primary text-sm px-4 py-2">కబడ్డీ పందెం</Link>
            </div>
          </div>
        </section>
      )}

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
