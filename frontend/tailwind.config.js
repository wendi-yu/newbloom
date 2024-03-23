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
        'light-gray-background': "#EFEFEF",
        'suggested-redaction': "rgba(92, 0, 184, 0.22)",
        'suggested-redaction-darker': "rgba(92, 0, 184, 0.3)",
        'accepted-redaction': "rgba(0, 0, 0, 0.22)",
        'accepted-redaction-darker': "rgba(0, 0, 0, 0.3)",
        'curr-redaction': "rgba(92,0,184,0.4)",
        'dark-grey': '#494949',
        'comment': 'rgba(255, 236, 64, 0.4)',
        'comment-darker': 'rgba(245, 195, 15, 0.4)',
        'suggestion-and-comment': '#DAB7B5',
        'suggestion-and-comment-darker': '#DAB7B5',
        'transparent': 'rgba(255, 255, 255, 0.5)'
      },
      fontSize: {
        'description':'1em',
        'title':'1.75em',

      },
      fontWeight: {
        'light':300,
        'regular': 400,
        'semibold': 500,
        'bold': 700
      }
    },
  },
  plugins: [],
}

