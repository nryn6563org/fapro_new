<template>
  <div class="p-quant">
    <header class="p-quant__header">
      <h2 class="p-quant__title">퀀트 종목</h2>
      <p class="p-quant__desc">데이터 기반의 퀀트 알고리즘이 선정한 유망 종목입니다.</p>
    </header>

    <div class="p-quant__grid">
      <FunctionQuantCard 
        v-for="item in quants" 
        :key="item.id"
        class="p-quant__card"
        :type="item.type"
        :algorithm="item.algorithm"
        :monthly-return="item.monthlyReturn"
        :total-return="item.totalReturn"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockQuantPage',
  data() {
    return {
      quants: [
        { id: 1, type: 'aggressive', algorithm: 'Talos Alpha', monthlyReturn: 15.2, totalReturn: 145.2 },
        { id: 2, type: 'neutral', algorithm: 'Rolan Beta', monthlyReturn: -1.5, totalReturn: 89.3 },
        { id: 3, type: 'active', algorithm: 'Mistral Momentum', monthlyReturn: 8.4, totalReturn: 112.5 },
        { id: 4, type: 'neutral', algorithm: 'Stable Dividend', monthlyReturn: 2.1, totalReturn: 45.8 },
        { id: 5, type: 'aggressive', algorithm: 'Growth Sniper', monthlyReturn: 22.8, totalReturn: 180.1 },
        { id: 6, type: 'active', algorithm: 'Sector Rotation', monthlyReturn: 5.6, totalReturn: 67.4 }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/stock/quant.css';
</style>
