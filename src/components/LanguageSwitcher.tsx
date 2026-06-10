'use client'

import { useEffect, useState } from 'react'

type Props = {
  locale: string
}

export default function LanguageSwitcher({ locale }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const switchTo = (nextLocale: string) => {
    if (typeof window === 'undefined') return
    const path = window.location.pathname
    let newPath: string
    if (nextLocale === 'en') {
      newPath = path.startsWith('/te') ? path.slice(3) || '/' : path
    } else {
      newPath = path.startsWith('/te') ? path : `/${nextLocale}${path === '/' ? '' : path}`
    }
    window.location.href = newPath || '/'
  }

  return (
    <div className="flex items-center gap-1 bg-brand-surface border border-brand-border rounded-lg p-1">
      <button
        onClick={() => switchTo('en')}
        disabled={!mounted}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 ${
          locale === 'en'
            ? 'bg-gold-gradient text-black'
            : 'text-gray-400 hover:text-white'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => switchTo('te')}
        disabled={!mounted}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 ${
          locale === 'te'
            ? 'bg-gold-gradient text-black'
            : 'text-gray-400 hover:text-white'
        }`}
        aria-label="తెలుగుకు మారండి"
      >
        తె
      </button>
    </div>
  )
}
