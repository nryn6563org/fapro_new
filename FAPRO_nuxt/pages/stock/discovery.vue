<template>
  <div class="p-discovery">
    <header class="p-discovery__header">
      <h2 class="p-discovery__title">AI 종목 발굴</h2>
      <p class="p-discovery__desc">AI가 펀더멘털과 수급을 분석하여 오늘 가장 유망한 종목을 추천합니다.</p>
    </header>

    <div class="p-discovery__search-section">
      <div class="p-discovery__search-bar">
        <Search class="p-discovery__search-icon" :size="20" />
        <input type="text" placeholder="어떤 조건의 종목을 찾으시나요? (예: 저평가 우량주, 외국인 순매수 상위)" class="p-discovery__input" />
        <button class="c-btn c-btn--primary">검색</button>
      </div>
    </div>

    <div class="p-discovery__daily-picks">
      <h3 class="p-discovery__subtitle">오늘의 AI 추천</h3>
      <div class="p-discovery__grid">
        <div v-for="pick in picks" :key="pick.name" class="p-discovery__card">
          <div class="p-discovery__card-header">
            <span class="p-discovery__score">{{ pick.score }}점</span>
            <div class="p-discovery__stock-info">
              <h4 class="p-discovery__stock-name">{{ pick.name }}</h4>
              <span class="p-discovery__stock-sector">{{ pick.sector }}</span>
            </div>
          </div>
          <p class="p-discovery__reason">{{ pick.reason }}</p>
          <button class="c-btn c-btn--outline c-btn--sm c-btn--full">상세 분석 보기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockDiscoveryPage',
  data() {
    return {
      picks: [
        { name: '리가켐바이오', sector: '제약/바이오', score: 95, reason: '신약 기술 수출 기대감 및 외국인 대량 순매수 유입 포착.' },
        { name: '클래시스', sector: '의료기기', score: 92, reason: '해외 수출 실적 호조 지속, 영업이익률 50% 상회 예상.' },
        { name: '제룡전기', sector: '전력설비', score: 89, reason: '북미 변압기 수주 잔고 역대 최고치 경신.' }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/stock/discovery.css';
</style>
