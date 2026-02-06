<template>
  <div class="customer-stats-page">
    <!-- 헤더 영역 -->
    <div class="customer-stats-page__header">
      <div class="customer-stats-page__header-info">
        <h1 class="customer-stats-page__title">고객 통계</h1>
        <p class="customer-stats-page__subtitle">전체 고객 현황 및 분석</p>
      </div>
      <button class="customer-stats-page__btn-refresh" @click="refreshData">
        <svg class="customer-stats-page__refresh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        새로고침
      </button>
    </div>

    <!-- 주요 지표 그리드 -->
    <div class="customer-stats-page__metrics-grid">
      <div v-for="(stat, idx) in customerStats" :key="idx" class="customer-stats-page__metric-card">
        <div class="customer-stats-page__metric-icon-box" :class="getMetricIconBoxClass(stat.id)">
          <component :is="stat.icon" class="customer-stats-page__metric-icon" :class="getMetricIconClass(stat.id)" />
        </div>
        <div class="customer-stats-page__metric-label">{{ stat.label }}</div>
        <div class="customer-stats-page__metric-value">{{ stat.value }}</div>
        <div
          class="customer-stats-page__metric-change"
          :class="stat.isPositive ? 'customer-stats-page__metric-change--positive' : 'customer-stats-page__metric-change--negative'"
        >
          {{ stat.change }}
          <span class="customer-stats-page__metric-change-period">전월 대비</span>
        </div>
      </div>
    </div>

    <!-- 분포 차트 영역 1: 유형 및 자산 -->
    <div class="customer-stats-page__charts-grid">
      <!-- 고객 유형별 분포 -->
      <div class="customer-stats-page__chart-card">
        <div class="customer-stats-page__chart-card-header">
          <h3 class="customer-stats-page__chart-card-title">
            <svg class="customer-stats-page__title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>
            </svg>
            고객 유형별 분포
          </h3>
        </div>
        <div class="customer-stats-page__chart-card-body">
          <div ref="typeChart" class="customer-stats-page__chart-container"></div>
          <div class="customer-stats-page__legend-list">
            <div v-for="type in customerTypeData" :key="type.name" class="customer-stats-page__legend-row">
              <div class="customer-stats-page__legend-info">
                <div class="customer-stats-page__legend-dot" :style="{ backgroundColor: type.color }"></div>
                <span class="customer-stats-page__legend-name">{{ type.name }}</span>
              </div>
              <div class="customer-stats-page__legend-value-group">
                <span class="customer-stats-page__value-count">{{ type.value }}명</span>
                <span class="customer-stats-page__value-percent">({{ ((type.value / totalCustomerCount) * 100).toFixed(1) }}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 자산규모별 분포 -->
      <div class="customer-stats-page__chart-card">
        <div class="customer-stats-page__chart-card-header">
          <h3 class="customer-stats-page__chart-card-title">
            <svg class="customer-stats-page__title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>
            </svg>
            자산규모별 분포
          </h3>
        </div>
        <div class="customer-stats-page__chart-card-body">
          <div class="customer-stats-page__distribution-list">
            <div v-for="(range, idx) in assetRangeData" :key="idx" class="customer-stats-page__distribution-item">
              <div class="customer-stats-page__dist-header">
                <span class="customer-stats-page__dist-label">{{ range.range }}</span>
                <div class="customer-stats-page__legend-value-group">
                  <span class="customer-stats-page__value-count">{{ range.count }}명</span>
                  <span class="customer-stats-page__value-percent">({{ range.percent }}%)</span>
                </div>
              </div>
              <div class="customer-stats-page__dist-progress-bg">
                <div
                  class="customer-stats-page__dist-progress-fill customer-stats-page__dist-progress-fill--green"
                  :style="{ width: range.percent + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 분포 차트 영역 2: 연령 및 기간 -->
    <div class="customer-stats-page__charts-grid">
      <!-- 연령대별 분포 -->
      <div class="customer-stats-page__chart-card">
        <div class="customer-stats-page__chart-card-header">
          <h3 class="customer-stats-page__chart-card-title">
            <svg class="customer-stats-page__title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            연령대별 분포
          </h3>
        </div>
        <div class="customer-stats-page__chart-card-body">
          <div class="customer-stats-page__distribution-list">
            <div v-for="(range, idx) in ageRangeData" :key="idx" class="customer-stats-page__distribution-item">
              <div class="customer-stats-page__dist-header">
                <span class="customer-stats-page__dist-label">{{ range.range }}</span>
                <div class="customer-stats-page__legend-value-group">
                  <span class="customer-stats-page__value-count">{{ range.count }}명</span>
                  <span class="customer-stats-page__value-percent">({{ range.percent }}%)</span>
                </div>
              </div>
              <div class="customer-stats-page__dist-progress-bg">
                <div
                  class="customer-stats-page__dist-progress-fill customer-stats-page__dist-progress-fill--purple"
                  :style="{ width: range.percent + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 가입 기간별 분포 -->
      <div class="customer-stats-page__chart-card">
        <div class="customer-stats-page__chart-card-header">
          <h3 class="customer-stats-page__chart-card-title">
            <svg class="customer-stats-page__title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            가입 기간별 분포
          </h3>
        </div>
        <div class="customer-stats-page__chart-card-body">
          <div class="customer-stats-page__distribution-list">
            <div v-for="(range, idx) in joinPeriodData" :key="idx" class="customer-stats-page__distribution-item">
              <div class="customer-stats-page__dist-header">
                <span class="customer-stats-page__dist-label">{{ range.range }}</span>
                <div class="customer-stats-page__legend-value-group">
                  <span class="customer-stats-page__value-count">{{ range.count }}명</span>
                  <span class="customer-stats-page__value-percent">({{ range.percent }}%)</span>
                </div>
              </div>
              <div class="customer-stats-page__dist-progress-bg">
                <div
                  class="customer-stats-page__dist-progress-fill customer-stats-page__dist-progress-fill--orange"
                  :style="{ width: range.percent + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 수익률 분석 섹션 -->
    <div class="customer-stats-page__profit-grid">
      <!-- 고객 수익률 분포 -->
      <div class="customer-stats-page__chart-card customer-stats-page__chart-card--span">
        <div class="customer-stats-page__chart-card-header">
          <h3 class="customer-stats-page__chart-card-title">고객 수익률 분포</h3>
        </div>
        <div class="customer-stats-page__chart-card-body">
          <div ref="profitChart" class="customer-stats-page__chart-container"></div>
        </div>
      </div>

      <!-- 수익률 TOP3 고객 -->
      <div class="customer-stats-page__analysis-card">
        <div class="customer-stats-page__chart-card-header">
          <h3 class="customer-stats-page__chart-card-title">수익률 TOP3 고객</h3>
        </div>
        <div class="customer-stats-page__rank-list">
          <div v-for="cust in topReturnCustomers" :key="cust.rank" class="customer-stats-page__rank-item">
            <div class="customer-stats-page__rank-header">
              <span class="customer-stats-page__rank-name">{{ cust.rank }}등 {{ cust.name }}</span>
              <div class="customer-stats-page__rank-meta">
                <span class="customer-stats-page__rank-value customer-stats-page__rank-value--up">{{ cust.return }}%</span>
                <span class="customer-stats-page__rank-subtext">({{ cust.asset }} 자산)</span>
              </div>
            </div>
            <div class="customer-stats-page__dist-progress-bg">
              <div
                class="customer-stats-page__dist-progress-fill customer-stats-page__dist-progress-fill--red"
                :style="{ width: cust.return + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 수익률 하위 TOP3 고객 -->
      <div class="customer-stats-page__analysis-card">
        <div class="customer-stats-page__chart-card-header">
          <h3 class="customer-stats-page__chart-card-title">수익률 하위 TOP3 고객</h3>
        </div>
        <div class="customer-stats-page__rank-list">
          <div v-for="cust in bottomReturnCustomers" :key="cust.rank" class="customer-stats-page__rank-item">
            <div class="customer-stats-page__rank-header">
              <span class="customer-stats-page__rank-name">{{ cust.rank }}등 {{ cust.name }}</span>
              <div class="customer-stats-page__rank-meta">
                <span class="customer-stats-page__rank-value customer-stats-page__rank-value--down">{{ cust.return }}%</span>
                <span class="customer-stats-page__rank-subtext">({{ cust.asset }} 자산)</span>
              </div>
            </div>
            <div class="customer-stats-page__dist-progress-bg">
              <div
                class="customer-stats-page__dist-progress-fill customer-stats-page__dist-progress-fill--blue"
                :style="{ width: Math.abs(cust.return) + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="customer-stats-page__footer">
      <span class="customer-stats-page__update-text">마지막 업데이트: {{ lastUpdateTime }}</span>
    </div>
  </div>
</template>

<script>
/**
 * Customer Statistics Migration
 * - React Recharts를 Nuxt ECharts로 마이그레이션
 * - 고객 유형, 수익률 분포 등 4개 섹션 구현
 * - Pure BEM CSS architecture
 */

export default {
  name: 'CustomerStatisticsPage',
  data() {
    return {
      lastUpdateTime: '14:23',
      customerStats: [
        { id: 'total', label: '총 고객 수', value: '1,234', change: '+12.5%', isPositive: true, icon: 'UsersIcon' },
        { id: 'active', label: '활성 고객', value: '987', change: '+8.3%', isPositive: true, icon: 'TrendingUpIcon' },
        { id: 'new', label: '신규 고객', value: '45', change: '+15.2%', isPositive: true, icon: 'UserPlusIcon' },
        { id: 'churn', label: '이탈 고객', value: '12', change: '-3.1%', isPositive: false, icon: 'UserMinusIcon' }
      ],
      customerTypeData: [
        { name: '공격형', value: 456, color: '#ef4444' },
        { name: '중립형', value: 523, color: '#3b82f6' },
        { name: '안정형', value: 255, color: '#10b981' }
      ],
      assetRangeData: [
        { range: '10억 이상', count: 125, percent: 10.1 },
        { range: '5억~10억', count: 234, percent: 19.0 },
        { range: '1억~5억', count: 456, percent: 37.0 },
        { range: '5천만~1억', count: 289, percent: 23.4 },
        { range: '5천만 미만', count: 130, percent: 10.5 }
      ],
      ageRangeData: [
        { range: '20대', count: 89, percent: 7.2 },
        { range: '30대', count: 324, percent: 26.3 },
        { range: '40대', count: 456, percent: 37.0 },
        { range: '50대', count: 278, percent: 22.5 },
        { range: '60대 이상', count: 87, percent: 7.0 }
      ],
      joinPeriodData: [
        { range: '1년 미만', count: 234, percent: 19.0 },
        { range: '1~2년', count: 345, percent: 28.0 },
        { range: '2~3년', count: 289, percent: 23.4 },
        { range: '3~5년', count: 256, percent: 20.7 },
        { range: '5년 이상', count: 110, percent: 8.9 }
      ],
      customerReturns: [
        { name: '20% 이상', count: 45, percent: 3.6, color: '#ef4444' },
        { name: '10-20%', count: 234, percent: 19.0, color: '#f97316' },
        { name: '5-10%', count: 456, percent: 37.0, color: '#84cc16' },
        { name: '0-5%', count: 378, percent: 30.6, color: '#3b82f6' },
        { name: '손실', count: 121, percent: 9.8, color: '#6b7280' }
      ],
      topReturnCustomers: [
        { rank: 1, name: '김태희', return: 38.5, asset: '42억' },
        { rank: 2, name: '박서준', return: 32.7, asset: '35억' },
        { rank: 3, name: '정유미', return: 28.3, asset: '28억' }
      ],
      bottomReturnCustomers: [
        { rank: 1, name: '이민호', return: -15.2, asset: '18억' },
        { rank: 2, name: '강동원', return: -12.8, asset: '15억' },
        { rank: 3, name: '송중기', return: -8.5, asset: '12억' }
      ]
    }
  },
  computed: {
    totalCustomerCount() {
      return this.customerTypeData.reduce((sum, item) => sum + item.value, 0)
    }
  },
  mounted() {
    this.initTypeChart()
    this.initProfitChart()
  },
  methods: {
    initTypeChart() {
      const chart = this.$echarts.init(this.$refs.typeChart)
      chart.setOption({
        tooltip: { trigger: 'item' },
        series: [{
          name: '고객 유형',
          type: 'pie',
          radius: ['50%', '80%'],
          avoidLabelOverlap: false,
          label: { show: false },
          emphasis: {
            label: { show: true, fontSize: '14', fontWeight: 'bold' }
          },
          data: this.customerTypeData.map(item => ({
            value: item.value,
            name: item.name,
            itemStyle: { color: item.color }
          }))
        }]
      })
    },
    getMetricIconBoxClass(id) {
      const classes = {
        total: 'customer-stats-page__metric-icon-box--blue',
        active: 'customer-stats-page__metric-icon-box--green',
        new: 'customer-stats-page__metric-icon-box--purple',
        churn: 'customer-stats-page__metric-icon-box--orange'
      }
      return classes[id] || ''
    },
    getMetricIconClass(id) {
      const classes = {
        total: 'customer-stats-page__metric-icon--blue',
        active: 'customer-stats-page__metric-icon--green',
        new: 'customer-stats-page__metric-icon--purple',
        churn: 'customer-stats-page__metric-icon--orange'
      }
      return classes[id] || ''
    },
    initProfitChart() {
      const chart = this.$echarts.init(this.$refs.profitChart)
      chart.setOption({
        tooltip: { trigger: 'item' },
        series: [{
          name: '수익률 분포',
          type: 'pie',
          radius: ['0%', '80%'],
          label: { show: true, formatter: '{b} ({d}%)' },
          data: this.customerReturns.map(item => ({
            value: item.count,
            name: item.name,
            itemStyle: { color: item.color }
          }))
        }]
      })
    },
    refreshData() {
      alert('데이터를 성공적으로 새로고침했습니다.')
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/customer/stats.css';
</style>
