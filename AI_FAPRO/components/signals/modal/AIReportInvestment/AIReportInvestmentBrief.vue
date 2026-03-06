<template>
  <div class="ai-report-investment__card">
    <div class="ai-report-investment__card-header">
      <h3 class="ai-report-investment__card-title">투자브리프</h3>
    </div>
    <div class="ai-report-investment__card-body">
      <p class="ai-report-investment__text">
        {{
          aiReport || "기업에 대한 설명 및 상세 분석 내용이 제공됩니다."
        }}
      </p>
      <div class="ai-report-investment__info-grid">
        <div class="ai-report-investment__info-item">
          <p class="ai-report-investment__info-label">업종</p>
          <p class="ai-report-investment__info-value">Information Technology</p>
        </div>
        <div class="ai-report-investment__info-item">
          <p class="ai-report-investment__info-label">Schwab Industry Rating</p>
          <p class="ai-report-investment__info-value">Sub-Industry</p>
        </div>
        <div class="ai-report-investment__info-item">
          <p class="ai-report-investment__info-label">Schwab Sector Rating</p>
          <p class="ai-report-investment__info-value">Computer Hardware</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 리포트 투자 브리프 요약 영역
 */
export default {
  name: "AIReportInvestmentBrief",
  props: {
    aiReport: { type: String, default: "" },
  },
};
</script>
