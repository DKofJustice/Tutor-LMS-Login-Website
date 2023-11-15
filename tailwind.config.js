/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#0F1931",
        "secondary-blue": "#384D7D",
        "blue-300": "#182648",
        "primary-red": "#DF4469",
      },
      fontFamily: {
        "roboto": ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

