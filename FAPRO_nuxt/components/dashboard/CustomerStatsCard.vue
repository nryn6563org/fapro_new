<template>
  <Card class="dashboard-card dashboard-card--customer-stats">
    <div class="dashboard-card__header">
      <div class="dashboard-card__header-main">
        <div class="dashboard-card__title-group">
          <svg xmlns="http://www.w3.org/2000/svg" class="dashboard-card__title-icon dashboard-card__title-icon--green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="dashboard-card__title-text">고객 통계</span>
        </div>
      </div>
    </div>

    <div class="dashboard-card__content">
      <!-- 통계 요약 -->
      <div class="dashboard-card__stats-summary">
        <div class="dashboard-card__stats-left">
          <p class="dashboard-card__stats-label">관리 고객 수</p>
          <p class="dashboard-card__stats-number">1,234<span class="dashboard-card__stats-unit">명</span></p>
        </div>
        <div class="dashboard-card__stats-right">
          <p class="dashboard-card__stats-label">지난달 대비</p>
          <p class="dashboard-card__stats-change">
            <span class="dashboard-card__stats-percent">+12.5%</span>
            <span class="dashboard-card__stats-count">(+67명)</span>
          </p>
        </div>
      </div>

      <div class="dashboard-card__tab-group-wrapper dashboard-card__tab-group-wrapper--margin-bottom">
        <div class="dashboard-card__tab-group">
          <button
            @click="activeChart = 'style'"
            :class="['dashboard-card__tab-item', activeChart === 'style' ? 'dashboard-card__tab-item--active dashboard-card__tab-item--white' : '']"
          >
            투자성향
          </button>
          <button
            @click="activeChart = 'age'"
            :class="['dashboard-card__tab-item', activeChart === 'age' ? 'dashboard-card__tab-item--active dashboard-card__tab-item--white' : '']"
          >
            연령분포
          </button>
        </div>
      </div>

      <!-- ECharts 컨테이너 -->
      <div
        ref="customerChart"
        class="dashboard-card__chart-container"
      ></div>

      <nuxt-link
        to="/customer/statistics"
        class="dashboard-card__view-more dashboard-card__view-more--green dashboard-card__view-more--margin-top"
      >
        더보기
      </nuxt-link>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'CustomerStatsCard',
  props: {
    currentTime: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeChart: 'style',
      chartInstance: null
    }
  },
  watch: {
    activeChart() {
      this.updateChart()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
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
      const chartDom = this.$refs.customerChart
      if (!chartDom) {
        return
      }
      this.chartInstance = this.$echarts.init(chartDom)
      this.updateChart()
    },
    updateChart() {
      if (!this.chartInstance) {
        return
      }

      const options = {
        style: {
          tooltip: { trigger: 'item', padding: [5, 10] },
          legend: {
            orient: 'vertical',
            right: '5%',
            top: 'center',
            icon: 'circle',
            itemGap: 15,
            textStyle: { fontSize: 11, color: '#4b5563' }
          },
          series: [
            {
              type: 'pie',
              radius: ['45%', '75%'],
              center: ['40%', '50%'],
              avoidLabelOverlap: false,
              itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
              label: { show: false },
              emphasis: {
                label: { show: true, fontSize: 14, fontWeight: 'bold' }
              },
              data: [
                { value: 485, name: '공격적', itemStyle: { color: '#ef4444' } },
                { value: 342, name: '적극적', itemStyle: { color: '#f97316' } },
                { value: 207, name: '중립적', itemStyle: { color: '#3b82f6' } },
                { value: 150, name: '안정적', itemStyle: { color: '#10b981' } }
              ]
            }
          ]
        },
        age: {
          grid: { top: '5%', bottom: '15%', left: '15%', right: '10%' },
          xAxis: {
            type: 'category',
            data: ['20대', '30대', '40대', '50대', '60대+'],
            axisTick: { show: false },
            axisLine: { lineStyle: { color: '#e5e7eb' } },
            axisLabel: { color: '#6b7280', fontSize: 10 }
          },
          yAxis: {
            type: 'value',
            splitLine: { lineStyle: { type: 'dashed' } },
            axisLabel: { color: '#9ca3af', fontSize: 10 }
          },
          series: [
            {
              data: [120, 310, 450, 240, 110],
              type: 'bar',
              barWidth: '50%',
              itemStyle: {
                borderRadius: [4, 4, 0, 0],
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: '#10b981' },
                    { offset: 1, color: '#34d399' }
                  ]
                }
              }
            }
          ]
        }
      }

      this.chartInstance.setOption(options[this.activeChart], true)
    },
    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize()
      }
    }
  }
}
</script>
