export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "FAPRO - Financial Advisor Pro",
    htmlAttrs: { lang: "ko" },
    meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { hid: "description", name: "description", content: "" }, { name: "format-detection", content: "telephone=no" }],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://gonuxtjs.dev/config-css
  css: ["@/assets/css/main.css", "@/assets/css/lib/animate.min.css"],

  // Plugins to run before rendering page: https://gonuxtjs.dev/config-plugins
  plugins: [{ src: "@/plugins/echarts.js", mode: "client" }, { src: "@/plugins/swiper.js", mode: "client" }, { src: "@/plugins/lucide.js" }, { src: "@/plugins/v-calendar.js", mode: "client" }],

  // Auto import components: https://gonuxtjs.dev/config-components
  components: [
    // Area: Layout regions (no prefix)
    { path: "~/components/area", prefix: "", pathPrefix: false },
    // Function: Reusable UI blocks (Function prefix)
    { path: "~/components/function", prefix: "Function", pathPrefix: false },
    // Page: Page-specific sub-blocks (Page prefix + directory logic)
    { path: "~/components/page", prefix: "Page", pathPrefix: true }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/composition-api/module", "@nuxtjs/color-mode", "@nuxtjs/tailwindcss"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],

  // Color mode configuration
  colorMode: {
    classSuffix: ""
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["lucide-vue"],
    babel: {
      plugins: ["@babel/plugin-proposal-optional-chaining", "@babel/plugin-proposal-nullish-coalescing-operator"]
    },
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    }
  }
};
