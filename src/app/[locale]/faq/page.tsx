import type { Metadata } from 'next'
import { pageAlternates } from '@/lib/seo'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq' })
  const alts = pageAlternates(locale, '/faq/')
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: alts.canonical, languages: alts.languages },
  }
}

const FAQ_GROUPS = [
  {
    category: 'Bonuses & Registration',
    faqs: [
      {
        q: 'What is the DafaBet welcome bonus?',
        a: '200% match bonus up to ₹20,000 on your first deposit. Minimum qualifying deposit is ₹500. The bonus is credited automatically — no code needed. Wagering requirements apply; full T&Cs are on the DafaBet bonus guide.',
      },
      {
        q: 'How do I register at DafaBet?',
        a: 'Click the registration link from DafaWin, fill in your real name, address and date of birth, verify your mobile number, then make your first deposit. Use the same name across your account and KYC documents to avoid verification delays.',
      },
    ],
  },
  {
    category: 'Payments',
    faqs: [
      {
        q: 'What is the minimum deposit at DafaBet?',
        a: '₹500 for UPI, Paytm, PhonePe, and net banking (NEFT/IMPS). ₹500 is also the minimum to qualify for the welcome bonus. Crypto minimums sit higher — check the cashier before funding.',
      },
      {
        q: 'How long do withdrawals take?',
        a: 'UPI withdrawals typically settle within 24–48 hours. The fastest route is to submit your KYC documents on day one — withdrawals from unverified accounts stall at the KYC gate. NEFT and IMPS can also settle within the same window during banking hours but lag on weekends.',
      },
      {
        q: 'What payment methods does DafaBet accept?',
        a: 'UPI (PhonePe, Google Pay, Paytm, BHIM), net banking, NEFT, IMPS, and crypto. All INR deposit methods have a ₹500 minimum. Deposits via UPI are typically instant.',
      },
    ],
  },
  {
    category: 'Account & KYC',
    faqs: [
      {
        q: 'What KYC documents are needed?',
        a: 'PAN card and Aadhaar cover almost all Indian accounts. Submit both during registration — verification typically clears in 24–48 hours. A bank statement or cancelled cheque is occasionally requested to match account names. Submit documents from the same name as your account registration to avoid delays.',
      },
      {
        q: 'Can I use DafaBet on mobile?',
        a: 'Yes. DafaBet offers an Android APK (downloaded directly from DafaBet, not the Play Store) and iOS access via the mobile web. Tap "Add to Home Screen" on iOS for a near-app experience. Download the APK only from the official DafaBet site or from our linked install page — never from Telegram or WhatsApp forwards.',
      },
      {
        q: 'Is DafaBet safe to use?',
        a: 'DafaBet operates under an offshore jurisdiction licence. The live casino is powered by Evolution and Ezugi — both independently audited studios. The site uses SSL encryption. Always access DafaBet via the official URL; avoid APKs or links arriving through WhatsApp or Telegram forwards.',
      },
    ],
  },
  {
    category: 'Sports Betting & Legality',
    faqs: [
      {
        q: 'Is cricket betting legal in India?',
        a: 'Regulated state-by-state. Sikkim, Nagaland and Meghalaya have licensing regimes that cover online real-money gaming. Tamil Nadu, Andhra Pradesh, Telangana, Karnataka, Assam and Odisha have restrictions. Most other states are governed by older statute with no specific online ban. Check your state\'s current position before you fund an account.',
      },
      {
        q: 'Does DafaBet offer live in-play betting?',
        a: 'Yes — including ball-by-ball markets for IPL (next over, fall of wicket, top batter), live match-winner and handicap lines for football and kabaddi. Cash-out is available on most selections. Use the on-site scoreboard; a delayed broadcast stream will get you stung.',
      },
      {
        q: 'DafaBet vs Betway — which is better?',
        a: 'DafaBet for cricket-first Indian punters: bigger welcome bonus (200% up to ₹20,000 vs Betway\'s 100% up to ₹2,500), lower minimum deposit, deeper IPL markets, and Hindi-dealer live tables. Betway for punters whose primary sport is football or tennis, and those who want a cleaner cashier UI.',
      },
      {
        q: 'What sports can I bet on at DafaBet?',
        a: 'Cricket, football, kabaddi, tennis, basketball, eSports, and 30+ other sports. Live in-play markets run on all major sports, with ball-by-ball cricket lines during IPL.',
      },
    ],
  },
]

const allFaqs = FAQ_GROUPS.flatMap((g) => g.faqs)

