<template>
  <div class="issue-detail__table-section">
    <div class="issue-detail__section-label">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10.0003 18.3334C14.6027 18.3334 18.3337 14.6025 18.3337 10.0001C18.3337 5.39771 14.6027 1.66675 10.0003 1.66675C5.39795 1.66675 1.66699 5.39771 1.66699 10.0001C1.66699 14.6025 5.39795 18.3334 10.0003 18.3334Z" stroke="#14B8A6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z" stroke="#14B8A6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M9.99967 11.6666C10.9201 11.6666 11.6663 10.9204 11.6663 9.99992C11.6663 9.07944 10.9201 8.33325 9.99967 8.33325C9.0792 8.33325 8.33301 9.07944 8.33301 9.99992C8.33301 10.9204 9.0792 11.6666 9.99967 11.6666Z" stroke="#14B8A6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <h5 class="issue-detail__section-title">연관 종목 전체 리스트 (총 {{ stocks.length }}종목)</h5>
    </div>
    <div class="issue-detail__table-wrapper">
      <table class="issue-detail__table">
        <thead>
          <tr>
            <th class="issue-detail__th issue-detail__th--left">종목명</th>
            <th class="issue-detail__th issue-detail__th--right">현재가</th>
            <th class="issue-detail__th issue-detail__th--right">등락률</th>
            <th class="issue-detail__th issue-detail__th--center">AI시그널</th>
            <th class="issue-detail__th issue-detail__th--center">다른 이슈</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(stock, idx) in stocks"
            :key="idx"
            :class="{
              'issue-detail-table__row--highlight': Math.abs(stock.changePercent) >= 5
            }"
          >
            <td class="issue-detail__td">
              <span class="issue-detail-table__stock-name">{{ stock.name }}</span>
            </td>
            <td class="issue-detail__td issue-detail__td--right issue-detail-table__price">{{ Math.round(10000 * (1 + stock.changePercent / 100)).toLocaleString() }}원</td>
            <td :class="['issue-detail__td issue-detail__td--right issue-detail-table__change', stock.changePercent >= 0 ? 'issue-detail-table__change--up' : 'issue-detail-table__change--down']">{{ stock.changePercent > 0 ? "+" : "" }}{{ stock.changePercent }}%</td>
            <td class="issue-detail__td issue-detail__td--center">
              <span :class="['issue-detail-table__badge', stock.aiSignal === '매수' ? 'issue-detail-table__badge--red' : stock.aiSignal === '관망' ? 'issue-detail-table__badge--yellow' : 'issue-detail-table__badge--blue']">
                {{ stock.aiSignal }}
              </span>
            </td>
            <td class="issue-detail__td issue-detail__td--center">
              <div class="issue-detail__other-issues">
                <span v-for="tag in stock.otherIssues" :key="tag" class="issue-detail-table__tag">
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
/**
 * 기능: 이슈 관련 상세 연관 종목 리스트 테이블
 */
import "~/assets/css/pages/issues/IssueDetailStockTable/IssueDetailStockTable.css";

export default {
  name: "IssueDetailStockTable",
  props: {
    stocks: {
      type: Array,
      default: () => []
    }
  }
};
</script>
