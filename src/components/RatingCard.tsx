interface RatingRow {
  label: string;
  score: number;
  max?: number;
}

interface RatingCardProps {
  ratings: RatingRow[];
  overall: number;
  lang?: 'en' | 'te';
}

export default function RatingCard({ ratings, overall, lang = 'en' }: RatingCardProps) {
  const isTE = lang === 'te';

  return (
    <div className={`bg-dark-800 border border-gold-500/20 rounded-2xl p-6 ${isTE ? 'font-telugu' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-white">
          {isTE ? 'మా రేటింగ్' : 'Our Rating'}
        </h3>
        <div className="text-right">
          <div className="text-4xl font-black text-gold-400">{overall}</div>
          <div className="text-gray-400 text-sm">/10</div>
        </div>
      </div>
      <div className="space-y-3">
        {ratings.map((r) => {
          const pct = (r.score / (r.max ?? 10)) * 100;
          return (
            <div key={r.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">{r.label}</span>
                <span className="text-gold-400 font-bold">{r.score}/10</span>
              </div>
              <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
