<template>
  <div class="racy-signal-page">
    <!-- 헤더 영역 -->
    <div class="racy-signal-page__header">
      <div class="racy-signal-page__title-group">
        <h1 class="racy-signal-page__title">라씨 시그널 발생 종목</h1>
        <p class="racy-signal-page__subtitle">AI가 분석한 실시간 매수/매도 시그널</p>
      </div>
      <div class="racy-signal-page__header-actions">
        <button class="racy-signal-page__btn-refresh" @click="refreshData">
          <svg class="racy-signal-page__refresh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          새로고침
        </button>
      </div>
    </div>

    <!-- 시그널 요약 -->
    <div class="racy-signal-page__stats">
      <div class="racy-signal-page__stat-card">
        <div class="racy-signal-page__stat-content">
          <div class="racy-signal-page__stat-info">
            <div class="racy-signal-page__stat-label">금일 매수 시그널</div>
            <div class="racy-signal-page__stat-value racy-signal-page__stat-value--red">12건</div>
          </div>
          <div class="racy-signal-page__stat-arrow racy-signal-page__stat-arrow--red">↑</div>
        </div>
      </div>
      <div class="racy-signal-page__stat-card">
        <div class="racy-signal-page__stat-content">
          <div class="racy-signal-page__stat-info">
            <div class="racy-signal-page__stat-label">금일 매도 시그널</div>
            <div class="racy-signal-page__stat-value racy-signal-page__stat-value--blue">5건</div>
          </div>
          <div class="racy-signal-page__stat-arrow racy-signal-page__stat-arrow--blue">↓</div>
        </div>
      </div>
    </div>

    <!-- 시그널 리스트 -->
    <div class="racy-signal-page__list-card">
      <div class="racy-signal-page__list-header">
        <div class="racy-signal-page__list-title">실시간 시그널 피드</div>
      </div>
      <div class="racy-signal-page__list-content">
        <div class="racy-signal-page__list">
          <div
            v-for="(signal, idx) in signals"
            :key="idx"
            class="racy-signal-page__item"
            :class="signal.type === 'BUY' ? 'racy-signal-page__item--buy' : 'racy-signal-page__item--sell'"
          >
            <div class="racy-signal-page__item-main">
              <div class="racy-signal-page__item-header">
                <span
                  class="racy-signal-page__type-badge"
                  :class="signal.type === 'BUY' ? 'racy-signal-page__type-badge--buy' : 'racy-signal-page__type-badge--sell'"
                >
                  {{ signal.type }}
                </span>
                <span class="racy-signal-page__stock-name">{{ signal.name }}</span>
                <span class="racy-signal-page__stock-code">{{ signal.code }}</span>
              </div>
              <div class="racy-signal-page__item-price">
                시그널가: {{ signal.price.toLocaleString() }}원
              </div>
            </div>
            <div class="racy-signal-page__item-aside">
              <div class="racy-signal-page__item-time">{{ signal.time }}</div>
              <div
                class="racy-signal-page__item-status"
                :class="signal.type === 'BUY' ? 'racy-signal-page__item-status--buy' : 'racy-signal-page__item-status--sell'"
              >
                {{ signal.type === 'BUY' ? '매수 관망' : '매도 완료' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RacySignalPage',
  data() {
    return {
      signals: [
        { name: '삼성전자', code: '005930', type: 'BUY', price: 75200, time: '14:35:10' },
        { name: '현대차', code: '005380', type: 'SELL', price: 245000, time: '14:15:22' },
        { name: 'NAVER', code: '035420', type: 'BUY', price: 185000, time: '13:55:45' },
        { name: '셀트리온', code: '068270', type: 'SELL', price: 178000, time: '13:30:12' },
        { name: 'LG에너지솔루션', code: '373220', type: 'BUY', price: 412000, time: '12:45:33' }
      ]
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
@import '~/assets/css/stock/racy-signal.css';
</style>
