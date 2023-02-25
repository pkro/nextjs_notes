const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "40rem": '40rem'
      },
      gridTemplateColumns: {
        // this style is available now as "grid-cols-auto-fill"
        'auto-fill': 'repeat(auto-fill, minmax(200px, 1fr))' // never less than 200px, fill 1fr if larger
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        raleway: ['Raleway', 'sans-serif'],
      },
      minHeight: {
        128: '40rem',

      }
    },
  },
  plugins: [],
}
