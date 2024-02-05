/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-bg": "#000000",
        "col-bg": "#030637",
        "second-color": "#720455",
        "tasks-bg": "#3C0753",
      },
    },
  },
  plugins: [],
};
