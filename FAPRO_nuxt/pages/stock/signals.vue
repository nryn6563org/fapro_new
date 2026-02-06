<template>
  <div class="p-signals">
    <header class="p-signals__header">
      <h2 class="p-signals__title">라씨 시그널 발생 종목</h2>
      <p class="p-signals__desc">AI 알고리즘이 포착한 실시간 매수/매도 시그널입니다.</p>
    </header>

    <div class="p-signals__grid">
      <div v-for="(signal, index) in signals" :key="index" class="p-signals__card" :class="`p-signals__card--${signal.type}`">
        <div class="p-signals__card-top">
          <span class="p-signals__badge" :class="`p-signals__badge--${signal.type}`">{{ signal.typeName }}</span>
          <span class="p-signals__time">{{ signal.time }}</span>
        </div>
        <div class="p-signals__stock">
          <h3 class="p-signals__stock-name">{{ signal.name }}</h3>
          <span class="p-signals__price">{{ signal.price.toLocaleString() }}원</span>
        </div>
        <div class="p-signals__stats">
          <div class="p-signals__stat">
            <span class="p-signals__stat-label">수익률</span>
            <span class="p-signals__stat-value" :class="signal.change >= 0 ? 'text-red-500' : 'text-blue-500'">
              {{ signal.change > 0 ? '+' : '' }}{{ signal.change }}%
            </span>
          </div>
          <div class="p-signals__stat">
            <span class="p-signals__stat-label">적중률</span>
            <span class="p-signals__stat-value">{{ signal.accuracy }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockSignalsPage',
  data() {
    return {
      signals: [
        { type: 'buy', typeName: '매수 포착', name: '한미반도체', price: 62500, change: 4.2, accuracy: 88, time: '09:30' },
        { type: 'sell', typeName: '매도 포착', name: '에코프로비엠', price: 230000, change: -2.1, accuracy: 92, time: '10:15' },
        { type: 'buy', typeName: '매수 포착', name: '셀트리온', price: 185000, change: 1.5, accuracy: 85, time: '11:20' },
        { type: 'sell', typeName: '매도 포착', name: '카카오페이', price: 48000, change: -1.8, accuracy: 78, time: '13:45' },
        { type: 'buy', typeName: '매수 포착', name: '크래프톤', price: 210000, change: 3.5, accuracy: 90, time: '14:10' },
        { type: 'buy', typeName: '매수 포착', name: '두산로보틱스', price: 85000, change: 5.1, accuracy: 82, time: '14:50' }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/stock/signals.css';
</style>
