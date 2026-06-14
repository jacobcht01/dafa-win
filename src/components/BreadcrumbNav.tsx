'use client'

import { usePathname } from '@/i18n/navigation'
import { Link } from '@/i18n/navigation'

const LABEL_MAP: Record<string, string> = {
  'dafabet-review': 'Dafabet Review',
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

export default function BreadcrumbNav() {
  const pathname = usePathname()

  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1]
  const label = LABEL_MAP[lastSegment] ?? lastSegment.replace(/-/g, ' ')

  return (
    <nav aria-label="Breadcrumb" className="bg-brand-dark border-b border-brand-border">
      <ol className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-1.5 text-xs text-gray-500">
        <li>
          <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
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
