import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'bonuses' })
  const alts = pageAlternates(locale, '/dafabet-bonus/')
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: alts.canonical, languages: alts.languages },
  }
}

function BonusesContent() {
  const t = useTranslations('bonuses')
  const tCommon = useTranslations('common')

  const pageUrl = `${SITE_URL}/dafabet-bonus/`

  const faqs = [
    { question: 'What is the DafaBet welcome bonus?', answer: '200% match up to ₹20,000 on your first deposit, with a minimum qualifying deposit of ₹500. Deposit ₹500 and get ₹1,000 bonus; deposit ₹10,000 and get the full ₹20,000 bonus.' },
    { question: 'Is there a bonus code?', answer: 'The offer activates automatically — no separate code needed for the headline offer. Simply register, deposit a minimum of ₹500, and the 200% bonus credits to your account.' },
    { question: 'What is the wagering requirement?', answer: 'Check DafaBet\'s bonus T&Cs — we walk through the requirement on this page. The key figures to know: qualifying bets must be placed at odds of 1.50 or higher, and the wagering clock starts from the date the bonus is credited.' },
    { question: 'How do I claim the bonus?', answer: 'Register via DafaWin\'s link, deposit a minimum of ₹500, and the bonus credits automatically. No code needed. The full balance — your deposit plus the bonus — appears in your account within minutes.' },
    { question: 'Can I use the bonus on cricket betting?', answer: 'Yes — sports betting is an eligible category for the welcome bonus. Cricket bets at odds of 1.50 or above count toward clearing the wagering requirement, making it the natural fit for Indian players.' },
  ]

  const schemaData = [
    articleSchema({
      headline: 'DafaBet India Welcome Bonus 2026 — 200% up to ₹20,000',
      description: 'Complete guide to the DafaBet 200% welcome bonus available in India — full T&Cs, how to claim, and current promotions.',
      url: pageUrl,
      datePublished: '2025-01-01',
      dateModified: '2026-06-13',
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL + '/' },
      { name: 'Dafabet Bonuses', url: pageUrl },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Hero */}
      <section className="relative h-[350px] md:h-[420px] overflow-hidden">
        <Image
          src="/images/bonuses.webp"
          alt="Dafabet Bonuses India 2025"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <span className="red-badge mb-4">Exclusive Bonuses</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gold-text">DafaBet India Welcome Bonus 2026</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-xl mx-auto">200% match up to ₹20,000 on first deposit — minimum ₹500. Full T&amp;Cs explained.</p>
          <Link href="/dafabet-registration" className="btn-primary text-lg px-8 py-4">
            Claim Bonus Now
          </Link>
        </div>
      </section>

      {/* Main Bonus Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="section-title text-center mb-10">Current Dafabet Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Welcome Bonus */}
          <div className="card-hover overflow-hidden flex flex-col">
            <div className="-mx-6 -mt-6 mb-4 h-48 relative overflow-hidden">
              <Image
                src="/images/first-deposit-bonus.webp"
                alt="100% Welcome Bonus"
                fill
                className="object-cover object-center"
              />
            </div>
            <span className="gold-badge mb-3 self-start">NEW</span>
            <h3 className="text-xl font-bold text-white mb-2">200% Welcome Bonus</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
              200% deposit match up to ₹20,000 on your first deposit. Min deposit ₹500.
            </p>
            <Link href="/dafabet-registration" className="btn-primary w-full">
              {tCommon('claim_bonus')}
            </Link>
          </div>

          {/* Weekly Cashback */}
          <div className="card-hover overflow-hidden flex flex-col">
            <div className="-mx-6 -mt-6 mb-4 h-48 relative overflow-hidden">
              <Image
                src="/images/cashback-banner.webp"
                alt="10% Weekly Cashback"
                fill
                className="object-cover object-center"
              />
            </div>
            <span className="red-badge mb-3 self-start">HOT</span>
            <h3 className="text-xl font-bold text-white mb-2">10% Weekly Cashback</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
              Get 10% back on net losses every week — automatically credited every Monday.
            </p>
            <Link href="/dafabet-registration" className="btn-primary w-full">
              {tCommon('claim_bonus')}
            </Link>
          </div>

          {/* Free Spins */}
          <div className="card-hover overflow-hidden flex flex-col">
            <div className="-mx-6 -mt-6 mb-4 h-48 relative overflow-hidden">
              <Image
                src="/images/daily-free-spins.webp"
                alt="20 Free Spins Daily"
                fill
                className="object-cover object-center"
              />
            </div>
            <span className="red-badge mb-3 self-start">DAILY</span>
            <h3 className="text-xl font-bold text-white mb-2">20 Free Spins Daily</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
              Spin and win on selected slot games. No wagering on free spin winnings.
            </p>
            <Link href="/dafabet-registration" className="btn-primary w-full">
              {tCommon('claim_bonus')}
            </Link>
          </div>
        </div>
      </section>

      {/* Bonus Terms Table */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <h2 className="section-title text-center mb-8">Bonus Terms at a Glance</h2>
        <div className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-border">
                <th className="text-left text-white font-semibold px-6 py-4 w-1/3">Condition</th>
                <th className="text-left text-white font-semibold px-6 py-4">Welcome Bonus</th>
                <th className="text-left text-white font-semibold px-6 py-4">Cashback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {[
                { label: 'Min Deposit', welcome: '₹500', cashback: 'N/A' },
                { label: 'Wagering', welcome: '5x deposit + bonus', cashback: 'No wagering' },
                { label: 'Max Bonus', welcome: '₹20,000', cashback: '10% of net losses' },
                { label: 'Time Limit', welcome: '30 days', cashback: 'Weekly (Mon reset)' },
              ].map((row) => (
                <tr key={row.label} className="hover:bg-brand-card transition-colors">
                  <td className="px-6 py-4 text-brand-gold font-medium">{row.label}</td>
                  <td className="px-6 py-4 text-gray-400">{row.welcome}</td>
                  <td className="px-6 py-4 text-gray-400">{row.cashback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Welcome Bonus Details Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <h2 className="section-title text-center mb-8">Welcome Bonus — Key Details</h2>
        <div className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-card">
                <th className="text-left text-brand-gold font-semibold px-6 py-4 w-1/2">Term</th>
                <th className="text-left text-white font-semibold px-6 py-4">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {[
                { term: 'Bonus', detail: '200% match on first deposit' },
                { term: 'Max Bonus', detail: '₹20,000' },
                { term: 'Min Deposit', detail: '₹500' },
                { term: 'Max Deposit Matched', detail: '₹10,000' },
                { term: 'Wagering', detail: 'Check DafaBet T&Cs' },
                { term: 'Eligible', detail: 'Sports and casino' },
              ].map((row) => (
                <tr key={row.term} className="hover:bg-brand-card transition-colors">
                  <td className="px-6 py-4 text-brand-gold font-medium">{row.term}</td>
                  <td className="px-6 py-4 text-gray-300">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Welcome Bonus Full Details */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <h2 className="section-title text-center mb-10">Dafabet India Welcome Bonus — Full Terms &amp; How to Claim</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: step-by-step */}
          <div>
            <p className="text-gray-300 mb-6">Follow these steps to claim your ₹20,000 welcome bonus at Dafabet India:</p>
            <ol className="space-y-4">
              {[
                'Register your account — takes under 2 minutes',
                'Make your first deposit — minimum ₹500 via UPI or Paytm',
                'Bonus is credited automatically within 24 hours',
                'Wager 8x the bonus amount within 30 days',
                'Withdraw your winnings — no limit once wagering is complete',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="bg-gold-gradient rounded-full w-7 h-7 flex items-center justify-center text-black font-bold text-xs flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-gray-300 text-sm leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          {/* Right: key facts */}
          <div className="verdict-box">
            <h3 className="text-white font-bold text-base mb-4">Key Bonus Terms</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Min Deposit', value: '₹500' },
                { label: 'Wagering', value: '8x' },
                { label: 'Time Limit', value: '30 days' },
                { label: 'Max Bonus', value: '₹20,000' },
                { label: 'Min Odds', value: '1.50' },
                { label: 'Eligible', value: 'New players' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-brand-gold font-bold text-sm">{value}</p>
                  <p className="text-gray-500 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Current Promotions Table */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <h2 className="section-title text-center mb-10">All Dafabet India Promotions 2025</h2>
        <div className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-card">
                {['Promotion', 'Bonus Amount', 'Wagering', 'Who', 'Valid'].map((col) => (
                  <th key={col} className="text-left text-brand-gold text-xs uppercase px-4 py-3 font-semibold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { promo: 'Welcome Bonus', amount: '200% up to ₹20,000', wagering: 'Check T&Cs', who: 'New players', valid: 'Ongoing' },
                { promo: 'Weekly Cashback', amount: '10% on losses', wagering: 'None', who: 'All players', valid: 'Every Monday' },
                { promo: 'Daily Free Spins', amount: 'Up to 20 spins', wagering: 'None', who: 'Registered', valid: 'Daily' },
                { promo: 'Reload Bonus', amount: '50% up to ₹5,000', wagering: '5x', who: 'Existing', valid: 'Monthly' },
                { promo: 'Referral Bonus', amount: '₹500 per referral', wagering: 'None', who: 'All', valid: 'Ongoing' },
                { promo: 'VIP Loyalty', amount: 'Up to 0.5% cashback', wagering: 'None', who: 'VIP tier', valid: 'Ongoing' },
              ].map((row, i) => (
                <tr key={row.promo} className={i % 2 === 0 ? 'bg-transparent' : 'bg-brand-card/30'}>
                  <td className="px-4 py-3 text-gray-300 font-medium">{row.promo}</td>
                  <td className="px-4 py-3 text-gray-300">{row.amount}</td>
                  <td className="px-4 py-3 text-gray-300">{row.wagering}</td>
                  <td className="px-4 py-3 text-gray-300">{row.who}</td>
                  <td className="px-4 py-3 text-gray-300">{row.valid}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-gray-500 text-xs mt-0 px-4 pb-4">Bonus terms subject to change. Always check Dafabet&apos;s promotions page for current offers.</p>
        </div>
      </section>

      {/* Wagering Requirements Explained */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <h2 className="section-title text-center mb-10">How Dafabet Wagering Requirements Work</h2>
        <div className="verdict-box border-l-4 border-brand-gold mb-8">
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            Wagering requirements (also called rollover) are the number of times you must bet the bonus amount before you can withdraw. Dafabet&apos;s 8x wagering is among the lowest in India.
          </p>
          <p className="text-brand-gold text-sm font-medium">
            Example: You deposit ₹2,500 and receive ₹2,500 bonus. To withdraw, you must wager ₹2,500 × 8 = ₹20,000 total.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            'Cricket bets contribute 100% to wagering',
            'Casino slots contribute 100%',
            'Live casino contributes 10%',
          ].map((tip) => (
            <div key={tip} className="card flex items-start gap-3">
              <span className="text-brand-gold text-lg font-bold flex-shrink-0">✓</span>
              <span className="text-gray-300 text-sm leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bonus Strategy Guide */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <h2 className="section-title text-center mb-10">How to Maximise Your Dafabet Bonus</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Deposit the Maximum 💰',
              body: 'To get the full ₹20,000, deposit ₹20,000. Smaller deposits get proportionally smaller bonuses.',
            },
            {
              title: 'Bet on Cricket 🏏',
              body: 'Cricket bets count 100% toward wagering. Stick to low-risk markets like match winner to clear the bonus safely.',
            },
            {
              title: 'Check Minimum Odds ⚡',
              body: 'Only bets at odds of 1.50 or above count toward wagering. Avoid odds below 1.50.',
            },
            {
              title: 'Plan Your Timeline 📅',
              body: 'You have 30 days to complete wagering. Break it into daily targets — e.g., ₹667 per day for a ₹20,000 bonus.',
            },
          ].map(({ title, body }) => (
            <div key={title} className="card-hover">
              <h3 className="text-white font-bold text-base mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="relative rounded-xl overflow-hidden h-56 md:h-64">
          <Image
            src="/images/promo-767-2.jpg"
            alt="Limited time Dafabet promotion"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <span className="red-badge mb-3">Limited Time</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="gold-text">Up to ₹20,000</span> Welcome Bonus
            </h2>
            <p className="text-gray-300 text-sm mb-6 max-w-md">
              Register now and double your first deposit. Offer valid for new Indian players only.
            </p>
            <Link href="/dafabet-registration" className="btn-primary text-lg px-8 py-4">
              Claim Bonus Now
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="section-title text-center mb-8">Bonus FAQ</h2>
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
    </>
  )
}

export default async function BonusesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <BonusesContent />
}
