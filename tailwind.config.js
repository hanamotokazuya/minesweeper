module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        16: "repeat(16, minmax(0, 1fr))",
        // Simple 32 column grid
        32: "repeat(32, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
