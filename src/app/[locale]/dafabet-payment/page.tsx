import type { Metadata } from 'next'
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

function DepositWithdrawalContent() {
  const t = useTranslations('deposit')

  return (
    <>
      <section className="bg-dark-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6">💳</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gold-text">{t('hero_title')}</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">{t('hero_subtitle')}</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Deposit Methods</h2>
            <div className="space-y-4">
              {[
                { method: 'UPI', time: 'Instant', min: '₹100', max: '₹100,000' },
                { method: 'Paytm', time: 'Instant', min: '₹100', max: '₹50,000' },
                { method: 'PhonePe', time: 'Instant', min: '₹100', max: '₹50,000' },
                { method: 'NetBanking', time: '1-3 mins', min: '₹500', max: '₹500,000' },
                { method: 'IMPS', time: 'Instant', min: '₹100', max: '₹200,000' },
              ].map((m) => (
                <div key={m.method} className="card flex justify-between items-center">
                  <span className="font-semibold text-white">{m.method}</span>
                  <div className="text-right text-sm text-gray-400">
                    <div>{m.time}</div>
                    <div>{m.min} – {m.max}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Withdrawal Methods</h2>
            <div className="space-y-4">
              {[
                { method: 'UPI', time: '1-4 hours', min: '₹500', max: '₹100,000' },
                { method: 'Bank Transfer', time: '1-3 days', min: '₹1,000', max: '₹500,000' },
                { method: 'Paytm Wallet', time: '1-4 hours', min: '₹500', max: '₹25,000' },
              ].map((m) => (
                <div key={m.method} className="card flex justify-between items-center">
                  <span className="font-semibold text-white">{m.method}</span>
                  <div className="text-right text-sm text-gray-400">
                    <div>{m.time}</div>
                    <div>{m.min} – {m.max}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default async function DepositWithdrawalPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <DepositWithdrawalContent />
}
