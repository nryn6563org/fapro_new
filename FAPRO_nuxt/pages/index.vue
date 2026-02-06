<template>
  <!-- Dashboard 메인 페이지 -->
  <div class="dashboard-page">
    <div class="dashboard-page__header">
      <h1 class="dashboard-page__title">환영합니다! 오늘도 좋은 하루 되세요.</h1>
    </div>

    <!-- 종목 보드 영역 -->
    <div class="dashboard-page__board-wrapper dashboard-page__board-wrapper--stock">
      <div class="dashboard-page__board-header">
        <div class="dashboard-page__board-title-group">
          <div class="dashboard-page__board-deco-bar"></div>
          <h2 class="dashboard-page__board-title">종목 보드 :: 시총 101위 이하의 중소형주 대상</h2>
        </div>
        <div class="dashboard-page__update-info">
          <span class="dashboard-page__update-date">{{ currentDate }}</span>
          <span class="dashboard-page__update-divider">|</span>
          <span class="dashboard-page__update-time">{{ currentTime }} 업데이트</span>
        </div>
      </div>

      <div class="dashboard-page__board-grid">
        <!-- AI리포트 생성 종목 (Full Width) -->
        <AiReportCard :current-time="currentTime" />

        <!-- 이슈발생종목 -->
        <IssueStocksCard :current-time="currentTime" />

        <!-- 고객보유종목 랭킹 (추가) -->
        <RankingStockCard />

        <!-- 종목발굴 (추가) -->
        <DiscoveryStockCard />

        <!-- 라씨 시그널 발생 종목 -->
        <SignalStocksCard :current-time="currentTime" />

        <!-- 퀀트 종목 -->
        <QuantStocksCard :current-time="currentTime" />
      </div>
    </div>

    <!-- 고객/일정 관리 보드 영역 -->
    <div class="dashboard-page__board-wrapper dashboard-page__board-wrapper--customer">
      <div class="dashboard-page__board-header">
        <div class="dashboard-page__board-title-group">
          <div class="dashboard-page__board-deco-bar dashboard-page__board-deco-bar--green"></div>
          <h2 class="dashboard-page__board-title">고객/일정 관리 보드</h2>
        </div>
      </div>

      <div class="dashboard-page__board-grid">
        <!-- 고객 통계 (ECharts) -->
        <CustomerStatsCard :current-time="currentTime" />

        <!-- 상담내역 -->
        <ConsultationCard />

        <!-- 고객랭킹 (추가) -->
        <CustomerRankingCard />

        <!-- 고객수익률 (추가) -->
        <CustomerReturnCard />
      </div>
    </div>
  </div>
</template>

<script>
import AiReportCard from '~/components/dashboard/AiReportCard.vue'
import IssueStocksCard from '~/components/dashboard/IssueStocksCard.vue'
import RankingStockCard from '~/components/dashboard/RankingStockCard.vue'
import DiscoveryStockCard from '~/components/dashboard/DiscoveryStockCard.vue'
import SignalStocksCard from '~/components/dashboard/SignalStocksCard.vue'
import QuantStocksCard from '~/components/dashboard/QuantStocksCard.vue'
import CustomerStatsCard from '~/components/dashboard/CustomerStatsCard.vue'
import ConsultationCard from '~/components/dashboard/ConsultationCard.vue'
import CustomerRankingCard from '~/components/dashboard/CustomerRankingCard.vue'
import CustomerReturnCard from '~/components/dashboard/CustomerReturnCard.vue'

/**
 * Dashboard 메인 페이지 컴포넌트
 */
export default {
  name: 'DashboardPage',
  components: {
    AiReportCard,
    IssueStocksCard,
    RankingStockCard,
    DiscoveryStockCard,
    SignalStocksCard,
    QuantStocksCard,
    CustomerStatsCard,
    ConsultationCard,
    CustomerRankingCard,
    CustomerReturnCard
  },
  data() {
    return {
      currentDate: '2026.02.05',
      currentTime: '14:23'
    }
  },
  mounted() {
    this.updateTime()
    setInterval(this.updateTime, 60000)
  },
  methods: {
    updateTime() {
      const now = new Date()
      this.currentDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`
      this.currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    }
  }
}
</script>

<style scoped>
@import "~/assets/css/dashboard/style.css";
</style>
