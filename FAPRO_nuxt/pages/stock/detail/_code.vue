<template>
  <div class="stock-detail">
    <!-- 뒤로가기 링크 -->
    <nuxt-link to="/" class="stock-detail__back-link">
      <svg class="stock-detail__back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      대시보드로 돌아가기
    </nuxt-link>

    <!-- 상단 종목 정보 카드 -->
    <header v-if="stock" class="stock-detail__header-card">
      <div class="stock-detail__header-top">
        <div class="stock-detail__main-info">
          <div class="stock-detail__badge-group">
            <span class="stock-detail__code-badge">{{ stock.code }}</span>
            <div class="stock-detail__meta-info">
              <span>거래소: 코스피</span>
              <span class="stock-detail__meta-divider"></span>
              <span>업종: {{ stock.tags[0].replace('#', '') }}</span>
            </div>
          </div>
          <div class="stock-detail__title-row">
            <h1 class="stock-detail__name">{{ stock.name }}</h1>
            <div class="stock-detail__price-group">
              <span class="stock-detail__price">{{ stock.price.toLocaleString() }}</span>
              <div class="stock-detail__change-group">
                <span
                  class="stock-detail__change"
                  :class="stock.change >= 0 ? 'stock-detail__change--up' : 'stock-detail__change--down'"
                >
                  {{ stock.change >= 0 ? '▲' : '▼' }} {{ Math.abs(stock.change).toLocaleString() }}
                </span>
                <span
                  class="stock-detail__change-percent"
                  :class="stock.change >= 0 ? 'stock-detail__change--up' : 'stock-detail__change--down'"
                >
                  ({{ stock.changePercent >= 0 ? '+' : '' }}{{ stock.changePercent }}%)
                </span>
              </div>
            </div>
          </div>
          <div class="stock-detail__stats-row">
            <div class="stock-detail__stat-item">
              <span class="stock-detail__stat-label">Market Cap</span>
              <span class="stock-detail__stat-value">62.8조</span>
            </div>
            <div class="stock-detail__stat-item">
              <span class="stock-detail__stat-label">Volume</span>
              <span class="stock-detail__stat-value">1,245,678</span>
            </div>
            <div class="stock-detail__stat-item">
              <span class="stock-detail__stat-label">High / Low (52w)</span>
              <span class="stock-detail__stat-value">520,000 / 380,000</span>
            </div>
            <div class="stock-detail__tags">
              <span v-for="(tag, idx) in stock.tags" :key="idx" class="stock-detail__tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
        <div class="stock-detail__actions">
          <button
            class="stock-detail__btn-favorite"
            :class="{ 'stock-detail__btn-favorite--active': isFavorite }"
            @click="isFavorite = !isFavorite"
          >
            <svg class="stock-detail__favorite-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span class="stock-detail__btn-text">관심종목</span>
          </button>
        </div>
      </div>
    </header>

    <!-- 메인 컨텐츠 그리드 -->
    <main v-if="stock" class="stock-detail__grid">
      <!-- 왼쪽: 보유 및 수익 정보 -->
      <aside class="stock-detail__left-col">
        <section class="stock-detail__signal-card">
          <header class="stock-detail__signal-header">
            <div class="stock-detail__signal-icon-box">
              <svg class="stock-detail__signal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <div class="stock-detail__signal-badge">Premium 분석</div>
            <h2 class="stock-detail__signal-title">라씨 매매신호</h2>
          </header>

          <div class="stock-detail__signal-body">
            <div class="stock-detail__signal-status">
              <div>
                <p class="stock-detail__status-label">Signal Status</p>
                <p class="stock-detail__status-value">보유중</p>
              </div>
              <div class="stock-detail__status-right">
                <p class="stock-detail__status-label">Return Rate</p>
                <p class="stock-detail__return-value">+44.6<span class="stock-detail__return-unit">%</span></p>
              </div>
            </div>

            <div class="stock-detail__signal-stats">
              <div class="stock-detail__signal-stat-box">
                <p class="stock-detail__signal-stat-label">매수일자</p>
                <p class="stock-detail__signal-stat-value">12월 22일</p>
              </div>
              <div class="stock-detail__signal-stat-box">
                <p class="stock-detail__signal-stat-label">보유기간</p>
                <p class="stock-detail__signal-stat-value stock-detail__signal-stat-value--blue">23일째</p>
              </div>
            </div>

            <div class="stock-detail__signal-alert">
              <span class="stock-detail__highlight--purple">{{ stock.name }}</span>는 23일 전 <span class="stock-detail__highlight--dark">{{ (stock.price * 0.7).toLocaleString() }}원</span>에 매수하여 현재 <span class="stock-detail__highlight--red">44.61%</span> 수익 중입니다.
            </div>

            <div class="stock-detail__signal-history">
              <div class="stock-detail__history-header">
                <span class="stock-detail__history-title">신호 성과 히스토리</span>
                <div class="stock-detail__period-toggle">
                  <button
                    @click="chartPeriod = '3m'"
                    :class="['stock-detail__period-btn',
                             chartPeriod === '3m' ? 'stock-detail__period-btn--active' : 'stock-detail__period-btn--inactive']"
                  >
                    3M
                  </button>
                  <button
                    @click="chartPeriod = '1y'"
                    :class="['stock-detail__period-btn',
                             chartPeriod === '1y' ? 'stock-detail__period-btn--active' : 'stock-detail__period-btn--inactive']"
                  >
                    1Y
                  </button>
                </div>
              </div>
              <!-- 차트 컨테이너 -->
              <div ref="signalChart" class="stock-detail__history-chart"></div>
            </div>
          </div>
        </section>
      </aside>

      <!-- 오른쪽: 이벤트, 뉴스, 기본 차트 -->
      <section class="stock-detail__right-col">
        <!-- 이벤트 발생 내역 -->
        <article class="stock-detail__card">
          <header class="stock-detail__card-header">
            <h3 class="stock-detail__card-title">
              <svg class="stock-detail__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              당일 이벤트 발생 내역
            </h3>
            <span class="stock-detail__card-date">2026년 2월 3일</span>
          </header>

          <div class="stock-detail__timeline">
            <div
              v-for="event in paginatedEvents"
              :key="event.id"
              class="stock-detail__event-item"
              :style="{ borderLeftColor: getEventColor(event.type) }"
            >
              <div class="stock-detail__event-icon-box" :style="{ backgroundColor: getEventBg(event.type) }">
                <svg v-if="event.type === '매매신호'" class="stock-detail__event-icon" :style="{ color: getEventColor(event.type) }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                <svg v-else-if="event.type === '뉴스속보'" class="stock-detail__event-icon" :style="{ color: getEventColor(event.type) }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 20l-7-7-7 7V4h14v16z"></path>
                </svg>
                <svg v-else class="stock-detail__event-icon" :style="{ color: getEventColor(event.type) }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div class="stock-detail__event-time">{{ event.time }}</div>
              <div class="stock-detail__event-type" :style="{ backgroundColor: getEventBg(event.type), color: getEventColor(event.type) }">
                {{ event.type }}
              </div>
              <div class="stock-detail__event-summary">
                <p class="stock-detail__event-title">{{ event.summary }}</p>
                <p v-if="event.content" class="stock-detail__event-desc">{{ event.content }}</p>
              </div>
              <button class="stock-detail__btn-analyze">분석보기</button>
            </div>
          </div>

          <footer class="stock-detail__pagination">
            <div class="stock-detail__pagination-info">총 {{ stockEvents.length }}건의 이벤트</div>
            <div class="stock-detail__pagination-controls">
              <button class="stock-detail__btn-page" :disabled="currentPage === 1" @click="currentPage--">
                <svg class="stock-detail__page-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <span class="stock-detail__page-number">{{ currentPage }} / {{ totalPages }}</span>
              <button class="stock-detail__btn-page" :disabled="currentPage === totalPages" @click="currentPage++">
                <svg class="stock-detail__page-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </footer>
        </article>

        <!-- 투자인사이트 유도 -->
        <div class="stock-detail__promo-bar">
          <button class="stock-detail__btn-promo">
            <svg class="stock-detail__promo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            투자인사이트 보기
          </button>
        </div>

        <!-- 뉴스 및 뉴스 헤드라인 -->
        <article class="stock-detail__card">
          <header class="stock-detail__news-header">
            <h3 class="stock-detail__news-headline">
              {{ stock.newsHeadlines[0].content }}
            </h3>
          </header>
          <div class="stock-detail__news-list">
            <div v-for="(news, idx) in stock.newsHeadlines" :key="idx" class="stock-detail__news-item">
              <span class="stock-detail__news-date">({{ news.date }})</span>
              <p class="stock-detail__news-text">{{ news.content }}</p>
            </div>
          </div>
        </article>

        <!-- 주가 차트 영역 -->
        <article class="stock-detail__card">
          <div class="stock-detail__chart-section">
            <div class="stock-detail__chart-container">
              <h4 class="stock-detail__chart-title">{{ stock.name }}({{ stock.code }})</h4>
              <div class="stock-detail__chart-legend">
                <div v-for="(l, i) in legends" :key="i" class="stock-detail__legend-item">
                  <div class="stock-detail__legend-dot" :style="{ backgroundColor: l.color }"></div>
                  {{ l.name }}
                </div>
              </div>
              <div class="stock-detail__chart-canvas">
                <!-- 추후 차트 연동 -->
                <p class="stock-detail__chart-placeholder">실시간 주가 차트 연동 예정</p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>

    <div v-else class="stock-detail__empty">
      <p class="stock-detail__empty-text">종목 정보를 불러올 수 없습니다.</p>
    </div>
  </div>
