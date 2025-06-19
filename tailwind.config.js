/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <== Tailwind scans here
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
