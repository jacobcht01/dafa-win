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
          bg: '#111111',
          surface: '#1a1a1a',
          card: '#1e1e1e',
          border: '#2a2a2a',
          muted: '#888888',
          text: '#ffffff',
          'text-light': '#cccccc',
          dark: '#0a0a0a',
          gold: '#ffc107',
          'gold-light': '#ffd700',
          red: '#cc0000',
          'red-dark': '#a30000',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        telugu: ['var(--font-noto-telugu)', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #ffd700 0%, #ffc107 50%, #ff8f00 100%)',
        'red-gradient': 'linear-gradient(135deg, #cc0000 0%, #e53935 100%)',
        'dark-surface': 'linear-gradient(180deg, #1a1a1a 0%, #111111 100%)',
      },
      boxShadow: {
        card: '0 2px 8px 0 rgb(0 0 0 / 0.4)',
        'card-hover': '0 4px 16px 0 rgb(0 0 0 / 0.6)',
        gold: '0 0 20px rgb(255 193 7 / 0.3)',
      },
    },
  },
  plugins: [],
}
export default config
