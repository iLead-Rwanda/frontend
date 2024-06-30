/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B58A5F",
        secondary: "#363A3D",
        background: "#F7F7F7",
        text: "#475467",
        gray: "#B58A5F",
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
