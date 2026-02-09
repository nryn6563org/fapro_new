<template>
  <div class="p-stock-issue">
    <!-- Header -->
    <header class="p-stock-issue__header">
      <div class="p-stock-issue__title-group">
        <h1 class="p-stock-issue__title">이슈발생종목</h1>
        <p class="p-stock-issue__subtitle">시장 주요 이슈와 연관 종목의 흐름을 확인하세요.</p>
      </div>
      <div class="p-stock-ranking__actions">
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

    <!-- Bubble Chart Section -->
    <div class="c-card p-6">
      <div class="flex items-center justify-between mb-6">
        <div class="flex gap-2">
          <button 
            v-for="t in ['ai', 'us', 'supply']" 
            :key="t"
            class="c-btn c-btn--sm"
            :class="bubbleTab === t ? 'c-btn--primary' : 'c-btn--ghost border border-gray-100'"
            @click="bubbleTab = t"
          >
            {{ t === 'ai' ? 'AI이슈포착' : t === 'us' ? '미국이슈포착' : '이슈수급강도' }}
          </button>
        </div>
        <div class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Interactive Mood Map
        </div>
      </div>

      <div class="p-stock-issue__bubble-area">
        <svg width="100%" height="400" viewBox="0 0 700 400" class="overflow-visible">
          <defs>
            <filter id="bubble-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.1" />
            </filter>
            <radialGradient id="bubble-grad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stop-color="white" stop-opacity="0.3" />
              <stop offset="100%" stop-color="white" stop-opacity="0" />
            </radialGradient>
          </defs>
          
          <g v-for="b in bubbleData" :key="b.id" class="p-stock-issue__bubble" :class="{'p-stock-issue__bubble--active': selectedBubble === b.id}" @click="selectedBubble = b.id">
            <circle :cx="b.x" :cy="b.y" :r="b.size" :fill="selectedBubble === b.id ? '#ef4444' : b.color" :fill-opacity="selectedBubble === b.id ? 1 : 0.7" filter="url(#bubble-shadow)" />
            <circle :cx="b.x" :cy="b.y" :r="b.size" fill="url(#bubble-grad)" />
            <text 
              :x="b.x" :y="b.y" 
              text-anchor="middle" dominant-baseline="middle" 
              fill="white" class="text-[11px] font-bold pointer-events-none select-none"
            >
              <tspan v-for="(line, i) in b.name.split(' ')" :key="i" :x="b.x" :dy="i === 0 ? 0 : 14">{{ line }}</tspan>
            </text>
          </g>
        </svg>
      </div>
    </div>

    <!-- Issue List -->
    <div class="space-y-4">
      <div 
        v-for="issue in filteredIssues" 
        :key="issue.id"
        class="c-issue-card"
        :class="{'c-issue-card--active': selectedBubble === issue.id}"
        @click="openIssueModal(issue)"
      >
        <div class="flex items-start justify-between mb-2">
          <h3 class="c-issue-card__title">{{ issue.issueName }}</h3>
          <span class="text-[10px] text-gray-400 font-bold">{{ issue.date }}</span>
        </div>
        <p class="c-issue-card__content">{{ issue.issueContent }}</p>
        <div class="c-issue-card__stocks">
          <nuxt-link 
            v-for="s in issue.relatedStocks.slice(0, 5)" 
            :key="s.code"
            :to="`/stock/detail/${s.code}`"
            class="c-issue-stock-tag"
            :class="s.change >= 0 ? 'text-red-500 border-red-100' : 'text-blue-500 border-blue-100'"
            @click.stop
          >
            {{ s.name }} {{ s.change >= 0 ? '+' : '' }}{{ s.change }}%
          </nuxt-link>
          <span v-if="issue.relatedStocks.length > 5" class="text-[10px] text-gray-400 flex items-center ml-1">
            외 {{ issue.relatedStocks.length - 5 }}개
          </span>
        </div>
      </div>
    </div>

    <!-- Issue Detail Modal -->
    <transition name="t-fade">
      <div v-if="issueModal" class="c-modal-overlay" @click.self="issueModal = null">
        <div class="c-modal max-w-4xl">
          <div class="c-modal__header">
            <div class="c-modal__title-group">
              <AlertCircle :size="20" class="text-orange-500" />
              <div>
                <h3 class="c-modal__title">이슈 상세분석</h3>
                <p class="c-modal__subtitle">{{ issueModal.issueName }}</p>
              </div>
            </div>
            <button class="c-modal__close" @click="issueModal = null">
              <X :size="20" />
            </button>
          </div>
          <div class="c-modal__body">
            <!-- News feed -->
            <div class="c-issue-modal-news mb-6">
              <div v-for="(news, idx) in issueModal.news" :key="idx" class="c-issue-modal-news__item">
                <FileText :size="12" class="mt-0.5 text-gray-400" />
                {{ news }}
              </div>
            </div>

            <!-- Tabs -->
            <div class="flex border-b border-gray-100 dark:border-gray-800 mb-6">
              <button 
                v-for="t in ['trend', 'supply']" 
                :key="t"
                class="px-6 py-3 text-sm font-bold transition-all border-b-2"
                :class="modalTab === t ? 'text-primary border-primary' : 'text-gray-400 border-transparent'"
                @click="modalTab = t"
              >
                {{ t === 'trend' ? '이슈 검색추이' : '이슈 수급동향' }}
              </button>
            </div>

            <!-- Tab Content -->
            <div class="space-y-6">
              <div class="c-trend-chart">
                <div class="text-center opacity-50">
                  <BarChart :size="48" class="mx-auto mb-2 text-primary" />
                  <p class="text-xs font-bold">{{ modalTab === 'trend' ? 'Trend Visualization Area' : 'Supply Analysis Area' }}</p>
                  <p class="text-[10px]">Real-time chart integration in progress</p>
                </div>
              </div>

              <!-- Related Stocks -->
              <div>
                <h4 class="text-xs font-bold text-gray-900 dark:text-white mb-3">연관 종목 분석</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div 
                    v-for="s in issueModal.relatedStocks" 
                    :key="s.code"
                    class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between"
                  >
                    <div>
                      <nuxt-link :to="`/stock/detail/${s.code}`" class="text-sm font-bold hover:text-primary transition-colors">{{ s.name }}</nuxt-link>
                      <div class="text-[10px] text-gray-400">{{ s.code }} · {{ s.price.toLocaleString() }}원</div>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="text-sm font-bold" :class="s.change >= 0 ? 'text-red-500' : 'text-blue-500'">
                        {{ s.change >= 0 ? '+' : '' }}{{ s.change }}%
                      </div>
                      <button 
                        v-if="s.hasAiReport" 
                        class="c-btn c-btn--primary c-btn--xs px-2"
                        @click="openAiReport(s)"
                      >
                        AI리포트
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- AI Report Modal (Popup) -->
    <transition name="t-fade">
      <div v-if="aiReportStock" class="c-modal-overlay" @click.self="aiReportStock = null">
        <div class="c-modal max-w-lg">
          <div class="c-modal__header bg-primary text-white">
            <div class="c-modal__title-group">
              <Zap :size="20" />
              <div>
                <h3 class="c-modal__title text-white">{{ aiReportStock.name }} AI Report</h3>
                <p class="c-modal__subtitle text-white/70">{{ aiReportStock.code }} 실시간 분석</p>
              </div>
            </div>
            <button class="c-modal__close text-white hover:bg-white/10" @click="aiReportStock = null">
              <X :size="20" />
            </button>
          </div>
          <div class="c-modal__body">
            <div class="c-report-summary mb-6">
              {{ aiReportStock.name }}는 해당 이슈와 관련하여 기술적/기본적 분석 결과 매우 높은 연관성을 보이고 있습니다. 인프라 구축 및 초기 선점 효과로 인하여 단기 상승 모멘텀이 강화될 것으로 예측됩니다.
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div class="text-[10px] text-gray-400 font-bold mb-1">상승 가능성</div>
                <div class="text-lg font-bold text-red-500">85%</div>
              </div>
              <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div class="text-[10px] text-gray-400 font-bold mb-1">AI 투자 의견</div>
                <div class="text-lg font-bold text-primary">적극 매수</div>
              </div>
            </div>
          </div>
          <div class="c-modal__footer">
            <nuxt-link :to="`/stock/detail/${aiReportStock.code}`" class="c-btn c-btn--primary w-full">상세 분석 리포트 전체보기</nuxt-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'StockIssuePage',
  data() {
    return {
      searchQuery: '',
      bubbleTab: 'ai',
      modalTab: 'trend',
      selectedBubble: null,
      issueModal: null,
      aiReportStock: null,
      bubbleData: [
        { id: 1, x: 150, y: 180, size: 100, name: '전고체 배터리', color: '#ff6b6b' },
        { id: 2, x: 350, y: 150, size: 85, name: '바이오 신약', color: '#ff8787' },
        { id: 3, x: 280, y: 250, size: 95, name: '2차전지', color: '#ffa94d' },
        { id: 4, x: 520, y: 140, size: 75, name: '반도체 장비', color: '#ff922b' },
        { id: 5, x: 200, y: 320, size: 70, name: '수소경제', color: '#ff6b9d' },
        { id: 6, x: 450, y: 250, size: 110, name: 'AI 데이터센터', color: '#ef4444' }
      ],
      issues: [
        { 
          id: 1,
          issueName: "전고체 배터리", 
          issueContent: "글로벌 완성차 업체와 대규모 배터리 공급 계약 체결로 향후 3년간 안정적인 매출 확보. 전고체 배터리 기술 상용화 기대.", 
          date: "2026-02-02",
          news: [
            "[매경] LG에너지솔루션, 전고체 배터리 양산 로드맵 공개... 2027년 상용화 목표",
            "[한경] 삼성SDI, 차세대 전고체 배터리 기술로 글로벌 완성차 3곳과 공급 계약"
          ],
          relatedStocks: [
            { name: "LG에너지솔루션", code: "373220", change: 4.2, price: 428000, hasAiReport: true },
            { name: "삼성SDI", code: "006400", change: 3.8, price: 482000, hasAiReport: true },
            { name: "포스코퓨처엠", code: "003670", change: 5.1, price: 352000, hasAiReport: true }
          ]
        },
        { 
          id: 6,
          issueName: "AI 데이터센터 투자", 
          issueContent: "글로벌 빅테크 기업들의 AI 데이터센터 투자 확대로 관련 인프라 수요 급증. 냉각 시스템, 전력 공급 등 수혜 예상.", 
          date: "2026-02-01",
          news: [
            "[블로터] 빅테크 AI 데이터센터 투자 100조 돌파... SK하이닉스 수혜 기대"
          ],
          relatedStocks: [
            { name: "SK하이닉스", code: "000660", change: 1.8, price: 142000, hasAiReport: true },
            { name: "삼성전자", code: "005930", change: 2.3, price: 68000, hasAiReport: true }
          ]
        }
      ]
    }
  },
  computed: {
    filteredIssues() {
      if (!this.searchQuery) return this.issues;
      const q = this.searchQuery.toLowerCase();
      return this.issues.filter(i => 
        i.issueName.toLowerCase().includes(q) || 
        i.relatedStocks.some(s => s.name.toLowerCase().includes(q))
      );
    }
  },
  methods: {
    refreshIssues() {
      alert('이슈 데이터가 갱신되었습니다.');
    },
    openIssueModal(issue) {
      this.issueModal = issue;
      this.modalTab = 'trend';
    },
    openAiReport(stock) {
      this.aiReportStock = stock;
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/stock/issue.css';
</style>
