<template>
  <div class="main-layout">
    <app-sidebar />
    <div class="main-layout__content-wrapper">
      <main class="main-layout__main">
        <nuxt />
      </main>
    </div>
    <global-modal-manager />
  </div>
</template>

<script>
import AppSidebar from '~/components/layout/AppSidebar.vue'
import GlobalModalManager from '~/components/modal/GlobalModalManager.vue'

export default {
  name: 'DefaultLayout',
  components: {
    AppSidebar,
    GlobalModalManager
  },
  data() {
    return {
      isDarkMode: false
    }
  },
  head() {
    return {
      htmlAttrs: {
        class: this.isDarkMode ? 'dark' : ''
      }
    }
  },
  mounted() {
    // Check localStorage or system preference
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      this.isDarkMode = true
    }
    this.$bus.$on('toggle-theme', this.toggleTheme)
  },
  beforeDestroy() {
    this.$bus.$off('toggle-theme', this.toggleTheme)
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light')
    }
  }
}
</script>

<style src="~/assets/css/layout/default/default.css" />
