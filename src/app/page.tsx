import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import SportCards from '@/components/SportCards';
import BonusSection from '@/components/BonusSection';
import FaqSection from '@/components/FaqSection';
import RatingCard from '@/components/RatingCard';
import ProsCons from '@/components/ProsCons';
import JsonLd from '@/components/JsonLd';
import MarkdownContent from '@/components/MarkdownContent';
import WhatsAppFloater from '@/components/WhatsAppFloater';
import { getPageContent } from '@/lib/content';
import { getSchemas } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'DafaBet India 2025 — Official Betting Guide & Review | DafaWin',
  description: 'Complete DafaBet India guide. Expert review of odds, bonuses, cricket betting, and the DafaBet app. Get your welcome bonus today. 18+ | Gamble responsibly.',
  alternates: {
    canonical: 'https://dafawin.in/',
    languages: {
      'x-default': 'https://dafawin.in/',
      'en-IN': 'https://dafawin.in/',
      'te-IN': 'https://dafawin.in/te/',
    },
  },
  openGraph: {
    title: 'DafaBet India 2025 — Official Betting Guide & Review | DafaWin',
    description: 'Complete DafaBet India guide. Expert review of odds, bonuses, cricket betting, and the DafaBet app.',
    url: 'https://dafawin.in/',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DafaWin — DafaBet India Betting Guide 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DafaBet India 2025 — Official Betting Guide & Review',
    description: 'Complete DafaBet India guide. Expert review of odds, bonuses, cricket betting, and the DafaBet app.',
    images: ['/og-image.png'],
  },
};

const RATINGS = [
  { label: 'Cricket Betting', score: 9.5 },
  { label: 'Bonuses', score: 9 },
  { label: 'Payments', score: 9 },
  { label: 'Mobile App', score: 8 },
  { label: 'Casino', score: 8 },
  { label: 'Support', score: 8 },
];

const PROS = [
  '200% welcome bonus up to ₹20,000',
  'Lowest wagering requirement (3x) in market',
  'Instant UPI, Paytm & PhonePe deposits',
  'Best cricket odds — tested across 50 IPL matches',
  '30+ sports, 1,000+ casino games',
  'Ball-by-ball live IPL betting',
  '24/7 live chat support',
];

const CONS = [
  'No live streaming of cricket matches',
  'Occasional withdrawal delays reported',
  'Casino wagering (20x) is industry average',
  'No dedicated app on Indian Google Play Store',
];

const FAQS = [
  {
    question: 'Is DafaBet legal in India?',
    answer: 'DafaBet operates under an Isle of Man gambling licence. While Indian law does not explicitly allow or ban online betting with offshore operators, millions of Indian players use DafaBet without legal issues.',
  },
  {
    question: 'What is the DafaBet welcome bonus?',
    answer: 'New players receive a 200% welcome bonus up to ₹20,000 on their first sports deposit. Deposit ₹10,000 and play with ₹30,000. The wagering requirement is just 3x — the lowest in the Indian market.',
  },
  {
    question: 'Does DafaBet accept UPI deposits?',
    answer: 'Yes. DafaBet accepts UPI, Paytm, PhonePe, and Net Banking. Deposits are instant. Minimum deposit is ₹500.',
  },
  {
    question: 'How do I download the DafaBet India app?',
    answer: 'The Android app is available as a direct APK download from the DafaBet website — not the Google Play Store. The iOS app is on the App Store. See our app download guide for step-by-step instructions.',
  },
  {
    question: 'How long do DafaBet withdrawals take?',
    answer: 'UPI and Paytm withdrawals typically take 1-2 business days. Net Banking withdrawals take 2-3 days. Minimum withdrawal is ₹500.',
  },
];

export default function HomePage() {
  const page = getPageContent('en', 'index');
  const schemas = page ? getSchemas({ ...page, schema: ['Organization', 'WebSite', 'BreadcrumbList', 'Review', 'FAQPage'] }, FAQS) : [];

  return (
    <>
      <JsonLd schemas={schemas} />
      <Header lang="en" />
      <main>
        <HeroSection lang="en" />
        <SportCards lang="en" />
        <BonusSection lang="en" />

        {/* Content + Sidebar */}
        <section className="py-12 sm:py-16 bg-navy-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {page && <MarkdownContent content={page.body} lang="en" />}
              </div>
              <aside className="space-y-6">
                <RatingCard ratings={RATINGS} overall={8.5} lang="en" />
                <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Claim Your Bonus</h3>
                  <a
                    href="https://www.dafabet.com/?utm_source=dafawin&utm_content=sidebar"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="block w-full text-center px-4 py-3 bg-sport-red-500 hover:bg-sport-red-400 text-white font-black rounded-xl transition-all hover:scale-105 mb-3"
                  >
                    🎯 200% Bonus →
                  </a>
                  <p className="text-navy-400 text-xs text-center">18+ | T&C Apply | Gamble Responsibly</p>
                </div>
              </aside>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-black text-white mb-6">DafaBet India — Pros & Cons</h2>
              <ProsCons pros={PROS} cons={CONS} lang="en" />
            </div>
          </div>
        </section>

        <FaqSection faqs={FAQS} lang="en" />
      </main>
      <Footer lang="en" />
      <WhatsAppFloater lang="en" />
    </>
  );
}
