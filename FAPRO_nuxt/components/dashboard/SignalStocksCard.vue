<template>
  <Card class="dashboard-card dashboard-card--signal-stocks">
    <div class="dashboard-card__header">
      <div class="dashboard-card__header-main">
        <div class="dashboard-card__title-row">
          <div class="dashboard-card__title-group">
            <svg xmlns="http://www.w3.org/2000/svg" class="dashboard-card__title-icon dashboard-card__title-icon--purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <span class="dashboard-card__title-text">라씨 시그널 발생 종목</span>
          </div>
          <div class="dashboard-card__header-meta">
            <span class="dashboard-card__update-time">{{ currentTime }}</span>
            <button class="dashboard-card__refresh-btn">
              <svg xmlns="http://www.w3.org/2000/svg" class="dashboard-card__refresh-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- 신호 요약 -->
      <div class="dashboard-card__signal-summary">
        <p class="dashboard-card__signal-summary-title">오늘의 AI 매매신호 현황</p>
        <div class="dashboard-card__signal-stat-row">
          <div class="dashboard-card__signal-stat-item">
            <span class="dashboard-card__signal-stat-label">매수</span>
            <span class="dashboard-card__signal-stat-value dashboard-card__signal-stat-value--buy">{{ buyCount }}</span>
            <span class="dashboard-card__signal-stat-unit">종목</span>
          </div>
          <div class="dashboard-card__signal-stat-divider"></div>
          <div class="dashboard-card__signal-stat-item">
            <span class="dashboard-card__signal-stat-label">매도</span>
            <span class="dashboard-card__signal-stat-value dashboard-card__signal-stat-value--sell">{{ sellCount }}</span>
            <span class="dashboard-card__signal-stat-unit">종목</span>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard-card__content dashboard-card__content--scrollable">
      <div class="dashboard-card__signal-list">
        <nuxt-link
          v-for="stock in signalStocksData"
          :key="stock.code"
          :to="`/stock/detail/${stock.code}`"
          class="dashboard-card__signal-item dashboard-card__signal-item--hover"
        >
          <div
            :class="['dashboard-card__signal-badge',
                    stock.signal === '매수' ? 'dashboard-card__signal-badge--buy' : 'dashboard-card__signal-badge--sell']"
          >
            오늘{{ stock.signal }}
          </div>

          <div class="dashboard-card__signal-time">{{ stock.signalTime }}</div>

          <div class="dashboard-card__signal-info">
            <div class="dashboard-card__signal-name-row">
              <span class="dashboard-card__signal-name">{{ stock.name }}</span>
            </div>

            <div class="dashboard-card__signal-price-row">
              <template v-if="stock.signal === '매수'">
                <span class="dashboard-card__signal-price-label">매수가</span>
                <span class="dashboard-card__signal-price-value">{{ stock.buyPrice.toLocaleString() }}원</span>
              </template>
              <template v-else>
                <div class="dashboard-card__signal-sell-info">
                  <span class="dashboard-card__signal-price-label">매도가 <span class="dashboard-card__signal-price-bold">{{ stock.sellPrice.toLocaleString() }}원</span></span>
                  <span class="dashboard-card__signal-price-label">수익률 <span class="dashboard-card__signal-price-profit">+{{ stock.profitRate }}%</span></span>
                </div>
              </template>
            </div>
          </div>
        </nuxt-link>
      </div>

      <nuxt-link
        to="/stock/racy-signal"
        class="dashboard-card__view-more dashboard-card__view-more--purple"
      >
        더보기
      </nuxt-link>
    </div>
  </Card>
</template>

<script>
import { signalStocks } from '~/assets/data/dashboard-data'

export default {
  name: 'SignalStocksCard',
  props: {
    currentTime: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      signalStocksData: signalStocks
    }
  },
  computed: {
    buyCount() {
      return this.signalStocksData.filter(s => s.signal === '매수').length
    },
    sellCount() {
      return this.signalStocksData.filter(s => s.signal === '매도').length
    }
  }
}
</script>

<style scoped>
.card-header {
  border-bottom: 1px solid #f3f4f6;
}
</style>
