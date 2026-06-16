import type { Metadata } from 'next'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { JsonLd } from '@/components/JsonLd'
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, pageOGMeta, SITE_URL } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'rg' })
  const alts = pageAlternates(locale, '/responsible-gambling/')
  const title = locale === 'te'
    ? 'జూదం వ్యసనం సహాయం | బాధ్యతాయుత గేమింగ్ | DafaWin'
    : t('title')
  const description = locale === 'te'
    ? 'DafaWin బాధ్యతాయుత జూదం గైడ్ — పరిమితులు సెట్ చేయండి, స్వీయ-మినహాయింపు, మరియు భారత్‌లో సహాయ హెల్ప్‌లైన్‌లు.'
    : t('description')
  return {
    title,
    description,
    alternates: { canonical: alts.canonical, languages: alts.languages },
    ...pageOGMeta({ title, description, canonicalUrl: alts.canonical, locale }),
  }
}

function EnglishContent({ locale }: { locale: string }) {
  const t = useTranslations('rg')
  const pageUrl = `${SITE_URL}/responsible-gambling/`

  const faqs = [
    {
      question: 'How can I set deposit limits at DafaBet?',
      answer: 'Log in, go to Account Settings > Responsible Gambling, and set daily, weekly, or monthly deposit limits. Changes to lower limits take effect immediately; increases may have a cooling period.',
    },
    {
      question: 'Can I self-exclude from DafaBet?',
      answer: 'Yes. Use account settings or contact DafaBet support to request 6 months, 1 year, or permanent self-exclusion. A permanent self-exclusion cannot be reopened on a whim — it is designed to be a firm commitment.',
    },
    {
      question: 'Where can I get help for gambling addiction in India?',
      answer: 'Vandrevala Foundation: +91 9999 666 555 (24/7, free, phone and WhatsApp). iCall, TISS Mumbai: 9152987821 (Mon–Sat, 10am–8pm). AASRA: 022-2754 6669 (24/7 crisis support).',
    },
    {
      question: 'What is problem gambling?',
      answer: 'When betting interferes with finances, relationships, or mental health — chasing losses, hiding gambling from family, borrowing to fund deposits, or being unable to stop despite wanting to.',
    },
    {
      question: 'What is the minimum gambling age at DafaBet?',
      answer: "18 years. The Indian Contract Act sets 18 as the legal contracting age. Verify DafaBet's current terms for the most up-to-date requirement before registering.",
    },
  ]

  const schemaData = [
    articleSchema({ headline: t('title'), description: t('description'), url: pageUrl, datePublished: '2025-01-01', dateModified: new Date().toISOString().split('T')[0], locale }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL + '/' },
      { name: 'Responsible Gambling', url: pageUrl },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      <section className="relative h-[320px] md:h-[380px] flex items-center overflow-hidden">
        <Image src="/images/responsible-gambling.webp" alt="Responsible Gambling" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gold-text">Responsible Gambling</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            DafaBet is the operator we recommend. This is what a friend who reads the small print would tell you.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="card border-red-500/30 mb-8 text-center">
          <p className="text-lg font-semibold text-white mb-2">18+ only. Gambling involves financial risk. Please bet responsibly.</p>
          <p className="text-brand-gold font-bold text-lg">Vandrevala Foundation: +91 9999 666 555 (24/7, Free, Confidential)</p>
        </div>

        <div className="mb-12">
          <h2 className="section-title mb-2">The Math</h2>
          <p className="text-gray-400 text-sm mb-6">Every game is designed so the house profits over time. The numbers below are not hidden — they are in the rules.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'European Roulette', body: '2.7% house edge — ₹2.70 stays with the house for every ₹100 put through. American roulette is 5.26%.' },
              { title: 'Online Slots', body: '3–5% house edge taken on every spin. Typical RTP is 95–97%.' },
              { title: 'Sportsbook', body: '102–104% overround on sharp markets. Soft markets (props, lower-tier) often 110%+.' },
            ].map((c) => (
              <div key={c.title} className="card bg-brand-surface">
                <p className="text-brand-gold font-bold text-lg mb-2">{c.title}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="section-title mb-2">Set Your Limits</h2>
          <p className="text-gray-400 text-sm mb-6">DafaBet provides limit tools in account settings. Use them before you need them.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Deposit Limit', body: "Set this to what you would not miss if you lost it — not what you can technically afford. Those are different numbers." },
              { title: 'Loss Limit', body: 'The point at which you stop. No "one more bet to get back to even."' },
              { title: 'Session Limit', body: 'A clock, not a feeling. Two hours is two hours, no matter how the cards run.' },
            ].map((c) => (
              <div key={c.title} className="card bg-brand-surface">
                <p className="text-brand-gold font-bold text-lg mb-2">{c.title}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="section-title mb-2">Cooling Off &amp; Self-Exclusion</h2>
          <p className="text-gray-400 text-sm mb-6">Both tools are available in your DafaBet account settings or via support.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-brand-surface">
              <p className="text-brand-gold font-bold text-lg mb-2">Cooling-Off</p>
              <p className="text-gray-300 text-sm leading-relaxed">24 hours to 30 days. DafaBet locks your account; you cannot bet. Use when you need a clean break.</p>
            </div>
            <div className="card bg-brand-surface">
              <p className="text-brand-gold font-bold text-lg mb-2">Self-Exclusion</p>
              <p className="text-gray-300 text-sm leading-relaxed">6 months, 1 year, or permanent. Cannot be reopened on a whim. Use when betting has stopped being fun.</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="section-title mb-4">Warning Signs</h2>
          <div className="card border-red-500/20">
            <p className="text-gray-300 text-sm leading-relaxed">
              Patterns worth taking seriously: betting more than you meant to, hiding amounts from family, borrowing to fund the next deposit, needing to bet to feel normal, anger after losses that lasts past the next morning, promising to stop and not stopping.
            </p>
            <p className="text-gray-500 text-xs mt-4">If any of these sound familiar, the helplines below are a good first call. They are free and confidential.</p>
          </div>
        </div>

        <div className="card border-brand-gold/30 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Get Help in India</h2>
          <ul className="space-y-4 text-gray-300">
            <li><strong className="text-brand-gold">Vandrevala Foundation:</strong> +91 9999 666 555 — 24/7, phone and WhatsApp, free and confidential</li>
            <li><strong className="text-brand-gold">AASRA:</strong> 022-2754 6669 — 24/7, suicide prevention and crisis support</li>
            <li><strong className="text-brand-gold">iCall, TISS Mumbai:</strong> 9152987821 — Mon–Sat, 10am–8pm, psycho-social support</li>
            <li><strong className="text-brand-gold">Emergency:</strong> 112</li>
          </ul>
        </div>

        <h2 className="section-title mb-8">FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="card">
              <summary className="flex justify-between items-start cursor-pointer list-none py-1">
                <span className="font-semibold text-white">{faq.question}</span>
                <span className="text-brand-gold text-xl flex-shrink-0 ml-4">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}

function TeluguContent({ locale }: { locale: string }) {
  const pageUrl = `${SITE_URL}/te/responsible-gambling/`

  const teFaqs = [
    {
      question: 'దాఫాబెట్‌లో డిపాజిట్ లిమిట్ ఎలా పెట్టుకోవాలి?',
      answer: 'లాగిన్ చేసి, Account Settings > Responsible Gambling కి వెళ్ళి, రోజువారీ, వారానికి, లేదా నెలకు డిపాజిట్ లిమిట్ పెట్టుకోవచ్చు. లిమిట్ తగ్గించడం వెంటనే అమలవుతుంది; పెంచడానికి కూలింగ్ పీరియడ్ ఉంటుంది.',
    },
    {
      question: 'దాఫాబెట్ నుంచి స్వీయ-మినహాయింపు ఎలా చేసుకోవాలి?',
      answer: 'ఖాతా సెట్టింగ్స్ ద్వారా లేదా దాఫాబెట్ సపోర్ట్‌ని సంప్రదించి 6 నెలలు, 1 సంవత్సరం, లేదా శాశ్వత స్వీయ-మినహాయింపు అడగవచ్చు. శాశ్వత మినహాయింపు తేలికగా రద్దు చేయలేరు.',
    },
    {
      question: 'జూద వ్యసనానికి భారత్‌లో సహాయం ఎక్కడ పొందాలి?',
      answer: 'Vandrevala Foundation: 1860-2662-345 (24/7, ఉచిత). AASRA: 022-2754 6669 (24/7). iCall, TISS: 9152987821 (సోమ-శని, ఉ.10-రా.8). ఇవన్నీ ఉచితం, గోప్యం.',
    },
    {
      question: 'AP, తెలంగాణలో ఆన్‌లైన్ బెట్టింగ్ చట్టబద్ధమేనా?',
      answer: 'AP మరియు తెలంగాణకి ఆన్‌లైన్ గేమింగ్‌పై నిబంధనలు ఉన్నాయి. మే 2026 PROG Rules ఆఫ్‌షోర్ ఆపరేటర్లపై వర్తిస్తాయి. చట్టపరమైన స్థితి మారుతూ ఉంటుంది — రిజిస్టర్ చేసే ముందు మీ రాష్ట్రంలో ప్రస్తుత నిబంధనలు సరిచూసుకోండి.',
    },
    {
      question: 'దాఫాబెట్‌లో కనీస వయసు ఎంత?',
      answer: 'భారత కాంట్రాక్ట్ చట్టం ప్రకారం 18 సంవత్సరాలు. రిజిస్టర్ చేసే ముందు దాఫాబెట్ ప్రస్తుత నిబంధనలు చదవండి.',
    },
  ]

  const schemaData = [
    articleSchema({
      headline: 'జూదం వ్యసనం సహాయం | బాధ్యతాయుత గేమింగ్ | DafaWin',
      description: 'DafaWin బాధ్యతాయుత జూదం గైడ్ — పరిమితులు సెట్ చేయండి, స్వీయ-మినహాయింపు, మరియు భారత్‌లో సహాయ హెల్ప్‌లైన్‌లు.',
      url: pageUrl,
      datePublished: '2026-06-01',
      dateModified: '2026-06-16',
      locale,
    }),
    faqSchema(teFaqs),
    breadcrumbSchema([
      { name: 'హోమ్', url: `${SITE_URL}/te/` },
      { name: 'బాధ్యతాయుత జూదం', url: pageUrl },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Hero */}
      <section className="relative h-[320px] md:h-[380px] flex items-center overflow-hidden">
        <Image src="/images/responsible-gambling.webp" alt="బాధ్యతాయుత జూదం" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gold-text">బాధ్యతాయుత జూదం</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            DafaWin (దాఫావిన్) ఒక గైడ్, రివ్యూ సైట్. అసలు ఆట జరిగేది దాఫాబెట్‌లో — అదే మేము సిఫారసు చేసే ఆపరేటర్.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

        {/* 18+ warning */}
        <div className="card border-red-500/30 text-center">
          <p className="text-lg font-semibold text-white mb-2">18+ మాత్రమే. జూదంలో ఆర్థిక నష్టం ఉంటుంది. బాధ్యతాయుతంగా బెట్ చేయండి.</p>
          <p className="text-brand-gold font-bold text-lg">Vandrevala Foundation: 1860-2662-345 (24/7, ఉచితం, గోప్యం)</p>
        </div>

        {/* DafaWin vs DafaBet distinction */}
        <div className="card border-brand-gold/30 bg-brand-surface">
          <h2 className="text-xl font-bold text-brand-gold mb-3">DafaWin మరియు DafaBet — తేడా ఏమిటి?</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            DafaWin ఒక స్వతంత్ర గైడ్ సైట్. మేము ఆపరేటర్లని పోల్చుతాము, నిబంధనలు నిజాయితీగా చదువుతాము.
            అసలు ఆట జరిగేది <Link href="/dafabet-review" className="text-brand-gold underline">దాఫాబెట్‌లో</Link> — అదే మేము సిఫారసు చేసే ఆపరేటర్.
            మీరు అనుకున్నదానికంటే ఎక్కువ ఓడిపోతే మాకు లాభం రాదు. మీరు ఒక నమ్మదగిన సైట్ ఎంచుకొని, బాధలేకుండా ఆడుతూ ఉంటేనే మాకు లాభం.
          </p>
        </div>

        {/* The Math */}
        <div>
          <h2 className="section-title mb-2">లెక్క కొంచెం చూద్దాం</h2>
          <p className="text-gray-400 text-sm mb-6">క్యాసినో ఆటలూ, స్పోర్ట్స్‌బుక్ మార్కెట్‌లూ సమంగా ఉండేలా తయారు చేసినవి కావు. ప్రతి బెట్‌లో కంపెనీకి ఒక చిన్న వాటా ఉంటుంది — ఆ వాటా ఎప్పుడూ కంపెనీ వైపే.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              { title: 'యూరోపియన్ రూలెట్', body: 'హౌస్ ఎడ్జ్ 2.7%. ₹100 పెట్టి ఆడితే సగటున ₹2.70 కంపెనీ దగ్గర మిగిలిపోతుంది. అమెరికన్ రూలెట్‌లో 5.26%.' },
              { title: 'ఆన్‌లైన్ స్లాట్‌లు', body: 'RTP 95-97%. మిగతా 3-5% కంపెనీ వాటా. ప్రతి స్పిన్‌లోనూ తీసుకుంటారు.' },
              { title: 'స్పోర్ట్స్‌బుక్', body: 'క్రికెట్ మ్యాచ్-విన్నర్‌పై ఓవర్‌రౌండ్ 102-104%. ప్రాప్ బెట్‌లు, చిన్న టోర్నమెంట్‌లపై 110% వరకు.' },
            ].map((c) => (
              <div key={c.title} className="card bg-brand-surface">
                <p className="text-brand-gold font-bold text-lg mb-2">{c.title}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="card border-red-500/20 bg-brand-surface">
            <p className="text-gray-300 text-sm leading-relaxed font-medium">
              <strong className="text-white">కోల్పోయిన డబ్బు తిరిగి సంపాదించడానికి బెట్‌ని రెట్టింపు చేయడం — అది రికవరీ ప్రణాళిక కాదు.</strong>{' '}
              గణితానికి మీరు ఎంత వెనుకబడి ఉన్నారో గుర్తు ఉండదు. ప్రతి బెట్ కొత్తగానే మొదలవుతుంది, మీకు వ్యతిరేకంగానే ఉంటుంది.
            </p>
          </div>
        </div>

        {/* Set Limits */}
        <div>
          <h2 className="section-title mb-2">అవసరం అయ్యేలోగా లిమిట్ పెట్టుకోండి</h2>
          <p className="text-gray-400 text-sm mb-6">
            <Link href="/dafabet-app-download" className="text-brand-gold underline">దాఫాబెట్ ఖాతా సెట్టింగ్స్‌లో</Link> డిపాజిట్, లాస్, సెషన్ లిమిట్‌లు పెట్టే అవకాశం ఉంది. మొదటి రోజే పెట్టుకోండి — ప్రశాంతంగా ఉన్నప్పుడు.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'డిపాజిట్ లిమిట్', body: 'ఇంట్లో అవసరాలకు (చిట్‌ఫండ్, పిల్లల ఫీజు, కరెంట్ బిల్) తేడా రాకుండా భరించగలిగే మొత్తం. అది మీ నిజమైన లిమిట్.' },
              { title: 'లాస్ లిమిట్', body: 'ఇంత ఓడిపోతే ఆపేయాలి. పూర్తిగా. "ఇంకో ఒక్క బెట్‌తో నెట్‌గా సరి చేసుకుంటాను" అని ఎన్నడూ అనుకోవద్దు.' },
              { title: 'సెషన్ లిమిట్', body: 'గడియారం, భావన కాదు. రెండు గంటలంటే రెండు గంటలే — కార్డులు ఎలా వస్తున్నా.' },
            ].map((c) => (
              <div key={c.title} className="card bg-brand-surface">
                <p className="text-brand-gold font-bold text-lg mb-2">{c.title}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cooling-Off & Self-Exclusion */}
        <div>
          <h2 className="section-title mb-2">కూలింగ్-ఆఫ్ మరియు స్వీయ-మినహాయింపు</h2>
          <p className="text-gray-400 text-sm mb-6">ఒక వారం ఏదో తేడాగా అనిపిస్తే, పరిస్థితి ఇంకా దిగజారే వరకు ఆగాల్సిన అవసరం లేదు.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-brand-surface">
              <p className="text-brand-gold font-bold text-lg mb-2">కూలింగ్-ఆఫ్</p>
              <p className="text-gray-300 text-sm leading-relaxed">24 గంటల నుంచి 30 రోజుల వరకు. మీరు ఎంచుకున్న కాలానికి దాఫాబెట్ మీ ఖాతాని లాక్ చేస్తుంది. తల తేటగా చేసుకోవాలనుకుంటే వాడండి.</p>
            </div>
            <div className="card bg-brand-surface">
              <p className="text-brand-gold font-bold text-lg mb-2">స్వీయ-మినహాయింపు</p>
              <p className="text-gray-300 text-sm leading-relaxed">6 నెలలు, 1 సంవత్సరం, లేదా శాశ్వతం. మూడ్ మారిందని తిరిగి తెరవలేరు. బెట్‌ని ఆనందం కోసం కాకుండా బాధ తగ్గించుకోవడానికి వాడుతున్నప్పుడు — ఈ చర్య అప్పుడే వాడాలి.</p>
            </div>
          </div>
        </div>

        {/* Warning Signs */}
        <div>
          <h2 className="section-title mb-4">ఎక్కడ లైన్ దాటారో ఎలా తెలుసుకోవాలి</h2>
          <div className="card border-red-500/20">
            <ul className="space-y-2 text-gray-300 text-sm leading-relaxed">
              <li>• అనుకున్నదానికంటే ఎక్కువ బెట్ వేయడం, ఎక్కువసార్లు బెట్ వేయడం.</li>
              <li>• ఎంత ఆడుతున్నారో జీవిత భాగస్వామికి, తల్లిదండ్రులకి దాస్తూ ఉండడం — తెలుగు ఇంట్లో ఇది మొదటి సంకేతం.</li>
              <li>• తదుపరి డిపాజిట్‌కి అప్పు తీసుకోవడం — క్రెడిట్ కార్డ్, స్నేహితుడు, <strong>చిట్‌ఫండ్ వాటా, SHG పొదుపు, ఇంట్లో బంగారం తాకట్టు</strong>.</li>
              <li>• మ్యాచ్ ఆనందించడానికి కాకుండా, నార్మల్‌గా ఫీలవ్వడానికి బెట్ వేయాల్సి రావడం.</li>
              <li>• ఆపేస్తానని ప్రామిస్ చేసి, ఆపలేకపోవడం.</li>
            </ul>
            <p className="text-gray-500 text-xs mt-4">ఇవి నిర్ధారణలు కావు — పరిశీలనలు. ఒకటి కంటే ఎక్కువ కనిపిస్తే శిక్షణ పొందిన వ్యక్తితో మాట్లాడడం మంచిది.</p>
          </div>
        </div>

        {/* Helplines */}
        <div className="card border-brand-gold/30">
          <h2 className="text-2xl font-bold text-white mb-4">వెరిఫైడ్ ఇండియన్ హెల్ప్‌లైన్‌లు</h2>
          <p className="text-gray-400 text-sm mb-4">ఉచితం. గోప్యం. దాఫాబెట్‌తోనూ, DafaWin-తోనూ సంబంధం లేదు.</p>
          <ul className="space-y-4 text-gray-300">
            <li><strong className="text-brand-gold">Vandrevala Foundation:</strong> 1860-2662-345 (24/7, ఫోన్ మరియు WhatsApp). ఉచిత మెంటల్ హెల్త్ కౌన్సెలింగ్.</li>
            <li><strong className="text-brand-gold">AASRA:</strong> 022-2754 6669 (24/7). ముంబై కేంద్రంగా, దేశమంతటా అందుబాటు.</li>
            <li><strong className="text-brand-gold">iCall, TISS:</strong> 9152987821 (సోమవారం-శనివారం, ఉదయం 10 నుండి రాత్రి 8 వరకు). ఉచిత ఫోన్ మరియు ఈమెయిల్ కౌన్సెలింగ్.</li>
            <li><strong className="text-brand-gold">అత్యవసర పరిస్థితి:</strong> <strong className="text-white">112</strong> — దగ్గర్లో ఉన్న హాస్పిటల్ ఎమర్జెన్సీ విభాగం.</li>
          </ul>
        </div>

        {/* Legal context */}
        <div className="card bg-brand-surface">
          <h2 className="text-xl font-bold text-white mb-3">చట్టపరమైన వయసు మరియు రాష్ట్ర నిబంధనలు</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            భారత కాంట్రాక్ట్ చట్టం, 1872 ప్రకారం కనీస వయసు <strong className="text-white">18 సంవత్సరాలు</strong>.
            ఆంధ్రప్రదేశ్, తెలంగాణ రెండు రాష్ట్రాలకీ ఆన్‌లైన్ గేమింగ్‌పై తమవైన నిబంధనలు ఉన్నాయి.
            మే 2026లో జారీ అయిన PROG Rules ఆఫ్‌షోర్ నిజ-డబ్బు ఆపరేటర్లను నిషేధించాయి.
          </p>
          <p className="text-brand-gold text-sm font-semibold">
            గత సంవత్సరం ఏది అనుమతించబడిందో, అదే ఇప్పుడూ ఉంటుందని ఊహించుకోవద్దు. డిపాజిట్ చేసే ముందు మీ రాష్ట్రంలో ప్రస్తుత నిబంధనలు సరిచూసుకోండి.
          </p>
        </div>

        {/* DafaWin disclosure */}
        <div className="card border-gray-700/50 bg-brand-surface">
          <h2 className="text-xl font-bold text-white mb-3">DafaWin మీకు ఏం రుణపడి ఉంది</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            మేము ఒక అఫిలియేట్ సైట్. మా లింక్‌ల ద్వారా దాఫాబెట్‌లో రిజిస్టర్ చేస్తే మాకు డబ్బు వస్తుంది.
            <strong className="text-white"> మీరు ఎంత ఓడిపోతే అంత మాకు లాభం కాదు</strong> — మీ రిజిస్ట్రేషన్‌కి మాకు చెల్లిస్తారు, మిగతా అంతా మీ చేతుల్లోనే.
            మీరు లిమిట్‌లు పెట్టుకుని, పది సంవత్సరాలు సరదాగా ఆడడం మాకు చాలా నచ్చుతుంది.
          </p>
        </div>

        {/* Telugu FAQs */}
        <div>
          <h2 className="section-title mb-6">తరచుగా అడిగే ప్రశ్నలు</h2>
          <div className="space-y-4">
            {teFaqs.map((faq) => (
              <details key={faq.question} className="card">
                <summary className="flex justify-between items-start cursor-pointer list-none py-1">
                  <span className="font-semibold text-white">{faq.question}</span>
                  <span className="text-brand-gold text-xl flex-shrink-0 ml-4">+</span>
                </summary>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="card bg-brand-surface">
          <h3 className="text-lg font-bold text-white mb-4">సంబంధిత గైడ్‌లు</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/dafabet-review" className="text-brand-gold text-sm hover:underline">దాఫాబెట్ సమీక్ష →</Link>
            <Link href="/dafabet-bonus" className="text-brand-gold text-sm hover:underline">దాఫాబెట్ బోనస్ గైడ్ →</Link>
            <Link href="/dafabet-app-download" className="text-brand-gold text-sm hover:underline">దాఫాబెట్ యాప్ డౌన్‌లోడ్ →</Link>
          </div>
          <p className="text-gray-600 text-xs mt-4">చివరి అప్‌డేట్: జూన్ 2026 | రచయిత: Sravan Kumar, Gaming Editor</p>
        </div>
      </section>
    </>
  )
}

export default async function ResponsibleGamblingPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return locale === 'te' ? <TeluguContent locale={locale} /> : <EnglishContent locale={locale} />
}
