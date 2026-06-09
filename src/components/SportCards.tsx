import Link from 'next/link';

interface SportCardsProps {
  lang?: 'en' | 'te';
}

const SPORTS_EN = [
  {
    icon: '🏏',
    title: 'Cricket Betting',
    desc: 'IPL, Test, ODI — 30+ markets per match',
    href: '/cricket-betting/',
    badge: '#1 Sport',
    gradient: 'from-blue-900/80 to-blue-800/40',
    accent: 'border-blue-500/30 hover:border-blue-400/60',
    badgeColor: 'bg-blue-500/20 text-blue-300',
  },
  {
    icon: '🏆',
    title: 'IPL 2025',
    desc: 'Ball-by-ball live betting on IPL matches',
    href: '/ipl-betting/',
    badge: 'LIVE',
    gradient: 'from-sport-red-900/80 to-sport-red-800/40',
    accent: 'border-sport-red-500/30 hover:border-sport-red-400/60',
    badgeColor: 'bg-sport-red-500/20 text-sport-red-300',
  },
  {
    icon: '⚽',
    title: 'Football',
    desc: 'ISL, Premier League, Champions League',
    href: '/sports-betting/',
    badge: '1,000+ weekly',
    gradient: 'from-green-900/80 to-green-800/40',
    accent: 'border-green-500/30 hover:border-green-400/60',
    badgeColor: 'bg-green-500/20 text-green-300',
  },
  {
    icon: '🤼',
    title: 'Kabaddi',
    desc: 'Pro Kabaddi League — all markets covered',
    href: '/sports-betting/',
    badge: 'PKL 2025',
    gradient: 'from-orange-900/80 to-orange-800/40',
    accent: 'border-orange-500/30 hover:border-orange-400/60',
    badgeColor: 'bg-orange-500/20 text-orange-300',
  },
  {
    icon: '🎰',
    title: 'Online Casino',
    desc: 'Teen Patti, Andar Bahar, Live Dealers',
    href: '/online-casino/',
    badge: '1,000+ Games',
    gradient: 'from-purple-900/80 to-purple-800/40',
    accent: 'border-purple-500/30 hover:border-purple-400/60',
    badgeColor: 'bg-purple-500/20 text-purple-300',
  },
  {
    icon: '🎾',
    title: 'Tennis',
    desc: 'Grand Slams, ATP, WTA — full market coverage',
    href: '/sports-betting/',
    badge: 'Live Odds',
    gradient: 'from-yellow-900/80 to-yellow-800/40',
    accent: 'border-yellow-500/30 hover:border-yellow-400/60',
    badgeColor: 'bg-yellow-500/20 text-yellow-300',
  },
  {
    icon: '🏀',
    title: 'Basketball',
    desc: 'NBA, EuroLeague and more international leagues',
    href: '/sports-betting/',
    badge: 'NBA Season',
    gradient: 'from-red-900/80 to-red-800/40',
    accent: 'border-red-500/30 hover:border-red-400/60',
    badgeColor: 'bg-red-500/20 text-red-300',
  },
  {
    icon: '💳',
    title: 'UPI Deposits',
    desc: 'Instant UPI, Paytm, PhonePe — min ₹500',
    href: '/dafabet-registration/',
    badge: '⚡ Instant',
    gradient: 'from-teal-900/80 to-teal-800/40',
    accent: 'border-teal-500/30 hover:border-teal-400/60',
    badgeColor: 'bg-teal-500/20 text-teal-300',
  },
];

