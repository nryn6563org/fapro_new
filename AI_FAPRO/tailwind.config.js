/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,vue,ts}", "./layouts/**/*.vue", "./pages/**/*.vue", "./plugins/**/*.{js,ts}", "./nuxt.config.{js,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#447aec",
        "primary-hover": "#3563c7",
        "primary-light": "#ebf2fe",
        "primary-dark": "#294aa3",
        "primary-900": "#1e3a8a"
      },
      fontFamily: {
        sans: ['"Nanum Gothic"', "sans-serif"]
      },
      screens: {
        md: "768px" // responsive design (min-width 768px)
      }
    }
  },
  plugins: []
};
