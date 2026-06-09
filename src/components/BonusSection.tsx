import Link from 'next/link';

interface BonusSectionProps {
  lang?: 'en' | 'te';
}

export default function BonusSection({ lang = 'en' }: BonusSectionProps) {
  const isTE = lang === 'te';
  const f = isTE ? 'font-telugu' : '';

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 border-y border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <div>
            <div className={`inline-block bg-gold-500/10 text-gold-400 border border-gold-500/30 px-3 py-1 rounded-full text-sm font-medium mb-4 ${f}`}>
              {isTE ? '🎁 వెల్‌కమ్ బోనస్' : '🎁 Welcome Bonus'}
            </div>
            <h2 className={`text-3xl sm:text-4xl font-black text-white mb-4 ${f}`}>
              {isTE ? (
                <>200% బోనస్<br /><span className="text-gold-400">₹20,000 వరకు</span></>
              ) : (
                <>200% Bonus<br /><span className="text-gold-400">up to ₹20,000</span></>
              )}
            </h2>
            <p className={`text-gray-300 mb-6 text-lg leading-relaxed ${f}`}>
              {isTE
                ? '₹10,000 డిపాజిట్ చేస్తే మీకు మొత్తం ₹30,000 (₹10,000 + ₹20,000 బోనస్) లభిస్తుంది. వేజరింగ్ అవసరం కేవలం 3x — పరిశ్రమలో అత్యల్పం.'
                : 'Deposit ₹10,000 and play with ₹30,000 total (₹10,000 + ₹20,000 bonus). Only 3x wagering requirement — the lowest in the Indian market.'}
            </p>
            <div className={`flex flex-col sm:flex-row gap-3 ${f}`}>
              <a
                href="https://www.dafabet.com/?utm_source=dafawin&utm_content=bonus"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-dark-950 font-black rounded-xl transition-all hover:scale-105"
              >
                {isTE ? 'బోనస్ పొందండి →' : 'Claim Bonus →'}
              </a>
              <Link
                href={isTE ? '/te/dafabet-bonus/' : '/dafabet-bonus/'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gold-500/40 text-gold-400 font-bold rounded-xl hover:border-gold-400 transition-all"
              >
                {isTE ? 'పూర్తి వివరాలు' : 'Full Details'}
              </Link>
            </div>
          </div>

          {/* Right: How it works */}
          <div className={`bg-dark-800/50 rounded-2xl p-6 border border-gold-500/10 ${f}`}>
            <h3 className={`text-lg font-bold text-white mb-4 ${f}`}>
              {isTE ? 'ఎలా పొందాలి?' : 'How to Claim?'}
            </h3>
            <ol className="space-y-4">
              {(isTE ? [
                { n: '1', t: 'రిజిస్టర్ చేయండి', d: 'కొత్త DafaBet అకౌంట్ తెరవండి' },
                { n: '2', t: 'డిపాజిట్ చేయండి', d: 'కనీసం ₹500 UPI/PhonePe లో జమ చేయండి' },
                { n: '3', t: 'బోనస్ పొందండి', d: '200% బోనస్ స్వయంచాలకంగా జమ అవుతుంది' },
                { n: '4', t: 'వేజర్ & విత్‌డ్రా', d: '3x వేజరింగ్ తర్వాత వెళ్లగొట్టండి' },
              ] : [
                { n: '1', t: 'Register Account', d: 'Open a new DafaBet India account' },
                { n: '2', t: 'Make a Deposit', d: 'Deposit minimum ₹500 via UPI/Paytm/PhonePe' },
                { n: '3', t: 'Bonus Credited', d: '200% bonus added to your sports balance' },
                { n: '4', t: 'Wager & Withdraw', d: 'Complete 3x wagering then withdraw winnings' },
              ]).map((step) => (
                <li key={step.n} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-gold-500 text-dark-950 rounded-full flex items-center justify-center text-sm font-black">
                    {step.n}
                  </span>
                  <div>
                    <div className="text-white font-semibold text-sm">{step.t}</div>
                    <div className="text-gray-400 text-sm">{step.d}</div>
                  </div>
                </li>
              ))}
            </ol>
            <div className={`mt-4 p-3 bg-gold-500/5 border border-gold-500/20 rounded-lg text-xs text-gray-400 ${f}`}>
              {isTE ? '18+ | T&C వర్తిస్తాయి | బాధ్యతాయుతంగా బెట్ చేయండి' : '18+ | T&C Apply | Please Gamble Responsibly'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
