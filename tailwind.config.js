/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-1': '#F9F7F7',
        'color-2': '#DBE2EF',
        'color-3': '#3F72AF',
        'color-4': '#112D4E',

        'color-a': '#B1B2FF',
        'color-b': '#AAC4FF',
        'color-c': '#D2DAFF',
        'color-d': '#EEF1FF',

        'color-a-1': '#3E54AC',
        'color-a-2': '#655DBB',
        'color-a-3': '#BFACE2',
        'color-a-4': '#ECF2FF',
      }
    },
    screens: {
      smc: '150px',
      sm: '380px',
      md: '768px',
      lg: '976px',
      xlc: '999px',
      xls: '1200px',
      xl: '1440px',
    },
  },
  plugins: [],
}