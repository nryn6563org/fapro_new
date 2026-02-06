<template>
  <Card class="dashboard-card dashboard-card--discovery-stock">
    <div class="dashboard-card__header">
      <div class="dashboard-card__header-main">
        <div class="dashboard-card__title-group">
          <svg xmlns="http://www.w3.org/2000/svg" class="dashboard-card__title-icon dashboard-card__title-icon--green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span class="dashboard-card__title-text">종목발굴</span>
        </div>
      </div>
    </div>
    <div class="dashboard-card__content">
      <div class="dashboard-card__discovery-list">
        <div
          v-for="item in items"
          :key="item.title"
          class="dashboard-card__discovery-item"
        >
          <div class="dashboard-card__discovery-header">
            <span class="dashboard-card__discovery-title">{{ item.title }}</span>
            <span class="dashboard-card__discovery-count">{{ item.count }}개</span>
          </div>
          <p class="dashboard-card__discovery-desc">{{ item.desc }}</p>
        </div>
      </div>
      <nuxt-link to="/stock/ai-discovery" class="dashboard-card__view-more dashboard-card__view-more--green dashboard-card__view-more--margin-top">더보기</nuxt-link>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'DiscoveryStockCard',
  data() {
    return {
      items: [
        { title: '저평가 우량주', desc: 'PBR 0.5 이하, ROE 10% 이상 종목', count: 12 },
        { title: '외인/기관 동반매수', desc: '최근 5일간 수급 집중 종목', count: 8 },
        { title: '골든크로스 발생', desc: '5일-20일 이평선 상향 돌파', count: 15 }
      ]
    }
  }
}
</script>
