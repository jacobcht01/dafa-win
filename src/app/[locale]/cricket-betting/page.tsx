import type { Metadata } from 'next'
import Image from 'next/image'
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

  const sportFeatures = [
    { emoji: '🏆', title: 'IPL', subtitle: '500+ markets per match' },
    { emoji: '📺', title: 'Test Cricket', subtitle: 'Best odds guaranteed' },
    { emoji: '⚡', title: 'T20', subtitle: 'Live in-play betting' },
    { emoji: '🏏', title: 'One Day', subtitle: 'Top batsman & bowler' },
  ]

  const markets = [
    { title: 'Match Winner', desc: 'Back your team to win at the best available price.' },
    { title: 'Top Batsman', desc: 'Pick the highest run-scorer in the innings.' },
    { title: 'Top Bowler', desc: 'Choose the bowler who takes the most wickets.' },
    { title: 'Total Runs', desc: 'Predict the total runs scored in a match or innings.' },
    { title: 'Over / Under', desc: 'Bet whether the total falls above or below the line.' },
    { title: 'Live In-Play', desc: 'React to every ball with real-time odds updates.' },
  ]

  const steps = [
    { title: 'Create Your Account', desc: 'Register at DafaBet in under 2 minutes with your email or mobile number.' },
    { title: 'Deposit via UPI', desc: 'Add funds instantly using PhonePe, Google Pay, or any UPI app.' },
    { title: 'Find Your Match', desc: 'Navigate to Cricket, pick a match, and browse all available markets.' },
    { title: 'Place Your Bet', desc: 'Enter your stake, confirm your slip, and watch the action live.' },
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Hero */}
      <section className="relative h-[350px] md:h-[420px] overflow-hidden">
        <Image
          src="/images/sports-betting.webp"
          alt="Cricket betting at DafaBet India"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <span className="red-badge mb-4">🏏 LIVE CRICKET</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-xl">
            Cricket Betting <span className="gold-text">India 2025</span>
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-md">
            Best cricket odds, live markets, and instant UPI payouts — only at DafaBet.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/dafabet-registration" className="btn-primary">
              Bet on Cricket →
            </Link>
            <Link href="/cricket-betting" className="btn-secondary">
              See All Markets
            </Link>
          </div>
        </div>
      </section>

      {/* Sport feature cards */}
      <section className="bg-brand-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sportFeatures.map((feat) => (
              <div key={feat.title} className="card text-center">
                <div className="text-3xl mb-2">{feat.emoji}</div>
                <h3 className="text-brand-gold font-bold mb-1">{feat.title}</h3>
                <p className="text-gray-400 text-sm">{feat.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2">Cricket Betting Markets</h2>
          <p className="text-gray-400 mb-8">Explore every market available at DafaBet India.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {markets.map((m) => (
              <div key={m.title} className="card-hover">
                <h3 className="text-brand-gold font-bold mb-2">{m.title}</h3>
                <p className="text-gray-400 text-sm">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to bet */}
      <section className="bg-brand-surface py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-10 text-center">How to Bet on Cricket</h2>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={step.title} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center font-bold text-black">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8">Cricket Betting FAQ</h2>
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
      <section className="relative h-[220px] overflow-hidden">
        <Image
          src="/images/sports-betting.webp"
          alt="Start betting on cricket"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">
            Start Betting on Cricket Today
          </h2>
          <Link href="/dafabet-registration" className="btn-primary w-full max-w-xs md:w-auto">
            {tCommon('bet_now')}
          </Link>
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
