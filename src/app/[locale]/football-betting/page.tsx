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
  const page = getPageData(locale, 'sports-betting')
  return {
    title: page?.title ?? 'Football Betting India 2025',
    description: page?.description ?? '',
    keywords: page?.keywords,
    alternates: { canonical: `/${locale}/football-betting/` },
  }
}

const MARKETS_EN = [
  {
    title: 'Premier League',
    desc: 'Match winner, both teams to score, Asian handicap, and 40+ markets per EPL fixture with live odds.',
    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  },
  {
    title: 'La Liga',
    desc: 'Spanish top-flight coverage including correct score, first goalscorer, and in-play betting.',
    icon: '🇪🇸',
  },
  {
    title: 'Champions League',
    desc: 'UCL group stages to final — outright winner, match bets, and multi-leg accumulators.',
    icon: '⭐',
  },
  {
    title: 'ISL',
    desc: 'Indian Super League full coverage with local favourites, match winner, and special markets.',
    icon: '🇮🇳',
  },
]

const MARKETS_TE = [
  {
    title: 'ప్రీమియర్ లీగ్',
    desc: 'మ్యాచ్ విజేత, ఆసియన్ హ్యాండీక్యాప్, 40+ మార్కెట్లు — లైవ్ ఆడ్స్ సహా.',
    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  },
  {
    title: 'లా లీగా',
    desc: 'స్పెయిన్ టాప్ లీగ్ — కరెక్ట్ స్కోర్, ఫస్ట్ గోల్‌స్కోరర్, ఇన్-ప్లే బెట్టింగ్.',
    icon: '🇪🇸',
  },
  {
    title: 'చాంపియన్స్ లీగ్',
    desc: 'UCL గ్రూప్ స్టేజ్ నుండి ఫైనల్ వరకు — ఔట్‌రైట్ విజేత, మ్యాచ్ బెట్లు.',
    icon: '⭐',
  },
  {
    title: 'ISL',
    desc: 'ఇండియన్ సూపర్ లీగ్ — స్థానిక జట్ల మ్యాచ్‌లు, మ్యాచ్ విజేత, స్పెషల్ మార్కెట్లు.',
    icon: '🇮🇳',
  },
]

export default async function FootballBettingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const page = getPageData(locale, 'sports-betting')
  const faqs = page ? extractFaqs(page.body) : []
  const schemas = [
    breadcrumb(locale, 'football-betting', 'Football Betting'),
    ...(faqs.length ? [faqPage(faqs)] : []),
  ]
  const isTE = locale === 'te'
  const markets = isTE ? MARKETS_TE : MARKETS_EN

  return (
    <>
      <JsonLd schemas={schemas} />

      <section className="bg-dark-gradient py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">⚽</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gold-text">
              {isTE ? 'ఫుట్‌బాల్ బెట్టింగ్ ఇండియా 2025' : 'Football Betting India 2025'}
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {isTE
              ? 'ప్రీమియర్ లీగ్, లా లీగా, UCL మరియు ISL పై అత్యుత్తమ ఆడ్స్. లైవ్ ఇన్-ప్లే బెట్టింగ్.'
              : 'Best odds on Premier League, La Liga, Champions League & ISL. Live in-play betting with cash-out.'}
          </p>
          <a
            href="https://www.dafabet.com/?utm_source=dafawin&utm_content=football-hero"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="btn-primary text-lg px-8 py-4"
          >
            {isTE ? '⚽ ఇప్పుడే బెట్ చేయండి →' : '⚽ Bet on Football Now →'}
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          {isTE ? 'ఫుట్‌బాల్ మార్కెట్లు' : 'Football Betting Markets'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {markets.map((m) => (
            <div key={m.title} className="card hover:border-gold-500/50 transition-colors">
              <div className="text-3xl mb-3">{m.icon}</div>
              <h3 className="text-lg font-semibold text-gold-400 mb-2">{m.title}</h3>
              <p className="text-gray-400 text-sm">{m.desc}</p>
            </div>
          ))}
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
              {isTE ? 'తరచుగా అడిగే ప్రశ్నలు' : 'Frequently Asked Questions'}
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        )}
      </section>
    </>
  )
}
