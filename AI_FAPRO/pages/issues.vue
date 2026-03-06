<template>
  <div class="issues-page">
    <!-- 헤더 및 통계 컨테이너 -->
    <div class="issues-page__top-section">
      <!-- 헤더 -->
      <header class="issues-header">
        <div class="issues-header__title-box">
          <h1 class="issues-header__title">AI이슈포착</h1>
          <p class="issues-header__subtitle">
            중소형주 및 대형주 이슈를 포착 합니다
          </p>
        </div>
        <div class="issues-header__action-box">
          <div class="issues-header__time-info">
            <p class="issues-header__time-text">{{ formattedTime }}</p>
          </div>
          <button class="issues-header__btn-refresh" @click="refreshData">
            <refresh-cw-icon size="16" class="issues-header__refresh-icon" />
            <span class="issues-header__refresh-text">새로고침</span>
          </button>
        </div>
      </header>

      <!-- 통계 바 (카드 2개) -->
      <div class="issues-stats-bar">
        <!-- 카드 1: 중소형주 -->
        <div class="issues-stats-card">
          <div class="issues-stats-card__icon issues-stats-card__icon--orange">
            <bar-chart-2-icon class="w-5 h-5 text-orange-500" />
          </div>
          <div class="flex-1">
            <div class="issues-stats-card__label">중소형주 이슈</div>
            <div class="issues-stats-card__value">{{ smallCapStats.total }}건</div>
          </div>
          <div class="issues-stats-card__breakdown">
            <span class="issues-stats-card__badge-label">강도별</span>
            <span class="issues-stats-card__strength-high"
              >고 <span class="issues-stats-card__strength-num">{{ smallCapStats.high }}</span></span
            >
            <span class="issues-stats-card__dot">·</span>
            <span class="issues-stats-card__strength-mid"
              >중 <span class="issues-stats-card__strength-num">{{ smallCapStats.mid }}</span></span
            >
            <span class="issues-stats-card__dot">·</span>
            <span class="issues-stats-card__strength-low"
              >저 <span class="issues-stats-card__strength-num">{{ smallCapStats.low }}</span></span
            >
          </div>
        </div>

        <!-- 카드 2: 대형주 -->
        <div class="issues-stats-card">
          <div class="issues-stats-card__icon issues-stats-card__icon--slate">
            <bar-chart-2-icon
              class="w-5 h-5 text-slate-500 dark:text-slate-400"
            />
          </div>
          <div class="flex-1">
            <div class="issues-stats-card__label">대형주 이슈</div>
            <div class="issues-stats-card__value">{{ largeCapStats.total }}건</div>
          </div>
          <div class="issues-stats-card__breakdown">
            <span class="issues-stats-card__badge-label">강도별</span>
            <span class="issues-stats-card__strength-high"
              >고 <span class="issues-stats-card__strength-num">{{ largeCapStats.high }}</span></span
            >
            <span class="issues-stats-card__dot">·</span>
            <span class="issues-stats-card__strength-mid"
              >중 <span class="issues-stats-card__strength-num">{{ largeCapStats.mid }}</span></span
            >
            <span class="issues-stats-card__dot">·</span>
            <span class="issues-stats-card__strength-low"
              >저 <span class="issues-stats-card__strength-num">{{ largeCapStats.low }}</span></span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 메인 콘텐츠 그리드 -->
    <div class="issues-page__main-grid">
      <!-- 좌측: 버블 차트 -->
      <div class="issues-page__chart-section">
        <issue-bubble-chart
          :issues="issues"
          :type.sync="issueType"
          :selected-id="selectedIssueId"
          @select="handleIssueSelect"
        />
      </div>

      <!-- 우측: 빠른 분석 -->
      <div class="issues-page__analysis-section">
        <issue-analysis-side :issue="selectedIssue" />
      </div>
    </div>

    <!-- 하단: 심층 분석 (이슈 선택 시 트랜지션) -->
    <transition name="fade-slide">
      <div
        v-if="selectedIssueId"
        class="issues-page__detail-section animate__animated animate__fadeIn"
      >
        <issue-detail-section
          :issue="selectedIssue"
          @propose="handleProposeClick"
        />
      </div>
    </transition>

    <issue-proposal-modal
      :is-open="isProposalModalOpen"
      :issue="selectedIssueForProposal"
      :clients="sampleClients"
      @close="isProposalModalOpen = false"
      @send="handleProposalSend"
    />
  </div>
