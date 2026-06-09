// Internal link graph for DafaWin — bidirectional equity distribution
// Each slug lists its most relevant outbound targets (max 4 rendered)
export const INTERNAL_LINK_GRAPH: Record<string, string[]> = {
  index: ['dafabet-review', 'cricket-betting', 'dafabet-bonus', 'dafabet-registration'],
  'dafabet-review': ['cricket-betting', 'ipl-betting', 'dafabet-bonus', 'dafabet-app-download'],
  'cricket-betting': ['ipl-betting', 'sports-betting', 'dafabet-review', 'dafabet-bonus'],
  'ipl-betting': ['cricket-betting', 'sports-betting', 'dafabet-review', 'dafabet-bonus'],
  'online-casino': ['dafabet-review', 'dafabet-bonus', 'sports-betting', 'dafabet-registration'],
  'dafabet-bonus': ['dafabet-review', 'dafabet-registration', 'cricket-betting', 'ipl-betting'],
  'dafabet-registration': ['dafabet-bonus', 'dafabet-payment', 'dafabet-app-download', 'dafabet-review'],
  'dafabet-payment': ['dafabet-registration', 'dafabet-review', 'dafabet-app-download', 'dafabet-bonus'],
  'dafabet-app-download': ['dafabet-review', 'dafabet-registration', 'cricket-betting', 'dafabet-payment'],
  'sports-betting': ['cricket-betting', 'ipl-betting', 'online-casino', 'dafabet-review'],
  'responsible-gambling': ['dafabet-review', 'dafabet-registration', 'dafabet-payment', 'dafabet-app-download'],
};

// Short display titles for both locales — kept concise for link anchors
export const PAGE_LINK_LABELS: Record<string, { en: string; te: string }> = {
  index: { en: 'DafaBet India Home', te: 'దఫాబెట్ ఇండియా హోమ్' },
  'dafabet-review': { en: 'DafaBet India Review', te: 'దఫాబెట్ రివ్యూ' },
  'cricket-betting': { en: 'Cricket Betting Guide', te: 'క్రికెట్ బెట్టింగ్ గైడ్' },
  'ipl-betting': { en: 'IPL Betting Guide', te: 'IPL బెట్టింగ్ గైడ్' },
  'online-casino': { en: 'Online Casino India', te: 'ఆన్‌లైన్ కాసినో' },
  'dafabet-bonus': { en: 'DafaBet Bonus & Promo Codes', te: 'బోనస్ & ప్రోమో కోడ్లు' },
  'dafabet-registration': { en: 'Registration Guide', te: 'రిజిస్ట్రేషన్ గైడ్' },
  'dafabet-payment': { en: 'Payment Methods — UPI & Paytm', te: 'పేమెంట్ పద్ధతులు' },
  'dafabet-app-download': { en: 'DafaBet App Download', te: 'యాప్ డౌన్‌లోడ్' },
  'sports-betting': { en: 'Sports Betting India', te: 'స్పోర్ట్స్ బెట్టింగ్' },
  'responsible-gambling': { en: 'Responsible Gambling', te: 'బాధ్యతాయుత జూదం' },
};

export interface InternalLink {
  href: string;
  title: string;
}

export function getRelatedPages(slug: string, lang: 'en' | 'te'): InternalLink[] {
  const related = INTERNAL_LINK_GRAPH[slug] ?? [];
  return related.slice(0, 4).map((s) => ({
    href: lang === 'te' ? (s === 'index' ? '/te/' : `/te/${s}/`) : (s === 'index' ? '/' : `/${s}/`),
    title: PAGE_LINK_LABELS[s]?.[lang] ?? s,
  }));
}

// Alternate locale href for a given slug — used in og:locale:alternate and page links
export function getAlternateHref(slug: string, targetLang: 'en' | 'te'): string {
  const base = 'https://dafawin.in';
  if (targetLang === 'te') {
    return slug === 'index' ? `${base}/te/` : `${base}/te/${slug}/`;
  }
  return slug === 'index' ? `${base}/` : `${base}/${slug}/`;
}
