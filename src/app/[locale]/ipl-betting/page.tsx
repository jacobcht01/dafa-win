import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { JsonLd } from '@/components/JsonLd'
import { articleSchema, sportsEventSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ipl' })
  const alts = pageAlternates(locale, '/ipl-betting/')
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: alts.canonical,
      languages: alts.languages,
    },
  }
}

function IplBettingContent({ locale }: { locale: string }) {
  const t = useTranslations('ipl')
  const tCommon = useTranslations('common')

  const faqs = [
    { question: 'Which is the best IPL betting site in India?', answer: 'DafaBet is our top-rated IPL betting site for India, offering the best odds, UPI payments, and a generous welcome bonus.' },
    { question: 'Is IPL betting legal in India?', answer: 'Online sports betting exists in a legal grey area in India. DafaBet operates under a valid offshore licence and accepts Indian players.' },
    { question: 'How can I deposit for IPL betting via UPI?', answer: 'Register at DafaBet, go to the deposit section, select UPI, enter the amount, and complete the payment using any UPI app like PhonePe or Google Pay.' },
    { question: 'What markets are available for IPL betting?', answer: 'DafaBet offers match winner, top batsman, top bowler, total runs, player of the match, and many more IPL markets.' },
    { question: 'Can I bet on IPL live?', answer: 'Yes. DafaBet offers full live in-play betting on all IPL matches with real-time odds updates.' },
  ]

  const schemaData = [
    articleSchema({
      headline: t('title'),
      description: t('description'),
      url: locale === 'te' ? `${SITE_URL}/te/ipl-betting/` : `${SITE_URL}/ipl-betting/`,
      datePublished: '2025-01-01',
      dateModified: new Date().toISOString().split('T')[0],
    }),
    sportsEventSchema({
      name: 'IPL 2025 — Indian Premier League',
      description: 'Indian Premier League cricket tournament 2025 season.',
      url: locale === 'te' ? `${SITE_URL}/te/ipl-betting/` : `${SITE_URL}/ipl-betting/`,
      startDate: '2025-03-22',
      endDate: '2025-05-25',
      location: 'India',
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL + '/' },
      { name: 'Cricket Betting', url: `${SITE_URL}/cricket-betting/` },
      { name: 'IPL Betting', url: locale === 'te' ? `${SITE_URL}/te/ipl-betting/` : `${SITE_URL}/ipl-betting/` },
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
        <h2 className="section-title text-center mb-12">IPL Betting Markets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Match Winner', 'Top Batsman', 'Total Runs', 'Top Bowler', 'Player of Match', 'Live In-Play'].map((market) => (
            <div key={market} className="card hover:border-gold-500/50 transition-colors">
              <h3 className="text-lg font-semibold text-gold-400 mb-2">{market}</h3>
              <p className="text-gray-400 text-sm">Best IPL odds on all {market.toLowerCase()} markets at DafaBet India.</p>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="section-title mb-8">IPL Betting FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="card group">
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

export default async function IplBettingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <IplBettingContent locale={locale} />
}
