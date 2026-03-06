<template>
  <div class="issue-detail__stats-grid">
    <!-- Change Info -->
    <div class="issue-detail__stat-card issue-detail__stat-card--orange">
      <div class="issue-detail__stat-header">
        <p class="issue-detail__stat-label">등락률</p>
        <div class="issue-detail__intensity-bars">
          <div
            v-for="i in 3"
            :key="i"
            :class="[
              'issue-detail__intensity-bar',
              i <= intensityLevel
                ? i === 3
                  ? 'bg-rose-500'
                  : i === 2
                  ? 'bg-orange-500'
                  : 'bg-slate-400'
                : 'bg-slate-200 dark:bg-slate-800',
            ]"
          ></div>
        </div>
      </div>
      <p
        :class="[
          'issue-detail__stat-value',
          issue.type === 'up'
            ? 'text-red-600'
            : issue.type === 'down'
            ? 'text-blue-600'
            : 'text-slate-600',
        ]"
      >
        {{ issue.changePercent > 0 ? "+" : "" }}{{ issue.changePercent }}%
      </p>
      <p class="issue-detail__stat-desc">{{ intensityText }}</p>
    </div>

    <!-- Related Count -->
    <div class="issue-detail__stat-card issue-detail__stat-card--teal">
      <p class="issue-detail__stat-label issue-detail__stat-label--spaced">연관 종목 수</p>
      <p class="issue-detail__stat-value issue-detail__stat-value--teal">
        {{ issue.relatedStocks.length }}개
      </p>
      <p class="issue-detail__stat-desc">분석 대상 종목</p>
    </div>

    <!-- Frequency -->
    <div class="issue-detail__stat-card issue-detail__stat-card--blue">
      <p class="issue-detail__stat-label issue-detail__stat-label--spaced">이슈 발생 / 2월</p>
      <p class="issue-detail__stat-value issue-detail__stat-value--blue">
        {{ issue.monthlyOccurrences || 0 }}번
      </p>
      <p class="issue-detail__stat-desc">
        <span class="issue-detail__stat-highlight issue-detail__stat-highlight--up"
          >{{ issue.occurrenceStats?.up || 0 }}번 상승</span
        >
        ·
        <span class="issue-detail__stat-highlight issue-detail__stat-highlight--down"
          >{{ issue.occurrenceStats?.down || 0 }}번 하락</span
        >
      </p>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 이슈 상세 상단 통계 그리드
 */
import "~/assets/css/pages/issues/IssueDetailStats/IssueDetailStats.css";

export default {
  name: "IssueDetailStats",
  props: {
    issue: {
      type: Object,
      default: () => ({}),
    },
    intensityLevel: {
      type: Number,
      default: 0,
    },
    intensityText: {
      type: String,
      default: "",
    },
  },
};
</script>
