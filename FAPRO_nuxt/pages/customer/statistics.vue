<template>
  <div class="p-cust-stats">
    <header class="p-cust-stats__header">
      <h2 class="p-cust-stats__title">고객 통계</h2>
      <p class="p-cust-stats__desc">전체 고객의 자산 현황과 투자 성향을 분석합니다.</p>
    </header>

    <div class="p-cust-stats__overview">
      <div class="p-cust-stats__card">
        <span class="p-cust-stats__card-label">총 관리 고객</span>
        <span class="p-cust-stats__card-value">1,250명</span>
      </div>
      <div class="p-cust-stats__card">
        <span class="p-cust-stats__card-label">총 관리 자산</span>
        <span class="p-cust-stats__card-value">1,250억원</span>
      </div>
      <div class="p-cust-stats__card">
        <span class="p-cust-stats__card-label">이번 달 신규 고객</span>
        <span class="p-cust-stats__card-value text-red-500">+12명</span>
      </div>
      <div class="p-cust-stats__card">
        <span class="p-cust-stats__card-label">VIP 고객 (1억 이상)</span>
        <span class="p-cust-stats__card-value">45명</span>
      </div>
    </div>

    <div class="p-cust-stats__charts">
      <div class="p-cust-stats__chart-card">
        <h3 class="p-cust-stats__chart-title">투자 성향 분포</h3>
        <client-only>
          <v-chart class="p-cust-stats__chart" :option="propensityOption" autoresize />
        </client-only>
      </div>
      <div class="p-cust-stats__chart-card">
        <h3 class="p-cust-stats__chart-title">연령대별 분포</h3>
        <client-only>
          <v-chart class="p-cust-stats__chart" :option="ageOption" autoresize />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerStatisticsPage',
  data() {
    return {
      propensityOption: {
        tooltip: { trigger: 'item' },
        legend: { bottom: '0%', left: 'center' },
        series: [{
          name: '투자 성향',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
          label: { show: false, position: 'center' },
          emphasis: { label: { show: true, fontSize: '20', fontWeight: 'bold' } },
          data: [
            { value: 1048, name: '공격투자형', itemStyle: { color: '#EF4444' } },
            { value: 735, name: '적극투자형', itemStyle: { color: '#F59E0B' } },
            { value: 580, name: '위험중립형', itemStyle: { color: '#3B82F6' } },
            { value: 484, name: '안정추구형', itemStyle: { color: '#10B981' } },
            { value: 300, name: '안정형', itemStyle: { color: '#6366F1' } }
          ]
        }]
      },
      ageOption: {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: [
          { type: 'category', data: ['20대', '30대', '40대', '50대', '60대 이상'], axisTick: { alignWithLabel: true } }
        ],
        yAxis: [{ type: 'value' }],
        series: [{
          name: '고객 수',
          type: 'bar',
          barWidth: '60%',
          data: [120, 350, 450, 200, 130],
          itemStyle: { color: '#3B82F6', borderRadius: [4, 4, 0, 0] }
        }]
      }
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/customer/statistics.css';
</style>