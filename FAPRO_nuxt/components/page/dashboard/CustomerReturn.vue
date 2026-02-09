<template>
  <div class="c-customer-return">
    <div class="c-customer-return__header">
      <div class="c-customer-return__title-group">
        <PieChart class="c-customer-return__icon" :size="18" />
        <h3 class="c-customer-return__title">고객 수익률</h3>
      </div>
      <div class="c-customer-return__info">
        <button class="c-customer-return__refresh">
          <RefreshCw :size="14" />
        </button>
      </div>
    </div>

    <div class="c-customer-return__body">
      <div class="c-return-dist">
        <div 
          v-for="(item, index) in distribution" 
          :key="index"
          class="c-return-dist__item"
        >
          <div class="c-return-dist__label">
            <span class="c-return-dist__range">{{ item.range }}</span>
            <span class="c-return-dist__count">{{ item.count }}명</span>
          </div>
          <div class="c-return-dist__bar-container">
            <div 
              class="c-return-dist__bar"
              :style="{ width: `${item.percent}%`, backgroundColor: item.color }"
            ></div>
          </div>
        </div>
      </div>

      <div class="c-top-customers">
        <div class="c-top-customers__header">
          <TrendingUp :size="14" class="c-top-customers__icon" />
          <span class="c-top-customers__title">수익률 상위 TOP3</span>
        </div>
        <div class="c-top-customers__list">
          <div 
            v-for="(customer, index) in topCustomers" 
            :key="index"
            class="c-top-customer-item"
          >
            <div class="c-top-customer-item__left">
              <span class="c-top-customer-item__rank" :class="`c-top-customer-item__rank--${index+1}`">{{ index + 1 }}</span>
              <span class="c-top-customer-item__name">{{ customer.name }}</span>
            </div>
            <span class="c-top-customer-item__value">+{{ customer.return }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="c-customer-return__footer">
      <button class="c-customer-return__report-btn">분석 리포트</button>
    </div>
  </div>
</template>

<script>
import { PieChart, RefreshCw, TrendingUp } from 'lucide-vue'

export default {
  name: 'PageDashboardCustomerReturn',
  components: { PieChart, RefreshCw, TrendingUp },
  data() {
    return {
      distribution: [
        { range: "20% 이상", count: 45, percent: 3.6, color: "#EF4444" },
        { range: "10-20%", count: 234, percent: 19.0, color: "#F97316" },
        { range: "5-10%", count: 456, percent: 37.0, color: "#F59E0B" },
        { range: "0-5%", count: 378, percent: 30.6, color: "#10B981" },
        { range: "손실", count: 121, percent: 9.8, color: "#3B82F6" }
      ],
      topCustomers: [
        { name: "김태희", return: 38.5 },
        { name: "박서준", return: 32.7 },
        { name: "정유미", return: 28.3 }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/dashboard/customer-return.css';
</style>
