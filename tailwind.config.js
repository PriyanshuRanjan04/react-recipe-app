/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(255, 0, 86)',
        'text-color': '#0A0A0A',
        'text-light': '#575757',
        'background-color': '#fff',
        'background-light': '#fff',
        'shadow-color': 'rgba(0,0,0,0.2)',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'base': '16px',
      },
      animation: {
        'speed': 'var(--animation-speed)',
      }
    },
  },
  plugins: [],
}
