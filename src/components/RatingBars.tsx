interface Row { label: string; score: number }

export default function RatingBars({ rows, overall }: { rows: Row[]; overall: number }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Our Rating</h3>
        <div className="text-right">
          <div className="text-4xl font-black text-gold-400">{overall}</div>
          <div className="text-gray-400 text-xs">/10</div>
        </div>
      </div>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">{r.label}</span>
              <span className="text-gold-400 font-bold">{r.score}/10</span>
            </div>
            <div className="h-2 bg-brand-surface rounded-full overflow-hidden">
              <div className="h-full bg-gold-gradient rounded-full" style={{ width: `${r.score * 10}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
