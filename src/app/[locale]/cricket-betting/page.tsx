import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { JsonLd } from '@/components/JsonLd'
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'cricket' })
  const alts = pageAlternates(locale, '/cricket-betting/')
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: alts.canonical, languages: alts.languages },
  }
}

function CricketBettingContent({ locale }: { locale: string }) {
  const t = useTranslations('cricket')
  const tCommon = useTranslations('common')

  const pageUrl = locale === 'te' ? `${SITE_URL}/te/cricket-betting/` : `${SITE_URL}/cricket-betting/`
  const faqs = [
    { question: 'What is the best site for cricket betting in India?', answer: 'DafaBet is our top pick for cricket betting in India, offering the best IPL odds, live betting, and UPI payments.' },
    { question: 'Is cricket betting legal in India?', answer: 'Online cricket betting is in a legal grey area. DafaBet operates under an offshore licence and accepts Indian players.' },
    { question: 'How do I bet on cricket online in India?', answer: 'Register at DafaBet, deposit via UPI, navigate to cricket, and select your market and stake.' },
    { question: 'What cricket markets are available?', answer: 'DafaBet offers match winner, top batsman, top bowler, total runs, over/under, and many live in-play markets.' },
    { question: 'Can I bet on IPL at DafaBet?', answer: 'Yes. DafaBet covers all IPL matches with comprehensive pre-match and live betting markets.' },
  ]

  const schemaData = [
    articleSchema({ headline: t('title'), description: t('description'), url: pageUrl, datePublished: '2025-01-01' }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL + '/' },
      { name: 'Cricket Betting', url: pageUrl },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemaData} />
      <section className="bg-dark-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6">🏏</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gold-text">{t('hero_title')}</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">{t('hero_subtitle')}</p>
          <Link href="/dafabet-registration" className="btn-primary text-lg px-8 py-4">
            {tCommon('bet_now')}
          </Link>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['IPL Betting', 'T20 World Cup', 'India vs Pakistan'].map((market) => (
            <div key={market} className="card hover:border-gold-500/50 transition-colors">
              <h3 className="text-lg font-semibold text-gold-400 mb-2">{market}</h3>
              <p className="text-gray-400 text-sm">Live odds, match betting, top batsman/bowler markets, and more.</p>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="section-title mb-8">Cricket Betting FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="card">
              <summary className="font-semibold text-white cursor-pointer list-none flex justify-between">
                {faq.question}<span className="text-gold-400">+</span>
              </summary>
              <p className="text-gray-400 mt-3 text-sm">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}

export default async function CricketBettingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <CricketBettingContent locale={locale} />
}
