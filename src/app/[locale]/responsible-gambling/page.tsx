import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getPageData, extractFaqs } from '@/lib/content'
import { breadcrumb, faqPage } from '@/lib/structured-data'
import JsonLd from '@/components/JsonLd'
import MarkdownBody from '@/components/MarkdownBody'
import FaqAccordion from '@/components/FaqAccordion'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const page = getPageData(locale, 'responsible-gambling')
  return {
    title: page?.title ?? 'Responsible Gambling — DafaWin',
    description: page?.description ?? '',
    keywords: page?.keywords,
    alternates: { canonical: `/${locale}/responsible-gambling/` },
  }
}

export default async function ResponsibleGamblingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const page = getPageData(locale, 'responsible-gambling')
  const faqs = page ? extractFaqs(page.body) : []
  const schemas = [
    breadcrumb(locale, 'responsible-gambling', 'Responsible Gambling'),
    ...(faqs.length ? [faqPage(faqs)] : []),
  ]
  const isTE = locale === 'te'

  return (
    <>
      <JsonLd schemas={schemas} />

      <section className="bg-dark-gradient py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🛡️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gold-text">
              {isTE ? 'బాధ్యతాయుత జూదం — DafaWin' : 'Responsible Gambling — DafaWin'}
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {isTE
              ? 'సురక్షితంగా ఆడండి. మీ పరిమితులు నిర్ణయించుకోండి మరియు అవసరమైతే సహాయం తీసుకోండి.'
              : 'Play safely. Set your limits, know the risks, and reach out if you need help.'}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Crisis Helpline Box */}
        <div className="bg-red-900/30 border border-red-500/50 rounded-2xl p-6 mb-10">
          <h2 className="text-xl font-bold text-red-300 mb-4">
            {isTE ? '🆘 సహాయ హెల్ప్‌లైన్లు' : '🆘 Crisis Helplines'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-red-900/20 rounded-xl p-4">
              <p className="text-white font-semibold mb-1">Vandrevala Foundation</p>
              <a
                href="tel:18002662345"
                className="text-red-300 font-bold text-lg hover:text-red-200 transition-colors"
              >
                1860-2662-345
              </a>
              <p className="text-gray-400 text-sm mt-1">
                {isTE ? '24/7 ఉచిత సేవ — తెలుగు మరియు ఇంగ్లీష్' : '24/7 free service — Telugu & English'}
              </p>
            </div>
            <div className="bg-red-900/20 rounded-xl p-4">
              <p className="text-white font-semibold mb-1">iCall (TISS)</p>
              <a
                href="tel:9152987821"
                className="text-red-300 font-bold text-lg hover:text-red-200 transition-colors"
              >
                9152987821
              </a>
              <p className="text-gray-400 text-sm mt-1">
                {isTE ? 'మా–శని 8am–10pm, ఉచిత కౌన్సెలింగ్' : 'Mon–Sat 8am–10pm, free counselling'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            {page && <MarkdownBody content={page.body} />}
          </article>
          <aside className="space-y-6">
            {/* Set Limits Card */}
            <div className="card border-green-500/30">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-bold text-white mb-3">
                {isTE ? 'పరిమితులు నిర్ణయించండి' : 'Set Your Limits'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-green-400 shrink-0">✓</span>
                  {isTE ? 'రోజువారీ/వారపు డిపాజిట్ పరిమితి' : 'Daily / weekly deposit limit'}
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400 shrink-0">✓</span>
                  {isTE ? 'సెషన్ సమయ పరిమితి' : 'Session time limit'}
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400 shrink-0">✓</span>
                  {isTE ? 'నష్ట పరిమితి నిర్ణయం' : 'Loss limit threshold'}
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400 shrink-0">✓</span>
                  {isTE ? 'రియాలిటీ చెక్ రిమైండర్లు' : 'Reality check reminders'}
                </li>
              </ul>
              <a
                href="https://www.dafabet.com/en/responsible-gambling?utm_source=dafawin&utm_content=set-limits"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="btn-secondary w-full justify-center mt-4 text-sm"
              >
                {isTE ? 'పరిమితులు సెట్ చేయండి →' : 'Set Limits on DafaBet →'}
              </a>
            </div>

            {/* Self-Exclusion Card */}
            <div className="card border-orange-500/30">
              <div className="text-3xl mb-3">🚫</div>
              <h3 className="font-bold text-white mb-3">
                {isTE ? 'స్వీయ-మినహాయింపు' : 'Self-Exclusion'}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {isTE
                  ? 'నిర్ణీత కాలానికి (30 రోజులు నుండి శాశ్వతంగా) మీ ఖాతాను తాత్కాలికంగా లేదా శాశ్వతంగా నిలిపివేయండి.'
                  : 'Temporarily or permanently suspend your account for a set period — 30 days to permanent exclusion.'}
              </p>
              <ul className="space-y-2 text-sm text-gray-400 mb-4">
                <li className="flex gap-2">
                  <span className="text-orange-400 shrink-0">→</span>
                  {isTE ? '30 రోజుల తాత్కాలిక నిలుపుదల' : '30-day cooling-off period'}
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-400 shrink-0">→</span>
                  {isTE ? '3 నెలల / 6 నెలల మినహాయింపు' : '3-month / 6-month exclusion'}
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-400 shrink-0">→</span>
                  {isTE ? 'శాశ్వత ఖాతా మూసివేత' : 'Permanent account closure'}
                </li>
              </ul>
              <a
                href="https://www.dafabet.com/en/responsible-gambling?utm_source=dafawin&utm_content=self-exclusion"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="btn-secondary w-full justify-center text-sm"
              >
                {isTE ? 'స్వీయ-మినహాయింపు వినతి →' : 'Request Self-Exclusion →'}
              </a>
            </div>
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
      </div>
    </>
  )
}
