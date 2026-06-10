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

function ReviewContent({ locale }: { locale: string }) {
  const t = useTranslations('review')
  const tCommon = useTranslations('common')

  const pageUrl = locale === 'te' ? `${SITE_URL}/te/dafabet-review/` : `${SITE_URL}/dafabet-review/`

  const faqs = [
    { question: 'Is DafaBet safe and legit in India?', answer: 'Yes. DafaBet operates under a valid Curaçao eGaming licence and has been serving Indian players since 2004. Funds are kept in segregated accounts.' },
    { question: 'What rating does DafaBet get?', answer: 'DafaWin rates DafaBet India 4.5/5, with particular strengths in cricket odds, UPI payment speed, and welcome bonuses.' },
    { question: 'Does DafaBet accept UPI payments?', answer: 'Yes. DafaBet India supports UPI, PhonePe, Paytm, Google Pay, and Net Banking with instant deposits.' },
    { question: 'What is the welcome bonus at DafaBet India?', answer: 'New players can claim a 100% deposit match bonus up to ₹10,000 on their first deposit.' },
    { question: 'How do I contact DafaBet customer support in India?', answer: 'DafaBet offers 24/7 live chat and email support in English and Hindi. Response time is typically under 5 minutes.' },
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
          <span className="gold-badge mb-4">Expert Review 2025</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gold-text">{t('hero_title')}</span>
          </h1>
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
                'Excellent cricket betting markets',
                'Instant UPI deposits and withdrawals',
                'Competitive odds across all sports',
                '100% welcome bonus up to ₹20,000',
                '24/7 Hindi &amp; English support',
                'Trusted since 2004',
              ].map((pro) => (
                <li key={pro} className="flex items-start gap-3 text-gray-300 text-sm">
                  <span className="text-brand-gold font-bold mt-0.5 shrink-0">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: pro }} />
                </li>
              ))}
            </ul>
          </div>
          <div className="card border-brand-border">
            <h3 className="text-white font-bold text-lg mb-4">Cons</h3>
            <ul className="space-y-3">
              {[
                'No dedicated casino app (browser only)',
                'Bonus wagering requirements apply',
                'Limited e-wallet options',
                'Verification can take up to 48 hours',
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
