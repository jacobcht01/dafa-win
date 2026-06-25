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
    desc: 'Go to DafaBet\'s official website or download the Android APK from the official page — never search "DafaBet" on Google and click random links, as mirror and phishing sites exist. Bookmark the real URL from DafaWin so you always land on the genuine platform. On desktop the Sign Up button is top-right; on mobile tap the hamburger menu first.',
    text: 'Open DafaBet\'s homepage in any browser or open the DafaBet Android app. On the homepage, tap Sign Up (top right on desktop, hamburger menu on mobile).',
  },
  {
    step: '2',
    name: 'Fill Registration Form',
    title: 'Fill Registration Form',
    desc: 'The registration form asks for your full legal name (must match your PAN/Aadhaar exactly), email address, Indian mobile number with +91 prefix, date of birth (18+ only), currency (select INR), and country (India). Create a strong password — at least 8 characters with one uppercase letter, one number, and one special character. Do not use your name or birthdate as your password.',
    text: 'Fill in your username, password (minimum 8 characters, at least one uppercase letter and one special character), email, mobile number (+91), currency (INR), country (India), and date of birth (you must be 18+).',
  },
  {
    step: '3',
    name: 'Promo / Referral Code',
    title: 'Promo / Referral Code',
    desc: 'The 200% welcome bonus up to ₹20,000 credits automatically on your first qualifying deposit — no promo code is required. Leave the promo field blank unless you have a verified code directly from DafaBet. Entering an incorrect or expired third-party code can delay your bonus, so when in doubt, leave it empty and the bonus will apply on its own.',
    text: 'The 200% / ₹20,000 welcome bonus does not require a promo code. It credits automatically on your first qualifying deposit. Leave the promo field blank unless you have a specific verified code from DafaBet.',
  },
  {
    step: '4',
    name: 'Verify Mobile and Email',
    title: 'Verify Mobile and Email',
    desc: 'After submitting the form, DafaBet sends a one-time password (OTP) to your registered Indian mobile number and a verification link to your email. Enter the OTP on the verification screen within the time limit. If the OTP does not arrive, wait 60 seconds and use the Resend OTP option. Also check that your mobile number is not on the DND (Do Not Disturb) registry, which can block transactional SMS.',
    text: 'Submit the form. DafaBet sends an OTP to your Indian mobile number and a verification link to your email. Enter the OTP on the next screen and click the email link to confirm both.',
  },
  {
    step: '5',
    name: 'Submit KYC Immediately',
    title: 'Submit KYC Immediately',
    desc: 'Do not wait until your first withdrawal to complete KYC — do it the same day you register. Go to My Account → KYC / Verification. Upload your PAN card (clear front photo) and Aadhaar card (front and back). An e-Aadhaar PDF downloaded from the UIDAI portal is preferred over a phone photo. DafaBet\'s published approval window is within 24 hours, though straightforward documents are often approved faster.',
    text: 'Go to My Account → KYC / Verification. Upload your PAN card (front photo) and Aadhaar (front and back, or e-Aadhaar PDF preferred). DafaBet\'s published KYC approval window is within 24 hours.',
  },
  {
    step: '6',
    name: 'Make First Deposit',
    title: 'Make First Deposit',
    desc: 'Head to Cashier → Deposit and select UPI as your payment method. DafaBet accepts PhonePe, Google Pay (GPay), and Paytm. Enter a minimum of ₹500 to qualify for the welcome bonus. Once the deposit clears — typically within a few minutes — the 200% bonus up to ₹20,000 is credited to your account automatically. You can then navigate to Sports, Live Casino, or Slots from the main menu.',
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
    { question: 'How many accounts can I create?', answer: 'One account per person, household, and device. DafaBet enforces this strictly — duplicate accounts result in a permanent ban and any winnings in those accounts are voided. If you have forgotten your password, use the Forgot Password option rather than creating a new account.' },
    { question: 'Can I register from any Indian state?', answer: 'DafaBet accepts players from all Indian states. However, Andhra Pradesh and Telangana have state-level restrictions on online gaming. If you are in either state, check your local laws before registering, as DafaBet\'s terms require you to comply with your jurisdiction\'s regulations.' },
    { question: 'What is the age requirement to register?', answer: 'You must be 18 years or older. DafaBet collects your date of birth during registration and verifies your age through KYC. Any account found to have been opened by a person under 18 is permanently closed and all winnings are voided.' },
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

      {/* Section A: KYC Verification Deep Dive */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">DafaBet KYC Verification — What You Need</h2>
        <div className="card mb-6">
          <p className="text-gray-300 leading-relaxed mb-4">
            KYC (Know Your Customer) is the identity verification process DafaBet uses to confirm that every account belongs to a real, eligible person. It prevents underage gambling, protects players from identity theft, and ensures DafaBet meets its obligations under Cura&ccedil;ao eGaming licence 1668/JAZ. You cannot make a withdrawal until KYC is approved, so submitting documents on the day of registration saves you delays later.
          </p>
          <h3 className="text-brand-gold font-bold mb-2">Documents Accepted</h3>
          <ul className="space-y-3 mb-4">
            <li className="text-gray-400 text-sm leading-relaxed"><span className="text-brand-gold font-semibold">PAN Card:</span> A clear photo of the front. This is the primary identity document for Indian players and is always required.</li>
            <li className="text-gray-400 text-sm leading-relaxed"><span className="text-brand-gold font-semibold">Aadhaar Card:</span> Front and back photos. Alternatively, download your e-Aadhaar PDF directly from the UIDAI portal (uidai.gov.in) — this is preferred because the PDF is higher quality than a phone photo.</li>
          </ul>
          <h3 className="text-brand-gold font-bold mb-2">How to Submit</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Log in and go to <span className="text-white">My Account &rarr; Verification</span>. Upload each document in the slot provided. Supported formats are JPG, PNG, and PDF. Make sure file sizes are within the upload limit shown on screen.
          </p>
          <h3 className="text-brand-gold font-bold mb-2">Approval Time</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            DafaBet&apos;s published window is within 24 hours. In practice, clear documents submitted during business hours are often approved within a few hours. You will receive an email confirmation once your account is verified.
          </p>
          <h3 className="text-brand-gold font-bold mb-2">Common Rejection Reasons — and How to Avoid Them</h3>
          <ul className="space-y-3">
            <li className="text-gray-400 text-sm leading-relaxed"><span className="text-white font-semibold">Blurry or dark photo:</span> Take photos in good natural light on a flat surface. Avoid flash glare. If the text is not clearly readable by a human, it will fail automated checks.</li>
            <li className="text-gray-400 text-sm leading-relaxed"><span className="text-white font-semibold">Name mismatch:</span> The name on your registration form must exactly match the name on your PAN card and Aadhaar. Even small differences (e.g., middle name missing, initials vs full name) can cause rejection. Use your full legal name at registration.</li>
            <li className="text-gray-400 text-sm leading-relaxed"><span className="text-white font-semibold">Expired document:</span> Only currently valid documents are accepted. An expired PAN or Aadhaar will be rejected. Renew the document before submitting.</li>
            <li className="text-gray-400 text-sm leading-relaxed"><span className="text-white font-semibold">Partial document visible:</span> All four corners of the document must be visible in the photo. Do not crop, fold, or cover any part of the card.</li>
            <li className="text-gray-400 text-sm leading-relaxed"><span className="text-white font-semibold">Wrong document uploaded:</span> Double-check that you have uploaded PAN in the PAN slot and Aadhaar in the Aadhaar slot — swapping them is a common mistake.</li>
          </ul>
        </div>
        <div className="card bg-brand-surface">
          <p className="text-gray-300 text-sm leading-relaxed">
            Once KYC is approved, full withdrawal access is unlocked. Until then, you can deposit and place bets, but withdrawals will be held pending verification.
          </p>
        </div>
      </section>

      {/* Section B: Claiming Your Welcome Bonus */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">How to Claim Your ₹20,000 Welcome Bonus After Registration</h2>
        <div className="card mb-6">
          <p className="text-gray-300 leading-relaxed mb-4">
            DafaBet&apos;s welcome offer is a 200% first deposit match bonus, capped at ₹20,000. No promo code is required — the bonus credits automatically once your first qualifying deposit clears.
          </p>
          <h3 className="text-brand-gold font-bold mb-2">Minimum Deposit</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            You must deposit at least ₹500 via UPI to trigger the welcome bonus. Deposits below ₹500 do not qualify.
          </p>
          <h3 className="text-brand-gold font-bold mb-2">Bonus Calculation Examples</h3>
          <ul className="space-y-3 mb-4">
            <li className="text-gray-400 text-sm leading-relaxed">Deposit ₹500 &rarr; ₹1,000 bonus &rarr; ₹1,500 total balance</li>
            <li className="text-gray-400 text-sm leading-relaxed">Deposit ₹2,000 &rarr; ₹4,000 bonus &rarr; ₹6,000 total balance</li>
            <li className="text-gray-400 text-sm leading-relaxed">Deposit ₹5,000 &rarr; ₹10,000 bonus &rarr; ₹15,000 total balance</li>
            <li className="text-gray-400 text-sm leading-relaxed">Deposit ₹10,000 &rarr; ₹20,000 bonus (cap reached) &rarr; ₹30,000 total balance</li>
          </ul>
          <h3 className="text-brand-gold font-bold mb-2">Wagering Requirement</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            The bonus carries an 8x wagering requirement on the bonus amount, which must be completed within 30 days. For example: if you deposit ₹10,000 and receive ₹20,000 in bonus funds, you need to wager ₹20,000 &times; 8 = ₹1,60,000 across eligible markets to release the bonus as withdrawable cash. This sounds large, but spreads across 30 days it is manageable for regular bettors.
          </p>
          <h3 className="text-brand-gold font-bold mb-2">Eligible Markets</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            All sports betting markets count fully toward wagering. Casino games may have partial contribution — check the current Terms &amp; Conditions on DafaBet for exact percentages, as these can change.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Once you have met the wagering requirement within the 30-day window, the bonus converts to real money and can be withdrawn freely alongside your winnings.
          </p>
        </div>
      </section>

      {/* Section C: Login, Security & Account Settings */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">Logging In and Securing Your DafaBet Account</h2>
        <div className="card mb-6">
          <p className="text-gray-300 leading-relaxed mb-4">
            Once registered, log in at any time using your registered email address and password. The DafaBet mobile app also supports biometric authentication — Face ID on compatible iPhones and fingerprint unlock on Android devices — so you do not need to type your password every session.
          </p>
          <h3 className="text-brand-gold font-bold mb-2">Forgot Your Password?</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Click <span className="text-white">Forgot Password</span> on the login page and enter your registered email address. A password reset link will be sent within a few minutes. Check your spam folder if it does not appear in your inbox. Do not create a second account — multiple accounts result in a ban.
          </p>
          <h3 className="text-brand-gold font-bold mb-2">Withdrawal Security</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            DafaBet verifies all withdrawal requests via OTP sent to your registered mobile number, adding an extra layer of protection against unauthorised withdrawals. Keep your phone number up to date in account settings.
          </p>
          <h3 className="text-brand-gold font-bold mb-2">Responsible Gambling Tools in Account Settings</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Under <span className="text-white">My Account &rarr; Responsible Gambling</span> you can set daily, weekly, or monthly deposit limits; configure session time reminders; or apply a self-exclusion period (6 months, 1 year, or permanent). These tools take effect immediately once set. Using them does not affect your bonuses or account standing.
          </p>
        </div>
      </section>

      {/* Section D: Troubleshooting Common Registration Issues */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">Registration Problems? Common Issues &amp; Fixes</h2>
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-brand-gold font-bold mb-2">&quot;Email already registered&quot;</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              This means an account already exists under that email address. Try logging in instead — you may have registered previously and forgotten. Use Forgot Password to regain access. Do not register again with a different email to create a second account, as DafaBet will link both accounts and ban them.
            </p>
          </div>
          <div className="card">
            <h3 className="text-brand-gold font-bold mb-2">&quot;Mobile number already in use&quot;</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Each player is permitted one account only, and each mobile number can only be used once. If you see this error and it is genuinely your number, contact DafaBet live chat support with your details to resolve it. Do not use a family member&apos;s number — accounts linked to the same household can be flagged.
            </p>
          </div>
          <div className="card">
            <h3 className="text-brand-gold font-bold mb-2">OTP Not Arriving</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Wait 60 seconds, then use the Resend OTP button. If it still does not arrive: (1) confirm you entered the correct +91 number with no extra digits; (2) check if your number is registered on the DND (Do Not Disturb) list — telecom DND can block transactional SMS; (3) try resending once more. If the problem persists, contact support via live chat.
            </p>
          </div>
          <div className="card">
            <h3 className="text-brand-gold font-bold mb-2">Account Suspended Immediately After Registration</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              This typically happens when KYC details do not match registration details. Contact DafaBet live chat and provide your documents. Accounts are usually reinstated within 24 hours once identity is confirmed. Do not attempt to open a new account — it will be linked to the suspended one.
            </p>
          </div>
          <div className="card">
            <h3 className="text-brand-gold font-bold mb-2">&quot;Your Country Is Not Supported&quot;</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              DafaBet serves Indian players. If you see this error, your IP address may be routing through a VPN that shows a non-Indian location. Disable any active VPN, clear your browser cache, and try again. If you are genuinely in India and see this error without a VPN, contact live chat support.
            </p>
          </div>
          <div className="card">
            <h3 className="text-brand-gold font-bold mb-2">Under 18 — Age Verification Failed</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              DafaBet requires all players to be 18 or older. If your date of birth on the registration form shows you are under 18, the account will not be created. There is no workaround — this is a hard legal requirement.
            </p>
          </div>
          <div className="card">
            <h3 className="text-brand-gold font-bold mb-2">UPI Payment Failing at First Deposit</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              UPI payments can fail for several reasons: (1) your UPI app&apos;s daily limit is reached — the standard limit is ₹1,00,000 per day, though some banks set it lower; (2) the specific UPI app (e.g., PhonePe) is experiencing downtime — try a different UPI app such as GPay or Paytm; (3) your bank has flagged the transaction — call your bank&apos;s helpline to whitelist gaming transactions. Money deducted from your bank but not credited to DafaBet is typically refunded within 3-5 business days.
            </p>
          </div>
        </div>
      </section>

      {/* Section E: Responsible Gambling */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title text-center mb-8">Play Responsibly — Tools Available at Registration</h2>
        <div className="card mb-6">
          <p className="text-gray-300 leading-relaxed mb-4">
            DafaBet is licensed under Cura&ccedil;ao eGaming (licence 1668/JAZ) and operates under responsible gambling policies. If you are registering in 2026, be aware of the following tools and requirements from day one.
          </p>
          <h3 className="text-brand-gold font-bold mb-2">Age Requirement</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            You must be 18 years or older to register and bet. DafaBet verifies age through KYC — any account found to be underage is permanently closed and all winnings are forfeited.
          </p>
          <h3 className="text-brand-gold font-bold mb-2">Set Deposit Limits from Day One</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            It is strongly recommended to set a daily or weekly deposit limit immediately after registration, before you make your first deposit. This prevents impulsive overspending. Go to <span className="text-white">My Account &rarr; Responsible Gambling &rarr; Deposit Limits</span>.
          </p>
          <h3 className="text-brand-gold font-bold mb-2">Session Time Reminders</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Enable session time reminders to receive a notification after a set period of play (e.g., 1 hour). This helps you track how long you have been betting.
          </p>
          <h3 className="text-brand-gold font-bold mb-2">Self-Exclusion</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            If you feel your gambling is becoming a problem, use the self-exclusion tool available in account settings. Options include 6 months, 1 year, or permanent exclusion. Once applied, the exclusion cannot be reversed during the chosen period.
          </p>
          <h3 className="text-brand-gold font-bold mb-2">Support Helplines (India)</h3>
          <ul className="space-y-3">
            <li className="text-gray-400 text-sm leading-relaxed">
              <span className="text-white font-semibold">Vandrevala Foundation:</span> 1860-2662-345 — 24/7, free, confidential mental health and gambling support.
            </li>
            <li className="text-gray-400 text-sm leading-relaxed">
              <span className="text-white font-semibold">iCall (TISS):</span> 9152987821 — counselling support available Monday to Saturday.
            </li>
          </ul>
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
