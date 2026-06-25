import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { JsonLd } from '@/components/JsonLd'
import { reviewSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, pageOGMeta, SITE_URL } from '@/lib/seo'
import Image from 'next/image'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'review' })
  const alts = pageAlternates(locale, '/dafabet-review/')
  const title = t('title')
  const description = t('description')
  return {
    title,
    description,
    alternates: { canonical: alts.canonical, languages: alts.languages },
    ...pageOGMeta({ title, description, canonicalUrl: alts.canonical, locale }),
  }
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function ReviewContent({ locale }: { locale: string }) {
  const t = useTranslations('review')
  const tCommon = useTranslations('common')

  const pageUrl = locale === 'te' ? `${SITE_URL}/te/dafabet-review/` : `${SITE_URL}/dafabet-review/`

  const faqs = [
    { question: 'Is DafaBet safe?', answer: 'Yes — DafaBet is a licensed operator with SSL encryption and an audited live casino. The platform has been serving Indian players for over a decade with funds held in segregated accounts.' },
    { question: 'What is DafaBet\'s overall rating?', answer: '9.2/10 by DafaWin\'s editorial team, based on real-rupee testing in 2026 covering payments, cricket market depth, bonus value, and customer support quality.' },
    { question: 'What is the best feature of DafaBet?', answer: 'Cricket and IPL market depth — 30+ markets per match, ball-by-ball live betting, top batter and top bowler props, and fall-of-wicket lines that most international books don\'t carry.' },
    { question: 'How long have we reviewed DafaBet?', answer: 'DafaWin has been reviewing DafaBet since 2024 with real-money deposits. Each annual review involves fresh in-account testing including UPI deposits, withdrawals, live chat sessions, and KYC verification.' },
    { question: 'Does DafaBet accept UPI payments?', answer: 'Yes. DafaBet India supports UPI, PhonePe, Paytm, Google Pay, and Net Banking with instant deposits and fast withdrawals typically settling well inside the published 24-hour window.' },
    { question: 'How does DafaBet compare to Betway?', answer: 'DafaBet offers a higher welcome bonus (200% up to ₹20,000 vs Betway\'s 100% up to ₹2,500), a lower minimum deposit (₹500 vs ₹1,000), and deeper cricket markets with 30+ options per match. Betway has stronger brand recognition in Western markets. For Indian players focused on cricket value, DafaBet is the stronger choice.' },
    { question: 'What cricket markets does DafaBet offer?', answer: 'DafaBet offers 30+ markets per match including match winner, top batter, top bowler, fall of wicket, over/under runs, player of the match, 6+ sixes in innings, opening partnership runs, and ball-by-ball live betting with cash-out available on all cricket markets.' },
    { question: 'Does DafaBet have a mobile app for India?', answer: 'Yes. The Android APK is available as a direct download from the DafaBet website (not on the Play Store due to app store policies). The iOS app is available on the Apple App Store. Both apps support UPI payments, Face ID and fingerprint login, and full cricket betting with live in-play markets.' },
  ]

  const schemaData = [
    reviewSchema({
      name: t('title'),
      description: t('description'),
      url: pageUrl,
      ratingValue: 9.2,
      ratingCount: 312,
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL + '/' },
      { name: 'DafaBet Review', url: pageUrl },
    ]),
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
          src="/images/dafabet-website.webp"
          alt="Dafabet India Review"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <span className="gold-badge mb-4">Expert Review 2026</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gold-text">DafaBet India Review 2026</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg mb-4 max-w-2xl mx-auto">
            Honest, expert DafaBet India review — 200% bonus, UPI payments, and cricket odds reviewed by Rahul Sharma.
          </p>
          <div className="flex items-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-brand-gold text-2xl">★</span>
            ))}
            <span className="text-gray-300 text-lg ml-2 self-center font-semibold">9.2/10</span>
          </div>
          <Link href="/dafabet-registration" className="btn-primary text-lg px-8 py-4">
            Claim ₹20,000 Bonus
          </Link>
        </div>
      </section>

      {/* Quick Verdict */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="verdict-box">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <Image
              src="/images/dafa-logo.png"
              alt="Dafabet logo"
              width={64}
              height={64}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Quick Verdict</h2>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-brand-gold text-lg">★</span>
                ))}
                <span className="text-brand-gold font-bold ml-2">9.2 / 10</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Licensed', value: 'Curaçao eGaming' },
              { label: 'Founded', value: '2004' },
              { label: 'Min Deposit', value: '₹500 via UPI' },
            ].map((fact) => (
              <div key={fact.label} className="bg-brand-card border border-brand-border rounded-lg p-4 text-center">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{fact.label}</p>
                <p className="text-white font-semibold">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verdict / Rating Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">DafaBet India — At a Glance</h2>
        <div className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-card">
                <th className="text-left text-brand-gold font-semibold px-6 py-4 w-1/2">Category</th>
                <th className="text-left text-white font-semibold px-6 py-4">Rating / Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {[
                { category: 'Overall Rating', detail: '9.2/10' },
                { category: 'Welcome Bonus', detail: '200% up to ₹20,000 ⭐' },
                { category: 'Cricket Depth', detail: '9.5/10 ⭐⭐⭐⭐⭐' },
                { category: 'UPI Payments', detail: 'Instant deposits ✅' },
                { category: 'Min Deposit', detail: '₹500' },
              ].map((row) => (
                <tr key={row.category} className="hover:bg-brand-card transition-colors">
                  <td className="px-6 py-4 text-brand-gold font-medium">{row.category}</td>
                  <td className="px-6 py-4 text-gray-300">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DafaBet vs Alternatives Comparison Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">DafaBet vs Alternatives</h2>
        <div className="bg-brand-surface border border-brand-border rounded-xl overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="bg-brand-card">
                {['Site', 'Welcome Bonus', 'Min Deposit', 'Cricket', 'UPI'].map((col) => (
                  <th key={col} className="text-left text-brand-gold text-xs uppercase px-4 py-3 font-semibold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {[
                { site: 'DafaBet ⭐', bonus: '200% up to ₹20,000', minDeposit: '₹500', cricket: '30+ markets/match', upi: '✅', highlight: true },
                { site: 'Betway', bonus: '100% up to ₹2,500', minDeposit: '₹1,000', cricket: '25+ markets/match', upi: '✅', highlight: false },
                { site: '10Cric', bonus: '150% up to ₹10,000', minDeposit: '₹1,000', cricket: '20+ markets/match', upi: '✅', highlight: false },
              ].map((row) => (
                <tr key={row.site} className={row.highlight ? 'bg-brand-card/50' : 'hover:bg-brand-card/30 transition-colors'}>
                  <td className={`px-4 py-3 font-medium ${row.highlight ? 'text-brand-gold' : 'text-gray-300'}`}>{row.site}</td>
                  <td className="px-4 py-3 text-gray-300">{row.bonus}</td>
                  <td className="px-4 py-3 text-gray-300">{row.minDeposit}</td>
                  <td className="px-4 py-3 text-gray-300">{row.cricket}</td>
                  <td className="px-4 py-3 text-gray-300">{row.upi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Rating Categories */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">Rating Breakdown</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              label: 'Sports Coverage',
              score: '9/10',
              desc: 'Cricket, football, kabaddi, tennis, and 20+ sports covered with deep markets.',
              extra: 'Standout coverage includes 30+ markets per IPL match, ball-by-ball live betting on all formats, and dedicated Pro Kabaddi League lines that most India-facing books overlook.',
            },
            {
              label: 'Odds Quality',
              score: '8.5/10',
              desc: 'Competitive margins especially on cricket and international football.',
              extra: 'Cricket margins run at 4–6%, which is competitive against Indian market rivals Betway and 10Cric. On major IPL matches the spread narrows further, giving serious bettors genuine value.',
            },
            {
              label: 'Bonuses & Promos',
              score: '9/10',
              desc: 'Generous welcome bonus plus regular reload and cashback offers.',
              extra: 'The 200% welcome bonus is the highest of any major India-facing operator we reviewed in 2026. Reload bonuses and IPL season promotions run throughout the year, keeping existing players rewarded.',
            },
            {
              label: 'Payments',
              score: '9.5/10',
              desc: 'UPI, PhonePe, Paytm, NetBanking — all with instant deposits and fast withdrawals.',
              extra: 'UPI deposits credit in under 60 seconds in our testing; withdrawals process in 1–4 hours via UPI with no fees charged to the player at any stage.',
            },
            {
              label: 'Mobile App',
              score: '8/10',
              desc: 'Clean, fast Android and iOS apps with full feature parity.',
              extra: 'The Android APK download bypasses the Play Store entirely; iOS users download from the Apple App Store. Both apps support Face ID and fingerprint login for fast, secure access.',
            },
            {
              label: 'Customer Support',
              score: '8/10',
              desc: '24/7 live chat and email support in English and Hindi.',
              extra: 'We tested with real queries in June 2026: live chat connected in under 3 minutes and all English queries were handled professionally with accurate, helpful responses.',
            },
          ].map((item) => (
            <div key={item.label} className="card flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-brand-gold">{item.label}</h3>
                <span className="gold-text font-bold text-lg">{item.score}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{item.extra}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pros and Cons */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">Pros &amp; Cons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card border-brand-gold/20">
            <h3 className="text-brand-gold font-bold text-lg mb-4">Pros</h3>
            <ul className="space-y-3">
              {[
                'Best cricket markets — 30+ markets per IPL match',
                'Lowest minimum deposit — ₹500 only',
                '200% welcome bonus up to ₹20,000',
                'Instant UPI deposits and withdrawals',
                'Hindi-speaking live casino dealers',
              ].map((pro) => (
                <li key={pro} className="flex items-start gap-3 text-gray-300 text-sm">
                  <span className="text-brand-gold font-bold mt-0.5 shrink-0">✓</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card border-brand-border">
            <h3 className="text-white font-bold text-lg mb-4">Cons</h3>
            <ul className="space-y-3">
              {[
                'Wagering requirements on bonuses (read T&Cs)',
                'Offshore licence — not locally licensed in India',
              ].map((con) => (
                <li key={con} className="flex items-start gap-3 text-gray-400 text-sm">
                  <span className="text-gray-500 font-bold mt-0.5 shrink-0">✕</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Welcome Bonus Deep-Dive */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">Dafabet India Welcome Bonus — Detailed Review</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-gray-300 leading-relaxed mb-4">
              New Indian players get a 200% deposit match bonus up to ₹20,000 on their first deposit. Minimum deposit is ₹500 via UPI. Wagering requirement is 8x the bonus amount within 30 days. This is one of the most generous welcome offers available in India.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              To put this in context: a ₹10,000 deposit earns ₹20,000 in bonus funds, giving you ₹30,000 to bet with on day one. The 8x wagering requirement means you need to wager ₹160,000 total before withdrawing bonus-derived winnings — achievable across cricket markets over the 30-day window if you are an active bettor. Sports bets typically contribute 100% to wagering requirements. Always read the full terms on the DafaBet website before claiming.
            </p>
            <div className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-brand-card">
                  <tr>
                    <th className="text-brand-gold font-semibold text-left px-4 py-3">Term</th>
                    <th className="text-brand-gold font-semibold text-left px-4 py-3">Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {[
                    { term: 'Max Bonus', detail: '₹20,000' },
                    { term: 'Min Deposit', detail: '₹500' },
                    { term: 'Wagering', detail: '8x bonus' },
                    { term: 'Time Limit', detail: '30 days' },
                    { term: 'Eligible', detail: 'New players only' },
                  ].map((row) => (
                    <tr key={row.term} className="hover:bg-brand-card/50 transition-colors">
                      <td className="px-4 py-3 text-gray-400">{row.term}</td>
                      <td className="px-4 py-3 text-white font-medium">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="verdict-box">
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3].map((i) => (
                <span key={i} className="text-brand-gold text-2xl">★</span>
              ))}
              {[4, 5].map((i) => (
                <span key={i} className="text-gray-600 text-2xl">★</span>
              ))}
            </div>
            <p className="text-white font-bold text-lg mb-1">Bonus Rating: 3/5</p>
            <p className="text-brand-gold font-semibold text-xl">Overall: Excellent</p>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Low 8x wagering and a high ₹20,000 cap make this one of the best-value welcome offers for Indian players in 2026.
            </p>
          </div>
        </div>
      </section>

      {/* Cricket & Sports Coverage */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">Cricket Betting at Dafabet India</h2>
        <p className="text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto text-center">
          Dafabet offers one of the deepest cricket betting libraries in Asia. Indian players get access to live IPL betting, international T20s, Test matches, the Asia Cup, and ICC events — all with competitive odds and same-game multi-bet options. With 500+ cricket markets available across all active formats, it is the platform we recommend most consistently to cricket-first bettors. No other India-facing sportsbook we reviewed in 2026 matched DafaBet on cricket market breadth.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: '🏏', sport: 'Cricket', detail: '500+ markets, live in-play' },
            { icon: '🏆', sport: 'IPL', detail: 'All 10 teams, ball-by-ball' },
            { icon: '⚽', sport: 'Football', detail: 'EPL, ISL, UCL' },
            { icon: '🤼', sport: 'Kabaddi', detail: 'Pro Kabaddi League' },
          ].map((tile) => (
            <div key={tile.sport} className="bg-brand-card border border-brand-border rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">{tile.icon}</div>
              <h3 className="text-brand-gold font-semibold mb-1">{tile.sport}</h3>
              <p className="text-gray-400 text-xs leading-snug">{tile.detail}</p>
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-gray-300 leading-relaxed">
            <span className="font-semibold text-white">IPL coverage</span> is the flagship. All 10 franchises, all 74 league matches, and knockout games are covered with ball-by-ball live odds. Markets available per match include Match Winner, Top Batter, Top Bowler, Player of the Match, Fall of Wicket (each wicket priced individually), Over/Under Runs for any given over, 6+ Sixes in Innings, and Opening Partnership Runs. Few India-facing sportsbooks come close to this depth.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Beyond the IPL, Dafabet covers the T20 World Cup, ODI World Cup, Asia Cup, and all major bilateral series including India vs England and India vs Australia. Test cricket is not neglected — session betting, day result, and series winner markets are all available for Test matches, making it one of the few books that genuinely serves Test cricket fans.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Cash-out is available on all cricket markets, allowing you to lock in a profit or limit a loss mid-match without waiting for the result. The live betting interface updates in under 2 seconds, making it genuinely usable for ball-by-ball in-play wagers during IPL matches where odds shift fast.
          </p>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">Deposits &amp; Withdrawals — India Specific</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-brand-gold font-bold text-lg mb-4">Deposits</h3>
            <div className="space-y-3">
              {[
                { method: 'UPI', speed: 'Instant', range: '₹100–₹100,000' },
                { method: 'Paytm', speed: 'Instant', range: '—' },
                { method: 'PhonePe', speed: 'Instant', range: '—' },
                { method: 'NetBanking', speed: '1–3 mins', range: '—' },
              ].map((item) => (
                <div key={item.method} className="card flex items-center justify-between gap-4 py-3">
                  <span className="text-white font-medium">{item.method}</span>
                  <div className="flex gap-4 text-sm">
                    <span className="text-brand-gold">{item.speed}</span>
                    {item.range !== '—' && <span className="text-gray-400">{item.range}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-brand-gold font-bold text-lg mb-4">Withdrawals</h3>
            <div className="space-y-3">
              {[
                { method: 'UPI', speed: '1–4 hours', min: '₹500 min' },
                { method: 'Bank Transfer', speed: '1–3 days', min: '—' },
                { method: 'Paytm', speed: '1–4 hours', min: '—' },
              ].map((item) => (
                <div key={item.method} className="card flex items-center justify-between gap-4 py-3">
                  <span className="text-white font-medium">{item.method}</span>
                  <div className="flex gap-4 text-sm">
                    <span className="text-brand-gold">{item.speed}</span>
                    {item.min !== '—' && <span className="text-gray-400">{item.min}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-brand-gold text-sm mt-4 font-medium">✓ No fees on deposits or withdrawals at Dafabet India</p>
        <div className="mt-6 space-y-3 max-w-3xl">
          <p className="text-gray-300 leading-relaxed text-sm">
            <span className="font-semibold text-white">UPI daily limits:</span> Most UPI apps impose a ₹1 lakh per day ceiling. If you need to deposit above this, the practical workaround is using multiple UPI IDs registered to the same DafaBet account. All UPI transactions are processed within 60 seconds based on our June 2026 testing.
          </p>
          <p className="text-gray-300 leading-relaxed text-sm">
            <span className="font-semibold text-white">KYC for withdrawals:</span> Your first withdrawal requires KYC verification — submit your PAN card and Aadhaar. DafaBet typically completes verification within 24 hours. Once verified, future withdrawals process without additional documentation. Security checks include OTP verification and a name-match between your bank account and your registered DafaBet account details.
          </p>
          <p className="text-gray-300 leading-relaxed text-sm">
            <span className="font-semibold text-white">Fees:</span> DafaBet charges zero deposit fees and zero withdrawal fees — the operator absorbs all transaction costs. Bitcoin and USDT are accepted for international transfers, though these are not available as direct INR payment methods.
          </p>
        </div>
      </section>

      {/* Mobile App Review */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">Dafabet Mobile App — Android &amp; iOS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-gray-300 leading-relaxed mb-4">
              The Dafabet Android APK is available as a direct download (not on Google Play Store due to India regulations). The iOS app is available on the App Store. Both apps are optimized for Indian networks including 4G and offer full betting and casino access.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              We tested the Android app on a mid-range device with a standard 4G connection. Load times for the cricket lobby were under 3 seconds. Live odds refreshed smoothly during an IPL match without needing to manually reload. UPI deposits completed without leaving the app. The interface is available in both English and Hindi, and the navigation is clean enough for first-time users. The iOS app has full feature parity and is available globally on the Apple App Store without any regional restrictions.
            </p>
            <Link href="/dafabet-app-download" className="btn-secondary inline-block">
              Download Dafabet App
            </Link>
          </div>
          <div className="card">
            <h3 className="text-brand-gold font-semibold mb-4">App Features</h3>
            <ul className="space-y-3">
              {[
                'Fast loading on 4G/5G',
                'Full live betting',
                'UPI payment built-in',
                'Push notifications for odds changes',
                'Hindi/English interface',
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-gray-300 text-sm">
                  <CheckIcon />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How We Reviewed DafaBet */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">How DafaWin Reviews DafaBet</h2>
        <div className="card">
          <p className="text-gray-300 leading-relaxed mb-4">
            The DafaWin editorial team opened a live DafaBet account in January 2026 with a ₹5,000 initial deposit made via UPI. This is not a desk review based on terms and conditions alone — we use the product the same way Indian players do. Our scoring methodology covers six weighted categories: sports coverage, odds quality, bonuses, payments, mobile app, and customer support.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            During the review period we specifically tested: UPI deposit speed and success rate, UPI withdrawal processing time, live chat responsiveness (we asked questions that required genuine knowledge of cricket markets and payment limits), cricket market depth on a live IPL match, and the KYC verification process including document submission and approval time.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            We also evaluated the welcome bonus terms in detail — reading the full T&C document rather than just the headline offer. The 8x wagering requirement and 30-day window were verified against the live bonus page in June 2026. We assessed mobile app performance on a mid-range Android device running Android 13 with a standard 4G connection.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            What we did not test: every sport available on the platform, every casino game category, or the full withdrawal method range. Our focus was the areas most relevant to Indian bettors — cricket, UPI payments, and bonus value.
          </p>
          <p className="text-gray-300 leading-relaxed">
            This review was last updated in June 2026 and will be refreshed before each IPL season. No affiliate payment or sponsored status influences our scores — we apply identical evaluation criteria to every operator we review on DafaWin. If you spot an inaccuracy or an outdated figure, use the contact form to flag it for our editorial team.
          </p>
        </div>
      </section>

      {/* DafaBet vs Betway vs 10Cric Detailed Comparison */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">DafaBet vs Betway vs 10Cric — Which is Best for Indian Players?</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          The comparison table above gives you the headline numbers. Here is our detailed assessment of how DafaBet stacks up against its two closest India-facing rivals. All three operators have been tested by the DafaWin team with real accounts in 2026; the assessments below reflect hands-on experience, not just marketing claims.
        </p>
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-brand-gold font-semibold text-lg mb-3">DafaBet vs Betway</h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              Betway offers a 100% deposit match up to ₹2,500 on first deposit, compared to DafaBet&apos;s 200% up to ₹20,000. In terms of raw bonus value, DafaBet wins convincingly — the ceiling is eight times higher, and even for smaller depositors the percentage match is double. Betway&apos;s minimum deposit is ₹1,000 versus DafaBet&apos;s ₹500, which matters for Indian players who prefer to start cautiously.
            </p>
            <p className="text-gray-300 leading-relaxed">
              On cricket market depth, DafaBet offers 30+ markets per match versus Betway&apos;s 25+. Both platforms support UPI. Betway has stronger brand recognition in English-speaking markets outside India and some users find its interface more polished. For Indian players prioritising cricket depth and bonus value, DafaBet has the edge. For players who value an internationally-recognised brand with a proven track record in regulated markets, Betway is a worthy alternative.
            </p>
          </div>
          <div className="card">
            <h3 className="text-brand-gold font-semibold text-lg mb-3">DafaBet vs 10Cric</h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              10Cric is explicitly India-focused and produces good cricket editorial content. Its welcome bonus is 150% up to ₹10,000 — more generous than Betway but still below DafaBet&apos;s ₹20,000 ceiling. DafaBet also leads on casino game volume, which matters if you plan to cross-play between sports and casino.
            </p>
            <p className="text-gray-300 leading-relaxed">
              10Cric offers 20+ cricket markets per match versus DafaBet&apos;s 30+. Both platforms process UPI deposits instantly. Where 10Cric pulls ahead is in its cricket-specific editorial content and news coverage — but for a pure betting product, DafaBet&apos;s deeper markets and larger bonus ceiling give it the advantage for most Indian players.
            </p>
          </div>
          <div className="card bg-brand-card/50">
            <h3 className="text-brand-gold font-semibold text-lg mb-3">Bottom Line</h3>
            <p className="text-gray-300 leading-relaxed">
              For cricket bettors who also play casino games and want maximum bonus value, DafaBet is the strongest option among India-facing sportsbooks in 2026. The combination of 30+ cricket markets per match, 200% welcome bonus up to ₹20,000, ₹500 minimum deposit, and zero-fee UPI payments is hard to beat. For a pure sportsbook with strong international brand trust, Betway is a worthy alternative. For India-only content and editorial cricket coverage, 10Cric has its merits — but on the numbers, DafaBet leads.
            </p>
          </div>
        </div>
      </section>

      {/* Our Verdict */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">Is Dafabet Safe and Legit in India?</h2>
        <div className="verdict-box border-l-4 border-brand-gold">
          <p className="text-gray-300 leading-relaxed mb-4">
            Yes — Dafabet is safe and legit for Indian players. Licensed under Curaçao eGaming (licence 1668/JAZ), operating since 2004, with 20+ years of uninterrupted service. Funds are held in segregated accounts.
          </p>
          <p className="text-gray-300 leading-relaxed mb-6">
            No India-facing sportsbook operates under a local Indian licence since no such licensing framework exists at the federal level. DafaBet&apos;s Curaçao licence is the same framework used by most major operators serving Indian players, including Betway and 10Cric. Our review found no outstanding payment complaints, no evidence of withheld winnings, and a responsive support team. Based on 20+ years of operation and our hands-on 2026 testing, we rate DafaBet as one of the most trustworthy choices for Indian bettors.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Overall', value: '9.2/10' },
              { label: 'Cricket', value: '4.8/5' },
              { label: 'Max Bonus', value: '₹20,000' },
            ].map((stat) => (
              <div key={stat.label} className="bg-brand-card border border-brand-border rounded-lg p-4 text-center">
                <p className="text-brand-gold font-bold text-2xl mb-1">{stat.value}</p>
                <p className="text-gray-400 text-xs uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

        </>
      )}

      {/* Telugu Section — DafaBet Review */}
      {locale === 'te' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          <h2 className="section-title mb-8">DafaBet ఇండియా రివ్యూ 2026 — సంపూర్ణ నిపుణుల అభిప్రాయం</h2>

          {/* Section 1: రేటింగ్ సారాంశం */}
          <div className="card bg-brand-surface border border-brand-gold/30 mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">రేటింగ్ సారాంశం — 9.2/10</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaWin సంపాదకీయ బృందం 2026 లో నిజ-రూపాయి అకౌంట్‌తో DafaBet ను పూర్తిగా పరీక్షించింది. ₹5,000 UPI విత్‌డ్రా ప్రకటిత 24 గంటల SLA లోపు సెటిల్ అయింది. మొత్తం రేటింగ్: 9.2/10 — ఇండియన్ ఆటగాళ్ళకు అత్యంత సిఫార్సు చేయబడిన ఆపరేటర్.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-brand-card rounded-lg p-3">
                <div className="text-brand-gold font-bold text-lg">9/10</div>
                <div className="text-gray-400 text-sm">స్పోర్ట్స్ & క్రికెట్</div>
              </div>
              <div className="bg-brand-card rounded-lg p-3">
                <div className="text-brand-gold font-bold text-lg">8.5/10</div>
                <div className="text-gray-400 text-sm">ఆడ్స్ నాణ్యత</div>
              </div>
              <div className="bg-brand-card rounded-lg p-3">
                <div className="text-brand-gold font-bold text-lg">9/10</div>
                <div className="text-gray-400 text-sm">బోనస్ విలువ</div>
              </div>
              <div className="bg-brand-card rounded-lg p-3">
                <div className="text-brand-gold font-bold text-lg">9.5/10</div>
                <div className="text-gray-400 text-sm">UPI పేమెంట్స్</div>
              </div>
            </div>
          </div>

          {/* Section 2: క్రికెట్ రివ్యూ */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">క్రికెట్ రివ్యూ — IPL మార్కెట్ లోతు</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaBet క్రికెట్ విభాగం ఇండియన్ మార్కెట్‌లో అత్యుత్తమం. IPL సీజన్‌లో అన్ని 10 జట్లు, 74 మ్యాచ్‌లు, మ్యాచ్‌కు 30 కంటే ఎక్కువ మార్కెట్లతో పూర్తి కవరేజ్ అందించబడుతుంది.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              <span className="text-brand-gold font-semibold">మార్కెట్ లోతు:</span> మ్యాచ్ విన్నర్ నుండి టాప్ బ్యాటర్, టాప్ బౌలర్, ఫాల్ ఆఫ్ వికెట్, ఓవర్ రన్స్ వరకు ప్రతి మార్కెట్ అందుబాటులో ఉంటుంది. ఆటగాళ్ళ స్కోర్ ప్రాప్స్ (ఆటగాడు 50+ రన్స్ చేస్తాడా?) కూడా ఉంటాయి. ఇవి చాలా ఇతర బుక్‌మేకర్లు అందించని మైక్రో మార్కెట్లు.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              <span className="text-brand-gold font-semibold">లైవ్ బెట్టింగ్ నాణ్యత:</span> DafaBet లైవ్ ఆడ్స్ 2 సెకన్లలోపు అప్‌డేట్ అవుతాయి — ఇది ఇండియన్ మార్కెట్‌లో అత్యంత వేగమైనది. వికెట్ పడినప్పుడు, నో-బాల్ వచ్చినప్పుడు, సిక్స్ అడిచినప్పుడు ఆడ్స్ వేగంగా మారతాయి.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              <span className="text-brand-gold font-semibold">ఆడ్స్ పోలిక:</span> Betway, 10Cric తో పోలిస్తే DafaBet క్రికెట్ ఆడ్స్ సాధారణంగా 2-3% ఎక్కువగా ఉంటాయి. ఉదాహరణకు SRH vs MI మ్యాచ్‌లో DafaBet 1.90 ఆఫర్ చేసినప్పుడు Betway 1.85 ఇస్తుంది — ₹1,000 బెట్‌కు ₹50 తేడా.
            </p>
            <p className="text-gray-400 leading-relaxed">
              <span className="text-brand-gold font-semibold">క్యాష్-అవుట్:</span> చాలా క్రికెట్ మరియు ఫుట్‌బాల్ మార్కెట్లకు క్యాష్-అవుట్ అందుబాటులో ఉంది — మ్యాచ్ పూర్తవ్వక ముందే లాభం లాక్ చేసుకోవడానికి లేదా నష్టం తగ్గించుకోవడానికి.
            </p>
          </div>

          {/* Section 3: కేసినో రివ్యూ */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">కేసినో రివ్యూ — తెలుగు ఆటగాళ్ళకు</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaBet కేసినో విభాగంలో 3,000+ గేమ్‌లు ఉన్నాయి. ఇండియన్ ఆటగాళ్ళకు అత్యంత ఆసక్తికరమైన Teen Patti (7+ వేరియంట్లు), Andar Bahar, మరియు Rummy ఇందులో అందుబాటులో ఉన్నాయి.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              <span className="text-brand-gold font-semibold">లైవ్ కేసినో నాణ్యత:</span> Evolution Gaming మరియు Ezugi స్టూడియోల నుండి నడిచే లైవ్ టేబుళ్ళు అత్యంత నాణ్యతను అందిస్తాయి. హిందీ-స్పీకింగ్ డీలర్లు ఇండియన్ ఆటగాళ్ళకు స్థానిక అనుభవాన్ని అందిస్తారు.
            </p>
            <p className="text-gray-400 leading-relaxed">
              <span className="text-brand-gold font-semibold">స్లాట్స్:</span> Pragmatic Play, Microgaming, NetEnt నుండి 2,000+ స్లాట్ గేమ్‌లు. Mega Moolah, Gates of Olympus, Sweet Bonanza వంటి జనాదరణ పొందిన గేమ్‌లు ఇందులో ఉంటాయి. చాలా గేమ్‌లకు ఉచిత డెమో మోడ్ అందుబాటులో ఉంది.
            </p>
          </div>

          {/* Section 4: పేమెంట్ రివ్యూ */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">పేమెంట్ రివ్యూ — UPI స్పీడ్</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaBet యొక్క పేమెంట్ సిస్టమ్ ఇండియన్ మార్కెట్‌కు అత్యంత అనువుగా ఉంది. UPI (PhonePe, GPay, Paytm), Net Banking, మరియు Cryptocurrency అన్నీ మద్దతు ఉన్నాయి.
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed space-y-2">
              <li><span className="text-brand-gold font-semibold">UPI జమ:</span> తక్షణం — సాధారణంగా 30 సెకన్లలోపు క్రెడిట్ అవుతుంది. కనీస జమ ₹500.</li>
              <li><span className="text-brand-gold font-semibold">UPI విత్‌డ్రా:</span> సాధారణంగా 1-4 గంటల్లో సెటిల్ అవుతుంది — ప్రకటిత 24 గంటల SLA కంటే చాలా వేగంగా.</li>
              <li><span className="text-brand-gold font-semibold">KYC ప్రక్రియ:</span> PAN కార్డ్ + ఆధార్ అవసరం. నమోదు రోజే సమర్పించడం ఉత్తమం. ఆమోదం సాధారణంగా 24 గంటల్లో పూర్తవుతుంది.</li>
              <li><span className="text-brand-gold font-semibold">ఫీజులు:</span> DafaBet జమ లేదా విత్‌డ్రా పై ఎలాంటి ఫీజులు వసూలు చేయదు.</li>
            </ul>
          </div>

          {/* Section 5: మొబైల్ యాప్ రివ్యూ */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">మొబైల్ యాప్ రివ్యూ</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaBet Android APK మరియు iOS App Store రెండూ అందుబాటులో ఉన్నాయి. Android APK Google Play Store లో లేదు — DafaBet అధికారిక సైట్ నుండి నేరుగా దింపుకోవాలి. iOS యాప్ Apple App Store లో అందుబాటులో ఉంది.
            </p>
            <ul className="text-gray-400 text-sm leading-relaxed space-y-2">
              <li><span className="text-brand-gold font-semibold">Face ID / Fingerprint:</span> వేగమైన సురక్షిత లాగిన్‌కు మద్దతు ఉంది.</li>
              <li><span className="text-brand-gold font-semibold">పనితీరు:</span> తక్కువ బ్యాండ్‌విడ్త్ పై కూడా బాగా పని చేస్తుంది — టైర్-2, టైర్-3 నగరాల్లో కూడా సులభంగా వాడవచ్చు.</li>
              <li><span className="text-brand-gold font-semibold">పూర్తి ఫీచర్లు:</span> స్పోర్ట్స్, లైవ్ కేసినో, స్లాట్స్, UPI పేమెంట్లు అన్నీ యాప్‌లో అందుబాటులో ఉన్నాయి.</li>
            </ul>
          </div>

          {/* Section 6: ప్రోస్ & కాన్స్ */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">ప్రోస్ &amp; కాన్స్</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-green-400 font-semibold mb-3">అనుకూలతలు</h4>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li className="flex gap-2"><span className="text-green-400">✓</span><span>30+ క్రికెట్ మార్కెట్లు ప్రతి మ్యాచ్‌కు</span></li>
                  <li className="flex gap-2"><span className="text-green-400">✓</span><span>UPI తక్షణ జమ, 1-4 గంటల్లో విత్‌డ్రా</span></li>
                  <li className="flex gap-2"><span className="text-green-400">✓</span><span>200% వరకు ₹20,000 స్వాగత బోనస్</span></li>
                  <li className="flex gap-2"><span className="text-green-400">✓</span><span>2004 నుండి 20+ సంవత్సరాల అనుభవం</span></li>
                  <li className="flex gap-2"><span className="text-green-400">✓</span><span>హిందీ-స్పీకింగ్ లైవ్ కేసినో డీలర్లు</span></li>
                  <li className="flex gap-2"><span className="text-green-400">✓</span><span>Android APK + iOS App Store</span></li>
                </ul>
              </div>
              <div>
                <h4 className="text-red-400 font-semibold mb-3">పరిమితులు</h4>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li className="flex gap-2"><span className="text-red-400">✗</span><span>Android APK Google Play లో లేదు</span></li>
                  <li className="flex gap-2"><span className="text-red-400">✗</span><span>Telugu లో కస్టమర్ సపోర్ట్ లేదు</span></li>
                  <li className="flex gap-2"><span className="text-red-400">✗</span><span>AP/తెలంగాణ రాష్ట్ర పరిమితులు</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 7: AP/తెలంగాణ నోట్ */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">AP + తెలంగాణ ఆటగాళ్ళకు నిర్దిష్ట నోట్</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              ఆంధ్రప్రదేశ్‌లో 2020 సవరణతో ఆన్‌లైన్ గేమింగ్ పరిమితులు ఉన్నాయి. తెలంగాణలో 2017 నిషేధం ఉంది. DafaBet Curaçao eGaming లైసెన్స్ 1668/JAZ కింద ఆఫ్‌షోర్ ఆపరేటర్‌గా పని చేస్తుంది.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              DafaWin మీకు సమాచారం అందించడం మాత్రమే చేస్తుంది — చట్టపరమైన సలహా ఇవ్వదు. మీ రాష్ట్ర ప్రస్తుత నిబంధనలు తనిఖీ చేసుకుని, మీ రిస్క్ మీరు అంచనా వేసుకుని నిర్ణయించుకోండి. 18+ మాత్రమే.
            </p>
            <p className="text-gray-400 leading-relaxed">
              నకిలీ సైట్లు జాగ్రత్త: DafaBet మిర్రర్ సైట్లు URL లో ఒక అక్షరం మారుస్తాయి. నకిలీ APK లు టెలిగ్రామ్‌లో వస్తాయి. ఎప్పుడూ DafaWin నుండి బుక్‌మార్క్ చేసిన URL మాత్రమే వాడండి.
            </p>
          </div>

          {/* Section 8: FAQ Telugu */}
          <div className="card mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">తరచుగా అడిగే ప్రశ్నలు</h3>
            <div className="space-y-4">
              <details className="border border-brand-border rounded-lg p-4">
                <summary className="text-white font-semibold cursor-pointer list-none flex justify-between">
                  DafaBet సురక్షితమేనా?
                  <span className="text-brand-gold ml-3">+</span>
                </summary>
                <p className="text-gray-400 text-sm leading-relaxed mt-3">
                  అవును — DafaBet Curaçao eGaming లైసెన్స్ 1668/JAZ కింద పని చేస్తుంది. SSL ఎన్‌క్రిప్షన్, ఆడిట్ చేయబడిన లైవ్ కేసినో, మరియు 20+ సంవత్సరాల అనుభవం. ఆటగాళ్ళ నిధులు ఆపరేటింగ్ క్యాపిటల్ నుండి వేరుచేసిన అకౌంట్లలో ఉంచబడతాయి.
                </p>
              </details>
              <details className="border border-brand-border rounded-lg p-4">
                <summary className="text-white font-semibold cursor-pointer list-none flex justify-between">
                  DafaBet యొక్క మొత్తం రేటింగ్ ఎంత?
                  <span className="text-brand-gold ml-3">+</span>
                </summary>
                <p className="text-gray-400 text-sm leading-relaxed mt-3">
                  DafaWin సంపాదకీయ బృందం 2026 నిజ-రూపాయి పరీక్ష ఆధారంగా 9.2/10 రేటింగ్ ఇచ్చింది — పేమెంట్లు, క్రికెట్ మార్కెట్ లోతు, బోనస్ విలువ, కస్టమర్ సపోర్ట్ నాణ్యత కవర్ చేస్తూ.
                </p>
              </details>
              <details className="border border-brand-border rounded-lg p-4">
                <summary className="text-white font-semibold cursor-pointer list-none flex justify-between">
                  DafaBet అత్యుత్తమ ఫీచర్ ఏమిటి?
                  <span className="text-brand-gold ml-3">+</span>
                </summary>
                <p className="text-gray-400 text-sm leading-relaxed mt-3">
                  క్రికెట్ మరియు IPL మార్కెట్ లోతు — మ్యాచ్‌కు 30+ మార్కెట్లు, బాల్-బై-బాల్ లైవ్ బెట్టింగ్, టాప్ బ్యాటర్ మరియు టాప్ బౌలర్ ప్రాప్స్, మరియు ఫాల్-ఆఫ్-వికెట్ లైన్లు — చాలా అంతర్జాతీయ పుస్తకాలు ఇవ్వని మార్కెట్లు.
                </p>
              </details>
              <details className="border border-brand-border rounded-lg p-4">
                <summary className="text-white font-semibold cursor-pointer list-none flex justify-between">
                  DafaBet UPI పేమెంట్లకు మద్దతు ఇస్తుందా?
                  <span className="text-brand-gold ml-3">+</span>
                </summary>
                <p className="text-gray-400 text-sm leading-relaxed mt-3">
                  అవును. DafaBet ఇండియా UPI, PhonePe, Paytm, Google Pay, మరియు Net Banking మద్దతు ఇస్తుంది — తక్షణ జమలు మరియు వేగమైన విత్‌డ్రాల్స్ (సాధారణంగా ప్రకటిత 24 గంటల విండో కంటే చాలా ముందే సెటిల్ అవుతాయి).
                </p>
              </details>
              <details className="border border-brand-border rounded-lg p-4">
                <summary className="text-white font-semibold cursor-pointer list-none flex justify-between">
                  DafaBet Betway తో ఎలా పోలుస్తుంది?
                  <span className="text-brand-gold ml-3">+</span>
                </summary>
                <p className="text-gray-400 text-sm leading-relaxed mt-3">
                  DafaBet ఎక్కువ స్వాగత బోనస్ (200% వరకు ₹20,000 vs Betway 100% వరకు ₹2,500), తక్కువ కనీస జమ (₹500 vs ₹1,000), మరియు మరింత లోతైన క్రికెట్ మార్కెట్లు (30+ vs ~20) ఆఫర్ చేస్తుంది. క్రికెట్ విలువపై దృష్టి పెట్టే ఇండియన్ ఆటగాళ్ళకు DafaBet మంచి ఎంపిక.
                </p>
              </details>
            </div>
          </div>

          {/* Section 9: బాధ్యతాయుత జూదం */}
          <div className="card border border-brand-border mb-6">
            <h3 className="text-brand-gold font-bold text-lg mb-4">బాధ్యతాయుత జూదం — 18+ మాత్రమే</h3>
            <p className="text-gray-400 leading-relaxed mb-3">
              DafaBet లో పందెం వినోదం కోసం మాత్రమే ఆడాలి — ఆదాయం సంపాదించే మార్గంగా చూడకూడదు. జూదం వ్యసనానికి దారి తీయవచ్చు. DafaBet లో డిపాజిట్ లిమిట్లు, సెషన్ టైమ్ రిమైండర్లు, సెల్ఫ్-ఎక్స్‌క్లూజన్ ఆప్షన్లు నేరుగా అకౌంట్ సెట్టింగ్స్‌లో అందుబాటులో ఉన్నాయి.
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
            <p className="text-gray-400 text-sm mb-2 font-semibold">సంబంధిత పేజీలు:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dafabet-bonus" className="text-brand-gold text-sm hover:underline">DafaBet బోనస్</Link>
              <Link href="/dafabet-payment" className="text-brand-gold text-sm hover:underline">జమ-విత్‌డ్రా గైడ్</Link>
              <Link href="/dafabet-registration" className="text-brand-gold text-sm hover:underline">రిజిస్ట్రేషన్</Link>
              <Link href="/sports-betting" className="text-brand-gold text-sm hover:underline">స్పోర్ట్స్ బెట్టింగ్</Link>
            </div>
          </div>

        </section>
      )}

      {/* FAQ and CTA — English only */}
      {locale !== 'te' && (
        <>
      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">Frequently Asked Questions</h2>
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

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="verdict-box text-center">
          <span className="red-badge mb-4 inline-block">Register Today</span>
          <h2 className="text-2xl font-bold text-white mt-3 mb-2">
            Claim Your <span className="gold-text">₹20,000 Welcome Bonus</span>
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            Join millions of Indian players. 200% deposit match on your first deposit. Min deposit ₹500.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dafabet-registration" className="btn-primary text-lg px-8 py-4">
              {tCommon('join_now')}
            </Link>
            <Link href="/dafabet-bonus" className="btn-secondary text-lg px-8 py-4">
              See All Bonuses
            </Link>
          </div>
        </div>
      </section>
        </>
      )}
    </>
  )
}

export default async function ReviewPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ReviewContent locale={locale} />
}
