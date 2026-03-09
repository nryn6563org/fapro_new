<template>
  <div class="ai-report-content">
    <div class="ai-report-content__layout">
      <!-- Section 1: Brief & Stock Info (Flex 2:1) -->
      <div class="ai-report-content__row ai-report-content__row--flex">
        <div class="ai-report-content__col-left">
          <a-i-report-investment-brief :signal="signal" :ai-report="signal?.aiReport || signal?.reason" />
        </div>
        <div class="ai-report-content__col-right">
          <a-i-report-stock-info :signal="signal" />
        </div>
      </div>

      <!-- Section 2: Chart & Opinion (Flex 2:1) -->
      <div class="ai-report-content__row ai-report-content__row--flex">
        <div class="ai-report-content__col-left">
          <a-i-report-investment-chart />
        </div>
        <div class="ai-report-content__col-right">
          <a-i-report-opinion-box :signal="signal" />
        </div>
      </div>

      <!-- Section 3: AI Recommendation Reason (Full Width) -->
      <div class="ai-report-content__row">
        <a-i-report-investment-reason :reason="signal?.reason" />
      </div>

      <!-- Section 4: AI Score (Full Width: Bars + Radar) -->
      <div class="ai-report-content__row">
        <a-i-report-score :signal="signal" />
      </div>

      <!-- Section 5: Factors (Investment Points & Risks) -->
      <div class="ai-report-content__row">
        <a-i-report-factors />
      </div>

      <!-- Section 6: Customer Send (Maintain as is) -->
      <div class="ai-report-content__row">
        <a-i-report-customer-send :signal="signal" />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 리포트 모달의 레이아웃 래퍼
 * 각 영역을 이미지 순서에 맞춰 재배치했습니다.
 */
import AIReportInvestmentBrief from "./modal/AIReportInvestment/AIReportInvestmentBrief.vue";
import AIReportInvestmentChart from "./modal/AIReportInvestment/AIReportInvestmentChart.vue";
import AIReportInvestmentReason from "./modal/AIReportInvestment/AIReportInvestmentReason.vue";
import AIReportOpinionBox from "./modal/AIReportInvestment/AIReportOpinionBox.vue";
import AIReportStockInfo from "./modal/AIReportStockInfo.vue";
import AIReportScore from "./modal/AIReportScore.vue";
import AIReportFactors from "./modal/AIReportFactors.vue";
import AIReportCustomerSend from "./modal/AIReportCustomerSend.vue";
import "~/assets/css/pages/signals/AIReportContent/AIReportContent.css";
import "~/assets/css/pages/signals/AIReportInvestment/AIReportInvestment.css";

export default {
  name: "AIReportContent",
  components: {
    AIReportInvestmentBrief,
    AIReportInvestmentChart,
    AIReportInvestmentReason,
    AIReportOpinionBox,
    AIReportStockInfo,
    AIReportScore,
    AIReportFactors,
    AIReportCustomerSend,
  },
  props: {
    signal: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
