import Link from 'next/link';

interface HeroProps {
  lang?: 'en' | 'te';
}

export default function HeroSection({ lang = 'en' }: HeroProps) {
  const isTE = lang === 'te';
  const f = isTE ? 'font-telugu' : '';

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-12 sm:py-20 ${f}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-sport-red-500/5 blur-3xl" />
        <div className="absolute bottom-0 -left-1/4 w-96 h-96 rounded-full bg-navy-600/30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: content */}
          <div>
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-sport-red-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-5 shadow-lg shadow-sport-red-500/30">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              {isTE ? 'లైవ్ బెట్టింగ్ అందుబాటులో ఉంది' : 'LIVE BETTING AVAILABLE'}
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
              {isTE ? (
                <>
                  <span className="text-sport-red-400">DafaBet ఇండియా</span>
                  <br />
                  <span className="text-navy-100">తెలుగు గైడ్ 2025</span>
                </>
              ) : (
                <>
                  <span className="text-sport-red-400">DafaBet India</span>
                  <br />
                  <span className="text-navy-100">Expert Betting Guide</span>
                </>
              )}
            </h1>

            <p className="text-navy-200 text-base sm:text-lg mb-7 leading-relaxed">
              {isTE
                ? 'IPL క్రికెట్, ఫుట్‌బాల్, కబడ్డీ — అన్ని స్పోర్ట్స్‌లో లైవ్ బెట్టింగ్. 200% వెల్‌కమ్ బోనస్ + తక్షణ UPI పేమెంట్లు.'
                : 'Cricket, Football, Kabaddi — live betting on all sports. 200% welcome bonus + instant UPI payments for Indian players.'}
            </p>

            {/* Stats strip */}
            <div className="flex flex-wrap gap-4 mb-7">
              {[
                { icon: '⭐', val: '8.5/10', label: isTE ? 'రేటింగ్' : 'Rating' },
                { icon: '🎁', val: '200%', label: isTE ? 'బోనస్' : 'Bonus' },
                { icon: '⚡', val: isTE ? 'తక్షణ' : 'Instant', label: 'UPI' },
                { icon: '🏆', val: '30+', label: isTE ? 'స్పోర్ట్స్' : 'Sports' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 bg-navy-800/60 border border-navy-600 rounded-lg px-3 py-2">
                  <span className="text-lg">{s.icon}</span>
                  <div>
                    <div className="text-white text-sm font-bold">{s.val}</div>
                    <div className="text-navy-300 text-xs">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.dafabet.com/?utm_source=dafawin"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-sport-red-500 hover:bg-sport-red-400 text-white font-black text-base rounded-xl transition-all hover:scale-105 shadow-lg shadow-sport-red-500/30"
              >
                <span>🎯</span>
                <span>{isTE ? '200% బోనస్ పొందండి' : 'Claim 200% Bonus'}</span>
                <span>→</span>
              </a>
              <Link
                href={isTE ? '/te/dafabet-review/' : '/dafabet-review/'}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-navy-500 text-navy-100 hover:border-sport-red-500 hover:text-white font-bold text-base rounded-xl transition-all"
              >
                {isTE ? 'పూర్తి రివ్యూ' : 'Full Review'}
              </Link>
            </div>

            <p className="text-navy-400 text-xs mt-3">
              {isTE ? '18+ | T&C వర్తిస్తాయి | బాధ్యతాయుతంగా ఆడండి' : '18+ | T&C Apply | Please Gamble Responsibly'}
            </p>
          </div>

          {/* Right: promo card */}
          <div className="hidden lg:block">
            <div className="relative bg-gradient-to-br from-navy-800 to-navy-950 rounded-2xl border border-navy-600 shadow-2xl overflow-hidden">
              {/* Card header */}
              <div className="bg-sport-red-500 px-6 py-4">
                <div className="text-white text-sm font-semibold uppercase tracking-wider mb-1">
                  {isTE ? 'స్వాగత ఆఫర్' : 'Welcome Offer'}
                </div>
                <div className="text-white text-3xl font-black">
                  {isTE ? '200% వరకు ₹20,000' : 'Up to ₹20,000'}
                </div>
                <div className="text-sport-red-100 text-sm">
                  {isTE ? '200% మ్యాచ్ బోనస్' : '200% Match Bonus'}
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 space-y-3">
                {[
                  { icon: '✓', text: isTE ? 'తక్కువ వేజరింగ్ — కేవలం 3x' : 'Low wagering — only 3x' },
                  { icon: '✓', text: isTE ? 'UPI, PhonePe, Paytm' : 'UPI, PhonePe, Paytm accepted' },
                  { icon: '✓', text: isTE ? 'తక్షణ డిపాజిట్లు' : 'Instant deposits & withdrawals' },
                  { icon: '✓', text: isTE ? '30+ స్పోర్ట్స్ మార్కెట్లు' : '30+ sports betting markets' },
                  { icon: '✓', text: isTE ? 'లైవ్ IPL బెట్టింగ్' : 'Live IPL cricket betting' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-navy-100">
                    <span className="flex-shrink-0 w-5 h-5 bg-sport-red-500/20 text-sport-red-400 rounded-full flex items-center justify-center text-xs font-bold">
                      {item.icon}
                    </span>
                    <span className={`text-sm ${isTE ? 'font-telugu' : ''}`}>{item.text}</span>
                  </div>
                ))}

                <div className="pt-4">
                  <a
                    href="https://www.dafabet.com/?utm_source=dafawin&utm_content=hero-card"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="block w-full text-center px-4 py-3 bg-sport-red-500 hover:bg-sport-red-400 text-white font-black rounded-xl transition-all hover:scale-105 shadow-lg shadow-sport-red-500/20"
                  >
                    {isTE ? 'ఇప్పుడే చేరండి →' : 'Join Now →'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
