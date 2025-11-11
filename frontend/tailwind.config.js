/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ enable manual dark mode
  content: [
    "./index.html",            // 👈 add this line
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
