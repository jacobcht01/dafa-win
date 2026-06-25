import type { Metadata } from 'next'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { JsonLd } from '@/components/JsonLd'
import { howToSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'
import { Link } from '@/i18n/navigation'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'registration' })
  const alts = pageAlternates(locale, '/dafabet-registration/')
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: alts.canonical, languages: alts.languages },
  }
}

const STEPS = [
  {
    step: '1',
    name: 'Open DafaBet',
    title: 'Open DafaBet',
    desc: 'Open DafaBet\'s homepage or the DafaBet Android/iOS app. Tap Sign Up (top right on desktop, menu on mobile).',
    text: 'Open DafaBet\'s homepage in any browser or open the DafaBet Android app. On the homepage, tap Sign Up (top right on desktop, hamburger menu on mobile).',
  },
  {
    step: '2',
    name: 'Fill Registration Form',
    title: 'Fill Registration Form',
    desc: 'Username, password (8+ chars, 1 uppercase, 1 special), email, mobile (+91), currency (INR), country (India), date of birth (must be 18+).',
    text: 'Fill in your username, password (minimum 8 characters, at least one uppercase letter and one special character), email, mobile number (+91), currency (INR), country (India), and date of birth (you must be 18+).',
  },
  {
    step: '3',
    name: 'Promo / Referral Code',
    title: 'Promo / Referral Code',
    desc: 'The 200% / ₹20,000 welcome bonus does NOT require a code — it credits automatically on first deposit. Leave the promo field blank unless you have a verified DafaBet code.',
    text: 'The 200% / ₹20,000 welcome bonus does not require a promo code. It credits automatically on your first qualifying deposit. Leave the promo field blank unless you have a specific verified code from DafaBet.',
  },
  {
    step: '4',
    name: 'Verify Mobile and Email',
    title: 'Verify Mobile and Email',
    desc: 'DafaBet sends an OTP to your mobile and a link to your email. Enter the OTP and click the email link.',
    text: 'Submit the form. DafaBet sends an OTP to your Indian mobile number and a verification link to your email. Enter the OTP on the next screen and click the email link to confirm both.',
  },
  {
    step: '5',
    name: 'Submit KYC Immediately',
    title: 'Submit KYC Immediately',
    desc: 'Go to My Account → KYC. Upload PAN (front), Aadhaar (front + back), and Aadhaar PDF preferred. Published KYC window: within 24 hours.',
    text: 'Go to My Account → KYC / Verification. Upload your PAN card (front photo) and Aadhaar (front and back, or e-Aadhaar PDF preferred). DafaBet\'s published KYC approval window is within 24 hours.',
  },
  {
    step: '6',
    name: 'Make First Deposit',
    title: 'Make First Deposit',
    desc: 'Go to Cashier → Deposit, pick UPI (PhonePe/GPay/Paytm), enter ₹500 minimum. The 200% bonus credits automatically after deposit clears.',
    text: 'Go to Cashier → Deposit, select UPI (PhonePe, GPay, or Paytm), and enter at least ₹500. The 200% welcome bonus up to ₹20,000 credits automatically once the deposit clears.',
  },
]

