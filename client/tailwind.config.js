/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["inter", "sans-serif"],
        roboto: ["roboto", "sans-serif"],
      },
      colors: {
        'theme': '#0756da',
      },
    },
  },
  plugins: [],
}