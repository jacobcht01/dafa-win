import type { Metadata } from 'next'
import Image from 'next/image'
import { JsonLd } from '@/components/JsonLd'
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'casino' })
  const alts = pageAlternates(locale, '/online-casino/')
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: alts.canonical, languages: alts.languages },
  }
}

function CasinoContent() {
  const t = useTranslations('casino')
  const tCommon = useTranslations('common')

  const faqs = [
    { question: 'What casino games does DafaBet offer?', answer: 'Live tables (Teen Patti, Andar Bahar, Roulette, Blackjack, Baccarat), 2,000+ slots, poker, and rummy.' },
    { question: 'Is the DafaBet casino safe?', answer: 'Yes, the live casino is powered by Evolution and Ezugi — licensed studios with independent auditing.' },
    { question: 'Can I play Teen Patti at DafaBet?', answer: 'Yes, live Teen Patti tables with Hindi-speaking dealers are available 24/7.' },
    { question: 'What welcome bonus is available?', answer: '200% match up to ₹20,000 on first deposit (minimum deposit ₹500).' },
    { question: 'How do I deposit to play casino games?', answer: 'UPI, Paytm, PhonePe, or net banking — minimum ₹500. Funds are credited instantly.' },
  ]

  const pageUrl = `${SITE_URL}/online-casino/`

  const schemaData = [
    articleSchema({ headline: t('title'), description: t('description'), url: pageUrl, datePublished: '2025-01-01' }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL + '/' },
      { name: 'Online Casino', url: pageUrl },
    ]),
  ]

  const categories = [
    { emoji: '🎲', name: 'Live Casino', desc: 'Real dealers, real tables' },
    { emoji: '🎰', name: 'Slots', desc: '2,000+ slot titles' },
    { emoji: '🔴', name: 'Roulette', desc: 'European & live variants' },
    { emoji: '🃏', name: 'Blackjack', desc: 'Classic & multi-hand' },
  ]

  const casinoGames = [
    { src: '/images/casino-game-1.jpg', name: 'Live Roulette' },
    { src: '/images/casino-game-2.jpg', name: 'Blackjack Classic' },
    { src: '/images/casino-game-3.jpg', name: 'Baccarat' },
    { src: '/images/casino-game-4.jpg', name: 'Dragon Tiger' },
    { src: '/images/casino-game-5.jpg', name: 'Teen Patti' },
    { src: '/images/casino-game-6.jpg', name: 'Mega Slots' },
  ]

  const liveStats = [
    { value: '50+', label: 'Live Tables' },
    { value: 'HD', label: 'Streaming' },
    { value: 'Hindi', label: 'Dealers' },
    { value: '24/7', label: 'Mobile Ready' },
  ]

  const cardGames = [
    {
      name: 'Teen Patti',
      desc: 'Live tables with Hindi-speaking dealers. Classic 3-card play with pair-plus and 6-card bonus side bets.',
    },
    {
      name: 'Andar Bahar',
      desc: 'Goa-room rules, dealt fast. The simplest game in the room — and the hardest to grind.',
    },
    {
      name: 'Rummy',
      desc: '13-card cash tables and tournament formats alongside the live casino.',
    },
    {
      name: 'Poker',
      desc: 'Texas Hold\'em at live tables and as video poker. Rewards math, position, and patience.',
    },
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Hero */}
      <section className="relative h-[350px] md:h-[420px] overflow-hidden">
        <Image
          src="/images/casino.webp"
          alt="Dafabet online casino India"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <span className="red-badge mb-4">🎰 2,000+ GAMES</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-xl">
            Online Casino at <span className="gold-text">DafaBet India</span>
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-md">
            Live Teen Patti, Andar Bahar, Evolution tables, and 2,000+ slots — with a 200% welcome bonus up to ₹20,000.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/dafabet-registration" className="btn-primary">
              Play Now →
            </Link>
            <Link href="/online-casino" className="btn-secondary">
              Browse Games
            </Link>
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="bg-brand-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div key={cat.name} className="card text-center">
                <div className="text-3xl mb-2">{cat.emoji}</div>
                <h3 className="text-brand-gold font-bold mb-1">{cat.name}</h3>
                <p className="text-gray-400 text-sm">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Game grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">Featured Casino Games</h2>
          <p className="text-gray-400 mb-8">Play the most popular titles at DafaBet India.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {casinoGames.map((game) => (
              <div key={game.name} className="relative rounded-lg overflow-hidden group aspect-[325/250]">
                <Image
                  src={game.src}
                  alt={game.name}
                  width={325}
                  height={250}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-end p-2">
                  <p className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {game.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Card Games section */}
      <section className="bg-brand-surface py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">Card Games</h2>
          <p className="text-gray-400 mb-8">The Indian card lobby at DafaBet — from Teen Patti and Andar Bahar to rummy and poker.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cardGames.map((game) => (
              <div key={game.name} className="card card-hover">
                <h3 className="gold-text font-bold text-lg mb-2">{game.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{game.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goa Casino Connection section */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-6">The Goa Casino Connection</h2>
          <div className="card border-l-4 border-brand-gold">
            <p className="text-gray-300 leading-relaxed">
              If you&apos;ve played on Deltin Royale or Casino Pride on the Mandovi, the DafaBet lobby will feel familiar.
              Andar Bahar, Teen Patti, Mini-Flush, Roulette, and Baccarat — the Goa casino floor translated online,
              with Hindi-speaking dealers and UPI withdrawals instead of chips.
            </p>
          </div>
        </div>
      </section>

      {/* Live Casino Studios section */}
      <section className="bg-brand-surface py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="verdict-box">
            <p className="text-brand-gold font-bold text-sm uppercase tracking-wide mb-2">Live Casino Studios</p>
            <h2 className="text-white text-xl font-bold mb-4">
              Evolution &amp; Ezugi — Audited, Licensed, Hindi-Ready
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              DafaBet&apos;s live casino runs on Evolution (European-style tables: roulette, baccarat, blackjack, game shows)
              and Ezugi (Hindi-language Teen Patti, Andar Bahar, Hindi Roulette). Both stream from licensed studios
              with published game logs and independent auditing.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {liveStats.map((stat) => (
                <div key={stat.label} className="stat-box">
                  <p className="text-brand-gold text-xl font-bold">{stat.value}</p>
                  <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8">Online Casino FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="card">
                <summary className="font-semibold text-white cursor-pointer list-none flex justify-between">
                  {faq.question}
                  <span className="text-brand-gold ml-3">+</span>
                </summary>
                <p className="text-gray-400 mt-3 text-sm">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative h-[240px] overflow-hidden">
        <Image
          src="/images/promo-767-1.jpg"
          alt="DafaBet casino welcome bonus"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center gap-4">
          <h2 className="text-white text-2xl md:text-3xl font-bold">
            200% Bonus up to ₹20,000 — Claim Now
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/dafabet-registration" className="btn-primary">
              {tCommon('join_now')}
            </Link>
            <Link href="/online-casino" className="btn-red">
              Play Free Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default async function CasinoPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <CasinoContent />
}
