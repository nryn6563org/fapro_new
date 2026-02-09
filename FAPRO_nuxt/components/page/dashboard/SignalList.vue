<template>
  <div class="c-signal-list">
    <div class="c-signal-list__header">
      <div class="c-signal-list__title-group">
        <Activity class="c-signal-list__icon" :size="18" />
        <h3 class="c-signal-list__title">라씨 시그널 발생 종목</h3>
      </div>
      <div class="c-signal-list__info">
        <span class="c-signal-list__time">08:45</span>
        <button class="c-signal-list__refresh">
          <RefreshCw :size="14" />
        </button>
      </div>
    </div>

    <div class="c-signal-list__body">
      <div class="c-signal-summary">
        <div class="c-signal-summary__main">
          <p class="c-signal-summary__label">오늘의 AI 매매신호 현황</p>
          <div class="c-signal-summary__counts">
            <div class="c-signal-summary__item">
              <span class="c-signal-summary__type">매수</span>
              <span class="c-signal-summary__value c-signal-summary__value--buy">2</span>
              <span class="c-signal-summary__unit">종목</span>
            </div>
            <div class="c-signal-summary__item">
              <span class="c-signal-summary__type">매도</span>
              <span class="c-signal-summary__value c-signal-summary__value--sell">2</span>
              <span class="c-signal-summary__unit">종목</span>
            </div>
          </div>
        </div>
      </div>

      <div class="c-signal-rows">
        <div v-for="signal in signals" :key="signal.id" class="c-signal-row">
          <div class="c-signal-row__info">
            <div class="c-signal-row__time">{{ signal.time }}</div>
            <div class="c-signal-row__name">{{ signal.name }}</div>
          </div>
          <div class="c-signal-row__details">
            <div class="c-signal-row__prices">
              <div class="c-signal-row__price-label">{{ signal.type === 'buy' ? '매수가' : '매도가' }} {{ signal.price.toLocaleString() }}원</div>
              <div class="c-signal-row__change" :class="signal.type === 'buy' ? 'c-signal-row__change--buy' : 'c-signal-row__change--sell'">
                수익률 {{ signal.change >= 0 ? '+' : '' }}{{ signal.change }}%
              </div>
            </div>
            <span class="c-signal-badge" :class="signal.type === 'buy' ? 'c-signal-badge--buy' : 'c-signal-badge--sell'">
              오늘{{ signal.typeName }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="c-signal-list__footer">
      <button class="c-signal-list__more-btn">더보기</button>
    </div>
  </div>
</template>

<script>
import { Activity, RefreshCw } from 'lucide-vue'

export default {
  name: 'DashboardSignalList',
  components: { Activity, RefreshCw },
  data() {
    return {
      signals: [
        { id: 1, type: 'buy', typeName: '매수', name: '카카오뱅크', code: '323410', price: 29200, change: 2.5, time: '10:30' },
        { id: 2, type: 'buy', typeName: '매수', name: 'SK하이닉스', code: '000660', price: 135000, change: 2.3, time: '10:25' },
        { id: 3, type: 'sell', typeName: '매도', name: 'LG에너지솔루션', code: '373220', price: 445000, change: -5.9, time: '09:45' },
        { id: 4, type: 'sell', typeName: '매도', name: '삼성바이오', code: '207940', price: 895000, change: 2.9, time: '09:15' }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/dashboard/signal-list.css';
</style>
