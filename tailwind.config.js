module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 9 column grid
        // 9: "repeat(16, minmax(0, 1fr))",
        9: "repeat(9, 44px)",
        // Simple 16 column grid
        // 16: "repeat(16, minmax(0, 1fr))",
        16: "repeat(16, 44px)",
        // Simple 32 column grid
        // 32: "repeat(32, minmax(0, 1fr))",
        32: "repeat(32, 44px)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
