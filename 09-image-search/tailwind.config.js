/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.{html,js,css}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-negro': '#1E201E',
        'custom-negro-medio': '#212321',
        'custom-white': '#ECDFCC',
        'custom-acento': '#859F3D',
      },
      fontFamily: {
        'bitter': ['Bitter', 'serif'],
      }
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--custom-negro': theme('colors.custom-negro'),
          '--custom-white': theme('colors.custom-white'),
          '--custom-acento': theme('colors.custom-acento'),
          'font-size': '62.5%',
        }
      });
    }
  ],
}
