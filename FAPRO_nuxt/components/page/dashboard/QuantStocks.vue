<template>
  <div class="c-quant-stocks">
    <div class="c-quant-stocks__header">
      <div class="c-quant-stocks__title-group">
        <BarChart3 class="c-quant-stocks__icon" :size="18" />
        <h3 class="c-quant-stocks__title">퀀트 종목</h3>
      </div>
      <div class="c-quant-stocks__info">
        <span class="c-quant-stocks__time">08:45</span>
        <button class="c-quant-stocks__refresh">
          <RefreshCw :size="14" />
        </button>
      </div>
    </div>

    <div class="c-quant-stocks__body">
      <div class="c-strategy-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="c-strategy-tab"
          :class="{ 'c-strategy-tab--active': activeTab === tab.id }"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="c-performance-grid">
        <div class="c-performance-item">
          <p class="c-performance-label">1개월</p>
          <p class="c-performance-value" :class="activeData.m1 >= 0 ? 'c-performance-value--up' : 'c-performance-value--down'">
            {{ activeData.m1 >= 0 ? '+' : '' }}{{ activeData.m1 }}%
          </p>
        </div>
        <div class="c-performance-item c-performance-item--center">
          <p class="c-performance-label">3개월</p>
          <p class="c-performance-value" :class="activeData.m3 >= 0 ? 'c-performance-value--up' : 'c-performance-value--down'">
            {{ activeData.m3 >= 0 ? '+' : '' }}{{ activeData.m3 }}%
          </p>
        </div>
        <div class="c-performance-item">
          <p class="c-performance-label">총수익률</p>
          <p class="c-performance-value" :class="activeData.total >= 0 ? 'c-performance-value--up' : 'c-performance-value--down'">
            {{ activeData.total >= 0 ? '+' : '' }}{{ activeData.total }}%
          </p>
        </div>
      </div>

      <!-- List Header -->
      <div class="c-quant-stocks__list-header">
        <span class="c-quant-stocks__list-title">수익률 TOP 5</span>
        <button class="c-quant-stocks__period-select">
          <span>1개월</span>
          <ChevronDown :size="12" />
        </button>
      </div>

      <!-- Stock List -->
      <div class="c-quant-stocks__list">
        <div v-for="stock in topStocks" :key="stock.id" class="c-stock-item">
          <div class="c-stock-item__rank">{{ stock.rank }}</div>
          <span class="c-stock-item__name">{{ stock.name }}</span>
          <span class="c-stock-item__return">+{{ stock.return }}%</span>
        </div>
      </div>
    </div>
    
    <div class="c-quant-stocks__footer">
      <button class="c-quant-stocks__more-btn">
        더보기
      </button>
    </div>
  </div>
</template>

<script>
import { BarChart3, RefreshCw, ChevronDown } from 'lucide-vue'

export default {
  name: 'DashboardQuantStocks',
  components: { BarChart3, RefreshCw, ChevronDown },
  data() {
    return {
      activeTab: 'talos',
      tabs: [
        { id: 'talos', label: '탈로스' },
        { id: 'roland', label: '롤랑' },
        { id: 'mistral', label: '미스트랄' }
      ],
      strategyData: {
        talos: { m1: 15.8, m3: 24.5, total: 52.8 },
        roland: { m1: 8.2, m3: 12.4, total: 31.5 },
        mistral: { m1: 4.5, m3: 7.9, total: 18.2 }
      },
      topStocks: [
        { id: 1, rank: 1, name: "에코프로비엠", return: 28.5 },
        { id: 2, rank: 2, name: "포스코퓨처엠", return: 24.3 },
        { id: 3, rank: 3, name: "LG에너지솔루션", return: 18.7 },
        { id: 4, rank: 4, name: "삼성SDI", return: 16.2 },
        { id: 5, rank: 5, name: "SK이노베이션", return: 14.8 }
      ]
    }
  },
  computed: {
    activeData() {
      return this.strategyData[this.activeTab]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/dashboard/quant-stocks.css';
</style>
