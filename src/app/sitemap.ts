import type { MetadataRoute } from 'next';
import { EN_SLUGS } from '@/lib/content';

const BASE = 'https://dafawin.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const enPages = EN_SLUGS.map((slug) => ({
    url: slug === 'index' ? `${BASE}/` : `${BASE}/${slug}/`,
    lastModified: now,
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
    lastModified: now,
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
