<template>
  <div class="ai-report-content">
    <div class="ai-report-content__layout">
      <!-- Top Grid: 2 columns -->
      <div class="ai-report-content__grid-top">
        <!-- Left Column: Investment & Score -->
        <div class="ai-report-content__col-left">
          <a-i-report-investment :signal="signal" />
          <a-i-report-score :signal="signal" />
        </div>
        
        <!-- Right Column: Stock Info & Radar -->
        <div class="ai-report-content__col-right">
          <a-i-report-stock-info :signal="signal" />
        </div>
      </div>

      <!-- Bottom Full Width: Customer Send -->
      <div class="ai-report-content__full-width">
        <a-i-report-customer-send :signal="signal" />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 리포트 모달의 레이아웃 래퍼 (서브 컴포넌트들을 조합)
 * 규칙: 150 line limit 준수를 위해 각 영역을 서브 컴포넌트로 분리
 */
import AIReportInvestment from './modal/AIReportInvestment.vue'
import AIReportScore from './modal/AIReportScore.vue'
import AIReportStockInfo from './modal/AIReportStockInfo.vue'
import AIReportCustomerSend from './modal/AIReportCustomerSend.vue'
import '~/assets/css/pages/signals/AIReportContent/AIReportContent.css'

export default {
  name: 'AIReportContent',
  components: {
    AIReportInvestment,
    AIReportScore,
    AIReportStockInfo,
    AIReportCustomerSend
  },
  props: {
    signal: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
