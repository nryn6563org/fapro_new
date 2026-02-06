<template>
  <section class="issue-chart-section">
    <div class="issue-chart-section__container">
      <header class="issue-chart-section__header">
        <div class="issue-chart-section__info">
          <div class="issue-chart-section__title-wrapper">
            <div class="issue-chart-section__status-dot"></div>
            <h2 class="issue-chart-section__title">실시간 이슈 분석</h2>
            <span class="issue-chart-section__count">({{ issueCount }}건 포착)</span>
          </div>
          <div class="issue-chart-section__divider"></div>
          <div class="issue-chart-section__tab-group">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="$emit('update:activeTab', tab.id)"
              :class="[
                'issue-chart-section__tab-btn',
                activeTab === tab.id ? 'issue-chart-section__tab-btn--active' : 'issue-chart-section__tab-btn--inactive'
              ]"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>
        <div class="issue-chart-section__update-info">
          <div class="issue-chart-section__update-dot"></div>
          <span class="issue-chart-section__update-text">Live Update: 15:48</span>
        </div>
      </header>

      <div class="issue-chart-section__visualization">
        <BubbleChart :data="chartData" @bubble-click="$emit('bubble-click', $event)" />
      </div>
    </div>
  </section>
</template>

<script>
import BubbleChart from '~/components/common/charts/BubbleChart.vue'

export default {
  name: 'IssueChartSection',
  components: {
    BubbleChart
  },
  props: {
    issueCount: {
      type: Number,
      default: 0
    },
    tabs: {
      type: Array,
      default: () => []
    },
    activeTab: {
      type: String,
      default: ''
    },
    chartData: {
      type: Array,
      default: () => []
    }
  }
}
</script>
