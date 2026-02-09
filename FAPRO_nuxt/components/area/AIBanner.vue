<template>
  <div class="c-ai-banner-pos">
    <transition
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <div v-if="isVisible && currentReport" class="c-ai-banner">
        <nuxt-link to="/stock/reports" class="c-ai-banner__link">
          <div class="c-ai-banner__content">
            <div class="c-ai-banner__main">
              <Sparkles class="c-ai-banner__sparkle" :size="18" />
              <div class="c-ai-banner__text-group">
                <FileText class="c-ai-banner__doc-icon" :size="16" />
                <span class="c-ai-banner__stock">{{ currentReport.stock }}</span>
                <span class="c-ai-banner__type">{{ currentReport.type }} 생성</span>
              </div>
            </div>
            
            <div class="c-ai-banner__meta">
              <span class="c-ai-banner__time">{{ currentReport.time }}</span>
              <TrendingUp class="c-ai-banner__trend" :size="16" />
            </div>
          </div>
          <!-- Shimmer effect overlay -->
          <div class="c-ai-banner__shimmer"></div>
        </nuxt-link>
        <button class="c-ai-banner__close" @click="closeBanner">
          <X :size="16" />
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { Sparkles, FileText, TrendingUp, X } from 'lucide-vue'

export default {
  name: 'AIBanner',
  components: {
    Sparkles,
    FileText,
    TrendingUp,
    X
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
  mounted() {
    this.startBannerCycle()
  },
  beforeDestroy() {
    if (this.interval) clearTimeout(this.interval)
  },
  methods: {
    startBannerCycle() {
      // Show immediately
      this.isVisible = true
      
      this.interval = setTimeout(() => {
        // Hide after 8 seconds
        this.isVisible = false
        
        // Wait for slide down animation (1000ms) then change data
        this.interval = setTimeout(() => {
          this.currentReportIndex = (this.currentReportIndex + 1) % this.mockReports.length
          // Recursively call to show again
          this.startBannerCycle()
        }, 1000) 
      }, 8000)
    },
    closeBanner() {
      this.isVisible = false
      if (this.interval) clearTimeout(this.interval)
    }
  },
  computed: {
    currentReport() {
      return this.mockReports[this.currentReportIndex]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/area/ai-banner.css';
</style>
