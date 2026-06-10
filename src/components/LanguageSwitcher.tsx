'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useTransition } from 'react'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const switchLocale = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <div className="flex items-center gap-1 bg-brand-surface border border-brand-border rounded-lg p-1">
      <button
        onClick={() => switchLocale('en')}
        disabled={isPending}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 ${
          locale === 'en'
            ? 'bg-brand-green text-white'
            : 'text-brand-muted hover:text-brand-text'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('te')}
        disabled={isPending}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 ${
          locale === 'te'
            ? 'bg-brand-green text-white'
            : 'text-brand-muted hover:text-brand-text'
        }`}
        aria-label="తెలుగుకు మారండి"
      >
        తె
      </button>
    </div>
  )
}
