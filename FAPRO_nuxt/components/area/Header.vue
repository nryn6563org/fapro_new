<template>
  <header class="c-header">
    <div class="c-header__inner">
      <div class="c-header__left">
        <button class="c-header__toggle" @click="$emit('toggle')" aria-label="메뉴 토글">
          <Menu :size="24" />
        </button>
        <h1 class="c-header__logo">FA Pro</h1>
      </div>
      
      <div class="c-header__center">
        <!-- Search Area -->
        <div class="c-header__search">
          <div class="c-header__search-wrapper">
            <Search class="c-header__search-icon" :size="20" />
            <input 
              type="text" 
              placeholder="종목 검색..." 
              class="c-header__search-input"
            />
          </div>
        </div>
        
    <!-- AI Report Alert Banner Removed -->
      </div>

      <div class="c-header__right">
        <div class="c-header__profile">
          <nuxt-link to="/my/info" class="c-header__avatar-link">
            <div class="c-header__avatar">
              <span class="c-header__avatar-text">FA</span>
            </div>
          </nuxt-link>
          <button class="c-header__action-btn" @click="toggleTheme" aria-label="테마 변경">
            <Sun v-if="$colorMode.preference === 'light'" :size="20" />
            <Moon v-else :size="20" />
          </button>
          <nuxt-link to="/my/payment" class="c-header__action-btn" aria-label="설정">
            <Settings :size="20" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { Search, Sun, Moon, Settings, Menu } from 'lucide-vue'

export default {
  name: 'HeaderComponent',
  components: {
    Search,
    Menu,
    Sun,
    Moon,
    Settings
  },
  methods: {
    toggleTheme() {
      this.$colorMode.preference = this.$colorMode.preference === 'light' ? 'dark' : 'light'
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/area/header.css';
</style>
