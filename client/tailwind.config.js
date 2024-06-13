/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        base: "2000px",
        booking: "1100px",
        normal: "800px",
        hight: "500px",
        smally: "400px",
      },
      backgroundColor: {
        base: "#ff385c",
        basedark: "#282424",
        fun: "#f2f4f5",
      },
      borderColor: {
        base: "#ff385c",
      },
      textColor: {
        baseRed: "#ff385c",
      },
      outlineColor: {
        base: "#ff385c",
      },
      padding: {
        basic: "100px",
      },
    },
  },
  plugins: [],
};
