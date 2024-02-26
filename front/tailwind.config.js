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
        'green-banner': "url('/src/images/banner4.png')",
        'card1': "url('/src/images/card/card1.jpg')",
        'card2': "url('/src/images/card/card2.jpg')",
        'card3': "url('/src/images/card/card3.jpg')",
        'card4': "url('/src/images/card/card4.jpg')",
        'card5': "url('/src/images/card/card5.PNG')",
      }
      

      
    },
  },
  plugins: [],
}

