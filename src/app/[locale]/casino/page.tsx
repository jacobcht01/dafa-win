import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getPageData, extractFaqs } from '@/lib/content'
import { breadcrumb, faqPage } from '@/lib/structured-data'
import JsonLd from '@/components/JsonLd'
import MarkdownBody from '@/components/MarkdownBody'
import FaqAccordion from '@/components/FaqAccordion'
import RatingBars from '@/components/RatingBars'
import BonusBanner from '@/components/BonusBanner'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const page = getPageData(locale, 'online-casino')
  return {
    title: page?.title ?? 'Online Casino India',
    description: page?.description ?? '',
    keywords: page?.keywords,
    alternates: { canonical: `/${locale}/casino/` },
  }
}

const CASINO_RATINGS = [
  { label: 'Teen Patti / Andar Bahar', score: 9.5 },
  { label: 'Live Casino', score: 9 },
  { label: 'Slots', score: 8 },
  { label: 'Game Variety', score: 8.5 },
  { label: 'Mobile Casino', score: 8 },
]

const GAMES_EN = [
  { icon: '🃏', title: 'Teen Patti', desc: 'Classic, Joker, One-Day variants — live and RNG' },
  { icon: '🎴', title: 'Andar Bahar', desc: 'India\'s favourite card game, live dealer tables' },
  { icon: '🎰', title: 'Slots', desc: '700+ titles from Pragmatic Play, Microgaming, NetEnt' },
  { icon: '🎲', title: 'Live Roulette', desc: 'Lightning Roulette, Crazy Time, Mega Ball' },
]
const GAMES_TE = [
  { icon: '🃏', title: 'తీన్ పట్టీ', desc: 'క్లాసిక్, జోకర్, వన్-డే వేరియంట్లు — లైవ్ మరియు RNG' },
  { icon: '🎴', title: 'అండర్ బాహర్', desc: 'భారతదేశంలో అత్యంత ఇష్టమైన కార్డ్ గేమ్, లైవ్ డీలర్ టేబుల్స్' },
  { icon: '🎰', title: 'స్లాట్లు', desc: 'Pragmatic Play, Microgaming నుండి 700+ టైటిల్స్' },
  { icon: '🎲', title: 'లైవ్ రూలెట్', desc: 'లైటింగ్ రూలెట్, క్రేజీ టైమ్, మెగా బాల్' },
]

export default async function CasinoPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const page = getPageData(locale, 'online-casino')
  const faqs = page ? extractFaqs(page.body) : []
  const schemas = [
    breadcrumb(locale, 'casino', locale === 'te' ? 'కాసినో' : 'Online Casino'),
    ...(faqs.length ? [faqPage(faqs)] : []),
  ]
  const isTE = locale === 'te'
  const games = isTE ? GAMES_TE : GAMES_EN

  return (
    <>
      <JsonLd schemas={schemas} />

      <section className="bg-dark-gradient py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🎰</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gold-text">{isTE ? 'ఆన్‌లైన్ కాసినో ఇండియా' : 'Online Casino India'}</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {isTE
              ? 'తీన్ పట్టీ, అండర్ బాహర్, 1,000+ స్లాట్లు మరియు Evolution లైవ్ కాసినో — 24/7 అందుబాటులో.'
              : 'Teen Patti, Andar Bahar, 1,000+ slots, and Evolution live casino — available 24/7.'}
          </p>
          <a
            href="https://www.dafabet.com/?utm_source=dafawin&utm_content=casino-hero"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="btn-primary text-lg px-8 py-4"
          >
            {isTE ? '🎰 ఇప్పుడే ఆడండి →' : '🎰 Play Casino Now →'}
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {games.map((g) => (
            <div key={g.title} className="card text-center hover:border-gold-500/50 transition-colors">
              <div className="text-4xl mb-3">{g.icon}</div>
              <h3 className="text-lg font-semibold text-gold-400 mb-2">{g.title}</h3>
              <p className="text-gray-400 text-xs">{g.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            {page && <MarkdownBody content={page.body} />}
          </article>
          <aside className="space-y-6">
            <RatingBars rows={CASINO_RATINGS} overall={8} />
            <BonusBanner locale={locale} />
          </aside>
        </div>

        {faqs.length > 0 && (
          <div className="mt-16 max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {isTE ? 'కాసినో FAQ' : 'Casino FAQ'}
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        )}
      </section>
    </>
  )
}
