<template>
  <div class="discovery-page">
    <!-- Header -->
    <div class="discovery-page__header-card">
      <div class="discovery-page__header-inner">
        <div class="discovery-page__title-box">
          <div class="discovery-page__icon-wrap">
            <file-text-icon class="discovery-page__title-icon" />
          </div>
          <div>
            <h1 class="discovery-page__title">AI 인텔리전스 리포트</h1>
            <p class="discovery-page__subtitle">
              최근 AI매매신호가 발생한 종목의 AI분석리포트 입니다.
            </p>
          </div>
        </div>
        <div class="discovery-page__action-box">
          <div class="discovery-page__time-info">
            <calendar-icon class="discovery-page__time-icon" />
            <span>{{ dateString }}</span>
            <clock-icon class="discovery-page__time-icon discovery-page__time-icon--ml" />
            <span>{{ timeString }}</span>
          </div>
          <button class="discovery-page__btn-refresh" @click="refreshData">
            <refresh-cw-icon size="14" />
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="discovery-page__content">
      <div class="discovery-page__summary-bar">
        <p class="discovery-page__summary-text">
          총 <span class="discovery-page__summary-count">{{ aiReports.length }}개</span>의 AI 리포트
        </p>
      </div>

      <div class="discovery-page__grid">
        <a-i-report-card
          v-for="report in aiReports"
          :key="report.id"
          :report="report"
          @open-report="openReport"
        />
      </div>
    </div>

    <!-- Details Modal -->
    <a-i-report-detail-modal
      :is-open="isReportModalOpen"
      :report="activeReport"
      @close="closeReport"
    />
  </div>
</template>

<script>
/**
 * 기능: AI 종목발굴(인텔리전스 리포트) 페이지
 */
import { FileTextIcon, CalendarIcon, ClockIcon, RefreshCwIcon } from 'vue-feather-icons'
import AIReportCard from '~/components/discovery/AIReportCard.vue'
import AIReportDetailModal from '~/components/discovery/AIReportDetailModal.vue'
import { aiReports } from '~/utils/discoveryMockData.js'
import '~/assets/css/pages/discovery/DiscoveryPage.css'

export default {
  name: 'DiscoveryPage',
  components: {
    FileTextIcon,
    CalendarIcon,
    ClockIcon,
    RefreshCwIcon,
    AIReportCard,
    AIReportDetailModal
  },
  data() {
    return {
      aiReports,
      currentTime: new Date(),
      timer: null,
      isReportModalOpen: false,
      activeReport: null
    }
  },
  computed: {
    dateString() {
      const d = this.currentTime
      return `${d.getMonth() + 1}/${d.getDate()}`
    },
    timeString() {
      const d = this.currentTime
      return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.currentTime = new Date()
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer)
  },
  methods: {
    refreshData() {
      this.currentTime = new Date()
      // To simulate refresh UX
    },
    openReport(report) {
      this.activeReport = report
      this.isReportModalOpen = true
    },
    closeReport() {
      this.isReportModalOpen = false
      setTimeout(() => {
        this.activeReport = null
      }, 300)
    }
  }
}
</script>
