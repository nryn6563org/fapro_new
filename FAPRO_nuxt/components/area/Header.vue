<template>
  <header class="c-header">
    <div class="c-header__inner">
      <div class="c-header__left">
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
        
        <!-- AI Report Alert Banner -->
        <transition name="t-fade-up" mode="out-in">
          <div v-if="isVisible && currentReport" :key="currentReport.id" class="c-header__ai-banner">
            <nuxt-link to="/stock/reports" class="c-header__ai-link">
              <div class="c-header__ai-content">
                <div class="c-header__ai-main">
                  <Sparkles class="c-header__ai-sparkle" :size="18" />
                  <div class="c-header__ai-text-group">
                    <FileText class="c-header__ai-doc-icon" :size="16" />
                    <span class="c-header__ai-stock">{{ currentReport.stock }}</span>
                    <span class="c-header__ai-type">{{ currentReport.type }} 생성</span>
                  </div>
                </div>
                
                <div class="c-header__ai-meta">
                  <span class="c-header__ai-time">{{ currentReport.time }}</span>
                  <TrendingUp class="c-header__ai-trend" :size="16" />
                </div>
              </div>
              <!-- Shimmer effect overlay in CSS -->
              <div class="c-header__ai-shimmer"></div>
            </nuxt-link>
          </div>
        </transition>
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
import { Search, Sparkles, FileText, TrendingUp, Sun, Moon, Settings } from 'lucide-vue'

export default {
  name: 'HeaderComponent',
  components: {
    Search,
    Sparkles,
    FileText,
    TrendingUp,
    Sun,
    Moon,
    Settings
  },
  data() {
    return {
      currentReportIndex: 0,
      isVisible: true,
      mockReports: [
        { id: 1, stock: "삼성전자", type: "AI 리포트", time: "1분 전" },
        { id: 2, stock: "SK하이닉스", type: "AI 분석", time: "3분 전" },
        { id: 3, stock: "NAVER", type: "AI 리포트", time: "5분 전" },
        { id: 4, stock: "카카오", type: "AI 시그널", time: "7분 전" },
        { id: 5, stock: "LG에너지솔루션", type: "AI 리포트", time: "10분 전" },
      ],
      interval: null
    }
  },
  computed: {
    currentReport() {
      return this.mockReports[this.currentReportIndex]
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.isVisible = false
      setTimeout(() => {
        this.currentReportIndex = (this.currentReportIndex + 1) % this.mockReports.length
        this.isVisible = true
      }, 300)
    }, 4000)
  },
  beforeDestroy() {
    if (this.interval) clearInterval(this.interval)
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
