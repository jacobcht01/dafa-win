import type { Metadata } from 'next'
import Image from 'next/image'
import { JsonLd } from '@/components/JsonLd'
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

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

const DEPOSIT_TABLE = [
  { method: 'UPI (PhonePe, GPay, Paytm, BHIM)', min: '₹500', time: 'Seconds', fee: 'None' },
  { method: 'Paytm Wallet', min: '₹500', time: 'Seconds', fee: 'None' },
  { method: 'Net Banking / NEFT', min: '₹500', time: 'Same day (banking hours)', fee: 'None' },
  { method: 'IMPS', min: '₹500', time: 'Minutes', fee: 'None' },
  { method: 'Crypto (USDT, BTC)', min: '~₹10,000 equiv', time: 'Minutes–1 hour', fee: 'Network fee' },
]

const WITHDRAWAL_TABLE = [
  { method: 'UPI', min: '₹500', time: '~1 hour' },
  { method: 'NEFT', min: '₹500', time: '~4 hours' },
  { method: 'IMPS', min: '₹500', time: 'Within 24 hours' },
  { method: 'Crypto', min: '~₹10,000 equiv', time: 'Minutes once approved' },
]

const KYC_DOCS = [
  'PAN card — clear photo of the front',
  'Aadhaar — front and back, or e-Aadhaar PDF (preferred)',
  'Proof of address — only if Aadhaar address does not match registration address',
  'Selfie holding PAN — required for some account profiles',
]

