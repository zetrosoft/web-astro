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
        paper: '#F5F4EF',
        'paper-alt': '#ECEAE3',
        'paper-line': '#D8D5C8',
        slate: {
          800: '#3A475D', // Border & surface hover di dark mode
          850: '#2F3B4F', // Elevated dark card
          900: '#273142', // Card surface dark mode (dibuat lebih cerah, tidak pitch black)
          950: '#1E2433', // Background dasar dark mode (lembut dan sejuk)
        },
      },
    },
  },
  plugins: [],
}
