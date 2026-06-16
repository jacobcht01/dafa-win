'use client'

import { usePathname, useParams } from 'next/navigation'
import { Link } from '@/i18n/navigation'

const LABEL_MAP_EN: Record<string, string> = {
  'dafabet-review': 'DafaBet Review',
  'cricket-betting': 'Cricket Betting',
  'ipl-betting': 'IPL Betting',
  'sports-betting': 'Sports Betting',
  'football-betting': 'Football Betting',
  'kabaddi-betting': 'Kabaddi Betting',
  'online-casino': 'Online Casino',
  'dafabet-bonus': 'Bonuses',
  'dafabet-registration': 'Registration',
  'dafabet-payment': 'Payment Methods',
  'dafabet-app-download': 'App Download',
  'faq': 'FAQ',
  'responsible-gambling': 'Responsible Gambling',
  'india-vs-pakistan-betting': 'India vs Pakistan Betting',
  't20-world-cup-betting': 'T20 World Cup Betting',
}

const LABEL_MAP_TE: Record<string, string> = {
  'dafabet-review': 'దాఫాబెట్ సమీక్ష',
  'cricket-betting': 'క్రికెట్ పందెం',
  'ipl-betting': 'ఐపీఎల్ పందెం',
  'sports-betting': 'స్పోర్ట్స్ పందెం',
  'football-betting': 'ఫుట్‌బాల్ పందెం',
  'kabaddi-betting': 'కబడ్డీ పందెం',
  'online-casino': 'ఆన్‌లైన్ క్యాసినో',
  'dafabet-bonus': 'బోనస్‌లు',
  'dafabet-registration': 'రిజిస్ట్రేషన్',
  'dafabet-payment': 'చెల్లింపు పద్ధతులు',
  'dafabet-app-download': 'యాప్ డౌన్‌లోడ్',
  'faq': 'తరచుగా అడిగే ప్రశ్నలు',
  'responsible-gambling': 'బాధ్యతాయుత జూదం',
  'india-vs-pakistan-betting': 'ఇండియా vs పాకిస్తాన్',
  't20-world-cup-betting': 'T20 ప్రపంచ కప్',
}

export default function BreadcrumbNav() {
  const pathname = usePathname()
  const params = useParams()
  const locale = (params?.locale as string) ?? 'en'

  if (pathname === '/' || pathname === '/te' || pathname === '/te/') return null

  const segments = pathname.split('/').filter((s) => s !== '' && s !== 'te')
  const lastSegment = segments[segments.length - 1]
  const labelMap = locale === 'te' ? LABEL_MAP_TE : LABEL_MAP_EN
  const label = labelMap[lastSegment] ?? lastSegment.replace(/-/g, ' ')
  const homeLabel = locale === 'te' ? 'హోమ్' : 'Home'

  return (
    <nav aria-label="Breadcrumb" className="bg-brand-dark border-b border-brand-border">
      <ol className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-1.5 text-xs text-gray-500">
        <li>
          <Link href="/" className="hover:text-brand-gold transition-colors">{homeLabel}</Link>
        </li>
        <li aria-hidden="true">
          <span className="text-gray-700">/</span>
        </li>
        <li className="text-gray-300 truncate" aria-current="page">
          {label}
        </li>
      </ol>
    </nav>
  )
}
