const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      fontSize: {
        custom: "15px",
      },
      colors: {
        primary: "#00060d",
        secondary: "#040f1d",
        light: "#11253e",
        icon: "#fff",
      },
    },
  },
  plugins: [],
};
