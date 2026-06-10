import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { JsonLd } from '@/components/JsonLd'
import { organizationSchema, websiteSchema, breadcrumbSchema } from '@/lib/schema'
import { pageAlternates, SITE_URL } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  const alts = pageAlternates(locale, '/')
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: alts.canonical,
      languages: alts.languages,
    },
  }
}

function StarRating({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= score ? 'text-brand-gold' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  )
}

function HomePageContent({ locale }: { locale: string }) {
  const t = useTranslations('home')

  const schemaData = [
    organizationSchema(),
    websiteSchema(),
    breadcrumbSchema([{ name: 'Home', url: SITE_URL + '/' }]),
  ]

  const pros = [
    '₹20,000 Welcome Bonus for new players',
    '3,000+ casino games including live dealers',
    'Cricket & IPL betting with best odds',
    'UPI, Paytm, PhonePe instant deposits',
    'Official Dafabet app for Android & iOS',
    '24/7 customer support in Hindi & English',
  ]

  const cons = [
    'Website is in English only (no full Hindi)',
    'Withdrawal can take 1-3 business days',
  ]

  const bonuses = [
    { img: '/images/first-deposit-bonus.webp', title: 'First Deposit Bonus', desc: '100% up to ₹20,000 on your first deposit', badge: 'Welcome', badgeClass: 'gold-badge' },
    { img: '/images/cashback-banner.webp', title: 'Cashback Offer', desc: 'Get 10% cashback on your losses every week', badge: 'Weekly', badgeClass: 'red-badge' },
    { img: '/images/daily-free-spins.webp', title: 'Daily Free Spins', desc: 'Up to 20 free spins daily on selected slots', badge: 'Daily', badgeClass: 'red-badge' },
  ]

  const games = [
    { img: '/images/casino-game-1.jpg', name: 'Crazy Cluckers' },
    { img: '/images/casino-game-2.jpg', name: 'Epic Ape' },
    { img: '/images/casino-game-3.jpg', name: 'Gold Hit' },
    { img: '/images/casino-game-4.jpg', name: 'King Rich Win' },
    { img: '/images/casino-game-5.jpg', name: 'Pachin Goal' },
    { img: '/images/casino-game-6.jpg', name: 'Ultra Ace' },
  ]

  const payments = [
    { name: 'UPI', icon: '📱', desc: 'Instant' },
    { name: 'Paytm', icon: '💳', desc: 'Instant' },
    { name: 'Net Banking', icon: '🏦', desc: '1-3 hours' },
    { name: 'Crypto', icon: '₿', desc: '1-4 hours' },
  ]

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[380px] md:h-[480px] w-full">
          <Image
            src="/images/desktop-hero.webp"
            alt="Dafabet India — Online Casino and Sports Betting"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl">
                <span className="gold-badge mb-3 inline-block text-xs font-bold">India&apos;s #1 Betting Site 2025</span>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  Dafabet India <span className="gold-text">Review</span>
                </h1>
                <p className="text-gray-300 text-lg mb-6">
                  ₹20,000 Welcome Bonus · 3,000+ Games · Cricket &amp; IPL Betting
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/dafabet-registration" className="btn-primary text-base px-6 py-3">
                    Claim ₹20,000 Bonus →
                  </Link>
                  <Link href="/dafabet-review" className="btn-secondary text-base px-6 py-3">
                    Read Full Review
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Verdict Box */}
      <section className="bg-brand-surface border-b border-brand-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Rating */}
            <div className="verdict-box lg:col-span-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 relative flex-shrink-0">
                  <Image src="/images/dafa-logo.png" alt="Dafabet" width={64} height={64} className="rounded-lg" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Dafabet India</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating score={5} />
                    <span className="text-brand-gold font-bold text-lg">9.2/10</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Our experts rated Dafabet as India&apos;s top betting site for 2025, especially for cricket and IPL.
              </p>
              <Link href="/dafabet-registration" className="btn-primary w-full text-center block">
                Register &amp; Claim Bonus
              </Link>
            </div>

            {/* Pros */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                <span className="text-brand-gold">✓</span> Pros
              </h3>
              <ul className="space-y-2">
                {pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-sm text-gray-300 py-0.5">
                    <CheckIcon />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                <span className="text-gray-500">✗</span> Cons
              </h3>
              <ul className="space-y-2">
                {cons.map((con) => (
                  <li key={con} className="flex items-start gap-2 text-sm text-gray-400 py-0.5">
                    <CrossIcon />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* About Dafabet */}
        <section className="review-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="section-title mb-4">What is Dafabet India?</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Dafabet is one of Asia&apos;s largest and most trusted online betting platforms, fully licensed and operating in India since 2004. It offers sports betting, casino games, and live dealer experiences — all on one platform.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Indian players get access to over 3,000 casino games, cricket and IPL betting with competitive odds, and fast UPI payments. The welcome bonus of ₹20,000 is among the highest available in India.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '3,000+', label: 'Casino Games' },
                  { value: '₹20,000', label: 'Welcome Bonus' },
                  { value: '20+ years', label: 'In Business' },
                  { value: '24/7', label: 'Support' },
                ].map((stat) => (
                  <div key={stat.label} className="stat-box">
                    <div className="text-2xl font-bold gold-text">{stat.value}</div>
                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-card-hover">
              <Image
                src="/images/dafabet-website.webp"
                alt="Dafabet official website India"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Welcome Bonuses */}
        <section className="review-section">
          <h2 className="section-title mb-2">Welcome Bonus &amp; Promotions</h2>
          <p className="section-subtitle mb-8">Dafabet offers some of the best bonuses for Indian players in 2025.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bonuses.map((bonus) => (
              <div key={bonus.title} className="card-hover overflow-hidden">
                <div className="relative h-48 -mx-6 -mt-6 mb-4">
                  <Image src={bonus.img} alt={bonus.title} fill className="object-cover" />
                  <div className="absolute top-3 left-3">
                    <span className={bonus.badgeClass}>{bonus.badge}</span>
                  </div>
                </div>
                <h3 className="font-bold text-white mb-1">{bonus.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{bonus.desc}</p>
                <Link href="/dafabet-bonus" className="btn-secondary text-sm px-4 py-2 w-full text-center block">
                  Claim Offer
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/dafabet-bonus" className="btn-primary px-8 py-3">
              View All Bonuses →
            </Link>
          </div>
        </section>

        {/* Registration */}
        <section className="review-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-xl overflow-hidden shadow-card-hover order-2 lg:order-1">
              <Image
                src="/images/registration.webp"
                alt="How to register on Dafabet India"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="section-title mb-4">How to Register on Dafabet</h2>
              <p className="text-gray-400 mb-6">Create your account in under 2 minutes and claim your ₹20,000 bonus.</p>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Click Register', desc: 'Visit Dafabet and click the Register button' },
                  { step: '2', title: 'Fill Your Details', desc: 'Enter your name, email, and mobile number' },
                  { step: '3', title: 'Verify Account', desc: 'Confirm via OTP sent to your mobile' },
                  { step: '4', title: 'Make First Deposit', desc: 'Deposit via UPI and claim your 100% bonus' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gold-gradient rounded-full flex items-center justify-center flex-shrink-0 text-black font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/dafabet-registration" className="btn-primary mt-6 inline-block">
                Register Now — Free
              </Link>
            </div>
          </div>
        </section>

        {/* Sports Betting */}
        <section className="review-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="section-title mb-4">Cricket &amp; Sports Betting</h2>
              <p className="text-gray-400 mb-4">
                Dafabet is the top pick for Indian sports bettors — dedicated cricket, IPL, kabaddi, and football sections with best-in-market odds and live in-play betting.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: '🏏', sport: 'Cricket', markets: '500+ markets' },
                  { icon: '🏆', sport: 'IPL', markets: 'Live betting' },
                  { icon: '⚽', sport: 'Football', markets: 'ISL & EPL' },
                  { icon: '🤼', sport: 'Kabaddi', markets: 'PKL covered' },
                ].map((s) => (
                  <div key={s.sport} className="flex items-center gap-3 p-3 rounded-lg bg-brand-card border border-brand-border">
                    <span className="text-2xl">{s.icon}</span>
                    <div>
                      <div className="font-semibold text-white text-sm">{s.sport}</div>
                      <div className="text-gray-500 text-xs">{s.markets}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href="/cricket-betting" className="btn-secondary px-5 py-2 text-sm">Cricket →</Link>
                <Link href="/ipl-betting" className="btn-secondary px-5 py-2 text-sm">IPL →</Link>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-card-hover">
              <Image
                src="/images/sports-betting.webp"
                alt="Sports betting at Dafabet India"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Casino Games */}
        <section className="review-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <h2 className="section-title mb-4">Online Casino Games</h2>
              <p className="text-gray-400 mb-4">
                3,000+ games from Playtech, Evolution, and Pragmatic Play. Enjoy slots, roulette, blackjack, baccarat, and live dealer tables with real-time streaming.
              </p>
              <Link href="/online-casino" className="btn-primary inline-block">
                Explore Casino →
              </Link>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-card-hover">
              <Image
                src="/images/casino.webp"
                alt="Dafabet online casino games"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {games.map((game) => (
              <div key={game.name} className="relative rounded-lg overflow-hidden group cursor-pointer border border-brand-border">
                <Image src={game.img} alt={game.name} width={325} height={250} className="w-full h-auto group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-xs font-medium text-center transform translate-y-full group-hover:translate-y-0 transition-transform">
                  {game.name}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Payment Methods */}
        <section className="review-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-xl overflow-hidden shadow-card-hover">
              <Image
                src="/images/payment.webp"
                alt="Payment methods at Dafabet India — UPI, Paytm, Net Banking"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div>
              <h2 className="section-title mb-4">Payment Methods</h2>
              <p className="text-gray-400 mb-6">
                All major Indian payment methods supported. UPI deposits are instant — withdraw directly to your bank account with no fees.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {payments.map((p) => (
                  <div key={p.name} className="flex items-center gap-3 p-4 rounded-lg border border-brand-border bg-brand-card">
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <div className="font-semibold text-white text-sm">{p.name}</div>
                      <div className="text-brand-gold text-xs font-medium">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/dafabet-payment" className="btn-secondary px-6 py-2 inline-block">
                View All Payment Options →
              </Link>
            </div>
          </div>
        </section>

        {/* App Download */}
        <section className="review-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="section-title mb-4">Dafabet Mobile App</h2>
              <p className="text-gray-400 mb-4">
                Bet on cricket and play casino games anywhere. Available free for Android (APK direct download) and iOS.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  'Fast and smooth on all Android & iOS devices',
                  'Live betting with real-time score updates',
                  'Full casino access including live dealers',
                  'Instant UPI deposits and withdrawals',
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckIcon />
                    {f}
                  </div>
                ))}
              </div>
              <Link href="/dafabet-app-download" className="btn-primary inline-block">
                Download Dafabet App →
              </Link>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-card-hover">
              <Image
                src="/images/app-download.webp"
                alt="Download Dafabet app for Android and iOS"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-12">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/images/promo-767-1.jpg"
              alt="Dafabet welcome offer"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/75" />
            <div className="relative px-8 md:px-12 py-12 text-center text-white">
              <span className="red-badge mb-4 inline-block">Limited Time Offer</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Claim Your <span className="gold-text">₹20,000</span> Bonus Today
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join 5 million+ players on Dafabet. Register now and get India&apos;s biggest betting welcome bonus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dafabet-registration" className="btn-primary text-lg px-8 py-4">
                  Register &amp; Get Bonus
                </Link>
                <Link href="/dafabet-review" className="btn-secondary text-lg px-8 py-4">
                  Read Full Review
                </Link>
              </div>
              <p className="text-gray-500 text-xs mt-6">18+ only · T&Cs apply · Please gamble responsibly</p>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <HomePageContent locale={locale} />
}
