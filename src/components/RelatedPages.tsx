import type { InternalLink } from '@/lib/internal-links';

interface RelatedPagesProps {
  pages: InternalLink[];
  lang: 'en' | 'te';
}

export default function RelatedPages({ pages, lang }: RelatedPagesProps) {
  if (pages.length === 0) return null;

  const heading = lang === 'te' ? 'సంబంధిత గైడ్లు' : 'Related Guides';

  return (
    <nav aria-label={heading} className="mt-10 pt-8 border-t border-gold-500/20">
      <h2 className={`text-xl font-bold text-gold-400 mb-4 ${lang === 'te' ? 'font-telugu' : ''}`}>
        {heading}
      </h2>
      <ul className="grid sm:grid-cols-2 gap-3">
        {pages.map((p) => (
          <li key={p.href}>
            <a
              href={p.href}
              className={`flex items-center gap-2 p-3 bg-dark-800 hover:bg-dark-700 border border-gold-500/20 hover:border-gold-500/40 rounded-xl text-gray-300 hover:text-gold-400 transition-all text-sm ${lang === 'te' ? 'font-telugu' : ''}`}
            >
              <span className="text-gold-500 flex-shrink-0">▸</span>
              {p.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
