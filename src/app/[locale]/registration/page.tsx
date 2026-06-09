import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'registration' })
  return { title: t('title'), description: t('description') }
}

function RegistrationContent() {
  const t = useTranslations('registration')

  return (
    <>
      <section className="bg-dark-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6">📝</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="gold-text">{t('hero_title')}</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">{t('hero_subtitle')}</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-6">
          {[
            { step: '1', title: 'Visit DafaWin', desc: 'Go to the DafaWin website or open the app.' },
            { step: '2', title: 'Click Register', desc: 'Click the "Register" or "Sign Up" button at the top of the page.' },
            { step: '3', title: 'Enter Details', desc: 'Fill in your name, email, mobile number, and create a password.' },
            { step: '4', title: 'Verify Account', desc: 'Verify your email or mobile number via OTP.' },
            { step: '5', title: 'Make Deposit', desc: 'Deposit using UPI, Paytm, or NetBanking and claim your welcome bonus.' },
            { step: '6', title: 'Start Betting', desc: 'You are ready! Explore sports betting and casino games.' },
          ].map((item) => (
            <div key={item.step} className="card flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-black font-bold text-lg flex-shrink-0">
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
    </>
  )
}

export default async function RegistrationPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <RegistrationContent />
}
