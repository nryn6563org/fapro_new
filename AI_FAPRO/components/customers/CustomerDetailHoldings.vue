<template>
  <div class="customer-holdings">
    <div class="customer-holdings__section-label">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10.0003 18.3334C14.6027 18.3334 18.3337 14.6025 18.3337 10.0001C18.3337 5.39771 14.6027 1.66675 10.0003 1.66675C5.39795 1.66675 1.66699 5.39771 1.66699 10.0001C1.66699 14.6025 5.39795 18.3334 10.0003 18.3334Z" stroke="#14B8A6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z" stroke="#14B8A6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M9.99967 11.6666C10.9201 11.6666 11.6663 10.9204 11.6663 9.99992C11.6663 9.07944 10.9201 8.33325 9.99967 8.33325C9.0792 8.33325 8.33301 9.07944 8.33301 9.99992C8.33301 10.9204 9.0792 11.6666 9.99967 11.6666Z" stroke="#14B8A6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <h5 class="customer-holdings__section-title">보유종목 상세 (총 {{ holdings.length }}종목)</h5>
    </div>

    <div class="customer-holdings__table-wrapper">
      <table class="customer-holdings__table">
        <thead class="customer-holdings__thead">
          <tr>
            <th class="customer-holdings__th text-left">종목명</th>
            <th class="customer-holdings__th text-right">보유수량</th>
            <th class="customer-holdings__th text-right">평균단가</th>
            <th class="customer-holdings__th text-right">현재가</th>
            <th class="customer-holdings__th text-right">평가금액</th>
            <th class="customer-holdings__th text-right">손익</th>
            <th class="customer-holdings__th text-center">수익률</th>
          </tr>
        </thead>
        <tbody class="customer-holdings__tbody">
          <tr v-for="(holding, index) in holdings" :key="index" class="customer-holdings__tr">
            <td class="customer-holdings__td customer-holdings__td--name">
              {{ holding.name }}
            </td>
            <td class="customer-holdings__td text-right font-medium">
              {{ holding.quantity }}
            </td>
            <td class="customer-holdings__td text-right text-slate-500">
              {{ holding.avgPrice || "-" }}
            </td>
            <td class="customer-holdings__td text-right font-semibold">
              {{ holding.currentPrice || "-" }}
            </td>
            <td class="customer-holdings__td text-right customer-holdings__td--value">
              {{ holding.value }}
            </td>
            <td class="customer-holdings__td text-right">
              <div class="customer-holdings__profit-box justify-end">
                <trending-up-icon v-if="isUp(holding.profit)" class="w-3.5 h-3.5 text-buy" />
                <trending-down-icon v-else-if="isDown(holding.profit)" class="w-3.5 h-3.5 text-sell" />
                <span :class="getProfitClass(holding.profit)">{{ holding.profit || "-" }}</span>
              </div>
            </td>
            <td class="customer-holdings__td text-center">
              <span :class="['customer-holdings__rate-badge', getProfitClass(holding.profitRate)]">
                {{ holding.profitRate || "-" }}
              </span>
            </td>
          </tr>
          <tr v-if="!holdings || holdings.length === 0">
            <td colspan="7" class="customer-holdings__td text-center py-12 text-slate-400">
              보유 종목 데이터가 없습니다.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 보유종목 목록 테이블 (Redesign)
 */
import { TrendingUpIcon, TrendingDownIcon } from "vue-feather-icons";
import "~/assets/css/pages/customers/CustomerDetailModal/CustomerDetailHoldings.css";

export default {
  name: "CustomerDetailHoldings",
  components: {
    TrendingUpIcon,
    TrendingDownIcon,
  },
  props: {
    holdings: { type: Array, default: () => [] },
  },
  methods: {
    isUp(val) {
      return val?.includes("+");
    },
    isDown(val) {
      return val?.includes("-");
    },
    getProfitClass(val) {
      if (this.isUp(val)) return "text-profit-up";
      if (this.isDown(val)) return "text-profit-down";
      return "text-slate-600";
    }
  }
};
</script>
