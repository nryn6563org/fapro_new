export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'FaPRO',
    htmlAttrs: {
      lang: 'ko'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'stylesheet', url: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-std.min.css', crossorigin: 'anonymous' }],
    script: [{ src: 'https://cdn.jsdelivr.net/gh/KaneCohen/modal-vanilla@master/dist/index.js', defer: true }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/common/common.css', 'animate.css/animate.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/echarts.js', ssr: false },
    { src: '~/plugins/swiper.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: '/_nuxt/',
    postcss: {
      postcssOptions: {
        plugins: {
          autoprefixer: {} // 기본 설정 사용
        }
      }
    }
  },
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    // Vue transition 속성에 animate.css 클래스 매핑
    enterActiveClass: 'animate__animated animate__fadeIn animate__faster',
    leaveActiveClass: 'animate__animated animate__fadeOut animate__faster'
  },
  router: {
    // 환경에 따라 베이스 경로 설정: 개발 환경은 루트, 프로덕션은 /RassiAdmin/
    base: '/FaPRO/'
  },
  target: 'static',
  server: {
    port: 8000,
    host: '0.0.0.0'
  }
}
