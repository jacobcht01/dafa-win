import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        dark: {
          50:  '#f8f8f8',
          100: '#e8e8e8',
          200: '#c8c8c8',
          700: '#2a2a2a',
          800: '#1a1a1a',
          900: '#0f0f0f',
          950: '#080808',
        },
        sport: {
          red: {
            DEFAULT: '#e02020',
            50:  '#fff0f0',
            100: '#ffd9d9',
            200: '#ffb3b3',
            300: '#ff7a7a',
            400: '#f54040',
            500: '#e02020',
            600: '#c01010',
            700: '#a00000',
            800: '#7a0000',
            900: '#5a0000',
          },
        },
        navy: {
          DEFAULT: '#0d1b3e',
          50:  '#e8edf5',
          100: '#c8d4ea',
          200: '#9db2d8',
          300: '#6a8dc4',
          400: '#3a6ab0',
          500: '#1a4a96',
          600: '#0f3276',
          700: '#0a2258',
          800: '#061640',
          900: '#040e2a',
          950: '#020818',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        telugu: ['"Noto Sans Telugu"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
