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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M10 16H5V21M14 8H19V3M4.58301 9.0034C5.14369 7.61566 6.08244 6.41304 7.29255 5.53223C8.50266 4.65141 9.93686 4.12752 11.4298 4.02051C12.9227 3.9135 14.4147 4.2274 15.7381 4.92661C17.0615 5.62582 18.1612 6.68254 18.9141 7.97612M19.4176 14.9971C18.8569 16.3848 17.9181 17.5874 16.708 18.4682C15.4979 19.3491 14.0652 19.8723 12.5723 19.9793C11.0794 20.0863 9.58606 19.7725 8.2627 19.0732C6.93933 18.374 5.83882 17.3175 5.08594 16.0239" stroke="#5368FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="index-page__refresh-text">새로고침</span>
        </button>
      </div>
    </div>

    <!-- 시간 필터 바 -->
    <div class="index-page__time-filter">
      <div class="index-page__time-filter-top">
        <button
          class="index-page__time-slot"
          :class="{ 'index-page__time-slot--active': activeTimeSlot === 'all' }"
          @click="activeTimeSlot = 'all'"
        >
          전체보기
        </button>
      </div>
      <div class="index-page__time-filter-row">
        <div class="index-page__time-group">
          <span class="index-page__time-group-label">오전</span>
          <button
            v-for="slot in amSlots"
            :key="slot"
            class="index-page__time-slot"
            :class="{ 'index-page__time-slot--active': activeTimeSlot === slot }"
            @click="activeTimeSlot = slot"
          >
            {{ slot }}
          </button>
        </div>
        <div class="index-page__time-group">
          <span class="index-page__time-group-label">오후</span>
          <button
            v-for="slot in pmSlots"
            :key="slot"
            class="index-page__time-slot"
            :class="{ 'index-page__time-slot--active': activeTimeSlot === slot }"
            @click="activeTimeSlot = slot"
          >
            {{ slot }}
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="index-page__content">
      <div class="index-page__summary-bar">
        <p class="index-page__summary-text">
          총
          <span class="index-page__summary-count"
            >{{ filteredReports.length }}개</span
          >의 AI 리포트
        </p>
      </div>

      <div class="index-page__columns">
        <!-- 매수 신호 컬럼 -->
        <div class="index-page__column">
          <div class="index-page__grid">
            <a-i-report-card
              v-for="report in buyReports"
              :key="report.id"
              :report="report"
              @open-report="openReport"
              @open-analysis="openAnalysis"
            />
            <div v-if="buyReports.length === 0" class="index-page__empty">
              해당 시간대의 매수 리포트가 없습니다.
            </div>
          </div>
        </div>

        <!-- 매도 신호 컬럼 -->
        <div class="index-page__column">
          <div class="index-page__grid">
            <a-i-report-card
              v-for="report in sellReports"
              :key="report.id"
              :report="report"
              @open-report="openReport"
              @open-analysis="openAnalysis"
            />
            <div v-if="sellReports.length === 0" class="index-page__empty">
              해당 시간대의 매도 리포트가 없습니다.
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
      @reopen="isReportModalOpen = true"
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
import AIReportCard from "~/components/discovery/AIReportCard.vue";
import AIReportModal from "~/components/modal/AIReportModal.vue";
import AIAnalysisReportModal from "~/components/modal/AIAnalysisReportModal.vue";
import { aiReports } from "~/utils/discoveryMockData.js";
import "~/assets/css/pages/index/IndexPage/IndexPage.css";

export default {
  name: "IndexPage",
  components: {
    AIReportCard,
    AIReportModal,
    AIAnalysisReportModal,
  },
  data() {
    return {
      aiReports,
      currentTime: new Date(),
      timer: null,
      activeTimeSlot: "all",
      amSlots: ["09:00", "09:20", "09:40", "10:00", "10:20", "10:40", "11:00", "11:20", "11:40", "12:00"],
      pmSlots: ["12:20", "12:40", "13:00", "13:20", "13:40", "14:00", "14:20", "14:40", "15:00", "15:20"],
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
    /** 시간 필터 적용된 리포트 목록 */
    filteredReports() {
      if (this.activeTimeSlot === "all") return this.aiReports;
      const [h, m] = this.activeTimeSlot.split(":").map(Number);
      const slotMin = h * 60 + m;
      return this.aiReports.filter((r) => {
        if (!r.generatedTime) return false;
        const [rh, rm] = r.generatedTime.split(":").map(Number);
        const rMin = rh * 60 + rm;
        return rMin >= slotMin && rMin < slotMin + 20;
      });
    },
    /** 매수 리포트 분류 */
    buyReports() {
      return this.filteredReports.filter(r => r.signalBadge === '매수신호');
    },
    /** 매도 리포트 분류 */
    sellReports() {
      return this.filteredReports.filter(r => r.signalBadge === '매도신호' || r.signalBadge === '중립신호');
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
