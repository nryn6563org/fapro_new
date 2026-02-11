export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  router: {
    // [GitHub Pages Deployment]
    // Your site is at https://nryn6563org.github.io/fapro_new/
    // So the base MUST be "/fapro_new/" (with slashes).
    // Using "/" will cause 404 errors because it looks at the root domain.
    base: "/fapro_new/"
  },

  // Global page headers: https://go.nuxtjs.dev/config-headyarn
  head: {
    title: "FAPRO - Financial Advisor Pro",
    htmlAttrs: { lang: "ko" },
    meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=1440" }, { hid: "description", name: "description", content: "" }, { name: "format-detection", content: "telephone=no" }],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ src: "https://cdn.jsdelivr.net/npm/d3@7" }, { src: "https://cdn.jsdelivr.net/npm/apexcharts" }, { src: "https://cdn.jsdelivr.net/npm/vue-apexcharts" }]
  },

  // Global CSS: https://gonuxtjs.dev/config-css
  css: ["@/assets/css/main.css", "@/assets/css/common/modal-animation.css", "@/assets/css/lib/animate.min.css"],

  // Plugins to run before rendering page: https://gonuxtjs.dev/config-plugins
  plugins: [{ src: "@/plugins/echarts.js", mode: "client" }, { src: "@/plugins/swiper.js", mode: "client" }, { src: "@/plugins/lucide.js" }, { src: "@/plugins/v-calendar.js", mode: "client" }, { src: "@/plugins/apexcharts.js", mode: "client" }],

  // Auto import components: https://gonuxtjs.dev/config-components
  components: [
    // Area: Layout regions (no prefix)
    { path: "~/components/area", prefix: "", pathPrefix: false },
    // Function: Reusable UI blocks (Function prefix)
    { path: "~/components/function", prefix: "Function", pathPrefix: false },
    // Page: Page-specific sub-blocks (Page prefix + directory logic)
    { path: "~/components/page", prefix: "Page", pathPrefix: true },
    // Modal: Shared modal components
    { path: "~/components/modal", prefix: "", pathPrefix: false }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/composition-api/module", "@nuxtjs/color-mode", "@nuxtjs/tailwindcss"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],

  // Color mode configuration
  colorMode: {
    classSuffix: ""
  },

  // Static Generation Configuration
  generate: {
    nojekyll: true,
    fallback: "404.html"
  },

  // Build Configuration: https://gonuxtjs.dev/config-build
  build: {
    publicPath: "/fapro_new/assets/",
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
