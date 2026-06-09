import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getPageData, extractFaqs } from '@/lib/content'
import { breadcrumb, faqPage } from '@/lib/structured-data'
import JsonLd from '@/components/JsonLd'
import MarkdownBody from '@/components/MarkdownBody'
import FaqAccordion from '@/components/FaqAccordion'
import BonusBanner from '@/components/BonusBanner'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const page = getPageData(locale, 'dafabet-payment')
  return {
    title: page?.title ?? 'DafaBet India Payment Methods',
    description: page?.description ?? '',
    keywords: page?.keywords,
    alternates: { canonical: `/${locale}/deposit-withdrawal/` },
  }
}

export default async function DepositWithdrawalPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const page = getPageData(locale, 'dafabet-payment')
  const faqs = page ? extractFaqs(page.body) : []
  const schemas = [
    breadcrumb(locale, 'deposit-withdrawal', locale === 'te' ? 'డిపాజిట్ & విత్‌డ్రాయల్' : 'Deposit & Withdrawal'),
    ...(faqs.length ? [faqPage(faqs)] : []),
  ]
  const isTE = locale === 'te'

  const methods = isTE ? [
    { icon: '📱', name: 'UPI', deposit: 'తక్షణం', withdrawal: '1-2 రోజులు', min: '₹500' },
    { icon: '💳', name: 'Paytm', deposit: 'తక్షణం', withdrawal: '1-2 రోజులు', min: '₹500' },
    { icon: '📲', name: 'PhonePe', deposit: 'తక్షణం', withdrawal: '1-2 రోజులు', min: '₹500' },
    { icon: '🏦', name: 'Net Banking', deposit: '1-3 గంటలు', withdrawal: '2-3 రోజులు', min: '₹1,000' },
  ] : [
    { icon: '📱', name: 'UPI', deposit: 'Instant', withdrawal: '1-2 days', min: '₹500' },
    { icon: '💳', name: 'Paytm', deposit: 'Instant', withdrawal: '1-2 days', min: '₹500' },
    { icon: '📲', name: 'PhonePe', deposit: 'Instant', withdrawal: '1-2 days', min: '₹500' },
    { icon: '🏦', name: 'Net Banking', deposit: '1-3 hours', withdrawal: '2-3 days', min: '₹1,000' },
  ]

  return (
    <>
      <JsonLd schemas={schemas} />

      <section className="bg-dark-gradient py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">💳</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gold-text">
              {isTE ? 'డిపాజిట్ & విత్‌డ్రాయల్ గైడ్' : 'Deposit & Withdrawal Guide'}
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {isTE
              ? 'UPI, PhonePe, Paytm — తక్షణ డిపాజిట్లు, 1-2 రోజుల్లో విత్‌డ్రాయల్'
              : 'UPI, PhonePe, Paytm — instant deposits, withdrawals in 1-2 days. Minimum ₹500.'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Payment methods table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            {isTE ? 'పేమెంట్ మెథడ్స్' : 'Payment Methods'}
          </h2>
          <div className="overflow-x-auto rounded-xl border border-brand-border">
            <table className="w-full text-sm">
              <thead className="bg-brand-card">
                <tr>
                  <th className="px-4 py-3 text-left text-gold-400 font-bold">{isTE ? 'మెథడ్' : 'Method'}</th>
                  <th className="px-4 py-3 text-left text-gold-400 font-bold">{isTE ? 'డిపాజిట్ వేగం' : 'Deposit Speed'}</th>
                  <th className="px-4 py-3 text-left text-gold-400 font-bold">{isTE ? 'విత్‌డ్రాయల్ వేగం' : 'Withdrawal Speed'}</th>
                  <th className="px-4 py-3 text-left text-gold-400 font-bold">{isTE ? 'కనీస మొత్తం' : 'Min Amount'}</th>
                </tr>
              </thead>
              <tbody>
                {methods.map((m) => (
                  <tr key={m.name} className="even:bg-brand-card/30 hover:bg-brand-card/60 transition-colors border-t border-brand-border/50">
                    <td className="px-4 py-3 font-semibold text-white">
                      {m.icon} {m.name}
                    </td>
                    <td className="px-4 py-3 text-green-400">{m.deposit}</td>
                    <td className="px-4 py-3 text-gray-300">{m.withdrawal}</td>
                    <td className="px-4 py-3 text-gray-300">{m.min}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            {page && <MarkdownBody content={page.body} />}
          </article>
          <aside className="space-y-6">
            <BonusBanner locale={locale} />
          </aside>
        </div>

        {faqs.length > 0 && (
          <div className="mt-16 max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {isTE ? 'పేమెంట్ FAQ' : 'Payment FAQ'}
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        )}
      </section>
    </>
  )
}
