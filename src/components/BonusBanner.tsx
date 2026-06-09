interface BonusBannerProps {
  locale: string;
}

export default function BonusBanner({ locale }: BonusBannerProps) {
  const isTE = locale === 'te';
  return (
    <div className="bg-brand-card border border-gold-500/30 rounded-2xl p-6">
      <p className="text-gold-400 font-bold text-sm mb-1">
        {isTE ? '🎁 ప్రస్తుత ఆఫర్' : '🎁 Current Offer'}
      </p>
      <p className="text-2xl font-black text-white mb-1">
        {isTE ? '200% బోనస్' : '200% Bonus'}
      </p>
      <p className="text-gray-400 text-sm mb-4">
        {isTE ? '₹20,000 వరకు — 3x వేజరింగ్ మాత్రమే' : 'Up to ₹20,000 — only 3x wagering'}
      </p>
      <a
        href="https://www.dafabet.com/?utm_source=dafawin&utm_content=sidebar"
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="btn-primary w-full justify-center mb-2"
      >
        {isTE ? '🎯 బోనస్ పొందండి →' : '🎯 Claim Bonus →'}
      </a>
      <p className="text-gray-500 text-xs text-center">
        {isTE ? '18+ | T&C వర్తిస్తాయి' : '18+ | T&C Apply | Gamble Responsibly'}
      </p>
    </div>
  );
}