function DepositWithdrawalContent({ locale }: { locale: string }) {
  const t = useTranslations('deposit')

  const pageUrl = locale === 'te' ? `${SITE_URL}/te/dafabet-payment/` : `${SITE_URL}/dafabet-payment/`

  const faqs = [
    { question: 'What is the minimum deposit at DafaBet?', answer: '₹500 via UPI, Paytm, PhonePe, Google Pay, or net banking.' },
    { question: 'How long do UPI withdrawals take?', answer: 'Typically ~1 hour on recent desk runs; the published window is within 24 hours.' },
    { question: 'What KYC documents does DafaBet require?', answer: 'PAN card and Aadhaar cover most Indian accounts. Some profiles also require a selfie holding the PAN.' },
    { question: 'Does DafaBet support Google Pay?', answer: 'Yes, GPay routes through UPI in the cashier. Select UPI and your GPay-linked UPI ID works directly.' },
    { question: 'What happens if my withdrawal is delayed?', answer: 'Check cashier status. If "Pending" past 24 hours, contact live chat with your reference number and the agent can escalate.' },
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
            <span className="gold-text">DafaBet India Payment Methods 2026</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xl">
            UPI (PhonePe, GPay, Paytm, BHIM), NEFT, IMPS — deposits in seconds, withdrawals in ~1 hour. Min deposit ₹500.
          </p>
        </div>
      </section>

      {/* Deposits at a glance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-white">Deposits at a Glance</h2>
          <span className="red-badge">Instant Deposits</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-brand-border">
                <th className="py-3 pr-4 text-brand-gold font-semibold">Method</th>
                <th className="py-3 pr-4 text-brand-gold font-semibold">Min Deposit</th>
                <th className="py-3 pr-4 text-brand-gold font-semibold">Time to Credit</th>
                <th className="py-3 text-brand-gold font-semibold">Fee</th>
              </tr>
            </thead>
            <tbody>
              {DEPOSIT_TABLE.map((row) => (
                <tr key={row.method} className="border-b border-brand-border/50">
                  <td className="py-3 pr-4 text-white font-medium">{row.method}</td>
                  <td className="py-3 pr-4 text-gray-300">{row.min}</td>
                  <td className="py-3 pr-4 text-gray-300">{row.time}</td>
                  <td className="py-3 text-gray-300">{row.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-500 text-xs mt-4">Minimum deposit on every rail: ₹500. All transactions are encrypted and secure.</p>
      </section>

      {/* Withdrawals at a glance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-white">Withdrawals at a Glance</h2>
          <span className="gold-badge">Fast Withdrawals</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-brand-border">
                <th className="py-3 pr-4 text-brand-gold font-semibold">Method</th>
                <th className="py-3 pr-4 text-brand-gold font-semibold">Min Withdrawal</th>
                <th className="py-3 text-brand-gold font-semibold">Typical Settle</th>
              </tr>
            </thead>
            <tbody>
              {WITHDRAWAL_TABLE.map((row) => (
                <tr key={row.method} className="border-b border-brand-border/50">
                  <td className="py-3 pr-4 text-white font-medium">{row.method}</td>
                  <td className="py-3 pr-4 text-gray-300">{row.min}</td>
                  <td className="py-3 text-gray-300">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-500 text-xs mt-4">Published window for all methods: within 24 hours. Typical UPI settle is ~1 hour based on June 2026 desk runs.</p>
      </section>

      {/* KYC Requirements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="section-title mb-6">KYC Requirements</h2>
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">When KYC Is Required</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex gap-2">
                  <span className="text-brand-gold flex-shrink-0">&#10003;</span>
                  First withdrawals up to ₹25,000 release without KYC
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-gold flex-shrink-0">&#10003;</span>
                  KYC required before any withdrawal above ₹25,000
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-gold flex-shrink-0">&#10003;</span>
                  DafaBet published KYC approval window: within 24 hours
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Required Documents</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                {KYC_DOCS.map((doc) => (
                  <li key={doc} className="flex gap-2">
                    <span className="text-brand-gold flex-shrink-0">&#10003;</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-5">Tip: Submit KYC the same day you register so it clears before your first withdrawal request.</p>
        </div>
      </section>

      {locale === 'te' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="section-title mb-6">జమ-విత్‌డ్రా తెలుగు గైడ్</h2>

          {/* UPI guide */}
          <div className="card mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">UPI ద్వారా జమ — PhonePe, Google Pay, Paytm</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              DafaWin కాషియర్‌లో UPI ఎంచుకోండి, మీ యాప్ (PhonePe/GPay/Paytm) ఎంచుకోండి, కనీసం రూ.500 ఎంటర్ చేయండి. UPI collect request వస్తుంది — మీ యాప్‌లో accept చేయండి. జమ సెకన్లలో పడుతుంది.
            </p>
          </div>

          {/* Withdrawal guide */}
          <div className="card mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">విత్‌డ్రా — ఎంత సేపు పడుతుంది?</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex gap-2"><span className="text-brand-gold flex-shrink-0">&#10003;</span><span><strong className="text-white">UPI:</strong> ప్రకటిత గడువు 24 గంటలు. మా టెస్ట్ — ~1 గంట (₹5,000 PhonePe, జూన్ 2026).</span></li>
              <li className="flex gap-2"><span className="text-brand-gold flex-shrink-0">&#10003;</span><span><strong className="text-white">NEFT:</strong> ప్రకటిత గడువు 24 గంటలు. మా టెస్ట్ — ~4 గంటలు (₹10 లక్ష, జూన్ 2026).</span></li>
              <li className="flex gap-2"><span className="text-brand-gold flex-shrink-0">&#10003;</span><span>₹50,000 పైన విత్‌డ్రా NEFT కి రూట్ అవుతుంది.</span></li>
              <li className="flex gap-2"><span className="text-brand-gold flex-shrink-0">&#10003;</span><span>KYC పెండింగ్‌లో ఉంటే — విత్‌డ్రా ఆగుతుంది. రిజిస్ట్రేషన్ రోజే KYC సబ్మిట్ చేయండి.</span></li>
            </ul>
          </div>

          {/* UPI failure tip */}
          <div className="card mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">UPI ఫెయిల్ అయితే?</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              మీ బ్యాంక్ గేమింగ్ ట్రాన్సాక్షన్ బ్లాక్ చేయవచ్చు. రెండవ UPI హ్యాండిల్ (వేరే బ్యాంక్) లేదా NEFT వాడండి. DafaWin లైవ్ చాట్‌లో &quot;UPI deposit rejected at bank end&quot; అని చెప్పండి — 2 నిమిషాల్లో అల్టర్నేట్ రూట్ ఇస్తారు.
            </p>
          </div>

          {/* Quick links */}
          <div className="card bg-brand-surface">
            <p className="text-gray-400 text-sm mb-3 font-semibold">సంబంధిత పేజీలు:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dafabet-registration" className="text-brand-gold hover:underline text-sm">రిజిస్ట్రేషన్</Link>
              <Link href="/dafabet-review" className="text-brand-gold hover:underline text-sm">దాఫాబెట్ సమీక్ష</Link>
              <Link href="/dafabet-bonus" className="text-brand-gold hover:underline text-sm">బోనస్ గైడ్</Link>
            </div>
          </div>
        </section>
      )}

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
