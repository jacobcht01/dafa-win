import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'DafaWin — DafaBet India Guide 2025',
    template: '%s | DafaWin',
  },
  description: 'DafaWin is India\'s trusted independent guide to DafaBet. Expert reviews, betting tips, bonus codes, and payment guides.',
  metadataBase: new URL('https://dafawin.in'),
  openGraph: {
    siteName: 'DafaWin',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DafaWin — DafaBet India Betting Guide 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@DafaWin',
    creator: '@DafaWin',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://dafawin.in/',
    languages: {
      'x-default': 'https://dafawin.in',
      'en-IN': 'https://dafawin.in',
      'te-IN': 'https://dafawin.in/te/',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-dark-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
