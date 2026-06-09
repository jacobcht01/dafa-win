export interface PageConfig {
  showRating?: boolean;
  showProsCons?: boolean;
  showBonus?: boolean;
  ratings?: { label: string; score: number }[];
  overall?: number;
  pros?: string[];
  cons?: string[];
}

export const PAGE_CONFIG: Record<string, PageConfig> = {
  'dafabet-review': {
    showRating: true,
    showProsCons: true,
    showBonus: true,
    overall: 8.5,
    ratings: [
      { label: 'Cricket Betting', score: 9.5 },
      { label: 'Bonuses', score: 9 },
      { label: 'Payments', score: 9 },
      { label: 'Mobile App', score: 8 },
      { label: 'Casino', score: 8 },
      { label: 'Support', score: 8 },
    ],
    pros: [
      '200% welcome bonus up to ₹20,000',
      'Lowest wagering requirement (3x)',
      'Instant UPI, Paytm & PhonePe deposits',
      'Best cricket odds — tested across 50 IPL matches',
      '24/7 live chat support in English & Hindi',
      'Ball-by-ball live IPL betting with cash-out',
    ],
    cons: [
      'No live streaming of cricket matches',
      'Occasional withdrawal delays reported',
      'Casino wagering (20x) is industry average',
      'No dedicated app on Indian Google Play Store',
    ],
  },
  'cricket-betting': {
    showBonus: true,
  },
  'ipl-betting': {
    showBonus: true,
  },
  'online-casino': {
    showRating: true,
    overall: 8,
    ratings: [
      { label: 'Teen Patti / Andar Bahar', score: 9.5 },
      { label: 'Live Casino', score: 9 },
      { label: 'Slots', score: 8 },
      { label: 'Game Variety', score: 8.5 },
      { label: 'Mobile Casino', score: 8 },
    ],
  },
  'dafabet-bonus': {
    showBonus: false,
  },
  'dafabet-registration': {
    showBonus: true,
  },
  'dafabet-payment': {},
  'dafabet-app-download': {},
  'sports-betting': {
    showBonus: true,
  },
  'responsible-gambling': {},
};

/**
 * Extract FAQ items from markdown body by finding ### headings inside a FAQ section.
 * Returns at most 10 items.
 */
export function extractFaqs(body: string, _lang: 'en' | 'te'): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];

  // Find FAQ section — look for a ## heading containing "FAQ" or "ప్రశ్న"
  const faqMatch = body.match(/##\s+[^\n]*(?:FAQ|ప్రశ్న|Frequently)[^\n]*([\s\S]*?)(?=\n##\s|\n---|\n\*|$)/i);
  if (!faqMatch) return faqs;

  const section = faqMatch[1];

  // Each Q/A pair is a ### heading followed by content until the next ###
  const pairs = section.split(/\n###\s+/).slice(1);
  for (const pair of pairs.slice(0, 10)) {
    const lines = pair.split('\n');
    const question = lines[0].trim().replace(/^#+\s*/, '');
    const answer = lines.slice(1).join('\n').trim().replace(/\n+/g, ' ');
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  return faqs;
}
