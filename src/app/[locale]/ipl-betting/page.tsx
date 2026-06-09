import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getPageData, extractFaqs } from '@/lib/content'
import { breadcrumb, faqPage, sportsEvent } from '@/lib/structured-data'
import JsonLd from '@/components/JsonLd'
import MarkdownBody from '@/components/MarkdownBody'
import FaqAccordion from '@/components/FaqAccordion'
import BonusBanner from '@/components/BonusBanner'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const page = getPageData(locale, 'ipl-betting')
  return {
    title: page?.title ?? 'IPL Betting India 2025 — Best IPL Odds',
    description: page?.description ?? '',
    keywords: page?.keywords,
    alternates: { canonical: `/${locale}/ipl-betting/` },
  }
}

const MARKETS_EN = [
  {
    title: 'Match Winner',
    desc: 'Bet on the winning team for every IPL match. Pre-match and live odds updated ball by ball.',
    icon: '🏆',
  },
  {
    title: 'Top Batsman',
    desc: 'Predict the highest scorer in each match — one of the most popular IPL betting markets.',
    icon: '🏏',
  },
  {
    title: 'Total Sixes',
    desc: 'Over/under on total sixes hit in the match. Available pre-match and in-play every delivery.',
    icon: '💥',
  },
  {
    title: 'Live Betting',
    desc: 'Ball-by-ball in-play markets: next wicket, runs in over, next boundary, and more.',
    icon: '⚡',
  },
]

const MARKETS_TE = [
  {
    title: 'మ్యాచ్ విజేత',
    desc: 'ప్రతి IPL మ్యాచ్‌లో విజేత జట్టుపై బెట్ — ప్రీ-మ్యాచ్ మరియు బాల్-బై-బాల్ లైవ్ ఆడ్స్.',
    icon: '🏆',
  },
  {
    title: 'టాప్ బ్యాట్స్మన్',
    desc: 'ప్రతి మ్యాచ్‌లో అత్యధిక రన్లు చేసే బ్యాట్స్మన్‌ని అంచనా వేయండి.',
    icon: '🏏',
  },
  {
    title: 'మొత్తం సిక్సర్లు',
    desc: 'మ్యాచ్‌లో మొత్తం సిక్సర్ల సంఖ్యపై ఓవర్/అండర్ — ప్రీ-మ్యాచ్ మరియు ఇన్-ప్లే.',
    icon: '💥',
  },
  {
    title: 'లైవ్ బెట్టింగ్',
    desc: 'బాల్-బై-బాల్ ఇన్-ప్లే మార్కెట్లు: తదుపరి వికెట్, ఓవర్ రన్లు, తదుపరి బౌండరీ.',
    icon: '⚡',
  },
]

export default async function IplBettingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const page = getPageData(locale, 'ipl-betting')
  const faqs = page ? extractFaqs(page.body) : []
  const schemas = [
    breadcrumb(locale, 'ipl-betting', 'IPL Betting'),
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
          <div className="text-5xl mb-4">🏆</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gold-text">
              {isTE
                ? 'IPL బెట్టింగ్ ఇండియా 2025 — అత్యుత్తమ ఆడ్స్'
                : 'IPL Betting India 2025 — Best IPL Odds'}
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {isTE
              ? 'IPL 2025 అన్ని 74 మ్యాచ్‌లపై 30+ మార్కెట్లు. బాల్-బై-బాల్ లైవ్ బెట్టింగ్, క్యాష్-అవుట్ మరియు UPI డిపాజిట్.'
              : 'All 74 IPL 2025 matches with 30+ markets. Ball-by-ball live betting, cash-out and instant UPI deposits.'}
          </p>
          <a
            href="https://www.dafabet.com/?utm_source=dafawin&utm_content=ipl-hero"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="btn-primary text-lg px-8 py-4"
          >
            {isTE ? '🏆 IPLపై బెట్ చేయండి →' : '🏆 Bet on IPL Now →'}
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          {isTE ? 'IPL బెట్టింగ్ మార్కెట్లు' : 'IPL Betting Markets'}
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
