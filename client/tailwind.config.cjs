// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("daisyui")],
//   daisyui: {
//     themes: ["cupcake"],
//   },
// };

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"), // ← add this
  ],
  daisyui: {
    themes: ["all"],
  },
};
