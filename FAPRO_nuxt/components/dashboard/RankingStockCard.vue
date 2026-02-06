<template>
  <Card class="dashboard-card dashboard-card--ranking-stock">
    <div class="dashboard-card__header">
      <div class="dashboard-card__header-main">
        <div class="dashboard-card__title-group">
          <svg xmlns="http://www.w3.org/2000/svg" class="dashboard-card__title-icon dashboard-card__title-icon--blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span class="dashboard-card__title-text">고객보유종목 랭킹</span>
        </div>
      </div>
    </div>
    <div class="dashboard-card__content">
      <div class="dashboard-card__rank-list">
        <div
          v-for="(stock, idx) in stocks"
          :key="stock.code"
          class="dashboard-card__rank-item"
        >
          <div class="dashboard-card__rank-info">
            <span class="dashboard-card__rank-number">{{ idx + 1 }}</span>
            <span class="dashboard-card__rank-name">{{ stock.name }}</span>
          </div>
          <span class="dashboard-card__rank-value">{{ stock.ratio }}</span>
        </div>
      </div>
      <nuxt-link to="/stock/ranking" class="dashboard-card__view-more dashboard-card__view-more--blue">더보기</nuxt-link>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'RankingStockCard',
  data() {
    return {
      stocks: [
        { name: '삼성전자', code: '005930', ratio: '15.2%' },
        { name: 'LG에너지솔루션', code: '373220', ratio: '12.8%' },
        { name: 'SK하이닉스', code: '000660', ratio: '10.5%' },
        { name: '삼성바이오로직스', code: '207940', ratio: '8.2%' },
        { name: '현대차', code: '005380', ratio: '7.5%' }
      ]
    }
  }
}
</script>
