'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import LanguageSwitcher from './LanguageSwitcher'

type Props = {
  locale: string
}

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/cricket-betting', key: 'cricket' },
  { href: '/ipl-betting', key: 'ipl' },
  { href: '/football-betting', key: 'football' },
  { href: '/kabaddi-betting', key: 'kabaddi' },
  { href: '/casino', key: 'casino' },
  { href: '/bonuses', key: 'bonuses' },
  { href: '/review', key: 'review' },
  { href: '/faq', key: 'faq' },
] as const

export default function Header({ locale }: Props) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-brand-surface/95 backdrop-blur-sm border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold gold-text">DafaWin</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-150 ${
                  pathname === link.href
                    ? 'text-gold-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/registration"
              className="hidden sm:inline-flex btn-primary text-sm px-4 py-2"
            >
              {t('registration')}
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-brand-card"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-brand-border bg-brand-surface" aria-label="Mobile navigation">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-brand-card text-gold-400'
                    : 'text-gray-400 hover:text-white hover:bg-brand-card'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}
            <Link
              href="/registration"
              className="block btn-primary text-center mt-4"
              onClick={() => setMobileOpen(false)}
            >
              {t('registration')}
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
