/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        base: "2000px",
        normal: "800px",
        hight: "500px",
        smally: "400px"
      },
      backgroundColor: {
        base: "#ff385c",
        fun: "#f2f4f5",
      },
      textColor: {
        base: "#ff385c",
      },
      outlineColor: {
        base: "#ff385c",
      },
    },
  },
  plugins: [],
};
