/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        cyber: {
          blue: '#2563eb',
          cyan: '#38bdf8',
          indigo: '#6366f1',
          purple: '#8b5cf6',
          dark: '#070a12',
          surface: '#0e1424'
        }
      }
    },
  },
  plugins: [],
}
