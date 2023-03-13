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
        'color-4': '#112D4E'
      }
    },
    screens: {
      smc: '150px',
      sm: '380px',
      md: '768px',
      lg: '976px',
      xlc: '999px',
      xl: '1440px',
    },
  },
  plugins: [],
}