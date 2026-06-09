'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const isTE = pathname.startsWith('/te');
  const enPath = isTE ? pathname.replace(/^\/te/, '') || '/' : pathname;
  const tePath = isTE ? pathname : `/te${pathname === '/' ? '' : pathname}`;

  return (
    <div className="flex items-center gap-1 text-sm">
      <Link
        href={enPath}
        className={`px-3 py-1 rounded-full font-medium transition-colors ${
          !isTE
            ? 'bg-gold-500 text-dark-950'
            : 'text-gold-400 hover:text-gold-300'
        }`}
        lang="en"
      >
        EN
      </Link>
      <span className="text-dark-200 opacity-40">|</span>
      <Link
        href={tePath}
        className={`px-3 py-1 rounded-full font-medium transition-colors font-telugu ${
          isTE
            ? 'bg-gold-500 text-dark-950'
            : 'text-gold-400 hover:text-gold-300'
        }`}
        lang="te"
      >
        తె
      </Link>
    </div>
  );
}
