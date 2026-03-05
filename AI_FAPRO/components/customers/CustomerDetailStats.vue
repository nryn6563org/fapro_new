<template>
  <div class="customer-stats">
    <div class="customer-stats__grid">
      <!-- Total Investment -->
      <div class="customer-stats__card customer-stats__card--blue">
        <h4 class="customer-stats__label customer-stats__label--blue">
          총 투자금액
        </h4>
        <p class="customer-stats__value customer-stats__value--blue">
          {{ customer.totalInvestment || "-" }}
        </p>
      </div>

      <!-- Current Valuation -->
      <div class="customer-stats__card customer-stats__card--green">
        <h4 class="customer-stats__label customer-stats__label--green">
          현재 평가금액
        </h4>
        <p class="customer-stats__value customer-stats__value--green">
          {{ customer.currentValuation || "-" }}
        </p>
      </div>

      <!-- Deposit -->
      <div class="customer-stats__card customer-stats__card--orange">
        <h4 class="customer-stats__label customer-stats__label--orange">
          예수금
        </h4>
        <p class="customer-stats__value customer-stats__value--orange">
          {{ customer.deposit || "-" }}
        </p>
      </div>

      <!-- Total Return Rate -->
      <div class="customer-stats__card customer-stats__card--teal">
        <h4 class="customer-stats__label customer-stats__label--teal">
          총 수익률
        </h4>
        <div class="customer-stats__value-box">
          <trending-up-icon
            v-if="isPositiveReturn"
            class="customer-stats__icon"
          />
          <p class="customer-stats__value customer-stats__value--teal">
            {{ customer.totalReturnRate || "-" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 상세 정보의 상단 통계 지표 박스 (Design #26)
 */
import { TrendingUpIcon } from "vue-feather-icons";
import "~/assets/css/pages/customers/CustomerDetailModal/CustomerDetailStats.css";

export default {
  name: "CustomerDetailStats",
  components: {
    TrendingUpIcon,
  },
  props: {
    customer: { type: Object, required: true },
  },
  computed: {
    isPositiveReturn() {
      if (!this.customer.totalReturnRate) return false;
      return this.customer.totalReturnRate.includes("+");
    },
  },
};
</script>
