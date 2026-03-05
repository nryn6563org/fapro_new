<template>
  <div class="holdings-modal__table-wrapper">
    <table class="holdings-modal__table">
      <thead>
        <tr>
          <th class="holdings-modal__th">종목명</th>
          <th class="holdings-modal__th text-right">보유주수</th>
          <th class="holdings-modal__th text-right">평균 매수가</th>
          <template v-if="calculated">
            <th class="holdings-modal__th text-right">현재가</th>
            <th class="holdings-modal__th text-right">평가금액</th>
            <th class="holdings-modal__th text-right">손익률</th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(holding, idx) in holdingsDetail" :key="idx">
          <td class="holdings-modal__td font-bold">{{ holding.name }}</td>
          <td class="holdings-modal__td text-right">
            {{ holding.quantity.toLocaleString() }}주
          </td>
          <td class="holdings-modal__td text-right">
            {{ holding.avgPrice.toLocaleString() }}원
          </td>
          <template v-if="calculated">
            <td class="holdings-modal__td text-right font-bold">
              {{ getCurrentPrice(holding.name).toLocaleString() }}원
            </td>
            <td class="holdings-modal__td text-right font-bold">
              {{
                (
                  getCurrentPrice(holding.name) * holding.quantity
                ).toLocaleString()
              }}원
            </td>
            <td class="holdings-modal__td text-right">
              <div
                class="flex items-center justify-end gap-1"
                :class="getReturnColor(holding)"
              >
                <trending-up-icon
                  v-if="getReturnRate(holding) >= 0"
                  class="w-3 h-3"
                />
                <trending-down-icon v-else class="w-3 h-3" />
                <span class="font-black"
                  >{{ getReturnRate(holding).toFixed(2) }}%</span
                >
              </div>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/**
 * 기능: 보유종목 상세 테이블
 */
import { TrendingUpIcon, TrendingDownIcon } from "vue-feather-icons";
import { currentPrices } from "~/utils/clientMockData.js";
import "~/assets/css/pages/clients/ClientHoldingsTable/ClientHoldingsTable.css";

export default {
  name: "ClientHoldingsTable",
  components: {
    TrendingUpIcon,
    TrendingDownIcon,
  },
  props: {
    holdingsDetail: {
      type: Array,
      required: true,
    },
    calculated: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentPrices,
    };
  },
  methods: {
    getCurrentPrice(name) {
      return this.currentPrices[name] || 0;
    },
    getReturnRate(holding) {
      const current = this.getCurrentPrice(holding.name);
      if (!current) return 0;
      return ((current - holding.avgPrice) / holding.avgPrice) * 100;
    },
    getReturnColor(holding) {
      return this.getReturnRate(holding) >= 0
        ? "text-red-500"
        : "text-blue-500";
    },
  },
};
</script>
