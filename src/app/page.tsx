import { redirect } from 'next/navigation'

// The next-intl middleware handles locale routing for all real pages.
// This root page is a safety fallback — redirect to /en/ explicitly.
export default function RootPage() {
  redirect('/en')
}
