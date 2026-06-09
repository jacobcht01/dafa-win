import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getPageData, extractFaqs } from '@/lib/content'
import { breadcrumb, faqPage } from '@/lib/structured-data'
import JsonLd from '@/components/JsonLd'
import MarkdownBody from '@/components/MarkdownBody'
import FaqAccordion from '@/components/FaqAccordion'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const page = getPageData(locale, 'responsible-gambling')
  return {
    title: page?.title ?? 'DafaBet India FAQ',
    description: page?.description ?? '',
    keywords: page?.keywords,
    alternates: { canonical: `/${locale}/faq/` },
  }
}

const STATIC_FAQS_EN = [
  {
    q: 'Is DafaBet safe in India?',
    a: 'DafaBet operates under international gaming licenses and uses SSL encryption to protect user data. It has been operating since 2004 and is trusted by millions of players globally.',
  },
  {
    q: 'What is the minimum deposit?',
    a: 'The minimum deposit on DafaBet is ₹100 for UPI and Paytm. NetBanking and bank transfer minimum is ₹500.',
  },
  {
    q: 'How do I withdraw money?',
    a: 'Go to My Account → Withdraw, select your method (UPI, Paytm, bank transfer), enter the amount and confirm. UPI withdrawals are processed within 1–4 hours.',
  },
  {
    q: 'Is the DafaBet app free?',
    a: 'Yes, the DafaBet app is completely free to download for both Android (APK) and iOS (App Store). No subscription fees.',
  },
  {
    q: 'How long does registration take?',
    a: 'Registration typically takes under 2 minutes. Fill in your name, email, date of birth, and preferred currency, then verify your email to complete sign-up.',
  },
]

const STATIC_FAQS_TE = [
  {
    q: 'DafaBet భారతదేశంలో సురక్షితమా?',
    a: 'DafaBet అంతర్జాతీయ గేమింగ్ లైసెన్స్‌ల ద్వారా పనిచేస్తుంది మరియు SSL ఎన్‌క్రిప్షన్ ఉపయోగిస్తుంది. 2004 నుండి లక్షలాది ఆటగాళ్ళు నమ్మే ప్లాట్‌ఫారమ్.',
  },
  {
    q: 'కనీస డిపాజిట్ ఎంత?',
    a: 'UPI మరియు Paytm కోసం కనీస డిపాజిట్ ₹100. NetBanking మరియు బ్యాంక్ ట్రాన్స్‌ఫర్ కనీసం ₹500.',
  },
  {
    q: 'డబ్బు ఎలా విత్‌డ్రా చేయాలి?',
    a: 'My Account → Withdraw కి వెళ్ళి, పద్ధతి (UPI, Paytm, బ్యాంక్) ఎంచుకుని, మొత్తం నమోదు చేసి confirm నొక్కండి. UPI విత్‌డ్రాలు 1–4 గంటల్లో పూర్తవుతాయి.',
  },
  {
    q: 'DafaBet యాప్ ఉచితంగా ఉంటుందా?',
    a: 'అవును, DafaBet యాప్ Android (APK) మరియు iOS (App Store) రెండింటికీ పూర్తిగా ఉచితం.',
  },
  {
    q: 'రిజిస్ట్రేషన్ ఎంత సమయం పడుతుంది?',
    a: 'రిజిస్ట్రేషన్ సాధారణంగా 2 నిమిషాల కంటే తక్కువ సమయం పడుతుంది. పేరు, ఇమెయిల్, పుట్టిన తేదీ నమోదు చేసి ఇమెయిల్ వెరిఫై చేయండి.',
  },
]

const INTERNAL_LINKS_EN = [
  { href: '/review', label: '⭐ DafaBet Full Review' },
  { href: '/bonuses', label: '🎁 Welcome Bonus Guide' },
  { href: '/app-download', label: '📱 App Download' },
  { href: '/cricket-betting', label: '🏏 Cricket Betting' },
  { href: '/responsible-gambling', label: '🛡️ Responsible Gambling' },
]

const INTERNAL_LINKS_TE = [
  { href: '/review', label: '⭐ DafaBet రివ్యూ' },
  { href: '/bonuses', label: '🎁 వెల్‌కమ్ బోనస్' },
  { href: '/app-download', label: '📱 యాప్ డౌన్‌లోడ్' },
  { href: '/cricket-betting', label: '🏏 క్రికెట్ బెట్టింగ్' },
  { href: '/responsible-gambling', label: '🛡️ బాధ్యతాయుత జూదం' },
]

export default async function FaqPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const page = getPageData(locale, 'responsible-gambling')
  const extracted = page ? extractFaqs(page.body) : []
  const staticFaqs = locale === 'te' ? STATIC_FAQS_TE : STATIC_FAQS_EN
  const faqs = extracted.length > 0 ? extracted : staticFaqs
  const schemas = [
    breadcrumb(locale, 'faq', 'FAQ'),
    ...(faqs.length ? [faqPage(faqs)] : []),
  ]
  const isTE = locale === 'te'
  const internalLinks = isTE ? INTERNAL_LINKS_TE : INTERNAL_LINKS_EN

  return (
    <>
      <JsonLd schemas={schemas} />

      <section className="bg-dark-gradient py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">❓</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gold-text">
              {isTE ? 'దఫాబెట్ ఇండియా FAQ' : 'DafaBet India FAQ'}
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {isTE
              ? 'DafaBet గురించి తరచుగా అడిగే ప్రశ్నలకు సమాధానాలు — డిపాజిట్, విత్‌డ్రాల్, బోనస్ మరియు మరిన్ని.'
              : 'Answers to the most common questions about DafaBet India — deposits, withdrawals, bonuses and more.'}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            {page && <MarkdownBody content={page.body} />}
          </article>
          <aside className="space-y-6">
            <div className="card">
              <h3 className="font-bold text-white mb-4">
                {isTE ? 'సహాయకర లింకులు' : 'Helpful Links'}
              </h3>
              <nav className="space-y-2">
                {internalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href as never}
                    className="block text-sm text-gray-400 hover:text-gold-400 transition-colors py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
        </div>

        {faqs.length > 0 && (
          <div className="mt-16 max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {isTE ? 'తరచుగా అడిగే ప్రశ్నలు' : 'Frequently Asked Questions'}
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        )}
      </div>
    </>
  )
}
