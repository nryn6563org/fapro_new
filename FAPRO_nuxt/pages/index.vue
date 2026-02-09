<template>
  <div class="p-dashboard">
    <!-- Header Section -->
    <header class="p-dashboard__header">
      <p class="p-dashboard__welcome">환영합니다! 오늘도 고객님들과 함께 성장하는 하루 되세요.</p>
      <button class="p-dashboard__custom-btn" @click="isModalOpen = true">
        <Settings :size="16" />
        대시보드 커스텀하기
      </button>
    </header>

    <!-- Main Content Grid -->
    <div class="p-dashboard__content">
      <!-- Section 1: 종목보드 -->
      <section class="p-dashboard__section p-dashboard__section-item">
        <div class="p-dashboard__section-header">
          <div class="p-dashboard__section-line"></div>
          <h2 class="p-dashboard__section-title">종목보드 <span class="p-dashboard__section-sub-title">:: 시총 101위 이하의 중소형주 대상</span></h2>
        </div>
        
        <div class="p-board-grid">
          <div class="p-board-grid__item--12">
            <PageDashboardStockBoard />
          </div>
          <div class="p-board-grid__item--12">
            <PageDashboardReportList />
          </div>
          <div class="p-board-grid__item--8">
            <PageDashboardCustomerEvents />
          </div>
          <div class="p-board-grid__item--4">
            <PageDashboardSignalList />
          </div>
          <div class="p-board-grid__item--4">
            <PageDashboardQuantStocks />
          </div>
          <div class="p-board-grid__item--4">
            <PageDashboardCustomerStockRanking />
          </div>
          <div class="p-board-grid__item--4">
            <PageDashboardAIDiscovery />
          </div>
        </div>
      </section>

      <!-- Section 2: 고객/일정 관리 보드 -->
      <section class="p-dashboard__section p-dashboard__section-customer">
        <div class="p-dashboard__section-header">
          <div class="p-dashboard__section-line"></div>
          <h2 class="p-dashboard__section-title">고객/일정 관리 보드</h2>
        </div>

        <div class="p-board-grid p-dashboard__customer-board">
          <div class="p-board-grid__item--4">
            <PageDashboardCustomerRanking />
          </div>
          <div class="p-board-grid__item--4">
            <PageDashboardConsultationManagement />
          </div>
          <div class="p-board-grid__item--4">
            <PageDashboardCustomerReturn />
          </div>
        </div>
      </section>
    </div>

    <!-- Customization Modal -->
    <PageDashboardCustomModal 
      :is-open="isModalOpen" 
      @close="isModalOpen = false"
      @apply="handleApplyCustom"
    />
  </div>
</template>

<script>
import PageDashboardStockBoard from '@/components/page/dashboard/StockBoard.vue'
import PageDashboardReportList from '@/components/page/dashboard/ReportList.vue'
import PageDashboardCustomerEvents from '@/components/page/dashboard/CustomerEvents.vue'
import PageDashboardSignalList from '@/components/page/dashboard/SignalList.vue'
import PageDashboardQuantStocks from '@/components/page/dashboard/QuantStocks.vue'
import PageDashboardCustomerStockRanking from '@/components/page/dashboard/CustomerStockRanking.vue'
import PageDashboardAIDiscovery from '@/components/page/dashboard/AIDiscovery.vue'
import PageDashboardConsultationManagement from '@/components/page/dashboard/ConsultationManagement.vue'
import PageDashboardCustomerReturn from '@/components/page/dashboard/CustomerReturn.vue'
import PageDashboardCustomerRanking from '@/components/page/dashboard/CustomerRanking.vue'
import PageDashboardCustomModal from '@/components/page/dashboard/CustomModal.vue'
import { Settings } from 'lucide-vue'

export default {
  name: 'DashboardPage',
  components: { 
    PageDashboardStockBoard,
    PageDashboardReportList,
    PageDashboardCustomerEvents,
    PageDashboardSignalList,
    PageDashboardQuantStocks,
    PageDashboardCustomerStockRanking,
    PageDashboardAIDiscovery,
    PageDashboardConsultationManagement,
    PageDashboardCustomerReturn,
    PageDashboardCustomerRanking,
    PageDashboardCustomModal,
    Settings 
  },
  data() {
    return {
      isModalOpen: false
    }
  },
  methods: {
    handleApplyCustom(items) {
      console.log('Applied custom settings:', items)
      // Logic for persisting settings can be added here
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/dashboard.css';
</style>