const SPORTS_TE = [
  {
    icon: '🏏',
    title: 'క్రికెట్ బెట్టింగ్',
    desc: 'IPL, టెస్ట్, ODI — మ్యాచ్‌కు 30+ మార్కెట్లు',
    href: '/te/cricket-betting/',
    badge: '#1 స్పోర్ట్',
    gradient: 'from-blue-900/80 to-blue-800/40',
    accent: 'border-blue-500/30 hover:border-blue-400/60',
    badgeColor: 'bg-blue-500/20 text-blue-300',
  },
  {
    icon: '🏆',
    title: 'IPL 2025',
    desc: 'బాల్-బై-బాల్ లైవ్ బెట్టింగ్',
    href: '/te/ipl-betting/',
    badge: 'లైవ్',
    gradient: 'from-sport-red-900/80 to-sport-red-800/40',
    accent: 'border-sport-red-500/30 hover:border-sport-red-400/60',
    badgeColor: 'bg-sport-red-500/20 text-sport-red-300',
  },
  {
    icon: '⚽',
    title: 'ఫుట్‌బాల్',
    desc: 'ISL, ప్రీమియర్ లీగ్, చాంపియన్స్ లీగ్',
    href: '/te/sports-betting/',
    badge: 'వారానికి 1,000+',
    gradient: 'from-green-900/80 to-green-800/40',
    accent: 'border-green-500/30 hover:border-green-400/60',
    badgeColor: 'bg-green-500/20 text-green-300',
  },
  {
    icon: '🤼',
    title: 'కబడ్డీ',
    desc: 'ప్రో కబడ్డీ లీగ్ — అన్ని మార్కెట్లు',
    href: '/te/sports-betting/',
    badge: 'PKL 2025',
    gradient: 'from-orange-900/80 to-orange-800/40',
    accent: 'border-orange-500/30 hover:border-orange-400/60',
    badgeColor: 'bg-orange-500/20 text-orange-300',
  },
  {
    icon: '🎰',
    title: 'ఆన్‌లైన్ కాసినో',
    desc: 'తీన్ పట్టీ, అండర్ బాహర్, లైవ్ డీలర్',
    href: '/te/online-casino/',
    badge: '1,000+ గేమ్స్',
    gradient: 'from-purple-900/80 to-purple-800/40',
    accent: 'border-purple-500/30 hover:border-purple-400/60',
    badgeColor: 'bg-purple-500/20 text-purple-300',
  },
  {
    icon: '🎾',
    title: 'టెన్నిస్',
    desc: 'గ్రాండ్ స్లామ్, ATP, WTA మార్కెట్లు',
    href: '/te/sports-betting/',
    badge: 'లైవ్ ఆడ్స్',
    gradient: 'from-yellow-900/80 to-yellow-800/40',
    accent: 'border-yellow-500/30 hover:border-yellow-400/60',
    badgeColor: 'bg-yellow-500/20 text-yellow-300',
  },
  {
    icon: '🏀',
    title: 'బాస్కెట్‌బాల్',
    desc: 'NBA, యూరోలీగ్ మరియు అంతర్జాతీయ లీగ్లు',
    href: '/te/sports-betting/',
    badge: 'NBA సీజన్',
    gradient: 'from-red-900/80 to-red-800/40',
    accent: 'border-red-500/30 hover:border-red-400/60',
    badgeColor: 'bg-red-500/20 text-red-300',
  },
  {
    icon: '💳',
    title: 'UPI డిపాజిట్లు',
    desc: 'తక్షణ UPI, Paytm, PhonePe — కనీసం ₹500',
    href: '/te/dafabet-registration/',
    badge: '⚡ తక్షణ',
    gradient: 'from-teal-900/80 to-teal-800/40',
    accent: 'border-teal-500/30 hover:border-teal-400/60',
    badgeColor: 'bg-teal-500/20 text-teal-300',
  },
];

export default function SportCards({ lang = 'en' }: SportCardsProps) {
  const isTE = lang === 'te';
  const sports = isTE ? SPORTS_TE : SPORTS_EN;

  return (
    <section className="py-12 sm:py-16 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className={`text-2xl sm:text-3xl font-black text-white ${isTE ? 'font-telugu' : ''}`}>
            {isTE ? 'బెట్టింగ్ విభాగాలు' : 'Betting Categories'}
          </h2>
          <span className="hidden sm:inline-block bg-sport-red-500/10 text-sport-red-400 text-xs font-semibold px-3 py-1 rounded-full border border-sport-red-500/20">
            {isTE ? '30+ స్పోర్ట్స్' : '30+ Sports'}
          </span>
        </div>
        <p className={`text-navy-300 mb-8 ${isTE ? 'font-telugu' : ''}`}>
          {isTE ? 'DafaBet లో అన్ని బెట్టింగ్ మార్కెట్లు' : 'All betting markets available at DafaBet India'}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {sports.map((sport) => (
            <Link
              key={sport.href + sport.title}
              href={sport.href}
              className={`group relative bg-gradient-to-br ${sport.gradient} border ${sport.accent} rounded-xl p-4 sm:p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30`}
            >
              <div className={`absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full font-medium ${sport.badgeColor}`}>
                {sport.badge}
              </div>
              <div className="text-3xl sm:text-4xl mb-3">{sport.icon}</div>
              <h3 className={`text-sm sm:text-base font-bold text-white mb-1.5 group-hover:text-sport-red-300 transition-colors leading-tight ${isTE ? 'font-telugu' : ''}`}>
                {sport.title}
              </h3>
              <p className={`text-navy-300 text-xs leading-relaxed ${isTE ? 'font-telugu' : ''}`}>
                {sport.desc}
              </p>
              <div className="mt-3 text-sport-red-400 text-xs font-semibold">
                {isTE ? 'బెట్ చేయండి →' : 'Bet Now →'}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
