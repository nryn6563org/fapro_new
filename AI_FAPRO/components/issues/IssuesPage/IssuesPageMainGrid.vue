<template>
  <div class="issues-page__main-grid">
    <div class="issues-page__main-grid-header">
      <h3 class="issues-page__main-grid-title">스마트 고객관리</h3>
    </div>

    <div class="issues-page__chart-section">
      <issue-bubble-chart
:issues="issues" :type.sync="innerIssueType" :selected-id="selectedId"
        @select="$emit('select', $event)" />
    </div>

    <div class="issues-page__analysis-section">
      <issue-analysis-side :issue="selectedIssue" />
    </div>
  </div>
</template>

<script>
/**
 * 기능: 이슈 페이지의 메인 그리드 (차트 + 분석 사이드) 컴포넌트
 */
import IssueBubbleChart from "~/components/issues/IssueBubbleChart.vue";
import IssueAnalysisSide from "~/components/issues/IssueAnalysisSide.vue";

export default {
  name: "IssuesPageMainGrid",
  components: {
    IssueBubbleChart,
    IssueAnalysisSide,
  },
  props: {
    issues: { type: Array, required: true },
    issueType: { type: String, required: true },
    selectedId: { type: [Number, String], default: null },
    selectedIssue: { type: Object, default: null },
  },
  computed: {
    innerIssueType: {
      get() { return this.issueType; },
      set(val) { this.$emit('update:issueType', val); }
    }
  }
};
</script>
