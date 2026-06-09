import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  lang?: 'en' | 'te';
}

const NAV_EN = [
  { label: '🏏 Cricket', href: '/cricket-betting/' },
  { label: '🏆 IPL', href: '/ipl-betting/' },
  { label: '⚽ Football', href: '/sports-betting/' },
  { label: '🎰 Casino', href: '/online-casino/' },
  { label: '🎁 Bonus', href: '/dafabet-bonus/' },
  { label: '📱 App', href: '/dafabet-app-download/' },
  { label: '⭐ Review', href: '/dafabet-review/' },
];

const NAV_TE = [
  { label: '🏏 క్రికెట్', href: '/te/cricket-betting/' },
  { label: '🏆 ఐపీఎల్', href: '/te/ipl-betting/' },
  { label: '⚽ ఫుట్‌బాల్', href: '/te/sports-betting/' },
  { label: '🎰 కాసినో', href: '/te/online-casino/' },
  { label: '🎁 బోనస్', href: '/te/dafabet-bonus/' },
  { label: '📱 యాప్', href: '/te/dafabet-app-download/' },
  { label: '⭐ రివ్యూ', href: '/te/dafabet-review/' },
];

export default function Header({ lang = 'en' }: HeaderProps) {
  const nav = lang === 'te' ? NAV_TE : NAV_EN;
  const homeHref = lang === 'te' ? '/te/' : '/';
  const isTE = lang === 'te';

  return (
    <header className="sticky top-0 z-50">
      {/* Top promo bar */}
      <div className="bg-sport-red-500 text-white text-center text-xs sm:text-sm py-2 px-4 font-semibold">
        <span className="hidden sm:inline">🎁 </span>
        <a
          href="https://www.dafabet.com/?utm_source=dafawin&utm_content=promo-bar"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="underline underline-offset-2 hover:no-underline"
        >
          {isTE
            ? '200% వెల్‌కమ్ బోనస్ — ₹20,000 వరకు పొందండి! ఇప్పుడు రిజిస్టర్ చేయండి →'
            : '200% Welcome Bonus — Claim up to ₹20,000! Register Now →'}
        </a>
      </div>

      {/* Main nav bar */}
      <div className="bg-navy-900 border-b border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href={homeHref} className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xl font-black tracking-tight">
                <span className="text-sport-red-400">Dafa</span>
                <span className="text-white">Win</span>
                <span className="text-navy-200 text-xs font-normal ml-1">India</span>
              </span>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <a
                href="https://www.dafabet.com/?utm_source=dafawin"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="hidden sm:inline-flex items-center px-4 py-2 bg-sport-red-500 hover:bg-sport-red-400 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
              >
                {isTE ? 'చేరండి' : 'Join Now'} →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <nav className="bg-navy-800 border-b border-navy-600 overflow-x-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-0.5 min-w-max sm:min-w-0">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors text-navy-200 hover:text-white hover:bg-navy-700 border-b-2 border-transparent hover:border-sport-red-500 ${
                  isTE ? 'font-telugu' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
