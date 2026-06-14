import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { JsonLd } from '@/components/JsonLd'
import { reviewSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'
import Image from 'next/image'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'review' })
  const alts = pageAlternates(locale, '/dafabet-review/')
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: alts.canonical, languages: alts.languages },
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
  ]

  const schemaData = [
    reviewSchema({
      name: t('title'),
      description: t('description'),
      url: pageUrl,
      ratingValue: 4.5,
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
            { label: 'Sports Coverage', score: '9/10', desc: 'Cricket, football, kabaddi, tennis, and 20+ sports covered with deep markets.' },
            { label: 'Odds Quality', score: '8.5/10', desc: 'Competitive margins especially on cricket and international football.' },
            { label: 'Bonuses & Promos', score: '9/10', desc: 'Generous welcome bonus plus regular reload and cashback offers.' },
            { label: 'Payments', score: '9.5/10', desc: 'UPI, PhonePe, Paytm, NetBanking — all with instant deposits and fast withdrawals.' },
            { label: 'Mobile App', score: '8/10', desc: 'Clean, fast Android and iOS apps with full feature parity.' },
            { label: 'Customer Support', score: '8/10', desc: '24/7 live chat and email support in English and Hindi.' },
          ].map((item) => (
            <div key={item.label} className="card flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-brand-gold">{item.label}</h3>
                <span className="gold-text font-bold text-lg">{item.score}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
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
            <p className="text-gray-300 leading-relaxed mb-6">
              New Indian players get a 100% deposit match bonus up to ₹20,000 on their first deposit. Minimum deposit is ₹500 via UPI. Wagering requirement is 8x the bonus amount within 30 days. This is one of the most generous welcome offers available in India.
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
              Low 8x wagering and a high ₹20,000 cap make this one of the best-value welcome offers for Indian players in 2025.
            </p>
          </div>
        </div>
      </section>

      {/* Cricket & Sports Coverage */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">Cricket Betting at Dafabet India</h2>
        <p className="text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto text-center">
          Dafabet offers one of the deepest cricket betting libraries in Asia. Indian players get access to live IPL betting, international T20s, Test matches, the Asia Cup, and ICC events — all with competitive odds and same-game multi-bet options.
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
        <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto text-center">
          The live betting interface updates in under 2 seconds, making it ideal for in-play cricket wagers during IPL matches.
        </p>
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
      </section>

      {/* Mobile App Review */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">Dafabet Mobile App — Android &amp; iOS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-gray-300 leading-relaxed mb-6">
              The Dafabet Android APK is available as a direct download (not on Google Play Store due to India regulations). The iOS app is available on the App Store. Both apps are optimized for Indian networks including 4G and offer full betting and casino access.
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

      {/* Our Verdict */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">Is Dafabet Safe and Legit in India?</h2>
        <div className="verdict-box border-l-4 border-brand-gold">
          <p className="text-gray-300 leading-relaxed mb-6">
            Yes — Dafabet is safe and legit for Indian players. Licensed under Curaçao eGaming (licence 1668/JAZ), operating since 2004, with 20+ years of uninterrupted service. Funds are held in segregated accounts.
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
            Join millions of Indian players. 100% deposit match on your first deposit. Min deposit ₹500.
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
  )
}

export default async function ReviewPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ReviewContent locale={locale} />
}
