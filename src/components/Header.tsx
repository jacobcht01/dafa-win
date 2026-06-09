import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  lang?: 'en' | 'te';
}

const NAV_EN = [
  { label: 'Review', href: '/dafabet-review/' },
  { label: 'Cricket', href: '/cricket-betting/' },
  { label: 'IPL Betting', href: '/ipl-betting/' },
  { label: 'Bonus', href: '/dafabet-bonus/' },
  { label: 'Casino', href: '/online-casino/' },
  { label: 'App', href: '/dafabet-app-download/' },
];

const NAV_TE = [
  { label: 'రివ్యూ', href: '/te/dafabet-review/' },
  { label: 'క్రికెట్', href: '/te/cricket-betting/' },
  { label: 'ఐపీఎల్', href: '/te/ipl-betting/' },
  { label: 'బోనస్', href: '/te/dafabet-bonus/' },
  { label: 'కాసినో', href: '/te/online-casino/' },
  { label: 'యాప్', href: '/te/dafabet-app-download/' },
];

export default function Header({ lang = 'en' }: HeaderProps) {
  const nav = lang === 'te' ? NAV_TE : NAV_EN;
  const homeHref = lang === 'te' ? '/te/' : '/';

  return (
    <header className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={homeHref} className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl font-black tracking-tight">
              <span className="text-gold-400">Dafa</span>
              <span className="text-white">Win</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-300 hover:text-gold-400 hover:bg-gold-500/10 ${
                  lang === 'te' ? 'font-telugu' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="https://www.dafabet.com/?utm_source=dafawin"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-gold-500 hover:bg-gold-400 text-dark-950 text-sm font-bold rounded-lg transition-colors"
            >
              {lang === 'te' ? 'చేరండి 🎯' : 'Join Now 🎯'}
            </a>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="lg:hidden pb-3 flex flex-wrap gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1 text-xs font-medium rounded-full border border-gold-500/30 text-gold-400 hover:bg-gold-500/10 transition-colors ${
                lang === 'te' ? 'font-telugu' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
