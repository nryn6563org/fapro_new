<template>
  <div class="customer-holdings__sum-grid">
    <div class="customer-holdings__sum-card customer-holdings__sum-card-blue">
      <p class="customer-holdings__sum-label">총 투자금액</p>
      <p class="customer-holdings__sum-value">10억 4,300만원</p>
    </div>
    <div class="customer-holdings__sum-card customer-holdings__sum-card-green">
      <p class="customer-holdings__sum-label">현재 평가금액</p>
      <p class="customer-holdings__sum-value">12억</p>
    </div>
    <div class="customer-holdings__sum-card customer-holdings__sum-card-teal">
      <p class="customer-holdings__sum-label">총 수익률</p>
      <div class="customer-holdings__sum-trend">
        <trending-up-icon class="customer-holdings__sum-trend-icon" />
        <p class="customer-holdings__sum-value">+15.02%</p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 보유 종목 모달 - 요약 카드 영역
 */
import { TrendingUpIcon } from "vue-feather-icons";

export default {
  name: "CustomerHoldingsSummary",
  components: {
    TrendingUpIcon,
  },
};
</script>
