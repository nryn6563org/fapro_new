/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,vue,ts}", "./layouts/**/*.vue", "./pages/**/*.vue", "./plugins/**/*.{js,ts}", "./nuxt.config.{js,ts}"],
  darkMode: ["variant", ".dark &"],
  theme: {
    extend: {
      colors: {
        /* ── 퍼스널(브랜드) 컬러 ── */
        primary: "#5368ff",
        "primary-hover": "#4253cc",
        "primary-light": "#e1e4ff",
        "primary-dark": "#323e99",
        "primary-900": "#151c96",

        /* ── 뉴트럴(그레이) 팔레트 ── */
        surface: {
          light: "#F8F9FA",
          dark: "#020617" // slate-950
        },
        "base-border": {
          light: "#EAEAEA",
          dark: "#1e293b" // slate-800
        },
        "base-text": {
          light: "#2F343A",
          dark: "#F8F9FA",
          muted: {
            light: "#6F6F6F",
            dark: "#94a3b8" // slate-400
          }
        },

        /* ── 매수(상승) 시맨틱 컬러 ── */
        buy: "#FB2C36",
        "buy-hover": "#D91C25",
        "buy-light": "#FFEBEC",

        /* ── 매도(하락) 시맨틱 컬러 ── */
        sell: "#2B7FFF",
        "sell-hover": "#1A68E0",
        "sell-light": "#EAF2FF"
      },
      fontFamily: {
        sans: ["Pretendard", '"DM Sans"', "sans-serif"]
      },
      screens: {
        md: "768px" // 반응형 기준 (min-width 768px)
      },
      keyframes: {
        localFadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "local-fade-up": "localFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both"
      },
      opacity: {
        8: "0.08",
        15: "0.15"
      },
      fontSize: {
        sm: "14px"
      }
    }
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        /* ── 페이지 헤더 공통 레이아웃 ── */
        ".fapro-page-header": {
          "@apply flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-2": {}
        },
        ".fapro-page-header__title-box": {
          "@apply flex flex-col": {}
        },
        ".fapro-page-header__title": {
          "@apply text-[28px] font-bold text-slate-800 dark:text-white tracking-tight": {}
        },
        ".fapro-page-header__subtitle": {
          "@apply text-slate-500 dark:text-slate-400 mt-1 text-sm font-normal": {}
        },
        ".fapro-page-header__action-box": {
          "@apply flex items-center gap-4": {}
        },
        ".fapro-page-header__time-info": {
          "@apply text-right": {}
        },
        ".fapro-page-header__time-text": {
          "@apply text-[16px] font-bold text-slate-800 dark:text-white": {}
        },
        ".fapro-page-header__time-label": {
          "@apply text-xs text-slate-500 dark:text-slate-400": {}
        },

        /* ── 공통 버튼 시스템 ── */
        /* 새로고침 버튼: primary 브랜드 컬러 사용 */
        ".fapro-btn-refresh": {
          "@apply flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-all duration-300 shadow-sm shadow-primary/10 hover:shadow-md hover:shadow-primary/20 cursor-pointer active:scale-95 border-0": {}
        },
        /* 주요 액션 버튼 */
        ".fapro-btn-primary": {
          "@apply px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-all duration-300 shadow-sm shadow-primary/10 cursor-pointer border-0": {}
        },
        /* 보조 아웃라인 버튼 */
        ".fapro-btn-outline": {
          "@apply px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer": {}
        },

        /* ── 모달 공통 레이아웃 ── */
        ".fapro-modal-overlay": {
          "@apply fixed inset-0 z-[10020] flex items-center justify-center p-4 bg-[#2F343A]/60 backdrop-blur-sm dark:bg-black/70 !m-0": {}
        },
        ".fapro-modal-container": {
          "@apply relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-950 rounded-2xl shadow-xl flex flex-col overflow-hidden border border-[#EAEAEA] dark:border-slate-800": {}
        },
        ".fapro-modal-container--sm": {
          "@apply max-w-2xl": {}
        },
        ".fapro-modal-container--md": {
          "@apply max-w-3xl": {}
        },
        ".fapro-modal-container--lg": {
          "@apply max-w-4xl": {}
        },
        ".fapro-modal-header": {
          "@apply flex items-center justify-between p-6 md:px-8 border-b border-[#EAEAEA] dark:border-slate-800 bg-white dark:bg-slate-900/50 flex-shrink-0": {}
        },
        ".fapro-modal-header--sticky": {
          "@apply sticky top-0 backdrop-blur-md z-10": {}
        },
        ".fapro-modal-title": {
          "@apply text-2xl font-bold text-[#2F343A] dark:text-white m-0": {}
        },
        ".fapro-modal-subtitle": {
          "@apply text-sm text-slate-500 dark:text-slate-400 mt-1 m-0": {}
        },
        ".fapro-modal-close": {
          "@apply p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors border-0 bg-transparent cursor-pointer": {}
        },
        ".fapro-modal-body": {
          "@apply flex-1 overflow-y-auto p-6 md:p-8": {}
        },
        ".fapro-modal-footer": {
          "@apply p-6 md:px-8 border-t border-[#EAEAEA] dark:border-slate-800 bg-white dark:bg-slate-900/50 flex items-center gap-3 flex-shrink-0": {}
        },
        ".fapro-modal-footer--sticky": {
          "@apply sticky bottom-0 backdrop-blur-md": {}
        },

        /* ── 모달 아이콘 박스 ── */
        ".fapro-modal-icon": {
          "@apply w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg": {}
        },
        ".fapro-modal-icon--primary": {
          "@apply bg-gradient-to-br from-primary to-primary-hover shadow-primary/20": {}
        },
        ".fapro-modal-icon--amber": {
          "@apply bg-gradient-to-br from-amber-400 to-orange-600 shadow-orange-500/20": {}
        },
        ".fapro-modal-icon--slate": {
          "@apply bg-gradient-to-br from-slate-700 to-slate-900": {}
        },

        /* ── 폼 요소 공통 스타일 ── */
        ".fapro-form-label": {
          "@apply block text-sm font-bold text-slate-800 dark:text-slate-100 mb-2": {}
        },
        ".fapro-form-input": {
          "@apply w-full h-11 px-4 bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all dark:text-white": {}
        },
        ".fapro-form-textarea": {
          "@apply w-full p-4 bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-2xl text-sm font-bold focus:outline-none focus:border-primary transition-all dark:text-white resize-none": {}
        },
        ".fapro-form-select": {
          "@apply w-full h-11 px-4 bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all dark:text-white cursor-pointer": {}
        },

        /* ── 배지 스타일 ── */
        ".fapro-badge": {
          "@apply inline-block px-3 py-1 rounded-full text-xs font-black shadow-sm": {}
        },
        ".fapro-badge--aggressive": {
          "@apply bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400": {}
        },
        ".fapro-badge--stable": {
          "@apply bg-blue-100 text-primary dark:bg-blue-900/30 dark:text-primary-light": {}
        },
        ".fapro-badge--neutral": {
          "@apply bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400": {}
        },
        ".fapro-badge--success": {
          "@apply bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300": {}
        },

        /* ── 섹션/카드 공통 스타일 ── */
        ".fapro-section": {
          "@apply bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm": {}
        },
        ".fapro-section--transparent": {
          "@apply bg-transparent border-0 shadow-none p-0": {}
        },
        ".fapro-section-header": {
          "@apply flex items-center justify-between mb-4": {}
        },
        ".fapro-section-title": {
          "@apply text-base font-bold text-slate-900 dark:text-white flex items-center tracking-tight": {}
        },
        ".fapro-section-icon": {
          "@apply w-5 h-5 mr-2": {}
        },

        /* ── 대시보드/목록 카드 레이아웃 ── */
        ".fapro-card": {
          "@apply bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all duration-300 relative overflow-hidden": {}
        },
        ".fapro-card--hover": {
          "@apply hover:shadow-xl hover:-translate-y-1": {}
        },
        ".fapro-card-header": {
          "@apply p-5 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between": {}
        },
        ".fapro-card-title": {
          "@apply text-[18px] font-bold text-slate-800 dark:text-slate-100 tracking-tight": {}
        },
        ".fapro-card-desc": {
          "@apply text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-normal": {}
        },
        ".fapro-card-body": {
          "@apply p-5": {}
        },

        /* ── 내부 아이템 카드 (리스트 항목) ── */
        ".fapro-item-card": {
          "@apply p-4 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800/60 transition-all duration-200 cursor-pointer": {}
        },
        ".fapro-item-card--active": {
          "@apply bg-white dark:bg-slate-800 shadow-md border-primary/30": {}
        },

        /* ── 데이터 테이블 공통 스타일 ── */
        ".fapro-table": {
          "@apply w-full border-collapse bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800": {}
        },
        ".fapro-table-head": {
          "@apply bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800": {}
        },
        ".fapro-table-row": {
          "@apply transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 last:border-0": {}
        },
        ".fapro-th": {
          "@apply px-3 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap": {}
        },
        ".fapro-td": {
          "@apply px-3 py-3 whitespace-nowrap text-[13px] text-slate-800 dark:text-slate-200 font-medium border-b border-gray-200 dark:border-gray-700 transition-colors": {}
        }
      });
    }
  ]
};
