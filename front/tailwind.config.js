/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],

  important: "#root",

  theme: {
    extend: {
      width: 
        {
          'nav': '6vw',
          'extended': '5vw'
        },
      spacing: {
        '1p': '1%',  
      },
      

      
    },
  },
  plugins: [],
}

