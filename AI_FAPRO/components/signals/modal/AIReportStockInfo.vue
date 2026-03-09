<template>
  <div class="ai-report-stock">
    <!-- 주가 정보 -->
    <div class="ai-report-stock__card">
      <div class="ai-report-stock__card-header pb-3 border-b-0 space-y-0">
        <h3 class="ai-report-stock__card-title text-sm">투자정보</h3>
      </div>
      <div class="ai-report-stock__card-body ai-report-stock__card-body--padded">
        <div class="ai-report-stock__info-list">
          <div class="ai-report-stock__info-row">
            <span class="ai-report-stock__info-label">시가총액</span>
            <span class="ai-report-stock__info-value">{{ signal?.marketCap || '1조 2,345억' }}</span>
          </div>
          <div class="ai-report-stock__info-row">
            <span class="ai-report-stock__info-label">시가총액순위</span>
            <span class="ai-report-stock__info-value">{{ signal?.marketCapRank || '코스피 123위' }}</span>
          </div>
          <div class="ai-report-stock__info-row">
            <span class="ai-report-stock__info-label">상장주식수</span>
            <span class="ai-report-stock__info-value">{{ signal?.sharesOutstanding || '12,345,678' }}</span>
          </div>
          <div class="ai-report-stock__info-row">
            <span class="ai-report-stock__info-label">외국인보유주식수</span>
            <span class="ai-report-stock__info-value">{{ signal?.foreignHolding || '2,345,678' }}</span>
          </div>
          <div class="ai-report-stock__info-row">
            <span class="ai-report-stock__info-label">외국인보유비중</span>
            <span class="ai-report-stock__info-value">{{ signal?.foreignRatio || '15.23%' }}</span>
          </div>
          <div class="ai-report-stock__info-row">
            <span class="ai-report-stock__info-label">52주 최고 | 최저</span>
            <span class="ai-report-stock__info-value">{{ signal?.low52 || '35,000' }} | {{ signal?.high52 || '75,000' }}</span>
          </div>
          <div class="ai-report-stock__info-row">
            <span class="ai-report-stock__info-label">PER</span>
            <span class="ai-report-stock__info-value">{{ signal?.peRatio || '12.5' }}</span>
          </div>
          <div class="ai-report-stock__info-row">
            <span class="ai-report-stock__info-label">EPS</span>
            <span class="ai-report-stock__info-value">{{ signal?.eps || '2,345' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 리포트의 주가, 테마, 레이더 차트 영역 (우측 컬럼 상단부)
 */
import "~/assets/css/pages/signals/AIReportStockInfo/AIReportStockInfo.css";

export default {
  name: "AIReportStockInfo",
  props: {
    signal: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
