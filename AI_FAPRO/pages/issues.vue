<template>
  <div class="issues-page">
    <div class="issues-page__top-section">
      <IssuesPageHeader :formatted-time="formattedTime" @refresh="refreshData" />
      <IssuesPageStats :small-cap-stats="smallCapStats" :large-cap-stats="largeCapStats" />
    </div>

    <!-- 메인 차트 및 간단 분석 섹션 -->
    <IssuesPageMainGrid :issues="issues" :issue-type.sync="issueType" :selected-id="selectedIssueId"
      :selected-issue="selectedIssue" @select="handleIssueSelect" />

    <!-- 하단 상세 분석 섹션 -->
    <transition name="fade-slide">
      <div v-if="selectedIssueId" class="issues-page__detail-section animate__animated animate__fadeIn">
        <issue-detail-section :issue="selectedIssue" @propose="handleProposeClick" />
      </div>
    </transition>

    <issue-proposal-modal :is-open="isProposalModalOpen" :issue="selectedIssueForProposal" :clients="sampleClients"
      @close="isProposalModalOpen = false" @reopen="isProposalModalOpen = true" @send="handleProposalSend" />
  </div>
</template>

<script>
/**
 * 기능: AI 이슈 탐지 페이지 (Modularized)
 */
import IssuesPageMainGrid from "~/components/issues/IssuesPage/IssuesPageMainGrid.vue";
import IssueDetailSection from "~/components/issues/IssueDetailSection.vue";
import IssueProposalModal from "~/components/issues/IssueProposalModal.vue";
import IssuesPageHeader from "~/components/issues/IssuesPage/IssuesPageHeader.vue";
import IssuesPageStats from "~/components/issues/IssuesPage/IssuesPageStats.vue";
import {
  issueData,
  largeCapIssueData,
} from "~/utils/issueDetectionMockData.js";
import "~/assets/css/pages/issues/IssuesPage/IssuesPage.css";

export default {
  name: "IssuesPage",
  components: {
    IssuesPageMainGrid,
    IssueDetailSection,
    IssueProposalModal,
    IssuesPageHeader,
    IssuesPageStats,
  },
  layout: "default",
  data() {
    return {
      issueType: "all",
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
      if (this.issueType === "all") return [...issueData, ...largeCapIssueData];
      return this.issueType === "small" ? issueData : largeCapIssueData;
    },
    smallCapStats() { return this.calculateStats(issueData); },
    largeCapStats() { return this.calculateStats(largeCapIssueData); },
    selectedIssue() {
      if (!this.selectedIssueId) return null;
      return this.issues.find((i) => i.id === this.selectedIssueId);
    },
    formattedTime() {
      const d = this.currentTime;
      return `${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
    },
  },
  watch: {
    issueType() { this.setDefaultIssue(); },
  },
  created() { this.setDefaultIssue(); },
  mounted() {
    this.timer = setInterval(() => { this.currentTime = new Date(); }, 60000);
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    refreshData() { this.currentTime = new Date(); },
    setDefaultIssue() {
      if (this.issues && this.issues.length > 0) {
        const largestIssue = this.issues.reduce((max, issue) => (issue.size > max.size ? issue : max), this.issues[0]);
        this.selectedIssueId = largestIssue.id;
      }
    },
    handleIssueSelect(id) { this.selectedIssueId = id; },
    handleProposeClick(issue) {
      this.selectedIssueForProposal = issue;
      this.isProposalModalOpen = true;
    },
    handleProposalSend(data) {
      // API 전송 로직 등 추가 예정
    },
    calculateStats(data) {
      const stats = { total: data.length, high: 0, mid: 0, low: 0, lowest: 0 };
      data.forEach((issue) => {
        const abs = Math.abs(issue.changePercent);
        if (abs > 7) stats.high++;
        else if (abs > 4) stats.mid++;
        else if (abs > 1) stats.low++;
        else stats.lowest++;
      });
      return stats;
    },
  },
};
</script>
