import type { Metadata } from 'next'
import Image from 'next/image'
import { JsonLd } from '@/components/JsonLd'
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, pageOGMeta, SITE_URL } from '@/lib/seo'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'casino' })
  const alts = pageAlternates(locale, '/online-casino/')
  const title = t('title')
  const description = t('description')
  return {
    title,
    description,
    alternates: { canonical: alts.canonical, languages: alts.languages },
    ...pageOGMeta({ title, description, canonicalUrl: alts.canonical, locale }),
  }
}

function CasinoContent({ locale }: { locale: string }) {
  const t = useTranslations('casino')
  const tCommon = useTranslations('common')

  const faqs = [
    { question: 'What casino games does DafaBet offer?', answer: 'Live tables (Teen Patti, Andar Bahar, Roulette, Blackjack, Baccarat), 2,000+ slots, poker, and rummy.' },
    { question: 'Is the DafaBet casino safe?', answer: 'Yes, the live casino is powered by Evolution and Ezugi — licensed studios with independent auditing.' },
    { question: 'Can I play Teen Patti at DafaBet?', answer: 'Yes, live Teen Patti tables with Hindi-speaking dealers are available 24/7.' },
    { question: 'What welcome bonus is available?', answer: '200% match up to ₹20,000 on first deposit (minimum deposit ₹500).' },
    { question: 'How do I deposit to play casino games?', answer: 'UPI, Paytm, PhonePe, or net banking — minimum ₹500. Funds are credited instantly.' },
    { question: 'What is the RTP of DafaBet casino games?', answer: 'Slots average 94–97% RTP; live casino games like Blackjack can reach 99.5% with optimal strategy. Exact RTPs vary by provider and game; Evolution and Ezugi publish game RTPs on their sites.' },
    { question: 'Can I play DafaBet casino on my mobile phone?', answer: 'Yes. The Android app (APK download) and iOS app (App Store) both offer full casino access. The mobile browser version also works on all devices.' },
    { question: 'Are the casino games at DafaBet fair?', answer: 'Yes. DafaBet\'s casino games are supplied by licensed providers (Evolution, Ezugi, Pragmatic Play, Microgaming, NetEnt) that undergo independent RNG audits. The Curaçao eGaming licence 1668/JAZ requires compliance with fair-play standards.' },
  ]

  const pageUrl = `${SITE_URL}/online-casino/`

  const schemaData = [
    articleSchema({ headline: t('title'), description: t('description'), url: pageUrl, datePublished: '2025-01-01', locale }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL + '/' },
      { name: 'Online Casino', url: pageUrl },
    ]),
  ]

  const categories = [
    { emoji: '🎲', name: 'Live Casino', desc: 'Real dealers, real tables' },
    { emoji: '🎰', name: 'Slots', desc: '2,000+ slot titles' },
    { emoji: '🔴', name: 'Roulette', desc: 'European & live variants' },
    { emoji: '🃏', name: 'Blackjack', desc: 'Classic & multi-hand' },
  ]

  const casinoGames = [
    { src: '/images/casino-game-1.jpg', name: 'Live Roulette' },
    { src: '/images/casino-game-2.jpg', name: 'Blackjack Classic' },
    { src: '/images/casino-game-3.jpg', name: 'Baccarat' },
    { src: '/images/casino-game-4.jpg', name: 'Dragon Tiger' },
    { src: '/images/casino-game-5.jpg', name: 'Teen Patti' },
    { src: '/images/casino-game-6.jpg', name: 'Mega Slots' },
  ]

  const liveStats = [
    { value: '50+', label: 'Live Tables' },
    { value: 'HD', label: 'Streaming' },
    { value: 'Hindi', label: 'Dealers' },
    { value: '24/7', label: 'Mobile Ready' },
  ]

  const cardGames = [
    {
      name: 'Teen Patti',
      desc: 'India\'s most-loved card game, and DafaBet has 7+ variants to choose from — Classic, Joker, Hilo, One-Day, and Speed among them. Stakes run from ₹10 to ₹10,000 per hand, so both casual players and high-rollers are catered for. Live Teen Patti tables with Hindi-speaking dealers are available around the clock, complete with pair-plus and 6-card bonus side bets.',
    },
    {
      name: 'Andar Bahar',
      desc: 'The purest 50/50 game in the room. A single card is dealt face-up, and you bet whether the matching card appears on the Andar (inside) or Bahar (outside) side. Rounds complete in under 30 seconds, making it the fastest game in the casino. Live RTP sits at approximately 97%, and multiple live tables run simultaneously so you\'re never waiting.',
    },
    {
      name: 'Rummy',
      desc: 'DafaBet covers the three main formats Indians love: Points Rummy for quick sessions, Pool Rummy for a longer grind, and 13-card cash tables for real-money play. Rummy is recognised as a game of skill under Indian law, and a practice mode is available so newcomers can learn the melds and sequences before committing money.',
    },
    {
      name: 'Poker',
      desc: 'Texas Hold\'em at live tables and as video poker — plus 3-Card Poker for players who want faster action. Beginner tables carry lower buy-ins so you can learn position, pot odds, and hand reading without over-exposure. Weekend tournaments run regularly with guaranteed prize pools.',
    },
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      {/* English content — only for non-te locales */}
      {locale !== 'te' && (
        <>
      {/* Hero */}
      <section className="relative h-[350px] md:h-[420px] overflow-hidden">
        <Image
          src="/images/casino.webp"
          alt="Dafabet online casino India"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <span className="red-badge mb-4">🎰 2,000+ GAMES</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-xl">
            Online Casino at <span className="gold-text">DafaBet India</span>
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-md">
            Live Teen Patti, Andar Bahar, Evolution tables, and 2,000+ slots — with a 200% welcome bonus up to ₹20,000.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/dafabet-registration" className="btn-primary">
              Play Now →
            </Link>
            <Link href="/online-casino" className="btn-secondary">
              Browse Games
            </Link>
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="bg-brand-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div key={cat.name} className="card text-center">
                <div className="text-3xl mb-2">{cat.emoji}</div>
                <h3 className="text-brand-gold font-bold mb-1">{cat.name}</h3>
                <p className="text-gray-400 text-sm">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Game grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">Featured Casino Games</h2>
          <p className="text-gray-400 mb-8">Play the most popular titles at DafaBet India.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {casinoGames.map((game) => (
              <div key={game.name} className="relative rounded-lg overflow-hidden group aspect-[325/250]">
                <Image
                  src={game.src}
                  alt={game.name}
                  width={325}
                  height={250}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-end p-2">
                  <p className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {game.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Card Games section */}
      <section className="bg-brand-surface py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">Card Games</h2>
          <p className="text-gray-400 mb-8">The Indian card lobby at DafaBet — from Teen Patti and Andar Bahar to rummy and poker.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cardGames.map((game) => (
              <div key={game.name} className="card card-hover">
                <h3 className="gold-text font-bold text-lg mb-2">{game.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{game.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goa Casino Connection section */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-6">The Goa Casino Connection</h2>
          <div className="card border-l-4 border-brand-gold">
            <p className="text-gray-300 leading-relaxed">
              If you&apos;ve played on Deltin Royale or Casino Pride on the Mandovi, the DafaBet lobby will feel familiar.
              Andar Bahar, Teen Patti, Mini-Flush, Roulette, and Baccarat — the Goa casino floor translated online,
              with Hindi-speaking dealers and UPI withdrawals instead of chips.
            </p>
          </div>
        </div>
      </section>

      {/* Live Casino Studios section */}
      <section className="bg-brand-surface py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="verdict-box">
            <p className="text-brand-gold font-bold text-sm uppercase tracking-wide mb-2">Live Casino Studios</p>
            <h2 className="text-white text-xl font-bold mb-4">
              Evolution &amp; Ezugi — Audited, Licensed, Hindi-Ready
            </h2>
            <div className="space-y-4 text-gray-400 text-sm mb-6">
              <div>
                <p className="text-white font-semibold mb-1">Evolution Gaming</p>
                <p className="leading-relaxed">
                  Evolution is the world&apos;s largest live casino studio, and DafaBet carries 50+ live tables from their
                  catalogue. The headline titles are Lightning Roulette — where random multipliers can reach 500x on
                  straight-up number bets — and Crazy Time, a game-show wheel with four separate bonus rounds (Cash Hunt,
                  Pachinko, Coin Flip, and Crazy Time itself). MONOPOLY Live and Dream Catcher round out the game-show
                  offering. Classic tables cover Blackjack, Baccarat, and Speed Baccarat.
                </p>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Ezugi</p>
                <p className="leading-relaxed">
                  Ezugi is an India-focused live studio built around Hindi-speaking dealers and Indian game formats.
                  Their lobby at DafaBet includes live Teen Patti, Andar Bahar, Baccarat, and Hindi Roulette. If you
                  want a dealer who can explain the game in Hindi or switch to the Indian-style variants, Ezugi is where
                  you go.
                </p>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Why &ldquo;Audited&rdquo; Matters</p>
                <p className="leading-relaxed">
                  Both studios undergo independent RNG and outcome audits by third-party testing labs. Published
                  return-to-player percentages and game logs are available, so you can verify that outcomes are random
                  rather than taking the operator&apos;s word for it. Streams run in HD 24/7, and every DafaBet live
                  casino session is playable from mobile without any loss of quality.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {liveStats.map((stat) => (
                <div key={stat.label} className="stat-box">
                  <p className="text-brand-gold text-xl font-bold">{stat.value}</p>
                  <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section A: Slots Deep Dive */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="section-title mb-4">Best Online Slots at DafaBet India</h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            DafaBet carries 2,000+ slot titles from the biggest names in the industry. Whether you prefer
            high-volatility bomb drops or steady low-variance spins, there is a slot built for your style.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="card">
              <h3 className="text-brand-gold font-bold mb-2">Pragmatic Play</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Gates of Olympus, Sweet Bonanza, and Wolf Gold are the standout titles. Gates of Olympus is a
                tumble-mechanic slot where multipliers stack during free spins — wins exceeding 5,000x the stake have
                been recorded. All three are high-volatility games designed for players chasing large single wins rather
                than frequent small payouts.
              </p>
            </div>
            <div className="card">
              <h3 className="text-brand-gold font-bold mb-2">NetEnt</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Starburst, Gonzo&apos;s Quest, and Divine Fortune are the classics. NetEnt slots run at lower variance,
                meaning more frequent hits and a steadier session. Starburst&apos;s expanding wilds and re-spins make it
                a favourite for bonus wagering because wins come consistently rather than in one giant burst.
              </p>
            </div>
            <div className="card">
              <h3 className="text-brand-gold font-bold mb-2">Microgaming</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Mega Moolah is Microgaming&apos;s flagship — a progressive jackpot slot where prizes have historically
                exceeded ₹1 crore (and significantly more in global terms). Book of Oz is a medium-variance alternative
                from the same stable. Microgaming is one of the oldest slot providers, with a track record dating back
                to the mid-1990s.
              </p>
            </div>
            <div className="card">
              <h3 className="text-brand-gold font-bold mb-2">BGaming</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                BGaming produces India-themed content including Book of Cats and several crash-adjacent titles popular
                with Indian players. Their games tend to be mobile-first with clean interfaces — a good starting point
                if you are new to slots and want straightforward mechanics before moving to more complex titles.
              </p>
            </div>
          </div>
          <div className="card border-l-4 border-brand-gold">
            <p className="text-white font-semibold mb-2">How Slots Work — a Plain-English Summary</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Reels spin and stop on symbol combinations. Paylines (or &ldquo;ways&rdquo; in modern slots) determine which
              combinations pay. RTP (return to player) is the percentage of all money wagered that the game pays back
              over millions of spins — a 96% RTP slot returns ₹96 per ₹100 wagered on average. Variance describes how
              that return is distributed: high-variance slots pay rarely but big; low-variance slots pay often but small.
            </p>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              <span className="text-white font-medium">Practical tips:</span> try demo mode before playing for money —
              most slots at DafaBet have a free-play version. Set a session budget before you start. Check the RTP in
              the game info panel; anything above 96% is considered good for a slot.
            </p>
          </div>
        </div>
      </section>

      {/* Section B: RTP and House Edge Education */}
      <section className="bg-brand-surface py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="section-title mb-4">Understanding RTP and House Edge</h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Two numbers appear on almost every casino game. Understanding them helps you choose games wisely and manage
            your bankroll with realistic expectations.
          </p>
          <div className="card mb-4">
            <p className="text-white font-semibold mb-2">Return to Player (RTP)</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              RTP is the percentage of all money wagered on a game that is returned to players as winnings over a very
              large number of rounds. A slot with 96% RTP returns ₹96 for every ₹100 wagered — on average, across
              millions of spins. It is a long-term statistical average, not a guarantee per session. In any single session
              you might win significantly more or lose everything, depending on variance and luck.
            </p>
          </div>
          <div className="card mb-4">
            <p className="text-white font-semibold mb-2">House Edge</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              House edge is the casino&apos;s statistical advantage, expressed as a percentage. It is simply 100% minus the
              RTP. A 96% RTP slot has a 4% house edge. The lower the house edge, the better the theoretical value for
              the player.
            </p>
          </div>
          <div className="card">
            <p className="text-white font-semibold mb-3">RTP by Game Type — a Quick Reference</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="text-brand-gold font-medium">Blackjack (basic strategy):</span> ~99.5% RTP — one of the lowest house edges in the casino.</li>
              <li><span className="text-brand-gold font-medium">European Roulette:</span> ~97.3% RTP (2.7% house edge). Avoid American Roulette — the double zero raises the house edge to 5.26%.</li>
              <li><span className="text-brand-gold font-medium">Teen Patti:</span> approximately 95–97% RTP depending on variant and side bets.</li>
              <li><span className="text-brand-gold font-medium">Slots:</span> typically 94–97% RTP at DafaBet. Check individual game info for the exact figure.</li>
              <li><span className="text-brand-gold font-medium">Progressive jackpot slots:</span> RTP is often lower (88–92%) because a portion of each stake feeds the jackpot pool.</li>
            </ul>
            <p className="text-gray-400 text-sm mt-3">
              Evolution and Ezugi publish their RTPs directly on their studio sites. DafaBet&apos;s live casino games
              inherit those published figures.
            </p>
          </div>
        </div>
      </section>

      {/* Section C: Bonus and Wagering Worked Example */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="section-title mb-4">DafaBet Casino Welcome Bonus — How It Works</h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            The 200% welcome bonus up to ₹20,000 is the most common reason new players choose DafaBet over other
            operators. Here is exactly how it works, with a real numbers example.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="card text-center">
              <p className="text-brand-gold text-2xl font-bold mb-1">200%</p>
              <p className="text-gray-400 text-sm">Match bonus on first deposit</p>
            </div>
            <div className="card text-center">
              <p className="text-brand-gold text-2xl font-bold mb-1">₹20,000</p>
              <p className="text-gray-400 text-sm">Maximum bonus amount</p>
            </div>
            <div className="card text-center">
              <p className="text-brand-gold text-2xl font-bold mb-1">8x</p>
              <p className="text-gray-400 text-sm">Wagering requirement on bonus</p>
            </div>
          </div>
          <div className="card mb-4">
            <p className="text-white font-semibold mb-3">Worked Example</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="text-white">Step 1 —</span> Deposit ₹5,000 via UPI (minimum ₹500).</li>
              <li><span className="text-white">Step 2 —</span> Bonus credits automatically: 200% of ₹5,000 = ₹10,000 bonus.</li>
              <li><span className="text-white">Step 3 —</span> Total balance to play with: ₹5,000 + ₹10,000 = ₹15,000.</li>
              <li><span className="text-white">Step 4 —</span> Wagering requirement: 8x the bonus = ₹10,000 × 8 = ₹80,000 to wager before withdrawal.</li>
              <li><span className="text-white">Step 5 —</span> Complete ₹80,000 in eligible wagers within 30 days to unlock the bonus for withdrawal.</li>
            </ul>
          </div>
          <div className="card border-l-4 border-brand-gold">
            <p className="text-white font-semibold mb-2">Key Points on Wagering</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>No promo code required — the bonus credits automatically on your first deposit.</li>
              <li>Slot wagers count 100% towards the wagering requirement.</li>
              <li>Live casino game contribution rates vary — check the terms and conditions for the exact percentage per game type.</li>
              <li>Time limit is 30 days from when the bonus is activated.</li>
              <li>For fastest wagering clearance, play high-RTP slots (96%+) rather than progressive jackpot titles, which tend to carry lower RTPs and eat through your balance more quickly.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section D: How to Start Playing */}
      <section className="bg-brand-surface py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="section-title mb-4">How to Start Playing at DafaBet Casino — Beginners Guide</h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Getting started takes about five minutes. Here is the complete walkthrough from registration to your first
            real-money game.
          </p>
          <ol className="space-y-4">
            <li className="card flex gap-4">
              <span className="text-brand-gold font-bold text-xl min-w-[2rem]">1.</span>
              <div>
                <p className="text-white font-semibold mb-1">Register your account</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Click the registration link, enter your mobile number and email address, and choose a password.
                  The process takes under five minutes. You will receive an OTP on your mobile to verify your number.
                </p>
              </div>
            </li>
            <li className="card flex gap-4">
              <span className="text-brand-gold font-bold text-xl min-w-[2rem]">2.</span>
              <div>
                <p className="text-white font-semibold mb-1">Complete age verification (18+)</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  KYC requires a PAN card and Aadhaar. Age verification is mandatory before withdrawals are processed.
                  Upload clear photographs of both documents via the account settings panel.
                </p>
              </div>
            </li>
            <li className="card flex gap-4">
              <span className="text-brand-gold font-bold text-xl min-w-[2rem]">3.</span>
              <div>
                <p className="text-white font-semibold mb-1">Deposit via UPI</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Minimum deposit is ₹500. UPI transfers are credited instantly. PhonePe, Google Pay, and Paytm are
                  all accepted. Net banking is available for larger deposits.
                </p>
              </div>
            </li>
            <li className="card flex gap-4">
              <span className="text-brand-gold font-bold text-xl min-w-[2rem]">4.</span>
              <div>
                <p className="text-white font-semibold mb-1">Claim your 200% welcome bonus</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The bonus credits automatically on your first deposit — no promo code needed. The bonus is applied
                  to your account within minutes of the deposit clearing.
                </p>
              </div>
            </li>
            <li className="card flex gap-4">
              <span className="text-brand-gold font-bold text-xl min-w-[2rem]">5.</span>
              <div>
                <p className="text-white font-semibold mb-1">Browse the casino lobby</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Use the filters to narrow by game type (slots, live casino, table games), provider (Pragmatic Play,
                  Evolution, Ezugi, NetEnt), or by RTP if you want to compare expected returns before choosing.
                </p>
              </div>
            </li>
            <li className="card flex gap-4">
              <span className="text-brand-gold font-bold text-xl min-w-[2rem]">6.</span>
              <div>
                <p className="text-white font-semibold mb-1">Try demo mode first</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Most slots and many table games offer a free-play version with virtual chips. Use demo mode to
                  understand a game&apos;s mechanics, bonus triggers, and volatility before risking real money.
                </p>
              </div>
            </li>
            <li className="card flex gap-4">
              <span className="text-brand-gold font-bold text-xl min-w-[2rem]">7.</span>
              <div>
                <p className="text-white font-semibold mb-1">Set deposit and session limits</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Before your first real-money session, visit account settings and configure a daily or weekly deposit
                  limit and a session time reminder. This takes two minutes and helps you stay in control of your play.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Section E: Legal and Responsible Gambling */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="section-title mb-4">Online Casino in India — Legal Status and Responsible Play</h2>
          <div className="card mb-4">
            <p className="text-white font-semibold mb-2">Legal Status</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Online casino gaming in India exists in a legal grey area at the national level. There is no central
              Indian law that explicitly prohibits individual players from accessing offshore-licensed casino operators.
              DafaBet holds a Curaçao eGaming licence (1668/JAZ) and operates outside Indian jurisdiction. However,
              Andhra Pradesh and Telangana both have state-level restrictions on online gambling activities —
              if you are in either state, check your local laws before playing. This content does not constitute
              legal advice; if in doubt, consult a legal professional.
            </p>
          </div>
          <div className="card mb-4">
            <p className="text-white font-semibold mb-2">Responsible Gambling Tools at DafaBet</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="text-white">18+ only</span> — age is verified at KYC before withdrawals are processed.</li>
              <li><span className="text-white">Self-exclusion</span> — you can request account suspension for a set period via customer support.</li>
              <li><span className="text-white">Deposit limits</span> — daily, weekly, and monthly limits configurable in account settings.</li>
              <li><span className="text-white">Session reminders</span> — timed alerts remind you how long you have been playing.</li>
            </ul>
          </div>
          <div className="card border-l-4 border-red-500">
            <p className="text-white font-semibold mb-2">If Gambling Has Become a Problem</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="text-white">Vandrevala Foundation Helpline:</span> 1860-2662-345 — available 24/7, free, and confidential.</li>
              <li><span className="text-white">iCall (TISS):</span> 9152987821 — professional counselling service.</li>
            </ul>
            <p className="text-gray-400 text-sm mt-3">
              Gambling should be entertainment, not a source of income. Never chase losses, never gamble with money you
              cannot afford to lose, and use the limits tools proactively — not reactively.
            </p>
          </div>
        </div>
      </section>

        </>
      )}

      {/* Telugu Section */}
      {locale === 'te' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          <h2 className="section-title mb-8">ఆన్‌లైన్ కేసినో DafaBet ఇండియా 2026</h2>

          {/* Section 1: Teen Patti */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">Teen Patti — 7+ వేరియంట్లు</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Teen Patti ఇండియాలో అత్యంత జనాదరణ పొందిన పేకముక్కల ఆట. DafaBet లో 7 కంటే ఎక్కువ Teen Patti వేరియంట్లు అందుబాటులో ఉన్నాయి — ప్రతి వేరియంట్ విభిన్నమైన ఆసక్తిని అందిస్తుంది.
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed space-y-3">
              <li>
                <span className="text-brand-gold font-semibold">క్లాసిక్ Teen Patti:</span> సాంప్రదాయ 3-కార్డ్ ఆట. ప్రతి ఆటగాడు 3 కార్డులు పొందుతాడు, అత్యుత్తమ హ్యాండ్ గెలుస్తుంది. Pair, Flush, Straight, Three of a Kind వంటి హ్యాండ్ రేటింగ్‌లు ఇందులో ఉంటాయి. కనీస బెట్ ₹10, గరిష్ట బెట్ ₹10,000.
              </li>
              <li>
                <span className="text-brand-gold font-semibold">Joker Teen Patti:</span> ఒక అదనపు జోకర్ కార్డ్ జోడించబడుతుంది — ఇది ఏ కార్డ్ స్థానంలోనైనా ఉండగలదు. జోకర్ ఉన్న హ్యాండ్‌లు సాధారణ హ్యాండ్‌లను మించిపోతాయి.
              </li>
              <li>
                <span className="text-brand-gold font-semibold">Muflis (తిరగబడిన) Teen Patti:</span> తక్కువ హ్యాండ్ విలువ గల ఆటగాడు గెలుస్తాడు — సాంప్రదాయ నియమాలకు వ్యతిరేకంగా! అత్యంత ఆసక్తికరమైన వేరియంట్.
              </li>
              <li>
                <span className="text-brand-gold font-semibold">AK47 Teen Patti:</span> ఏస్, కింగ్, 4, 7 కార్డులు జోకర్‌లుగా పని చేస్తాయి. నాలుగు వైల్డ్ కార్డులతో ఈ వేరియంట్ చాలా ఉత్తేజకరంగా ఉంటుంది.
              </li>
              <li>
                <span className="text-brand-gold font-semibold">లైవ్ Teen Patti:</span> హిందీ-స్పీకింగ్ డీలర్లతో రియల్ టైమ్‌లో ఆడవచ్చు. Evolution మరియు Ezugi స్టూడియోల నుండి 24/7 లైవ్ స్ట్రీమింగ్. పెయిర్ ప్లస్ మరియు 6-కార్డ్ బోనస్ సైడ్ బెట్లు కూడా అందుబాటులో ఉంటాయి.
              </li>
            </ul>
          </div>

          {/* Section 2: Andar Bahar */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">Andar Bahar — సరళమైన, వేగమైన ఆట</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Andar Bahar కేసినో గేమ్‌లలో అత్యంత సరళమైన ఆట. ఒక కార్డ్ ముఖం పైకి డీల్ చేయబడుతుంది, మీరు అదే విలువ గల కార్డ్ Andar (ఒక వైపు) లో పడుతుందా Bahar (మరో వైపు) లో పడుతుందా అని పందెం వేస్తారు.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              <span className="text-brand-gold font-semibold">RTP (Return to Player):</span> Andar Bahar కి సుమారు 97% RTP ఉంటుంది — ఇది కేసినో గేమ్‌లలో చాలా మంచి రేటు. ప్రతి రౌండ్ 30 సెకన్లలోపు పూర్తవుతుంది — వేగమైన ఆట అనుభవం ఇస్తుంది.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaBet లో లైవ్ Andar Bahar టేబుళ్ళు 24/7 అందుబాటులో ఉంటాయి. Ezugi మరియు Evolution స్టూడియో నుండి వచ్చే హిందీ-స్పీకింగ్ డీలర్లతో నిజమైన కేసినో అనుభవం పొందవచ్చు. సైడ్ బెట్‌లు కూడా అందుబాటులో ఉంటాయి — మొదటి కార్డ్ ఎన్నో కార్డుల తర్వాత పడుతుందో పందెం వేయవచ్చు.
            </p>
            <p className="text-gray-400 leading-relaxed">
              మీకు కేసినో గేమ్‌లు కొత్తగా ఉంటే Andar Bahar నుండి మొదలు పెట్టండి — నియమాలు 30 సెకన్లలో అర్థమవుతాయి. పాక్షిక డిపాజిట్ బెట్‌లు (₹10 నుండి) అందుబాటులో ఉంటాయి కాబట్టి తక్కువ మొత్తంతో ప్రారంభించవచ్చు.
            </p>
          </div>

          {/* Section 3: Rummy */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">Rummy — 13 కార్డ్ రమ్మీ</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaBet లో మూడు రకాల రమ్మీ అందుబాటులో ఉన్నాయి — ఇండియన్ ఆటగాళ్ళు ఎక్కువగా ఇష్టపడే ఫార్మాట్‌లు:
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed space-y-3">
              <li>
                <span className="text-brand-gold font-semibold">పాయింట్స్ రమ్మీ:</span> వేగమైన సెషన్లకు. ఒక్కో ఆటలో 13 కార్డులు, మెల్డ్ చేసి గెలవండి. సాధారణంగా 10-15 నిమిషాల్లో పూర్తవుతుంది.
              </li>
              <li>
                <span className="text-brand-gold font-semibold">పూల్ రమ్మీ:</span> 101 లేదా 201 పాయింట్ల పూల్. ఎక్కువ పాయింట్లు చేరుకున్న ఆటగాడు ఎలిమినేట్ అవుతాడు. చివరి వరకు మిగిలిన ఆటగాడు గెలుస్తాడు.
              </li>
              <li>
                <span className="text-brand-gold font-semibold">క్యాష్ టేబుళ్ళు:</span> నిజమైన రూపాయలతో 2-6 ఆటగాళ్ళు ఆడవచ్చు. రమ్మీ భారత చట్టం కింద నైపుణ్య ఆటగా గుర్తించబడింది. అభ్యాస మోడ్ కూడా అందుబాటులో ఉంది.
              </li>
            </ul>
          </div>

          {/* Section 4: స్లాట్స్ */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">స్లాట్స్ గేమ్‌లు — 2,000+ టైటిళ్ళు</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaBet లో 2,000 కంటే ఎక్కువ స్లాట్ గేమ్‌లు అందుబాటులో ఉన్నాయి. Pragmatic Play, Microgaming, NetEnt, Playtech వంటి ప్రముఖ సంస్థల నుండి వచ్చిన గేమ్‌లు ఇందులో ఉంటాయి.
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed space-y-2">
              <li><span className="text-brand-gold font-semibold">Mega Moolah:</span> Microgaming యొక్క ప్రగతిశీల జాక్‌పాట్ స్లాట్. జాక్‌పాట్ కోట్లలో పెరుగుతుంది — ఒక స్పిన్‌లో జీవితం మారిపోవచ్చు.</li>
              <li><span className="text-brand-gold font-semibold">Gates of Olympus:</span> Pragmatic Play. 6×5 గ్రిడ్‌లో Tumble మెకానిజమ్ — ప్రతి గెలుపు కొత్త కాస్కేడ్ ట్రిగ్గర్ చేస్తుంది. ఉచిత స్పిన్‌లలో 500x వరకు గుణించవచ్చు.</li>
              <li><span className="text-brand-gold font-semibold">Sweet Bonanza:</span> పండ్లు మరియు బాంబుల గేమ్ — ట్రిగ్గర్ అయిన ఫ్రీ స్పిన్స్‌లో Multiplier బాంబులు పేలుతాయి.</li>
              <li><span className="text-brand-gold font-semibold">Big Bass Bonanza:</span> చేపలు పట్టే థీమ్ — Scatter సింబల్స్ బాంకర్ ఫ్రీ స్పిన్స్ ట్రిగ్గర్ చేస్తాయి.</li>
            </ul>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              చాలా స్లాట్ గేమ్‌లకు ఉచిత డెమో మోడ్ అందుబాటులో ఉంది — నిజమైన డబ్బు వేయకుండా మెకానిజమ్‌లు నేర్చుకోవచ్చు.
            </p>
          </div>

          {/* Section 5: లైవ్ కేసినో */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">లైవ్ కేసినో — Evolution &amp; Ezugi</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaBet లైవ్ కేసినో Evolution Gaming మరియు Ezugi స్టూడియోల ద్వారా నడుస్తుంది — ఇవి ప్రపంచంలో అత్యుత్తమ లైవ్ కేసినో ప్రొవైడర్లు.
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed space-y-3">
              <li>
                <span className="text-brand-gold font-semibold">Lightning Roulette:</span> Evolution యొక్క సిగ్నేచర్ గేమ్. ప్రతి రౌండ్‌లో 1-5 సంఖ్యలకు 50x-500x వరకు మల్టిప్లయర్‌లు జోడించబడతాయి. సాధారణ రౌలెట్ కంటే చాలా ఉత్తేజకరంగా ఉంటుంది.
              </li>
              <li>
                <span className="text-brand-gold font-semibold">Crazy Time:</span> Wheel of Fortune స్టైల్ గేమ్ — Pachinko, Cash Hunt, Coin Flip, Crazy Time అనే నాలుగు బోనస్ రౌండ్లు ఉంటాయి. 20,000x వరకు గెలుచుకోవచ్చు.
              </li>
              <li>
                <span className="text-brand-gold font-semibold">హిందీ-స్పీకింగ్ డీలర్లు:</span> Ezugi నుండి హిందీ-స్పీకింగ్ డీలర్లు Teen Patti, Andar Bahar, Roulette టేబుళ్ళకు అందుబాటులో ఉన్నారు. ఇది ఇండియన్ ఆటగాళ్ళకు స్థానిక అనుభవాన్ని అందిస్తుంది.
              </li>
              <li>
                <span className="text-brand-gold font-semibold">Live Blackjack:</span> Multi-player లైవ్ బ్లాక్‌జాక్ టేబుళ్ళు. బేసిక్ స్ట్రాటజీతో 99.5% వరకు RTP పొందవచ్చు.
              </li>
            </ul>
          </div>

          {/* Section 6: బోనస్ వివరణ */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">కేసినో బోనస్ — 200% వరకు ₹20,000</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaBet స్వాగత బోనస్ స్పోర్ట్స్ బెట్టింగ్ మరియు కేసినో రెండింటికీ వర్తిస్తుంది. 200% మ్యాచ్ బోనస్, గరిష్టంగా ₹20,000 వరకు. కనీస జమ ₹500.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              <span className="text-brand-gold font-semibold">వేజరింగ్ అవసరాలు:</span> బోనస్ మొత్తంపై 8x వేజరింగ్ 30 రోజుల వ్యవధిలో పూర్తి చేయాలి. కేసినో గేమ్‌లు వేజరింగ్ లెక్కలోకి వస్తాయి. స్లాట్లు 100% వేజరింగ్ కంట్రిబ్యూషన్ ఇస్తాయి; లైవ్ కేసినో గేమ్‌లు 10-20% ఇస్తాయి (గేమ్ పై ఆధారపడి).
            </p>
            <p className="text-gray-400 leading-relaxed">
              DafaBet నిరంతర ప్రమోషన్‌లు కూడా అందిస్తుంది — వీక్లీ 10% కేష్‌బ్యాక్, డైలీ ఫ్రీ స్పిన్స్. Promotions విభాగం నిత్యం తనిఖీ చేయండి.
            </p>
          </div>

          {/* Section 7: RTP వివరణ */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">RTP అంటే ఏమిటి?</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              RTP (Return to Player) అనేది ఒక గేమ్ దీర్ఘకాలంలో ఎంత శాతం తిరిగి ఆటగాళ్ళకు చెల్లిస్తుందో చూపించే సూచిక. ఉదాహరణకు 97% RTP అంటే — ఆ గేమ్‌లో ₹10,000 వేజర్ చేస్తే దీర్ఘకాలంలో సగటున ₹9,700 తిరిగి పొందవచ్చు.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaBet లో సాధారణ RTP లు:
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed space-y-2">
              <li><span className="text-brand-gold font-semibold">Andar Bahar:</span> ~97% RTP</li>
              <li><span className="text-brand-gold font-semibold">Blackjack (బేసిక్ స్ట్రాటజీతో):</span> 99.5% వరకు</li>
              <li><span className="text-brand-gold font-semibold">Roulette (European):</span> 97.3%</li>
              <li><span className="text-brand-gold font-semibold">స్లాట్లు (సాధారణంగా):</span> 94-97%</li>
            </ul>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              RTP అనేది సగటు సూచిక — ఏ ఒక్క సెషన్‌లో ఇది గ్యారంటీ కాదు. కానీ ఎక్కువ RTP గల గేమ్‌లు ఎంచుకోవడం స్మార్ట్ వ్యూహం.
            </p>
          </div>

          {/* Section 8: AP/తెలంగాణ నోట్ */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">AP, తెలంగాణ క్యాసినో చట్ట స్థితి</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              ఆంధ్రప్రదేశ్ మరియు తెలంగాణలో ఆన్‌లైన్ కేసినో గేమింగ్‌పై రాష్ట్ర స్థాయి ఆంక్షలు ఉన్నాయి. ఆంధ్రప్రదేశ్‌లో 2020 సవరణ ఆన్‌లైన్ గేమింగ్‌ను నిషేధించింది. తెలంగాణలో 2017 చట్టం ఆన్‌లైన్ జూదాన్ని నిషేధించింది.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaBet Curaçao eGaming లైసెన్స్ 1668/JAZ కింద ఆఫ్‌షోర్ ఆపరేటర్‌గా పని చేస్తుంది. ఆఫ్‌షోర్ ఆపరేటర్లను ఎన్‌ఫోర్స్ చేయడం అరుదు, కానీ చట్టపరమైన స్పష్టత లేదు. మీ రాష్ట్ర నిబంధనలు తనిఖీ చేసుకుని నిర్ణయించుకోండి. 18+ మాత్రమే.
            </p>
          </div>

          {/* Section 9: FAQ Telugu */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">తరచుగా అడిగే ప్రశ్నలు</h3>
            <div className="space-y-4">
              <details className="border border-brand-border rounded-lg p-4">
                <summary className="text-white font-semibold cursor-pointer list-none flex justify-between">
                  DafaBet కేసినో సురక్షితమేనా?
                  <span className="text-brand-gold ml-3">+</span>
                </summary>
                <p className="text-gray-400 text-sm leading-relaxed mt-3">
                  అవును. లైవ్ కేసినో Evolution మరియు Ezugi నుండి నడుస్తుంది — ఇవి స్వతంత్ర ఆడిట్‌కు లోబడిన లైసెన్స్ పొందిన స్టూడియోలు. DafaBet Curaçao eGaming లైసెన్స్ 1668/JAZ కింద పని చేస్తుంది, ఇది ఫేర్-ప్లే ప్రమాణాలకు కట్టుబడి ఉండాలని నిర్బంధిస్తుంది.
                </p>
              </details>
              <details className="border border-brand-border rounded-lg p-4">
                <summary className="text-white font-semibold cursor-pointer list-none flex justify-between">
                  DafaBet లో Teen Patti ఆడవచ్చా?
                  <span className="text-brand-gold ml-3">+</span>
                </summary>
                <p className="text-gray-400 text-sm leading-relaxed mt-3">
                  అవును — హిందీ-స్పీకింగ్ డీలర్లతో లైవ్ Teen Patti టేబుళ్ళు 24/7 అందుబాటులో ఉంటాయి. 7+ వేరియంట్లు అందుబాటులో ఉన్నాయి. కనీస బెట్ ₹10.
                </p>
              </details>
              <details className="border border-brand-border rounded-lg p-4">
                <summary className="text-white font-semibold cursor-pointer list-none flex justify-between">
                  స్వాగత బోనస్ కేసినోకు వర్తిస్తుందా?
                  <span className="text-brand-gold ml-3">+</span>
                </summary>
                <p className="text-gray-400 text-sm leading-relaxed mt-3">
                  అవును — 200% స్వాగత బోనస్ (గరిష్టంగా ₹20,000) స్పోర్ట్స్ బెట్టింగ్ మరియు కేసినో రెండింటికీ వర్తిస్తుంది. 8x వేజరింగ్ 30 రోజుల్లో పూర్తి చేయాలి.
                </p>
              </details>
              <details className="border border-brand-border rounded-lg p-4">
                <summary className="text-white font-semibold cursor-pointer list-none flex justify-between">
                  మొబైల్‌లో కేసినో ఆడవచ్చా?
                  <span className="text-brand-gold ml-3">+</span>
                </summary>
                <p className="text-gray-400 text-sm leading-relaxed mt-3">
                  అవును. Android APK మరియు iOS యాప్ రెండూ పూర్తి కేసినో యాక్సెస్ ఇస్తాయి. మొబైల్ బ్రౌజర్ వెర్షన్ కూడా అన్ని పరికరాల్లో పని చేస్తుంది.
                </p>
              </details>
            </div>
          </div>

          {/* Section 10: బాధ్యతాయుత జూదం */}
          <div className="card border border-brand-border mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">బాధ్యతాయుత జూదం — 18+ మాత్రమే</h3>
            <p className="text-gray-400 leading-relaxed mb-3">
              కేసినో గేమ్‌లు వినోదం కోసం మాత్రమే ఆడాలి — ఆదాయ మార్గంగా కాదు. నష్టాలు వెంబడించకండి. మీ బడ్జెట్ నిర్ణయించుకుని దానికి కట్టుబడి ఉండండి. DafaBet లో డిపాజిట్ లిమిట్లు, సెల్ఫ్-ఎక్స్‌క్లూజన్ ఆప్షన్లు అందుబాటులో ఉంటాయి.
            </p>
            <div className="bg-brand-card rounded-lg p-4 space-y-2">
              <p className="text-gray-400 text-sm">
                <span className="text-white font-semibold">Vandrevala Foundation హెల్ప్‌లైన్:</span>{' '}
                <span className="text-brand-gold font-bold">1860-2662-345</span>{' '}
                (24/7, ఉచితం, రహస్యం)
              </p>
              <p className="text-gray-400 text-sm">
                <span className="text-white font-semibold">iCall (TISS):</span>{' '}
                <span className="text-brand-gold font-bold">9152987821</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-brand-surface rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-3 font-semibold">సంబంధిత పేజీలు:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dafabet-review" className="text-brand-gold hover:underline text-sm">DafaBet సమీక్ష</Link>
              <Link href="/dafabet-bonus" className="text-brand-gold hover:underline text-sm">DafaBet బోనస్</Link>
              <Link href="/dafabet-registration" className="text-brand-gold hover:underline text-sm">రిజిస్ట్రేషన్</Link>
              <Link href="/sports-betting" className="text-brand-gold hover:underline text-sm">స్పోర్ట్స్ బెట్టింగ్</Link>
            </div>
          </div>

        </section>
      )}

      {/* FAQ and CTA — English only */}
      {locale !== 'te' && (
        <>
      {/* FAQ */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8">Online Casino FAQ</h2>
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
      <section className="relative h-[240px] overflow-hidden">
        <Image
          src="/images/promo-767-1.jpg"
          alt="DafaBet casino welcome bonus"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center gap-4">
          <h2 className="text-white text-2xl md:text-3xl font-bold">
            200% Bonus up to ₹20,000 — Claim Now
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/dafabet-registration" className="btn-primary">
              {tCommon('join_now')}
            </Link>
            <Link href="/online-casino" className="btn-red">
              Play Free Demo
            </Link>
          </div>
        </div>
      </section>
        </>
      )}
    </>
  )
}

export default async function CasinoPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <CasinoContent locale={locale} />
}
