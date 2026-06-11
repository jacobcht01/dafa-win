import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dafawin.in'

type Entry = {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}

const EN_ROUTES: Entry[] = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' },
  { path: '/dafabet-review/', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/cricket-betting/', priority: 0.9, changeFrequency: 'daily' },
  { path: '/ipl-betting/', priority: 0.9, changeFrequency: 'daily' },
  { path: '/sports-betting/', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/online-casino/', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/dafabet-app-download/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/dafabet-bonus/', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/dafabet-registration/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/dafabet-payment/', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/faq/', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/football-betting/', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/kabaddi-betting/', priority: 0.75, changeFrequency: 'weekly' },
  { path: '/responsible-gambling/', priority: 0.6, changeFrequency: 'monthly' },
]

const TE_ROUTES: Entry[] = EN_ROUTES.map((r) => ({
  ...r,
  path: r.path === '/' ? '/te/' : `/te${r.path}`,
}))

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const toEntry = (r: Entry): MetadataRoute.Sitemap[number] => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  })

  return [
    ...EN_ROUTES.map(toEntry),
    ...TE_ROUTES.map(toEntry),
  ]
}
