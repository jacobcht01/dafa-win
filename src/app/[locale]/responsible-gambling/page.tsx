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
    { question: 'How can I set deposit limits at DafaBet?', answer: 'Log in to your DafaBet account, go to Account Settings > Responsible Gambling, and set daily, weekly, or monthly deposit limits.' },
    { question: 'Can I self-exclude from DafaBet?', answer: 'Yes. Contact DafaBet customer support to request a self-exclusion period of 6 months, 1 year, or permanently.' },
    { question: 'Where can I get help for gambling addiction in India?', answer: 'Call the Vandrevala Foundation helpline: 1860-2662-345 (24/7, free, confidential). iCall also offers support at 9152987821.' },
    { question: 'What is problem gambling?', answer: 'Problem gambling is when betting interferes with your finances, relationships, or mental health. Signs include chasing losses, hiding gambling from others, and inability to stop.' },
    { question: 'How do I take a gambling break?', answer: 'Use the cool-off feature in your DafaBet account settings to take a break of 24 hours, 7 days, or 30 days.' },
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
            <span className="gold-text">{t('hero_title')}</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{t('hero_subtitle')}</p>
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
            Vandrevala Foundation: 1860-2662-345 (24/7, Free, Confidential)
          </p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            { title: 'Deposit Limits', desc: 'Set daily, weekly, or monthly deposit limits to control your spending.', icon: '💳' },
            { title: 'Self-Exclusion', desc: 'Request a self-exclusion period of 6 months, 1 year, or permanently.', icon: '🚫' },
            { title: 'Cool-Off Period', desc: 'Take a break of 24 hours, 7 days, or 30 days from betting.', icon: '⏸️' },
            { title: 'Reality Check', desc: 'Set reminders to track how long you have been playing.', icon: '⏰' },
          ].map((tool) => (
            <div key={tool.title} className="card">
              <div className="text-3xl mb-3">{tool.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
              <p className="text-gray-400 text-sm">{tool.desc}</p>
            </div>
          ))}
        </div>

        {/* Helplines */}
        <div className="card border-brand-gold/30 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Get Help in India</h2>
          <ul className="space-y-3 text-gray-300">
            <li>
              <strong className="text-brand-gold">Vandrevala Foundation:</strong>{' '}
              1860-2662-345 — 24/7 helpline, free, available in Telugu
            </li>
            <li>
              <strong className="text-brand-gold">iCall:</strong>{' '}
              9152987821 — Psycho-social support, available in Telugu
            </li>
          </ul>
        </div>

        {/* Helpline verdict box */}
        <div className="card border-brand-gold/40 bg-brand-surface mb-12 text-center py-6">
          <h3 className="text-lg font-bold text-white mb-3">National Helplines</h3>
          <p className="text-brand-gold font-semibold mb-1">iCall Helpline: 9152987821</p>
          <p className="text-brand-gold font-semibold">Vandrevala Foundation: 1860-2662-345</p>
          <p className="text-gray-500 text-xs mt-3">Free, confidential support available 24/7</p>
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
