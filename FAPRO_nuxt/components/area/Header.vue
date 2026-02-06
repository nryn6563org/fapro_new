<template>
  <header class="c-header">
    <div class="c-header__inner">
      <!-- Search Area -->
      <div class="c-header__search">
        <label for="stock-search" class="c-header__sr-only">종목 검색</label>
        <div class="c-header__search-input-wrapper">
          <Search class="c-header__search-icon" :size="20" />
          <input 
            id="stock-search"
            type="text" 
            placeholder="종목 검색" 
            class="c-header__search-input"
          />
        </div>
      </div>

      <!-- Actions Area -->
      <div class="c-header__actions">
        <!-- Theme Toggle -->
        <button 
          class="c-header__action-btn" 
          @click="toggleTheme" 
          aria-label="테마 변경"
        >
          <Sun v-if="$colorMode.preference === 'light'" :size="20" />
          <Moon v-else-if="$colorMode.preference === 'dark'" :size="20" />
          <Monitor v-else :size="20" />
        </button>

        <!-- Profile -->
        <div class="c-header__profile">
          <div class="c-header__avatar">
            <span class="c-header__avatar-text">FA</span>
          </div>
          <button class="c-header__action-btn" aria-label="설정">
            <Settings :size="20" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  methods: {
    toggleTheme() {
      const modes = ['light', 'dark', 'system']
      const currentIndex = modes.indexOf(this.$colorMode.preference)
      const nextIndex = (currentIndex + 1) % modes.length
      this.$colorMode.preference = modes[nextIndex]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/area/header.css';
</style>
