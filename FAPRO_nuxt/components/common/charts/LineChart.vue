<template>
  <div ref="chart" class="line-chart-container"></div>
</template>

<script>
export default {
  name: 'LineChart',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      chartInstance: null
    }
  },
  watch: {
    data: {
      handler(newData) {
        if (this.chartInstance) {
          this.updateChart(newData)
        }
      },
      deep: true
    }
  },
  mounted() {
    this.initChart()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    if (this.chartInstance) {
      this.chartInstance.dispose()
    }
  },
  methods: {
    initChart() {
      const chartDom = this.$refs.chart
      if (!chartDom) {
        return
      }

      this.chartInstance = this.$echarts.init(chartDom)
      this.updateChart(this.data)
    },
    updateChart(data) {
      if (!data || data.length === 0) {
        return
      }

      // Example data: [{ date: "01/05", searchIndex: -5, searchVolume: 71 }, ...]
      const categories = data.map(item => item.date)
      const searchVolume = data.map(item => item.searchVolume)
      const searchIndex = data.map(item => item.searchIndex)

      const defaultOption = {
        tooltip: {
          trigger: 'axis',
          textStyle: { fontSize: 10 }
        },
        legend: {
          data: ['검색수', '누적 등락률'],
          textStyle: { fontSize: 10 },
          bottom: 0
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: categories,
          axisLabel: { fontSize: 10, color: '#9ca3af' },
          axisPointer: { type: 'shadow' }
        },
        yAxis: [
          {
            type: 'value',
            name: '수익률',
            axisLabel: { fontSize: 10, color: '#9ca3af' },
            splitLine: { lineStyle: { type: 'dashed' } }
          },
          {
            type: 'value',
            name: '검색수',
            axisLabel: { fontSize: 10, color: '#9ca3af' },
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: '검색수',
            type: 'line',
            yAxisIndex: 1,
            data: searchVolume,
            smooth: true,
            itemStyle: { color: '#3b82f6' },
            symbolSize: 6
          },
          {
            name: '누적 등락률',
            type: 'line',
            data: searchIndex,
            smooth: true,
            itemStyle: { color: '#ef4444' },
            symbolSize: 6
          }
        ],
        ...this.options
      }

      this.chartInstance.setOption(defaultOption)
    },
    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize()
      }
    }
  }
}
</script>

<style scoped>
.line-chart-container {
  width: 100%;
  height: 100%;
  min-height: 180px;
}
</style>
