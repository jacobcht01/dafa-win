import Link from 'next/link';

interface HeroProps {
  lang?: 'en' | 'te';
}

export default function HeroSection({ lang = 'en' }: HeroProps) {
  const isTE = lang === 'te';
  const isFont = isTE ? 'font-telugu' : '';

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 py-16 sm:py-24 ${isFont}`}>
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 rounded-full bg-gold-600/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 text-gold-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span>⭐</span>
            <span>{isTE ? '#1 తెలుగు బెట్టింగ్ గైడ్ 2025' : '#1 Trusted Betting Guide India 2025'}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            {isTE ? (
              <>
                <span className="text-gold-400">దఫాబెట్ ఇండియా</span>
                <br />
                <span className="text-gray-200">తెలుగు గైడ్ 2025</span>
              </>
            ) : (
              <>
                <span className="text-gold-400">DafaBet India</span>
                <br />
                <span className="text-gray-200">Expert Guide 2025</span>
              </>
            )}
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {isTE
              ? 'IPL క్రికెట్ బెట్టింగ్, 200% వెల్‌కమ్ బోనస్ (₹20,000 వరకు), UPI/PhonePe డిపాజిట్లు — అన్నీ తెలుగులో వివరించబడ్డాయి.'
              : 'IPL cricket betting, 200% welcome bonus up to ₹20,000, instant UPI deposits. Everything for Indian bettors — expert-reviewed.'}
          </p>

          {/* Rating */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="flex items-center gap-1">
              {[1,2,3,4].map(i => (
                <span key={i} className="text-gold-400 text-2xl">★</span>
              ))}
              <span className="text-gold-400 text-2xl">½</span>
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-lg">8.5/10</div>
              <div className="text-gray-400 text-sm">{isTE ? 'మా రేటింగ్' : 'Our Rating'}</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.dafabet.com/?utm_source=dafawin"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-dark-950 font-black text-lg rounded-xl transition-all hover:scale-105 shadow-lg shadow-gold-500/25"
            >
              <span>🎯</span>
              <span>{isTE ? '200% బోనస్ పొందండి' : 'Claim 200% Bonus'}</span>
              <span>→</span>
            </a>
            <Link
              href={isTE ? '/te/dafabet-review/' : '/dafabet-review/'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold-500/40 text-gold-400 hover:border-gold-400 font-bold text-lg rounded-xl transition-all"
            >
              {isTE ? 'పూర్తి రివ్యూ చదవండి' : 'Read Full Review'}
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1"><span className="text-green-400">✓</span> {isTE ? 'లైసెన్స్ పొందిన' : 'Licensed & Regulated'}</span>
            <span className="flex items-center gap-1"><span className="text-green-400">✓</span> {isTE ? 'తక్షణ UPI' : 'Instant UPI'}</span>
            <span className="flex items-center gap-1"><span className="text-green-400">✓</span> {isTE ? '24/7 సపోర్ట్' : '24/7 Support'}</span>
            <span className="flex items-center gap-1"><span className="text-green-400">✓</span> {isTE ? '18+ మాత్రమే' : '18+ Only'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
