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
        light: "#3498db",
        gray: "#797979",
        lightGray: "#F8F9FB",
        orange: "#3498db",
        iconGray: '#9E9B9B',
        bgGray: '#F5F6F7'
      },
    },
  },
  plugins: [],
}