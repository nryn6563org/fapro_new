<template>
  <div class="p-stock-ranking">
    <!-- Header -->
    <header class="p-stock-ranking__header">
      <div class="p-stock-ranking__title-group">
        <h1 class="p-stock-ranking__title">고객 보유 종목 랭킹</h1>
        <p class="p-stock-ranking__subtitle">고객들이 가장 많이 보유한 종목들을 확인해보세요.</p>
      </div>
      <div class="p-stock-ranking__actions">
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

    <!-- Stats Cards -->
    <div class="p-stock-ranking__stats">
      <div class="c-card">
        <div class="p-4 flex items-center justify-between">
          <div>
            <div class="text-[10px] text-gray-500 mb-1">총 종목 수</div>
            <div class="text-xl font-bold text-gray-900 dark:text-white">{{ stocks.length }}</div>
          </div>
          <Award class="text-blue-500" :size="24" />
        </div>
      </div>
      <div class="c-card">
        <div class="p-4 flex items-center justify-between">
          <div>
            <div class="text-[10px] text-gray-500 mb-1">총 보유 고객</div>
            <div class="text-xl font-bold text-gray-900 dark:text-white">{{ totalCustomers }}명</div>
          </div>
          <Users class="text-green-500" :size="24" />
        </div>
      </div>
      <div class="c-card">
        <div class="p-4 flex items-center justify-between">
          <div>
            <div class="text-[10px] text-gray-500 mb-1">평균 상승률</div>
            <div class="text-xl font-bold text-red-500">+{{ avgChange }}%</div>
          </div>
          <TrendingUp class="text-red-500" :size="24" />
        </div>
      </div>
      <div class="c-card">
        <div class="p-4 flex items-center justify-between">
          <div>
            <div class="text-[10px] text-gray-500 mb-1">1위 종목</div>
            <div class="text-sm font-bold text-gray-900 dark:text-white">{{ topStock.name }}</div>
            <div class="text-[10px] text-gray-400">{{ topStock.customers }}명 보유</div>
          </div>
          <Crown class="text-yellow-500" :size="24" />
        </div>
      </div>
    </div>

    <!-- Ranking List -->
    <div class="c-card">
      <div class="p-5 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400">
        <span>보유 종목 랭킹 ({{ filteredStocks.length }}개)</span>
        <span>{{ currentTime }} 업데이트</span>
      </div>
      <div class="p-5">
        <div class="p-stock-ranking__list">
          <RankingStockItem 
            v-for="stock in filteredStocks" 
            :key="stock.code"
            :stock="stock"
            @show-customers="showCustomers"
            @show-report="showReport"
            @show-insight="showInsight"
            @show-news="showNews"
            @show-community="showCommunity"
          />
        </div>
      </div>
    </div>

    <!-- Modals (Placeholders) -->
    <transition name="t-fade">
      <div v-if="activeModal" class="c-modal-overlay" @click.self="activeModal = null">
        <div class="c-modal">
          <div class="c-modal__header">
            <div class="c-modal__title-group">
              <component :is="activeModalIcon" :size="20" />
              <div>
                <h3 class="c-modal__title">{{ activeModalTitle }}</h3>
                <p class="c-modal__subtitle">{{ activeStock.name }} ({{ activeStock.code }})</p>
              </div>
            </div>
            <button class="c-modal__close" @click="activeModal = null">
              <X :size="20" />
            </button>
          </div>
          <div class="c-modal__body">
            <!-- Modal Content Placeholder -->
            <div class="py-20 text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <component :is="activeModalIcon" :size="32" />
              </div>
              <h4 class="text-lg font-bold mb-2">{{ activeModalTitle }} 서비스 준비중</h4>
              <p class="text-gray-500 text-sm">보다 정확한 데이터를 분석하여 곧 제공해 드릴 예정입니다.</p>
            </div>
          </div>
          <div class="c-modal__footer">
            <button class="c-btn c-btn--ghost c-btn--sm" @click="activeModal = null">닫기</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'StockRankingPage',
  data() {
    return {
      searchQuery: '',
      activeModal: null,
      activeStockCode: null,
      stocks: [
        { name: "삼성전자", code: "005930", change: 2.3, rank: 1, customers: 23, avgHolding: "520주", totalValue: "12억" },
        { name: "SK하이닉스", code: "000660", change: 1.8, rank: 2, customers: 18, avgHolding: "380주", totalValue: "8억" },
        { name: "NAVER", code: "035420", change: -0.5, rank: 3, customers: 15, avgHolding: "290주", totalValue: "7억" },
        { name: "카카오", code: "035720", change: 3.1, rank: 4, customers: 12, avgHolding: "850주", totalValue: "5억" },
        { name: "LG에너지솔루션", code: "373220", change: 4.2, rank: 5, customers: 11, avgHolding: "120주", totalValue: "6억" },
        { name: "현대차", code: "005380", change: -1.2, rank: 6, customers: 10, avgHolding: "240주", totalValue: "5억" },
        { name: "셀트리온", code: "068270", change: 2.8, rank: 7, customers: 9, avgHolding: "180주", totalValue: "4억" }
      ]
    }
  },
  computed: {
    filteredStocks() {
      if (!this.searchQuery) return this.stocks;
      const query = this.searchQuery.toLowerCase();
      return this.stocks.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.code.includes(query)
      );
    },
    totalCustomers() {
      return this.stocks.reduce((acc, s) => acc + s.customers, 0);
    },
    avgChange() {
      const sum = this.stocks.reduce((acc, s) => acc + s.change, 0);
      return (sum / this.stocks.length).toFixed(1);
    },
    topStock() {
      return this.stocks[0] || {};
    },
    currentTime() {
      const now = new Date();
      return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    },
    activeStock() {
      return this.stocks.find(s => s.code === this.activeStockCode) || {};
    },
    activeModalTitle() {
      const titles = {
        customers: '관련 고객 목록',
        report: 'AI 투자 리포트',
        insight: '투자 인사이트',
        news: '뉴스 요약',
        community: '커뮤니티 요약'
      };
      return titles[this.activeModal] || '';
    },
    activeModalIcon() {
      const icons = {
        customers: 'Users',
        report: 'FileText',
        insight: 'TrendingUp',
        news: 'Newspaper',
        community: 'MessageSquare'
      };
      return icons[this.activeModal] || 'HelpCircle';
    }
  },
  methods: {
    refreshData() {
      alert('데이터가 갱신되었습니다.');
    },
    showCustomers(code) { this.activeModal = 'customers'; this.activeStockCode = code; },
    showReport(code) { this.activeModal = 'report'; this.activeStockCode = code; },
    showInsight(code) { this.activeModal = 'insight'; this.activeStockCode = code; },
    showNews(code) { this.activeModal = 'news'; this.activeStockCode = code; },
    showCommunity(code) { this.activeModal = 'community'; this.activeStockCode = code; }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/stock/ranking.css';
</style>
