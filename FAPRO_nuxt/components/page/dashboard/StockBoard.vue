<template>
  <div class="c-stock-board">
    <div class="c-stock-board__header">
      <h3 class="c-stock-board__title">시장 핵심 이슈</h3>
      <div class="c-stock-board__actions">
        <button 
          @click="activeTab = 'domestic'" 
          class="c-stock-board__filter"
          :class="{'c-stock-board__filter--active': activeTab === 'domestic'}"
        >국내이슈</button>
        <button 
          @click="activeTab = 'us'" 
          class="c-stock-board__filter"
          :class="{'c-stock-board__filter--active': activeTab === 'us'}"
        >미국이슈</button>
        <button 
          @click="activeTab = 'sector'" 
          class="c-stock-board__filter"
          :class="{'c-stock-board__filter--active': activeTab === 'sector'}"
        >섹터</button>
      </div>
    </div>
    
    <div class="c-stock-board__chart-container">
      <VChart class="c-stock-board__chart" :option="chartOption" autoresize />
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockBoard',
  data() {
    return {
      activeTab: 'domestic',
      chartData: {
        domestic: [
          { name: 'HBM\n반도체', value: 30, symbolSize: 90, itemStyle: { color: '#EF4444' } }, // Red
          { name: '저PBR\n밸류업', value: 25, symbolSize: 75, itemStyle: { color: '#F59E0B' } }, // Amber
          { name: '2차전지', value: 20, symbolSize: 65, itemStyle: { color: '#3B82F6' } }, // Blue
          { name: 'AI\n의료', value: 15, symbolSize: 55, itemStyle: { color: '#10B981' } }, // Emerald
          { name: '로봇', value: 10, symbolSize: 45, itemStyle: { color: '#6366F1' } }  // Indigo
        ],
        us: [
          { name: 'AI\nBigTech', value: 35, symbolSize: 100, itemStyle: { color: '#8B5CF6' } }, // Violet
          { name: 'Fed\n금리', value: 25, symbolSize: 70, itemStyle: { color: '#EC4899' } }, // Pink
          { name: '비만\n치료제', value: 20, symbolSize: 60, itemStyle: { color: '#14B8A6' } }, // Teal
          { name: '클라우드', value: 15, symbolSize: 50, itemStyle: { color: '#F97316' } }, // Orange
          { name: '사이버\n보안', value: 5, symbolSize: 40, itemStyle: { color: '#64748B' } }  // Slate
        ],
        sector: [
          { name: '여행', value: 15, symbolSize: 60, itemStyle: { color: '#F87171' } },
          { name: '항공/저가', value: 25, symbolSize: 80, itemStyle: { color: '#60A5FA' } },
          { name: '면세점', value: 10, symbolSize: 50, itemStyle: { color: '#34D399' } },
          { name: '호텔', value: 12, symbolSize: 55, itemStyle: { color: '#FBBF24' } },
          { name: '카지노', value: 8, symbolSize: 45, itemStyle: { color: '#818CF8' } },
          { name: '화장품', value: 18, symbolSize: 65, itemStyle: { color: '#A78BFA' } }
        ]
      }
    }
  },
  computed: {
    chartOption() {
      return {
        tooltip: { trigger: 'item', formatter: '{b}' },
        series: [{
          name: 'Issues',
          type: 'graph',
          layout: 'force',
          data: this.chartData[this.activeTab],
          draggable: true,
          label: { show: true, position: 'inside', formatter: '{b}', fontSize: 12, fontWeight: 'bold', color: '#fff' },
          force: { repulsion: 120, edgeLength: 10 },
          itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.2)' }
        }]
      }
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/dashboard/stock-board.css';
</style>
