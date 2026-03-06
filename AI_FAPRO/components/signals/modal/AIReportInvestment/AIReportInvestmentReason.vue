<template>
  <div class="ai-report-investment__card">
    <div class="ai-report-investment__card-header ai-report-investment__card-header--highlight">
      <h3 class="ai-report-investment__card-title">
        <zap-icon size="16" class="ai-report-investment__icon-amber" />
        AI추천사유
      </h3>
    </div>
    <div class="ai-report-investment__card-body ai-report-investment__card-body--padded">
      <p class="ai-report-investment__desc">
        ACM probability advantage of beating the market (3M):
        <span class="ai-report-investment__highlight-text">+17.15%</span>
      </p>
      <p class="ai-report-investment__subtext">
        Stock picked overall analyst advantage of staying (ACM) is based on the performance of the market and fundamental, technical, and sentiment features that overall analysts use during the previous year. Alpha signals explain the probability advantage of ACM alpha signals.
      </p>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 리포트 추천 사유 영역
 */
import { ZapIcon } from "vue-feather-icons";

export default {
  name: "AIReportInvestmentReason",
  components: {
    ZapIcon,
  },
};
</script>
