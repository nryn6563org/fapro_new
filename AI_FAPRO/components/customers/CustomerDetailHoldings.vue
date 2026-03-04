<template>
  <div class="customer-holdings">
    <div class="customer-holdings__header">
      <h3 class="customer-holdings__title">보유종목 상세</h3>
    </div>
    
    <div class="customer-holdings__table-container">
      <table class="customer-holdings__table">
        <thead class="customer-holdings__thead">
          <tr>
            <th class="customer-holdings__th">종목명</th>
            <th class="customer-holdings__th">보유수량</th>
            <th class="customer-holdings__th">평균단가</th>
            <th class="customer-holdings__th">현재가</th>
            <th class="customer-holdings__th">평가금액</th>
            <th class="customer-holdings__th">손익</th>
            <th class="customer-holdings__th">수익률</th>
          </tr>
        </thead>
        <tbody class="customer-holdings__tbody">
          <tr v-for="(holding, index) in holdings" :key="index" class="customer-holdings__tr">
            <td class="customer-holdings__td customer-holdings__td--name">{{ holding.name }}</td>
            <td class="customer-holdings__td">{{ holding.quantity }}</td>
            <td class="customer-holdings__td">{{ holding.avgPrice || '-' }}</td>
            <td class="customer-holdings__td">{{ holding.currentPrice || '-' }}</td>
            <td class="customer-holdings__td customer-holdings__td--value">{{ holding.value }}</td>
            <td class="customer-holdings__td">
              <div class="flex items-center gap-1 justify-end">
                <trending-up-icon v-if="holding.profit && holding.profit.includes('+')" class="w-3.5 h-3.5 text-emerald-500" />
                <trending-down-icon v-else-if="holding.profit && holding.profit.includes('-')" class="w-3.5 h-3.5 text-blue-500" />
                <span :class="getProfitColor(holding.profit)">{{ holding.profit || '-' }}</span>
              </div>
            </td>
            <td class="customer-holdings__td">
              <span :class="getProfitColor(holding.profitRate)">{{ holding.profitRate || '-' }}</span>
            </td>
          </tr>
          <tr v-if="!holdings || holdings.length === 0">
            <td colspan="7" class="customer-holdings__td customer-holdings__td--empty">보유 종목이 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 보유종목 목록 테이블뷰 (Design #26)
 */
import { TrendingUpIcon, TrendingDownIcon } from 'vue-feather-icons'
import '~/assets/css/pages/customers/CustomerDetailModal/CustomerDetailHoldings.css'

export default {
  name: 'CustomerDetailHoldings',
  components: {
    TrendingUpIcon,
    TrendingDownIcon
  },
  props: {
    holdings: { 
      type: Array, 
      default: () => []
    }
  },
  methods: {
    getProfitColor(value) {
      if (!value) return 'text-slate-600 dark:text-slate-400 font-medium'
      if (value.includes('+')) return 'text-emerald-600 font-bold dark:text-emerald-400'
      if (value.includes('-')) return 'text-blue-600 font-bold dark:text-blue-400'
      return 'text-slate-600 dark:text-slate-400 font-medium'
    }
  }
}
</script>
