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
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: { extend: {} },
  plugins: [require("daisyui")], // Remove the typography plugin
  daisyui: {
    themes: ["all"],
  },
};
