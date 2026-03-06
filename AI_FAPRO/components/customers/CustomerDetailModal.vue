<template>
  <div v-if="customer" id="customer-detail-modal" class="customer-modal">
    <div class="customer-modal__overlay" @click="$emit('close')"></div>
    <div class="customer-modal__container animate__animated animate__fadeInUp">
      <!-- Header -->
      <div class="customer-modal__header">
        <div class="customer-modal__header-left">
          <div class="customer-modal__icon-box">
            <user-icon class="customer-modal__icon" />
          </div>
          <div>
            <h2 class="customer-modal__title">{{ customer.name }}님의 정보</h2>
            <p class="customer-modal__subtitle">고객 상세 정보</p>
          </div>
        </div>
        <button class="customer-modal__close" @click="$emit('close')">
          <x-icon class="customer-modal__close-icon" />
        </button>
      </div>

      <!-- Body -->
      <div class="customer-modal__body">
        <div class="customer-modal__content">
          <!-- 1. 통계 요약 -->
          <customer-detail-stats :customer="customer" />

          <!-- 2. 보유종목 테이블 -->
          <customer-detail-holdings :holdings="customer.holdingDetails" />

          <!-- 3. AI 분석 리포트 -->
          <customer-detail-analysis :analysis-data="customer.aiAnalysis" />

          <!-- 4. 기본 정보 & 메모 -->
          <customer-detail-info :customer="customer" />
        </div>
      </div>

      <!-- Footer -->
      <div class="customer-modal__footer">
        <div>
          <button
            v-if="customer.holdingDetails && customer.holdingDetails.length"
            class="customer-modal__btn customer-modal__btn--outline"
            @click="$emit('view-holdings', customer)"
          >
            <eye-icon class="customer-modal__btn-icon" /> 보유종목 상세보기
          </button>
        </div>
        <button
          class="customer-modal__btn customer-modal__btn--outline"
          @click="$emit('close')"
        >
          닫기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 정보 상세 조회 모달 (fapro-modal 디자인 시스템 적용)
 */
import { UserIcon, XIcon, EyeIcon } from "vue-feather-icons";
import CustomerDetailStats from "~/components/customers/CustomerDetailStats.vue";
import CustomerDetailHoldings from "~/components/customers/CustomerDetailHoldings.vue";
import CustomerDetailAnalysis from "~/components/customers/CustomerDetailAnalysis.vue";
import CustomerDetailInfo from "~/components/customers/CustomerDetailInfo.vue";
import "~/assets/css/pages/customers/CustomerDetailModal/CustomerDetailModal.css";

export default {
  name: "CustomerDetailModal",
  components: {
    UserIcon,
    XIcon,
    EyeIcon,
    CustomerDetailStats,
    CustomerDetailHoldings,
    CustomerDetailAnalysis,
    CustomerDetailInfo,
  },
  props: {
    customer: { type: Object, default: null },
  },
};
</script>
