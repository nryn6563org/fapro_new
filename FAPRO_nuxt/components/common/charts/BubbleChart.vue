<template>
  <div ref="chart" class="bubble-chart-container"></div>
</template>

<script>
export default {
  name: 'BubbleChart',
  props: {
    data: {
      type: Array,
      default: () => []
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
      this.chartInstance.on('click', (params) => {
        // Emit the original raw data [x, y, size, label, group]
        if (params.data && params.data.raw) {
          this.$emit('bubble-click', params.data.raw)
        }
      })
      this.updateChart(this.data)
    },
    updateChart(data) {
      // Transform [x, y, size, label, group] to Graph Nodes
      const nodes = data.map((item, index) => {
        return {
          name: item[3],
          value: item[2],
          symbolSize: item[2] * 4.5,
          draggable: true,
          raw: item, // Store original data for click event
          // Use itemStyle to preserve color logic if needed or let series handle it
          itemStyle: {
            color: (() => {
              const colors = ['#f87171', '#fb923c', '#fbbf24', '#f472b6', '#a78bfa', '#60a5fa']
              return colors[index % colors.length]
            })()
          }
        }
      })

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            // params.data.raw is [x, y, size, label, group]
            const raw = params.data.raw
            return `${raw[3]}<br/>관련이슈: ${raw[2]}건`
          }
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            force: {
              repulsion: 100, // Adjust for spacing
              gravity: 0.1, // Pull to center
              edgeLength: 30,
              layoutAnimation: true
            },
            roam: true,
            label: {
              show: true,
              formatter: '{b}', // Use node name
              position: 'inside',
              fontSize: 12,
              color: '#fff',
              fontWeight: 'bold'
            },
            data: nodes,
            itemStyle: {
              opacity: 0.9, // Slightly allow seeing overlap
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowOffsetY: 5
            }
          }
        ]
      }
      this.chartInstance.setOption(option)
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
.bubble-chart-container {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>
