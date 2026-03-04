<template>
  <div class="issues-page">
    <!-- Header & Stats Container -->
    <div class="issues-page__top-section">
      <!-- Header -->
      <header class="issues-header">
        <div class="issues-header__title-wrapper">
          <div class="issues-header__icon-box">
            <disc-icon class="issues-header__icon text-teal-600 w-6 h-6" />
          </div>
          <div>
            <h1 class="issues-header__title">AI이슈포착</h1>
            <p class="issues-header__subtitle">대형주로 구성된 이슈 맵 - 총 {{ issues.length }}개 이슈가 발생했습니다.</p>
          </div>
        </div>
        <div class="issues-header__info">
          <span class="issues-header__info-text">오늘 현재 <strong>{{ issues.length }}개 이슈 포착</strong></span>
          <span class="issues-header__info-date"><calendar-icon class="w-4 h-4 mr-1 inline" /> 3/3</span>
          <span class="issues-header__info-time"><clock-icon class="w-4 h-4 mr-1 inline" /> 08:57</span>
          <button class="issues-header__btn-refresh">
            <refresh-cw-icon class="w-4 h-4" />
          </button>
        </div>
      </header>

      <!-- Stats Bar -->
      <div class="issues-stats-bar">
        <div class="issues-stats-card">
          <div class="issues-stats-card__icon issues-stats-card__icon--teal">
            <bar-chart-2-icon class="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <div class="issues-stats-card__label">오늘 포착된 이슈</div>
            <div class="issues-stats-card__value">24건</div>
          </div>
        </div>
        <div class="issues-stats-card">
          <div class="issues-stats-card__icon issues-stats-card__icon--pink">
            <activity-icon class="w-5 h-5 text-rose-500" />
          </div>
          <div>
            <div class="issues-stats-card__label">강도별 분류</div>
            <div class="issues-stats-card__sub-value">
              <span class="text-rose-600 font-medium">고강도 8건</span> <span class="text-slate-300 mx-1">·</span>
              <span class="text-orange-500 font-medium">중강도 11건</span> <span class="text-slate-300 mx-1">·</span>
              <span class="text-slate-500">저강도 5건</span>
            </div>
          </div>
        </div>
        <div class="issues-stats-card">
          <div class="issues-stats-card__icon issues-stats-card__icon--orange">
            <percent-icon class="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <div class="issues-stats-card__label">종목 분류</div>
            <div class="issues-stats-card__sub-value">
              <span class="text-orange-500 font-medium">중소형주 21종목</span> <span class="text-slate-300 mx-1">·</span>
              <span class="text-slate-600 dark:text-slate-400">대형주 3종목</span>
            </div>
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
import {
  DiscIcon,
  CalendarIcon,
  ClockIcon,
  RefreshCwIcon,
  BarChart2Icon,
  ActivityIcon,
  PercentIcon
} from 'vue-feather-icons'
import IssueBubbleChart from '~/components/issues/IssueBubbleChart.vue'
import IssueAnalysisSide from '~/components/issues/IssueAnalysisSide.vue'
import IssueDetailSection from '~/components/issues/IssueDetailSection.vue'
import IssueProposalModal from '~/components/issues/IssueProposalModal.vue'
import { issueData, largeCapIssueData } from '~/utils/issueDetectionMockData.js'
import '~/assets/css/pages/issues/IssuesPage/IssuesPage.css'

export default {
  name: 'IssuesPage',
  components: {
    IssueBubbleChart,
    IssueAnalysisSide,
    IssueDetailSection,
    IssueProposalModal,
    DiscIcon,
    CalendarIcon,
    ClockIcon,
    RefreshCwIcon,
    BarChart2Icon,
    ActivityIcon,
    PercentIcon
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
  watch: {
    issueType() {
      // Switch selection to the largest issue of the new type
      this.setDefaultIssue()
    }
  },
  created() {
    this.setDefaultIssue()
  },
  methods: {
    setDefaultIssue() {
      if (this.issues && this.issues.length > 0) {
        // Find the issue with the maximum size
        const largestIssue = this.issues.reduce((max, issue) => (issue.size > max.size ? issue : max), this.issues[0])
        this.selectedIssueId = largestIssue.id
      }
    },
    handleIssueSelect(id) {
      this.selectedIssueId = id
    },
    handleProposeClick(issue) {
      this.selectedIssueForProposal = issue
      this.isProposalModalOpen = true
    },
    handleProposalSend(data) {
      console.log('Sending proposal:', data)
      // In a real app, this would hit an API
    }
  }
}
</script>
