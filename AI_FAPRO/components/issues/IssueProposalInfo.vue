<template>
  <div v-if="issue" class="proposal-section">
    <!-- Stats Row: 3 Columns -->
    <div class="grid grid-cols-3 gap-4 mb-8">
      <!-- Intensity Card -->
      <div class="issue-proposal__stat-card issue-proposal__stat-card--red">
        <p class="issue-proposal__stat-label">이슈 등락률</p>
        <div class="flex items-end justify-between">
          <div class="issue-proposal__stat-value-box">
            <p class="issue-proposal__stat-value issue-proposal__stat-value--red">
              {{ issue.changePercent > 0 ? '+' : '' }}{{ issue.changePercent }}%
            </p>
            <span class="issue-proposal__stat-badge issue-proposal__stat-badge--red">고강도</span>
          </div>
          <div class="issue-proposal__intensity-gauge">
            <div v-for="i in 3" :key="i" :class="['issue-proposal__gauge-bar', i <= 2 ? 'issue-proposal__gauge-bar--active' : '']"></div>
          </div>
        </div>
      </div>

      <!-- Related Stocks Card -->
      <div class="issue-proposal__stat-card issue-proposal__stat-card--teal">
        <p class="issue-proposal__stat-label">연관 종목수</p>
        <div class="issue-proposal__stat-value-box">
          <p class="issue-proposal__stat-value issue-proposal__stat-value--teal">
            {{ issue.relatedStocks?.length || 0 }}개
          </p>
          <p class="issue-proposal__stat-subtext">중소형주 중심</p>
        </div>
      </div>

      <!-- Frequency Card -->
      <div class="issue-proposal__stat-card issue-proposal__stat-card--violet">
        <p class="issue-proposal__stat-label">이슈 발생 / 2월</p>
        <div class="issue-proposal__stat-value-box">
          <p class="issue-proposal__stat-value issue-proposal__stat-value--violet">
            {{ issue.monthlyOccurrences || 0 }}번
          </p>
          <div class="flex items-center gap-2 mt-1">
            <span class="issue-proposal__stat-substat issue-proposal__stat-substat--up">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              {{ issue.occurrenceStats?.up || 0 }}번
            </span>
            <span class="issue-proposal__stat-substat issue-proposal__stat-substat--down">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              {{ issue.occurrenceStats?.down || 0 }}번
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 제안서 상단 이슈 요약 정보 카드
 */
import "~/assets/css/pages/issues/IssueProposalInfo/IssueProposalInfo.css";

export default {
  name: "IssueProposalInfo",
  props: {
    issue: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
