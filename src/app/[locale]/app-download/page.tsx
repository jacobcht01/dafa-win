import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'app' })
  return { title: t('title'), description: t('description') }
}

function AppDownloadContent() {
  const t = useTranslations('app')
  const tCommon = useTranslations('common')

  return (
    <>
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
              <li className="flex gap-3"><span className="text-gold-400 font-bold">1.</span> Allow installation from unknown sources in Settings</li>
              <li className="flex gap-3"><span className="text-gold-400 font-bold">2.</span> Click the Download APK button below</li>
              <li className="flex gap-3"><span className="text-gold-400 font-bold">3.</span> Open the downloaded file and install</li>
              <li className="flex gap-3"><span className="text-gold-400 font-bold">4.</span> Login or register and start betting</li>
            </ol>
            <button className="btn-primary w-full mt-6">{tCommon('download_now')}</button>
          </div>
          <div id="ios" className="card border-gold-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">iOS Download</h2>
            <ol className="space-y-3 text-gray-300">
              <li className="flex gap-3"><span className="text-gold-400 font-bold">1.</span> Open the App Store on your iPhone or iPad</li>
              <li className="flex gap-3"><span className="text-gold-400 font-bold">2.</span> Search for &quot;DafaWin&quot;</li>
              <li className="flex gap-3"><span className="text-gold-400 font-bold">3.</span> Tap Get and install the app</li>
              <li className="flex gap-3"><span className="text-gold-400 font-bold">4.</span> Login or register and start betting</li>
            </ol>
            <button className="btn-primary w-full mt-6">{tCommon('download_now')}</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default async function AppDownloadPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <AppDownloadContent />
}
