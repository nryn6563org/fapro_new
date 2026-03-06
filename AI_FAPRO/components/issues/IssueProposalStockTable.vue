<template>
  <div class="issue-proposal-table">
    <div class="issue-proposal-table__wrapper">
      <table class="issue-proposal-table__table">
        <thead>
          <tr>
            <th class="issue-proposal-table__th--left">종목명</th>
            <th class="issue-proposal-table__th--right">현재가</th>
            <th class="issue-proposal-table__th--right">등락률</th>
            <th class="issue-proposal-table__th--center">AI 시그널</th>
            <th class="issue-proposal-table__th--center">다른 이슈</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stock, idx) in sortedStocks" :key="idx">
            <td class="issue-proposal-table__td--name">
              {{ stock.name }}
              <div class="issue-proposal-table__ticker">{{ stock.ticker }}</div>
            </td>
            <td class="issue-proposal-table__td--price">
              {{ stock.price?.toLocaleString() }}원
            </td>
            <td :class="['issue-proposal-table__td--change', stock.changePercent >= 0 ? 'issue-proposal-table__td--change-up' : 'issue-proposal-table__td--change-down']">
              {{ stock.changePercent > 0 ? '+' : '' }}{{ stock.changePercent }}%
            </td>
            <td class="issue-proposal-table__td--center">
              <span :class="['issue-proposal-table__ai-badge', getAiSignalClass(stock.aiSignal)]">
                {{ stock.aiSignal }}
              </span>
            </td>
            <td class="issue-proposal-table__td--center">
              <div class="issue-proposal-table__tag-container">
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
import "~/assets/css/pages/issues/IssueProposalStockTable/IssueProposalStockTable.css";
import { featuredStocks } from "~/utils/issueDetectionMockData.js";

/**
 * 기능: 이슈 제안서 내 연관 종목 테이블
 */
const FALLBACK_STOCKS = [
  { ticker: "196170", name: "알테오젠", price: 285000, changePercent: 6.65, aiSignal: "보유", otherIssues: ["바이오", "신약"] },
  { ticker: "000660", name: "SK하이닉스", price: 184500, changePercent: 4.83, aiSignal: "매수", otherIssues: ["AI반도체", "HBM"] },
  { ticker: "247540", name: "에코프로비엠", price: 178500, changePercent: 5.24, aiSignal: "보유", otherIssues: ["2차전지", "양극재"] },
  { ticker: "058470", name: "리노공업", price: 168000, changePercent: 4.48, aiSignal: "매수", otherIssues: ["반도체", "소켓"] },
  { ticker: "005930", name: "삼성전자", price: 73500, changePercent: 1.66, aiSignal: "보유", otherIssues: ["HBM", "CXL"] },
];

export default {
  name: "IssueProposalStockTable",
  props: {
    stocks: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    sortedStocks() {
      let resolved = [];

      if (this.stocks && this.stocks.length > 0) {
        // stocks가 ticker 문자열 배열인 경우 → featuredStocks에서 조회
        if (typeof this.stocks[0] === "string") {
          resolved = featuredStocks.filter(s => this.stocks.includes(s.ticker));
        } else {
          // stocks가 이미 객체 배열인 경우 그대로 사용
          resolved = this.stocks;
        }
      }

      // 조회 결과가 없으면 폴백 데이터 사용
      if (resolved.length === 0) {
        resolved = FALLBACK_STOCKS;
      }

      return [...resolved]
        .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
        .slice(0, 5);
    }
  },
  methods: {
    getAiSignalClass(signal) {
      if (signal === "매수") return "issue-proposal-table__ai-badge--red";
      if (signal === "보유") return "issue-proposal-table__ai-badge--green";
      return "issue-proposal-table__ai-badge--gray";
    }
  }
};
</script>
