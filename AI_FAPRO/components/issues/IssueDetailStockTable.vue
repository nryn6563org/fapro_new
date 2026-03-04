<template>
  <div class="issue-detail__table-section">
    <div class="issue-detail__section-label">
      <target-icon class="issue-detail__section-icon" />
      <h5 class="issue-detail__section-title">
        연관 종목 전체 리스트 (총 {{ stocks.length }}종목)
      </h5>
    </div>
    <div class="issue-detail__table-wrapper">
      <table class="issue-detail__table">
        <thead>
          <tr>
            <th class="issue-detail__th text-left">종목명</th>
            <th class="issue-detail__th text-right">현재가</th>
            <th class="issue-detail__th text-right">등락률</th>
            <th class="issue-detail__th text-center">시그널점수</th>
            <th class="issue-detail__th text-center">AI시그널</th>
            <th class="issue-detail__th text-center">다른 이슈</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(stock, idx) in stocks"
            :key="idx"
            :class="{ 'issue-detail-table__row--highlight': Math.abs(stock.changePercent) >= 5 }"
          >
            <td class="issue-detail__td">
              <span class="font-bold text-slate-900 dark:text-white">{{ stock.name }}</span>
            </td>
            <td class="issue-detail__td text-right font-semibold text-slate-700 dark:text-slate-300">
              {{ Math.round(10000 * (1 + stock.changePercent / 100)).toLocaleString() }}원
            </td>
            <td
              :class="[
                'issue-detail__td text-right font-bold',
                stock.changePercent >= 0 ? 'text-red-600' : 'text-blue-600'
              ]"
            >
              {{ stock.changePercent > 0 ? '+' : '' }}{{ stock.changePercent }}%
            </td>
            <td class="issue-detail__td text-center">
              <span
                :class="[
                  'issue-detail-table__badge',
                  stock.alphaScore >= 85
                    ? 'issue-detail-table__badge--green'
                    : stock.alphaScore >= 75
                    ? 'issue-detail-table__badge--teal'
                    : 'issue-detail-table__badge--orange'
                ]"
              >
                {{ stock.alphaScore }}
              </span>
            </td>
            <td class="issue-detail__td text-center">
              <span
                :class="[
                  'issue-detail-table__badge',
                  stock.riskGrade === '저'
                    ? 'issue-detail-table__badge--red'
                    : stock.riskGrade === '중'
                    ? 'issue-detail-table__badge--yellow'
                    : 'issue-detail-table__badge--blue'
                ]"
              >
                {{ stock.riskGrade === '저' ? '매수' : stock.riskGrade === '중' ? '관망' : '매도' }}
              </span>
            </td>
            <td class="issue-detail__td text-center">
              <div class="issue-detail__other-issues">
                <span v-for="tag in ['AI반도체', '데이터센터']" :key="tag" class="issue-detail-table__tag">
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
import { TargetIcon } from 'vue-feather-icons'
import '~/assets/css/pages/issues/IssueDetailStockTable/IssueDetailStockTable.css'

export default {
  name: 'IssueDetailStockTable',
  components: {
    TargetIcon
  },
  props: {
    stocks: {
      type: Array,
      default: () => []
    }
  }
}
</script>
