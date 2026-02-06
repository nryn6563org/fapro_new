<template>
  <div class="p-investment">
    <header class="p-investment__header">
      <h2 class="p-investment__title">투자 정보</h2>
      <p class="p-investment__desc">AI가 요약한 최신 투자 뉴스와 유튜브 인사이트를 확인하세요.</p>
    </header>

    <div class="p-investment__grid">
      <!-- Main Video/Summary -->
      <section class="p-investment__main">
        <div class="p-investment__video-card">
          <div class="p-investment__video-wrapper">
             <!-- Placeholder for YouTube embed -->
             <div class="p-investment__video-placeholder">
               <span class="p-investment__play-icon">▶</span>
             </div>
          </div>
          <div class="p-investment__content">
            <span class="p-investment__tag">오늘의 추천 영상</span>
            <h3 class="p-investment__main-title">2026년 반도체 슈퍼사이클, 이 종목을 주목하라</h3>
            <div class="p-investment__meta">
              <span>슈카월드</span>
              <span>조회수 25만회</span>
              <span>2시간 전</span>
            </div>
            
            <div class="p-investment__summary">
              <h4 class="p-investment__summary-title">AI 요약 포인트</h4>
              <ul class="p-investment__summary-list">
                <li>AI 데이터센터 수요 폭증으로 HBM 시장 규모 2배 이상 성장 예상</li>
                <li>삼성전자 파운드리 수율 개선 시 주가 재평가 가능성 높음</li>
                <li>SK하이닉스 독주 체제에서 3사 경쟁 구도로 재편 전망</li>
                <li>관련 소부장 종목 중 저평가된 3개 기업 분석 (한미반도체, 등등)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Sidebar List -->
      <aside class="p-investment__sidebar">
        <h3 class="p-investment__sidebar-title">실시간 인기 영상</h3>
        <div class="p-investment__list">
          <div v-for="item in videos" :key="item.id" class="p-investment__item">
            <div class="p-investment__item-thumb"></div>
            <div class="p-investment__item-info">
              <h4 class="p-investment__item-title">{{ item.title }}</h4>
              <div class="p-investment__item-meta">
                <span>{{ item.channel }}</span>
                <span>{{ item.views }}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyInvestmentPage',
  data() {
    return {
      videos: [
        { id: 1, title: '미국 금리 인하 시점과 채권 투자 전략', channel: '삼프로TV', views: '12만회' },
        { id: 2, title: '2차전지 반등의 서막? 에코프로 분석', channel: '달란트투자', views: '8.5만회' },
        { id: 3, title: '비트코인 ETF 승인 그 후, 시장의 변화', channel: '코인뷰', views: '5만회' },
        { id: 4, title: '부동산 PF 위기설, 팩트체크', channel: '부동산읽어주는남자', views: '15만회' },
        { id: 5, title: '엔비디아 실적 발표 프리뷰', channel: '미주은', views: '9.2만회' }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/my/investment.css';
</style>
