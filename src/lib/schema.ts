const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dafawin.in'
const BRAND = 'DafaWin'
const ORG_ID = `${BASE_URL}/#organization`

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: BRAND,
    alternateName: ['DafaBet India', 'Dafawin India'],
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${BASE_URL}/#logo`,
      url: `${BASE_URL}/logo.png`,
      width: 512,
      height: 512,
      caption: BRAND,
    },
    areaServed: { '@type': 'Country', name: 'India' },
    knowsLanguage: ['en-IN', 'te-IN'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['English', 'Telugu'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: BRAND,
    description: 'DafaWin India — Expert DafaBet review, cricket & IPL betting guide, app download, bonuses and more.',
    inLanguage: ['en-IN', 'te-IN'],
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/?s={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function reviewSchema(args: {
  name: string
  description: string
  url: string
  ratingValue: number
  ratingCount: number
  bestRating?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: args.name,
    description: args.description,
    url: args.url,
    itemReviewed: {
      '@type': 'Product',
      name: 'DafaBet India',
      url: 'https://dafabet.com',
      brand: { '@type': 'Brand', name: 'DafaBet' },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: args.ratingValue,
      bestRating: args.bestRating ?? 10,
      worstRating: 1,
    },
    author: {
      '@type': 'Organization',
      name: BRAND,
      url: BASE_URL,
    },
    publisher: { '@id': ORG_ID },
  }
}

export function aggregateRatingSchema(ratingValue: number, reviewCount: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue,
    reviewCount,
    bestRating: 10,
    worstRating: 1,
    itemReviewed: {
      '@type': 'Product',
      name: 'DafaBet India',
    },
  }
}

export function howToSchema(args: {
  name: string
  description: string
  steps: { name: string; text: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: args.name,
    description: args.description,
    step: args.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function articleSchema(args: {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: args.headline,
    description: args.description,
    url: args.url,
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-IN',
  }
}

export function sportsEventSchema(args: {
  name: string
  description: string
  url: string
  startDate: string
  endDate?: string
  location?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: args.name,
    description: args.description,
    url: args.url,
    startDate: args.startDate,
    ...(args.endDate ? { endDate: args.endDate } : {}),
    location: {
      '@type': 'Place',
      name: args.location ?? 'India',
      address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    },
    sport: 'Cricket',
    organizer: { '@id': ORG_ID },
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
