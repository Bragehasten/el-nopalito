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
        // Warm minimalist palette — terracotta (clay/marinade), agave
        // (nopalito green), maize (corn), charcoal, and off-white.
        'brand-red':          '#C1502D',
        'brand-red-light':    '#D97748',
        'brand-green':        '#6E8B5C',
        'brand-green-dark':   '#54704A',
        'brand-yellow':       '#E0A73E',
        'brand-cream':        '#F6F0E4',
        'brand-cream-dark':   '#EBE1CC',
        'brand-dark':         '#26211D',
        'brand-gray':         '#7C7267',
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
