import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/_next/',
          '/api/',
          '/*.json$',
        ],
      },
    ],
    sitemap: 'https://dafawin.in/sitemap.xml',
    host: 'https://dafawin.in',
  };
}
