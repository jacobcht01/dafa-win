import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPageData, extractFaqs } from '@/lib/content'
import { breadcrumb, faqPage, sportsEvent } from '@/lib/structured-data'
import JsonLd from '@/components/JsonLd'
import MarkdownBody from '@/components/MarkdownBody'
import FaqAccordion from '@/components/FaqAccordion'
import BonusBanner from '@/components/BonusBanner'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const page = getPageData(locale, 'cricket-betting')
  return {
    title: page?.title ?? 'Cricket Betting India',
    description: page?.description ?? '',
    keywords: page?.keywords,
    alternates: { canonical: `/${locale}/cricket-betting/` },
  }
}

const MARKETS_EN = [
  { title: 'IPL Betting', desc: 'All 74 matches, 30+ markets per game — match winner, top batsman, total sixes, live ball-by-ball', icon: '🏆' },
  { title: 'Test Cricket', desc: 'India internationals, series winner, session bets, and player performance markets', icon: '🏏' },
  { title: 'T20 World Cup', desc: 'ICC event coverage with outright winner, group stage, and match betting', icon: '🌍' },
  { title: 'BBL & PSL', desc: 'Australia Big Bash and Pakistan Super League with live odds', icon: '⚡' },
]
const MARKETS_TE = [
  { title: 'IPL బెట్టింగ్', desc: '74 మ్యాచ్‌లు, మ్యాచ్‌కు 30+ మార్కెట్లు — విజేత, టాప్ బ్యాట్స్మన్, లైవ్ బాల్-బై-బాల్', icon: '🏆' },
  { title: 'టెస్ట్ క్రికెట్', desc: 'భారత అంతర్జాతీయ సిరీస్ విజేత, సెషన్ బెట్లు', icon: '🏏' },
  { title: 'T20 వరల్డ్ కప్', desc: 'ICC ఈవెంట్ కవరేజ్ — ఔట్‌రైట్ విజేత, గ్రూప్ స్టేజ్', icon: '🌍' },
  { title: 'BBL & PSL', desc: 'ఆస్ట్రేలియా మరియు పాకిస్తాన్ లీగ్‌లపై లైవ్ ఆడ్స్', icon: '⚡' },
]

export default async function CricketBettingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const page = getPageData(locale, 'cricket-betting')
  const faqs = page ? extractFaqs(page.body) : []
  const schemas = [
    breadcrumb(locale, 'cricket-betting', 'Cricket Betting'),
    sportsEvent(),
    ...(faqs.length ? [faqPage(faqs)] : []),
  ]
  const isTE = locale === 'te'
  const markets = isTE ? MARKETS_TE : MARKETS_EN

  return (
    <>
      <JsonLd schemas={schemas} />

      <section className="bg-dark-gradient py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🏏</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gold-text">{isTE ? 'క్రికెట్ బెట్టింగ్ ఇండియా 2025' : 'Cricket Betting India 2025'}</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {isTE
              ? 'IPL, టెస్ట్, ODI మరియు T20 వరల్డ్ కప్‌పై అత్యుత్తమ ఆడ్స్. బాల్-బై-బాల్ లైవ్ బెట్టింగ్.'
              : 'Best odds on IPL, Test, ODI & T20 World Cup. Ball-by-ball live betting with cash-out.'}
          </p>
          <a
            href="https://www.dafabet.com/?utm_source=dafawin&utm_content=cricket-hero"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="btn-primary text-lg px-8 py-4"
          >
            {isTE ? '🏏 ఇప్పుడే బెట్ చేయండి →' : '🏏 Bet on Cricket Now →'}
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          {isTE ? 'క్రికెట్ బెట్టింగ్ మార్కెట్లు' : 'Cricket Betting Markets'}
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
            <div className="card">
              <h3 className="font-bold text-white mb-4">{isTE ? 'సంబంధిత గైడ్‌లు' : 'Related Guides'}</h3>
              <nav className="space-y-2">
                <Link href="/review" className="block text-sm text-gray-400 hover:text-gold-400 transition-colors">
                  {isTE ? '⭐ DafaBet రివ్యూ' : '⭐ DafaBet Full Review'}
                </Link>
                <Link href="/bonuses" className="block text-sm text-gray-400 hover:text-gold-400 transition-colors">
                  {isTE ? '🎁 వెల్‌కమ్ బోనస్' : '🎁 Welcome Bonus'}
                </Link>
                <Link href="/app-download" className="block text-sm text-gray-400 hover:text-gold-400 transition-colors">
                  {isTE ? '📱 యాప్ డౌన్‌లోడ్' : '📱 App Download'}
                </Link>
              </nav>
            </div>
          </aside>
        </div>

        {faqs.length > 0 && (
          <div className="mt-16 max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {isTE ? 'తరచుగా అడిగే ప్రశ్నలు' : 'Cricket Betting FAQ'}
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        )}
      </section>
    </>
  )
}
