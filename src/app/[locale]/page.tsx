import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { JsonLd } from '@/components/JsonLd'
import { organizationSchema, websiteSchema, breadcrumbSchema, faqSchema } from '@/lib/schema'
import { pageAlternates, pageOGMeta, SITE_URL } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  const alts = pageAlternates(locale, '/')
  const title = t('title')
  const description = t('description')
  return {
    title,
    description,
    alternates: {
      canonical: alts.canonical,
      languages: alts.languages,
    },
    ...pageOGMeta({ title, description, canonicalUrl: alts.canonical, locale }),
  }
}

function StarRating({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= score ? 'text-brand-gold' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  )
}

function HomePageContent({ locale }: { locale: string }) {
  const t = useTranslations('home')

  const faqs = [
    {
      question: 'Is DafaBet legal in India?',
      answer: 'No central Indian law explicitly bans individuals from betting with offshore-licensed operators. DafaBet operates under a Curaçao eGaming licence (1668/JAZ) and serves Indian players from offshore. The Public Gambling Act 1867 governs physical gambling houses and does not cover online betting with foreign-licensed operators. That said, some states — notably Andhra Pradesh and Telangana — have stricter local rules. Check the regulations in your state before placing bets.',
    },
    {
      question: 'What is DafaBet\'s welcome bonus?',
      answer: 'DafaBet offers a 200% first-deposit match bonus up to ₹20,000. Minimum deposit is ₹500 via UPI. The bonus is subject to 8x wagering within 30 days. No promo code is needed — the bonus is auto-credited on your first qualifying deposit.',
    },
    {
      question: 'How do I deposit money at DafaBet?',
      answer: 'DafaBet supports UPI (PhonePe, GPay, Paytm, BHIM), Net Banking (NEFT/IMPS), and crypto (Bitcoin, USDT). The minimum deposit is ₹500. UPI deposits are credited instantly to your account.',
    },
    {
      question: 'Can I bet on IPL at DafaBet?',
      answer: 'Yes. DafaBet covers all Indian Premier League matches with 30+ markets per game, including match winner, top batsman, top bowler, ball-by-ball live betting, and player performance props.',
    },
    {
      question: 'Is DafaBet available on mobile?',
      answer: 'Yes. DafaBet has a native Android app (APK direct download from their site) and an iOS app available on the App Store. You can also use the full-featured mobile web browser version.',
    },
    {
      question: 'How long do DafaBet withdrawals take?',
      answer: 'UPI withdrawals typically settle within 1–4 hours. Bank transfers take 1–3 business days. KYC verification (PAN + Aadhaar) is required before your first withdrawal.',
    },
    {
      question: 'What is the minimum deposit at DafaBet?',
      answer: 'The minimum deposit at DafaBet India is ₹500 via UPI. There are no deposit fees.',
    },
  ]

  const schemaData = [
    organizationSchema(),
    websiteSchema(),
    breadcrumbSchema([{ name: 'Home', url: SITE_URL + '/' }]),
    faqSchema(faqs),
  ]

  const pros = [
    '₹20,000 Welcome Bonus for new players',
    '3,000+ casino games including live dealers',
    'Cricket & IPL betting with best odds',
    'UPI, Paytm, PhonePe instant deposits',
    'Official Dafabet app for Android & iOS',
    '24/7 customer support in Hindi & English',
  ]

  const cons = [
    'Website is in English only (no full Hindi)',
    'Withdrawal can take 1-3 business days',
  ]

  const bonuses = [
    { img: '/images/first-deposit-bonus.webp', title: 'First Deposit Bonus', desc: '200% deposit bonus up to ₹20,000 for new players.', badge: '🏆 Welcome', badgeClass: 'gold-badge' },
    { img: '/images/cashback-banner.webp', title: 'Weekly Cashback', desc: 'Get 10% cashback on your losses every week — auto credited', badge: '🔥 Hot Deal', badgeClass: 'red-badge' },
    { img: '/images/daily-free-spins.webp', title: 'Daily Free Spins', desc: 'Up to 20 free spins daily on selected slots', badge: '⚡ Daily', badgeClass: 'red-badge' },
  ]

  const games = [
    { img: '/images/casino-game-1.jpg', name: 'Crazy Cluckers' },
    { img: '/images/casino-game-2.jpg', name: 'Epic Ape' },
    { img: '/images/casino-game-3.jpg', name: 'Gold Hit' },
    { img: '/images/casino-game-4.jpg', name: 'King Rich Win' },
    { img: '/images/casino-game-5.jpg', name: 'Pachin Goal' },
    { img: '/images/casino-game-6.jpg', name: 'Ultra Ace' },
  ]

  const payments = [
    { name: 'UPI', icon: '📱', desc: 'Instant' },
    { name: 'Paytm', icon: '💳', desc: 'Instant' },
    { name: 'Net Banking', icon: '🏦', desc: '1-3 hours' },
    { name: 'Crypto', icon: '₿', desc: '1-4 hours' },
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[420px] md:h-[520px] w-full">
          <Image
            src="/images/desktop-hero.webp"
            alt="Dafabet India — Online Casino and Sports Betting"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/70 to-black/20" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="red-badge text-xs font-bold animate-pulse">🔴 LIVE</span>
                  <span className="gold-badge text-xs font-bold">India&apos;s #1 Betting Site 2026</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
                  Dafabet India <span className="gold-text">Review</span>
                </h1>
                <p className="text-gray-200 text-base md:text-lg mb-2">
                  India&apos;s trusted guide to DafaBet. Expert reviews of IPL betting, cricket odds, and bonus offers for Indian players.
                </p>
                <p className="text-brand-red font-semibold text-sm mb-5">
                  ⏰ Offer expires soon — don&apos;t miss out!
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/dafabet-registration" className="btn-primary text-base px-6 py-3.5 w-full sm:w-auto text-center">
                    Claim ₹20,000 Bonus →
                  </Link>
                  <Link href="/dafabet-review" className="btn-secondary text-base px-6 py-3.5 w-full sm:w-auto text-center">
                    Read Full Review
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Red urgency bar */}
      <div className="bg-red-gradient py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white font-semibold text-sm text-center sm:text-left">
            🎁 New Player Cashback: Get <strong>10% back</strong> on your first week of losses — automatically credited!
          </p>
          <Link href="/dafabet-registration" className="flex-shrink-0 bg-white text-brand-red font-bold text-sm px-5 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Claim Now
          </Link>
        </div>
      </div>

      {/* Quick Verdict Box */}
      <section className="bg-brand-surface border-b border-brand-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Rating */}
            <div className="verdict-box lg:col-span-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 relative flex-shrink-0">
                  <Image src="/images/dafa-logo.png" alt="Dafabet" width={64} height={64} className="rounded-lg" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Dafabet India</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating score={5} />
                    <span className="text-brand-gold font-bold text-lg">9.2/10</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Our experts rated Dafabet as India&apos;s top betting site for 2026, especially for cricket and IPL.
              </p>
              <Link href="/dafabet-registration" className="btn-primary w-full text-center block">
                Register &amp; Claim Bonus
              </Link>
            </div>

            {/* Pros */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                <span className="text-brand-gold">✓</span> Pros
              </h3>
              <ul className="space-y-2">
                {pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-sm text-gray-300 py-0.5">
                    <CheckIcon />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                <span className="text-gray-500">✗</span> Cons
              </h3>
              <ul className="space-y-2">
                {cons.map((con) => (
                  <li key={con} className="flex items-start gap-2 text-sm text-gray-400 py-0.5">
                    <CrossIcon />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* About Dafabet */}
        <section className="review-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="section-title mb-4">What is Dafabet India?</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Founded in 2004, DafaBet is one of Asia&apos;s most established online betting operators. The platform entered the Indian market early and has grown to serve over 5 million players globally, with India being one of its primary markets. It operates under a Curaçao eGaming licence (1668/JAZ), which is widely accepted by offshore operators serving Indian customers. While Indian federal law does not explicitly prohibit individuals from using offshore-licensed platforms, players should verify regulations in their own state.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                DafaBet offers a comprehensive platform covering sports betting, a live casino, slots, and Indian card games. Cricket and IPL take centre stage, with 500+ cricket markets available across all formats — Test, ODI, T20, and the IPL. Beyond cricket, DafaBet covers over 30 sports including football, kabaddi, tennis, and esports such as BGMI and Valorant.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Indian players benefit from seamless payment options — UPI (PhonePe, GPay, Paytm, BHIM), Net Banking, and cryptocurrency are all supported with no fees on deposits. The platform is available on desktop, Android APK, and the iOS App Store. Customer support is available 24/7 in both Hindi and English via live chat and email. With over 20 years in business and a 9.2/10 editorial rating, DafaBet remains the top recommendation for Indian bettors in 2026.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '3,000+', label: 'Casino Games' },
                  { value: '₹20,000', label: 'Welcome Bonus' },
                  { value: '20+ years', label: 'In Business' },
                  { value: '24/7', label: 'Support' },
                ].map((stat) => (
                  <div key={stat.label} className="stat-box">
                    <div className="text-2xl font-bold gold-text">{stat.value}</div>
                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-card-hover">
              <Image
                src="/images/dafabet-website.webp"
                alt="Dafabet official website India"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Welcome Bonuses */}
        <section className="review-section">
          <h2 className="section-title mb-2">Welcome Bonus &amp; Promotions</h2>
          <p className="section-subtitle mb-4">Dafabet offers some of the best bonuses for Indian players in 2026.</p>
          <div className="card mb-8">
            <h3 className="font-bold text-white mb-3">How the 200% Welcome Bonus Works</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              DafaBet&apos;s welcome offer is a 200% first-deposit match bonus up to ₹20,000. That means if you deposit ₹10,000, you receive ₹20,000 in bonus funds — giving you a total of ₹30,000 to bet with from the start. The minimum qualifying deposit is ₹500 via UPI or any other supported payment method.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              No promo code is required. The bonus is automatically credited to your account as soon as your first deposit is confirmed — typically within seconds for UPI payments.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              The bonus is subject to an <strong className="text-white">8x wagering requirement</strong> within a 30-day window. Here is how to calculate it: if you receive ₹20,000 in bonus funds, you need to wager a total of ₹1,60,000 (₹20,000 × 8) before the bonus converts to withdrawable cash. Both sports bets and casino wagers count towards meeting the requirement. Sports bets must be placed at odds of 1.50 or above to qualify.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              The 30-day clock starts from the moment the bonus is credited. Bets placed in the casino and on sports both count toward the wagering total, giving you flexibility in how you clear the requirement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bonuses.map((bonus) => (
              <div key={bonus.title} className="card-hover overflow-hidden">
                <div className="relative h-48 -mx-6 -mt-6 mb-4">
                  <Image src={bonus.img} alt={bonus.title} fill className="object-cover" />
                  <div className="absolute top-3 left-3">
                    <span className={bonus.badgeClass}>{bonus.badge}</span>
                  </div>
                </div>
                <h3 className="font-bold text-white mb-1">{bonus.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{bonus.desc}</p>
                <Link href="/dafabet-bonus" className="btn-secondary text-sm px-4 py-2 w-full text-center block">
                  Claim Offer
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/dafabet-bonus" className="btn-primary px-8 py-3">
              View All Bonuses →
            </Link>
          </div>
        </section>

        {/* DafaBet vs Competitors Comparison Table */}
        <section className="review-section">
          <h2 className="section-title mb-2">DafaBet vs Competitors</h2>
          <p className="section-subtitle mb-8">How DafaBet stacks up against the top betting sites for Indian players in 2026.</p>
          <div className="bg-brand-surface border border-brand-border rounded-xl overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-brand-card">
                  {['Rank', 'Site', 'Welcome Bonus', 'Min Deposit', 'Sports', 'UPI'].map((col) => (
                    <th key={col} className="text-left text-brand-gold text-xs uppercase px-4 py-3 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {[
                  { rank: '🥇 #1', site: 'DafaBet', bonus: '200% up to ₹20,000', minDeposit: '₹500', sports: '30+', upi: '✅', highlight: true },
                  { rank: '#2', site: 'Betway', bonus: '100% up to ₹2,500', minDeposit: '₹1,000', sports: '35+', upi: '✅', highlight: false },
                  { rank: '#3', site: '10Cric', bonus: '150% up to ₹10,000', minDeposit: '₹1,000', sports: '25+', upi: '✅', highlight: false },
                  { rank: '#4', site: 'Parimatch', bonus: '100% up to ₹12,000', minDeposit: '₹300', sports: '25+', upi: '✅', highlight: false },
                ].map((row) => (
                  <tr key={row.site} className={row.highlight ? 'bg-brand-card/50' : 'hover:bg-brand-card/30 transition-colors'}>
                    <td className={`px-4 py-3 font-semibold ${row.highlight ? 'text-brand-gold' : 'text-gray-400'}`}>{row.rank}</td>
                    <td className={`px-4 py-3 font-medium ${row.highlight ? 'text-brand-gold' : 'text-gray-300'}`}>{row.site}</td>
                    <td className="px-4 py-3 text-gray-300">{row.bonus}</td>
                    <td className="px-4 py-3 text-gray-300">{row.minDeposit}</td>
                    <td className="px-4 py-3 text-gray-300">{row.sports}</td>
                    <td className="px-4 py-3 text-gray-300">{row.upi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-center">
            <Link href="/dafabet-review" className="btn-primary px-8 py-3">
              Read Full DafaBet Review →
            </Link>
          </div>
        </section>

        {/* Sports Covered */}
        <section className="review-section">
          <h2 className="section-title mb-2">Sports Covered at DafaBet</h2>
          <p className="section-subtitle mb-4">DafaBet covers all major sports popular with Indian players, led by deep cricket and IPL markets.</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">DafaBet offers betting on 30+ sports. Indian players gravitate toward cricket, kabaddi, and football, while the esports and tennis sections attract a younger demographic. Virtual sports (virtual cricket, football simulations) are also available for non-stop action between live fixtures.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🏏', sport: 'Cricket', detail: 'IPL, Tests, ICC events — 30+ markets per match, ball-by-ball live betting' },
              { icon: '⚽', sport: 'Football', detail: 'ISL, Premier League, Champions League, La Liga, Serie A' },
              { icon: '🤼', sport: 'Kabaddi', detail: 'Pro Kabaddi League (PKL) — in-play markets through every match' },
              { icon: '🎾', sport: 'Tennis', detail: 'ATP, WTA, Grand Slams — full pre-match and live markets' },
              { icon: '🏀', sport: 'Basketball', detail: 'NBA, EuroLeague — major events covered pre-match and in-play' },
              { icon: '🎮', sport: 'eSports', detail: 'Dota 2, CS2, Valorant — major tournaments and leagues' },
            ].map((item) => (
              <div key={item.sport} className="card flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-brand-gold mb-1">{item.sport}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Telugu Content Section — shown only for te locale */}
        {locale === 'te' && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="section-title mb-6">తెలుగు ఆటగాళ్ళకు గైడ్</h2>

            {/* Block 1: DafaWin vs DafaBet distinction */}
            <div className="card border border-brand-gold/40 mb-6">
              <h3 className="text-brand-gold font-bold mb-3">ఈ సైట్ ఏంటి, దాఫాబెట్ ఏంటి — తేడా ముఖ్యం</h3>
              <ul className="space-y-3 text-gray-300 text-sm leading-relaxed">
                <li>
                  <span className="text-white font-semibold">దాఫాబెట్</span> — ఇండియాలో సర్వీస్ ఇచ్చే ఆసియన్ స్పోర్ట్స్‌బుక్ ఆపరేటర్; మీరు పందెం వేసే సైట్. CEZA లైసెన్స్ కింద ఆఫ్‌షోర్ నుండి పనిచేస్తుంది.
                </li>
                <li>
                  <span className="text-white font-semibold">DafaWin</span> — ఇండియన్ ఆటగాళ్ళకు దాఫాబెట్‌ని సిఫార్సు చేస్తూ సమీక్షించే తెలుగు-ఇంగ్లీష్ గైడ్ సైట్. మీరు ఇప్పుడు చదువుతున్నది ఇదే.
                </li>
              </ul>
            </div>

            {/* Block 2: Quick navigation */}
            <div className="card mb-6">
              <h3 className="text-brand-gold font-bold mb-4">త్వరిత నావిగేషన్</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { label: 'క్రికెట్ పందెం', href: '/cricket-betting' as const },
                  { label: 'IPL బెట్టింగ్', href: '/ipl-betting' as const },
                  { label: 'ఫుట్‌బాల్ పందెం', href: '/football-betting' as const },
                  { label: 'కబడ్డీ పందెం', href: '/kabaddi-betting' as const },
                  { label: 'స్పోర్ట్స్ హబ్', href: '/sports-betting' as const },
                  { label: 'దాఫాబెట్ సమీక్ష', href: '/dafabet-review' as const },
                  { label: 'దాఫాబెట్ బోనస్', href: '/dafabet-bonus' as const },
                  { label: 'జమ-చెల్లింపు ఫ్లో', href: '/dafabet-payment' as const },
                  { label: 'రిజిస్ట్రేషన్', href: '/dafabet-registration' as const },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-brand-gold hover:text-white text-sm underline underline-offset-2 transition-colors"
                  >
                    → {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Block 3: Summary verdict */}
            <div className="card mb-6">
              <h3 className="text-brand-gold font-bold mb-3">దాఫాబెట్ సంక్షిప్త తీర్పు</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                క్రికెట్ + UPI ప్రాధాన్యం ఉన్న తెలుగు ఆటగాళ్ళకు సిఫార్సు.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-brand-card rounded-lg px-4 py-3">
                  <span className="text-gray-400">వెల్‌కం బోనస్: </span>
                  <span className="text-white font-semibold">200% రూ.20,000 వరకు</span>
                </div>
                <div className="bg-brand-card rounded-lg px-4 py-3">
                  <span className="text-gray-400">కనీస డిపాజిట్: </span>
                  <span className="text-white font-semibold">రూ.500</span>
                </div>
                <div className="bg-brand-card rounded-lg px-4 py-3 sm:col-span-2">
                  <span className="text-gray-400">UPI: </span>
                  <span className="text-white font-semibold">PhonePe, Google Pay, Paytm, BHIM</span>
                </div>
              </div>
            </div>

            {/* Block 4: AP/Telangana legal note */}
            <div className="card border border-brand-border">
              <p className="text-gray-500 text-xs leading-relaxed">
                <span className="text-gray-400 font-semibold">ఆంధ్రప్రదేశ్ + తెలంగాణ చట్ట స్థితి:</span> ఆఫ్‌షోర్ ఆపరేటర్‌లపై స్టేట్ లా నేరుగా అమలవ్వదు. మే 2026 PROG రూల్స్ అమల్లోకి వస్తున్నాయి. మీ సొంత నిర్ణయం, మీ సొంత రిస్క్. 18+ మాత్రమే.
              </p>
            </div>
          </section>
        )}

        {/* Registration */}
        <section className="review-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-xl overflow-hidden shadow-card-hover order-2 lg:order-1">
              <Image
                src="/images/registration.webp"
                alt="How to register on Dafabet India"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="section-title mb-4">How to Register on Dafabet</h2>
              <p className="text-gray-400 mb-6">Create your account in under 2 minutes and claim your ₹20,000 bonus.</p>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Click Register', desc: 'Visit Dafabet and click the Register button' },
                  { step: '2', title: 'Fill Your Details', desc: 'Enter your name, email, and mobile number' },
                  { step: '3', title: 'Verify Account', desc: 'Confirm via OTP sent to your mobile' },
                  { step: '4', title: 'Make First Deposit', desc: 'Deposit via UPI and claim your 200% bonus' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gold-gradient rounded-full flex items-center justify-center flex-shrink-0 text-black font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/dafabet-registration" className="btn-primary mt-6 inline-block">
                Register Now — Free
              </Link>
            </div>
          </div>
        </section>

        {/* Sports Betting */}
        <section className="review-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="section-title">Cricket &amp; Sports Betting</h2>
                <span className="red-badge text-xs">LIVE ODDS</span>
              </div>
              <p className="text-gray-400 mb-4">
                Dafabet is the top pick for Indian sports bettors — dedicated cricket, IPL, kabaddi, and football sections with best-in-market odds and live in-play betting that updates in under 2 seconds.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                <strong className="text-white">Cricket:</strong> DafaBet covers IPL (all 10 teams, every match), Test series, T20 World Cup, Asia Cup, and domestic T20 leagues. Each match carries 30+ betting markets — from match winner and toss winner to top batter, top bowler, method of dismissal, and ball-by-ball live wagering. With 500+ cricket markets running simultaneously across all active formats, it is the deepest cricket book available to Indian players.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                <strong className="text-white">Football:</strong> ISL, English Premier League, UEFA Champions League, and La Liga are covered with 1X2, Asian handicap, both teams to score, and correct-score markets. <strong className="text-white">Pro Kabaddi (PKL):</strong> All PKL seasons, with raid success, match winner, and live in-play markets available throughout. <strong className="text-white">Tennis, Badminton &amp; Esports:</strong> ATP, WTA, Grand Slams, BWF Tour, and esports tournaments including BGMI and Valorant are fully covered.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                DafaBet&apos;s <strong className="text-white">cash-out feature</strong> lets you lock in profits or cut losses before an event finishes — available on most live cricket and football markets. Live odds refresh in under 2 seconds, making it one of the fastest in-play books available in India.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                <strong className="text-white">Betting types available:</strong> Single bets, accumulators (multi-leg parlays), system bets, and live in-play wagering are all supported. Indian players particularly favour single match-winner bets on cricket and accumulator bets spanning multiple IPL fixtures. The minimum stake per bet is ₹50, allowing casual bettors to get started without committing large amounts. Odds are displayed in decimal format, and DafaBet&apos;s cricket markets consistently offer margins of 3–5% — competitive by global standards.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: '🏏', sport: 'Cricket', markets: '500+ cricket markets across all formats' },
                  { icon: '🏆', sport: 'IPL', markets: 'Live betting' },
                  { icon: '⚽', sport: 'Football', markets: 'ISL & EPL' },
                  { icon: '🤼', sport: 'Kabaddi', markets: 'PKL covered' },
                ].map((s) => (
                  <div key={s.sport} className="flex items-center gap-3 p-3 rounded-lg bg-brand-card border border-brand-border">
                    <span className="text-2xl">{s.icon}</span>
                    <div>
                      <div className="font-semibold text-white text-sm">{s.sport}</div>
                      <div className="text-gray-500 text-xs">{s.markets}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/cricket-betting" className="btn-secondary px-5 py-2.5 text-sm">Cricket →</Link>
                <Link href="/ipl-betting" className="btn-red px-5 py-2.5 text-sm">🏆 IPL Betting →</Link>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-card-hover">
              <Image
                src="/images/sports-betting.webp"
                alt="Sports betting at Dafabet India"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Casino Games */}
        <section className="review-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="section-title">Online Casino Games</h2>
                <span className="red-badge text-xs">🔥 HOT</span>
              </div>
              <p className="text-gray-400 mb-4">
                3,000+ games from Playtech, Evolution Gaming, Ezugi, and Pragmatic Play. Enjoy slots, roulette, blackjack, baccarat, and live dealer tables with real-time streaming from professional studio setups.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                <strong className="text-white">Indian card games:</strong> DafaBet offers multiple variants of Teen Patti and Andar Bahar — both in RNG (digital) format and as live dealer tables hosted by Hindi-speaking croupiers. These are among the most popular tables on the platform for Indian players.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                <strong className="text-white">Live casino:</strong> Evolution Gaming and Ezugi studios power the live dealer section. Highlights include Lightning Roulette, Crazy Time, Mega Ball, and live Teen Patti with real rupee tables. Hindi-speaking dealers are available on select tables. The live casino operates around the clock, streaming high-definition games to desktop and mobile.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                <strong className="text-white">Slots:</strong> Over 2,000 slot titles including Mega Moolah (progressive jackpot), Gates of Olympus, Sweet Bonanza, and Big Bass Bonanza. The same 200% welcome bonus applies to casino play, with the 8x wagering requirement covering both sports and casino bets.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                <strong className="text-white">Table games</strong> such as blackjack, roulette, and baccarat are available in both standard RNG versions and as live dealer tables. For players new to casino games, DafaBet provides free-play demo modes on most slot titles — useful for learning the mechanics before wagering real money.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/online-casino" className="btn-primary inline-block">
                  Explore Casino →
                </Link>
                <Link href="/dafabet-registration" className="btn-red inline-block">
                  Play Now
                </Link>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-card-hover">
              <Image
                src="/images/casino.webp"
                alt="Dafabet online casino games"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {games.map((game) => (
              <div key={game.name} className="relative rounded-lg overflow-hidden group cursor-pointer border border-brand-border">
                <Image src={game.img} alt={game.name} width={325} height={250} className="w-full h-auto group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-xs font-medium text-center transform translate-y-full group-hover:translate-y-0 transition-transform">
                  {game.name}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Payment Methods */}
        <section className="review-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-xl overflow-hidden shadow-card-hover">
              <Image
                src="/images/payment.webp"
                alt="Payment methods at Dafabet India — UPI, Paytm, Net Banking"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div>
              <h2 className="section-title mb-4">Payment Methods</h2>
              <p className="text-gray-400 mb-4">
                All major Indian payment methods are supported. UPI deposits are instant — withdraw directly to your bank account with no fees charged by DafaBet.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                <strong className="text-white">UPI (PhonePe, GPay, Paytm, BHIM):</strong> Instant deposits, ₹100 to ₹1,00,000 per transaction. This is the fastest and most popular method for Indian players. <strong className="text-white">Net Banking (NEFT/IMPS):</strong> Deposits settle in 1–5 minutes. Available for all major Indian banks. <strong className="text-white">Cryptocurrency:</strong> Bitcoin and USDT are accepted for international players who prefer privacy; processing takes 1–4 hours.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                <strong className="text-white">Withdrawals:</strong> UPI withdrawals settle in 1–4 hours. Bank transfers take 1–3 business days. There are no fees on deposits or withdrawals. Before your first withdrawal, you must complete KYC verification by submitting a PAN card and Aadhaar. This is a one-time process and typically takes under 24 hours to approve.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {payments.map((p) => (
                  <div key={p.name} className="flex items-center gap-3 p-4 rounded-lg border border-brand-border bg-brand-card">
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <div className="font-semibold text-white text-sm">{p.name}</div>
                      <div className="text-brand-gold text-xs font-medium">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/dafabet-payment" className="btn-secondary px-6 py-2 inline-block">
                View All Payment Options →
              </Link>
            </div>
          </div>
        </section>

        {/* App Download */}
        <section className="review-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="section-title mb-4">Dafabet Mobile App</h2>
              <p className="text-gray-400 mb-4">
                Bet on cricket and play casino games anywhere. The DafaBet app is available free for Android (APK direct download from the DafaBet site) and iOS (App Store). You can also access the full site on any mobile browser without installing an app.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                The Android APK is not listed on the Google Play Store due to Play Store policies on real-money gambling apps — but it is safe to download directly from the official DafaBet website. The iOS app is fully available on the Apple App Store for Indian users. Both apps offer the complete DafaBet experience: sports betting, live casino, slots, UPI payments, and customer support, all in a compact mobile interface. The app is optimised for low-bandwidth connections common in tier-2 and tier-3 Indian cities.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  'Fast and smooth on all Android & iOS devices',
                  'Live betting with real-time score updates',
                  'Full casino access including live dealers',
                  'Instant UPI deposits and withdrawals',
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckIcon />
                    {f}
                  </div>
                ))}
              </div>
              <Link href="/dafabet-app-download" className="btn-primary inline-block">
                Download Dafabet App →
              </Link>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-card-hover">
              <Image
                src="/images/app-download.webp"
                alt="Download Dafabet app for Android and iOS"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Is DafaBet Safe and Legal in India? */}
        <section className="review-section">
          <h2 className="section-title mb-4">Is DafaBet Safe and Legal in India?</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            DafaBet operates under a Curaçao eGaming licence (licence number 1668/JAZ), which is issued by a recognised offshore regulatory authority. This licence requires the operator to maintain segregated player funds, use SSL encryption for all data transmission, and submit to periodic audits of its RNG systems. DafaBet has been in continuous operation since 2004 — over 20 years — which is a strong indicator of financial stability and compliance.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            From a legal standpoint, there is no central Indian law that explicitly prohibits individual players from betting with offshore-licensed operators. The Public Gambling Act 1867 — India&apos;s primary gambling legislation — was written to govern physical gambling houses and does not contemplate online betting with foreign entities. The Information Technology Act 2000 similarly does not criminalise the act of placing a bet with an offshore-licensed site.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            However, India has significant state-level variation. Andhra Pradesh and Telangana have enacted stricter rules on online games of skill and chance; players from those states should review the current legal position before registering. Other states such as Maharashtra and Karnataka have periodically amended gambling rules as well. The legal landscape is evolving — check your state&apos;s current regulations before placing bets.
          </p>
          <p className="text-gray-400 leading-relaxed">
            On the technical side, DafaBet uses 128-bit SSL encryption across its website and app, stores player funds in segregated accounts separate from operating capital, and offers responsible-gambling tools including deposit limits and self-exclusion. The platform is 18+ only. For a detailed legal discussion, see the FAQ section below.
          </p>
        </section>

        {/* DafaBet India FAQ */}
        <section className="review-section">
          <h2 className="section-title mb-8">DafaBet India FAQ</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="card group">
                <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center gap-4">
                  <span>{faq.question}</span>
                  <span className="text-brand-gold text-xl shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <p className="text-gray-400 text-sm leading-relaxed mt-4 pt-4 border-t border-brand-border">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Responsible Gambling */}
        <section className="review-section">
          <div className="card border border-brand-border">
            <h2 className="font-bold text-white mb-3">Responsible Gambling</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              DafaBet is committed to responsible gambling. Deposit limits, session time reminders, and self-exclusion options are available directly in your account settings — no need to contact support. Gambling should be entertainment, not a way to make money or solve financial problems. Never bet more than you can afford to lose. If you or someone you know needs help, contact the <strong className="text-white">Vandrevala Foundation helpline: 1860-2662-345</strong> (24/7, free, and confidential). 18+ only.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-12">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/images/promo-767-1.jpg"
              alt="Dafabet welcome offer"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
            {/* Red accent strip at top */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-gradient" />
            <div className="relative px-6 md:px-12 py-12 text-center text-white">
              <span className="red-badge mb-4 inline-block text-sm px-4 py-1.5">⏰ Limited Time Offer — Ends Tonight!</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Claim Your <span className="gold-text">₹20,000</span> Bonus Today
              </h2>
              <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                Join 5 million+ players on Dafabet. Register now and get India&apos;s biggest betting welcome bonus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dafabet-registration" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                  Register &amp; Get ₹20,000 Bonus
                </Link>
                <Link href="/dafabet-review" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                  Read Full Review
                </Link>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6">
                <span className="text-brand-red font-semibold text-sm">🔒 Secure &amp; Licensed</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-400 text-xs">18+ only · T&Cs apply · Please gamble responsibly</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <HomePageContent locale={locale} />
}
