<template>
  <div class="p-stock-report">
    <!-- Header -->
    <header class="p-stock-report__header">
      <div class="p-stock-report__title-group">
        <h1 class="p-stock-report__title">AI리포트 생성 종목</h1>
        <p class="p-stock-report__subtitle">AI가 실시간으로 분석한 종목 리포트를 확인해보세요.</p>
      </div>
      <div class="p-stock-report__actions">
        <div class="p-stock-ranking__search">
          <Search class="p-stock-ranking__search-icon" :size="16" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="종목명 또는 코드 검색" 
            class="p-stock-ranking__search-input"
          />
        </div>
        <button class="c-btn c-btn--ghost c-btn--sm" @click="refreshData">
          <RefreshCw :size="16" class="mr-1.5" />
          새로고침
        </button>
      </div>
    </header>

    <!-- Date Selector -->
    <div class="p-stock-report__date-selector">
      <button 
        class="p-stock-report__date-nav"
        :disabled="selectedDateIndex === dates.length - 1"
        @click="selectedDateIndex++"
      >
        <ChevronLeft :size="20" />
      </button>

      <div class="p-stock-report__date-list">
        <button 
          v-for="(date, idx) in visibleDates" 
          :key="date.value"
          class="p-stock-report__date-btn"
          :class="{'p-stock-report__date-btn--active': selectedDate === date.value}"
          @click="selectedDate = date.value"
        >
          <div class="flex items-center gap-1">
            <span v-if="date.value === today" class="text-[9px] font-bold text-primary">오늘</span>
            <span class="p-stock-report__date-label">{{ date.value }}</span>
          </div>
          <span class="p-stock-report__date-count">{{ date.count }}건</span>
        </button>
      </div>

      <button 
        class="p-stock-report__date-nav"
        :disabled="selectedDateIndex === 0"
        @click="selectedDateIndex--"
      >
        <ChevronRight :size="20" />
      </button>
    </div>

    <!-- Report List -->
    <div class="p-stock-report__list">
      <div v-if="filteredReports.length === 0" class="py-20 text-center text-gray-400">
        <p>선택한 날짜에 리포트가 없습니다.</p>
      </div>
      <template v-else>
        <ReportCard 
          v-for="report in filteredReports" 
          :key="report.code"
          :report="report"
          :is-today="selectedDate === today"
          @show-customers="showModal('customers', $event)"
          @show-report="showModal('report', $event)"
          @show-script="showModal('script', $event)"
        />
      </template>
    </div>

    <!-- Modals -->
    <RelatedCustomersModal
      :is-open="activeModal === 'customers'"
      :stock-name="activeStock.name"
      :stock-code="activeStock.code"
      :customers="activeStock.relatedCustomers || []"
      @close="activeModal = null"
    />

    <ReportSummaryModal
      :is-open="activeModal === 'script'"
      :stock-name="activeStock.name"
      :stock-code="activeStock.code"
      :summary="activeStock.fullReport?.summary"
      :reason="activeStock.reason"
      @close="activeModal = null"
    />

    <StockReportModal
      :is-open="activeModal === 'report'"
      :stock-name="activeStock.name"
      :stock-code="activeStock.code"
      :report="activeStock"
      @close="activeModal = null"
    />
  </div>
</template>

<script>
import ReportCard from '@/components/page/stock/report/ReportCard.vue'
import RelatedCustomersModal from '@/components/page/stock/report/modal/RelatedCustomersModal.vue'
import ReportSummaryModal from '@/components/page/stock/report/modal/ReportSummaryModal.vue'
import StockReportModal from '@/components/page/stock/report/modal/StockReportModal.vue'
import { Search, RefreshCw, ChevronLeft, ChevronRight, X, Users, FileText, File } from 'lucide-vue'

export default {
  name: 'AIReportPage',
  components: {
    ReportCard,
    RelatedCustomersModal,
    ReportSummaryModal,
    StockReportModal,
    Search,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    X,
    Users,
    FileText,
    File
  },
  data() {
    return {
      searchQuery: '',
      selectedDate: '01-30',
      selectedDateIndex: 0,
      activeModal: null,
      activeStockCode: null,
      today: '02-08', // For demo
      reports: [
        { 
          name: "삼성전자", 
          code: "005930", 
          change: 2.3, 
          datetime: "01-30 14:23",
          reason: "HBM3 메모리 수요 급증으로 실적 개선 전망",
          fullReport: {
            summary: "반도체 업황 회복과 AI 수요 증가로 실적 개선 전망",
          },
          relatedCustomers: [{}, {}, {}, {}],
          history: [
            { datetime: "01-25 09:15", change: 1.8, summary: "HBM3 메모리 수요 증가...", opinion: "Buy" },
            { datetime: "01-20 16:30", change: -0.5, summary: "단기 조정국면...", opinion: "Hold" }
          ]
        },
        { 
          name: "현대차", 
          code: "005380", 
          change: -1.2, 
          datetime: "01-30 11:15",
          reason: "전기차 판매 둔화로 단기 실적 부담 우려",
          fullReport: {
            summary: "전기차 시장 둔화 우려, 하지만 신규 모델 출시로 반등 기대",
          },
          relatedCustomers: [{}, {}, {}]
        },
        { 
          name: "NAVER", 
          code: "035420", 
          change: -0.5, 
          datetime: "01-29 16:47",
          reason: "검색광고 안정성과 AI 투자 확대",
          fullReport: {
            summary: "검색 플랫폼 안정성과 AI 투자로 장기 성장 동력 확보",
          },
          relatedCustomers: [{}, {}, {}, {}]
        }
      ],
      dates: [
        { value: '01-30', count: 12 },
        { value: '01-29', count: 8 },
        { value: '01-28', count: 15 },
        { value: '01-27', count: 6 },
        { value: '01-26', count: 9 },
        { value: '01-25', count: 11 }
      ]
    }
  },
  computed: {
    visibleDates() {
      // In real app, this would be a sliding window or scrollable area
      return [...this.dates].slice(0, 5); 
    },
    filteredReports() {
      let result = this.reports.filter(r => r.datetime.startsWith(this.selectedDate));
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        result = result.filter(r => r.name.toLowerCase().includes(q) || r.code.includes(q));
      }
      return result;
    },
    activeStock() {
      return this.reports.find(s => s.code === this.activeStockCode) || {};
    }
  },
  methods: {
    refreshData() {
      alert('데이터가 갱신되었습니다.');
    },
    showModal(type, code) {
      this.activeModal = type;
      this.activeStockCode = code;
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/stock/report.css';
</style>
