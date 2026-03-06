<template>
  <div v-if="customer" class="customer-holdings">
    <div
      class="customer-holdings__modal animate__animated animate__fadeIn animate__faster"
    >
      <!-- Header -->
      <CustomerHoldingsHeader
        :name="customer.name"
        @edit="handleEdit"
        @close="$emit('close')"
      />

      <!-- Body -->
      <div class="customer-holdings__body">
        <!-- Summary Cards -->
        <CustomerHoldingsSummary />

        <!-- Table -->
        <CustomerHoldingsTable :holdings="customer.holdingDetails" />

        <!-- AI Analysis -->
        <CustomerHoldingsAiAnalysis
          :investment-type="customer.investmentType"
        />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 보유 종목 상세 및 AI 분석 모달 (Modal-Vanilla 호환)
 */
import CustomerHoldingsHeader from "~/components/customers/CustomerHoldingsModal/CustomerHoldingsHeader.vue";
import CustomerHoldingsSummary from "~/components/customers/CustomerHoldingsModal/CustomerHoldingsSummary.vue";
import CustomerHoldingsTable from "~/components/customers/CustomerHoldingsModal/CustomerHoldingsTable.vue";
import CustomerHoldingsAiAnalysis from "~/components/customers/CustomerHoldingsModal/CustomerHoldingsAiAnalysis.vue";
import "~/assets/css/pages/customers/CustomerHoldingsModal/CustomerHoldingsModal.css";

export default {
  name: "CustomerHoldingsModal",
  components: {
    CustomerHoldingsHeader,
    CustomerHoldingsSummary,
    CustomerHoldingsTable,
    CustomerHoldingsAiAnalysis,
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
  methods: {
    handleEdit() {
      alert("수정 기능은 준비 중입니다.");
    },
  },
};
</script>
