<template>
  <div class="p-stock-issue">
    <!-- 헤더 영역 -->
    <header class="p-stock-issue__header">
      <div class="p-stock-issue__title-group">
        <h1 class="p-stock-issue__title">AI 이슈포착</h1>
        <p class="p-stock-issue__subtitle">시장 주요 이슈와 연관 종목의 흐름을 실시간으로 확인하세요.</p>
      </div>
      <div class="flex gap-4">
        <div class="p-stock-ranking__search">
          <Search class="p-stock-ranking__search-icon" :size="16" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="이슈 또는 종목 검색" 
            class="p-stock-ranking__search-input"
          />
        </div>
        <button class="c-btn c-btn--ghost c-btn--sm" @click="refreshIssues">
          <RefreshCw :size="16" class="mr-1.5" />
          새로고침
        </button>
      </div>
    </header>

    <!-- 메인 스플릿 뷰 -->
    <div class="p-stock-issue__split-view">
      <!-- 좌측: 버블 차트 영역 -->
      <section class="p-stock-issue__bubble-container">
        <div class="p-stock-issue__bubble-header">
          <div class="flex gap-2">
            <button 
              v-for="t in ['ai', 'us']" 
              :key="t"
              class="c-tab-btn"
              :class="bubbleTab === t ? 'c-tab-btn--active' : 'c-tab-btn--inactive'"
              @click="bubbleTab = t"
            >
              {{ t === 'ai' ? '한국 이슈' : '미국 이슈' }}
            </button>
          </div>
          <div class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Interactive Issue Map
          </div>
        </div>
        
        <div ref="bubbleChart" class="p-stock-issue__bubble-area">
          <!-- D3가 여기에 SVG를 생성합니다 -->
        </div>
      </section>

      <!-- 우측: 상세 정보 패널 -->
      <section v-if="selectedIssueData" class="p-stock-issue__detail-panel">
        <div class="c-detail-card">
          <header class="c-detail-card__header">
            <div class="flex items-center justify-between mb-4">
              <h3 class="c-detail-card__title">
                <Brain :size="20" class="text-primary" />
                {{ selectedIssueData.issueName }}
              </h3>
              <span class="text-[10px] text-gray-400 font-bold">최근 업데이트: {{ selectedIssueData.date }}</span>
            </div>
            <div class="flex gap-3">
              <div class="flex-1 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <p class="text-[10px] text-gray-400 font-bold mb-1">검색 빈도</p>
                <p class="text-lg font-black text-gray-900 dark:text-white">{{ selectedIssueData.searchCount.toLocaleString() }}건</p>
              </div>
              <div class="flex-1 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <p class="text-[10px] text-gray-400 font-bold mb-1">평균 등락률</p>
                <p class="text-lg font-black" :class="selectedIssueData.avgChange >= 0 ? 'text-red-500' : 'text-blue-500'">
                  {{ selectedIssueData.avgChange >= 0 ? '+' : '' }}{{ selectedIssueData.avgChange }}%
                </p>
              </div>
            </div>
          </header>

          <div class="c-detail-card__body">
            <!-- 트렌드 차트 (ApexCharts) -->
            <div>
              <h4 class="text-xs font-bold text-gray-900 dark:text-white mb-3">검색 추이 및 누적 등락률</h4>
              <div class="c-chart-container">
                <client-only>
                  <apexchart 
                    type="line" 
                    height="100%" 
                    :options="chartOptions" 
                    :series="chartSeries"
                  />
                </client-only>
              </div>
            </div>

            <!-- 연관 종목 리스트 -->
            <div>
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-xs font-bold text-gray-900 dark:text-white">연관 종목</h4>
                <button class="text-[10px] text-primary font-bold hover:underline">더보기</button>
              </div>
              <div class="c-related-stocks">
                <div 
                  v-for="s in selectedIssueData.relatedStocks" 
                  :key="s.code"
                  class="c-related-stock-item"
                >
                  <div class="c-related-stock-info">
                    <span class="c-related-stock-name">{{ s.name }}</span>
                    <span class="c-related-stock-code">{{ s.code }}</span>
                  </div>
                  <div class="c-related-stock-price">
                    <span class="c-related-stock-val">{{ s.price.toLocaleString() }}원</span>
                    <span class="c-related-stock-change" :class="s.change >= 0 ? 'text-red-500' : 'text-blue-500'">
                      {{ s.change >= 0 ? '+' : '' }}{{ s.change }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 이슈 요약 -->
            <div class="c-issue-summary">
              <h5 class="c-issue-summary__title">이슈 요약</h5>
              <p class="c-issue-summary__text">{{ selectedIssueData.issueContent }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 선택되지 않았을 때의 상태 -->
      <section v-else class="p-stock-issue__detail-panel">
        <div class="c-detail-card h-full flex items-center justify-center p-12 text-center">
          <div class="opacity-30">
            <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <MousePointer2 :size="32" class="text-gray-400" />
            </div>
            <p class="text-sm font-bold text-gray-500">좌측의 이슈 버블을 선택하여<br/>상세 분석 내용을 확인하세요.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { Search, RefreshCw, Brain, X, MousePointer2 } from 'lucide-vue'

export default {
  /**
   * 이슈발생종목 페이지 (AI 이슈포착)
   * D3.js 기반의 인터랙티브 버블 차트와 ApexCharts 기반의 트렌드 분석을 결합하여
   * 시장의 주요 이슈를 시각화합니다.
   */
  name: 'StockIssuePage',
  components: { Search, RefreshCw, Brain, X, MousePointer2 },
  data() {
    return {
      searchQuery: '',
      bubbleTab: 'ai',
      selectedIssue: 1, // 기본 선택 이슈 ID
      d3: null,
      simulation: null,
      issues: [
        { 
          id: 1,
          issueName: "전고체 배터리", 
          issueContent: "차세대 배터리로 각광받는 전고체 배터리의 상용화 로드맵이 가속화되면서 시장의 관심이 집중되고 있습니다. 특히 글로벌 완성차 업체와의 대규모 공급 계약이 체결되면서 안정적인 매출 확보가 기대됩니다.", 
          date: "2026-02-10",
          searchCount: 12540,
          avgChange: 4.5,
          color: '#ff6b6b',
          size: 100,
          relatedStocks: [
            { name: "LG에너지솔루션", code: "373220", change: 4.2, price: 428000 },
            { name: "삼성SDI", code: "006400", change: 3.8, price: 482000 },
            { name: "포스코퓨처엠", code: "003670", change: 5.1, price: 352000 }
          ],
          trend: [10, 15, 25, 40, 65, 85, 100] // 검색 트렌드 데이터
        },
        { 
          id: 2,
          issueName: "AI 데이터센터", 
          issueContent: "빅테크 기업들의 AI 인프라 투자 확대로 인해 데이터센터 수요가 폭증하고 있습니다. 냉각 솔루션 및 고성능 메모리 반도체 관련 종목들이 강세를 보이고 있습니다.", 
          date: "2026-02-10",
          searchCount: 8900,
          avgChange: 2.3,
          color: '#ff922b',
          size: 85,
          relatedStocks: [
            { name: "SK하이닉스", code: "000660", change: 1.8, price: 142000 },
            { name: "삼성전자", code: "005930", change: 2.3, price: 68000 }
          ],
          trend: [40, 45, 52, 58, 65, 75, 82]
        },
        { 
          id: 3,
          issueName: "바이오 신약", 
          issueContent: "임상 3상 성공 소식 및 FDA 승인 기대감이 고조되며 바이오 섹터가 활기를 띠고 있습니다. 주요 제약사와 기술 수출 계약이 체결되며 기업 가치가 재평가되고 있습니다.", 
          date: "2026-02-09",
          searchCount: 6200,
          avgChange: -1.2,
          color: '#4db8ff',
          size: 70,
          relatedStocks: [
            { name: "셀트리온", code: "068270", change: -0.5, price: 178000 },
            { name: "삼성바이오로직스", code: "207940", change: -1.8, price: 812000 }
          ],
          trend: [20, 25, 22, 18, 25, 30, 24]
        },
        { 
          id: 4,
          issueName: "자율주행 L4", 
          issueContent: "완전 자율주행 기술인 레벨4 상용화 테스트 결과가 긍정적으로 발표되면서 V2X 및 관련 센서 업계의 모멘텀이 강화되고 있습니다.", 
          date: "2026-02-10",
          searchCount: 4500,
          avgChange: 1.1,
          color: '#fab005',
          size: 60,
          relatedStocks: [
            { name: "현대모비스", code: "012330", change: 1.2, price: 235000 },
            { name: "HL만도", code: "204320", change: 0.8, price: 42000 }
          ],
          trend: [5, 10, 15, 12, 18, 25, 28]
        }
      ]
    }
  },
  computed: {
    selectedIssueData() {
      return this.issues.find(i => i.id === this.selectedIssue)
    },
    chartOptions() {
      return {
        chart: {
          id: 'trend-chart',
          toolbar: { show: false },
          fontFamily: 'Pretendard, sans-serif'
        },
        stroke: { curve: 'smooth', width: 2 },
        colors: ['#3b82f6'],
        fill: {
          type: 'gradient',
          gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0, stops: [0, 90, 100] }
        },
        xaxis: {
          categories: ['6일전', '5일전', '4일전', '3일전', '2일전', '어제', '오늘'],
          labels: { style: { colors: '#94a3b8', fontSize: '10px' } },
          axisBorder: { show: false },
          axisTicks: { show: false }
        },
        yaxis: {
          show: false
        },
        grid: {
          borderColor: '#f1f5f9',
          strokeDashArray: 4,
          xaxis: { lines: { show: true } }
        },
        tooltip: { theme: 'dark' }
      }
    },
    chartSeries() {
      if (!this.selectedIssueData) return []
      return [{
        name: '검색 지수',
        data: this.selectedIssueData.trend
      }]
    }
  },
  mounted() {
    this.initBubbleChart()
  },
  watch: {
    bubbleTab() {
      // 탭 전환 시 차트 재배치 (예시용 데이터 변경)
      this.initBubbleChart()
    }
  },
  methods: {
    initBubbleChart() {
      // 클라이언트 사이드에서만 D3 초기화
      if (process.client && window.d3) {
        const d3 = window.d3
        const container = this.$refs.bubbleChart
        container.innerHTML = '' // 초기화

        const width = container.clientWidth
        const height = container.clientHeight || 600

        const svg = d3.select(container)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .attr('viewBox', `0 0 ${width} ${height}`)
          .style('overflow', 'visible')

        const nodes = this.issues.map(i => ({ ...i }))

        // Force Simulation 설정
        this.simulation = d3.forceSimulation(nodes)
          .force('charge', d3.forceManyBody().strength(50))
          .force('center', d3.forceCenter(width / 2, height / 2))
          .force('collision', d3.forceCollide().radius(d => d.size / 2 + 10))
          .on('tick', () => {
            bubbleGroups.attr('transform', d => `translate(${d.x}, ${d.y})`)
          })

        const bubbleGroups = svg.selectAll('.bubble-group')
          .data(nodes)
          .enter()
          .append('g')
          .attr('class', 'bubble-group bubble-node')
          .on('click', (event, d) => {
            this.selectedIssue = d.id
          })

        // 버블 원형
        bubbleGroups.append('circle')
          .attr('r', d => d.size / 2)
          .attr('fill', d => d.color)
          .attr('fill-opacity', 0.8)
          .attr('stroke', d => d.color)
          .attr('stroke-width', 2)
          .style('filter', 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))')

        // 버블 텍스트
        bubbleGroups.append('text')
          .attr('class', 'bubble-text')
          .attr('dy', '.35em')
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .style('font-size', d => Math.max(10, d.size / 8) + 'px')
          .text(d => d.issueName)
      }
    },
    refreshIssues() {
      this.initBubbleChart()
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/stock/issue.css';
</style>

<style scoped>
@import '@/assets/css/page/stock/issue.css';
</style>
