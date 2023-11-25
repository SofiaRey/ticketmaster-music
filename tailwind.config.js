const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      'tmBlue': '#006EEB',
      'white': '#FFFFFF',
      'stone': colors.stone
    }
  },
  plugins: [],
};
