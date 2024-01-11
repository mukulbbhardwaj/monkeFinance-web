/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-bg":"#1B1B1F",
        "secondary-bg": "#202126",
        "sub-heading": "#9A9A9A",
        "heading": "#D9D9D9",
        "green": "#00E376",
        "red": "#EE0C0C",
        "text":"#DFDFD6",
      },
    },
  },
  plugins: [],
};
