/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#340068',
        'primary-light': '#5C00B8',
        'emphasis-primary': '#5C00B8',
        'emphasis-secondary': '#B1EDE8',
        'background-primary': '#DDD6E8',
        'success': '#43AA8B',
      }
    },
  },
  plugins: [],
}

