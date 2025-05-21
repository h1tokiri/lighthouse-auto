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
    themes: ["nord"],
  },
};

// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
//   theme: { extend: {} },
//   plugins: [require("daisyui")],
//   daisyui: {
//     themes: [
//       {
//         nord: {
//           primary: "#5E81AC",
//           secondary: "#81A1C1",
//           accent: "#88C0D0",
//           neutral: "#4C566A",
//           "base-100": "#ECEFF4",
//           info: "#B48EAD",
//           success: "#A3BE8C",
//           warning: "#EBCB8B",
//           error: "#BF616A",
//         },
//       },
//     ],
//   },
// };
