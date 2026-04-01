<template>
  <div v-if="customer" id="customer-detail-modal" class="customer-modal">
    <div class="customer-modal__overlay" @click="$emit('close')"></div>
    <div class="customer-modal__container animate__animated animate__fadeIn animate__faster">
      <!-- Header -->
      <div class="customer-modal__header">
        <div class="customer-modal__header-left">
          <div class="customer-modal__icon-box">
            <user-icon class="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 class="customer-modal__title">{{ customer.name }}님의 정보</h2>
            <p class="customer-modal__subtitle">고객 상세 정보</p>
          </div>
        </div>
        <button class="customer-modal__close" @click="$emit('close')">
          <x-icon class="w-6 h-6" />
        </button>
      </div>

      <!-- Body -->
      <div class="customer-modal__body">
        <div class="customer-modal__content">
          <div class="customer-modal__update-wrapper">
            <span class="customer-modal__update-time">업데이트 03/10 15:30</span>
          </div>
          <!-- 1. 통계 요약 -->
          <customer-detail-stats :customer="customer" />

          <!-- 2. 보유종목 테이블 -->
          <customer-detail-holdings :holdings="customer.holdingDetails" />

          <!-- 3. AI 분석 리포트 -->
          <customer-detail-analysis :analysis-data="customer.aiAnalysis" />

          <!-- 4. 기본 정보 & 메모 -->
          <customer-detail-info :customer="customer" />

          <!-- 5. 고객 제안 히스토리 -->
          <customer-detail-proposal-history :proposal-history="customer.proposalHistory || []" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 정보 상세 조회 모달 (fapro-modal 디자인 시스템 적용)
 */
import { UserIcon, XIcon } from "vue-feather-icons";
import CustomerDetailStats from "~/components/customers/CustomerDetailStats.vue";
import CustomerDetailHoldings from "~/components/customers/CustomerDetailHoldings.vue";
import CustomerDetailAnalysis from "~/components/customers/CustomerDetailAnalysis.vue";
import CustomerDetailInfo from "~/components/customers/CustomerDetailInfo.vue";
import CustomerDetailProposalHistory from "~/components/customers/CustomerDetailProposalHistory.vue";
import "~/assets/css/pages/customers/CustomerDetailModal/CustomerDetailModal.css";

export default {
  name: "CustomerDetailModal",
  components: {
    UserIcon,
    XIcon,
    CustomerDetailStats,
    CustomerDetailHoldings,
    CustomerDetailAnalysis,
    CustomerDetailInfo,
    CustomerDetailProposalHistory,
  },
  props: {
    customer: { type: Object, default: null },
  },
  mounted() {
    document.body.classList.add("modal-open");
  },
  beforeDestroy() {
    document.body.classList.remove("modal-open");
  },
};
</script>

