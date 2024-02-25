/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx}"],

  

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
      backgroundImage: {
        'green-banner': "url('/src/images/banner4.png')"
      }
      

      
    },
  },
  plugins: [],
}

