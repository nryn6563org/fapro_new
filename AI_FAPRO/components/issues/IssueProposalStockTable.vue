<template>
  <div class="issue-proposal-table">
    <div class="issue-proposal__label mb-3">
      <trending-up-icon class="w-4 h-4 text-primary mr-2" />
      등락률 상순 5개 연관종목
    </div>
    <div class="issue-proposal-table__wrapper">
      <table class="issue-proposal-table__table">
        <thead>
          <tr>
            <th class="text-left">종목명</th>
            <th class="text-right">현재가</th>
            <th class="text-right">등락률</th>
            <th class="text-center">시그널점수</th>
            <th class="text-center">AI 시그널</th>
            <th class="text-center">다른 이슈</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stock, idx) in sortedStocks" :key="idx">
            <td class="text-left font-bold text-slate-900 dark:text-white">
              {{ stock.name }}
              <div class="text-[10px] text-slate-400 font-normal">{{ stock.ticker }}</div>
            </td>
            <td class="text-right font-semibold text-slate-700 dark:text-slate-300">
              {{ stock.price?.toLocaleString() }}원
            </td>
            <td :class="['text-right font-bold', stock.changePercent >= 0 ? 'text-red-600' : 'text-blue-600']">
              {{ stock.changePercent > 0 ? '+' : '' }}{{ stock.changePercent }}%
            </td>
            <td class="text-center">
              <span class="fapro-badge fapro-badge--amber fapro-badge--xs">{{ stock.signalScore }}</span>
            </td>
            <td class="text-center">
              <span :class="['fapro-badge fapro-badge--xs', stock.aiSignal === '매수' ? 'fapro-badge--red' : 'fapro-badge--blue']">
                {{ stock.aiSignal }}
              </span>
            </td>
            <td class="text-center">
              <div class="flex gap-1 justify-center">
                <span v-for="tag in stock.otherIssues?.slice(0, 2)" :key="tag" class="issue-proposal-table__tag">
                  {{ tag }}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { TrendingUpIcon } from "vue-feather-icons";
import "~/assets/css/pages/issues/IssueProposalStockTable/IssueProposalStockTable.css";

export default {
  name: "IssueProposalStockTable",
  components: { TrendingUpIcon },
  props: {
    stocks: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    sortedStocks() {
      return [...this.stocks]
        .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
        .slice(0, 5);
    }
  }
};
</script>
