<template>
  <div class="ai-report-investment">
    <!-- 기업 정보 (투자브리프) -->
    <div class="ai-report-investment__card">
      <div class="ai-report-investment__card-header">
        <h3 class="ai-report-investment__card-title">투자브리프</h3>
      </div>
      <div class="ai-report-investment__card-body">
        <p class="ai-report-investment__text">
          {{
            signal?.aiReport ||
            "기업에 대한 설명 및 상세 분석 내용이 제공됩니다."
          }}
        </p>
        <div class="ai-report-investment__info-grid">
          <div class="ai-report-investment__info-item">
            <p class="ai-report-investment__info-label">업종</p>
            <p class="ai-report-investment__info-value">
              Information Technology
            </p>
          </div>
          <div class="ai-report-investment__info-item">
            <p class="ai-report-investment__info-label">
              Schwab Industry Rating
            </p>
            <p class="ai-report-investment__info-value">Sub-Industry</p>
          </div>
          <div class="ai-report-investment__info-item">
            <p class="ai-report-investment__info-label">Schwab Sector Rating</p>
            <p class="ai-report-investment__info-value">Computer Hardware</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 52주 차트 (시뮬레이션 UI) -->
    <div class="ai-report-investment__card">
      <div class="ai-report-investment__card-header">
        <h3 class="ai-report-investment__card-title">52주 차트</h3>
      </div>
      <div class="ai-report-investment__card-body">
        <div class="ai-report-investment__chart-container">
          <div class="ai-report-investment__chart-legend">
            <div class="ai-report-investment__legend-item">
              <span class="ai-report-investment__legend-dot"></span>
              <span class="ai-report-investment__legend-text"
                >Quarterly EPS Announcement</span
              >
            </div>
            <div class="ai-report-investment__legend-item">
              <span class="ai-report-investment__legend-line"></span>
              <span class="ai-report-investment__legend-text"
                >200-Day Moving Average</span
              >
            </div>
          </div>

          <div class="ai-report-investment__chart-mock">
            <div class="ai-report-investment__chart-y-axis">
              <span>최고</span>
              <span class="mt-8">현재</span>
              <span class="mt-8">최저</span>
            </div>
            <div class="ai-report-investment__chart-svg-wrapper">
              <svg
                viewBox="0 0 300 100"
                preserveAspectRatio="none"
                class="ai-report-investment__chart-svg"
              >
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stop-color="rgba(59, 130, 246, 0.3)" />
                    <stop offset="100%" stop-color="rgba(59, 130, 246, 0.05)" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 60 L 50 45 L 100 55 L 150 35 L 200 50 L 250 40 L 300 30"
                  fill="none"
                  stroke="#3B82F6"
                  stroke-width="2"
                />
                <path
                  d="M 0 60 L 50 45 L 100 55 L 150 35 L 200 50 L 250 40 L 300 30 L 300 100 L 0 100 Z"
                  fill="url(#chartGradient)"
                />
                <line
                  x1="0"
                  y1="45"
                  x2="300"
                  y2="45"
                  stroke="#F59E0B"
                  stroke-width="1"
                  stroke-dasharray="4 2"
                />
              </svg>
              <!-- Data Points -->
              <span
                class="ai-report-investment__data-point ai-report-investment__data-point--1"
              ></span>
              <span
                class="ai-report-investment__data-point ai-report-investment__data-point--2"
              ></span>
              <span
                class="ai-report-investment__data-point ai-report-investment__data-point--3"
              ></span>
            </div>
            <div class="ai-report-investment__chart-y-axis">
              <span>250K</span>
              <span class="mt-8">200K</span>
              <span class="mt-8">150K</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI추천사유 -->
    <div class="ai-report-investment__card">
      <div
        class="ai-report-investment__card-header ai-report-investment__card-header--highlight"
      >
        <h3 class="ai-report-investment__card-title">
          <zap-icon size="16" class="ai-report-investment__icon-amber" />
          AI추천사유
        </h3>
      </div>
      <div
        class="ai-report-investment__card-body ai-report-investment__card-body--padded"
      >
        <p class="ai-report-investment__desc">
          ACM probability advantage of beating the market (3M):
          <span class="ai-report-investment__highlight-text">+17.15%</span>
        </p>
        <p class="ai-report-investment__subtext">
          Stock picked overall analyst advantage of staying (ACM) is based on
          the performance of the market and fundamental, technical, and
          sentiment features that overall analysts use during the previous year.
          Alpha signals explain the probability advantage of ACM alpha signals.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 리포트의 투자 브리프 및 차트 영역 (좌측 상단부)
 */
import { ZapIcon } from "vue-feather-icons";
import "~/assets/css/pages/signals/AIReportInvestment/AIReportInvestment.css";

export default {
  name: "AIReportInvestment",
  components: {
    ZapIcon,
  },
  props: {
    signal: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
