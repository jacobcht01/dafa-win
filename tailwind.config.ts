import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#1a8f3c',
          'green-dark': '#146b2d',
          'green-light': '#e8f5ed',
          gold: '#f59e0b',
          'gold-light': '#fef3c7',
          bg: '#ffffff',
          surface: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
          muted: '#64748b',
          text: '#0f172a',
          'text-light': '#475569',
          dark: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        telugu: ['var(--font-noto-telugu)', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
}
export default config
