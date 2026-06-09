interface ProsConsProps {
  pros: string[];
  cons: string[];
  lang?: 'en' | 'te';
}

export default function ProsCons({ pros, cons, lang = 'en' }: ProsConsProps) {
  const isTE = lang === 'te';
  const f = isTE ? 'font-telugu' : '';

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="bg-green-950/30 border border-green-500/20 rounded-xl p-5">
        <h3 className={`text-green-400 font-bold text-lg mb-3 ${f}`}>
          {isTE ? '✅ ప్రయోజనాలు' : '✅ Pros'}
        </h3>
        <ul className="space-y-2">
          {pros.map((p, i) => (
            <li key={i} className={`flex items-start gap-2 text-gray-300 text-sm ${f}`}>
              <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-red-950/30 border border-red-500/20 rounded-xl p-5">
        <h3 className={`text-red-400 font-bold text-lg mb-3 ${f}`}>
          {isTE ? '❌ నష్టాలు' : '❌ Cons'}
        </h3>
        <ul className="space-y-2">
          {cons.map((c, i) => (
            <li key={i} className={`flex items-start gap-2 text-gray-300 text-sm ${f}`}>
              <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
