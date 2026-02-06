<template>
  <div class="p-dashboard__report-list">
    <div v-for="(report, index) in reports" :key="index" class="p-report-item">
      <div class="p-report-item__info">
        <span class="p-report-item__name">{{ report.name }}</span>
        <span class="p-report-item__code">{{ report.code }}</span>
      </div>
      <div class="p-report-item__meta">
        <span class="p-report-item__change" :class="report.change >= 0 ? 'p-report-item__change--positive' : 'p-report-item__change--negative'">
          {{ report.change >= 0 ? '+' : '' }}{{ report.change }}%
        </span>
        <span class="p-report-item__date">{{ report.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardReportList',
  props: {
    reports: { type: Array, required: true }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/dashboard.css';
</style>
