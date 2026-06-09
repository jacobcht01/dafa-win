import Link from 'next/link';

interface BonusSectionProps {
  lang?: 'en' | 'te';
}

export default function BonusSection({ lang = 'en' }: BonusSectionProps) {
  const isTE = lang === 'te';
  const f = isTE ? 'font-telugu' : '';

  const promos = isTE ? [
    {
      tag: '🎁 స్వాగత ఆఫర్',
      title: '200% వెల్‌కమ్ బోనస్',
      amount: '₹20,000 వరకు',
      desc: 'మొదటి డిపాజిట్‌పై 200% మ్యాచ్ బోనస్. కేవలం 3x వేజరింగ్.',
      cta: 'ఇప్పుడే పొందండి →',
      href: 'https://www.dafabet.com/?utm_source=dafawin&utm_content=bonus-welcome',
      highlight: true,
    },
    {
      tag: '💰 మొదటి డిపాజిట్',
      title: '100% రీలోడ్ బోనస్',
      amount: '₹10,000 వరకు',
      desc: 'ప్రతి సోమవారం మీ స్పోర్ట్స్ బ్యాలెన్స్‌పై 100% బోనస్ పొందండి.',
      cta: 'క్లెయిమ్ చేయండి →',
      href: 'https://www.dafabet.com/?utm_source=dafawin&utm_content=bonus-reload',
      highlight: false,
    },
    {
      tag: '🏏 క్రికెట్ స్పెషల్',
      title: 'క్యాష్‌బ్యాక్ ఆఫర్',
      amount: '10% నష్టం వెనక్కి',
      desc: 'IPL మ్యాచ్‌లపై ప్రతి నెలా మీ నష్టంలో 10% తిరిగి పొందండి.',
      cta: 'మరింత తెలుసుకోండి →',
      href: 'https://www.dafabet.com/?utm_source=dafawin&utm_content=bonus-cashback',
      highlight: false,
    },
  ] : [
    {
      tag: '🎁 Welcome Offer',
      title: '200% Welcome Bonus',
      amount: 'Up to ₹20,000',
      desc: '200% match bonus on your first deposit. Only 3x wagering — lowest in the market.',
      cta: 'Claim Now →',
      href: 'https://www.dafabet.com/?utm_source=dafawin&utm_content=bonus-welcome',
      highlight: true,
    },
    {
      tag: '💰 Weekly Reload',
      title: '100% Reload Bonus',
      amount: 'Up to ₹10,000',
      desc: 'Every Monday, get a 100% bonus on your sports balance. Re-deposit and double up.',
      cta: 'Claim Bonus →',
      href: 'https://www.dafabet.com/?utm_source=dafawin&utm_content=bonus-reload',
      highlight: false,
    },
    {
      tag: '🏏 Cricket Special',
      title: 'Cashback Offer',
      amount: '10% Back on Losses',
      desc: 'Get 10% of your monthly IPL losses back as bonus credit. Bet risk-free.',
      cta: 'Learn More →',
      href: 'https://www.dafabet.com/?utm_source=dafawin&utm_content=bonus-cashback',
      highlight: false,
    },
  ];

  return (
    <section className={`py-12 sm:py-16 bg-navy-900 border-y border-navy-700 ${f}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block bg-sport-red-500/10 text-sport-red-400 text-xs font-bold px-3 py-1 rounded-full border border-sport-red-500/20 mb-3">
            {isTE ? 'ప్రమోషన్లు & ఆఫర్లు' : 'Promotions & Offers'}
          </span>
          <h2 className={`text-2xl sm:text-3xl font-black text-white ${f}`}>
            {isTE ? 'DafaBet బోనస్‌లు' : 'DafaBet Bonuses'}
          </h2>
          <p className={`text-navy-300 mt-2 ${f}`}>
            {isTE ? 'భారతీయ ఆటగాళ్ళకు ప్రత్యేక ఆఫర్లు' : 'Exclusive offers for Indian players'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {promos.map((promo, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden border transition-all ${
                promo.highlight
                  ? 'bg-gradient-to-br from-sport-red-900/60 to-navy-900 border-sport-red-500/40 shadow-lg shadow-sport-red-500/10'
                  : 'bg-navy-800/60 border-navy-600 hover:border-navy-500'
              }`}
            >
              {promo.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-sport-red-500" />
              )}
              <div className="p-6">
                <div className={`text-xs font-semibold mb-3 ${isTE ? 'font-telugu' : ''} ${promo.highlight ? 'text-sport-red-300' : 'text-navy-300'}`}>
                  {promo.tag}
                </div>
                <h3 className={`text-xl font-black text-white mb-1 ${f}`}>
                  {promo.title}
                </h3>
                <div className={`text-2xl font-black mb-3 ${promo.highlight ? 'text-sport-red-400' : 'text-gold-400'}`}>
                  {promo.amount}
                </div>
                <p className={`text-navy-300 text-sm leading-relaxed mb-5 ${f}`}>
                  {promo.desc}
                </p>
                <a
                  href={promo.href}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className={`inline-flex items-center gap-1 text-sm font-bold transition-colors ${
                    promo.highlight
                      ? 'text-sport-red-400 hover:text-sport-red-300'
                      : 'text-gold-400 hover:text-gold-300'
                  }`}
                >
                  {promo.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className={`text-center text-navy-500 text-xs mt-6 ${f}`}>
          {isTE ? '18+ | T&C వర్తిస్తాయి | బాధ్యతాయుతంగా ఆడండి' : '18+ | T&C Apply | Please Gamble Responsibly'}
        </p>

        <div className="text-center mt-4">
          <Link
            href={isTE ? '/te/dafabet-bonus/' : '/dafabet-bonus/'}
            className={`text-sm font-medium text-navy-300 hover:text-white transition-colors ${f}`}
          >
            {isTE ? 'అన్ని బోనస్‌లు చూడండి →' : 'View all bonuses →'}
          </Link>
        </div>
      </div>
    </section>
  );
}
