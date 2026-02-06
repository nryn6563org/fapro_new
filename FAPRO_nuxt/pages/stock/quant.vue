<template>
  <div class="quant-page">
    <!-- 헤더 영역 -->
    <div class="quant-page__header">
      <div class="quant-page__title-group">
        <h1 class="quant-page__title">퀀트 종목</h1>
        <p class="quant-page__subtitle">데이터 기반 정량 분석 종목 랭킹</p>
      </div>
      <button class="quant-page__btn-refresh" @click="refreshData">
        <svg class="quant-page__refresh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        새로고침
      </button>
    </div>

    <!-- 전략 탭 -->
    <div class="quant-page__tabs">
      <div class="quant-page__tab-group">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="quant-page__tab-btn"
          :class="activeTab === tab.id ? 'quant-page__tab-btn--active' : 'quant-page__tab-btn--inactive'"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- 종목 리스트 -->
    <div class="quant-page__list-card">
      <div class="quant-page__list-header">
        <div class="quant-page__list-title">{{ currentTabLabel }} TOP 10</div>
      </div>
      <div class="quant-page__list-content">
        <div class="quant-page__list">
          <div v-for="(stock, idx) in stocks" :key="stock.code" class="quant-page__item">
            <div class="quant-page__item-main">
              <span class="quant-page__rank-badge">{{ idx + 1 }}</span>
              <div class="quant-page__stock-info">
                <div class="quant-page__stock-name">{{ stock.name }}</div>
                <div class="quant-page__stock-code">{{ stock.code }}</div>
              </div>
            </div>
            <div class="quant-page__item-aside">
              <div class="quant-page__item-value">{{ stock.value }}</div>
              <div class="quant-page__item-subvalue">{{ stock.subValue }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockQuantPage',
  data() {
    return {
      activeTab: 'return',
      tabs: [
        { id: 'return', label: '수익률' },
        { id: 'value', label: '가치' },
        { id: 'momentum', label: '모멘텀' },
        { id: 'quality', label: '우량성' }
      ],
      stocks: [
        { name: '에코프로', code: '086520', value: '+45.2%', subValue: '3개월 수익률' },
        { name: '대덕전자', code: '353200', value: '+32.8%', subValue: '3개월 수익률' },
        { name: '한미반도체', code: '042700', value: '+28.5%', subValue: '3개월 수익률' },
        { name: '기아', code: '000270', value: '+22.1%', subValue: '3개월 수익률' },
        { name: '삼성전자', code: '005930', value: '+12.5%', subValue: '3개월 수익률' }
      ]
    }
  },
  computed: {
    currentTabLabel() {
      return this.tabs.find(t => t.id === this.activeTab).label
    }
  },
  methods: {
    refreshData() {
      alert('데이터가 갱신되었습니다.')
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/stock/quant.css';
</style>
