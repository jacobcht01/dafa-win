import Link from 'next/link';

interface FooterProps {
  lang?: 'en' | 'te';
}

export default function Footer({ lang = 'en' }: FooterProps) {
  const isTE = lang === 'te';
  const f = isTE ? 'font-telugu' : '';

  const cols = isTE ? [
    {
      heading: 'స్పోర్ట్స్ బెట్టింగ్',
      links: [
        { label: 'క్రికెట్ బెట్టింగ్', href: '/te/cricket-betting/' },
        { label: 'IPL బెట్టింగ్', href: '/te/ipl-betting/' },
        { label: 'ఫుట్‌బాల్ బెట్టింగ్', href: '/te/sports-betting/' },
        { label: 'కబడ్డీ', href: '/te/sports-betting/' },
      ],
    },
    {
      heading: 'DafaBet గైడ్',
      links: [
        { label: 'DafaBet రివ్యూ', href: '/te/dafabet-review/' },
        { label: 'వెల్‌కమ్ బోనస్', href: '/te/dafabet-bonus/' },
        { label: 'రిజిస్ట్రేషన్', href: '/te/dafabet-registration/' },
        { label: 'యాప్ డౌన్‌లోడ్', href: '/te/dafabet-app-download/' },
      ],
    },
    {
      heading: 'మరిన్ని',
      links: [
        { label: 'ఆన్‌లైన్ కాసినో', href: '/te/online-casino/' },
        { label: 'పేమెంట్ మెథడ్స్', href: '/te/dafabet-payment/' },
        { label: 'బాధ్యతాయుత జూదం', href: '/te/responsible-gambling/' },
        { label: 'హోమ్', href: '/te/' },
      ],
    },
  ] : [
    {
      heading: 'Sports Betting',
      links: [
        { label: 'Cricket Betting', href: '/cricket-betting/' },
        { label: 'IPL Betting', href: '/ipl-betting/' },
        { label: 'Football Betting', href: '/sports-betting/' },
        { label: 'Kabaddi', href: '/sports-betting/' },
      ],
    },
    {
      heading: 'DafaBet Guide',
      links: [
        { label: 'DafaBet Review', href: '/dafabet-review/' },
        { label: 'Welcome Bonus', href: '/dafabet-bonus/' },
        { label: 'Registration Guide', href: '/dafabet-registration/' },
        { label: 'App Download', href: '/dafabet-app-download/' },
      ],
    },
    {
      heading: 'More',
      links: [
        { label: 'Online Casino', href: '/online-casino/' },
        { label: 'Payment Methods', href: '/dafabet-payment/' },
        { label: 'Responsible Gambling', href: '/responsible-gambling/' },
        { label: 'Home', href: '/' },
      ],
    },
  ];

  return (
    <footer className="bg-navy-950 border-t border-navy-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand column */}
          <div>
            <Link href={isTE ? '/te/' : '/'} className="inline-block mb-4">
              <span className="text-2xl font-black">
                <span className="text-sport-red-400">Dafa</span>
                <span className="text-white">Win</span>
                <span className="text-navy-400 text-xs font-normal ml-1">India</span>
              </span>
            </Link>
            <p className={`text-navy-400 text-sm leading-relaxed mb-4 ${f}`}>
              {isTE
                ? 'DafaWin అనేది DafaBet ఇండియా కోసం స్వతంత్ర సమీక్ష సైట్. మేము అనుబంధ కమిషన్లు పొందవచ్చు.'
                : 'DafaWin is an independent review site for DafaBet India. We may earn affiliate commissions.'}
            </p>
            <a
              href="https://www.dafabet.com/?utm_source=dafawin&utm_content=footer"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 bg-sport-red-500 hover:bg-sport-red-400 text-white text-sm font-bold rounded-lg transition-colors ${f}`}
            >
              {isTE ? 'DafaBet చేరండి →' : 'Join DafaBet →'}
            </a>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className={`text-white font-bold text-sm uppercase tracking-wider mb-4 ${f}`}>
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`text-sm text-navy-400 hover:text-white transition-colors ${f}`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Responsible gambling */}
        <div className="border-t border-navy-800 pt-8">
          <div className={`bg-navy-900 border border-navy-700 rounded-xl p-4 mb-4 text-center ${f}`}>
            <p className="text-sport-red-400 font-semibold text-sm mb-1">
              {isTE ? '⚠️ 18+ మాత్రమే | బాధ్యతాయుతంగా బెట్ చేయండి' : '⚠️ 18+ Only | Bet Responsibly'}
            </p>
            <p className="text-navy-400 text-xs">
              {isTE
                ? 'జూదం ఆర్థిక నష్టాన్ని కలిగిస్తుంది. సహాయం కావాలంటే: iCall — 9152987821'
                : 'Gambling involves financial risk. If you need help: Vandrevala Foundation — 1860-2662-345 (free, 24/7)'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-navy-600 text-xs">
              © {new Date().getFullYear()} DafaWin. All rights reserved. 18+ | Gambling involves risk.
            </p>
            <div className={`flex gap-4 ${f}`}>
              <Link href={isTE ? '/te/responsible-gambling/' : '/responsible-gambling/'} className="text-xs text-navy-500 hover:text-white transition-colors">
                {isTE ? 'బాధ్యతాయుత జూదం' : 'Responsible Gambling'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
