/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-bg": "#FDF5DF",
        "col-bg": "#5EBEC4",
        "second-color": "#F92C85",
      },
    },
  },
  plugins: [],
};
