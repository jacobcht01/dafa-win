import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPageData, extractFaqs } from '@/lib/content'
import { breadcrumb, review as reviewSchema, faqPage } from '@/lib/structured-data'
import JsonLd from '@/components/JsonLd'
import MarkdownBody from '@/components/MarkdownBody'
import FaqAccordion from '@/components/FaqAccordion'
import RatingBars from '@/components/RatingBars'
import BonusBanner from '@/components/BonusBanner'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const page = getPageData(locale, 'dafabet-review')
  return {
    title: page?.title ?? 'DafaBet India Review 2025',
    description: page?.description ?? '',
    keywords: page?.keywords,
    alternates: { canonical: `/${locale}/review/` },
  }
}

const RATINGS = [
  { label: 'Cricket Betting', score: 9.5 },
  { label: 'Bonuses', score: 9 },
  { label: 'Payments', score: 9 },
  { label: 'Mobile App', score: 8 },
  { label: 'Casino', score: 8 },
  { label: 'Support', score: 8 },
]

const PROS_EN = [
  '200% welcome bonus up to ₹20,000',
  'Lowest wagering requirement (3x) in market',
  'Instant UPI, Paytm & PhonePe deposits',
  'Best cricket odds in our 50-match test',
  '30+ sports, 1,000+ casino games',
  '24/7 live chat support',
]
const CONS_EN = [
  'No live streaming of cricket matches',
  'Occasional withdrawal delays reported',
  'Casino wagering (20x) is industry average',
  'No dedicated app on Google Play Store',
]

export default async function ReviewPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const page = getPageData(locale, 'dafabet-review')
  const faqs = page ? extractFaqs(page.body) : []
  const schemas = [
    breadcrumb(locale, 'review', 'DafaBet Review'),
    reviewSchema(locale),
    ...(faqs.length ? [faqPage(faqs)] : []),
  ]
  const isTE = locale === 'te'

  return (
    <>
      <JsonLd schemas={schemas} />

      {/* Hero */}
      <section className="bg-dark-gradient py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">⭐</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gold-text">{isTE ? 'దఫాబెట్ ఇండియా రివ్యూ 2025' : 'DafaBet India Review 2025'}</span>
          </h1>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            {isTE
              ? 'మా నిపుణుల రేటింగ్: 8.5/10 — IPL క్రికెట్ బెట్టర్లకు #1 సిఫార్సు'
              : 'Our Expert Rating: 8.5/10 — #1 Recommended for IPL Cricket Bettors'}
          </p>
          <div className="flex justify-center gap-1 mb-8">
            {[1,2,3,4].map((i) => <span key={i} className="text-gold-400 text-3xl">★</span>)}
            <span className="text-gold-400 text-3xl">½</span>
            <span className="text-gray-400 ml-2 self-center">8.5/10</span>
          </div>
          <a
            href="https://www.dafabet.com/?utm_source=dafawin&utm_content=review-hero"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="btn-primary text-lg px-8 py-4"
          >
            {isTE ? '🎯 200% బోనస్ పొందండి →' : '🎯 Claim 200% Bonus →'}
          </a>
        </div>
      </section>

      {/* Offer bar */}
      <div className="bg-brand-surface border-b border-brand-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-300">
            <span className="text-gold-400 font-bold">🎯 {isTE ? 'ప్రస్తుత ఆఫర్:' : 'Current Offer:'}</span>{' '}
            {isTE ? '200% వెల్‌కమ్ బోనస్ ₹20,000 వరకు' : '200% Welcome Bonus up to ₹20,000'}
          </p>
          <a
            href="https://www.dafabet.com/?utm_source=dafawin&utm_content=review-bar"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="btn-primary text-sm px-4 py-2"
          >
            {isTE ? 'ఇప్పుడే పొందండి →' : 'Claim Now →'}
          </a>
        </div>
      </div>

      {/* Content + sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            {page && <MarkdownBody content={page.body} />}

            {/* Pros & Cons */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-white mb-6">{isTE ? 'ప్రయోజనాలు & నష్టాలు' : 'Pros & Cons'}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-950/30 border border-green-500/20 rounded-xl p-5">
                  <h3 className="text-green-400 font-bold mb-3">✅ {isTE ? 'ప్రయోజనాలు' : 'Pros'}</h3>
                  <ul className="space-y-2">
                    {PROS_EN.map((p) => (
                      <li key={p} className="flex gap-2 text-gray-300 text-sm">
                        <span className="text-green-400 flex-shrink-0">✓</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-950/30 border border-red-500/20 rounded-xl p-5">
                  <h3 className="text-red-400 font-bold mb-3">❌ {isTE ? 'నష్టాలు' : 'Cons'}</h3>
                  <ul className="space-y-2">
                    {CONS_EN.map((c) => (
                      <li key={c} className="flex gap-2 text-gray-300 text-sm">
                        <span className="text-red-400 flex-shrink-0">✗</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <RatingBars rows={RATINGS} overall={8.5} />
            <BonusBanner locale={locale} />
          </aside>
        </div>

        {/* FAQ */}
        {faqs.length > 0 && (
          <div className="mt-16 max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-6">{isTE ? 'తరచుగా అడిగే ప్రశ్నలు' : 'Frequently Asked Questions'}</h2>
            <FaqAccordion items={faqs} />
          </div>
        )}
      </div>
    </>
  )
}
