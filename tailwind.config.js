/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4471D4 ",
        secondary: "#FE5B00 ",
        black: {
          DEFAULT: "#000",
          100: "#555555 ",
          200: "#171717",
        },
      },
    },
  },
  plugins: [],
};
