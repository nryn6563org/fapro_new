<template>
  <Card class="dashboard-card dashboard-card--quant-stocks">
    <div class="dashboard-card__header">
      <div class="dashboard-card__header-main">
        <div class="dashboard-card__title-row">
          <div class="dashboard-card__title-group">
            <svg xmlns="http://www.w3.org/2000/svg" class="dashboard-card__title-icon dashboard-card__title-icon--indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span class="dashboard-card__title-text">퀀트종목</span>
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

      <!-- 전략 탭 -->
      <div class="dashboard-card__tab-group-wrapper">
        <div class="dashboard-card__tab-group">
          <button
            v-for="tab in ['talos', 'roland', 'mistral']"
            :key="tab"
            @click="quantTab = tab"
            :class="['dashboard-card__tab-item',
                     quantTab === tab ? 'dashboard-card__tab-item--active dashboard-card__tab-item--indigo' : '']"
          >
            {{ tab === 'talos' ? '탈로스' : tab === 'roland' ? '롤랑' : '미스트랄' }}
          </button>
        </div>
      </div>

      <!-- 성과 요약 -->
      <div class="dashboard-card__performance-summary">
        <div class="dashboard-card__performance-header">
          <span class="dashboard-card__performance-label">성과 리포트</span>
          <select v-model="quantPeriod" class="dashboard-card__performance-select">
            <option value="1m">1개월</option>
            <option value="3m">3개월</option>
            <option value="total">총수익률</option>
          </select>
        </div>
        <div class="dashboard-card__performance-value-row">
          <span class="dashboard-card__performance-name">누적수익률</span>
          <span class="dashboard-card__performance-value">{{ currentReturns[quantPeriod] }}%</span>
        </div>
      </div>
    </div>

    <div class="dashboard-card__content dashboard-card__content--scrollable">
      <div class="dashboard-card__rank-header">
        <span class="dashboard-card__rank-title">익절 TOP 5 ({{ quantPeriodLabel }})</span>
      </div>

      <div class="dashboard-card__rank-list">
        <nuxt-link
          v-for="stock in currentStocks"
          :key="stock.code"
          :to="`/stock/detail/${stock.code}`"
          class="dashboard-card__rank-item dashboard-card__rank-item--hover"
        >
          <div class="dashboard-card__rank-left">
            <span
              :class="['dashboard-card__rank-badge',
                      stock.rank === 1 ? 'dashboard-card__rank-badge--gold' : 'dashboard-card__rank-badge--normal']"
            >
              {{ stock.rank }}
            </span>
            <span class="dashboard-card__rank-name">{{ stock.name }}</span>
          </div>
          <span class="dashboard-card__rank-value dashboard-card__rank-value--profit">+{{ stock.profitRate }}%</span>
        </nuxt-link>
      </div>

      <nuxt-link
        to="/stock/quant"
        class="dashboard-card__view-more dashboard-card__view-more--indigo"
      >
        더보기
      </nuxt-link>
    </div>
  </Card>
</template>

<script>
import { quantStocksData } from '~/assets/data/dashboard-data'

export default {
  name: 'QuantStocksCard',
  props: {
    currentTime: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      quantTab: 'talos',
      quantPeriod: 'total',
      quantStocksData
    }
  },
  computed: {
    currentReturns() {
      return this.quantStocksData[this.quantTab].returns
    },
    currentStocks() {
      return this.quantStocksData[this.quantTab].stocks
    },
    quantPeriodLabel() {
      const labels = { '1m': '1개월', '3m': '3개월', total: '전체' }
      return labels[this.quantPeriod]
    }
  }
}
</script>

<style scoped>
.card-header {
  border-bottom: 1px solid #f3f4f6;
}
</style>
