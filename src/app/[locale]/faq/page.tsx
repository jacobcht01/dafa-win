import type { Metadata } from 'next'
import { pageAlternates } from '@/lib/seo'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq' })
  const alts = pageAlternates(locale, '/faq//')
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: alts.canonical, languages: alts.languages },
  }
}

const FAQ_GROUPS = [
  {
    category: 'Sports Betting',
    faqs: [
      { q: 'What sports can I bet on?', a: 'Cricket, football, kabaddi, tennis, basketball, volleyball, and many more sports.' },
      { q: 'Does DafaWin offer live sports betting?', a: 'Yes, DafaWin offers comprehensive live in-play betting with real-time odds across all major sports.' },
    ],
  },
  {
    category: 'Casino',
    faqs: [
      { q: 'Is DafaWin legal in India?', a: 'DafaWin operates under international gaming licenses. Online sports betting exists in a legal grey area in India — individual states have varying laws. Always check your local laws before betting.' },
      { q: 'How do I claim the welcome bonus?', a: 'Register a new account, make your first deposit, and the 100% match bonus (up to ₹10,000) is credited automatically.' },
    ],
  },
  {
    category: 'Payments',
    faqs: [
      { q: 'How do I deposit money on DafaWin?', a: 'DafaWin accepts UPI, Paytm, PhonePe, IMPS, and NetBanking. All deposits are instant and secure.' },
      { q: 'How long do withdrawals take?', a: 'UPI and wallet withdrawals are processed within 1-4 hours. Bank transfers take 1-3 business days.' },
      { q: 'What is the minimum deposit?', a: 'The minimum deposit on DafaWin is ₹100 for UPI and Paytm. NetBanking minimum is ₹500.' },
    ],
  },
  {
    category: 'Account',
    faqs: [
      { q: 'Does DafaWin have a mobile app?', a: 'Yes, DafaWin has apps for both Android (APK) and iOS. Download from our App Download page.' },
      { q: 'Is my personal data safe with DafaWin?', a: 'Yes, DafaWin uses SSL encryption and follows data protection best practices to keep your information secure.' },
    ],
  },
]

const allFaqs = FAQ_GROUPS.flatMap((g) => g.faqs)

function FaqContent() {
  const t = useTranslations('faq')

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-brand-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="gold-text">{t('hero_title')}</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('hero_subtitle')}</p>
        </div>
      </section>

      {/* FAQ groups */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-10">
          {FAQ_GROUPS.map((group) => (
            <div key={group.category}>
              <div className="mb-4">
                <span className="red-badge">{group.category}</span>
              </div>
              <div className="space-y-3">
                {group.faqs.map((faq) => (
                  <details key={faq.q} className="card mb-3 group">
                    <summary className="flex justify-between items-start cursor-pointer list-none py-1">
                      <span className="font-semibold text-white">{faq.q}</span>
                      <span className="text-brand-gold text-xl flex-shrink-0 ml-4">+</span>
                    </summary>
                    <p className="text-gray-400 text-sm mt-3 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <FaqContent />
}
