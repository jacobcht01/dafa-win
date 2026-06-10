'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import LanguageSwitcher from './LanguageSwitcher'

type Props = {
  locale: string
}

const navLinks = [
  { href: '/dafabet-review', key: 'review' },
  { href: '/cricket-betting', key: 'cricket' },
  { href: '/ipl-betting', key: 'ipl' },
  { href: '/online-casino', key: 'casino' },
  { href: '/dafabet-bonus', key: 'bonuses' },
  { href: '/faq', key: 'faq' },
] as const

export default function Header({ locale }: Props) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold text-brand-text">
              Dafa<span className="text-brand-green">Win</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  pathname === link.href
                    ? 'text-brand-green bg-brand-green-light'
                    : 'text-brand-text-light hover:text-brand-green hover:bg-brand-green-light'
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
              href="/dafabet-registration"
              className="hidden sm:inline-flex btn-primary text-sm px-4 py-2"
            >
              {t('registration')}
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md text-brand-muted hover:text-brand-text hover:bg-brand-surface"
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
        <nav className="lg:hidden border-t border-brand-border bg-white" aria-label="Mobile navigation">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-brand-green-light text-brand-green'
                    : 'text-brand-text-light hover:text-brand-green hover:bg-brand-green-light'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}
            <Link
              href="/dafabet-registration"
              className="block btn-primary text-center mt-3"
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
