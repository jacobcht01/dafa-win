import type { MetadataRoute } from 'next';
import { EN_SLUGS, getPageContent } from '@/lib/content';

const BASE = 'https://dafawin.in';

function parseLastModified(slug: string, lang: 'en' | 'te'): Date {
  const page = getPageContent(lang, slug);
  if (page?.lastUpdated) {
    const parsed = new Date(page.lastUpdated);
    if (!isNaN(parsed.getTime())) return parsed;
  }
  return new Date('2025-06-09');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const enPages = EN_SLUGS.map((slug) => ({
    url: slug === 'index' ? `${BASE}/` : `${BASE}/${slug}/`,
    lastModified: parseLastModified(slug, 'en'),
    changeFrequency: 'weekly' as const,
    priority: slug === 'index' ? 1.0 : 0.8,
    alternates: {
      languages: {
        'te-IN': slug === 'index' ? `${BASE}/te/` : `${BASE}/te/${slug}/`,
      },
    },
  }));

  const tePages = EN_SLUGS.map((slug) => ({
    url: slug === 'index' ? `${BASE}/te/` : `${BASE}/te/${slug}/`,
    lastModified: parseLastModified(slug, 'te'),
    changeFrequency: 'weekly' as const,
    priority: slug === 'index' ? 0.9 : 0.7,
    alternates: {
      languages: {
        'en-IN': slug === 'index' ? `${BASE}/` : `${BASE}/${slug}/`,
      },
    },
  }));

  return [...enPages, ...tePages];
}