function FaqContent({ locale }: { locale: string }) {
  const t = useTranslations('faq')

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-brand-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="gold-text">{t('hero_title')}</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('hero_subtitle')}</p>
        </div>
      </section>

      {/* Editorial note callout */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="card border-l-4 border-brand-gold">
          <p className="text-gray-300 text-sm leading-relaxed">
            <span className="gold-text font-semibold">DafaWin is the editorial guide. DafaBet is the operator we recommend.</span>{' '}
            You register, deposit, and withdraw at DafaBet — not at DafaWin. Every step that involves money happens at DafaBet.
          </p>
        </div>
      </section>

      {/* FAQ groups */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16">
        <div className="space-y-10">
          {FAQ_GROUPS.map((group) => (
            <div key={group.category}>
              <div className="mb-4">
                <span className="red-badge">{group.category}</span>
              </div>
              <div className="space-y-3">
                {group.faqs.map((faq) => (
                  <details key={faq.q} className="card mb-3 group">
                    <summary className="flex justify-between items-start cursor-pointer list-none py-1">
                      <span className="font-semibold text-white">{faq.q}</span>
                      <span className="text-brand-gold text-xl flex-shrink-0 ml-4">+</span>
                    </summary>
                    <p className="text-gray-400 text-sm mt-3 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {locale === 'te' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="section-title mb-6">తెలుగు ఆటగాళ్ళు తరచుగా అడిగే ప్రశ్నలు</h2>

          {/* Editorial note */}
          <div className="card border-l-4 border-brand-gold mb-6">
            <p className="text-gray-300 text-sm leading-relaxed">
              <span className="gold-text font-semibold">DafaWin గురించి ముఖ్య వివరణ:</span>{' '}
              DafaWin తెలుగు-ఇంగ్లీష్ గైడ్ సైట్. దాఫాబెట్ ఆపరేటర్. మీరు రిజిస్టర్ అయ్యేది, జమ-విత్‌డ్రా చేసేది దాఫాబెట్‌లో — DafaWin లో కాదు.
            </p>
          </div>

          {/* Telugu FAQs */}
          <div className="space-y-3">
            <details className="card mb-3 group">
              <summary className="flex justify-between items-start cursor-pointer list-none py-1">
                <span className="font-semibold text-white">AP, తెలంగాణ లో ఆన్‌లైన్ పందెం చట్టబద్ధమేనా?</span>
                <span className="text-brand-gold text-xl flex-shrink-0 ml-4">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                ఆంధ్రప్రదేశ్‌లో 2020 సవరణతో పరిమితులు ఉన్నాయి. తెలంగాణ‌లో 2017 నిషేధం ఉంది. DafaWin ఆఫ్‌షోర్ ఆపరేటర్; స్టేట్ లా నేరుగా అమలవ్వడం అరుదు, కానీ మీ రిస్క్ మీరు అంచనా వేసుకోండి.
              </p>
            </details>

            <details className="card mb-3 group">
              <summary className="flex justify-between items-start cursor-pointer list-none py-1">
                <span className="font-semibold text-white">దాఫాబెట్ వెల్‌కం బోనస్ ఏమిటి?</span>
                <span className="text-brand-gold text-xl flex-shrink-0 ml-4">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                మొదటి డిపాజిట్‌పై 200% మ్యాచ్, రూ.20,000 వరకు. కనీస డిపాజిట్ రూ.500. బోనస్ ఆటోమేటిగా క్రెడిట్ అవుతుంది — ప్రత్యేక కోడ్ అక్కర్లేదు. wagering requirement వర్తిస్తుంది — T&amp;C చదవండి.
              </p>
            </details>

            <details className="card mb-3 group">
              <summary className="flex justify-between items-start cursor-pointer list-none py-1">
                <span className="font-semibold text-white">UPI విత్‌డ్రా ఎంత సేపు పడుతుంది?</span>
                <span className="text-brand-gold text-xl flex-shrink-0 ml-4">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                KYC పూర్తయి ఉంటే, DafaWin ప్రకటిత SLA ప్రకారం 24 గంటల్లోపు. మా జూన్ 2026 టెస్ట్‌లో ₹5,000 UPI విత్‌డ్రా ~1 గంటలో సెటిల్ అయింది. KYC పెండింగ్ ఉంటే వారాలు ఆగొచ్చు.
              </p>
            </details>

            <details className="card mb-3 group">
              <summary className="flex justify-between items-start cursor-pointer list-none py-1">
                <span className="font-semibold text-white">KYC కి ఏ డాక్యుమెంట్‌లు కావాలి?</span>
                <span className="text-brand-gold text-xl flex-shrink-0 ml-4">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                PAN కార్డ్ (ముందు వైపు ఫోటో) మరియు ఆధార్ (ముందు + వెనుక, లేదా e-Aadhaar PDF). ₹25,000 పైన విత్‌డ్రాకి KYC తప్పనిసరి — రిజిస్ట్రేషన్ రోజే అప్‌లోడ్ చేయడం మంచిది.
              </p>
            </details>

            <details className="card mb-3 group">
              <summary className="flex justify-between items-start cursor-pointer list-none py-1">
                <span className="font-semibold text-white">తెలుగులో కస్టమర్ సపోర్ట్ ఉందా?</span>
                <span className="text-brand-gold text-xl flex-shrink-0 ml-4">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                DafaWin 24/7 లైవ్ చాట్ ఇంగ్లీష్‌లో అందుబాటులో ఉంది. తెలుగు-నిర్దిష్ట సపోర్ట్ ఏజెంట్ హామీ ఇవ్వబడలేదు — ఇంగ్లీష్‌లో చాట్ చేయడం మీద దృష్టి పెట్టండి.
              </p>
            </details>

            <details className="card mb-3 group">
              <summary className="flex justify-between items-start cursor-pointer list-none py-1">
                <span className="font-semibold text-white">పందెంలో నష్టం వస్తే ఎవరికి సంప్రదించాలి?</span>
                <span className="text-brand-gold text-xl flex-shrink-0 ml-4">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                Tele-MANAS: 1800-599-0019 (24×7, ఉచితం). Vandrevala Foundation: +91 9999 666 555. DafaWin లో ఖాతా సెట్టింగ్స్ నుండి డిపాజిట్ లిమిట్, సెల్ఫ్-ఎక్స్‌క్లూజన్ పెట్టుకోవచ్చు.
              </p>
            </details>
          </div>
        </section>
      )}
    </>
  )
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <FaqContent locale={locale} />
}
