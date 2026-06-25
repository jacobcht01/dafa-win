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

      {/* Hero, urgency bar, quick verdict — English only */}
      {locale !== 'te' && (
        <>
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

        </>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* English sections before te block — only for non-te locales */}
        {locale !== 'te' && (
          <>
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

          </>
        )}

        {/* Telugu Content Section — shown only for te locale */}
        {locale === 'te' && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {/* H1 */}
            <h1 className="text-3xl md:text-4xl font-bold text-brand-gold mb-8 leading-tight">
              DafaBet ఇండియా — అధికారిక రివ్యూ &amp; బెట్టింగ్ గైడ్ 2026
            </h1>

            {/* Section 1: DafaBet అంటే ఏమిటి */}
            <div className="card mb-6">
              <h2 className="text-brand-gold font-bold text-xl mb-4">DafaBet ఇండియా అంటే ఏమిటి?</h2>
              <p className="text-gray-400 leading-relaxed mb-3">
                DafaBet 2004 లో స్థాపించబడింది. రెండు దశాబ్దాలకు పైగా ఆసియాలో బెట్టింగ్ పరిశ్రమలో అత్యంత నమ్మకమైన ఆపరేటర్లలో ఒకటిగా DafaBet నిలిచింది. ఈ వేదిక ఇండియాలో లక్షలాది ఆటగాళ్ళకు క్రికెట్, ఫుట్‌బాల్, కబడ్డీ మరియు కేసినో గేమ్‌ల అనుభవాన్ని అందిస్తోంది.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                DafaBet Curaçao eGaming లైసెన్స్ 1668/JAZ కింద ఆఫ్‌షోర్ నుండి పనిచేస్తుంది. ఈ లైసెన్స్ ఆపరేటర్ ఆర్థిక స్థిరత్వాన్ని, ఆటగాళ్ళ ఫండ్ సురక్షణను మరియు SSL ఎన్‌క్రిప్షన్ ఉపయోగాన్ని తప్పనిసరి చేస్తుంది. 20 సంవత్సరాల అనుభవంతో, DafaBet ఇప్పటివరకు ఒక్క పెద్ద ఆర్థిక వివాదంలోనూ చిక్కుకోలేదు — ఇది ఆపరేటర్ నమ్మకానికి బలమైన సూచిక.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                DafaBet లో 3,000+ కేసినో గేమ్‌లు మరియు 30+ స్పోర్ట్స్ మార్కెట్‌లు అందుబాటులో ఉన్నాయి. ఇండియన్ ఆటగాళ్ళకు అత్యంత అనుకూలంగా UPI, Paytm, PhonePe ద్వారా నేరుగా జమ మరియు విత్‌డ్రా చేసుకోవచ్చు. ఇవి సెకన్లలో ప్రాసెస్ అవుతాయి — ఎలాంటి ఆలస్యం లేదు.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                ఒక ముఖ్యమైన తేడా అర్థం చేసుకోవాలి: <span className="text-white font-semibold">DafaBet</span> అంటే పందెం వేసే బెట్టింగ్ ఆపరేటర్ సైట్. <span className="text-white font-semibold">DafaWin</span> అంటే ఇప్పుడు మీరు చదువుతున్న ఈ రివ్యూ సైట్ — ఇది DafaBet యొక్క స్వతంత్ర సమీక్ష మరియు గైడ్ వేదిక. DafaWin ఎప్పుడూ పందెం వేయించదు; మీకు సరైన సమాచారం ఇవ్వడం మాత్రమే దీని పని.
              </p>
              <p className="text-gray-400 leading-relaxed">
                మొత్తం మీద, DafaBet ను 9.2/10 రేటింగ్‌తో DafaWin సంపాదకీయ బృందం అత్యధికంగా సిఫార్సు చేస్తోంది. ఇది 2026 లో ఇండియన్ ప్లేయర్‌లకు అత్యుత్తమ ఆన్‌లైన్ బెట్టింగ్ వేదికగా మా నిపుణుల అభిప్రాయం.
              </p>
            </div>

            {/* Section 2: స్వాగత బోనస్ */}
            <div className="card mb-6">
              <h2 className="text-brand-gold font-bold text-xl mb-4">స్వాగత బోనస్ — 200% వరకు ₹20,000</h2>
              <p className="text-gray-400 leading-relaxed mb-3">
                DafaBet కొత్త ఆటగాళ్ళకు 200% మ్యాచ్ బోనస్ ఇస్తుంది, గరిష్టంగా ₹20,000 వరకు. ఇది ఎలా పనిచేస్తుందో చూద్దాం: మీరు ₹10,000 జమ చేస్తే, DafaBet మీకు ₹20,000 బోనస్ ఇస్తుంది — మొత్తం ₹30,000 తో మీరు బెట్టింగ్ మొదలు పెట్టవచ్చు. ఇంత పెద్ద స్వాగత బోనస్ ఇండియన్ మార్కెట్ లో చాలా అరుదు.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                ఈ బోనస్ పొందడానికి కనీస జమ కేవలం ₹500 మాత్రమే. అంటే చాలా తక్కువ మొత్తంతో కూడా ఈ బోనస్ క్లెయిమ్ చేసుకోవచ్చు. UPI ద్వారా లేదా Paytm, PhonePe వంటి ఏ మెథడ్ ద్వారా జమ చేసినా బోనస్ వర్తిస్తుంది.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                ముఖ్యమైన విషయం: ఎలాంటి ప్రోమో కోడ్ అక్కర్లేదు. మీ మొదటి జమ పూర్తయిన వెంటనే బోనస్ అటోమేటిగా మీ అకౌంట్‌లో క్రెడిట్ అవుతుంది — సాధారణంగా UPI జమలకు కేవలం సెకన్లలో.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                వేజరింగ్ అవసరాలు: బోనస్ మొత్తంపై 8x వేజరింగ్ 30 రోజుల వ్యవధిలో పూర్తి చేయాలి. ఉదాహరణకు, ₹20,000 బోనస్ పొందితే, ₹1,60,000 (20,000 × 8) పందెం వేయాలి. స్పోర్ట్స్ బెట్టింగ్ మరియు కేసినో గేమ్‌లు రెండూ వేజరింగ్ లెక్కలోకి వస్తాయి. స్పోర్ట్స్ బెట్టింగ్‌లో అర్హత పొందాలంటే ఆడ్స్ కనీసం 1.50 ఉండాలి.
              </p>
              <p className="text-gray-400 leading-relaxed">
                30 రోజుల కౌంట్‌డౌన్ బోనస్ క్రెడిట్ అయిన క్షణం నుండి మొదలవుతుంది. ఈ వ్యవధిలో పందెం వేజరింగ్ పూర్తి చేసిన తర్వాత బోనస్ మొత్తాన్ని నేరుగా విత్‌డ్రా చేసుకోవచ్చు. DafaBet యొక్క ఇతర ప్రమోషన్‌లలో వీక్లీ కేష్‌బ్యాక్ 10% మరియు డైలీ ఫ్రీ స్పిన్స్ కూడా ఉన్నాయి, అవి ఆటగాళ్ళకు నిరంతరం విలువ అందిస్తాయి.
              </p>
            </div>

            {/* Section 3: క్రికెట్ బెట్టింగ్ */}
            <div className="card mb-6">
              <h2 className="text-brand-gold font-bold text-xl mb-4">క్రికెట్ బెట్టింగ్ — IPL, T20, టెస్ట్</h2>
              <p className="text-gray-400 leading-relaxed mb-3">
                DafaBet లో క్రికెట్ అత్యంత ప్రముఖమైన విభాగం. ఇండియన్ ఆటగాళ్ళకు అత్యంత ఆసక్తికరమైన IPL లో DafaBet 10 జట్లు, 74 మ్యాచ్‌లు అన్నింటికీ 30+ మార్కెట్‌లు అందుబాటులో ఉంచుతుంది. ఒక్కో మ్యాచ్‌కు మ్యాచ్ విన్నర్, టాప్ బ్యాటర్, టాప్ బౌలర్, టాస్ విన్నర్, మొదటి వికెట్ పడే ఓవర్, ఆటగాళ్ళ స్కోర్ ప్రాప్స్, మరియు బాల్-బై-బాల్ లైవ్ బెట్టింగ్ — ఇవన్నీ అందుబాటులో ఉంటాయి.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                IPL తో పాటు, T20 వరల్డ్ కప్, ODI వరల్డ్ కప్, మరియు Asia Cup వంటి అంతర్జాతీయ టోర్నమెంట్‌లు కూడా పూర్తిగా కవర్ చేయబడతాయి. IND vs AUS, IND vs ENG సీరీస్‌లు ప్రత్యేకంగా విస్తారమైన మార్కెట్‌లతో కవర్ అవుతాయి. ప్రతి టెస్ట్ మ్యాచ్‌కు సెషన్ స్కోర్, ఇన్నింగ్స్ స్కోర్, మరియు మ్యాచ్ రిజల్ట్ మార్కెట్‌లు ఉంటాయి.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                హైదరాబాద్ ఆటగాళ్ళకు అత్యంత ఇష్టమైన సన్‌రైజర్స్ హైదరాబాద్ జట్టు మ్యాచ్‌లపై DafaBet ప్రత్యేక దృష్టి పెడుతుంది. హైదరాబాద్ మ్యాచ్‌లలో లైవ్ ఇన్-ప్లే బెట్టింగ్ ద్వారా ప్రతి బాల్‌పై పందెం వేయవచ్చు — ఆడ్స్ రెండు సెకన్లలోపు అప్‌డేట్ అవుతాయి.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                లైవ్ ఇన్-ప్లే బెట్టింగ్ DafaBet యొక్క అత్యంత శక్తివంతమైన ఫీచర్. క్రికెట్ మ్యాచ్ జరుగుతుండగా ప్రతి బాల్‌పై పందెం వేయవచ్చు — ఈ బాల్ నో-బాల్ అవుతుందా? ఈ ఓవర్‌లో సిక్సర్ వస్తుందా? వికెట్ పడుతుందా? — ఇలాంటి మైక్రో మార్కెట్‌లు పూర్తి ఉత్సాహాన్ని అందిస్తాయి.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                క్యాష్-అవుట్ ఫీచర్ మీకు మ్యాచ్ పూర్తవ్వక ముందే లాభం లాక్ చేసుకోవడానికి లేదా నష్టం తగ్గించుకోవడానికి అనుమతిస్తుంది. ఉదాహరణకు, మీరు ₹500 పెట్టి ఒక జట్టు గెలుస్తుందని పందెం వేసారు. మ్యాచ్ మధ్యలో ఆ జట్టు ముందంజలో ఉంది కానీ మీకు రిస్క్ ఇష్టం లేదు — క్యాష్-అవుట్ బటన్ నొక్కి ప్రస్తుత లాభంతో బయటపడవచ్చు.
              </p>
              <p className="text-gray-400 leading-relaxed">
                DafaBet లో 500+ క్రికెట్ మార్కెట్‌లు ఏకకాలంలో నడుస్తుంటాయి — అన్ని ఫార్మాట్‌లలో (టెస్ట్, ODI, T20, IPL, BBL, PSL) ఒకే వేదికపై అందుబాటులో ఉంటాయి. ఇది ఇండియన్ మార్కెట్‌లో లభ్యమయ్యే అత్యంత సమగ్రమైన క్రికెట్ పుస్తకం.
              </p>
            </div>

            {/* Section 4: ఆన్లైన్ కేసినో */}
            <div className="card mb-6">
              <h2 className="text-brand-gold font-bold text-xl mb-4">ఆన్‌లైన్ కేసినో — 3,000+ గేమ్‌లు</h2>
              <p className="text-gray-400 leading-relaxed mb-3">
                DafaBet కేసినో విభాగంలో 3,000+ గేమ్‌లు అందుబాటులో ఉన్నాయి. ఇందులో ఇండియన్ ఆటగాళ్ళకు అత్యంత ఇష్టమైన పేకముక్కల ఆటలు, లైవ్ డీలర్ టేబుళ్ళు, స్లాట్‌లు మరియు వర్చువల్ స్పోర్ట్స్ ఉన్నాయి.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                <span className="text-white font-semibold">Teen Patti</span>: DafaBet లో 7+ Teen Patti వేరియంట్‌లు అందుబాటులో ఉన్నాయి — క్లాసిక్, జోకర్, మఫ్లిస్, AK47 తదితర వేరియంట్‌లు. లైవ్ వెర్షన్‌లో హిందీ డీలర్లతో రియల్ టైమ్‌లో ఆడవచ్చు. ఒక్కో రౌండ్ 30–60 సెకన్లలో పూర్తవుతుంది — వేగంగా ఉండి ఆసక్తికరంగా ఉంటుంది.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                <span className="text-white font-semibold">Andar Bahar</span>: ఈ సంప్రదాయ ఇండియన్ కార్డ్ గేమ్ DafaBet లో RTP ~97% తో అందుబాటులో ఉంది. ప్రతి రౌండ్ కేవలం 30 సెకన్లలో పూర్తవుతుంది — వేగమైన నిర్ణయాలు, వేగమైన ఫలితాలు. RNG మరియు లైవ్ డీలర్ రెండు ఫార్మాట్‌లు అందుబాటులో ఉన్నాయి.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                <span className="text-white font-semibold">Rummy</span>: 13-కార్డ్ క్యాష్ టేబుళ్ళు అందుబాటులో ఉన్నాయి. వివిధ స్టేక్ లెవెల్స్‌లో ఆడవచ్చు — తక్కువ స్టేక్ నుండి హై-రోలర్ టేబుళ్ళ వరకు. Rummy అనేది నైపుణ్యం-ఆధారిత ఆట కాబట్టి చాలా రాష్ట్రాలలో చట్టపరంగా వెసులుబాటు ఎక్కువగా ఉంటుంది.
              </p>
              <p className="text-gray-400 leading-relaxed">
                <span className="text-white font-semibold">Evolution Gaming</span> లైవ్ స్టూడియో DafaBet కేసినోలో ప్రముఖ స్థానం వహిస్తుంది. Lightning Roulette, Crazy Time, Mega Ball, Dream Catcher వంటి ప్రత్యేక గేమ్ షో ఫార్మాట్‌లు అందుబాటులో ఉన్నాయి. <span className="text-white font-semibold">Ezugi</span> ప్లాట్‌ఫారం ద్వారా మరిన్ని లైవ్ కేసినో గేమ్‌లు అందుబాటులో ఉన్నాయి, హిందీ-స్పీకింగ్ డీలర్‌లతో. 2,000+ స్లాట్ టైటిళ్ళలో Mega Moolah, Gates of Olympus, Sweet Bonanza వంటివి ఉన్నాయి.
              </p>
            </div>

            {/* Section 5: పేమెంట్ మెథడ్స్ */}
            <div className="card mb-6">
              <h2 className="text-brand-gold font-bold text-xl mb-4">పేమెంట్ మెథడ్స్ — UPI, PhonePe, GPay, Paytm</h2>
              <p className="text-gray-400 leading-relaxed mb-3">
                DafaBet ఇండియన్ ఆటగాళ్ళకు అత్యంత అనుకూలమైన పేమెంట్ వ్యవస్థ కలిగి ఉంది. UPI (PhonePe, GPay, Paytm, BHIM) ద్వారా జమ చేస్తే కేవలం 60 సెకన్లలోపు మీ అకౌంట్‌లో పడుతుంది — ఇది ఇండియన్ ఆటగాళ్ళకు చాలా ముఖ్యమైన సౌకర్యం.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                కనీస జమ కేవలం ₹500 మాత్రమే. ఇది మార్కెట్‌లో అత్యంత తక్కువ ప్రవేశ అవసరం. గరిష్ట జమ ₹1,00,000 వరకు ఒక్కో ట్రాన్సాక్షన్‌కు. నెట్ బ్యాంకింగ్ (NEFT/IMPS) ద్వారా కూడా 1–5 నిమిషాల్లో జమ పూర్తవుతుంది.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                విత్‌డ్రాల్ విషయంలో: UPI ద్వారా విత్‌డ్రా చేస్తే 1–4 గంటల్లో మీ బ్యాంక్ అకౌంట్‌కు వస్తుంది. బ్యాంక్ ట్రాన్స్‌ఫర్ ద్వారా అయితే 1–3 పని రోజులు పడుతుంది. క్రిప్టో (Bitcoin, USDT) ద్వారా విత్‌డ్రా చేస్తే 1–4 గంటలు పడుతుంది.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                రుసుముల విషయంలో అత్యంత మంచి వార్త: DafaBet జమకు గానీ, విత్‌డ్రాల్‌కు గానీ ఎలాంటి ఫీజు వసూలు చేయదు. రెండు దిశల్లోనూ పూర్తి ఉచితం. మీ బ్యాంక్ లేదా UPI యాప్ ఏదైనా ఫీజు వేయవచ్చు కానీ DafaBet వేపు నుండి శూన్యం.
              </p>
              <p className="text-gray-400 leading-relaxed">
                KYC (Know Your Customer) ధృవీకరణ మొదటి విత్‌డ్రాల్‌కు ముందు ఒక్కసారి మాత్రమే అవసరం. PAN కార్డ్ మరియు Aadhaar కార్డ్ సమర్పించాలి. ఈ ప్రక్రియ సాధారణంగా 24 గంటల్లోపు పూర్తవుతుంది. KYC ఒకసారి అప్రూవ్ అయిన తర్వాత మళ్ళీ అవసరం లేదు — ప్రతిసారీ నిరంతరాయంగా విత్‌డ్రా చేసుకోవచ్చు.
              </p>
            </div>

            {/* Section 6: DafaBet సురక్షితమా */}
            <div className="card mb-6">
              <h2 className="text-brand-gold font-bold text-xl mb-4">DafaBet సురక్షితమా? విశ్వసనీయమా?</h2>
              <p className="text-gray-400 leading-relaxed mb-3">
                DafaBet సురక్షితత మరియు విశ్వసనీయత విషయంలో పలు కారణాలు ఉన్నాయి. మొదటిది, DafaBet Curaçao eGaming లైసెన్స్ 1668/JAZ కింద నిరంతరం నియంత్రించబడుతోంది. ఈ లైసెన్స్ SSL ఎన్‌క్రిప్షన్, ఆర్థిక ఆడిట్‌లు మరియు RNG పారదర్శకతను తప్పనిసరి చేస్తుంది.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                రెండవది, 20+ సంవత్సరాల అనుభవం (2004 నుండి నిరంతరం నడుస్తోంది). ఇంత దీర్ఘ కాలంపాటు నడుస్తున్న ఆపరేటర్ ఆర్థికంగా స్థిరంగా ఉంటుంది మరియు చెల్లింపుల్లో మోసం చేసే అవకాశం చాలా తక్కువగా ఉంటుంది. మూడవది, SSL 128-బిట్ ఎన్‌క్రిప్షన్ మీ వ్యక్తిగత డేటా మరియు ఆర్థిక వివరాలను సురక్షితంగా ఉంచుతుంది.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                ప్లేయర్ ఫండ్లు ఆపరేటర్ ఆపరేటింగ్ ఖాతాల నుండి వేరే అకౌంట్‌లో భద్రపరచబడతాయి. ఇది మీ డబ్బు DafaBet యొక్క వ్యాపార కార్యకలాపాలకు వాడబడే ప్రమాదం లేకుండా చేస్తుంది.
              </p>
              <p className="text-gray-400 leading-relaxed">
                హెచ్చరిక: ఇంటర్నెట్‌లో DafaBet పేరుతో నకిలీ సైట్‌లు ఉన్నాయి. ఎప్పుడూ DafaWin లింక్ ద్వారా మాత్రమే DafaBet సైట్‌కు వెళ్ళండి — ఇది మీకు అధికారిక మరియు సురక్షితమైన లింక్ అందిస్తుంది. నకిలీ సైట్‌లలో లాగిన్ చేయడం ద్వారా మీ అకౌంట్ వివరాలు దొంగిలించబడవచ్చు.
              </p>
            </div>

            {/* Section 7: AP/తెలంగాణ నోట్ */}
            <div className="card border border-amber-500/30 mb-6">
              <h2 className="text-brand-gold font-bold text-xl mb-4">ఆంధ్రప్రదేశ్ / తెలంగాణ ఆటగాళ్ళకు ముఖ్యమైన సమాచారం</h2>
              <p className="text-gray-400 leading-relaxed mb-3">
                ఆంధ్రప్రదేశ్ 2020 లో గేమింగ్ చట్టానికి సవరణలు చేసింది, ఆన్‌లైన్ గేమింగ్‌పై అదనపు పరిమితులు విధించింది. తెలంగాణ 2017 లో టెలంగాణ గేమింగ్ (సవరణ) చట్టం ద్వారా ఆన్‌లైన్ గేమింగ్ కార్యకలాపాలను నిషేధించింది. ఈ రెండు రాష్ట్రాలు ఆన్‌లైన్ జూదానికి సంబంధించి మరింత కఠినమైన నిబంధనలు కలిగి ఉన్నాయి.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                DafaBet ఆఫ్‌షోర్ ఆపరేటర్ కావడం వల్ల నేరుగా ఇండియన్ రాష్ట్ర చట్టాల పరిధిలోకి రాకపోవచ్చు. అయినప్పటికీ, మీ రాష్ట్ర చట్టాల గురించి పూర్తిగా అర్థం చేసుకున్న తర్వాత మాత్రమే నిర్ణయించుకోవాలి. ప్రతి ఆటగాడు తమ స్వంత చట్టపరమైన పరిశోధన చేయాలి.
              </p>
              <p className="text-gray-400 leading-relaxed">
                <span className="text-amber-400 font-semibold">గమనిక:</span> ఇది చట్టపరమైన సలహా కాదు. మీ రాష్ట్ర చట్టాలు మరియు మీ వ్యక్తిగత పరిస్థితి ఆధారంగా స్వయంగా నిర్ణయించుకోండి. చట్టపరమైన సలహా కోసం అర్హత కలిగిన న్యాయవాది సంప్రదించండి.
              </p>
            </div>

            {/* Section 8: FAQ Telugu */}
            <div className="card mb-6">
              <h2 className="text-brand-gold font-bold text-xl mb-5">తరచుగా అడిగే ప్రశ్నలు (Telugu FAQ)</h2>

              <details className="mb-4 border-b border-brand-border pb-4 group">
                <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center gap-4">
                  <span>DafaBet ఇండియాలో చట్టపరంగా అనుమతించబడిందా?</span>
                  <span className="text-brand-gold text-xl shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="text-gray-400 text-sm leading-relaxed mt-3">
                  <p className="mb-2">భారత కేంద్ర చట్టం వ్యక్తులు ఆఫ్‌షోర్-లైసెన్స్ ఆపరేటర్‌లతో బెట్టింగ్ చేయడాన్ని స్పష్టంగా నిషేధించదు. పబ్లిక్ గ్యాంబ్లింగ్ యాక్ట్ 1867 భౌతిక జూదశాలలకు మాత్రమే వర్తిస్తుంది — ఆన్‌లైన్ ఆఫ్‌షోర్ బెట్టింగ్‌కు కాదు.</p>
                  <p>DafaBet Curaçao eGaming లైసెన్స్ 1668/JAZ కింద నడుస్తుంది మరియు ఆఫ్‌షోర్ నుండి ఇండియన్ ఆటగాళ్ళకు సేవ అందిస్తుంది. అయితే, ఆంధ్రప్రదేశ్ మరియు తెలంగాణ వంటి రాష్ట్రాలు మరింత కఠినమైన నిబంధనలు కలిగి ఉన్నాయి. మీ రాష్ట్ర నిబంధనలు తెలుసుకున్న తర్వాత నిర్ణయించుకోండి.</p>
                </div>
              </details>

              <details className="mb-4 border-b border-brand-border pb-4 group">
                <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center gap-4">
                  <span>వెల్కం బోనస్ ఎంత మరియు ఎలా క్లెయిమ్ చేయాలి?</span>
                  <span className="text-brand-gold text-xl shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="text-gray-400 text-sm leading-relaxed mt-3">
                  <p className="mb-2">DafaBet 200% ఫస్ట్-డిపాజిట్ మ్యాచ్ బోనస్ అందిస్తుంది, గరిష్టంగా ₹20,000 వరకు. మీరు ₹10,000 జమ చేస్తే ₹20,000 బోనస్ పొందుతారు — మొత్తం ₹30,000 అందుబాటులో ఉంటుంది.</p>
                  <p className="mb-2">కనీస జమ: ₹500. ప్రోమో కోడ్ అవసరం లేదు — మొదటి జమతో అటోమేటిగా బోనస్ క్రెడిట్ అవుతుంది.</p>
                  <p>వేజరింగ్: బోనస్‌పై 8x, 30 రోజుల్లో పూర్తి చేయాలి. స్పోర్ట్స్ మరియు కేసినో రెండూ వేజరింగ్‌లో లెక్కవుతాయి.</p>
                </div>
              </details>

              <details className="mb-4 border-b border-brand-border pb-4 group">
                <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center gap-4">
                  <span>UPI తో DafaBet లో ఎలా జమ చేయాలి?</span>
                  <span className="text-brand-gold text-xl shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="text-gray-400 text-sm leading-relaxed mt-3">
                  <p className="mb-2">1. DafaBet లో లాగిన్ చేయండి మరియు &quot;డిపాజిట్&quot; క్లిక్ చేయండి.</p>
                  <p className="mb-2">2. UPI ఎంచుకోండి — PhonePe, GPay, Paytm, లేదా BHIM.</p>
                  <p className="mb-2">3. మొత్తం నమోదు చేయండి (కనీసం ₹500).</p>
                  <p className="mb-2">4. మీ UPI యాప్‌లో చెల్లింపు ధృవీకరించండి.</p>
                  <p>60 సెకన్లలోపు మీ DafaBet అకౌంట్‌లో డబ్బు కనిపిస్తుంది. ఎలాంటి ఫీజు లేదు.</p>
                </div>
              </details>

              <details className="mb-4 border-b border-brand-border pb-4 group">
                <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center gap-4">
                  <span>IPL మ్యాచ్‌లపై DafaBet లో పందెం వేయవచ్చా?</span>
                  <span className="text-brand-gold text-xl shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="text-gray-400 text-sm leading-relaxed mt-3">
                  <p className="mb-2">అవును. DafaBet IPL లో 10 జట్లు అన్నింటి మ్యాచ్‌లను 30+ మార్కెట్‌లతో కవర్ చేస్తుంది. అందుబాటులో ఉన్న మార్కెట్‌లు:</p>
                  <ul className="list-disc list-inside space-y-1 mb-2">
                    <li>మ్యాచ్ విన్నర్</li>
                    <li>టాప్ బ్యాటర్, టాప్ బౌలర్</li>
                    <li>లైవ్ బాల్-బై-బాల్ బెట్టింగ్</li>
                    <li>క్యాష్-అవుట్ ఫీచర్</li>
                    <li>ప్లేయర్ పర్ఫార్మెన్స్ ప్రాప్స్</li>
                  </ul>
                  <p>సన్‌రైజర్స్ హైదరాబాద్ మ్యాచ్‌లు సహా అన్ని IPL మ్యాచ్‌లు కవర్ చేయబడతాయి.</p>
                </div>
              </details>

              <details className="mb-4 border-b border-brand-border pb-4 group">
                <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center gap-4">
                  <span>మొబైల్‌లో DafaBet వాడవచ్చా?</span>
                  <span className="text-brand-gold text-xl shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="text-gray-400 text-sm leading-relaxed mt-3">
                  <p className="mb-2">అవును. DafaBet Android మరియు iOS రెండింటికీ నేటివ్ యాప్‌లు అందిస్తుంది.</p>
                  <p className="mb-2"><span className="text-white font-medium">Android:</span> APK ని నేరుగా DafaBet అధికారిక సైట్ నుండి డౌన్‌లోడ్ చేయాలి (Google Play Store లో లేదు — గేమింగ్ యాప్ పాలసీ కారణంగా). ఇది 100% సురక్షితం.</p>
                  <p className="mb-2"><span className="text-white font-medium">iOS:</span> Apple App Store లో భారత వినియోగదారులకు అందుబాటులో ఉంది.</p>
                  <p>యాప్ లేకుండా కూడా మొబైల్ బ్రౌజర్ ద్వారా పూర్తి సైట్ యాక్సెస్ చేయవచ్చు.</p>
                </div>
              </details>

              <details className="group">
                <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center gap-4">
                  <span>DafaBet విత్‌డ్రాల్ ఎంత సమయం పడుతుంది?</span>
                  <span className="text-brand-gold text-xl shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="text-gray-400 text-sm leading-relaxed mt-3">
                  <p className="mb-2">విత్‌డ్రాల్ సమయాలు పేమెంట్ మెథడ్ ఆధారంగా మారుతాయి:</p>
                  <ul className="list-disc list-inside space-y-1 mb-2">
                    <li>UPI (PhonePe, GPay, Paytm): <span className="text-white">1–4 గంటలు</span></li>
                    <li>బ్యాంక్ ట్రాన్స్‌ఫర్: <span className="text-white">1–3 పని రోజులు</span></li>
                  </ul>
                  <p className="mb-2">మొదటి విత్‌డ్రాల్‌కు ముందు KYC (PAN + Aadhaar) అవసరం — ఇది ఒక్కసారి మాత్రమే. ఆ తర్వాత అన్ని విత్‌డ్రాళ్ళు నేరుగా ప్రాసెస్ అవుతాయి.</p>
                  <p>DafaBet జమ లేదా విత్‌డ్రాల్ ఏ దిశలోనూ ఫీజు వసూలు చేయదు.</p>
                </div>
              </details>
            </div>

            {/* Section 9: బాధ్యతాయుత జూదం */}
            <div className="card border border-brand-border mb-8">
              <h2 className="text-brand-gold font-bold text-xl mb-4">బాధ్యతాయుత జూదం — 18+ మాత్రమే</h2>
              <p className="text-gray-400 leading-relaxed mb-3">
                DafaBet లో పందెం వినోదం కోసం మాత్రమే ఆడాలి — ఆదాయం సంపాదించే మార్గంగా చూడకూడదు. జూదం వ్యసనానికి దారి తీయవచ్చు. మీకు లేదా మీ అభిమానికి జూదంపై నియంత్రణ కోల్పోయే సమస్య ఉంటే, వెంటనే నిపుణుల సహాయం తీసుకోండి.
              </p>
              <p className="text-gray-400 leading-relaxed mb-3">
                DafaBet 18 ఏళ్ళు నిండిన వ్యక్తులకు మాత్రమే అనుమతి ఇస్తుంది. మీరు పోగొట్టుకోగలిగే దానికంటే ఎక్కువ పందెం వేయకండి. సహాయం కోసం సంప్రదించండి:
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
            <div className="card">
              <h3 className="text-brand-gold font-bold mb-4">త్వరిత లింక్‌లు</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/dafabet-review" className="text-brand-gold hover:underline text-sm">DafaBet రివ్యూ</Link>
                <span className="text-gray-600">·</span>
                <Link href="/dafabet-bonus" className="text-brand-gold hover:underline text-sm">DafaBet బోనస్</Link>
                <span className="text-gray-600">·</span>
                <Link href="/dafabet-registration" className="text-brand-gold hover:underline text-sm">రిజిస్ట్రేషన్</Link>
                <span className="text-gray-600">·</span>
                <Link href="/sports-betting" className="text-brand-gold hover:underline text-sm">స్పోర్ట్స్ బెట్టింగ్</Link>
                <span className="text-gray-600">·</span>
                <Link href="/online-casino" className="text-brand-gold hover:underline text-sm">ఆన్‌లైన్ కేసినో</Link>
              </div>
            </div>

          </section>
        )}

        {/* English sections after te block — only for non-te locales */}
        {locale !== 'te' && (
          <>
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
          </>
        )}

      </div>
    </>
  )
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <HomePageContent locale={locale} />
}
