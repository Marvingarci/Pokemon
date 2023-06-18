/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        yellow:     "#FFC600",
        blue:       "#175A7D",
        darkBlue:   "#01426A",
        blueStroke:   "#9BB8D3",
        blueGreen:  "#2C85BC",
        lightGray:  "#F2F2F2",
        borderGray: "#DFE2EB",
        green: "#7ED876",
        buttonGray: "#E6E6E6",
        darkGray:   "#919191",
        nightkGray:   "#4B4B4B",
        bgGray:   "#E7EFF5",
        white:      colors.white
  
      },
    },
  },
  plugins: [],
}

