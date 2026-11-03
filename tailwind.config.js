/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B58A5F",
        secondary: "#363A3D",
        background: "#F3F2F1",
        text: "#475467",
        white: "#FFFFFF",
        black: "#111111",
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      spaceGrotesk: ["Space Grotesk", "sans-serif"],
    },
  },
  plugins: [],
};