</template>

<script>
/**
 * Stock Detail Migration
 * -React의 StockDetail 페이지를 Nuxt 동적 라우팅 버전으로 마이그레이션
 * -보유 정보, 이벤트 리스트, 뉴스 헤드라인 구현
 * - Pure BEM CSS architecture
 */

export default {
  name: 'StockDetailPage',
  asyncData({ params }) {
    return { code: params.code }
  },
  data() {
    return {
      isFavorite: false,
      currentPage: 1,
      itemsPerPage: 5,
      currentTime: '01/30 14:23',
      legends: [
        { name: '일봉', color: '#ec4899' },
        { name: '5', color: '#eab308' },
        { name: '20', color: '#60a5fa' },
        { name: '60', color: '#a855f7' },
        { name: '120', color: '#f97316' }
      ],
      stockData: {
        373220: {
          name: 'LG에너지솔루션',
          code: '373220',
          price: 445000,
          change: 18000,
          changePercent: 4.2,
          tags: ['#2차전지', '#높은실적', '#성장주', '#글로벌'],
          newsHeadlines: [
            { date: '01/27', content: '글로벌 완성차 업체와 최대 규모 공급계약 체결' },
            { date: '01/26', content: '포스트코로나 시대 시장성장과 본사 상승 연장' },
            { date: '01/23', content: '리포트: 본래의 실성장 대응 실력 확인 - KS증권' }
          ]
        },
        '005930': {
          name: '삼성전자',
          code: '005930',
          price: 78500,
          change: 1200,
          changePercent: 1.55,
          tags: ['#반도체', '#높은실적', '#플랫', '#TPU'],
          newsHeadlines: [
            { date: '01/27', content: '최근 TPU 관련 중폭으로 주목, 전일 기관 대량 매수' },
            { date: '01/26', content: '포스트코로나 시대 시장성장과 본사 경쟁력 강화' },
            { date: '01/23', content: '리포트: HBM 시장 주도권 확보 전망 - KB증권' }
          ]
        }
      },
      stockEvents: [
        { id: 1, type: '매매신호', time: '09:15', summary: '라씨 매수신호 발생', date: '2026.02.06', content: '실시간 수급 분석 결과 강력한 매수세 유입 확인.' },
        { id: 2, type: '뉴스속보', time: '10:32', summary: 'HBM3E 엔비디아 공급 확대 발표', date: '2026.02.06', content: '차세대 반도체 시장 점유율 60% 이상 확보 전망.' },
        { id: 3, type: '이슈', time: '11:48', summary: '반도체 섹터 전체 급등세', date: '2026.02.06', content: '삼성전자, SK하이닉스 등 대형주 중심의 지수 견인.' },
        { id: 4, type: '공시', time: '13:20', summary: '분기 실적 공시 (잠정)', date: '2026.02.06', content: '영업이익 전분기 대비 25% 상승, 어닝 서프라이즈 기록.' },
        { id: 5, type: '리포트', time: '14:05', summary: 'KB증권 목표가 상향 (620,000원)', date: '2026.02.06', content: '2차전지 소재 부문 생산성 향상 및 마진 극대화.' },
        { id: 6, type: 'AI리포트', time: '15:30', summary: 'AI 분석: 단기 강세 전망', date: '2026.02.06', content: '기술적 지표 분석 결과 정배열 구간 진입, 상승 탄력 강화.' }
      ],
      chartPeriod: '3m',
      chartInstance: null
    }
  },
  computed: {
    stock() {
      return this.stockData[this.code] || this.stockData['005930'] // 없는 경우 삼성전자 기본
    },
    totalPages() {
      return Math.ceil(this.stockEvents.length / this.itemsPerPage)
    },
    paginatedEvents() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.stockEvents.slice(start, start + this.itemsPerPage)
    }
  },
  watch: {
    chartPeriod() {
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
    getEventColor(type) {
      const colors = {
        매매신호: '#9333ea',
        뉴스속보: '#2563eb',
        이슈: '#ea580c',
        공시: '#16a34a',
        리포트: '#4f46e5',
        AI리포트: '#db2777'
      }
      return colors[type] || '#6b7280'
    },
    getEventBg(type) {
      const bgs = {
        매매신호: '#f5f3ff',
        뉴스속보: '#eff6ff',
        이슈: '#fff7ed',
        공시: '#f0fdf4',
        리포트: '#eef2ff',
        AI리포트: '#fdf2f8'
      }
      return bgs[type] || '#f9fafb'
    },
    initChart() {
      const dom = this.$refs.signalChart
      if (!dom) {
        return
      }
      this.chartInstance = this.$echarts.init(dom)
      this.updateChart()
    },
    updateChart() {
      if (!this.chartInstance) {
        return
      }

      const data = [10, 15, 8, 25, 20, 35, 30, 45, 42, 50, 48, 55]
      const labels = ['12/22', '12/26', '01/02', '01/06', '01/10', '01/14', '01/18', '01/22', '01/26', '01/30', '02/03', '02/06']

      const option = {
        grid: { top: '15%', bottom: '15%', left: '10%', right: '10%' },
        tooltip: { trigger: 'axis', backgroundColor: 'rgba(255, 255, 255, 0.9)', textStyle: { color: '#1f2937', fontSize: 10, fontWeight: 'bold' }, borderWidth: 1, borderColor: '#e5e7eb' },
        xAxis: { type: 'category', data: labels, axisLine: { lineStyle: { color: '#f3f4f6' } }, axisLabel: { color: '#9ca3af', fontSize: 9 }, axisTick: { show: false } },
        yAxis: { type: 'value', show: false },
        series: [{
          data,
          type: 'line',
          smooth: true,
          showSymbol: false,
          lineStyle: { color: '#8b5cf6', width: 3 },
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(139, 92, 246, 0.2)' },
              { offset: 1, color: 'rgba(139, 92, 246, 0)' }
            ])
          }
        }]
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
@import '~/assets/css/stock/detail.css';
</style>
