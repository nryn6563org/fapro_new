<template>
  <div class="ai-discovery-page">
    <!-- 헤더 영역 -->
    <div class="ai-discovery-page__header">
      <div class="ai-discovery-page__title-group">
        <h1 class="ai-discovery-page__title">AI 종목 발굴</h1>
        <p class="ai-discovery-page__subtitle">AI 모델이 매일 아침 엄선한 유망 테마 및 종목</p>
      </div>
      <div class="ai-discovery-page__header-actions">
        <button class="ai-discovery-page__btn-refresh" @click="refreshData">
          <svg class="ai-discovery-page__refresh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          새로고침
        </button>
      </div>
    </div>

    <!-- 발굴 요약 -->
    <div class="ai-discovery-page__stats">
      <div v-for="theme in themes" :key="theme.title" class="ai-discovery-page__theme-card" :class="getThemeCardClass(theme.color)">
        <div class="ai-discovery-page__theme-header">
          <span class="ai-discovery-page__theme-tag">{{ theme.tag }}</span>
          <span class="ai-discovery-page__theme-count" :class="getThemeCountClass(theme.textColor)">{{ theme.count }}개</span>
        </div>
        <div class="ai-discovery-page__theme-title">{{ theme.title }}</div>
        <p class="ai-discovery-page__theme-desc">{{ theme.desc }}</p>
      </div>
    </div>

    <!-- 발굴 리스트 -->
    <div class="ai-discovery-page__list-card">
      <div class="ai-discovery-page__list-header">
        <div class="ai-discovery-page__list-title">AI 정밀 분석 종목</div>
      </div>
      <div class="ai-discovery-page__list-content">
        <div class="ai-discovery-page__list">
          <div v-for="(stock, idx) in discoveryStocks" :key="idx" class="ai-discovery-page__item">
            <div class="ai-discovery-page__item-main">
              <div class="ai-discovery-page__item-header">
                <span class="ai-discovery-page__item-name">{{ stock.name }}</span>
                <span class="ai-discovery-page__item-code">{{ stock.code }}</span>
                <span class="ai-discovery-page__item-type">{{ stock.type }}</span>
              </div>
              <p class="ai-discovery-page__item-reason">{{ stock.reason }}</p>
            </div>
            <div class="ai-discovery-page__item-aside">
              <div class="ai-discovery-page__item-score">{{ stock.score }}점</div>
              <div class="ai-discovery-page__item-score-label">AI 매칭 점수</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockAIDiscoveryPage',
  data() {
    return {
      themes: [
        { title: '저평가 우량주', tag: '#가치주', desc: 'PBR 0.5 이하, ROE 10% 이상', count: 12, color: 'green', textColor: 'green' },
        { title: '외인/기관 동반매수', tag: '#수급우수', desc: '최근 5일간 수급 집중 종목', count: 8, color: 'blue', textColor: 'blue' },
        { title: '골든크로스 발생', tag: '#기술적반등', desc: '5일-20일 이평선 상향 돌파', count: 15, color: 'purple', textColor: 'purple' }
      ],
      discoveryStocks: [
        { name: '삼성전자', code: '005930', type: '저평가', reason: '실적 턴어라운드 및 수급 개선세 뚜렷', score: 95 },
        { name: '현대자동차', code: '005380', type: '고배당', reason: '주주환원 정책 확대 기대감 및 낮은 벨류에이션', score: 92 },
        { name: 'SK하이닉스', code: '000660', type: '모멘텀', reason: 'HBM 시장 점유율 확대로 강력한 이익 성장세', score: 88 },
        { name: 'LG화학', code: '051910', type: '낙폭과대', reason: '주가 하락 과도 수준, 기술적 반등 유력 구간', score: 85 }
      ]
    }
  },
  methods: {
    refreshData() {
      alert('데이터가 갱신되었습니다.')
    },
    getThemeCardClass(color) {
      return `ai-discovery-page__theme-card--${color}`
    },
    getThemeCountClass(color) {
      return `ai-discovery-page__theme-count--${color}`
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/stock/ai-discovery.css';
</style>
