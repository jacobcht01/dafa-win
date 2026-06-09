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
  const page = getPageData(locale, 'dafabet-app-download')
  return {
    title: page?.title ?? 'DafaBet App Download India 2025',
    description: page?.description ?? '',
    keywords: page?.keywords,
    alternates: { canonical: `/${locale}/app-download/` },
  }
}

const PLATFORMS_EN = [
  {
    id: 'android',
    title: 'Android APK Download',
    icon: '🤖',
    details: [
      { label: 'File Size', value: '5 MB' },
      { label: 'Requires', value: 'Android 5.0+' },
      { label: 'Type', value: 'Direct APK' },
    ],
    steps: [
      'Go to Settings → Security → enable "Unknown Sources"',
      'Tap the Download APK button below',
      'Open the downloaded file and tap Install',
      'Log in or register and start betting',
    ],
    cta: 'Download Android APK',
    utmContent: 'app-android',
  },
  {
    id: 'ios',
    title: 'iOS App Download',
    icon: '🍎',
    details: [
      { label: 'Platform', value: 'App Store' },
      { label: 'Requires', value: 'iOS 12+' },
      { label: 'Type', value: 'App Store' },
    ],
    steps: [
      'Open the App Store on your iPhone or iPad',
      'Search for "DafaBet" or tap the link below',
      'Tap Get and complete installation',
      'Log in or register and start betting',
    ],
    cta: 'Get on App Store',
    utmContent: 'app-ios',
  },
]

const PLATFORMS_TE = [
  {
    id: 'android',
    title: 'Android APK డౌన్‌లోడ్',
    icon: '🤖',
    details: [
      { label: 'ఫైల్ సైజ్', value: '5 MB' },
      { label: 'Android', value: '5.0+' },
      { label: 'రకం', value: 'డైరెక్ట్ APK' },
    ],
    steps: [
      'Settings → Security → "Unknown Sources" ఎనేబుల్ చేయండి',
      'దిగువ Download APK బటన్ నొక్కండి',
      'డౌన్‌లోడ్ అయిన ఫైల్ తెరచి Install చేయండి',
      'లాగిన్ చేయండి లేదా రిజిస్టర్ చేసి బెట్టింగ్ ప్రారంభించండి',
    ],
    cta: 'Android APK డౌన్‌లోడ్',
    utmContent: 'app-android-te',
  },
  {
    id: 'ios',
    title: 'iOS యాప్ డౌన్‌లోడ్',
    icon: '🍎',
    details: [
      { label: 'ప్లాట్‌ఫారమ్', value: 'App Store' },
      { label: 'iOS', value: '12+' },
      { label: 'రకం', value: 'App Store' },
    ],
    steps: [
      'iPhone లేదా iPad లో App Store తెరవండి',
      '"DafaBet" వెతకండి లేదా దిగువ లింక్ నొక్కండి',
      'Get నొక్కి ఇన్‌స్టాల్ పూర్తి చేయండి',
      'లాగిన్ చేయండి లేదా రిజిస్టర్ చేసి బెట్టింగ్ ప్రారంభించండి',
    ],
    cta: 'App Store లో పొందండి',
    utmContent: 'app-ios-te',
  },
]

export default async function AppDownloadPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const page = getPageData(locale, 'dafabet-app-download')
  const faqs = page ? extractFaqs(page.body) : []
  const schemas = [
    breadcrumb(locale, 'app-download', 'App Download'),
    ...(faqs.length ? [faqPage(faqs)] : []),
  ]
  const isTE = locale === 'te'
  const platforms = isTE ? PLATFORMS_TE : PLATFORMS_EN

  return (
    <>
      <JsonLd schemas={schemas} />

      <section className="bg-dark-gradient py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">📱</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gold-text">
              {isTE ? 'దఫాబెట్ యాప్ డౌన్‌లోడ్ 2025' : 'DafaBet App Download India 2025'}
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {isTE
              ? 'Android APK మరియు iOS కోసం అధికారిక DafaBet యాప్ — వేగవంతమైన బెట్టింగ్, లైవ్ ఆడ్స్, UPI డిపాజిట్.'
              : 'Official DafaBet app for Android & iOS — fast betting, live odds, UPI deposits, instant withdrawals.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://www.dafabet.com/?utm_source=dafawin&utm_content=${isTE ? 'app-android-te' : 'app-android'}`}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="btn-primary text-lg px-8 py-4"
            >
              {isTE ? '🤖 Android APK డౌన్‌లోడ్' : '🤖 Download Android APK'}
            </a>
            <a
              href={`https://www.dafabet.com/?utm_source=dafawin&utm_content=${isTE ? 'app-ios-te' : 'app-ios'}`}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="btn-secondary text-lg px-8 py-4"
            >
              {isTE ? '🍎 iOS యాప్' : '🍎 Get iOS App'}
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          {isTE ? 'ప్లాట్‌ఫారమ్ ఎంచుకోండి' : 'Choose Your Platform'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {platforms.map((platform) => (
            <div key={platform.id} id={platform.id} className="card border-gold-500/30">
              <div className="text-4xl mb-3">{platform.icon}</div>
              <h3 className="text-xl font-bold text-white mb-4">{platform.title}</h3>
              <div className="flex gap-4 mb-5">
                {platform.details.map((d) => (
                  <div key={d.label} className="text-center">
                    <p className="text-xs text-gray-500 mb-1">{d.label}</p>
                    <p className="text-sm font-semibold text-gold-400">{d.value}</p>
                  </div>
                ))}
              </div>
              <ol className="space-y-2 mb-6">
                {platform.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-gray-300 text-sm">
                    <span className="text-gold-400 font-bold shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
              <a
                href={`https://www.dafabet.com/?utm_source=dafawin&utm_content=${platform.utmContent}`}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                {platform.cta}
              </a>
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
