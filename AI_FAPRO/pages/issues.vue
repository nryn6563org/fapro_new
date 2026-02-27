<template>
  <div class="issues-page">
    <!-- Header Stats -->
    <header class="issues-page__header">
      <div class="issues-page__header-title">
        <h1 class="issues-page__h1">AI 이슈 탐지</h1>
        <p class="issues-page__h1-desc">실시간 시장 모멘텀 및 테마 분석</p>
      </div>
      <div class="issues-page__stats">
        <div class="issues-page__stat-item">
          <span class="issues-page__stat-label">탐지된 이슈</span>
          <span class="issues-page__stat-value">{{ issues.length }}개</span>
        </div>
        <div class="issues-page__stat-item">
          <span class="issues-page__stat-label">상승 테마</span>
          <span class="issues-page__stat-value text-red-600">7개</span>
        </div>
        <div class="issues-page__stat-item">
          <span class="issues-page__stat-label">하락 테마</span>
          <span class="issues-page__stat-value text-blue-600">3개</span>
        </div>
      </div>
    </header>

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
        <issue-detail-section :issue="selectedIssue" @propose="handleProposeClick" />
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
import IssueBubbleChart from '~/components/issues/IssueBubbleChart.vue'
import IssueAnalysisSide from '~/components/issues/IssueAnalysisSide.vue'
import IssueDetailSection from '~/components/issues/IssueDetailSection.vue'
import IssueProposalModal from '~/components/issues/IssueProposalModal.vue'
import { issueData, largeCapIssueData } from '~/utils/issueDetectionMockData.js'
import '~/assets/css/pages/issues/IssuesPage.css'

export default {
  name: 'IssuesPage',
  components: {
    IssueBubbleChart,
    IssueAnalysisSide,
    IssueDetailSection,
    IssueProposalModal
  },
  layout: 'default',
  data() {
    return {
      issueType: 'small', // 'small' or 'large'
      selectedIssueId: null,
      isProposalModalOpen: false,
      selectedIssueForProposal: null
    }
  },
  computed: {
    issues() {
      return this.issueType === 'small' ? issueData : largeCapIssueData
    },
    selectedIssue() {
      if (!this.selectedIssueId) return null
      return this.issues.find((i) => i.id === this.selectedIssueId)
    }
  },
  methods: {
    handleIssueSelect(id) {
      if (this.selectedIssueId === id) {
        this.selectedIssueId = null
      } else {
        this.selectedIssueId = id
        // Smooth scroll to detail section
        this.$nextTick(() => {
          const detail = document.querySelector('.issues-page__detail-section')
          if (detail) {
            detail.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        })
      }
    },
    handleProposeClick(issue) {
      this.selectedIssueForProposal = issue
      this.isProposalModalOpen = true
    },
    handleProposalSend(data) {
      console.log('Sending proposal:', data)
      // In a real app, this would hit an API
    }
  },
  watch: {
    issueType() {
      // Reset selection when switching types
      this.selectedIssueId = null
    }
  }
}
</script>
