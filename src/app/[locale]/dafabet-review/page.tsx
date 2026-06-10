import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { JsonLd } from '@/components/JsonLd'
import { reviewSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'review' })
  const alts = pageAlternates(locale, '/dafabet-review/')
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: alts.canonical, languages: alts.languages },
  }
}

function ReviewContent({ locale }: { locale: string }) {
  const t = useTranslations('review')
  const tCommon = useTranslations('common')

  const pageUrl = locale === 'te' ? `${SITE_URL}/te/dafabet-review/` : `${SITE_URL}/dafabet-review/`

  const faqs = [
    { question: 'Is DafaBet safe and legit in India?', answer: 'Yes. DafaBet operates under a valid Curaçao eGaming licence and has been serving Indian players since 2004. Funds are kept in segregated accounts.' },
    { question: 'What rating does DafaBet get?', answer: 'DafaWin rates DafaBet India 4.5/5, with particular strengths in cricket odds, UPI payment speed, and welcome bonuses.' },
    { question: 'Does DafaBet accept UPI payments?', answer: 'Yes. DafaBet India supports UPI, PhonePe, Paytm, Google Pay, and Net Banking with instant deposits.' },
    { question: 'What is the welcome bonus at DafaBet India?', answer: 'New players can claim a 100% deposit match bonus up to ₹10,000 on their first deposit.' },
    { question: 'How do I contact DafaBet customer support in India?', answer: 'DafaBet offers 24/7 live chat and email support in English and Hindi. Response time is typically under 5 minutes.' },
  ]

  const schemaData = [
    reviewSchema({
      name: t('title'),
      description: t('description'),
      url: pageUrl,
      ratingValue: 4.5,
      ratingCount: 312,
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL + '/' },
      { name: 'DafaBet Review', url: pageUrl },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemaData} />
      <section className="bg-dark-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6">⭐</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gold-text">{t('hero_title')}</span>
          </h1>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">{t('hero_subtitle')}</p>
          <div className="flex justify-center gap-1 mb-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-gold-400 text-3xl">★</span>
            ))}
            <span className="text-gray-400 text-xl ml-2 self-center">4.5/5</span>
          </div>
          <Link href="/dafabet-registration" className="btn-primary text-lg px-8 py-4">
            {tCommon('join_now')}
          </Link>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Sports Coverage', score: '9/10', desc: 'Cricket, football, kabaddi, tennis, and 20+ sports.' },
            { label: 'Odds Quality', score: '8.5/10', desc: 'Competitive margins, especially on cricket and football.' },
            { label: 'Bonuses & Promos', score: '9/10', desc: 'Generous welcome bonus + regular reload offers.' },
            { label: 'Payments', score: '9.5/10', desc: 'All major Indian payment methods, instant withdrawals.' },
            { label: 'Mobile App', score: '8/10', desc: 'Clean, fast Android and iOS apps.' },
            { label: 'Customer Support', score: '8/10', desc: '24/7 live chat and email support.' },
          ].map((item) => (
            <div key={item.label} className="card">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-white">{item.label}</h3>
                <span className="text-gold-400 font-bold">{item.score}</span>
              </div>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default async function ReviewPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ReviewContent locale={locale} />
}
