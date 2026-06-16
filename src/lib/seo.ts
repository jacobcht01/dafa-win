const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dafa-win.com'

/**
 * Returns canonical URL and hreflang alternates for a given page.
 * slug: the locale-neutral path, e.g. '/' or '/dafabet-review/'
 */
export function pageAlternates(locale: string, slug: string) {
  const normalized = slug.endsWith('/') ? slug : `${slug}/`
  const enUrl = `${BASE_URL}${normalized}`
  const teBase = normalized === '/' ? '/te/' : `/te${normalized}`
  const teUrl = `${BASE_URL}${teBase}`
  const canonicalUrl = locale === 'te' ? teUrl : enUrl

  return {
    canonical: canonicalUrl,
    languages: {
      'en-IN': enUrl,
      'te-IN': teUrl,
      'x-default': enUrl,
    } as Record<string, string>,
  }
}

export const SITE_URL = BASE_URL

export function pageOGMeta(args: {
  title: string
  description: string
  canonicalUrl: string
  locale: string
  imageUrl?: string
}) {
  const ogLocale = args.locale === 'te' ? 'te_IN' : 'en_IN'
  const image = args.imageUrl ?? `${BASE_URL}/images/og-default.jpg`
  return {
    openGraph: {
      title: args.title,
      description: args.description,
      url: args.canonicalUrl,
      siteName: 'DafaWin',
      locale: ogLocale,
      type: 'website' as const,
      images: [{ url: image, width: 1200, height: 630, alt: args.title }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: args.title,
      description: args.description,
      images: [image],
    },
  }
}
