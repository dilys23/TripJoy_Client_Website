/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: "#3498db",
        light: "#747474",
        gray: "#E7E7E7",
        lightGray: "#F8F9FB",
        orange: "#3498db",

      }
    },
  },
  plugins: [],
}