function RegistrationContent({ locale }: { locale: string }) {
  const t = useTranslations('registration')

  const pageUrl = locale === 'te' ? `${SITE_URL}/te/dafabet-registration/` : `${SITE_URL}/dafabet-registration/`

  const faqs = [
    { question: 'How long does DafaBet registration take?', answer: 'Under 5 minutes for the form. KYC typically completes within 24 hours, often much faster for straightforward documents.' },
    { question: 'Is there a promo code needed for the welcome bonus?', answer: 'No — the 200% welcome bonus up to ₹20,000 credits automatically on your first qualifying deposit. No promo code required.' },
    { question: 'What documents are needed for KYC?', answer: 'PAN card and Aadhaar cover most Indian accounts. Submit them the same day as registration so your first withdrawal is not held at the KYC stage.' },
    { question: 'What is the minimum age to register?', answer: '18 years old. Age verification is mandatory and DafaBet requires date of birth on the registration form.' },
    { question: 'Can I register via mobile?', answer: 'Yes. DafaBet has an Android APK and an iOS-compatible mobile-optimised site. The full registration flow works on any smartphone browser.' },
  ]

  const schemaData = [
    howToSchema({
      name: 'How to Register at DafaBet India',
      description: 'Complete step-by-step guide to creating your DafaBet India account.',
      steps: STEPS.map((s) => ({ name: s.name, text: s.text })),
    }),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL + '/' },
      { name: 'Registration', url: pageUrl },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Hero with image */}
      <section className="relative h-[320px] md:h-[400px] flex items-center overflow-hidden">
        <Image
          src="/images/registration.webp"
          alt="DafaBet Registration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="gold-badge mb-4 inline-block">Free — Takes Under 5 Minutes</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gold-text">How to Register at DafaBet India</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-xl">
            Create your account in under 5 minutes. UPI deposit, 200% welcome bonus up to ₹20,000, and you&apos;re set.
          </p>
          <a href="#steps" className="btn-primary text-lg px-8 py-4">Register Now — Free</a>
        </div>
      </section>

      {/* Steps */}
      <section id="steps" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="section-title mb-10 text-center">How to Register at DafaBet</h2>
        <div className="space-y-6">
          {STEPS.map((item) => (
            <div key={item.step} className="card flex gap-4 items-start">
              <div className="bg-gold-gradient rounded-full w-8 h-8 flex items-center justify-center text-black font-bold flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {locale === 'te' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="section-title mb-6">నమోదు తెలుగు గైడ్</h2>

          {/* Registration steps card */}
          <div className="card mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">దాఫాబెట్ అకౌంట్ — 5 నిమిషాల్లో ఇలా చేయండి:</h3>
            <ol className="space-y-3 text-gray-400 text-sm">
              <li className="flex gap-3">
                <span className="text-brand-gold font-bold flex-shrink-0">1.</span>
                <span>DafaWin లింక్ నుండి దాఫాబెట్ హోమ్‌పేజ్ తెరవండి. &quot;Sign Up&quot; నొక్కండి.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-gold font-bold flex-shrink-0">2.</span>
                <span>పేరు (నిజమైన పేరు — KYC తనిఖీ చేస్తుంది), ఈమెయిల్, ఫోన్ (+91), పుట్టిన తేదీ (18+), కరెన్సీ INR నింపండి.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-gold font-bold flex-shrink-0">3.</span>
                <span>ప్రమో కోడ్ ఫీల్డ్ ఉంటే ఖాళీగా వదలండి — 200% బోనస్ ఆటోమేటిగా వస్తుంది.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-gold font-bold flex-shrink-0">4.</span>
                <span>OTP వెరిఫై చేయండి, ఈమెయిల్ లింక్ క్లిక్ చేయండి.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-gold font-bold flex-shrink-0">5.</span>
                <span>వెంటనే KYC అప్‌లోడ్ చేయండి: PAN కార్డ్ + ఆధార్. విత్‌డ్రాకి ముందు కాదు — రోజే.</span>
              </li>
            </ol>
          </div>

          {/* KYC tip card */}
          <div className="card mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">KYC ఆలస్యమైన కారణాలు (తరచుగా వచ్చే సమస్యలు)</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex gap-2"><span className="text-brand-gold flex-shrink-0">&#10003;</span><span>PAN ఫోటో అంచు కటైంది — అన్ని 4 మూలలు కనపడాలి.</span></li>
              <li className="flex gap-2"><span className="text-brand-gold flex-shrink-0">&#10003;</span><span>ఆధార్ పేరు + అకౌంట్ పేరు తేడా ఉంది — పేరు అచ్చం ఒకేలా ఉండాలి.</span></li>
              <li className="flex gap-2"><span className="text-brand-gold flex-shrink-0">&#10003;</span><span>e-Aadhaar PDF (UIDAI పోర్టల్ నుండి) ఫోన్ ఫోటో కంటే మంచిది.</span></li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="card bg-brand-surface">
            <p className="text-gray-400 text-sm mb-3 font-semibold">సంబంధిత పేజీలు:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dafabet-payment" className="text-brand-gold hover:underline text-sm">జమ-విత్‌డ్రా గైడ్</Link>
              <Link href="/dafabet-bonus" className="text-brand-gold hover:underline text-sm">దాఫాబెట్ బోనస్</Link>
              <Link href="/dafabet-app-download" className="text-brand-gold hover:underline text-sm">దాఫాబెట్ యాప్</Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="section-title mb-8">Registration FAQ</h2>
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

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-brand-surface rounded-xl p-8 text-center border border-brand-border">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Start Betting?</h2>
          <p className="text-gray-400 mb-6">Join millions of Indian players. Register in under 5 minutes.</p>
          <Link href="/dafabet-registration" className="btn-primary text-lg px-8 py-4">Create Free Account</Link>
          <p className="text-gray-500 text-xs mt-4">18+ only. Gamble responsibly.</p>
        </div>
      </section>
    </>
  )
}

export default async function RegistrationPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <RegistrationContent locale={locale} />
}
