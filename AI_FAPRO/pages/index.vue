<template>
  <!-- ── 대시보드 메인 페이지 ── -->
  <div class="index-page">
    <!-- ── 페이지 헤더: 타이틀 및 새로고침 버튼 영역 ── -->
    <div class="index-page__header">
      <div class="index-page__title-box">
        <h1 class="index-page__title">AI 컨택 제안</h1>
        <p class="index-page__subtitle">
          오늘 AI가 추천하는 타겟 고객과 종목을 빠르게 제안해 보세요.
        </p>
      </div>
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
import TodayProposalCard from "~/components/dashboard/TodayProposalCard.vue";
import CustomerIntelligenceCard from "~/components/dashboard/CustomerIntelligenceCard.vue";
import TodayProposalModal from "~/components/dashboard/TodayProposalModal.vue";
import "~/assets/css/pages/index/IndexPage/IndexPage.css";

/**
 * 기능: 대시보드 메인 페이지
 * AI 컨택 제안 기능을 제공하며, 오늘의 제안 카드와
 * 고객 인텔리전스 카드를 포함합니다.
 */
export default {
  name: "IndexPage",
  components: {
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
      // 모달 제어 상태
      isModalOpen: false,
      selectedProposalType: "target-customer",
      selectedProposalData: {},
    };
  },
  methods: {
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

