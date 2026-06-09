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
import { getPageContent, EN_SLUGS } from '@/lib/content';
import { getSchemas } from '@/lib/structured-data';
import { extractFaqs, PAGE_CONFIG } from '@/lib/page-config';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EN_SLUGS.filter((s) => s !== 'index').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageContent('en', slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: `https://dafawin.in${page.url}`,
      languages: { 'te-IN': `https://dafawin.in/te/${slug}/` },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://dafawin.in${page.url}`,
      type: 'article',
    },
  };
}

export default async function EnglishPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageContent('en', slug);
  if (!page) notFound();

  const config = PAGE_CONFIG[slug] ?? {};
  const faqs = extractFaqs(page.body, 'en');
  const schemas = getSchemas(page, faqs.length > 0 ? faqs : undefined);

  return (
    <>
      <JsonLd schemas={schemas} />
      <Header lang="en" />
      <main>
        {/* Page hero */}
        <div className="bg-gradient-to-b from-dark-900 to-dark-950 border-b border-gold-500/10 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-400 mb-4" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2">
                <li><a href="/" className="hover:text-gold-400 transition-colors">Home</a></li>
                <li className="text-gray-600">/</li>
                <li className="text-gold-400 truncate">{page.title.split('|')[0].trim()}</li>
              </ol>
            </nav>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 max-w-4xl">
              {page.title.split('|')[0].trim()}
            </h1>
            <p className="text-gray-400 text-sm">
              {page.author && <><span>{page.author}</span> · </>}
              {page.lastUpdated && <span>Updated {page.lastUpdated}</span>}
            </p>
          </div>
        </div>

        {/* Bonus CTA for non-responsible-gambling pages */}
        {slug !== 'responsible-gambling' && (
          <div className="bg-dark-900 border-b border-gold-500/10 py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
              <p className="text-gray-300 text-sm">
                <span className="text-gold-400 font-bold">🎯 Current Offer:</span> 200% Welcome Bonus up to ₹20,000
              </p>
              <a
                href="https://www.dafabet.com/?utm_source=dafawin&utm_content=topbar"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-dark-950 text-sm font-black rounded-lg transition-all flex-shrink-0"
              >
                Claim Now →
              </a>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <article className="lg:col-span-2">
              <MarkdownContent content={page.body} lang="en" />

              {/* Review-specific content */}
              {config.showProsCons && (
                <div className="mt-10">
                  <h2 className="text-2xl font-black text-white mb-6">Pros & Cons</h2>
                  <ProsCons
                    pros={config.pros ?? []}
                    cons={config.cons ?? []}
                    lang="en"
                  />
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {config.showRating && (
                <RatingCard ratings={config.ratings ?? []} overall={config.overall ?? 8.5} lang="en" />
              )}
              <div className="bg-dark-800 border border-gold-500/20 rounded-2xl p-6 sticky top-20">
                <p className="text-gold-400 font-bold mb-1 text-sm">Current Offer</p>
                <p className="text-2xl font-black text-white mb-1">200% Bonus</p>
                <p className="text-gray-400 text-sm mb-4">Up to ₹20,000 — 3x wagering only</p>
                <a
                  href="https://www.dafabet.com/?utm_source=dafawin&utm_content=sidebar-page"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="block w-full text-center px-4 py-3 bg-gold-500 hover:bg-gold-400 text-dark-950 font-black rounded-xl transition-all hover:scale-105 mb-2"
                >
                  🎯 Claim Bonus →
                </a>
                <p className="text-gray-500 text-xs text-center">18+ | T&C Apply</p>
              </div>
            </aside>
          </div>
        </div>

        {/* Bonus section on specific pages */}
        {config.showBonus && <BonusSection lang="en" />}

        {/* FAQ Section */}
        {faqs.length > 0 && <FaqSection faqs={faqs} lang="en" />}
      </main>
      <Footer lang="en" />
    </>
  );
}