</template>

<script>
/**
 * 기능: AI 이슈 탐지 페이지 (Nuxt Migration)
 */
import { RefreshCwIcon, BarChart2Icon } from "vue-feather-icons";
import IssueBubbleChart from "~/components/issues/IssueBubbleChart.vue";
import IssueAnalysisSide from "~/components/issues/IssueAnalysisSide.vue";
import IssueDetailSection from "~/components/issues/IssueDetailSection.vue";
import IssueProposalModal from "~/components/issues/IssueProposalModal.vue";
import {
  issueData,
  largeCapIssueData,
} from "~/utils/issueDetectionMockData.js";
import "~/assets/css/pages/issues/IssuesPage/IssuesPage.css";

export default {
  name: "IssuesPage",
  components: {
    IssueBubbleChart,
    IssueAnalysisSide,
    IssueDetailSection,
    IssueProposalModal,
    RefreshCwIcon,
    BarChart2Icon,
  },
  layout: "default",
  data() {
    return {
      issueType: "all", // 'all', 'small', 'large' 중 하나
      selectedIssueId: null,
      isProposalModalOpen: false,
      selectedIssueForProposal: null,
      currentTime: new Date(),
      timer: null,
      sampleClients: [
        { id: 1, name: "김철수", email: "chulsoo.kim@email.com", type: "VVIP" },
        { id: 2, name: "이영희", email: "younghee.lee@email.com", type: "VIP" },
        { id: 3, name: "박지성", email: "js.park@email.com", type: "General" },
        { id: 4, name: "최유리", email: "yuri.choi@email.com", type: "VVIP" },
        { id: 5, name: "정민수", email: "ms.jung@email.com", type: "VIP" },
      ],
    };
  },
  computed: {
    issues() {
      if (this.issueType === "all") {
        return [...issueData, ...largeCapIssueData];
      }
      return this.issueType === "small" ? issueData : largeCapIssueData;
    },
    smallCapStats() {
      return this.calculateStats(issueData);
    },
    largeCapStats() {
      return this.calculateStats(largeCapIssueData);
    },
    selectedIssue() {
      if (!this.selectedIssueId) return null;
      return this.issues.find((i) => i.id === this.selectedIssueId);
    },
    formattedTime() {
      const d = this.currentTime;
      return `${String(d.getMonth() + 1).padStart(2, "0")}.${String(
        d.getDate()
      ).padStart(2, "0")}`;
    },
  },
  watch: {
    issueType() {
      // 새 유형의 가장 큰 이슈로 선택 전환
      this.setDefaultIssue();
    },
  },
  created() {
    this.setDefaultIssue();
  },
  mounted() {
    this.timer = setInterval(() => {
      this.currentTime = new Date();
    }, 60000); // 분 단위 갱신
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    refreshData() {
      this.currentTime = new Date();
    },
    setDefaultIssue() {
      if (this.issues && this.issues.length > 0) {
        // 크기가 가장 큰 이슈 찾기
        const largestIssue = this.issues.reduce(
          (max, issue) => (issue.size > max.size ? issue : max),
          this.issues[0]
        );
        this.selectedIssueId = largestIssue.id;
      }
    },
    handleIssueSelect(id) {
      this.selectedIssueId = id;
    },
    handleProposeClick(issue) {
      this.selectedIssueForProposal = issue;
      this.isProposalModalOpen = true;
    },
    handleProposalSend(data) {
      // TODO: API 연동 시 제안 데이터 전송 구현
    },
    calculateStats(data) {
      const stats = { total: data.length, high: 0, mid: 0, low: 0 };
      data.forEach((issue) => {
        const abs = Math.abs(issue.changePercent);
        if (abs > 5) stats.high++;
        else if (abs > 3) stats.mid++;
        else stats.low++;
      });
      return stats;
    },
  },
};
</script>
