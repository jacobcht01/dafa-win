import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { JsonLd } from '@/components/JsonLd'
import { organizationSchema, websiteSchema, breadcrumbSchema } from '@/lib/schema'
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

  const schemaData = [
    organizationSchema(),
    websiteSchema(),
    breadcrumbSchema([{ name: 'Home', url: SITE_URL + '/' }]),
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
                Dafabet is one of Asia&apos;s largest and most trusted online betting platforms, fully licensed and operating in India since 2004. It offers sports betting, casino games, and live dealer experiences — all on one platform.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Indian players get access to over 3,000 casino games, cricket and IPL betting with competitive odds, and fast UPI payments. The welcome bonus of ₹20,000 is among the highest available in India.
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
          <p className="section-subtitle mb-8">Dafabet offers some of the best bonuses for Indian players in 2026.</p>
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
          <p className="section-subtitle mb-8">DafaBet covers all major sports popular with Indian players, led by deep cricket and IPL markets.</p>
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
                Dafabet is the top pick for Indian sports bettors — dedicated cricket, IPL, kabaddi, and football sections with best-in-market odds and live in-play betting.
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
                3,000+ games from Playtech, Evolution, and Pragmatic Play. Enjoy slots, roulette, blackjack, baccarat, and live dealer tables with real-time streaming.
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
              <p className="text-gray-400 mb-6">
                All major Indian payment methods supported. UPI deposits are instant — withdraw directly to your bank account with no fees.
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
                Bet on cricket and play casino games anywhere. Available free for Android (APK direct download) and iOS.
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
