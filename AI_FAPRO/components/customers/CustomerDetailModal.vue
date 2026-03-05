<template>
  <div class="customer-detail">
    <div class="customer-detail__modal animate__animated animate__fadeInUp">
      <!-- Header -->
      <div class="customer-detail__header">
        <div class="customer-detail__header-left">
          <div class="customer-detail__avatar">
            <user-icon class="customer-detail__avatar-icon" />
          </div>
          <div>
            <h2 class="customer-detail__title">{{ customer.name }}</h2>
            <p class="customer-detail__subtitle">고객 상세 정보</p>
          </div>
        </div>
        <div class="customer-detail__header-right">
          <button class="customer-detail__edit-btn" @click="handleEdit">
            <edit-icon class="customer-detail__btn-icon" />
            수정
          </button>
          <button class="customer-detail__close-btn" @click="$emit('close')">
            <x-icon class="customer-detail__close-icon" />
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="customer-detail__body">
        <div class="customer-detail__scroll-area">
          <!-- 1. Stats -->
          <customer-detail-stats :customer="customer" />

          <!-- 2. Holdings Table -->
          <customer-detail-holdings :holdings="customer.holdingDetails" />

          <!-- 3. AI Analysis -->
          <customer-detail-analysis :analysis-data="customer.aiAnalysis" />

          <!-- 4. Footer Info -->
          <customer-detail-info :customer="customer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 상세 정보 조회 모달 (래퍼, Modal-Vanilla 호환)
 */
import { UserIcon, EditIcon, XIcon } from "vue-feather-icons";
import CustomerDetailStats from "~/components/customers/CustomerDetailStats.vue";
import CustomerDetailHoldings from "~/components/customers/CustomerDetailHoldings.vue";
import CustomerDetailAnalysis from "~/components/customers/CustomerDetailAnalysis.vue";
import CustomerDetailInfo from "~/components/customers/CustomerDetailInfo.vue";
import "~/assets/css/pages/customers/CustomerDetailModal/CustomerDetailModal.css";

export default {
  name: "CustomerDetailModal",
  components: {
    UserIcon,
    EditIcon,
    XIcon,
    CustomerDetailStats,
    CustomerDetailHoldings,
    CustomerDetailAnalysis,
    CustomerDetailInfo,
  },
  props: {
    customer: { type: Object, required: true },
  },
  methods: {
    handleEdit() {
      alert("수정 기능은 준비 중입니다.");
    },
  },
};
</script>
