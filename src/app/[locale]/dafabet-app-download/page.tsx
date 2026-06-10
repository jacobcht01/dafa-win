import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { JsonLd } from '@/components/JsonLd'
import { howToSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'app' })
  const alts = pageAlternates(locale, '/dafabet-app-download/')
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: alts.canonical, languages: alts.languages },
  }
}

function AppDownloadContent({ locale }: { locale: string }) {
  const t = useTranslations('app')
  const tCommon = useTranslations('common')

  const pageUrl = locale === 'te' ? `${SITE_URL}/te/dafabet-app-download/` : `${SITE_URL}/dafabet-app-download/`

  const androidSteps = [
    { name: 'Allow unknown sources', text: 'In Android Settings > Security, enable "Install from unknown sources" to allow APK installation.' },
    { name: 'Download APK', text: 'Visit the DafaBet India website and click the Android APK download button.' },
    { name: 'Install the APK', text: 'Open the downloaded APK file from your notifications or file manager and tap Install.' },
    { name: 'Login or Register', text: 'Open the DafaBet app, log in with your existing account or register a new account.' },
  ]

  const faqs = [
    { question: 'Is the DafaBet app free to download?', answer: 'Yes, the DafaBet app is completely free to download for both Android and iOS.' },
    { question: 'How do I download DafaBet on Android?', answer: 'Enable "Install from unknown sources" in Settings, then download the APK from the DafaBet India website and install it.' },
    { question: 'Is the DafaBet app available on Google Play?', answer: 'No. Due to Google Play policies on gambling apps, DafaBet is available as a direct APK download for Android.' },
    { question: 'What are the system requirements for the DafaBet app?', answer: 'Android 6.0 or higher, or iOS 13 or higher. Minimum 50MB free storage required.' },
    { question: 'Can I bet on cricket and IPL on the app?', answer: 'Yes. The DafaBet app supports full cricket and IPL betting with live in-play markets.' },
  ]

  const schemaData = [
    howToSchema({
      name: 'How to Download the DafaBet App on Android',
      description: 'Step-by-step guide to downloading and installing the DafaBet India Android APK.',
      steps: androidSteps,
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL + '/' },
      { name: 'App Download', url: pageUrl },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemaData} />
      <section className="bg-dark-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6">📱</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gold-text">{t('hero_title')}</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">{t('hero_subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#android" className="btn-primary text-lg px-8 py-4">Android APK</a>
            <a href="#ios" className="btn-secondary text-lg px-8 py-4">iOS App</a>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div id="android" className="card border-gold-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Android Download</h2>
            <ol className="space-y-3 text-gray-300">
              {androidSteps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-gold-400 font-bold">{i + 1}.</span> {s.text}
                </li>
              ))}
            </ol>
            <button className="btn-primary w-full mt-6">{tCommon('download_now')}</button>
          </div>
          <div id="ios" className="card border-gold-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">iOS Download</h2>
            <ol className="space-y-3 text-gray-300">
              <li className="flex gap-3"><span className="text-gold-400 font-bold">1.</span> Open the App Store on your iPhone or iPad</li>
              <li className="flex gap-3"><span className="text-gold-400 font-bold">2.</span> Search for &quot;DafaBet&quot;</li>
              <li className="flex gap-3"><span className="text-gold-400 font-bold">3.</span> Tap Get and install the app</li>
              <li className="flex gap-3"><span className="text-gold-400 font-bold">4.</span> Login or register and start betting</li>
            </ol>
            <button className="btn-primary w-full mt-6">{tCommon('download_now')}</button>
          </div>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="section-title mb-8">App Download FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="card">
              <summary className="font-semibold text-white cursor-pointer list-none flex justify-between">
                {faq.question}<span className="text-gold-400">+</span>
              </summary>
              <p className="text-gray-400 mt-3 text-sm">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}

export default async function AppDownloadPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <AppDownloadContent locale={locale} />
}
