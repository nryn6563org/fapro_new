<template>
  <!-- ── 대시보드 메인 페이지 ── -->
  <div class="contact-page">
    <!-- ── 페이지 헤더: 타이틀 및 새로고침 버튼 영역 ── -->
    <div class="contact-page__header">
      <div class="contact-page__title-box">
        <h1 class="contact-page__title">AI 컨택 제안</h1>
        <p class="contact-page__subtitle">
          오늘 AI가 추천하는 타겟 고객과 종목을 빠르게 제안해 보세요.
        </p>
      </div>
      <!-- 최종 업데이트 시간 표시 및 새로고침 버튼 -->
      <!-- <div class="contact-page__action-box">
        <div class="contact-page__time-info">
          <p class="contact-page__time-text">{{ formattedTime }}</p>
          <p class="contact-page__time-label">최종 업데이트</p>
        </div>
        <button class="contact-page__refresh-btn" @click="refreshData">
          <refresh-cw-icon size="16" class="contact-page__refresh-icon" />
          <span class="contact-page__refresh-text">새로고침</span>
        </button>
      </div> -->
    </div>

    <!-- ── 오늘의 제안 카드: AI가 추천하는 오늘의 제안 목록 ── -->
    <today-proposal-card
      :current-date="currentDate"
      @propose="openProposalModal"
      @refresh="refreshData"
    />

    <!-- ── 고객 인텔리전스 카드: AI 분석 기반 고객 정보 ── -->
    <customer-intelligence-card @propose="openProposalModal" />

    <!-- 오늘의 제안 통합 모달 -->
    <today-proposal-modal
      v-if="isModalOpen"
      :proposal-type="selectedProposalType"
      :proposal-data="selectedProposalData"
      @close-modal="isModalOpen = false"
    />
  </div>
</template>

<script>
// import { RefreshCwIcon } from "vue-feather-icons";
import TodayProposalCard from "~/components/dashboard/TodayProposalCard.vue";
import CustomerIntelligenceCard from "~/components/dashboard/CustomerIntelligenceCard.vue";
import TodayProposalModal from "~/components/dashboard/TodayProposalModal.vue";
import "~/assets/css/pages/contact/ContactPage/ContactPage.css";

/**
 * 기능: 대시보드 메인 페이지
 * AI 컨택 제안 기능을 제공하며, 오늘의 제안 카드와
 * 고객 인텔리전스 카드를 포함합니다.
 */
export default {
  name: "ContactPage",
  components: {
    // RefreshCwIcon,
    TodayProposalCard,
    CustomerIntelligenceCard,
    TodayProposalModal,
  },
  data() {
    return {
      // 한국어 형식으로 포맷된 현재 날짜 (예: "3월 4일")
      currentDate: new Date().toLocaleDateString("ko-KR", {
        month: "long",
        day: "numeric",
      }),
      // 실시간 갱신용 현재 시각 객체
      currentTime: new Date(),
      // setInterval 타이머 참조 (컴포넌트 소멸 시 정리용)
      timer: null,
      // 모달 제어 상태
      isModalOpen: false,
      selectedProposalType: "target-customer",
      selectedProposalData: {},
    };
  },
  computed: {
    /**
     * @description 현재 시각을 'YYYY.MM.DD HH:MM:SS' 형식의 문자열로 반환합니다.
     * @returns {string} 포맷된 날짜·시간 문자열
     */
    /*
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
    */
  },
  mounted() {
    // 1초마다 currentTime을 갱신하여 실시간 시계 표시
    // this.timer = setInterval(() => {
    //   this.currentTime = new Date();
    // }, 1000);
  },
  beforeDestroy() {
    // 컴포넌트 소멸 전 타이머 정리 (메모리 누수 방지)
    // if (this.timer) clearInterval(this.timer);
  },
  methods: {
    /**
     * @description 페이지 데이터를 새로고침합니다.
     * 현재 시각을 갱신하고 API 재조회를 트리거합니다.
     */
    refreshData() {
      this.currentTime = new Date();
      // API 데이터 새로고침 트리거
      console.log("데이터 새로고침 중...");
    },

    /**
     * @description 제안 모달을 엽니다.
     * 하위 컴포넌트의 'propose' 이벤트를 수신하여
     * Modal-Vanilla 기반 모달을 구동합니다.
     * @param {string} type - 제안 유형 (예: 'stock', 'contact')
     * @param {Object} item - 제안 대상 고객 또는 종목 객체
     */
    openProposalModal(type, item) {
      if (type === "CustomerIntelligence") {
        this.selectedProposalType = "smart-client";
      } else {
        this.selectedProposalType = type;
      }
      this.selectedProposalData = item;
      this.isModalOpen = true;
    },
  },
};
</script>

