/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#135BEC",
        background: "#F6F6F8",
        textPrimary: "#0D121B",
        textSecondary: "#6B7280",
        border: "#CFD7E7",
      },
    },
  },
  plugins: [],
};

