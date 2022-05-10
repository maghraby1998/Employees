module.exports = {
  content: ["./src/**/*.{html,js, jsx}"],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1077px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1370px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        'main-font': ['Roboto', 'sans-serif']
      },
      colors: {
        'card-h4': '#313030'
      }
    },
  },
  plugins: [],
}
