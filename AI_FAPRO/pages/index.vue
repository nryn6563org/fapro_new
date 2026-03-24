<template>
  <div class="index-page">
    <div class="index-page__header">
      <div class="index-page__title-box">
        <h1 class="index-page__title">AI 인텔리전스 리포트</h1>
        <p class="index-page__subtitle">
          최근 AI매매신호가 발생한 종목의 AI분석리포트 입니다.
        </p>
      </div>
      <div class="index-page__action-box">
        <div class="index-page__time-info">
          <p class="index-page__time-text">{{ formattedTime }}</p>
        </div>
        <button class="index-page__refresh-btn" @click="refreshData">
          <refresh-cw-icon size="16" class="index-page__refresh-icon" />
          <span class="index-page__refresh-text">새로고침</span>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="index-page__content">
      <div class="index-page__summary-bar">
        <p class="index-page__summary-text">
          총
          <span class="index-page__summary-count"
            >{{ aiReports.length }}개</span
          >의 AI 리포트
        </p>
      </div>

      <div class="index-page__split-grid">
        <!-- ── 매수 신호 컬럼 ── -->
        <div class="index-page__column">
          <div class="index-page__card-list">
            <a-i-report-card
              v-for="report in buyReports"
              :key="report.id"
              :report="report"
              @open-report="openReport"
              @open-analysis="openAnalysis"
            />
            <div v-if="buyReports.length === 0" class="index-page__empty">
              매수 신호가 없습니다.
            </div>
          </div>
        </div>

        <!-- ── 매도 신호 컬럼 ── -->
        <div class="index-page__column">
          <div class="index-page__card-list">
            <a-i-report-card
              v-for="report in sellReports"
              :key="report.id"
              :report="report"
              @open-report="openReport"
              @open-analysis="openAnalysis"
            />
            <div v-if="sellReports.length === 0" class="index-page__empty">
              매도 신호가 없습니다.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <a-i-report-modal
      :is-open="isReportModalOpen"
      :data="activeReport"
      @close="closeReport"
    />

    <!-- Analysis Modal -->
    <a-i-analysis-report-modal
      :is-open="isAnalysisModalOpen"
      :data="activeAnalysisReport"
      @close="closeAnalysis"
    />
  </div>
</template>

<script>
/**
 * 기능: AI 종목발굴(인텔리전스 리포트) 페이지
 */
import { RefreshCwIcon } from "vue-feather-icons";
import AIReportCard from "~/components/discovery/AIReportCard.vue";
import AIReportModal from "~/components/modal/AIReportModal.vue";
import AIAnalysisReportModal from "~/components/modal/AIAnalysisReportModal.vue";
import { aiReports } from "~/utils/discoveryMockData.js";
import "~/assets/css/pages/index/IndexPage/IndexPage.css";

export default {
  name: "IndexPage",
  components: {
    RefreshCwIcon,
    AIReportCard,
    AIReportModal,
    AIAnalysisReportModal,
  },
  data() {
    return {
      aiReports,
      currentTime: new Date(),
      timer: null,
      isReportModalOpen: false,
      activeReport: null,
      isAnalysisModalOpen: false,
      activeAnalysisReport: null,
    };
  },
  computed: {
    formattedTime() {
      const d = this.currentTime;
      return `${String(d.getMonth() + 1).padStart(2, "0")}.${String(
        d.getDate()
      ).padStart(2, "0")}`;
    },
    /**
     * @type {Array} 매수 신호 리포트 (최대 4개)
     */
    buyReports() {
      return this.aiReports
        .filter((r) => r.signalBadge === "매수신호")
        .slice(0, 4);
    },
    /**
     * @type {Array} 매도 신호 리포트 (최대 4개)
     */
    sellReports() {
      return this.aiReports
        .filter((r) => r.signalBadge === "매도신호")
        .slice(0, 4);
    },
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
      // To simulate refresh UX
    },
    openReport(report) {
      this.activeReport = report;
      this.isReportModalOpen = true;
    },
    closeReport() {
      this.isReportModalOpen = false;
      setTimeout(() => {
        this.activeReport = null;
      }, 300);
    },
    openAnalysis(report) {
      this.activeAnalysisReport = report;
      this.isAnalysisModalOpen = true;
    },
    closeAnalysis() {
      this.isAnalysisModalOpen = false;
      setTimeout(() => {
        this.activeAnalysisReport = null;
      }, 300);
    },
  },
};
</script>
