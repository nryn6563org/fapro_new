<template>
  <div class="issue-page">
    <div class="issue-page__content">
      <!-- Header -->
      <IssueHeaderComponent
        :value="searchQuery"
        @input="searchQuery = $event"
        @refresh="refreshData"
      />

      <!-- Main Section -->
      <div class="issue-page__main">
        <!-- Title, Tabs & Bubble Chart -->
        <IssueChartSection
          :issue-count="filteredIssues.length"
          :tabs="tabs"
          :active-tab="activeTab"
          :chart-data="currentChartData"
          @update:activeTab="activeTab = $event"
          @bubble-click="handleBubbleClick"
        />

        <!-- Detail Cards List -->
        <IssueListSection
          :selected-bubble="selectedBubble"
          :issues="filteredIssues"
          @clear-filter="selectedBubble = null"
        />
      </div>
    </div>
  </div>
</template>

<script>
import IssueHeaderComponent from '~/components/stock/issue/IssueHeaderComponent.vue'
import IssueChartSection from '~/components/stock/issue/IssueChartSection.vue'
import IssueListSection from '~/components/stock/issue/IssueListSection.vue'

export default {
  name: 'StockIssuePage',
  components: {
    IssueHeaderComponent,
    IssueChartSection,
    IssueListSection
  },
  data() {
    return {
      searchQuery: '',
      activeTab: 'ai',
      selectedBubble: null,
      tabs: [
        { id: 'ai', label: 'AI이슈포착' },
        { id: 'us', label: '미국이슈포착' },
        { id: 'supply', label: '이슈수급강도' }
      ],
      // Data dictionary for each tab
      allData: {
        ai: {
          chart: [
            [30, 45, 18, '전고체\n배터리', '2차전지'],
            [55, 60, 15, '반도체\n장비', '반도체'],
            [65, 30, 20, 'AI\n데이터센터', 'AI'],
            [45, 75, 14, '2차전지', '2차전지'],
            [20, 25, 16, '수소경제', '에너지'],
            [50, 15, 16, '방위산업', '방산'],
            [75, 70, 14, '바이오\n신약', '바이오'],
            [85, 40, 15, '우주산업', '우주']
          ],
          issues: [
            {
              id: 1,
              title: '방위산업 수출 확대',
              date: '2026-01-30',
              theme: 'marketing',
              keyword: '방위산업',
              desc: '중동 및 동남아 국가들과 방산 수출 계약 체결로 수주 잔고 역대 최대 수준. K-방산 경쟁력 입증으로 추가 수주 기대감 상승.',
              stocks: [
                { name: '퍼스텍', change: 6.2 },
                { name: '한화에어로스페이스', change: 5.8 },
                { name: '한화시스템', change: 4.5 },
                { name: 'LIG넥스원', change: 4.2 },
                { name: '현대로템', change: 3.9 }
              ]
            },
            {
              id: 2,
              title: '전고체 배터리 상용화 가속',
              date: '2026-02-02',
              theme: 'battery',
              keyword: '전고체\n배터리',
              desc: '글로벌 완성차 업체와 대규모 배터리 공급 계약 체결로 향후 3년간 안정적인 매출 확보. 전고체 배터리 기술 상용화로 전기차 시장의 게임 체인저로 부상.',
              stocks: [
                { name: '포스코퓨처엠', change: 5.1 },
                { name: 'LG에너지솔루션', change: 4.2 },
                { name: '삼성SDI', change: 3.8 },
                { name: 'LG화학', change: 3.2 },
                { name: '에코프로', change: 2.5 }
              ]
            },
            {
              id: 3,
              title: '바이오 신약 FDA 승인',
              date: '2026-02-02',
              theme: 'battery',
              keyword: '바이오\n신약',
              desc: '바이오 신약 FDA 승인 완료로 북미 시장 공략 본격화, 연간 5천억 원 이상 매출 기대. 추가 파이프라인도 임상 3상 진행 중으로 지속적인 성장 동력 확보.',
              stocks: [
                { name: '한미약품', change: 3.4 },
                { name: '셀트리온', change: 2.8 },
                { name: '삼성바이오로직스', change: 2.3 },
                { name: '유한양행', change: 1.9 },
                { name: 'SK바이오팜', change: 1.5 }
              ]
            },
            {
              id: 4,
              title: '2차전지 소재 공급계약',
              date: '2026-02-01',
              theme: 'battery',
              keyword: '2차전지',
              desc: '유럽 배터리 제조사와 양극재 장기 공급 계약 체결로 수주 잔고 대폭 증가. 2025년까지 연간 20만톤 규모의 양극재 공급 계약으로 매출 증대 예상.',
              stocks: [
                { name: '에코프로비엠', change: 6.3 },
                { name: '포스코퓨처엠', change: 5.1 },
                { name: '천보', change: 4.7 },
                { name: '일진머티리얼즈', change: 3.8 },
                { name: 'LG화학', change: 3.2 }
              ]
            },
            {
              id: 5,
              title: 'AI 데이터센터 전력 수요 급증',
              date: '2026-02-04',
              theme: 'marketing',
              keyword: 'AI\n데이터센터',
              desc: 'AI 데이터센터 확대에 따른 전력 인프라 수요 급증으로 전선 및 변압기 관련 기업 수혜 예상.',
              stocks: [
                { name: 'LS ELECTRIC', change: 8.5 },
                { name: 'HD현대일렉트릭', change: 7.2 },
                { name: '가온전선', change: 5.4 }
              ]
            }
          ]
        },
        us: {
          chart: [
            [20, 80, 20, '빅테크\n실적', '기술주'],
            [70, 20, 15, '금리인하\n기대', '금융'],
            [40, 50, 18, 'AI\n반도체', '반도체'],
            [80, 70, 12, '전기차\n치킨게임', '자동차']
          ],
          issues: [
            {
              id: 101,
              title: '미국 빅테크 실적 호조',
              date: '2026-02-03',
              theme: 'marketing',
              keyword: '빅테크\n실적',
              desc: '주요 빅테크 기업들의 클라우드 및 AI 부문 실적이 시장 예상치를 상회하며 나스닥 상승 견인.',
              stocks: [
                { name: 'NVDA', change: 3.2 },
                { name: 'MSFT', change: 2.1 },
                { name: 'GOOGL', change: 1.8 }
              ]
            },
            {
              id: 102,
              title: 'AI 반도체 수요 지속',
              date: '2026-02-04',
              theme: 'marketing',
              keyword: 'AI\n반도체',
              desc: '생성형 AI 모델 고도화 경쟁 심화로 추론용 AI 칩 수요 폭발적 증가 예상.',
              stocks: [
                { name: 'AMD', change: 4.5 },
                { name: 'AVGO', change: 3.1 },
                { name: 'TSM', change: 2.2 }
              ]
            }
          ]
        },
        supply: {
          chart: [
            [50, 50, 25, '외국인\n순매수', '수급'],
            [20, 30, 15, '기관\n매집', '수급'],
            [80, 60, 18, '연기금\n방어', '수급']
          ],
          issues: [
            {
              id: 201,
              title: '반도체 섹터 외국인 5일 연속 순매수',
              date: '2026-02-05',
              theme: 'battery',
              keyword: '외국인\n순매수',
              desc: '환율 안정화와 함게 국내 반도체 대형주에 대한 외국인 자금 유입 가속화.',
              stocks: [
                { name: '삼성전자', change: 1.5 },
                { name: 'SK하이닉스', change: 2.1 }
              ]
            }
          ]
        }
      },
      currentChartData: [],
      currentIssues: []
    }
  },
  computed: {
    filteredIssues() {
      let issues = this.currentIssues

      // Filter by Tab (implicit by currentIssues selection)

      // Filter by Bubble Click
      if (this.selectedBubble) {
        const selectedKeyword = this.selectedBubble[3]
        issues = issues.filter(issue => issue.keyword === selectedKeyword)
      }

      // Filter by Search Query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        issues = issues.filter(issue =>
          issue.title.toLowerCase().includes(query) ||
                  issue.stocks.some(s => s.name.toLowerCase().includes(query))
        )
      }

      return issues
    }
  },
  watch: {
    activeTab: {
      handler(newTab) {
        this.selectedBubble = null
        this.loadTabData(newTab)
      },
      immediate: true
    }
  },
  methods: {
    refreshData() {
      const now = new Date()
      alert(`데이터가 갱신되었습니다. (${now.toLocaleTimeString()})`)
    },
    loadTabData(tabId) {
      if (this.allData[tabId]) {
        this.currentChartData = this.allData[tabId].chart
        this.currentIssues = this.allData[tabId].issues
      } else {
        this.currentChartData = []
        this.currentIssues = []
      }
    },
    handleBubbleClick(bubbleData) {
      // bubbleData: [x, y, size, label, parent]
      this.selectedBubble = bubbleData
      console.log('Selected Bubble:', bubbleData[3])
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/stock/issue.css';
</style>
