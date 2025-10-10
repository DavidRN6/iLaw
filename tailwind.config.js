/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#101b40",
        secondary: "#dce2eb",
        third: "#F1F1F1",

        darkPrimary: "#121214",
        darkSecondary: "#1a1a1e",
        darkThird: "#2c2c31",
        darkBtn: "#4d6bfe",
      },
    },
  },
  plugins: [],
};
