<template>
  <div class="customer-stats">
    <div class="customer-stats__grid">
      <!-- 1. 총 투자금액 -->
      <div class="customer-stats__card customer-stats__card--investment">
        <h4 class="customer-stats__label customer-stats__label--investment">총 투자금액</h4>
        <p class="customer-stats__value customer-stats__value--investment">
          {{ customer.totalInvestment || "0원" }}
        </p>
      </div>

      <!-- 2. 현재 평가금액 -->
      <div class="customer-stats__card customer-stats__card--valuation">
        <h4 class="customer-stats__label customer-stats__label--valuation">현재 평가금액</h4>
        <p class="customer-stats__value customer-stats__value--valuation">
          {{ customer.currentValuation || "0원" }}
        </p>
      </div>

      <!-- 3. 예수금 -->
      <div class="customer-stats__card customer-stats__card--deposit">
        <h4 class="customer-stats__label customer-stats__label--deposit">예수금</h4>
        <p class="customer-stats__value customer-stats__value--deposit">
          {{ customer.deposit || "0원" }}
        </p>
      </div>

      <!-- 4. 총 수익률 -->
      <div class="customer-stats__card customer-stats__card--return">
        <h4 class="customer-stats__label customer-stats__label--return">총 수익률</h4>
        <div class="customer-stats__value-box">
          <trending-up-icon v-if="isPositive" class="customer-stats__icon--return" />
          <trending-down-icon v-else-if="isNegative" class="customer-stats__icon--return text-blue-500" />
          <p class="customer-stats__value customer-stats__value--return">
            {{ customer.totalReturnRate || "0%" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 상세 정보의 상단 통계 지표 박스 (Redesign)
 */
import { TrendingUpIcon, TrendingDownIcon } from "vue-feather-icons";
import "~/assets/css/pages/customers/CustomerDetailModal/CustomerDetailStats.css";

export default {
  name: "CustomerDetailStats",
  components: {
    TrendingUpIcon,
    TrendingDownIcon,
  },
  props: {
    customer: { type: Object, required: true },
  },
  computed: {
    isPositive() {
      return this.customer.totalReturnRate?.includes("+");
    },
    isNegative() {
      return this.customer.totalReturnRate?.includes("-");
    }
  }
};
</script>
