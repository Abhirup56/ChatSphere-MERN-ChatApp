/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        DarkGray: '#1E1E2C',
        LightGray: '#2C2C3E',
        White: '#FFFFFF',
        Blue: '#009de4'
      },
      fontFamily: {
        dance: 'Dancing Script',
        chewy: 'Chewy',
        Sansation : 'sansation'

      },
     
    },
  },
  plugins: [
    require('daisyui'),
  ],
}