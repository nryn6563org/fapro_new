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
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.fapro-page-header': {
          '@apply flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-2': {}
        },
        '.fapro-page-header__title-box': {
          '@apply flex flex-col': {}
        },
        '.fapro-page-header__title': {
          '@apply text-3xl font-black text-slate-900 dark:text-white tracking-tight': {}
        },
        '.fapro-page-header__subtitle': {
          '@apply text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium': {}
        },
        '.fapro-page-header__action-box': {
          '@apply flex items-center gap-4': {}
        },
        '.fapro-page-header__time-info': {
          '@apply text-right': {}
        },
        '.fapro-page-header__time-text': {
          '@apply text-sm font-bold text-slate-900 dark:text-white': {}
        },
        '.fapro-page-header__time-label': {
          '@apply text-xs text-slate-500 dark:text-slate-400': {}
        },
        '.fapro-btn-refresh': {
          '@apply flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-all duration-300 shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 cursor-pointer active:scale-95 border-0': {}
        },
        '.fapro-btn-primary': {
          '@apply px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-bold rounded-xl transition-all duration-300 shadow-md cursor-pointer border-0': {}
        },
        '.fapro-btn-outline': {
          '@apply px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer': {}
        },
        '.fapro-modal-overlay': {
          '@apply fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm dark:bg-black/70 !m-0': {}
        },
        '.fapro-modal-container': {
          '@apply relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-950 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800': {}
        },
        '.fapro-modal-header': {
          '@apply flex items-center justify-between p-6 md:px-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex-shrink-0': {}
        },
        '.fapro-modal-title': {
          '@apply text-2xl font-black text-slate-900 dark:text-white m-0': {}
        },
        '.fapro-modal-close': {
          '@apply p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors border-0 bg-transparent cursor-pointer': {}
        },
        '.fapro-modal-body': {
          '@apply flex-1 overflow-y-auto p-6 md:p-8': {}
        },
        '.fapro-modal-footer': {
          '@apply p-6 md:px-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center gap-3 flex-shrink-0': {}
        }
      });
    }
  ]
};
