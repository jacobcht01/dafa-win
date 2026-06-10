import type { Metadata } from 'next'
import Image from 'next/image'
import { JsonLd } from '@/components/JsonLd'
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'deposit' })
  const alts = pageAlternates(locale, '/dafabet-payment/')
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: alts.canonical, languages: alts.languages },
  }
}

const DEPOSIT_METHODS = [
  { method: 'UPI', icon: '📱', time: 'Instant', min: '₹100', max: '₹100,000' },
  { method: 'Paytm', icon: '💳', time: 'Instant', min: '₹100', max: '₹50,000' },
  { method: 'PhonePe', icon: '📲', time: 'Instant', min: '₹100', max: '₹50,000' },
  { method: 'NetBanking', icon: '🏦', time: '1-3 mins', min: '₹500', max: '₹500,000' },
  { method: 'IMPS', icon: '⚡', time: 'Instant', min: '₹100', max: '₹200,000' },
]

const WITHDRAWAL_METHODS = [
  { method: 'UPI', icon: '📱', time: '1-4 hours', min: '₹500', max: '₹100,000' },
  { method: 'Bank Transfer', icon: '🏛', time: '1-3 days', min: '₹1,000', max: '₹500,000' },
  { method: 'Paytm Wallet', icon: '💳', time: '1-4 hours', min: '₹500', max: '₹25,000' },
]

function DepositWithdrawalContent({ locale }: { locale: string }) {
  const t = useTranslations('deposit')

  const pageUrl = locale === 'te' ? `${SITE_URL}/te/dafabet-payment/` : `${SITE_URL}/dafabet-payment/`

  const faqs = [
    { question: 'What is the minimum deposit at DafaBet?', answer: 'Minimum deposit is ₹100 for UPI, Paytm, and PhonePe. NetBanking minimum is ₹500.' },
    { question: 'How long do withdrawals take?', answer: 'UPI and Paytm withdrawals are processed in 1-4 hours. Bank transfers take 1-3 business days.' },
    { question: 'Is my payment information secure?', answer: 'Yes. All transactions use SSL encryption. DafaBet does not store card details.' },
  ]

  const schemaData = [
    articleSchema({
      headline: t('title'),
      description: t('description'),
      url: pageUrl,
      datePublished: '2025-01-01',
      dateModified: new Date().toISOString().split('T')[0],
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL + '/' },
      { name: 'Payment Methods', url: pageUrl },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Hero with image */}
      <section className="relative h-[320px] md:h-[380px] flex items-center overflow-hidden">
        <Image
          src="/images/payment.webp"
          alt="DafaBet Payment Methods"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gold-text">{t('hero_title')}</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xl">{t('hero_subtitle')}</p>
        </div>
      </section>

      {/* Payment tables */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Deposits */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Deposit Methods</h2>
              <span className="red-badge">Instant Deposits</span>
            </div>
            <div className="space-y-4">
              {DEPOSIT_METHODS.map((m) => (
                <div key={m.method} className="card flex justify-between items-center">
                  <span className="font-semibold text-brand-gold">{m.icon} {m.method}</span>
                  <div className="text-right text-sm text-gray-400">
                    <div>{m.time}</div>
                    <div>{m.min} – {m.max}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Withdrawals */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Withdrawal Methods</h2>
              <span className="gold-badge">Fast Withdrawals</span>
            </div>
            <div className="space-y-4">
              {WITHDRAWAL_METHODS.map((m) => (
                <div key={m.method} className="card flex justify-between items-center">
                  <span className="font-semibold text-brand-gold">{m.icon} {m.method}</span>
                  <div className="text-right text-sm text-gray-400">
                    <div>{m.time}</div>
                    <div>{m.min} – {m.max}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-xs text-center mt-6">All transactions are encrypted and secure. Processing times may vary.</p>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="section-title mb-8">Payment FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="card">
              <summary className="flex justify-between items-start cursor-pointer list-none py-1">
                <span className="font-semibold text-white">{faq.question}</span>
                <span className="text-brand-gold text-xl flex-shrink-0 ml-4">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}

export default async function DepositWithdrawalPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <DepositWithdrawalContent locale={locale} />
}
