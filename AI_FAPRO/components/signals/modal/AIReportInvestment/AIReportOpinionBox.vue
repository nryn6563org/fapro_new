<template>
  <div class="ai-report-opinion">
    <div class="ai-report-opinion__card">
      <div class="ai-report-opinion__card-header pb-3 border-b-0 space-y-0">
        <h3 class="ai-report-opinion__card-title text-sm">투자의견종합</h3>
      </div>
      <div class="ai-report-opinion__card-body ai-report-opinion__card-body--padded">
        <div class="ai-report-opinion__ranking">
          <div class="ai-report-opinion__ranking-header">
            <span>Current Ranking ↓</span>
          </div>
          <div class="ai-report-opinion__ranking-bar-wrapper">
            <div class="ai-report-opinion__ranking-bar">
              <div class="ai-report-opinion__ranking-segment bg-[#F5F5F5] border-r border-white">F</div>
              <div class="ai-report-opinion__ranking-segment bg-[#E5E5E5] border-r border-white">D</div>
              <div class="ai-report-opinion__ranking-segment bg-[#D5D5D5] border-r border-white">C</div>
              <div class="ai-report-opinion__ranking-segment bg-[#B5B5B5] border-r border-white">B</div>
              <div class="ai-report-opinion__ranking-segment bg-[#A5A5A5]">A</div>
            </div>
          </div>
          <div class="ai-report-opinion__ranking-labels">
            <span>매도</span>
            <span>중립</span>
            <span>매수</span>
          </div>
        </div>

        <!-- 목표주가 -->
        <div class="ai-report-opinion__target-price">
          <h4 class="ai-report-opinion__target-price-title">목표주가(3개월)</h4>
          <div class="ai-report-opinion__target-price-values">
            <div class="ai-report-opinion__target-price-main">
              <span>{{ signal?.targetPrice || '62,000' }}</span>
              <span class="text-sm font-normal ml-1">원</span>
            </div>
            <div class="ai-report-opinion__target-price-sub">
              <span>{{ signal?.currentPrice || signal?.price || '39,950' }}</span>
              <span class="text-xs font-normal ml-1">원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 리포트의 투자의견 및 목표주가 영역
 */
import "~/assets/css/pages/signals/AIReportOpinionBox/AIReportOpinionBox.css";

export default {
  name: "AIReportOpinionBox",
  props: {
    signal: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped>
/* Scoped styles are forbidden by rules, so I will move this to a CSS file.
   However, for the initial creation, I'll follow the rule to use external CSS.
*/
</style>
