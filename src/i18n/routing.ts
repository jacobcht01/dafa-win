import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'te'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/dafabet-review': '/dafabet-review',
    '/cricket-betting': '/cricket-betting',
    '/ipl-betting': '/ipl-betting',
    '/sports-betting': '/sports-betting',
    '/online-casino': '/online-casino',
    '/dafabet-app-download': '/dafabet-app-download',
    '/dafabet-bonus': '/dafabet-bonus',
    '/dafabet-registration': '/dafabet-registration',
    '/dafabet-payment': '/dafabet-payment',
    '/responsible-gambling': '/responsible-gambling',
    '/football-betting': '/football-betting',
    '/kabaddi-betting': '/kabaddi-betting',
    '/faq': '/faq',
    '/ipl-betting': '/ipl-betting',
    '/responsible-gambling': '/responsible-gambling',
  },
})
