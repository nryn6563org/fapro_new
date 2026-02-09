<template>
  <div class="c-customer-ranking">
    <div class="c-customer-ranking__header">
      <div class="c-customer-ranking__title-group">
        <TrendingUp class="c-customer-ranking__icon" :size="18" />
        <h3 class="c-customer-ranking__title">고객 보유종목 랭킹</h3>
      </div>
      <div class="c-customer-ranking__info">
        <span class="c-customer-ranking__time">08:45</span>
        <button class="c-customer-ranking__refresh">
          <RefreshCw :size="14" />
        </button>
      </div>
    </div>

    <div class="c-customer-ranking__body">
      <div class="c-ranking-rows no-scrollbar">
        <div v-for="(item, index) in ranking" :key="item.name" class="c-ranking-row">
          <div class="c-ranking-row__main">
            <div class="c-ranking-row__indicator" :style="{ backgroundColor: item.indicatorColor }"></div>
            <span class="c-ranking-row__name">{{ item.name }}</span>
            <div class="c-ranking-row__bar-container">
              <div class="c-ranking-row__bar" :style="{ width: item.percent + '%', backgroundColor: item.barColor }"></div>
            </div>
          </div>
          <div class="c-ranking-row__stats">
            <span class="c-ranking-row__change" :class="item.change >= 0 ? 'c-ranking-row__change--up' : 'c-ranking-row__change--down'">
              {{ item.change >= 0 ? '+' : '' }}{{ item.change }}%
            </span>
            <span class="c-ranking-row__holders">고객 {{ item.holders }}명 보유</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TrendingUp, RefreshCw } from 'lucide-vue'

export default {
  name: 'DashboardCustomerRanking',
  components: { TrendingUp, RefreshCw },
  data() {
    return {
      ranking: [
        { name: '삼성전자', change: 2.3, holders: 23, indicatorColor: '#2563EB', barColor: '#EF4444', percent: 80 },
        { name: 'SK하이닉스', change: 1.8, holders: 18, indicatorColor: '#9333EA', barColor: '#EF4444', percent: 70 },
        { name: 'NAVER', change: -0.5, holders: 15, indicatorColor: '#16A34A', barColor: '#3B82F6', percent: 60 },
        { name: '카카오', change: 3.1, holders: 12, indicatorColor: '#CA8A04', barColor: '#EF4444', percent: 50 },
        { name: '기아', change: -1.2, holders: 10, indicatorColor: '#EA580C', barColor: '#3B82F6', percent: 45 },
        { name: '현대차', change: 0.8, holders: 8, indicatorColor: '#DC2626', barColor: '#EF4444', percent: 40 },
        { name: 'LG엔솔', change: 2.5, holders: 6, indicatorColor: '#0891B2', barColor: '#EF4444', percent: 35 }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/dashboard/customer-ranking.css';
</style>
