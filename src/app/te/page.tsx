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
import { getPageContent } from '@/lib/content';
import { getSchemas } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'దఫాబెట్ ఇండియా 2025 — తెలుగు బెట్టింగ్ గైడ్ | DafaWin',
  description: 'తెలుగులో దఫాబెట్ ఇండియా గైడ్. క్రికెట్, ఐపీఎల్ బెట్టింగ్ మరియు కాసినో రివ్యూ. 18+ | బాధ్యతాయుతంగా బెట్ చేయండి.',
  alternates: {
    canonical: 'https://dafawin.in/te/',
    languages: { 'en-IN': 'https://dafawin.in/' },
  },
  openGraph: {
    locale: 'te_IN',
  },
};

const RATINGS = [
  { label: 'క్రికెట్ బెట్టింగ్', score: 9.5 },
  { label: 'బోనస్‌లు', score: 9 },
  { label: 'పేమెంట్లు', score: 9 },
  { label: 'మొబైల్ యాప్', score: 8 },
  { label: 'కాసినో', score: 8 },
  { label: 'సపోర్ట్', score: 8 },
];

const PROS = [
  '200% వెల్‌కమ్ బోనస్ ₹20,000 వరకు',
  'అత్యల్ప వేజరింగ్ రిక్వైర్‌మెంట్ (3x)',
  'తక్షణ UPI, PhonePe డిపాజిట్లు',
  'ఉత్తమ IPL క్రికెట్ అడ్డాలు',
  '24/7 లైవ్ చాట్ సపోర్ట్',
  'బాల్-బై-బాల్ లైవ్ IPL బెట్టింగ్',
];

const CONS = [
  'క్రికెట్ మ్యాచ్‌ల లైవ్ స్ట్రీమింగ్ లేదు',
  'కొన్నిసార్లు విత్‌డ్రాయల్ ఆలస్యం',
  'కాసినో వేజరింగ్ (20x) సగటు',
  'Google Play Store లో యాప్ లేదు',
];

const FAQS = [
  {
    question: 'DafaBet భారతదేశంలో చట్టపరంగా ఉందా?',
    answer: 'DafaBet Isle of Man గ్యాంబ్లింగ్ లైసెన్స్ కింద పనిచేస్తుంది. భారతీయ చట్టం ఆఫ్‌షోర్ ఆపరేటర్లతో ఆన్‌లైన్ బెట్టింగ్‌ను స్పష్టంగా నిషేధించదు. లక్షల మంది భారతీయులు DafaBet ని నిరాటంకంగా ఉపయోగిస్తున్నారు.',
  },
  {
    question: 'DafaBet వెల్‌కమ్ బోనస్ ఏమిటి?',
    answer: 'కొత్త ఆటగాళ్ళు మొదటి స్పోర్ట్స్ డిపాజిట్‌పై 200% వెల్‌కమ్ బోనస్ ₹20,000 వరకు పొందుతారు. ₹10,000 డిపాజిట్ చేస్తే ₹30,000 తో ఆడవచ్చు. వేజరింగ్ అవసరం కేవలం 3x.',
  },
  {
    question: 'DafaBet PhonePe డిపాజిట్లు అంగీకరిస్తుందా?',
    answer: 'అవును. DafaBet UPI, Paytm, PhonePe మరియు Net Banking అంగీకరిస్తుంది. డిపాజిట్లు తక్షణమే జమ అవుతాయి. కనీస డిపాజిట్ ₹500.',
  },
  {
    question: 'DafaBet యాప్ ఎలా డౌన్‌లోడ్ చేయాలి?',
    answer: 'Android యాప్ DafaBet వెబ్‌సైట్ నుండి నేరుగా APK గా డౌన్‌లోడ్ చేయవచ్చు. iOS యాప్ App Store లో అందుబాటులో ఉంది. మా యాప్ డౌన్‌లోడ్ గైడ్ చూడండి.',
  },
  {
    question: 'DafaBet విత్‌డ్రాయల్ ఎంత కాలం పట్టుతుంది?',
    answer: 'UPI మరియు Paytm విత్‌డ్రాయల్‌లు సాధారణంగా 1-2 బిజినెస్ రోజులు పట్టుతాయి. Net Banking విత్‌డ్రాయల్‌లు 2-3 రోజులు పట్టుతాయి.',
  },
];

export default function TeluguHomePage() {
  const page = getPageContent('te', 'index');
  const schemas = page ? getSchemas({ ...page, schema: ['Organization', 'WebSite', 'BreadcrumbList', 'Review', 'FAQPage'] }, FAQS) : [];

  return (
    <>
      <JsonLd schemas={schemas} />
      <Header lang="te" />
      <main lang="te">
        <HeroSection lang="te" />
        <SportCards lang="te" />
        <BonusSection lang="te" />

        {/* Content + Sidebar */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {page && <MarkdownContent content={page.body} lang="te" />}
              </div>
              <aside className="space-y-6">
                <RatingCard ratings={RATINGS} overall={8.5} lang="te" />
                <div className="bg-dark-800 border border-gold-500/20 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 font-telugu">బోనస్ పొందండి</h3>
                  <a
                    href="https://www.dafabet.com/?utm_source=dafawin&utm_content=sidebar-te"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="block w-full text-center px-4 py-3 bg-gold-500 hover:bg-gold-400 text-dark-950 font-black rounded-xl transition-all hover:scale-105 mb-3 font-telugu"
                  >
                    🎯 200% బోనస్ →
                  </a>
                  <p className="text-gray-400 text-xs text-center font-telugu">18+ | T&C వర్తిస్తాయి</p>
                </div>
              </aside>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-black text-white mb-6 font-telugu">DafaBet ప్రయోజనాలు & నష్టాలు</h2>
              <ProsCons pros={PROS} cons={CONS} lang="te" />
            </div>
          </div>
        </section>

        <FaqSection faqs={FAQS} lang="te" />
      </main>
      <Footer lang="te" />
    </>
  );
}
