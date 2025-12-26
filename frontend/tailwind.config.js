/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#4F46E5",
      },    
      screens: {
        '3xl': '1920px',
      },
  },
},
  plugins: [],
}
