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
    title: page?.title ?? 'Kabaddi Betting Online — Pro Kabaddi League 2025',
    description: page?.description ?? '',
    keywords: page?.keywords,
    alternates: { canonical: `/${locale}/kabaddi-betting/` },
  }
}

const MARKETS_EN = [
  {
    title: 'Pro Kabaddi League',
    desc: 'All PKL matches covered — match winner, handicap, and total points markets with live odds.',
    icon: '🏅',
  },
  {
    title: 'Match Winner',
    desc: 'Bet on the outright match winner across all PKL teams. Pre-match and in-play available.',
    icon: '🏆',
  },
  {
    title: 'Player Markets',
    desc: 'Top raider, top defender, total raid points, and player performance specials per match.',
    icon: '🤼',
  },
]

const MARKETS_TE = [
  {
    title: 'ప్రో కబడ్డీ లీగ్',
    desc: 'అన్ని PKL మ్యాచ్‌లు — మ్యాచ్ విజేత, హ్యాండీక్యాప్, టోటల్ పాయింట్స్ లైవ్ ఆడ్స్ సహా.',
    icon: '🏅',
  },
  {
    title: 'మ్యాచ్ విజేత',
    desc: 'అన్ని PKL జట్లలో మ్యాచ్ విజేతపై బెట్ — ప్రీ-మ్యాచ్ మరియు ఇన్-ప్లే అందుబాటులో.',
    icon: '🏆',
  },
  {
    title: 'ప్లేయర్ మార్కెట్లు',
    desc: 'టాప్ రైడర్, టాప్ డిఫెండర్, మొత్తం రైడ్ పాయింట్లు, ప్లేయర్ పర్ఫార్మెన్స్ స్పెషల్స్.',
    icon: '🤼',
  },
]

export default async function KabaddiBettingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const page = getPageData(locale, 'sports-betting')
  const faqs = page ? extractFaqs(page.body) : []
  const schemas = [
    breadcrumb(locale, 'kabaddi-betting', 'Kabaddi Betting'),
    ...(faqs.length ? [faqPage(faqs)] : []),
  ]
  const isTE = locale === 'te'
  const markets = isTE ? MARKETS_TE : MARKETS_EN

  return (
    <>
      <JsonLd schemas={schemas} />

      <section className="bg-dark-gradient py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🤼</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gold-text">
              {isTE
                ? 'కబడ్డీ బెట్టింగ్ ఆన్‌లైన్ 2025'
                : 'Kabaddi Betting Online — Pro Kabaddi League 2025'}
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {isTE
              ? 'ప్రో కబడ్డీ లీగ్ మ్యాచ్‌లపై అత్యుత్తమ ఆడ్స్. మ్యాచ్ విజేత, ప్లేయర్ మార్కెట్లు మరియు లైవ్ బెట్టింగ్.'
              : 'Best odds on Pro Kabaddi League matches. Match winner, player markets and live in-play betting.'}
          </p>
          <a
            href="https://www.dafabet.com/?utm_source=dafawin&utm_content=kabaddi-hero"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="btn-primary text-lg px-8 py-4"
          >
            {isTE ? '🤼 ఇప్పుడే బెట్ చేయండి →' : '🤼 Bet on Kabaddi Now →'}
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          {isTE ? 'కబడ్డీ బెట్టింగ్ మార్కెట్లు' : 'Kabaddi Betting Markets'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
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
