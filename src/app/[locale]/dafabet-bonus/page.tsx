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
    { question: 'How do I claim the Dafabet welcome bonus?', answer: 'Register a new account, make your first deposit of at least ₹500 via UPI or Net Banking, and the 100% match bonus up to ₹20,000 is credited automatically to your account within minutes.' },
    { question: 'What is the wagering requirement on the welcome bonus?', answer: 'The welcome bonus carries a 5x wagering requirement on the combined deposit and bonus amount. Wagers on sports with odds of 1.50 or higher count toward the requirement.' },
    { question: 'Is the 10% weekly cashback automatic?', answer: 'Yes. Net losses from Monday to Sunday are calculated, and 10% cashback is automatically credited to your account every Monday morning with no minimum wagering requirement.' },
    { question: 'Can I use free spins on any slot game?', answer: 'Free spins are valid on selected slot games that rotate weekly. Check the Promotions page for the current eligible titles. Winnings from free spins are credited as bonus funds.' },
    { question: 'Are Dafabet bonuses available to Telugu players?', answer: 'All bonuses and promotions are available to players across India, including Telugu-speaking players in Andhra Pradesh and Telangana.' },
  ]

  const schemaData = [
    articleSchema({
      headline: 'Dafabet Bonuses India 2025',
      description: 'Complete guide to Dafabet bonuses available in India — welcome bonus, cashback, and free spins.',
      url: pageUrl,
      datePublished: '2025-01-01',
      dateModified: '2025-06-10',
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
            <span className="gold-text">{t('hero_title')}</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-xl mx-auto">{t('hero_subtitle')}</p>
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
            <h3 className="text-xl font-bold text-white mb-2">100% Welcome Bonus</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
              100% deposit match up to ₹20,000 on your first deposit. Min deposit ₹500.
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
