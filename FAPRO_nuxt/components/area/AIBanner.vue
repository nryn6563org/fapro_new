<template>
  <div class="c-ai-banner-pos">
    <transition
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
      mode="out-in"
    >
      <div 
        v-if="isVisible" 
        class="c-ai-banner"
        @mouseenter="pauseCycle"
        @mouseleave="resumeCycle"
      >
        <div class="c-ai-banner__content">
          <Sparkles class="c-ai-banner__icon-sparkle" :size="16" />
          <div class="c-ai-banner__text">
            <span class="c-ai-banner__stock">{{ currentItem.stock }}</span>
            <span class="c-ai-banner__type">{{ currentItem.type }}</span>
            <span class="c-ai-banner__time">{{ currentItem.time }}</span>
          </div>
          <TrendingUp class="c-ai-banner__icon-trend" :size="16" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Sparkles, TrendingUp } from 'lucide-vue'

export default {
  name: 'AIBanner',
  components: {
    Sparkles,
    TrendingUp
  },
  data() {
    return {
      bannerItems: [
        { stock: "삼성전자", type: "AI 리포트", time: "1분 전" },
        { stock: "SK하이닉스", type: "AI 분석", time: "3분 전" },
        { stock: "NAVER", type: "AI 리포트", time: "5분 전" },
        { stock: "카카오", type: "AI 시그널", time: "7분 전" },
        { stock: "LG에너지솔루션", type: "AI 리포트", time: "10분 전" },
        { stock: "한미반도체", type: "AI 포착", time: "12분 전" },
        { stock: "현대차", type: "AI 리포트", time: "15분 전" },
        { stock: "POSCO홀딩스", type: "AI 분석", time: "18분 전" },
        { stock: "에코프로", type: "AI 시그널", time: "20분 전" },
        { stock: "삼성바이오로직스", type: "AI 리포트", time: "25분 전" },
      ],
      currentIndex: 0,
      isVisible: false,
      cycleTimeout: null,
      isPaused: false
    }
  },
  computed: {
    currentItem() {
      return this.bannerItems[this.currentIndex]
    }
  },
  mounted() {
    // Initial delay before showing first item
    this.startCycle()
  },
  beforeDestroy() {
    this.clearCycle()
  },
  methods: {
    startCycle() {
      // Show Item
      this.isVisible = true

      // Stay for 8 seconds, then hide
      this.cycleTimeout = setTimeout(() => {
        if (!this.isPaused) {
          this.hideAndNext()
        }
      }, 8000)
    },
    hideAndNext() {
      this.isVisible = false
      
      // Wait 3 seconds (transition time + gap), then show next
      // Assuming transition takes ~1s, we wait 3s total gap
      // Actually animate.css default is 1s. User asked "3초뒤 다른 내용". It implies 3s gap.
      this.cycleTimeout = setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.bannerItems.length
        this.startCycle()
      }, 3000)
    },
    clearCycle() {
      if (this.cycleTimeout) {
        clearTimeout(this.cycleTimeout)
        this.cycleTimeout = null
      }
    },
    pauseCycle() {
      this.isPaused = true
      this.clearCycle() 
      // Keep visible
    },
    resumeCycle() {
      if (this.isPaused) {
        this.isPaused = false
        // Resume hiding after short delay or full delay? 
        // Let's just restart the hide timer for full 8s to be safe/simple
        this.cycleTimeout = setTimeout(() => {
          this.hideAndNext()
        }, 8000)
      }
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/area/ai-banner.css';
</style>
