import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'casino' })
  return { title: t('title'), description: t('description') }
}

function CasinoContent() {
  const t = useTranslations('casino')
  const tCommon = useTranslations('common')

  return (
    <>
      <section className="bg-dark-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6">🎰</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gold-text">{t('hero_title')}</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">{t('hero_subtitle')}</p>
          <Link href="/registration" className="btn-primary text-lg px-8 py-4">
            {tCommon('join_now')}
          </Link>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {['Live Roulette', 'Blackjack', 'Baccarat', 'Slots'].map((game) => (
            <div key={game} className="card hover:border-gold-500/50 transition-colors text-center">
              <h3 className="text-lg font-semibold text-gold-400 mb-2">{game}</h3>
              <p className="text-gray-400 text-sm">Play with live dealers 24/7.</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default async function CasinoPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <CasinoContent />
}
