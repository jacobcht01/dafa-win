import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarkdownContent from '@/components/MarkdownContent';
import FaqSection from '@/components/FaqSection';
import RatingCard from '@/components/RatingCard';
import ProsCons from '@/components/ProsCons';
import BonusSection from '@/components/BonusSection';
import JsonLd from '@/components/JsonLd';
import { getPageContent, TE_SLUGS } from '@/lib/content';
import { getSchemas } from '@/lib/structured-data';
import { extractFaqs, PAGE_CONFIG } from '@/lib/page-config';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TE_SLUGS.filter((s) => s !== 'index').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageContent('te', slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: `https://dafawin.in/te/${slug}/`,
      languages: { 'en-IN': `https://dafawin.in/${slug}/` },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://dafawin.in/te/${slug}/`,
      type: 'article',
      locale: 'te_IN',
    },
  };
}

export default async function TeluguPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageContent('te', slug);
  if (!page) notFound();

  const config = PAGE_CONFIG[slug] ?? {};
  const faqs = extractFaqs(page.body, 'te');
  const schemas = getSchemas(page, faqs.length > 0 ? faqs : undefined);

  // Telugu labels for page config ratings
  const teRatings = config.ratings?.map((r) => ({
    ...r,
    label: translateRatingLabel(r.label),
  }));
  const tePros = config.pros?.map(translatePro);
  const teCons = config.cons?.map(translateCon);

  return (
    <>
      <JsonLd schemas={schemas} />
      <Header lang="te" />
      <main lang="te">
        {/* Page hero */}
        <div className="bg-gradient-to-b from-dark-900 to-dark-950 border-b border-gold-500/10 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-400 mb-4 font-telugu" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2">
                <li><a href="/te/" className="hover:text-gold-400 transition-colors">హోమ్</a></li>
                <li className="text-gray-600">/</li>
                <li className="text-gold-400 truncate">{page.title.split('|')[0].trim()}</li>
              </ol>
            </nav>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 max-w-4xl font-telugu">
              {page.title.split('|')[0].trim()}
            </h1>
            <p className="text-gray-400 text-sm font-telugu">
              {page.author && <><span>{page.author}</span> · </>}
              {page.lastUpdated && <span>నవీకరించబడింది {page.lastUpdated}</span>}
            </p>
          </div>
        </div>

        {/* Bonus CTA */}
        {slug !== 'responsible-gambling' && (
          <div className="bg-dark-900 border-b border-gold-500/10 py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
              <p className="text-gray-300 text-sm font-telugu">
                <span className="text-gold-400 font-bold">🎯 ప్రస్తుత ఆఫర్:</span> 200% వెల్‌కమ్ బోనస్ ₹20,000 వరకు
              </p>
              <a
                href="https://www.dafabet.com/?utm_source=dafawin&utm_content=topbar-te"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-dark-950 text-sm font-black rounded-lg transition-all flex-shrink-0 font-telugu"
              >
                ఇప్పుడే పొందండి →
              </a>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <article className="lg:col-span-2">
              <MarkdownContent content={page.body} lang="te" />

              {config.showProsCons && tePros && teCons && (
                <div className="mt-10">
                  <h2 className="text-2xl font-black text-white mb-6 font-telugu">ప్రయోజనాలు & నష్టాలు</h2>
                  <ProsCons pros={tePros} cons={teCons} lang="te" />
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {config.showRating && teRatings && (
                <RatingCard ratings={teRatings} overall={config.overall ?? 8.5} lang="te" />
              )}
              <div className="bg-dark-800 border border-gold-500/20 rounded-2xl p-6 sticky top-20">
                <p className="text-gold-400 font-bold mb-1 text-sm font-telugu">ప్రస్తుత ఆఫర్</p>
                <p className="text-2xl font-black text-white mb-1">200% బోనస్</p>
                <p className="text-gray-400 text-sm mb-4 font-telugu">₹20,000 వరకు — 3x వేజరింగ్ మాత్రమే</p>
                <a
                  href="https://www.dafabet.com/?utm_source=dafawin&utm_content=sidebar-page-te"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="block w-full text-center px-4 py-3 bg-gold-500 hover:bg-gold-400 text-dark-950 font-black rounded-xl transition-all hover:scale-105 mb-2 font-telugu"
                >
                  🎯 బోనస్ పొందండి →
                </a>
                <p className="text-gray-500 text-xs text-center font-telugu">18+ | T&C వర్తిస్తాయి</p>
              </div>
            </aside>
          </div>
        </div>

        {config.showBonus && <BonusSection lang="te" />}
        {faqs.length > 0 && <FaqSection faqs={faqs} lang="te" />}
      </main>
      <Footer lang="te" />
    </>
  );
}

function translateRatingLabel(label: string): string {
  const map: Record<string, string> = {
    'Cricket Betting': 'క్రికెట్ బెట్టింగ్',
    'Bonuses': 'బోనస్‌లు',
    'Payments': 'పేమెంట్లు',
    'Mobile App': 'మొబైల్ యాప్',
    'Casino': 'కాసినో',
    'Support': 'సపోర్ట్',
    'Teen Patti / Andar Bahar': 'తీన్ పట్టీ / అండర్ బాహర్',
    'Live Casino': 'లైవ్ కాసినో',
    'Slots': 'స్లాట్లు',
    'Game Variety': 'గేమ్ వెరైటీ',
    'Mobile Casino': 'మొబైల్ కాసినో',
  };
  return map[label] ?? label;
}

function translatePro(pro: string): string {
  const map: Record<string, string> = {
    '200% welcome bonus up to ₹20,000': '200% వెల్‌కమ్ బోనస్ ₹20,000 వరకు',
    'Lowest wagering requirement (3x)': 'అత్యల్ప వేజరింగ్ (3x)',
    'Instant UPI, Paytm & PhonePe deposits': 'తక్షణ UPI, PhonePe డిపాజిట్లు',
    'Best cricket odds — tested across 50 IPL matches': 'ఉత్తమ క్రికెట్ అడ్డాలు',
    '24/7 live chat support in English & Hindi': '24/7 లైవ్ చాట్ సపోర్ట్',
    'Ball-by-ball live IPL betting with cash-out': 'బాల్-బై-బాల్ లైవ్ IPL బెట్టింగ్',
  };
  return map[pro] ?? pro;
}

function translateCon(con: string): string {
  const map: Record<string, string> = {
    'No live streaming of cricket matches': 'క్రికెట్ మ్యాచ్‌ల లైవ్ స్ట్రీమింగ్ లేదు',
    'Occasional withdrawal delays reported': 'కొన్నిసార్లు విత్‌డ్రాయల్ ఆలస్యం',
    'Casino wagering (20x) is industry average': 'కాసినో వేజరింగ్ (20x) సగటు',
    'No dedicated app on Indian Google Play Store': 'Google Play Store లో యాప్ లేదు',
  };
  return map[con] ?? con;
}
