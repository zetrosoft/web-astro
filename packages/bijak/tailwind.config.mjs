/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'Merriweather', 'Georgia', 'serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: '#FAF9F5',
        'paper-alt': '#F3F1EC',
        'paper-line': '#E5E2D9',
        slate: { 850: '#252D3B', 900: '#1E2430' },
      },
    },
  },
  plugins: [],
}
