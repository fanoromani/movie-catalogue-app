/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        purple: {
          400: "#5C16C5",
          900: "#2D0C5E",
        },

        gray: {
          100: "#E5E5E5",
          200: "#646464",
          400: "#323232",
        },

        highlight: {
          500: "#D18000",
          700: "#b47119",
        },
      },
    },
  },
  plugins: [],
};
