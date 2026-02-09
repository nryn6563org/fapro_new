<template>
  <div class="c-ai-discovery">
    <div class="c-ai-discovery__header">
      <div class="c-ai-discovery__title-group">
        <Sparkles class="c-ai-discovery__icon" :size="18" />
        <h3 class="c-ai-discovery__title">AI종목 발굴</h3>
      </div>
      <div class="c-ai-discovery__info">
        <span class="c-ai-discovery__time">08:45</span>
        <button class="c-ai-discovery__refresh">
          <RefreshCw :size="14" />
        </button>
      </div>
    </div>

    <div class="c-ai-discovery__body">
      <div class="c-discovery-summary">
        <p class="c-discovery-summary__label">오늘의 AI Pick 종목</p>
        <div class="c-discovery-summary__stats">
          <Sparkles class="c-discovery-summary__sparkle" :size="14" />
          <span class="c-discovery-summary__count">10</span>
          <span class="c-discovery-summary__unit">종목</span>
          <span class="c-discovery-summary__divider">|</span>
          <span class="c-discovery-summary__score-label">평균 AI점수</span>
          <span class="c-discovery-summary__score-value">89.5점</span>
        </div>
      </div>

      <div class="c-discovery-list no-scrollbar">
        <div v-for="stock in stocks" :key="stock.id" class="c-discovery-item">
          <div class="c-discovery-item__main">
            <div class="c-discovery-item__score-badge">
              {{ stock.score }}
            </div>
            <div class="c-discovery-item__info">
              <div class="c-discovery-item__stock-group">
                <span class="c-discovery-item__name">{{ stock.name }}</span>
                <span class="c-discovery-item__change">+{{ stock.change }}%</span>
              </div>
              <div class="c-discovery-item__tags">
                <span v-for="tag in stock.tags" :key="tag" class="c-discovery-item__tag">{{ tag }}</span>
              </div>
            </div>
          </div>
          <button class="c-discovery-item__action">
            <ChevronRight :size="16" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Sparkles, RefreshCw, ChevronRight } from 'lucide-vue'

export default {
  name: 'DashboardAIDiscovery',
  components: { Sparkles, RefreshCw, ChevronRight },
  data() {
    return {
      stocks: [
        { id: 1, name: 'SK하이닉스', score: 95, change: 4.8, tags: ['AI추천', '오늘특징주'] },
        { id: 2, name: '삼성전자', score: 92, change: 2.3, tags: ['외인매수', '실적기대'] },
        { id: 3, name: '한미반도체', score: 88, change: 7.5, tags: ['거래량급증', '신고가'] },
        { id: 4, name: '기아', score: 85, change: 1.2, tags: ['저PBR', '배당기대'] }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/dashboard/ai-discovery.css';
</style>
