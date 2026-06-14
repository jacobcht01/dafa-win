import type { Metadata } from 'next'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { JsonLd } from '@/components/JsonLd'
import { howToSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'

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
    { question: 'How long does DafaBet registration take?', answer: 'Under 5 minutes for the form. KYC verification takes up to 24 hours, though our June 2026 test was approved in about 10 minutes.' },
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
          <a href="/dafabet-registration" className="btn-primary text-lg px-8 py-4">Create Free Account</a>
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
