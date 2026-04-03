<template>
  <div class="ai-report-opinion">
    <div class="ai-report-opinion__card">
      <div class="ai-report-opinion__card-header pb-3 border-b-0 space-y-0">
        <h3 class="ai-report-opinion__card-title text-sm">투자의견종합</h3>
      </div>
      <div class="ai-report-opinion__card-body ai-report-opinion__card-body--padded">
        <div class="ai-report-opinion__ranking">
          <div class="ai-report-opinion__ranking-bar-wrapper">
            <!-- 랭크 인디케이터 (Current Ranking) -->
            <div
class="ai-report-opinion__ranking-indicator"
              :class="isLeftAligned ? 'ai-report-opinion__ranking-indicator--left' : 'ai-report-opinion__ranking-indicator--right'"
              :style="{ left: indicatorPosition + '%' }">
              <div v-if="isLeftAligned" class="ai-report-opinion__ranking-label-group">
                <span class="ai-report-opinion__ranking-arrow">↓</span>
                <span class="ai-report-opinion__ranking-text">Current Ranking(78)</span>
              </div>
              <div v-else class="ai-report-opinion__ranking-label-group">
                <span class="ai-report-opinion__ranking-text">Current Ranking(78)</span>
                <span class="ai-report-opinion__ranking-arrow">↓</span>
              </div>
            </div>

            <div class="ai-report-opinion__ranking-bar">
              <div
class="ai-report-opinion__ranking-segment ai-report-opinion__ranking-segment--f"
                :class="{ 'ai-report-opinion__ranking-segment--active': activeSegment === 'F' }">F</div>
              <div
class="ai-report-opinion__ranking-segment ai-report-opinion__ranking-segment--d"
                :class="{ 'ai-report-opinion__ranking-segment--active': activeSegment === 'D' }">D</div>
              <div
class="ai-report-opinion__ranking-segment ai-report-opinion__ranking-segment--c"
                :class="{ 'ai-report-opinion__ranking-segment--active': activeSegment === 'C' }">C</div>
              <div
class="ai-report-opinion__ranking-segment ai-report-opinion__ranking-segment--b"
                :class="{ 'ai-report-opinion__ranking-segment--active': activeSegment === 'B' }">B</div>
              <div
class="ai-report-opinion__ranking-segment ai-report-opinion__ranking-segment--a"
                :class="{ 'ai-report-opinion__ranking-segment--active': activeSegment === 'A' }">A</div>
            </div>

            <!-- 눈금 및 숫자 -->
            <div class="ai-report-opinion__ranking-ticks">
              <div class="ai-report-opinion__tick-item" style="left: 0%"><span
                  class="ai-report-opinion__tick"></span><span class="ai-report-opinion__tick-num">1</span></div>
              <div class="ai-report-opinion__tick-item" style="left: 5%"><span
                  class="ai-report-opinion__tick"></span><span class="ai-report-opinion__tick-num">5</span></div>
              <div class="ai-report-opinion__tick-item" style="left: 30%"><span
                  class="ai-report-opinion__tick"></span><span class="ai-report-opinion__tick-num">30</span></div>
              <div class="ai-report-opinion__tick-item" style="left: 70%"><span
                  class="ai-report-opinion__tick"></span><span class="ai-report-opinion__tick-num">70</span></div>
              <div class="ai-report-opinion__tick-item" style="left: 95%"><span
                  class="ai-report-opinion__tick"></span><span class="ai-report-opinion__tick-num">95</span></div>
              <div class="ai-report-opinion__tick-item" style="left: 100%"><span
                  class="ai-report-opinion__tick"></span><span class="ai-report-opinion__tick-num">100</span></div>
            </div>
          </div>
          <div class="ai-report-opinion__ranking-labels">
            <!-- 구역 구분선 -->
            <div class="ai-report-opinion__label-divider ai-report-opinion__label-divider--left"></div>
            <div class="ai-report-opinion__label-divider ai-report-opinion__label-divider--right"></div>

            <span class="ai-report-opinion__ranking-label--sell">매도</span>
            <span class="ai-report-opinion__ranking-label--neutral">중립</span>
            <span class="ai-report-opinion__ranking-label--buy">매수</span>
          </div>
        </div>

        <!-- 목표주가 -->
        <div class="ai-report-opinion__target-price">
          <h4 class="ai-report-opinion__target-price-title">목표주가(1개월)</h4>
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
  computed: {
    indicatorPosition() {
      // 100위(F) -> 0%
      // 1위(A) -> 99% (바 오른쪽 끝 정렬을 위해 0~99 범위로 제한)
      const rank = this.signal?.rank || 100;
      return Math.max(0, Math.min(99, 100 - rank));
    },
    isLeftAligned() {
      // F, D 영역 (Rank 100~70) 일 때 좌측 정렬 (화살표 좌측, 텍스트 우측)
      const rank = this.signal?.rank || 100;
      return rank >= 70;
    },
    activeSegment() {
      const rank = this.signal?.rank || 100;
      if (rank >= 95) return 'F';
      if (rank >= 70) return 'D';
      if (rank >= 30) return 'C';
      if (rank >= 5) return 'B';
      return 'A';
    },
  },
};
</script>

<style scoped>
/* Scoped styles are forbidden by rules, so I will move this to a CSS file.
   However, for the initial creation, I'll follow the rule to use external CSS.
*/
</style>
