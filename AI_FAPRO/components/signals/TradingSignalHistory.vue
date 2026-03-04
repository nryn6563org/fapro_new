<template>
  <div class="trading-signal-history">
    <!-- Chart Section -->
    <div class="trading-signal-history__section">
      <div class="trading-signal-history__header">
        <h4 class="trading-signal-history__title">매매신호 차트</h4>
        <div class="trading-signal-history__period-toggles">
          <label class="trading-signal-history__radio-label">
            <input v-model="selectedPeriod" type="radio" value="3m" class="trading-signal-history__radio" />
            <span class="trading-signal-history__radio-text">최근 3개월</span>
          </label>
          <label class="trading-signal-history__radio-label">
            <input v-model="selectedPeriod" type="radio" value="1y" class="trading-signal-history__radio" />
            <span class="trading-signal-history__radio-text">최근 1년</span>
          </label>
        </div>
      </div>
      <div class="trading-signal-history__chart-bg">
        <div ref="chartContainer" class="trading-signal-history__chart-container">
          <!-- D3 chart will be rendered here -->
        </div>
      </div>
    </div>

    <!-- History Table -->
    <div class="trading-signal-history__section">
      <h4 class="trading-signal-history__title mb-2">매매신호 발생 내역</h4>
      <div class="trading-signal-history__table-wrapper">
        <table class="trading-signal-history__table">
          <thead>
            <tr>
              <th class="trading-signal-history__th">일자</th>
              <th class="trading-signal-history__th">신호상태</th>
              <th class="trading-signal-history__th trading-signal-history__table-right">신호발생가격</th>
              <th class="trading-signal-history__th trading-signal-history__table-right">수익률</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(trade, idx) in signal.tradeHistory" :key="idx">
              <td class="trading-signal-history__td" :class="{'trading-signal-history__td--last': idx === signal.tradeHistory.length - 1}">
                {{ trade.date }}
              </td>
              <td class="trading-signal-history__td" :class="{'trading-signal-history__td--last': idx === signal.tradeHistory.length - 1}">
                <span
                  class="trading-signal-history__badge"
                  :class="trade.signal === '매수' ? 'trading-signal-history__badge--buy' : 'trading-signal-history__badge--sell'"
                >
                  {{ trade.signal }}
                </span>
              </td>
              <td class="trading-signal-history__td trading-signal-history__table-right" :class="{'trading-signal-history__td--last': idx === signal.tradeHistory.length - 1}">
                {{ trade.price }}
              </td>
              <td class="trading-signal-history__td trading-signal-history__table-right" :class="[getReturnClass(trade.return), {'trading-signal-history__td--last': idx === signal.tradeHistory.length - 1}]">
                {{ trade.return && trade.return !== '-' ? trade.return : '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 매매 신호의 매매이력 및 D3 차트 렌더링
 */
import * as d3 from 'd3'
import '~/assets/css/pages/signals/TradingSignalHistory/TradingSignalHistory.css'

export default {
  name: 'TradingSignalHistory',
  props: {
    signal: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: 'buy'
    }
  },
  data() {
    return {
      selectedPeriod: '3m'
    }
  },
  watch: {
    selectedPeriod() {
      this.drawChart()
    }
  },
  mounted() {
    setTimeout(() => {
      this.drawChart()
    }, 150)
  },
  methods: {
    getReturnClass(ret) {
      if (!ret || ret === '-') return 'trading-signal-history__return--neutral'
      return ret.startsWith('+')
        ? 'trading-signal-history__return--positive'
        : 'trading-signal-history__return--negative'
    },
    drawChart() {
      if (!this.$refs.chartContainer) return
      const container = this.$refs.chartContainer
      container.innerHTML = '' // Clear previous chart

      const data = this.signal.priceHistory || []
      if (data.length === 0) return

      const margin = { top: 20, right: 30, bottom: 30, left: 50 }
      const width = container.clientWidth || 400
      const height = 180

      const innerWidth = width - margin.left - margin.right
      const innerHeight = height - margin.top - margin.bottom

      const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      // X Scale (categorical dates)
      const x = d3.scalePoint()
        .domain(data.map(d => d.date))
        .range([0, innerWidth])
        .padding(0.1)

      // Y Scale
      const yMin = d3.min(data, d => d.price) * 0.95
      const yMax = d3.max(data, d => d.price) * 1.05
      const y = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([innerHeight, 0])

      // Line generator
      const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.price))
        .curve(d3.curveMonotoneX)

      // Grid lines
      const yAxisGrid = d3.axisLeft(y).tickSize(-innerWidth).tickFormat('').ticks(5)
      g.append('g')
        .attr('class', 'y-grid')
        .call(yAxisGrid)
        .selectAll('line').attr('stroke', '#e2e8f0').attr('stroke-dasharray', '3,3')
      g.select('.y-grid .domain').remove()

      // Axes
      const xAxis = d3.axisBottom(x)
      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(xAxis)
        .selectAll('text').attr('fill', '#64748b').attr('font-size', '10px').attr('font-family', 'Inter, sans-serif')
      g.selectAll('.domain, .tick line').attr('stroke', '#cbd5e1')

      const yAxis = d3.axisLeft(y).ticks(5).tickFormat(d => d.toLocaleString())
      g.append('g')
        .call(yAxis)
        .selectAll('text').attr('fill', '#64748b').attr('font-size', '10px').attr('font-family', 'Inter, sans-serif')
      g.select('.domain').remove()
      g.selectAll('.tick line').remove()

      // Line path
      const lineColor = this.type === 'buy' ? '#ef4444' : '#3b82f6' // red-500 or blue-500
      g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', lineColor)
        .attr('stroke-width', 2.5)
        .attr('d', line)

      // Points
      g.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.price))
        .attr('r', 4)
        .attr('fill', lineColor)
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2)
    }
  }
}
</script>
