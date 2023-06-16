/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      yellow:     "#FFC600",
      blue:       "#175A7D",
      darkBlue:   "#01426A",
      blueStroke:   "#9BB8D3",
      blueGreen:  "#2C85BC",
      lightGray:  "#F2F2F2",
      darkGray:   "#919191",
      bgGray:   "#E7EFF5",
      white:      colors.white

    },
    extend: {},
  },
  plugins: [],
}

