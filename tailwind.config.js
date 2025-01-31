module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: { primary: "#3b82f6" },
  plugins: [require("flowbite/plugin")],
  corePlugins: {
    preflight: false,
  },
};
