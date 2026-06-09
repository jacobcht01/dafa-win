import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPageData, extractFaqs } from '@/lib/content'
import { breadcrumb, faqPage } from '@/lib/structured-data'
import JsonLd from '@/components/JsonLd'
import MarkdownBody from '@/components/MarkdownBody'
import FaqAccordion from '@/components/FaqAccordion'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const page = getPageData(locale, 'dafabet-bonus')
  return {
    title: page?.title ?? 'DafaBet Bonus & Promo Codes India',
    description: page?.description ?? '',
    keywords: page?.keywords,
    alternates: { canonical: `/${locale}/bonuses/` },
  }
}

export default async function BonusesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const page = getPageData(locale, 'dafabet-bonus')
  const faqs = page ? extractFaqs(page.body) : []
  const schemas = [
    breadcrumb(locale, 'bonuses', 'Bonuses'),
    ...(faqs.length ? [faqPage(faqs)] : []),
  ]
  const isTE = locale === 'te'

  const steps = isTE ? [
    { n: '1', t: 'రిజిస్టర్ చేయండి', d: 'కొత్త DafaBet అకౌంట్ తెరవండి' },
    { n: '2', t: 'డిపాజిట్ చేయండి', d: 'కనీసం ₹500 UPI/PhonePe లో జమ చేయండి' },
    { n: '3', t: 'బోనస్ పొందండి', d: '200% బోనస్ స్వయంచాలకంగా జమ అవుతుంది' },
    { n: '4', t: 'వేజర్ & విత్‌డ్రా', d: '3x వేజరింగ్ పూర్తి చేసిన తర్వాత వెళ్లగొట్టండి' },
  ] : [
    { n: '1', t: 'Register Account', d: 'Open a new DafaBet India account' },
    { n: '2', t: 'Make First Deposit', d: 'Deposit at least ₹500 via UPI, Paytm, or PhonePe' },
    { n: '3', t: 'Bonus Credited', d: '200% bonus added automatically to your balance' },
    { n: '4', t: 'Wager & Withdraw', d: 'Complete 3x wagering then withdraw your winnings' },
  ]

  return (
    <>
      <JsonLd schemas={schemas} />

      <section className="bg-dark-gradient py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🎁</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gold-text">{isTE ? '200% వెల్‌కమ్ బోనస్' : '200% Welcome Bonus'}</span>
          </h1>
          <p className="text-2xl font-black text-gold-400 mb-4">
            {isTE ? '₹20,000 వరకు' : 'Up to ₹20,000'}
          </p>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {isTE
              ? 'కేవలం 3x వేజరింగ్ రిక్వైర్‌మెంట్ — పరిశ్రమలో అత్యల్పం. ₹10,000 డిపాజిట్ = ₹30,000 మొత్తం.'
              : 'Only 3x wagering requirement — lowest in the industry. Deposit ₹10,000, play with ₹30,000 total.'}
          </p>
          <a
            href="https://www.dafabet.com/?utm_source=dafawin&utm_content=bonus-hero"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="btn-primary text-lg px-8 py-4"
          >
            {isTE ? '🎯 బోనస్ పొందండి →' : '🎯 Claim Bonus Now →'}
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* How to claim */}
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {isTE ? 'బోనస్ ఎలా పొందాలి?' : 'How to Claim Your Bonus'}
          </h2>
          <ol className="space-y-4">
            {steps.map((step) => (
              <li key={step.n} className="flex items-start gap-4 card">
                <span className="w-8 h-8 bg-gold-gradient text-black rounded-full flex items-center justify-center font-black flex-shrink-0 text-sm">
                  {step.n}
                </span>
                <div>
                  <div className="text-white font-semibold">{step.t}</div>
                  <div className="text-gray-400 text-sm mt-1">{step.d}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            {page && <MarkdownBody content={page.body} />}
          </article>
          <aside className="space-y-6">
            <div className="card border-gold-500/30">
              <p className="text-gold-400 font-bold mb-2 text-sm">{isTE ? '🏷️ ప్రోమో కోడ్' : '🏷️ Promo Code'}</p>
              <div className="bg-brand-surface rounded-lg px-4 py-3 text-center border border-gold-500/30 mb-4">
                <span className="text-2xl font-black text-gold-400 tracking-widest">DAWIN200</span>
              </div>
              <a
                href="https://www.dafabet.com/?utm_source=dafawin&utm_content=bonus-sidebar"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                {isTE ? 'బోనస్ పొందండి →' : 'Claim Bonus →'}
              </a>
              <p className="text-gray-500 text-xs text-center mt-2">{isTE ? '18+ | T&C వర్తిస్తాయి' : '18+ | T&C Apply'}</p>
            </div>
          </aside>
        </div>

        {faqs.length > 0 && (
          <div className="mt-16 max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {isTE ? 'బోనస్ FAQ' : 'Bonus FAQ'}
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        )}
      </section>
    </>
  )
}
