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
  const t = await getTranslations({ locale, namespace: 'sports' })
  const alts = pageAlternates(locale, '/sports-betting/')
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: alts.canonical,
      languages: alts.languages,
    },
  }
}

function SportsBettingContent({ locale }: { locale: string }) {
  const t = useTranslations('sports')
  const tCommon = useTranslations('common')

  const faqs = [
    { question: 'What sports can I bet on at DafaBet India?', answer: 'DafaBet covers cricket, IPL, football, kabaddi, tennis, basketball, and 20+ other sports.' },
    { question: 'Is sports betting legal in India?', answer: 'Online sports betting is in a legal grey area. DafaBet operates under an offshore licence valid for Indian players.' },
    { question: 'How do I start sports betting at DafaBet?', answer: 'Register an account, make a deposit via UPI or Paytm, and then navigate to the sports section to place your first bet.' },
    { question: 'Does DafaBet offer live sports betting?', answer: 'Yes, DafaBet offers comprehensive live in-play betting with real-time odds across all major sports.' },
    { question: 'What is the minimum bet at DafaBet?', answer: 'The minimum bet varies by sport and market, starting as low as ₹10 for most pre-match markets.' },
  ]

  const pageUrl = locale === 'te' ? `${SITE_URL}/te/sports-betting/` : `${SITE_URL}/sports-betting/`

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
      { name: 'Sports Betting', url: pageUrl },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemaData} />
      <section className="bg-dark-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6">🏆</div>
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
        <h2 className="section-title text-center mb-12">Sports Available</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { sport: 'Cricket', icon: '🏏' },
            { sport: 'IPL', icon: '🏆' },
            { sport: 'Football', icon: '⚽' },
            { sport: 'Kabaddi', icon: '🤼' },
            { sport: 'Tennis', icon: '🎾' },
            { sport: 'Basketball', icon: '🏀' },
            { sport: 'Boxing', icon: '🥊' },
            { sport: 'More', icon: '➕' },
          ].map(({ sport, icon }) => (
            <div key={sport} className="card text-center hover:border-gold-500/50 transition-colors">
              <div className="text-3xl mb-2">{icon}</div>
              <span className="text-sm font-medium text-gray-300">{sport}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="section-title mb-8">Sports Betting FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="card">
              <summary className="font-semibold text-white cursor-pointer list-none flex justify-between">
                {faq.question}
                <span className="text-gold-400">+</span>
              </summary>
              <p className="text-gray-400 mt-3 text-sm">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}

export default async function SportsBettingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <SportsBettingContent locale={locale} />
}
