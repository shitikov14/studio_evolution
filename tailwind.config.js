/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: "#FFCE00",
        white: "#FFFFFF",
        brandDark: "#f2994a",
        bgMain: "#F5F5F5",
        textMain: "#222222",
        textMuted: "#828282",
        error: "#EB5757",
        borderInput: "#212121",
      },
      borderRadius: {
        xl2: "20px",
        '10': '10px',
      },
      lineHeight: {
        '18': '18px',
      },
      fontSize: {
        '14': '14px',
        '16': '16px',
        '18': '18px',
        '22': '22px',
        '30': '30px',
      }, 
      margin: {
        '10': '10px',
      },
      spacing: {
        '10': '10px',
        '17': '17px',
        '20': '20px',
        '30': '30px',
      },
    }
  },
  plugins: []
};
