<template>
  <div class="ai-report-stock">
    <!-- 주가 정보 -->
    <div class="ai-report-stock__card">
      <div class="ai-report-stock__card-header">
        <h3 class="ai-report-stock__card-title">주가</h3>
      </div>
      <div
        class="ai-report-stock__card-body ai-report-stock__card-body--padded"
      >
        <div class="ai-report-stock__info-list">
          <div class="ai-report-stock__info-row">
            <span class="ai-report-stock__info-label">Price as of 9/6/07</span>
            <span class="ai-report-stock__info-value">$117.62</span>
          </div>
          <div class="ai-report-stock__info-row">
            <span class="ai-report-stock__info-label"
              >Market Capitalization</span
            >
            <span class="ai-report-stock__info-value">$160.4 Billion</span>
          </div>
          <div class="ai-report-stock__info-row">
            <span class="ai-report-stock__info-label">Asset Class</span>
            <span class="ai-report-stock__info-value">Large Cap</span>
          </div>
          <div class="ai-report-stock__info-row">
            <span class="ai-report-stock__info-label">Beta</span>
            <span class="ai-report-stock__info-value">1.72</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 심볼 및 테마 -->
    <div class="ai-report-stock__card">
      <div class="ai-report-stock__card-header">
        <h3 class="ai-report-stock__card-title">업종 및 테마</h3>
      </div>
      <div
        class="ai-report-stock__card-body ai-report-stock__card-body--padded"
      >
        <div class="ai-report-stock__theme-wrapper">
          <!-- 업종 정보 -->
          <div class="ai-report-stock__theme-list">
            <div class="ai-report-stock__theme-row">
              <span class="ai-report-stock__theme-label">Sector</span>
              <span class="ai-report-stock__theme-value"
                >Information Technology</span
              >
            </div>
            <div class="ai-report-stock__theme-row">
              <span class="ai-report-stock__theme-label">Industry</span>
              <span class="ai-report-stock__theme-value"
                >Computers & Peripherals</span
              >
            </div>
            <div class="ai-report-stock__theme-row">
              <span class="ai-report-stock__theme-label"
                >Schwab Industry Rating</span
              >
              <span class="ai-report-stock__theme-value">-</span>
            </div>
            <div class="ai-report-stock__theme-row">
              <span class="ai-report-stock__theme-label">Sub-Industry</span>
              <span class="ai-report-stock__theme-value"
                >Computer Hardware</span
              >
            </div>
          </div>

          <!-- 투자의견 종합 -->
          <div class="ai-report-stock__opinion-box">
            <h4 class="ai-report-stock__opinion-header">
              <span>투자의견 종합</span>
              <span class="ai-report-stock__opinion-highlight">강력매수</span>
            </h4>
            <div class="ai-report-stock__ranking">
              <div class="ai-report-stock__ranking-header">
                <span>Current Ranking ↓</span>
              </div>
              <div class="ai-report-stock__ranking-bar-wrapper">
                <div class="ai-report-stock__ranking-bar">
                  <div class="ai-report-stock__ranking-segment--danger"></div>
                  <div class="ai-report-stock__ranking-segment--neutral"></div>
                  <div class="ai-report-stock__ranking-segment--neutral"></div>
                  <div class="ai-report-stock__ranking-segment--info"></div>
                  <div class="ai-report-stock__ranking-segment--info-dark"></div>
                </div>
                <!-- 현재 위치 표시 (삼각형) -->
                <div class="ai-report-stock__ranking-marker ai-report-stock__ranking-marker--pos-75">
                  <div class="ai-report-stock__ranking-triangle"></div>
                </div>
              </div>
              <div class="ai-report-stock__ranking-ticks">
                <span>|</span><span>60-65</span><span>|</span><span>70</span
                ><span>|</span><span>80</span><span>|</span><span>90</span
                ><span>|</span><span>100+</span><span>|</span>
              </div>
              <div class="ai-report-stock__ranking-labels">
                <span>Sell</span>
                <span>Hold</span>
                <span>Buy</span>
              </div>
            </div>
          </div>

          <!-- 목표주가 -->
          <div class="ai-report-stock__target-price">
            <h4 class="ai-report-stock__target-price-title">목표주가(3개월)</h4>
            <div class="ai-report-stock__target-price-values">
              <div class="ai-report-stock__target-price-main">
                210,000
                <span class="ai-report-stock__target-price-unit">원</span>
              </div>
              <div class="ai-report-stock__target-price-sub">
                160,000
                <span class="ai-report-stock__target-price-sub-unit">원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 레이더 차트 (종합 분석) -->
    <div class="ai-report-stock__card">
      <div class="ai-report-stock__card-header">
        <h3 class="ai-report-stock__card-title">종합 분석</h3>
      </div>
      <div
        class="ai-report-stock__card-body ai-report-stock__card-body--padded"
      >
        <div class="ai-report-stock__radar-wrapper">
          <svg viewBox="0 0 200 200" class="ai-report-stock__radar-chart">
            <!-- 배경 오각형들 -->
            <polygon
              points="100,20 175,70 155,145 45,145 25,70"
              fill="none"
              class="ai-report-stock__radar-bg-line segment-1"
            />
            <polygon
              points="100,50 150,80 140,130 60,130 50,80"
              fill="none"
              class="ai-report-stock__radar-bg-line segment-2"
            />

            <!-- 데이터 오각형 -->
            <polygon
              points="100,30 165,75 145,140 55,135 35,75"
              class="ai-report-stock__radar-data-polygon"
            />

            <!-- 축 라벨 -->
            <text
              x="100"
              y="15"
              text-anchor="middle"
              class="ai-report-stock__radar-axis-text"
            >
              Technical
            </text>
            <text
              x="180"
              y="75"
              text-anchor="start"
              class="ai-report-stock__radar-axis-text"
            >
              Value
            </text>
            <text
              x="160"
              y="160"
              text-anchor="middle"
              class="ai-report-stock__radar-axis-text"
            >
              Momentum
            </text>
            <text
              x="40"
              y="160"
              text-anchor="middle"
              class="ai-report-stock__radar-axis-text"
            >
              Quality
            </text>
            <text
              x="20"
              y="75"
              text-anchor="end"
              class="ai-report-stock__radar-axis-text"
            >
              시스
            </text>

            <!-- 데이터 포인트 -->
            <circle
              cx="100"
              cy="30"
              r="3"
              class="ai-report-stock__radar-data-point"
            />
            <circle
              cx="165"
              cy="75"
              r="3"
              class="ai-report-stock__radar-data-point"
            />
            <circle
              cx="145"
              cy="140"
              r="3"
              class="ai-report-stock__radar-data-point"
            />
            <circle
              cx="55"
              cy="135"
              r="3"
              class="ai-report-stock__radar-data-point"
            />
            <circle
              cx="35"
              cy="75"
              r="3"
              class="ai-report-stock__radar-data-point"
            />
          </svg>
        </div>
        <div class="ai-report-stock__radar-stats">
          <div class="ai-report-stock__radar-stat-item">
            <p class="ai-report-stock__radar-stat-label">Value</p>
            <p class="ai-report-stock__radar-stat-value">47</p>
          </div>
          <div class="ai-report-stock__radar-stat-item">
            <p class="ai-report-stock__radar-stat-label">Momentum</p>
            <p class="ai-report-stock__radar-stat-value">58</p>
          </div>
          <div class="ai-report-stock__radar-stat-item">
            <p class="ai-report-stock__radar-stat-label">Quality</p>
            <p class="ai-report-stock__radar-stat-value">17</p>
          </div>
          <div class="ai-report-stock__radar-stat-item">
            <p class="ai-report-stock__radar-stat-label">Technical</p>
            <p class="ai-report-stock__radar-stat-value">92</p>
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
};
</script>
