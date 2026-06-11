const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dafa-win.com';
const SITE_NAME = 'DafaWin';

export function breadcrumb(locale: string, slug: string, label: string) {
  const base = `${SITE_URL}/${locale}`;
  const items = [
    { '@type': 'ListItem', position: 1, name: locale === 'te' ? 'హోమ్' : 'Home', item: `${base}/` },
  ];
  if (slug !== 'index') {
    items.push({ '@type': 'ListItem', position: 2, name: label, item: `${base}/${slug}/` });
  }
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
}

export function review(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@type': 'Organization', name: 'DafaBet India', url: 'https://www.dafabet.com' },
    author: { '@type': 'Person', name: locale === 'te' ? 'అర్జున్ రెడ్డి' : 'Rahul Sharma' },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    reviewRating: { '@type': 'Rating', ratingValue: '8.5', bestRating: '10', worstRating: '1' },
  };
}

export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', availableLanguage: ['English', 'Telugu', 'Hindi'] },
  };
}

export function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function howTo(locale: string) {
  const steps = locale === 'te' ? [
    { name: 'DafaBet సైట్ సందర్శించండి', text: 'వెబ్‌సైట్ తెరవండి మరియు "రిజిస్టర్" నొక్కండి.' },
    { name: 'వివరాలు నమోదు చేయండి', text: 'పేరు, పుట్టిన తేదీ, ఇమెయిల్ నమోదు చేయండి.' },
    { name: 'డిపాజిట్ చేయండి', text: 'కనీసం ₹500 PhonePe/UPI లో జమ చేయండి.' },
    { name: 'బోనస్ పొందండి', text: '200% వెల్‌కమ్ బోనస్ స్వయంచాలకంగా జమ అవుతుంది.' },
  ] : [
    { name: 'Visit DafaBet India', text: 'Open the website and click Register.' },
    { name: 'Fill Personal Details', text: 'Enter your name, date of birth, and email.' },
    { name: 'Make First Deposit', text: 'Deposit at least ₹500 via UPI or Paytm.' },
    { name: 'Claim 200% Bonus', text: 'Bonus is credited automatically after deposit.' },
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: locale === 'te' ? 'DafaBet లో నమోదు ఎలా చేసుకోవాలి' : 'How to Register at DafaBet India',
    step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, ...s })),
  };
}

export function sportsEvent() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: 'IPL 2025',
    sport: 'Cricket',
    location: { '@type': 'Country', name: 'India' },
    description: 'Indian Premier League 2025 — live cricket betting at DafaWin',
  };
}
