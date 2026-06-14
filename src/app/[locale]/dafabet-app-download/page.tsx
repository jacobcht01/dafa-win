import type { Metadata } from 'next'
import Image from 'next/image'
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
    {
      name: 'Enable unknown sources',
      text: 'Go to Settings → Security → Enable "Install from unknown sources" to allow APK installation outside Google Play.',
    },
    {
      name: 'Download the APK',
      text: 'Open the DafaBet mobile site in your browser and tap "Download App" or "Android APK" from the menu.',
    },
    {
      name: 'Open the downloaded file',
      text: 'Once the APK file has downloaded, open it from your notifications bar or Downloads folder.',
    },
    {
      name: 'Install the app',
      text: 'Tap Install and wait approximately 30 seconds for the installation to complete.',
    },
    {
      name: 'Log in or register',
      text: 'Open the DafaBet app and log in with your existing account, or register a new account directly in the app.',
    },
  ]

  const faqs = [
    { question: 'Is the DafaBet app free?', answer: 'Yes, free to download on Android and iOS. There are no download or installation fees.' },
    { question: 'How do I download DafaBet on Android?', answer: 'Download the APK from the DafaBet mobile site. You need to enable "Install from unknown sources" in Settings → Security first, since the app is not on Google Play.' },
    { question: 'Is there a DafaBet iOS app?', answer: 'iOS users can use DafaBet via Safari with full mobile functionality. Open dafabet.com in Safari, tap Share, and choose "Add to Home Screen" for an app-like experience.' },
    { question: 'What can I do in the DafaBet app?', answer: 'Bet on all sports including cricket and IPL, play live casino games, deposit via UPI, and withdraw — all within the app.' },
    { question: 'Is the DafaBet app safe?', answer: 'Yes, the app uses the same SSL encryption and account security as the desktop site. Download only from dafabet.com directly — never from third-party APK sites or Telegram.' },
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

      {/* Hero with image */}
      <section className="relative h-[350px] md:h-[420px] flex items-center overflow-hidden">
        <Image
          src="/images/app-download.webp"
          alt="DafaBet App Download"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="red-badge mb-4 inline-block">FREE DOWNLOAD</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gold-text">DafaBet App Download 2026 — Android APK &amp; iOS</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-xl">
            Download the DafaBet mobile app for Android (APK) and iOS. Bet on IPL, cricket, and casino games anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#android" className="btn-primary text-lg px-8 py-4">Download Android APK</a>
            <a href="#ios" className="btn-secondary text-lg px-8 py-4">iOS Instructions</a>
          </div>
        </div>
      </section>

      {/* Download sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Android APK */}
          <div id="android" className="card border-brand-gold/30">
            <h2 className="text-2xl font-bold text-white mb-2">Android APK Download</h2>
            <p className="text-gray-400 text-sm mb-5">
              DafaBet is not on Google Play. Download the APK directly from the DafaBet site.
            </p>
            <ol className="space-y-4 text-gray-300">
              {androidSteps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-brand-gold font-bold flex-shrink-0">{i + 1}.</span>
                  <span>{s.text}</span>
                </li>
              ))}
            </ol>
            <button className="btn-primary w-full mt-6">{tCommon('download_now')}</button>
          </div>

          {/* iOS */}
          <div id="ios" className="card border-brand-gold/30">
            <h2 className="text-2xl font-bold text-white mb-2">iOS Instructions</h2>
            <p className="text-gray-400 text-sm mb-5">
              iOS users can access DafaBet via the Safari browser on iPhone/iPad without an app download.
              Add to Home Screen from the share menu for an app-like experience.
            </p>
            <ol className="space-y-4 text-gray-300">
              <li className="flex gap-3"><span className="text-brand-gold font-bold flex-shrink-0">1.</span> Open Safari on your iPhone or iPad and go to dafabet.com</li>
              <li className="flex gap-3"><span className="text-brand-gold font-bold flex-shrink-0">2.</span> Tap the Share button (box with arrow) at the bottom of Safari</li>
              <li className="flex gap-3"><span className="text-brand-gold font-bold flex-shrink-0">3.</span> Choose &quot;Add to Home Screen&quot; and confirm</li>
              <li className="flex gap-3"><span className="text-brand-gold font-bold flex-shrink-0">4.</span> The DafaBet icon appears on your home screen — tap to launch as a Progressive Web App</li>
              <li className="flex gap-3"><span className="text-brand-gold font-bold flex-shrink-0">5.</span> Log in or register and start betting. Full cashier, sportsbook and casino work inside it.</li>
            </ol>
            <button className="btn-secondary w-full mt-6">{tCommon('download_now')}</button>
          </div>
        </div>
      </section>

      {/* QR Code placeholder */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="card border-brand-gold/30 text-center py-8">
          <h3 className="text-lg font-bold text-white mb-2">Scan to Download</h3>
          <p className="text-gray-400 text-sm mb-4">Point your camera at the QR code to download the app instantly</p>
          <div className="inline-flex items-center justify-center w-32 h-32 bg-brand-surface border-2 border-brand-gold rounded-xl mx-auto">
            <span className="text-4xl">📱</span>
          </div>
          <p className="text-gray-500 text-xs mt-3">QR Code — DafaBet App</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="section-title mb-8">App Download FAQ</h2>
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

export default async function AppDownloadPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <AppDownloadContent locale={locale} />
}
