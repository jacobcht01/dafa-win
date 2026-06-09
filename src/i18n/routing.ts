import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'te'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/cricket-betting': '/cricket-betting',
    '/football-betting': '/football-betting',
    '/kabaddi-betting': '/kabaddi-betting',
    '/casino': '/casino',
    '/bonuses': '/bonuses',
    '/app-download': '/app-download',
    '/registration': '/registration',
    '/deposit-withdrawal': '/deposit-withdrawal',
    '/review': '/review',
    '/faq': '/faq',
  },
})
