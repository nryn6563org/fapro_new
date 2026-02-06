/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        'fapro-blue': '#3B82F6',
        'fapro-green': '#10B981',
        'fapro-orange': '#F59E0B',
        'fapro-purple': '#8B5CF6',
        'fapro-indigo': '#6366F1',
        'fapro-bg': '#F9FAFB'
      },
      boxShadow: {
        dashbox: '4px 4px 20px 0px rgba(20, 20, 20, 0.08)',
        'fapro-card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }
    }
  },
  plugins: []
}
