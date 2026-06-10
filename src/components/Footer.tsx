import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

type Props = {
  locale: string
}

export default function Footer({ locale }: Props) {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  return (
    <footer className="bg-brand-surface border-t border-brand-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <span className="text-2xl font-bold gold-text">DafaWin</span>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              India&apos;s trusted guide to Dafabet — honest reviews, bonuses, and betting tips for cricket, IPL, and more.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <Image src="/images/18plus-badge.png" alt="18+" width={32} height={32} className="opacity-60" />
              <Image src="/images/gcb-badge.svg" alt="GCB" width={40} height={24} className="opacity-60" />
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Sports Betting</h3>
            <ul className="space-y-2">
              {[
                { href: '/cricket-betting', key: 'cricket' },
                { href: '/ipl-betting', key: 'ipl' },
                { href: '/football-betting', key: 'football' },
                { href: '/kabaddi-betting', key: 'kabaddi' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href as '/'} className="text-gray-400 hover:text-brand-gold text-sm transition-colors">
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Information</h3>
            <ul className="space-y-2">
              {[
                { href: '/dafabet-bonus', key: 'bonuses' },
                { href: '/dafabet-review', key: 'review' },
                { href: '/faq', key: 'faq' },
                { href: '/dafabet-app-download', key: 'app' },
                { href: '/online-casino', key: 'casino' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href as '/'} className="text-gray-400 hover:text-brand-gold text-sm transition-colors">
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Account</h3>
            <ul className="space-y-2">
              {[
                { href: '/dafabet-registration', key: 'registration' },
                { href: '/dafabet-payment', key: 'deposit' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href as '/'} className="text-gray-400 hover:text-brand-gold text-sm transition-colors">
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href="/dafabet-registration" className="btn-primary text-sm px-4 py-2 w-full text-center block">
                Register Now
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs text-center md:text-left max-w-2xl">
              {t('disclaimer')}
            </p>
            <div className="flex gap-4 flex-shrink-0">
              <a href="#" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">{t('terms')}</a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">{t('privacy')}</a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">{t('responsible')}</a>
            </div>
          </div>
          <p className="text-gray-600 text-xs text-center mt-4">
            © {new Date().getFullYear()} DafaWin. All rights reserved. Gambling is for 18+ only.
          </p>
        </div>
      </div>
    </footer>
  )
}
