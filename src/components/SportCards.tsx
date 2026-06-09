import Link from 'next/link';

interface SportCardsProps {
  lang?: 'en' | 'te';
}

const SPORTS_EN = [
  {
    icon: '🏏',
    title: 'Cricket Betting',
    desc: 'IPL, Test, ODI — 30+ markets per match, ball-by-ball live odds',
    href: '/cricket-betting/',
    badge: '#1 Sport',
  },
  {
    icon: '⚽',
    title: 'Football',
    desc: 'ISL, Premier League, Champions League, La Liga',
    href: '/sports-betting/',
    badge: '1,000+ weekly',
  },
  {
    icon: '🤼',
    title: 'Kabaddi',
    desc: 'Pro Kabaddi League — match winner, total points, player props',
    href: '/sports-betting/',
    badge: 'PKL Coverage',
  },
  {
    icon: '🎰',
    title: 'Online Casino',
    desc: 'Teen Patti, Andar Bahar, 1,000+ slots, Evolution live casino',
    href: '/online-casino/',
    badge: '1,000+ Games',
  },
];

const SPORTS_TE = [
  {
    icon: '🏏',
    title: 'క్రికెట్ బెట్టింగ్',
    desc: 'IPL, టెస్ట్, ODI — మ్యాచ్‌కు 30+ మార్కెట్లు, లైవ్ బెట్టింగ్',
    href: '/te/cricket-betting/',
    badge: '#1 స్పోర్ట్',
  },
  {
    icon: '⚽',
    title: 'ఫుట్‌బాల్',
    desc: 'ISL, ప్రీమియర్ లీగ్, చాంపియన్స్ లీగ్, లా లీగా',
    href: '/te/sports-betting/',
    badge: 'వారానికి 1,000+',
  },
  {
    icon: '🤼',
    title: 'కబడ్డీ',
    desc: 'ప్రో కబడ్డీ లీగ్ — మ్యాచ్ విన్నర్, టోటల్ పాయింట్లు',
    href: '/te/sports-betting/',
    badge: 'PKL కవరేజ్',
  },
  {
    icon: '🎰',
    title: 'ఆన్‌లైన్ కాసినో',
    desc: 'తీన్ పట్టీ, అండర్ బాహర్, 1,000+ స్లాట్లు, లైవ్ డీలర్',
    href: '/te/online-casino/',
    badge: '1,000+ గేమ్స్',
  },
];

export default function SportCards({ lang = 'en' }: SportCardsProps) {
  const isTE = lang === 'te';
  const sports = isTE ? SPORTS_TE : SPORTS_EN;

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-2xl sm:text-3xl font-black text-white mb-2 ${isTE ? 'font-telugu' : ''}`}>
          {isTE ? 'బెట్టింగ్ విభాగాలు' : 'Betting Categories'}
        </h2>
        <p className={`text-gray-400 mb-8 ${isTE ? 'font-telugu' : ''}`}>
          {isTE ? 'DafaBet లో అన్ని బెట్టింగ్ మార్కెట్లు' : 'All betting markets available at DafaBet India'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sports.map((sport) => (
            <Link
              key={sport.href + sport.title}
              href={sport.href}
              className="group relative bg-dark-800 hover:bg-dark-700 border border-gold-500/10 hover:border-gold-500/40 rounded-xl p-6 transition-all"
            >
              <div className="text-4xl mb-3">{sport.icon}</div>
              <div className="absolute top-4 right-4 bg-gold-500/10 text-gold-400 text-xs px-2 py-0.5 rounded-full font-medium">
                {sport.badge}
              </div>
              <h3 className={`text-lg font-bold text-white mb-2 group-hover:text-gold-400 transition-colors ${isTE ? 'font-telugu' : ''}`}>
                {sport.title}
              </h3>
              <p className={`text-gray-400 text-sm leading-relaxed ${isTE ? 'font-telugu' : ''}`}>
                {sport.desc}
              </p>
              <div className="mt-4 text-gold-400 text-sm font-medium">
                {isTE ? 'మరింత చదవండి →' : 'Learn more →'}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
