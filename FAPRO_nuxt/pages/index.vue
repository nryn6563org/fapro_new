<template>
  <div class="p-dashboard">
    <header class="p-dashboard__header">
      <h1 class="p-dashboard__title">대시보드</h1>
      <p class="p-dashboard__welcome">환영합니다! 오늘도 좋은 하루 되세요.</p>
    </header>

    <div class="p-dashboard__grid">
      <!-- Stock Board (Bubble Chart) -->
      <div class="p-dashboard__card--full">
        <PageDashboardStockBoard />
      </div>

      <!-- Quant Stocks -->
      <FunctionCard 
        title="퀀트 종목" 
        title-icon="PieChart" 
        title-icon-color="purple"
      >
        <template #header-actions>
          <button class="c-btn c-btn--ghost c-btn--xs">전체보기</button>
        </template>
        
        <div class="p-dashboard__quant-grid">
          <FunctionQuantCard 
            type="aggressive"
            algorithm="Talos"
            :monthly-return="12.5"
            :total-return="145.2"
          />
          <FunctionQuantCard 
            type="neutral"
            algorithm="Rolan"
            :monthly-return="-2.4"
            :total-return="89.3"
          />
        </div>
      </FunctionCard>

      <!-- AI Reports -->
      <FunctionCard 
        title="최신 AI 리포트" 
        title-icon="FileText" 
        title-icon-color="green"
      >
        <template #header-actions>
          <button class="c-btn c-btn--ghost c-btn--xs">전체보기</button>
        </template>
        <PageDashboardReportList :reports="reports" />
      </FunctionCard>

      <!-- Stock Signals -->
      <FunctionCard 
        title="실시간 시그널" 
        title-icon="Zap" 
        title-icon-color="yellow"
      >
        <template #header-actions>
          <button class="c-btn c-btn--ghost c-btn--xs">전체보기</button>
        </template>
        <PageDashboardSignalList :signals="signals" />
      </FunctionCard>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage',
  data() {
    return {
      reports: [
        { name: '삼성전자', code: '005930', change: 2.3, date: '01-30' },
        { name: '현대차', code: '005380', change: -1.2, date: '01-30' },
        { name: 'NAVER', code: '035420', change: -0.5, date: '01-29' },
        { name: '카카오', code: '035720', change: 3.1, date: '01-29' }
      ],
      signals: [
        { type: 'buy', typeName: '매수', name: '카카오뱅크', price: 29200, change: 2.5 },
        { type: 'buy', typeName: '매수', name: 'SK하이닉스', price: 135000, change: 2.3 },
        { type: 'sell', typeName: '매도', name: 'LG에너지솔루션', price: 445000, change: -5.9 },
        { type: 'sell', typeName: '매도', name: '삼성바이오', price: 895000, change: 2.9 }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/dashboard.css';
</style>
