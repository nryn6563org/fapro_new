<template>
  <div class="discovery-page">
    <div class="discovery-page__header">
      <div class="discovery-page__title-box">
        <h1 class="discovery-page__title">AI 인텔리전스 리포트</h1>
        <p class="discovery-page__subtitle">
          최근 AI매매신호가 발생한 종목의 AI분석리포트 입니다.
        </p>
      </div>
      <div class="discovery-page__action-box">
        <div class="discovery-page__time-info">
          <p class="discovery-page__time-text">{{ formattedTime }}</p>
          <p class="discovery-page__time-label">최종 업데이트</p>
        </div>
        <button class="discovery-page__refresh-btn" @click="refreshData">
          <refresh-cw-icon size="16" class="discovery-page__refresh-icon" />
          <span class="discovery-page__refresh-text">새로고침</span>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="discovery-page__content">
      <div class="discovery-page__summary-bar">
        <p class="discovery-page__summary-text">
          종
          <span class="discovery-page__summary-count"
            >{{ aiReports.length }}개</span
          >의 AI 리포트
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
import { RefreshCwIcon } from "vue-feather-icons";
import AIReportCard from "~/components/discovery/AIReportCard.vue";
import AIReportDetailModal from "~/components/discovery/AIReportDetailModal.vue";
import { aiReports } from "~/utils/discoveryMockData.js";
import "~/assets/css/pages/discovery/DiscoveryPage/DiscoveryPage.css";

export default {
  name: "DiscoveryPage",
  components: {
    RefreshCwIcon,
    AIReportCard,
    AIReportDetailModal,
  },
  data() {
    return {
      aiReports,
      currentTime: new Date(),
      timer: null,
      isReportModalOpen: false,
      activeReport: null,
    };
  },
  computed: {
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
    formattedTimeShort() {
      const d = this.currentTime;
      return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(
        d.getDate()
      ).padStart(2, "0")}`;
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
  },
};
</script>
