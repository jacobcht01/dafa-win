import { PageMeta } from './content';

const SITE_URL = 'https://dafawin.in';
const SITE_NAME = 'DafaWin';

export function buildBreadcrumb(slug: string, lang: 'en' | 'te', title: string) {
  const base = lang === 'te' ? `${SITE_URL}/te` : SITE_URL;
  const items = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: lang === 'te' ? `${SITE_URL}/te/` : `${SITE_URL}/` },
  ];
  if (slug !== 'index') {
    items.push({ '@type': 'ListItem', position: 2, name: title, item: `${base}/${slug}/` });
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

export function buildReviewSchema(lang: 'en' | 'te') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Organization',
      name: 'DafaBet India',
      url: 'https://www.dafabet.com',
    },
    author: {
      '@type': 'Person',
      name: lang === 'te' ? 'అర్జున్ రెడ్డి' : 'Rahul Sharma',
    },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    reviewRating: { '@type': 'Rating', ratingValue: '8.5', bestRating: '10', worstRating: '1' },
    reviewBody: lang === 'te'
      ? 'దఫాబెట్ ఇండియాలో బెట్టింగ్‌కు #1 సైట్. IPL క్రికెట్, UPI పేమెంట్, 200% బోనస్.'
      : 'DafaBet India is the #1 betting site for IPL cricket. Best odds, instant UPI deposits, and a 200% welcome bonus.',
  };
}

export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['English', 'Telugu', 'Hindi'],
    },
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function buildHowToSchema(lang: 'en' | 'te') {
  const steps = lang === 'te' ? [
    { name: 'DafaBet సైట్ సందర్శించండి', text: 'DafaBet వెబ్‌సైట్ తెరవండి మరియు "రిజిస్టర్" బటన్ క్లిక్ చేయండి.' },
    { name: 'వ్యక్తిగత వివరాలు నమోదు చేయండి', text: 'మీ పేరు, పుట్టిన తేదీ, ఇమెయిల్ మరియు మొబైల్ నంబర్ నమోదు చేయండి.' },
    { name: 'డిపాజిట్ చేయండి', text: 'PhonePe లేదా UPI ద్వారా కనీసం ₹500 డిపాజిట్ చేయండి.' },
    { name: 'బోనస్ పొందండి', text: '200% వెల్‌కమ్ బోనస్ స్వయంచాలకంగా జమ అవుతుంది.' },
  ] : [
    { name: 'Visit DafaBet India', text: 'Open the DafaBet website and click the "Register" or "Join Now" button.' },
    { name: 'Enter Personal Details', text: 'Fill in your name, date of birth, email, and mobile number.' },
    { name: 'Make a Deposit', text: 'Deposit at least ₹500 via UPI, Paytm, or PhonePe.' },
    { name: 'Claim Your Bonus', text: 'Your 200% welcome bonus is credited automatically after deposit.' },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: lang === 'te' ? 'DafaBet ఇండియాలో నమోదు ఎలా చేసుకోవాలి' : 'How to Register at DafaBet India',
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function buildSportsEventSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: 'IPL 2026',
    sport: 'Cricket',
    startDate: '2026-03-22',
    endDate: '2026-05-31',
    location: { '@type': 'Country', name: 'India' },
    description: 'Indian Premier League 2026 — live cricket betting odds at DafaBet India',
  };
}

export function buildArticleSchema(meta: PageMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description ?? '',
    author: {
      '@type': 'Person',
      name: meta.author,
    },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    datePublished: meta.lastUpdated,
    dateModified: meta.lastUpdated,
    url: `${SITE_URL}${meta.url}`,
    inLanguage: meta.lang === 'te' ? 'te-IN' : 'en-IN',
  };
}

export function getSchemas(meta: PageMeta, faqs?: { question: string; answer: string }[]) {
  const schemas: object[] = [];
  schemas.push(buildBreadcrumb(meta.slug, meta.lang, meta.title));

  for (const s of meta.schema) {
    if (s === 'Article') schemas.push(buildArticleSchema(meta));
    if (s === 'Review') schemas.push(buildReviewSchema(meta.lang));
    if (s === 'FAQPage' && faqs) schemas.push(buildFaqSchema(faqs));
    if (s === 'Organization') schemas.push(buildOrganizationSchema());
    if (s === 'WebSite') schemas.push(buildWebSiteSchema());
    if (s === 'HowTo') schemas.push(buildHowToSchema(meta.lang));
    if (s === 'SportsEvent') schemas.push(buildSportsEventSchema());
  }

  return schemas;
}
