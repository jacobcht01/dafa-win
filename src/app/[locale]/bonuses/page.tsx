import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'bonuses' })
  return { title: t('title'), description: t('description') }
}

function BonusesContent() {
  const t = useTranslations('bonuses')
  const tCommon = useTranslations('common')

  return (
    <>
      <section className="bg-dark-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6">💰</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gold-text">{t('hero_title')}</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">{t('hero_subtitle')}</p>
          <Link href="/registration" className="btn-primary text-lg px-8 py-4">
            {tCommon('claim_bonus')}
          </Link>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Welcome Bonus', desc: '100% deposit match up to ₹10,000 for new players.' },
            { title: 'Reload Bonus', desc: '50% bonus on every reload deposit, up to ₹5,000.' },
            { title: 'Cashback Offer', desc: '10% weekly cashback on net losses, credited every Monday.' },
          ].map((bonus) => (
            <div key={bonus.title} className="card border-gold-500/30 hover:border-gold-500 transition-colors">
              <h3 className="text-xl font-semibold text-gold-400 mb-3">{bonus.title}</h3>
              <p className="text-gray-300 mb-4">{bonus.desc}</p>
              <Link href="/registration" className="btn-primary w-full justify-center">
                {tCommon('claim_bonus')}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default async function BonusesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <BonusesContent />
}
