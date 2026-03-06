<template>
  <div class="ai-report-investment">
    <!-- 기업 정보 (투자브리프) -->
    <AIReportInvestmentBrief :ai-report="signal?.aiReport" />

    <!-- 52주 차트 -->
    <AIReportInvestmentChart />

    <!-- AI 추천 사유 -->
    <AIReportInvestmentReason />
  </div>
</template>

<script>
/**
 * 기능: AI 리포트의 투자 브리프 및 차트 영역 (Modularized)
 */
import AIReportInvestmentBrief from "./AIReportInvestment/AIReportInvestmentBrief.vue";
import AIReportInvestmentChart from "./AIReportInvestment/AIReportInvestmentChart.vue";
import AIReportInvestmentReason from "./AIReportInvestment/AIReportInvestmentReason.vue";
import "~/assets/css/pages/signals/AIReportInvestment/AIReportInvestment.css";

export default {
  name: "AIReportInvestment",
  components: {
    AIReportInvestmentBrief,
    AIReportInvestmentChart,
    AIReportInvestmentReason,
  },
  props: {
    // 리포트 대상 신호 데이터
    signal: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

