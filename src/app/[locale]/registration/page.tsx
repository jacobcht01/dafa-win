import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getPageData, extractFaqs } from '@/lib/content'
import { breadcrumb, faqPage, howTo } from '@/lib/structured-data'
import JsonLd from '@/components/JsonLd'
import MarkdownBody from '@/components/MarkdownBody'
import FaqAccordion from '@/components/FaqAccordion'
import BonusBanner from '@/components/BonusBanner'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const page = getPageData(locale, 'dafabet-registration')
  return {
    title: page?.title ?? 'DafaBet India Registration Guide',
    description: page?.description ?? '',
    keywords: page?.keywords,
    alternates: { canonical: `/${locale}/registration/` },
  }
}

export default async function RegistrationPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const page = getPageData(locale, 'dafabet-registration')
  const faqs = page ? extractFaqs(page.body) : []
  const schemas = [
    breadcrumb(locale, 'registration', locale === 'te' ? 'నమోదు' : 'Registration'),
    howTo(locale),
    ...(faqs.length ? [faqPage(faqs)] : []),
  ]
  const isTE = locale === 'te'

  return (
    <>
      <JsonLd schemas={schemas} />

      <section className="bg-dark-gradient py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">📝</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gold-text">
              {isTE ? 'DafaBet ఇండియాలో నమోదు ఎలా చేసుకోవాలి' : 'How to Register at DafaBet India'}
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {isTE
              ? '5 నిమిషాల్లో నమోదు పూర్తి చేయండి. 200% వెల్‌కమ్ బోనస్ స్వయంచాలకంగా పొందండి.'
              : 'Complete registration in 5 minutes and claim your 200% welcome bonus automatically.'}
          </p>
          <a
            href="https://www.dafabet.com/?utm_source=dafawin&utm_content=registration-hero"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="btn-primary text-lg px-8 py-4"
          >
            {isTE ? '📝 ఇప్పుడే నమోదు చేసుకోండి →' : '📝 Register Now →'}
          </a>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              {isTE ? 'నమోదు FAQ' : 'Registration FAQ'}
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        )}
      </div>
    </>
  )
}
