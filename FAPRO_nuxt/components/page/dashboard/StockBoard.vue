<template>
  <div class="c-stock-board">
    <!-- Header: Match Project Branding -->
    <div class="c-stock-board__header">
      <div class="c-stock-board__title-group">
        <div class="c-stock-board__sub-title-group">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert h-4 w-4 text-orange-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>
          <h3 class="c-stock-board__sub-title">AI 이슈포착</h3>
        </div>
      </div>
      <div class="c-stock-board__actions">
        <div class="c-tab-group">
          <button 
            @click="activeTab = 'domestic'" 
            class="c-tab-item"
            :class="{ 'c-tab-item--active': activeTab === 'domestic' }"
          >국내 이슈</button>
          <button 
            @click="activeTab = 'us'" 
            class="c-tab-item"
            :class="{ 'c-tab-item--active': activeTab === 'us' }"
          >미국 이슈</button>
        </div>
      </div>
    </div>
    
    <div class="c-stock-board__body">
      <!-- Left Column: D3 Bubble Chart (40%) -->
      <div class="c-stock-board__chart-area">
        <div ref="bubbleChart" class="c-bubble-container"></div>
        <div class="c-chart-timestamp">{{ currentTimestamp }} 장마감</div>
      </div>
      
      <!-- Right Column: Details (60%) -->
      <div class="c-stock-board__detail-area">
        <div v-if="!selectedIssue" class="c-empty-state">
          <p>이슈 버블을 클릭하면<br>상세 정보를 확인할 수 있습니다.</p>
        </div>
        
        <div v-else class="c-issue-insights">
          <!-- Common: Issue Title -->
          <div class="c-insight-header">
            <h4 class="c-insight-title">
              <span :style="{ color: selectedIssue.color }">{{ selectedIssue.name.replace('\n', ' ') }}</span> 
              연관 종목 검색추이
            </h4>
            <NuxtLink to="/stock/issue" class="c-link-more">더보기 →</NuxtLink>
          </div>

          <!-- Tab Specific Content -->
          <template v-if="activeTab === 'domestic'">
            <!-- Korea: Multi-Series Stock Trend Chart -->
            <div class="c-chart-section">
              <div class="c-chart-labels">
                <span class="c-label-search">검색추이(지수)</span>
              </div>
              <div class="c-apex-container">
                <client-only>
                  <apexchart 
                    v-if="isChartReady"
                    type="line" 
                    height="100%" 
                    :options="koreaChartOptions" 
                    :series="koreaChartSeries"
                  />
                </client-only>
              </div>
            </div>

            <div class="c-stock-section">
              <div class="c-section-header">
                <h5 class="c-section-label">주요종목 (검색순)</h5>
              </div>
              <div class="c-stock-list-box">
                <div class="c-stock-grid">
                  <div v-for="(stock, idx) in sortedMainStocks" :key="stock.name" class="c-stock-item">
                    <!-- Marker matches the line color in the chart -->
                    <span class="c-stock-marker" :style="{ backgroundColor: seriesColors[idx] }"></span>
                    <span class="c-stock-name">{{ stock.name }}</span>
                    <span class="c-stock-val" :class="{ 'is-up': stock.change >= 0 }">
                      {{ stock.change >= 0 ? '+' : '' }}{{ stock.change.toFixed(2) }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="c-news-section">
              <h5 class="c-news-title">{{ selectedIssue.news[0].title }}</h5>
              <div v-for="news in selectedIssue.news" :key="news.id" class="c-news-item">
                <p class="c-news-summary">
                  {{ news.summary }}
                  <NuxtLink to="#" class="c-news-link">[→자세히보기]</NuxtLink>
                </p>
              </div>
            </div>
          </template>

          <template v-else>
            <!-- USA: Summary Box & Top 3 Table -->
            
            <!-- Summary Box -->
            <div class="c-us-summary-box">
              <h5 class="c-us-summary-title">{{ selectedIssue.issueTitle }}</h5>
              <ul class="c-us-summary-list">
                <li v-for="(summary, index) in selectedIssue.issueSummary" :key="index">
                  <span class="c-bullet">•</span> {{ summary }}
                </li>
              </ul>
            </div>

            <!-- Top 3 Table -->
            <div class="c-us-table-section">
              <div class="c-section-header">
                <h5 class="c-section-label">주요 종목 등락 사유 TOP 3</h5>
                <span class="c-label-date">당일 등락률</span>
              </div>
              <div class="c-us-reason-table">
                <div v-for="item in selectedIssue.topReasons" :key="item.code" class="c-us-reason-row">
                  <div class="c-us-reason-info">
                    <div class="c-us-code-name">
                      <span class="c-us-code">{{ item.code }}</span>
                      <span class="c-us-name">{{ item.name }}</span>
                    </div>
                    <p class="c-us-reason-text">{{ item.reason }}</p>
                  </div>
                  <div class="c-us-rate-box">
                    <span class="c-us-rate" :class="{ 'is-up': item.rate >= 0, 'is-down': item.rate < 0 }">
                      {{ item.rate >= 0 ? '+' : '' }}{{ item.rate.toFixed(2) }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockBoard',
  data() {
    return {
      activeTab: 'domestic',
      selectedIssue: null,
      simulation: null,
      currentTimestamp: '02.10',
      isChartReady: false,
      // Multi-series 7-color palette
      seriesColors: ['#f84a4a', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#9ca3af'],
      chartData: {
        domestic: [
          { 
            id: 1, name: '퓨리오사AI', value: 40, size: 100, color: '#f84a4a',
            mainStocks: [
              { name: '엑스페릭스', change: 29.98, searchHistory: [10, 20, 15, 40, 30, 60, 90] },
              { name: 'DSC인베스트먼트', change: 29.94, searchHistory: [5, 10, 25, 20, 45, 50, 85] },
              { name: '포바이포', change: 29.94, searchHistory: [15, 5, 20, 35, 15, 40, 70] },
              { name: 'TS인베스트먼트', change: 29.94, searchHistory: [8, 12, 10, 25, 30, 35, 65] },
              { name: '토마토시스템', change: 14.59, searchHistory: [20, 15, 10, 18, 25, 30, 55] },
              { name: '오픈엣지', change: 10.5, searchHistory: [10, 8, 12, 15, 20, 25, 45] },
              { name: '가온칩스', change: 8.2, searchHistory: [5, 5, 10, 12, 18, 20, 30] }
            ],
            news: [{ 
              id: 1, 
              title: '국가AI컴퓨팅센터에 NPU 탑재...엔비디아 의존도 낮춘다',
              summary: '국내 최대 인공지능(AI) 인프라로 꼽히는 국가AI컴퓨팅센터에 국산 신경망처리장치(NPU)가 탑재될 전망입니다.' 
            }],
          },
          { 
            id: 2, name: '반도체', value: 35, size: 85, color: '#f84a4a',
            mainStocks: [
              { name: 'SK하이닉스', change: 4.5, searchHistory: [40, 45, 50, 55, 60, 65, 80] },
              { name: '한미반도체', change: 12.3, searchHistory: [20, 30, 25, 40, 50, 70, 75] },
              { name: '리노공업', change: 3.2, searchHistory: [10, 15, 18, 20, 25, 30, 40] }
            ],
            news: [{ id: 1, title: 'HBM 시장 주도권 경쟁 심화', summary: '고대역폭메모리(HBM) 시장에서의 경쟁이 더욱 치열해지고 있습니다.' }],
          },
          { 
            id: 3, name: '유통', value: 30, size: 80, color: '#f84a4a',
            mainStocks: [
              { name: '현대백화점', change: 2.1, searchHistory: [10, 12, 15, 18, 20, 25, 30] },
              { name: '신세계', change: 1.8, searchHistory: [8, 10, 12, 15, 18, 22, 28] }
            ],
            news: [{ id: 1, title: '소비 심리 회복세 뚜렷', summary: '대형 유통업체들의 실적이 개선될 것으로 전망됩니다.' }],
          },
          { 
            id: 4, name: '여행', value: 32, size: 82, color: '#3b82f6',
            mainStocks: [
              { name: '하나투어', change: 5.5, searchHistory: [20, 25, 35, 45, 50, 60, 75] },
              { name: '모두투어', change: 4.8, searchHistory: [15, 20, 30, 40, 45, 50, 65] }
            ],
            news: [{ id: 1, title: '해외 여행 수요 폭발적 증가', summary: '본격적인 여행 시즌을 맞아 실적 개선 기대감이 큽니다.' }],
          },
          { 
            id: 5, name: '바이오', value: 28, size: 75, color: '#3b82f6',
            mainStocks: [
              { name: '삼성바이오', change: 1.2, searchHistory: [30, 32, 35, 38, 40, 42, 45] },
              { name: '셀트리온', change: 0.8, searchHistory: [25, 28, 30, 32, 35, 38, 40] }
            ],
            news: [{ id: 1, title: '신약 개발 파이프라인 확대', summary: '국내 바이오 기업들의 글로벌 진출이 가속화되고 있습니다.' }],
          },
          { 
            id: 6, name: '증권', value: 25, size: 70, color: '#3b82f6',
            mainStocks: [
              { name: '미래에셋', change: 0.5, searchHistory: [10, 15, 12, 18, 20, 22, 25] },
              { name: '키움증권', change: 1.1, searchHistory: [8, 12, 10, 15, 18, 20, 22] }
            ],
            news: [{ id: 1, title: '증시 거래대금 증가 추세', summary: '유동성 공급 확대로 증권주에 대한 관심이 높아지고 있습니다.' }],
          },
          { 
            id: 7, name: '2차전지', value: 20, size: 65, color: '#9ca3af',
            mainStocks: [
              { name: 'LG에너지', change: -1.2, searchHistory: [50, 45, 40, 35, 30, 25, 20] },
              { name: '포스코', change: -0.5, searchHistory: [40, 35, 30, 25, 20, 18, 15] }
            ],
            news: [{ id: 1, title: '전기차 시장 성장통', summary: '일시적인 수요 둔화로 인해 이차전지 관련주들이 조정을 받고 있습니다.' }],
          }
        ],
        us: [
          { 
            id: 101, name: '반도체\n장비', value: 45, size: 110, color: '#f84a4a',
            // New Data Structure for US Tab
            issueTitle: '반도체 장비 섹터 투자심리 개선과 수급 유입 지속',
            issueSummary: [
              '반도체 장비 테마는 전반적으로 강세를 보이며 투자심리가 개선됨',
              '여러 종목에서 긍정적인 실적 발표와 애널리스트의 목표가 상향 조정...',
              '일부 종목은 차익실현 매도세에도 불구하고 긍정적인 모멘텀을 유지',
              '합병 소식과 기술적 지표 개선이 매수세를 확대하며 시장의 관심을...',
              '반도체 장비 섹터의 개선된 펀더멘털이 투자자들의 관심을 집중시키...'
            ],
            topReasons: [
              { code: 'ICHR', name: '아이코어 홀딩스', reason: '"매출, 목표 주가" "2026년 1분기 매출 초과"', rate: 32.72 },
              { code: 'UCTT', name: '울트라 클린 홀딩스', reason: '기관 매수세 확대에 따른 주가 상승', rate: 6.99 },
              { code: 'ACLS', name: '액셀리스 테크놀로지스', reason: '합병 소식, 포트폴리오 다각화, 시장 확대', rate: 4.19 }
            ]
          },
          { 
            id: 102, name: 'AI\nChip', value: 30, size: 90, color: '#3b82f6',
            issueTitle: 'AI 칩 수요 폭발적 증가와 공급망 이슈',
            issueSummary: [
              '엔비디아의 차세대 칩 수요가 시장 예상치를 상회함',
              '공급망 제약으로 인한 가격 상승 압력 지속',
              '주요 빅테크 기업들의 자체 칩 개발 경쟁 심화'
            ],
            topReasons: [
              { code: 'NVDA', name: '엔비디아', reason: '데이터센터 매출 급증, 어닝 서프라이즈', rate: 5.42 },
              { code: 'AMD', name: 'AMD', reason: 'MI300 칩 출하량 증가 전망', rate: 3.15 },
              { code: 'INTC', name: '인텔', reason: '파운드리 사업부 분사 이슈', rate: -1.20 }
            ]
          }
        ]
      }
    }
  },
  computed: {
    sortedMainStocks() {
      if (!this.selectedIssue || !this.selectedIssue.mainStocks) return []
      // Sort by the latest search trend value (descending)
      return [...this.selectedIssue.mainStocks].sort((a, b) => {
        const valA = a.searchHistory[a.searchHistory.length - 1]
        const valB = b.searchHistory[b.searchHistory.length - 1]
        return valB - valA
      })
    },
    koreaChartOptions() {
      return {
        chart: {
          id: 'korea-stock-multi-chart',
          toolbar: { show: false },
          fontFamily: 'Pretendard, sans-serif',
          animations: { enabled: true }
        },
        stroke: { curve: 'smooth', width: 2 },
        colors: this.seriesColors,
        xaxis: {
          categories: ['01/12', '01/16', '01/22', '01/28', '02/03', '02/07', '02/10'],
          labels: { style: { fontSize: '10px', colors: '#999' } },
          axisBorder: { show: true, color: '#f1f1f1' },
          axisTicks: { show: false }
        },
        yaxis: { 
          show: true,
          tickAmount: 4,
          labels: { style: { fontSize: '10px', colors: '#999' } }
        },
        grid: { 
          borderColor: '#f9f9f9', 
          xaxis: { lines: { show: false } }, 
          yaxis: { lines: { show: true } }   
        },
        tooltip: { theme: 'light', shared: true },
        legend: { show: false }
      }
    },
    koreaChartSeries() {
      if (!this.selectedIssue) return []
      // Return multiple series for each stock, following the sorted order
      return this.sortedMainStocks.map(stock => ({
        name: stock.name,
        data: stock.searchHistory
      }))
    }
  },
  created() {
    this.checkChartReady()
  },
  mounted() {
    if (process.client) {
      this.$nextTick(() => {
        // Auto-select largest issue by default so line chart shows immediately
        const domesticData = this.chartData.domestic
        if (domesticData && domesticData.length > 0) {
          this.selectedIssue = domesticData.reduce((prev, current) => (prev.value > current.value) ? prev : current)
        }
        this.initBubbleChart()
      })
    }
  },
  watch: {
    activeTab() {
      const currentData = this.chartData[this.activeTab]
      if (currentData && currentData.length > 0) {
        this.selectedIssue = currentData.reduce((prev, current) => (prev.value > current.value) ? prev : current)
      } else {
        this.selectedIssue = null
      }
      this.refreshChart()
    }
  },
  methods: {
    initBubbleChart() {
      if (process.client && window.d3) {
        const d3 = window.d3
        const container = this.$refs.bubbleChart
        if (!container) return
        
        container.innerHTML = ''
        const width = container.clientWidth
        const height = container.clientHeight || 340

        const svg = d3.select(container)
          .append('svg')
          .attr('width', '100%')
          .attr('height', '100%')
          .attr('viewBox', `0 0 ${width} ${height}`)
          .style('overflow', 'visible')

        const nodes = this.chartData[this.activeTab].map(i => ({ ...i }))

        this.simulation = d3.forceSimulation(nodes)
          .force('center', d3.forceCenter(width / 2, height / 2))
          .force('charge', d3.forceManyBody().strength((d) => d.id === this.selectedIssue?.id ? -120 : -50))
          .force('collision', d3.forceCollide().radius(d => d.size / 2 + 3))
          .force('x', d3.forceX(width / 2).strength(0.08))
          .force('y', d3.forceY(height / 2).strength(0.08))
          .on('tick', () => {
            bubbleGroups.attr('transform', d => `translate(${d.x}, ${d.y})`)
          })

        const bubbleGroups = svg.selectAll('.bubble-group')
          .data(nodes)
          .enter()
          .append('g')
          .attr('class', 'bubble-group cursor-pointer')
          .on('click', (event, d) => {
            this.selectedIssue = d
          })

        bubbleGroups.append('circle')
          .attr('r', d => d.size / 2)
          .attr('fill', d => d.color)
          .attr('fill-opacity', 1.0)
          .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))')
          .style('stroke', d => d.id === this.selectedIssue?.id ? 'white' : 'transparent')
          .style('stroke-width', '2px')

        bubbleGroups.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '.3em')
          .attr('fill', 'white')
          .style('font-weight', '700')
          .style('pointer-events', 'none')
          .style('font-size', d => Math.max(10, d.size / 5.2) + 'px')
          .text(d => d.name)
      }
    },
    refreshChart() {
      this.initBubbleChart()
    },
    checkChartReady() {
      if (process.client) {
        const check = () => {
          // Strictly wait for the plugin to register the component
          if (window.$apexReady) {
            this.isChartReady = true
          } else {
            setTimeout(check, 100)
          }
        }
        check()
      }
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/dashboard/stock-board.css';
</style>
