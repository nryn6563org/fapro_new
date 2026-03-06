<template>
  <div class="customer-holdings__table-box">
    <table class="customer-holdings__table">
      <thead>
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
      <tbody>
        <tr v-for="(holding, index) in holdings" :key="index">
          <td class="customer-holdings__td customer-holdings__td-name">
            {{ holding.name }}
          </td>
          <td class="customer-holdings__td">{{ holding.quantity }}</td>
          <td class="customer-holdings__td">{{ holding.avgPrice }}</td>
          <td class="customer-holdings__td">
            {{ holding.currentPrice }}
          </td>
          <td class="customer-holdings__td customer-holdings__td-val">
            {{ holding.value }}
          </td>
          <td class="customer-holdings__td customer-holdings__td-profit">
            <div class="customer-holdings__profit-box">
              <trending-up-icon class="customer-holdings__profit-icon" />
              {{ holding.profit }}
            </div>
          </td>
          <td class="customer-holdings__td customer-holdings__td-rate">
            {{ holding.profitRate }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/**
 * 기능: 고객 보유 종목 모달 - 보유 종목 테이블
 */
import { TrendingUpIcon } from "vue-feather-icons";

export default {
  name: "CustomerHoldingsTable",
  components: {
    TrendingUpIcon,
  },
  props: {
    holdings: { type: Array, default: () => [] },
  },
};
</script>
