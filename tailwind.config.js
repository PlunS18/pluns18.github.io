/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        hand: ['Pangolin', '"Be Vietnam Pro"', 'cursive'],
      },
      colors: {
        paper: '#f6f7f4',
        'paper-raised': '#fdfdfb',
        ink: '#1a2233',
        'ink-soft': '#4a5468',
        'ink-faint': '#8a92a3',
        pen: '#2c56d8',
        marker: '#f5d35a',
      },
    },
  },
  plugins: [],
};
