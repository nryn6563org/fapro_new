<template>
  <div class="signals-page">
    <!-- 페이지 상단 헤더 영역 -->
    <signals-page-header :formatted-time="formattedTime" @refresh="refreshData" />

    <div class="signals-page__grid">
      <!-- 매수 신호 컬럼 -->
      <signals-page-signal-column
        type="buy"
        :signals="buySignals"
        :open-keys="openKeys"
        @toggle-detail="toggleDetail"
        @open-report="openReport"
        @open-analysis="openAnalysis"
      />

      <!-- 매도 신호 컬럼 -->
      <signals-page-signal-column
        type="sell"
        :signals="sellSignals"
        :open-keys="openKeys"
        @toggle-detail="toggleDetail"
        @open-report="openReport"
        @open-analysis="openAnalysis"
      />
    </div>

    <!-- AI 리포트 상세 모달 -->
    <a-i-report-modal
      :is-open="isReportModalOpen"
      :data="activeReportSignal"
      @close="closeReport"
    />

    <!-- 종합 의견 및 대응 전략 상세 모달 -->
    <a-i-analysis-report-modal
      :is-open="isAnalysisModalOpen"
      :data="activeAnalysisSignal"
      @close="closeAnalysis"
    />
  </div>
</template>

<script>
/**
 * 기능: AI매매신호 메인 페이지 (Modularized)
 */
import SignalsPageHeader from "~/components/signals/SignalsPage/SignalsPageHeader.vue";
import SignalsPageSignalColumn from "~/components/signals/SignalsPage/SignalsPageSignalColumn.vue";
import AIReportModal from "~/components/modal/AIReportModal.vue";
import AIAnalysisReportModal from "~/components/modal/AIAnalysisReportModal.vue";
import { buySignals, sellSignals } from "~/utils/signalsMockData.js";
import "~/assets/css/pages/signals/SignalsPage/SignalsPage.css";

export default {
  name: "SignalsPage",
  components: {
    SignalsPageHeader,
    SignalsPageSignalColumn,
    AIReportModal,
    AIAnalysisReportModal,
  },
  data() {
    return {
      buySignals,
      sellSignals,
      openKeys: [],
      currentTime: new Date(),
      timer: null,
      isReportModalOpen: false,
      activeReportSignal: null,
      isAnalysisModalOpen: false,
      activeAnalysisSignal: null,
    };
  },
  computed: {
    /**
     * @description 현재 시각을 'YYYY.MM.DD HH:MM:SS' 형식의 문자열로 반환합니다.
     */
    formattedTime() {
      const d = this.currentTime;
      return `${String(d.getMonth() + 1).padStart(2, "0")}.${String(
        d.getDate()
      ).padStart(2, "0")}`;
    },
  },
  mounted() {
    // 1초마다 시계 갱신
    this.timer = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  },
  beforeDestroy() {
    // 타이머 정리
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    /**
     * @description 데이터를 새로고침합니다.
     */
    refreshData() {
      this.currentTime = new Date();
    },
    /**
     * @description 특정 신호 카드의 상세 정보 열림 상태를 토글합니다.
     */
    toggleDetail(id) {
      const idx = this.openKeys.indexOf(id);
      if (idx > -1) {
        this.openKeys.splice(idx, 1);
      } else {
        this.openKeys.push(id);
      }
    },
    /**
     * @description AI 리포트 모달을 엽니다.
     */
    openReport(signal) {
      this.activeReportSignal = signal;
      this.isReportModalOpen = true;
    },
    /**
     * @description AI 리포트 모달을 닫습니다.
     */
    closeReport() {
      this.isReportModalOpen = false;
      // 트랜지션 완료 후 데이터 초기화 (선택적)
      setTimeout(() => {
        if (!this.isReportModalOpen) this.activeReportSignal = null;
      }, 300);
    },
    /**
     * @description 종합 분석 리포트 모달을 엽니다.
     */
    openAnalysis(signal) {
      this.activeAnalysisSignal = signal;
      this.isAnalysisModalOpen = true;
    },
    /**
     * @description 종합 분석 리포트 모달을 닫습니다.
     */
    closeAnalysis() {
      this.isAnalysisModalOpen = false;
      setTimeout(() => {
        if (!this.isAnalysisModalOpen) this.activeAnalysisSignal = null;
      }, 300);
    },
  },
};
</script>

