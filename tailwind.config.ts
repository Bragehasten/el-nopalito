import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-red':          '#C0392B',
        'brand-red-light':    '#E74C3C',
        'brand-green':        '#27AE60',
        'brand-green-dark':   '#1E8449',
        'brand-yellow':       '#F39C12',
        'brand-cream':        '#FDF6E3',
        'brand-cream-dark':   '#F5ECD7',
        'brand-dark':         '#1A1A1A',
        'brand-gray':         '#6B7280',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
