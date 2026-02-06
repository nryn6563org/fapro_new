<template>
  <div class="p-my-stocks">
    <header class="p-my-stocks__header">
      <h2 class="p-my-stocks__title">관심 종목</h2>
      <p class="p-my-stocks__desc">나의 관심 종목 리스트와 AI 진단 결과를 확인합니다.</p>
    </header>

    <div class="p-my-stocks__grid">
      <div v-for="stock in stocks" :key="stock.code" class="p-my-stocks__card">
        <div class="p-my-stocks__card-header">
          <div class="p-my-stocks__info">
            <h3 class="p-my-stocks__name">{{ stock.name }}</h3>
            <span class="p-my-stocks__code">{{ stock.code }}</span>
          </div>
          <button class="c-btn c-btn--ghost c-btn--icon">
            <Star :size="20" class="text-yellow-400 fill-current" />
          </button>
        </div>
        
        <div class="p-my-stocks__price-area">
          <span class="p-my-stocks__price">{{ stock.price.toLocaleString() }}원</span>
          <span class="p-my-stocks__change" :class="stock.change >= 0 ? 'text-red-500' : 'text-blue-500'">
            {{ stock.change > 0 ? '+' : '' }}{{ stock.change }}%
          </span>
        </div>

        <div class="p-my-stocks__ai-analysis">
          <span class="p-my-stocks__ai-label">AI 진단</span>
          <div class="p-my-stocks__ai-score">
            <span class="p-my-stocks__score-val">{{ stock.score }}</span>
            <span class="p-my-stocks__score-total">/100</span>
          </div>
          <p class="p-my-stocks__ai-comment">{{ stock.comment }}</p>
        </div>
      </div>
      
      <!-- Add New Stock Card -->
      <button class="p-my-stocks__add-btn">
        <Plus :size="32" class="p-my-stocks__add-icon" />
        <span class="p-my-stocks__add-text">관심종목 추가</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyStocksPage',
  data() {
    return {
      stocks: [
        { name: '삼성전자', code: '005930', price: 74200, change: 1.5, score: 85, comment: '반도체 업황 개선 기대감 유효' },
        { name: 'NAVER', code: '035420', price: 205000, change: -2.3, score: 72, comment: '광고 실적 둔화 우려, 신사업 모멘텀 필요' },
        { name: '에코프로비엠', code: '247540', price: 230000, change: -1.2, score: 65, comment: '2차전지 섹터 조정 국면 지속' },
        { name: '한미반도체', code: '042700', price: 62500, change: 4.2, score: 92, comment: 'HBM 관련 수주 모멘텀 강력' },
        { name: '엔씨소프트', code: '036570', price: 185000, change: 0.5, score: 55, comment: '신작 흥행 부진, 반등 모멘텀 부재' }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/my/stocks.css';
</style>
