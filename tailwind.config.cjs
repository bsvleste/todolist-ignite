/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    fontSize:{
      sm:12,
      md:14,
      lg:16
    },
    colors:{
      gray:{
        100:'#F2F2F2',
        200:'#d9d9d9',
        300:'#808080',
        400:'#333333',
        500:'#262626',
        600:'#1a1a1a',
        700:'#0d0d0d'
      },
      'transparent': "transparent",
      'danger':"#e25858",
      'blue-dark':"#1e6f9f",
      'blue':'#4EA8DE',
      'purple-dark':'#5E60CE',
      'purple':'##8284FA'
    },
    extend: {
      fontFamily:{
        sans: 'Inter, sans-serif',
      }
    },
  },
  plugins: [],
}
