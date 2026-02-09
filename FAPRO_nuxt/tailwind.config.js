/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,vue,ts}", "./layouts/**/*.vue", "./pages/**/*.vue", "./plugins/**/*.{js,ts}", "./nuxt.config.{js,ts}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#3B82F6",
          DEFAULT: "#3B82F6",
          dark: "#2563EB"
        },
        background: {
          light: "#F9FAFB",
          dark: "#111827"
        },
        surface: {
          light: "#FFFFFF",
          dark: "#1F2937"
        }
      }
    }
  },
  plugins: [require("@tailwindcss/line-clamp")]
};
