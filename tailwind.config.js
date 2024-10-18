/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#5f6FFF'
      },
      gridTemplateColumns:{
        'auto':'repect(auto-fill, mixmax(200px, 1fr))'
      }

    },
  },
  plugins: [],
}