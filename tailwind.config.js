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
        gray: "#e4e4e4",
        lightGray: "#3498db",
        orange: "#3498db",

      }
    },
  },
  plugins: [],
}