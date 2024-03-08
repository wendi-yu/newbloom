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
        'background-primary': '#E5DDF2',
        'success': '#43AA8B',
        'danger': "#E83151",
        'document-background': "#F5F5F5",
        'highlight': "#FFEC40",
        'suggested-redaction': "rgba(92, 0, 184, 0.22)",
        'suggested-redaction-darker': "rgba(92, 0, 184, 0.3)",
        'accepted-redaction': "rgba(0, 0, 0, 0.22)",
        'accepted-redaction-darker': "rgba(0, 0, 0, 0.3)",
        'curr-redaction': "rgba(92,0,184,0.4)"
      }
    },
  },
  plugins: [],
}

