<template>
  <div class="issues-page">
    <!-- Header & Stats Container -->
    <div class="issues-page__top-section">
      <!-- Header -->
      <header class="issues-header">
        <div class="issues-header__title-box">
          <h1 class="issues-header__title">AI이슈포착</h1>
          <p class="issues-header__subtitle">
            대형주로 구성된 이슈 맵 - 총 {{ issues.length }}개 이슈가
            발생했습니다.
          </p>
        </div>
        <div class="issues-header__action-box">
          <div class="issues-header__time-info">
            <p class="issues-header__time-text">{{ formattedTime }}</p>
            <p class="issues-header__time-label">최종 업데이트</p>
          </div>
          <button class="issues-header__btn-refresh" @click="refreshData">
            <refresh-cw-icon size="16" class="issues-header__refresh-icon" />
            <span class="issues-header__refresh-text">새로고침</span>
          </button>
        </div>
      </header>

      <!-- Stats Bar (2 Cards) -->
      <div class="issues-stats-bar">
        <!-- Card 1: Small/Mid Cap -->
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

        <!-- Card 2: Large Cap -->
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

    <!-- Main Content Grid -->
    <div class="issues-page__main-grid">
      <!-- Left: Bubble Chart -->
      <div class="issues-page__chart-section">
        <issue-bubble-chart
          :issues="issues"
          :type.sync="issueType"
          :selected-id="selectedIssueId"
          @select="handleIssueSelect"
        />
      </div>

      <!-- Right: Quick Analysis -->
      <div class="issues-page__analysis-section">
        <issue-analysis-side :issue="selectedIssue" />
      </div>
    </div>

    <!-- Bottom: Deep Analysis (Transition when an issue is selected) -->
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

    <!-- Proposal Modal -->
    <issue-proposal-modal
      :is-open="isProposalModalOpen"
      :issue="selectedIssueForProposal"
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
      issueType: "small", // 'small' or 'large'
      selectedIssueId: null,
      isProposalModalOpen: false,
      selectedIssueForProposal: null,
      currentTime: new Date(),
      timer: null,
    };
  },
  computed: {
    issues() {
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
      return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}.${String(d.getDate()).padStart(2, "0")} ${String(
        d.getHours()
      ).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(
        d.getSeconds()
      ).padStart(2, "0")}`;
    },
  },
  watch: {
    issueType() {
      // Switch selection to the largest issue of the new type
      this.setDefaultIssue();
    },
  },
  created() {
    this.setDefaultIssue();
  },
  mounted() {
    this.timer = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
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
        // Find the issue with the maximum size
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
      console.log("Sending proposal:", data);
      // In a real app, this would hit an API
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
