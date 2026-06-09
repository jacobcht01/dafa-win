import Link from 'next/link';

interface FooterProps {
  lang?: 'en' | 'te';
}

export default function Footer({ lang = 'en' }: FooterProps) {
  const isTE = lang === 'te';
  const prefix = isTE ? '/te' : '';

  const links = isTE ? [
    { label: 'హోమ్', href: '/te/' },
    { label: 'రివ్యూ', href: '/te/dafabet-review/' },
    { label: 'క్రికెట్', href: '/te/cricket-betting/' },
    { label: 'ఐపీఎల్', href: '/te/ipl-betting/' },
    { label: 'కాసినో', href: '/te/online-casino/' },
    { label: 'బోనస్', href: '/te/dafabet-bonus/' },
    { label: 'రిజిస్ట్రేషన్', href: '/te/dafabet-registration/' },
    { label: 'పేమెంట్', href: '/te/dafabet-payment/' },
    { label: 'యాప్', href: '/te/dafabet-app-download/' },
    { label: 'స్పోర్ట్స్', href: '/te/sports-betting/' },
    { label: 'బాధ్యతాయుత జూదం', href: '/te/responsible-gambling/' },
  ] : [
    { label: 'Home', href: '/' },
    { label: 'Review', href: '/dafabet-review/' },
    { label: 'Cricket Betting', href: '/cricket-betting/' },
    { label: 'IPL Betting', href: '/ipl-betting/' },
    { label: 'Online Casino', href: '/online-casino/' },
    { label: 'Bonus Codes', href: '/dafabet-bonus/' },
    { label: 'Registration', href: '/dafabet-registration/' },
    { label: 'Payment Methods', href: '/dafabet-payment/' },
    { label: 'App Download', href: '/dafabet-app-download/' },
    { label: 'Sports Betting', href: '/sports-betting/' },
    { label: 'Responsible Gambling', href: '/responsible-gambling/' },
  ];

  return (
    <footer className="bg-dark-950 border-t border-gold-500/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-black mb-3">
              <span className="text-gold-400">Dafa</span>
              <span className="text-white">Win</span>
            </div>
            <p className={`text-gray-400 text-sm leading-relaxed ${isTE ? 'font-telugu' : ''}`}>
              {isTE
                ? 'DafaWin అనేది DafaBet ఇండియా కోసం స్వతంత్ర సమీక్ష సైట్. మేము అనుబంధ కమిషన్లు పొందవచ్చు.'
                : 'DafaWin is an independent review site for DafaBet India. We may earn affiliate commissions.'}
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <nav className="flex flex-wrap gap-x-4 gap-y-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-sm text-gray-400 hover:text-gold-400 transition-colors ${isTE ? 'font-telugu' : ''}`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Responsible gambling */}
        <div className="border-t border-gold-500/10 pt-8">
          <div className={`bg-dark-800 rounded-xl p-4 mb-4 text-center ${isTE ? 'font-telugu' : ''}`}>
            <p className="text-gold-400 font-semibold text-sm mb-1">
              {isTE ? '⚠️ 18+ మాత్రమే | బాధ్యతాయుతంగా బెట్ చేయండి' : '⚠️ 18+ Only | Bet Responsibly'}
            </p>
            <p className="text-gray-400 text-xs">
              {isTE
                ? 'జూదం ఆర్థిక నష్టాన్ని కలిగిస్తుంది. సహాయం కావాలంటే: iCall — 9152987821'
                : 'Gambling involves financial risk. If you need help: Vandrevala Foundation — 1860-2662-345 (free, 24/7)'}
            </p>
          </div>
          <p className="text-center text-gray-600 text-xs">
            © {new Date().getFullYear()} DafaWin. All rights reserved. 18+ | Gambling involves risk.
          </p>
        </div>
      </div>
    </footer>
  );
}
