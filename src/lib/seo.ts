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
