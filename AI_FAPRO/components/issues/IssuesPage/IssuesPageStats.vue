<template>
  <div class="issues-stats-bar">
    <!-- Card 1: Small/Mid Cap -->
    <div class="issues-stats-card">
      <div class="issues-stats-card__icon issues-stats-card__icon--orange">
        <bar-chart-2-icon class="issues-stats-card__chart-icon-orange" />
      </div>
      <div class="issues-stats-card__content">
        <div class="issues-stats-card__label">중소형주 이슈</div>
        <div class="issues-stats-card__value">{{ smallCapStats.total }}건</div>
      </div>
      <div class="issues-stats-card__breakdown">
        <span class="issues-stats-card__badge-label">강도별</span>
        <span class="issues-stats-card__strength-high">
          고 <span class="issues-stats-card__strength-num">{{ smallCapStats.high }}</span>
        </span>
        <span class="issues-stats-card__dot">·</span>
        <span class="issues-stats-card__strength-mid">
          중 <span class="issues-stats-card__strength-num">{{ smallCapStats.mid }}</span>
        </span>
        <span class="issues-stats-card__dot">·</span>
        <span class="issues-stats-card__strength-low">
          저 <span class="issues-stats-card__strength-num">{{ smallCapStats.low }}</span>
        </span>
      </div>
    </div>

    <!-- Card 2: Large Cap -->
    <div class="issues-stats-card">
      <div class="issues-stats-card__icon issues-stats-card__icon--slate">
        <bar-chart-2-icon class="issues-stats-card__chart-icon-slate" />
      </div>
      <div class="issues-stats-card__content">
        <div class="issues-stats-card__label">대형주 이슈</div>
        <div class="issues-stats-card__value">{{ largeCapStats.total }}건</div>
      </div>
      <div class="issues-stats-card__breakdown">
        <span class="issues-stats-card__badge-label">강도별</span>
        <span class="issues-stats-card__strength-high">
          고 <span class="issues-stats-card__strength-num">{{ largeCapStats.high }}</span>
        </span>
        <span class="issues-stats-card__dot">·</span>
        <span class="issues-stats-card__strength-mid">
          중 <span class="issues-stats-card__strength-num">{{ largeCapStats.mid }}</span>
        </span>
        <span class="issues-stats-card__dot">·</span>
        <span class="issues-stats-card__strength-low">
          저 <span class="issues-stats-card__strength-num">{{ largeCapStats.low }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 이슈 포착 페이지 - 통계 바 영역
 */
import { BarChart2Icon } from "vue-feather-icons";

export default {
  name: "IssuesPageStats",
  components: {
    BarChart2Icon,
  },
  props: {
    smallCapStats: { type: Object, required: true },
    largeCapStats: { type: Object, required: true },
  },
};
</script>
