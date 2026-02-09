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
    </div>
    
    <div class="c-quant-stocks__footer">
      <span class="c-quant-stocks__footer-label">수익률 TOP 5</span>
      <select class="c-quant-stocks__select">
        <option>1개월</option>
        <option>3개월</option>
        <option>총수익률</option>
      </select>
    </div>
  </div>
</template>

<script>
import { BarChart3, RefreshCw } from 'lucide-vue'

export default {
  name: 'DashboardQuantStocks',
  components: { BarChart3, RefreshCw },
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
      }
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
