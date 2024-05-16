/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        base: "2000px",
      },
      backgroundColor: {
        base: "#ff385c",
      },
      textColor: {
        base: "#ff385c",
      },
    },
  },
  plugins: [],
};
