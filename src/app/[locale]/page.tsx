import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { JsonLd } from '@/components/JsonLd'
import { organizationSchema, websiteSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  const alts = pageAlternates(locale, '/')
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: alts.canonical,
      languages: alts.languages,
    },
  }
}

function HomePageContent({ locale }: { locale: string }) {
  const t = useTranslations('home')
  const tCommon = useTranslations('common')

  const schemaData = [
    organizationSchema(),
    websiteSchema(),
    breadcrumbSchema([{ name: 'Home', url: SITE_URL + '/' }]),
  ]

  return (
    <>
      <JsonLd data={schemaData} />
      <section className="relative bg-dark-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-900/20 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="gold-text">{t('hero_title')}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dafabet-registration" className="btn-primary text-lg px-8 py-4">
                {t('cta_register')}
              </Link>
              <Link href="/dafabet-app-download" className="btn-secondary text-lg px-8 py-4">
                {t('cta_download')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="section-title text-center mb-12">{t('features_title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: t('feature_odds'), desc: t('feature_odds_desc'), icon: '🎯' },
            { title: t('feature_bonus'), desc: t('feature_bonus_desc'), icon: '🎁' },
            { title: t('feature_payment'), desc: t('feature_payment_desc'), icon: '💳' },
            { title: t('feature_support'), desc: t('feature_support_desc'), icon: '🎧' },
          ].map((feature) => (
            <div key={feature.title} className="card hover:border-gold-500/50 transition-colors duration-200">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Sports &amp; Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { href: '/cricket-betting', label: 'Cricket', icon: '🏏' },
              { href: '/ipl-betting', label: 'IPL', icon: '🏆' },
              { href: '/sports-betting', label: 'Sports', icon: '⚽' },
              { href: '/online-casino', label: 'Casino', icon: '🎰' },
              { href: '/dafabet-bonus', label: 'Bonuses', icon: '💰' },
              { href: '/dafabet-review', label: 'Review', icon: '⭐' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href as '/'}
                className="card flex flex-col items-center text-center hover:border-gold-500/50 hover:bg-brand-card/80 transition-all duration-200 group"
              >
                <span className="text-4xl mb-3">{item.icon}</span>
                <span className="text-sm font-medium text-gray-300 group-hover:text-gold-400 transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="card max-w-2xl mx-auto border-gold-500/30">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Betting?</h2>
          <p className="text-gray-400 mb-8">
            Join thousands of Indian sports betting fans on DafaWin. Fast registration, instant deposits via UPI.
          </p>
          <Link href="/dafabet-registration" className="btn-primary text-lg px-10 py-4">
            {tCommon('join_now')}
          </Link>
        </div>
      </section>
    </>
  )
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <HomePageContent locale={locale} />
}
