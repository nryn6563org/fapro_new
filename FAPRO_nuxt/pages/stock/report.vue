<template>
  <div class="stock-report-page">
    <!-- 헤더 영역: 타이틀 및 검색 -->
    <div class="stock-report-page__header">
      <div class="stock-report-page__title-section">
        <h1 class="stock-report-page__title">AI리포트 생성 종목</h1>
        <p class="stock-report-page__subtitle">AI가 생성한 종목 분석 리포트</p>
      </div>
      <div class="stock-report-page__header-actions">
        <div class="stock-report-page__search-wrapper">
          <svg class="stock-report-page__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="종목명 또는 코드 검색"
            class="stock-report-page__search-input"
          />
        </div>
        <button class="stock-report-page__btn-refresh" @click="resetSearch">
          <svg class="stock-report-page__refresh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
          </svg>
          새로고침
        </button>
      </div>
    </div>

    <!-- 날짜 선택 섹션 -->
    <div class="stock-report-page__date-selector">
      <div class="stock-report-page__date-header">
        <div class="stock-report-page__date-title">
          <svg class="stock-report-page__date-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          전체 리포트
        </div>
        <span class="stock-report-page__update-time">{{ lastUpdateTime }} 업데이트</span>
      </div>

      <div class="stock-report-page__date-list-wrapper">
        <div class="stock-report-page__date-gradient-left"></div>
        <div class="stock-report-page__date-gradient-right"></div>
        <div class="stock-report-page__date-list">
          <div
            v-for="date in dates"
            :key="date"
            class="stock-report-page__date-item"
            :class="{
              'stock-report-page__date-item--selected': selectedDate === date,
              'stock-report-page__date-item--today': date === todayDate
            }"
            @click="selectedDate = date"
          >
            <div class="stock-report-page__date-item-inner">
              <span class="stock-report-page__date-label">{{ date }}</span>
              <div class="stock-report-page__report-count">
                {{ getReportCountByDate(date) }}건
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 리포트 리스트 영역 -->
    <div class="stock-report-page__list-container">
      <div v-if="filteredStocks.length === 0" class="stock-report-page__empty-state">
        선택한 조건에 맞는 리포트가 없습니다.
      </div>

      <div
        v-for="stock in filteredStocks"
        :key="stock.code"
        class="stock-report-page__report-card"
        :class="{ 'stock-report-page__report-card--today': selectedDate === todayDate }"
      >
        <div class="stock-report-page__card-inner">
          <!-- 카드 상단: 시간 및 배지 -->
          <div class="stock-report-page__card-time-header">
            <span class="stock-report-page__card-time">{{ stock.datetime.split(' ')[1] }}</span>
            <span v-if="selectedDate === todayDate" class="stock-report-page__new-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              NEW
            </span>
          </div>

          <!-- 메인 정보: 종목명 및 등락 -->
          <div class="stock-report-page__card-main">
            <div class="stock-report-page__stock-info">
              <nuxt-link :to="`/stock/detail/${stock.code}`" class="stock-report-page__stock-link">
                {{ stock.name }}
              </nuxt-link>
              <span class="stock-report-page__stock-code">({{ stock.code }})</span>
              <div
                class="stock-report-page__price-badge"
                :class="stock.change >= 0 ? 'stock-report-page__price-badge--up' : 'stock-report-page__price-badge--down'"
              >
                {{ stock.change >= 0 ? '▲' : '▼' }} {{ Math.abs(stock.change) }}%
              </div>
            </div>
            <button class="stock-report-page__btn-customers" @click="openCustomerModal(stock)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline>
              </svg>
              보유 고객 ({{ stock.relatedCustomers.length }})
            </button>
          </div>

          <!-- 요약 텍스트 -->
          <p class="stock-report-page__summary-text">
            {{ stock.fullReport.summary }}
          </p>

          <!-- 액션 버튼 -->
          <div class="stock-report-page__actions-grid">
            <div class="stock-report-page__action-group">
              <div class="stock-report-page__action-buttons-group">
                <button class="stock-report-page__btn-action" @click="openReportModal(stock)">
                  AI리포트
                </button>
                <button class="stock-report-page__btn-action" @click="openScriptModal(stock)">
                  요약
                </button>
              </div>
              <button class="stock-report-page__btn-send" @click="sendTelegram(stock)">
                텔레그램 전송
              </button>
            </div>
            <button class="stock-report-page__btn-expand" @click="toggleHistory(stock.code)">
              최근 리포트 히스토리 ({{ stock.history ? stock.history.length : 0 }}개)
              <svg class="stock-report-page__expand-icon" :class="{ 'stock-report-page__expand-icon--rotated': expandedStocks[stock.code] }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- 히스토리 영역 -->
        <div v-if="expandedStocks[stock.code]" class="stock-report-page__history-section">
          <div class="stock-report-page__history-title">최근 리포트 히스토리</div>
          <div v-for="(hist, idx) in stock.history" :key="idx" class="stock-report-page__history-item">
            <div class="stock-report-page__history-item-header">
              <div class="stock-report-page__history-meta">
                <span>{{ hist.datetime }}</span>
                <span :class="hist.change >= 0 ? 'text-red-500' : 'text-blue-500'">
                  {{ hist.change >= 0 ? '▲' : '▼' }} {{ Math.abs(hist.change) }}%
                </span>
                <span class="stock-report-page__opinion-badge" :class="getOpinionClass(hist.opinion)">
                  {{ hist.opinion }}
                </span>
              </div>
            </div>
            <p class="stock-report-page__history-summary">{{ hist.summary }}</p>
            <button class="stock-report-page__btn-view-detail" @click="openReportModal(stock, hist)">상세 리포트 보기</button>
          </div>
        </div>
      </div>
    </div>

    <!-- AI 리포트 상세 모달 -->
    <div v-if="modals.report.show" class="stock-report-page__modal-overlay" @click.self="modals.report.show = false">
      <div class="stock-report-page__modal-content">
        <div class="stock-report-page__modal-header stock-report-page__modal-header--purple">
          <div>
            <h3 class="stock-report-page__modal-title-main">{{ modals.report.data.name }} AI 리포트</h3>
            <p class="stock-report-page__modal-title-sub">종목코드: {{ modals.report.data.code }}</p>
          </div>
          <button class="stock-report-page__btn-close-modal" @click="modals.report.show = false">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="stock-report-page__modal-body">
          <div class="stock-report-page__modal-body-section">
            <div class="stock-report-page__modal-section-label">요약</div>
            <div class="stock-report-page__modal-section-content">{{ modals.report.data.fullReport.summary }}</div>
          </div>
          <div class="stock-report-page__modal-body-section">
            <div class="stock-report-page__modal-section-label">시장 동향</div>
            <div class="stock-report-page__modal-section-content">{{ modals.report.data.fullReport.marketTrend }}</div>
          </div>
          <div class="stock-report-page__modal-body-section">
            <div class="stock-report-page__modal-section-label">재무 분석</div>
            <div class="stock-report-page__modal-section-content">{{ modals.report.data.fullReport.financialAnalysis }}</div>
          </div>
          <div class="stock-report-page__modal-body-section">
            <div class="stock-report-page__modal-section-label">투자 의견</div>
            <div class="stock-report-page__modal-section-content">{{ modals.report.data.fullReport.investment }}</div>
          </div>
        </div>
        <div class="stock-report-page__modal-footer">
          <button class="stock-report-page__btn-footer-primary">리포트 다운로드</button>
          <button class="stock-report-page__btn-footer-secondary" @click="modals.report.show = false">닫기</button>
        </div>
      </div>
    </div>

    <!-- 요약 스크립트 모달 -->
    <div v-if="modals.script.show" class="stock-report-page__modal-overlay" @click.self="modals.script.show = false">
      <div class="stock-report-page__modal-content stock-report-page__modal-content--compact">
        <div class="stock-report-page__modal-header stock-report-page__modal-header--purple">
          <h3 class="stock-report-page__modal-title-main">요약 스크립트</h3>
          <button class="stock-report-page__btn-close-modal" @click="modals.script.show = false">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="stock-report-page__modal-body">
          <div class="stock-report-page__modal-section-content stock-report-page__modal-section-content--pre">{{ modals.script.data.script }}</div>
        </div>
        <div class="stock-report-page__modal-footer">
          <button class="stock-report-page__btn-footer-primary" @click="copyScript(modals.script.data.script)">스크립트 복사</button>
        </div>
      </div>
    </div>

    <!-- 보유 고객 모달 -->
    <div v-if="modals.customers.show" class="stock-report-page__modal-overlay" @click.self="modals.customers.show = false">
      <div class="stock-report-page__modal-content">
        <div class="stock-report-page__modal-header stock-report-page__modal-header--green">
          <h3 class="stock-report-page__modal-title-main">{{ modals.customers.data.name }} 보유 고객 리스트</h3>
          <button class="stock-report-page__btn-close-modal" @click="modals.customers.show = false">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="stock-report-page__modal-body">
          <div class="stock-report-page__customer-list">
            <div v-for="(cust, idx) in modals.customers.data.relatedCustomers" :key="idx" class="stock-report-page__customer-card">
              <div class="stock-report-page__customer-info">
                <div class="stock-report-page__customer-avatar">{{ cust.name[0] }}</div>
                <div class="stock-report-page__customer-name">{{ cust.name }}</div>
              </div>
              <div class="stock-report-page__customer-amount">{{ cust.investAmount }}</div>
              <div
                class="stock-report-page__customer-return"
                :class="{ 'stock-report-page__customer-return--up': cust.returnRate >= 0 }"
              >
                {{ cust.returnRate >= 0 ? '+' : '' }}{{ cust.returnRate }}%
              </div>
              <div class="stock-report-page__customer-holdings">{{ cust.holdings }}</div>
            </div>
          </div>
        </div>
        <div class="stock-report-page__modal-footer">
          <button class="stock-report-page__btn-footer-secondary" style="width: 100%" @click="modals.customers.show = false">닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockReportPage',
  data() {
    return {
      searchQuery: '',
      selectedDate: '',
      todayDate: '01-30',
      lastUpdateTime: '14:23',
      expandedStocks: {},
      reportStocks: [
        {
          name: '삼성전자',
          code: '005930',
          change: 2.3,
          datetime: '01-30 14:23',
          script: '삼성전자에 대한 AI 분석 리포트입니다. 최근 반도체 업황 회복세에 힘입어 주가가 상승세를 보이고 있습니다. HBM3 메모리 수요 증가와 파운드리 사업 개선으로 2분기 실적 개선이 예상됩니다. 목표주가는 85,000원으로 상향 조정합니다.',
          fullReport: {
            summary: '반도체 업황 회복과 AI 수요 증가로 실적 개선 전망',
            marketTrend: '글로벌 반도체 시장은 AI 반도체와 HBM 메모리 수요 급증으로 회복세를 보이고 있습니다.',
            financialAnalysis: '2024년 1분기 영업이익 6조원 예상, 전년 대비 150% 증가.',
            investment: "목표주가 85,000원, 투자의견 '매수' 유지.",
            risks: '중국 반도체 규제 강화, 환율 변동성, 메모리 가격 조정 가능성'
          },
          relatedCustomers: [
            { name: '김철수', investAmount: '5,000만원', returnRate: 15.2, holdings: '500주' },
            { name: '이영희', investAmount: '3,200만원', returnRate: 12.8, holdings: '320주' },
            { name: '박민수', investAmount: '8,500만원', returnRate: 18.5, holdings: '850주' }
          ],
          history: [
            { datetime: '01-25 09:15', change: 1.8, summary: 'HBM3 메모리 수요 증가, 파운드리 개선', opinion: 'Buy' },
            { datetime: '01-20 16:30', change: -0.5, summary: '단기 조정국면 진입', opinion: 'Hold' }
          ]
        },
        {
          name: '현대차',
          code: '005380',
          change: -1.2,
          datetime: '01-30 11:15',
          script: '현대차 분석 리포트입니다. 전기차 판매 둔화와 원자재 가격 상승으로 단기 실적 부담이 예상됩니다.',
          fullReport: {
            summary: '전기차 시장 둔화 우려, 하지만 신규 모델 출시로 반등 기대',
            marketTrend: '글로벌 전기차 시장의 성장세가 둔화되고 있으나, 하이브리드 차량 수요는 여전히 강세입니다.',
            financialAnalysis: '2024년 연간 영업이익률 7.5% 예상.',
            investment: "목표주가 220,000원, 투자의견 '중립'."
          },
          relatedCustomers: [
            { name: '정대호', investAmount: '4,200만원', returnRate: -2.1, holdings: '200주' }
          ],
          history: []
        },
        {
          name: 'NAVER',
          code: '035420',
          change: -0.5,
          datetime: '01-29 16:47',
          script: '네이버 실적 분석입니다. 검색광고 매출은 안정적이나 커머스 부문 경쟁 심화가 우려됩니다.',
          fullReport: {
            summary: '검색 플랫폼 안정성과 AI 투자로 장기 성장 동력 확보',
            marketTrend: '국내 검색 시장 점유율 60% 이상 유지.',
            financialAnalysis: '2024년 매출 10조원 돌파 전망.',
            investment: "목표주가 250,000원, 투자의견 '매수'."
          },
          relatedCustomers: [
            { name: '송미경', investAmount: '7,500만원', returnRate: 22.3, holdings: '350주' }
          ],
          history: []
        }
      ],
      modals: {
        report: { show: false, data: {} },
        script: { show: false, data: {} },
        customers: { show: false, data: {} }
      }
    }
  },
  computed: {
    dates() {
      const allDates = this.reportStocks.map(s => s.datetime.split(' ')[0])
      return [...new Set(allDates)].sort().reverse()
    },
    filteredStocks() {
      return this.reportStocks.filter((stock) => {
        const matchesDate = stock.datetime.startsWith(this.selectedDate)
        const matchesSearch = stock.name.includes(this.searchQuery) || stock.code.includes(this.searchQuery)
        return matchesDate && matchesSearch
      })
    }
  },
  created() {
    if (this.dates.length > 0) {
      this.selectedDate = this.dates[0]
    }
  },
  methods: {
    getReportCountByDate(date) {
      return this.reportStocks.filter(s => s.datetime.startsWith(date)).length
    },
    resetSearch() {
      this.searchQuery = ''
      this.selectedDate = this.todayDate
    },
    toggleHistory(code) {
      this.$set(this.expandedStocks, code, !this.expandedStocks[code])
    },
    getOpinionClass(opinion) {
      return {
        'stock-report-page__opinion-badge--buy': opinion === 'Buy',
        'stock-report-page__opinion-badge--sell': opinion === 'Sell',
        'stock-report-page__opinion-badge--hold': opinion === 'Hold'
      }
    },
    openReportModal(stock, historyItem = null) {
      const displayData = historyItem ? { ...stock, fullReport: { ...stock.fullReport, summary: historyItem.summary } } : stock
      this.modals.report.data = displayData
      this.modals.report.show = true
    },
    openScriptModal(stock) {
      this.modals.script.data = stock
      this.modals.script.show = true
    },
    openCustomerModal(stock) {
      this.modals.customers.data = stock
      this.modals.customers.show = true
    },
    sendTelegram(stock) {
      alert(`${stock.name} 리포트를 텔레그램으로 전송했습니다.`)
    },
    copyScript(text) {
      navigator.clipboard.writeText(text).then(() => {
        alert('스크립트가 복사되었습니다.')
      })
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/stock/report.css';
</style>
