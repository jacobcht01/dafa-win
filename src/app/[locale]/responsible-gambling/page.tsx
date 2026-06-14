import type { Metadata } from 'next'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { JsonLd } from '@/components/JsonLd'
import { faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'rg' })
  const alts = pageAlternates(locale, '/responsible-gambling/')
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: alts.canonical,
      languages: alts.languages,
    },
  }
}

function ResponsibleGamblingContent({ locale }: { locale: string }) {
  const t = useTranslations('rg')

  const faqs = [
    {
      question: 'How can I set deposit limits at DafaBet?',
      answer: 'Log in, go to Account Settings > Responsible Gambling, and set daily, weekly, or monthly deposit limits. Changes to lower limits take effect immediately; increases may have a cooling period.',
    },
    {
      question: 'Can I self-exclude from DafaBet?',
      answer: 'Yes. Use account settings or contact DafaBet support to request 6 months, 1 year, or permanent self-exclusion. A permanent self-exclusion cannot be reopened on a whim — it is designed to be a firm commitment.',
    },
    {
      question: 'Where can I get help for gambling addiction in India?',
      answer: 'Vandrevala Foundation: +91 9999 666 555 (24/7, free, phone and WhatsApp). iCall, TISS Mumbai: 9152987821 (Mon–Sat, 10am–8pm). AASRA: 022-2754 6669 (24/7 crisis support).',
    },
    {
      question: 'What is problem gambling?',
      answer: 'When betting interferes with finances, relationships, or mental health — chasing losses, hiding gambling from family, borrowing to fund deposits, or being unable to stop despite wanting to.',
    },
    {
      question: 'What is the minimum gambling age at DafaBet?',
      answer: '18 years. The Indian Contract Act sets 18 as the legal contracting age. Verify DafaBet\'s current terms for the most up-to-date requirement before registering.',
    },
  ]

  const isTE = locale === 'te'
  const pageUrl = isTE ? `${SITE_URL}/te/responsible-gambling/` : `${SITE_URL}/responsible-gambling/`

  const schemaData = [
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL + '/' },
      { name: 'Responsible Gambling', url: pageUrl },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Hero with image */}
      <section className="relative h-[320px] md:h-[380px] flex items-center overflow-hidden">
        <Image
          src="/images/responsible-gambling.webp"
          alt="Responsible Gambling"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gold-text">Responsible Gambling</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            DafaBet is the operator we recommend. This is what a friend who reads the small print would tell you.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Warning notice */}
        <div className="card border-red-500/30 mb-8 text-center">
          <p className="text-lg font-semibold text-white mb-2">
            {isTE
              ? '18+ మాత్రమే. జూదంలో ఆర్థిక నష్టం ఉంటుంది. బాధ్యతాయుతంగా బెట్ చేయండి.'
              : '18+ only. Gambling involves financial risk. Please bet responsibly.'}
          </p>
          <p className="text-brand-gold font-bold text-lg">
            Vandrevala Foundation: +91 9999 666 555 (24/7, Free, Confidential)
          </p>
        </div>

        {/* The Math section */}
        <div className="mb-12">
          <h2 className="section-title mb-2">The Math</h2>
          <p className="text-gray-400 text-sm mb-6">
            Every game is designed so the house profits over time. The numbers below are not hidden — they are in the rules. Knowing them does not help you win; it helps you decide how much to play.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-brand-surface">
              <p className="text-brand-gold font-bold text-lg mb-2">European Roulette</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                2.7% house edge — ₹2.70 stays with the house for every ₹100 put through. American roulette is 5.26%.
              </p>
            </div>
            <div className="card bg-brand-surface">
              <p className="text-brand-gold font-bold text-lg mb-2">Online Slots</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                3–5% house edge taken on every spin. Typical RTP is 95–97%.
              </p>
            </div>
            <div className="card bg-brand-surface">
              <p className="text-brand-gold font-bold text-lg mb-2">Sportsbook</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                102–104% overround on sharp markets. Soft markets (props, lower-tier) often 110%+.
              </p>
            </div>
          </div>
        </div>

        {/* Set Your Limits section */}
        <div className="mb-12">
          <h2 className="section-title mb-2">Set Your Limits</h2>
          <p className="text-gray-400 text-sm mb-6">
            DafaBet provides limit tools in account settings. Use them before you need them.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-brand-surface">
              <p className="text-brand-gold font-bold text-lg mb-2">Deposit Limit</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Set this to what you would not miss if you lost it — not what you can technically afford. Those are different numbers.
              </p>
            </div>
            <div className="card bg-brand-surface">
              <p className="text-brand-gold font-bold text-lg mb-2">Loss Limit</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                The point at which you stop. No &quot;one more bet to get back to even.&quot;
              </p>
            </div>
            <div className="card bg-brand-surface">
              <p className="text-brand-gold font-bold text-lg mb-2">Session Limit</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                A clock, not a feeling. Two hours is two hours, no matter how the cards run.
              </p>
            </div>
          </div>
        </div>

        {/* Cooling Off & Self-Exclusion section */}
        <div className="mb-12">
          <h2 className="section-title mb-2">Cooling Off &amp; Self-Exclusion</h2>
          <p className="text-gray-400 text-sm mb-6">
            Both tools are available in your DafaBet account settings or via support. Neither requires a reason — they are there to use.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-brand-surface">
              <p className="text-brand-gold font-bold text-lg mb-2">Cooling-Off</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                24 hours to 30 days. DafaBet locks your account; you cannot bet. Use when you need a clean break.
              </p>
            </div>
            <div className="card bg-brand-surface">
              <p className="text-brand-gold font-bold text-lg mb-2">Self-Exclusion</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                6 months, 1 year, or permanent. Cannot be reopened on a whim. Use when betting has stopped being fun.
              </p>
            </div>
          </div>
        </div>

        {/* Warning Signs section */}
        <div className="mb-12">
          <h2 className="section-title mb-4">Warning Signs</h2>
          <div className="card border-red-500/20">
            <p className="text-gray-300 text-sm leading-relaxed">
              Patterns worth taking seriously: betting more than you meant to, hiding amounts from family, borrowing to fund the next deposit, needing to bet to feel normal, anger after losses that lasts past the next morning, promising to stop and not stopping.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              If any of these sound familiar, the helplines below are a good first call. They are free and confidential.
            </p>
          </div>
        </div>

        {/* Helplines */}
        <div className="card border-brand-gold/30 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Get Help in India</h2>
          <ul className="space-y-4 text-gray-300">
            <li>
              <strong className="text-brand-gold">Vandrevala Foundation:</strong>{' '}
              +91 9999 666 555 — 24/7, phone and WhatsApp, free and confidential
            </li>
            <li>
              <strong className="text-brand-gold">AASRA:</strong>{' '}
              022-2754 6669 — 24/7, suicide prevention and crisis support
            </li>
            <li>
              <strong className="text-brand-gold">iCall, TISS Mumbai:</strong>{' '}
              9152987821 — Mon–Sat, 10am–8pm, psycho-social support
            </li>
            <li>
              <strong className="text-brand-gold">Emergency:</strong>{' '}
              112
            </li>
          </ul>
        </div>

        {/* Helpline callout box */}
        <div className="card border-brand-gold/40 bg-brand-surface mb-12 text-center py-6">
          <h3 className="text-lg font-bold text-white mb-3">National Helplines</h3>
          <p className="text-brand-gold font-semibold mb-1">Vandrevala Foundation: +91 9999 666 555</p>
          <p className="text-brand-gold font-semibold mb-1">AASRA: 022-2754 6669</p>
          <p className="text-brand-gold font-semibold mb-1">iCall: 9152987821</p>
          <p className="text-brand-gold font-semibold">Emergency: 112</p>
          <p className="text-gray-500 text-xs mt-3">Free, confidential support available</p>
        </div>

        {/* FAQ */}
        <h2 className="section-title mb-8">FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="card">
              <summary className="flex justify-between items-start cursor-pointer list-none py-1">
                <span className="font-semibold text-white">{faq.question}</span>
                <span className="text-brand-gold text-xl flex-shrink-0 ml-4">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}

export default async function ResponsibleGamblingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ResponsibleGamblingContent locale={locale} />
}
