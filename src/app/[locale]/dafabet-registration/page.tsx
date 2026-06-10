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
  { step: '1', name: 'Visit DafaBet India', title: 'Visit DafaWin', desc: 'Go to the DafaWin website or open the app.', text: 'Navigate to dafawin.in or open the DafaBet app on your mobile device.' },
  { step: '2', name: 'Click Register', title: 'Click Register', desc: 'Click the "Register" or "Sign Up" button at the top of the page.', text: 'Click the "Register" or "Sign Up" button at the top of the DafaBet homepage.' },
  { step: '3', name: 'Enter Your Details', title: 'Enter Details', desc: 'Fill in your name, email, mobile number, and create a password.', text: 'Fill in your full name, email address, mobile number, and create a strong password.' },
  { step: '4', name: 'Verify Account', title: 'Verify Account', desc: 'Verify your email or mobile number via OTP.', text: 'Enter the OTP sent to your registered mobile number or email address.' },
  { step: '5', name: 'Make Your First Deposit', title: 'Make Deposit', desc: 'Deposit using UPI, Paytm, or NetBanking and claim your welcome bonus.', text: 'Deposit a minimum amount using UPI, Paytm, PhonePe or Net Banking to claim your welcome bonus.' },
  { step: '6', name: 'Start Betting', title: 'Start Betting', desc: 'You are ready! Explore sports betting and casino games.', text: 'Your account is now ready. Explore cricket betting, IPL markets, casino games, and more.' },
]

function RegistrationContent({ locale }: { locale: string }) {
  const t = useTranslations('registration')

  const pageUrl = locale === 'te' ? `${SITE_URL}/te/dafabet-registration/` : `${SITE_URL}/dafabet-registration/`

  const faqs = [
    { question: 'How long does DafaBet registration take?', answer: 'Registration takes less than 5 minutes. Fill in your details, verify your number, make a deposit and you are ready to bet.' },
    { question: 'What documents do I need to register at DafaBet India?', answer: 'For KYC verification, you need a valid government ID (Aadhaar, PAN, passport) and proof of address. KYC is required before first withdrawal.' },
    { question: 'What is the minimum age to register at DafaBet?', answer: 'You must be 18 years or older to register at DafaBet India. Age verification is mandatory.' },
    { question: 'Can I register from India?', answer: 'Yes. DafaBet accepts registrations from Indian players. Indian Rupee (INR) accounts with UPI and Paytm support are available.' },
    { question: 'What welcome bonus do I get on registration?', answer: 'New players receive a 100% deposit match bonus up to ₹10,000 on their first deposit after registration.' },
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
          <span className="gold-badge mb-4 inline-block">Free — Takes 2 Minutes</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gold-text">{t('hero_title')}</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6 max-w-xl">{t('hero_subtitle')}</p>
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
