import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

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
              India&apos;s trusted sports betting platform. Bet on cricket, football, kabaddi, and more.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Sports Betting</h3>
            <ul className="space-y-2">
              {[
                { href: '/cricket-betting', key: 'cricket' },
                { href: '/football-betting', key: 'football' },
                { href: '/kabaddi-betting', key: 'kabaddi' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href as '/'} className="text-gray-400 hover:text-gold-400 text-sm transition-colors">
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              {[
                { href: '/bonuses', key: 'bonuses' },
                { href: '/review', key: 'review' },
                { href: '/faq', key: 'faq' },
                { href: '/app-download', key: 'app' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href as '/'} className="text-gray-400 hover:text-gold-400 text-sm transition-colors">
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              {[
                { href: '/registration', key: 'registration' },
                { href: '/deposit-withdrawal', key: 'deposit' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href as '/'} className="text-gray-400 hover:text-gold-400 text-sm transition-colors">
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs text-center md:text-left max-w-2xl">
              {t('disclaimer')}
            </p>
            <div className="flex gap-4 flex-shrink-0">
              <a href="#" className="text-gray-500 hover:text-gray-400 text-xs transition-colors">
                {t('terms')}
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-400 text-xs transition-colors">
                {t('privacy')}
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-400 text-xs transition-colors">
                {t('responsible')}
              </a>
            </div>
          </div>
          <p className="text-gray-600 text-xs text-center mt-4">
            © {new Date().getFullYear()} DafaWin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
