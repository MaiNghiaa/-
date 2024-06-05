/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  // These paths are just examples, customize them to match your project structure
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {},
    screens: {
      minmd: { min: "769px" },
      minssm: { min: "800px" },
      minhsm: { min: "821px" },
      minsm: { min: "375px" },
      big: "1025px",
      small: { max: "1024px" },
      sm: { max: "768px" },
      md: { max: "992px" },
      halfsm: { max: "600px" },
      xs: { max: "576px" },
    },
  },
  plugins: [],
};
