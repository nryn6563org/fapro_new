<template>
  <div class="p-stock-signal">
    <!-- Header -->
    <header class="p-stock-signal__header">
      <div class="p-stock-signal__title-group">
        <h1 class="p-stock-signal__title">라씨 시그널 발생 종목</h1>
        <p class="p-stock-signal__subtitle">AI가 실시간으로 분석한 매매 신호를 확인하세요.</p>
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
        <button class="c-btn c-btn--ghost c-btn--sm" @click="refreshSignals">
          <RefreshCw :size="16" class="mr-1.5" />
          새로고침
        </button>
      </div>
    </header>

    <!-- Status Banner -->
    <div class="p-stock-signal__banner">
      <h2 class="p-stock-signal__banner-title">오늘의 실시간 AI 매매신호 현황</h2>
      <div class="p-stock-signal__banner-grid">
        <div class="p-stock-signal__banner-card">
          <TrendingUp :size="24" class="text-red-500 mb-1" />
          <span class="text-[10px] text-gray-500 font-bold uppercase">매수 신호</span>
          <span class="text-2xl font-bold text-red-500">{{ buySignals.length }}건</span>
        </div>
        <div class="p-stock-signal__banner-card">
          <TrendingDown :size="24" class="text-blue-500 mb-1" />
          <span class="text-[10px] text-gray-500 font-bold uppercase">매도 신호</span>
          <span class="text-2xl font-bold text-blue-500">{{ sellSignals.length }}건</span>
        </div>
      </div>
    </div>

    <!-- Main Signal Timeline -->
    <div class="c-card">
      <header class="c-card__header">
        <div class="c-card__title">
          <Clock :size="16" class="text-primary" />
          실시간 시그널 타임라인
        </div>
        <div class="flex gap-1">
          <button 
            v-for="f in ['all', '매수', '매도']" 
            :key="f"
            class="c-btn c-btn--xs"
            :class="filterSignal === f ? 'c-btn--primary' : 'c-btn--ghost border border-gray-100'"
            @click="filterSignal = f"
          >
            {{ f === 'all' ? '전체' : f }}
          </button>
        </div>
      </header>
      <div class="p-6">
        <div class="p-stock-signal__timeline-container">
          <!-- Buy signals col -->
          <div v-if="filterSignal === 'all' || filterSignal === '매수'" class="p-stock-signal__timeline-col">
            <div class="p-stock-signal__timeline-line p-stock-signal__timeline-line--buy"></div>
            <div class="flex items-center gap-2 mb-6">
              <TrendingUp :size="14" class="text-red-500" />
              <h3 class="text-xs font-bold text-red-500 uppercase">Buy Signals</h3>
            </div>
            <div v-for="s in filteredBuySignals" :key="`${s.code}-${s.signalTime}`" class="p-stock-signal__timeline-item">
              <div class="p-stock-signal__timeline-dot p-stock-signal__timeline-dot--buy"></div>
              <div class="p-stock-signal__timeline-card p-stock-signal__timeline-card--buy" @click="openCustomerModal(s)">
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <div class="font-bold text-sm text-gray-900 dark:text-white">{{ s.name }}</div>
                    <div class="text-[10px] text-gray-400">{{ s.code }} · {{ s.signalTime }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-xs font-bold text-gray-900 dark:text-white">{{ s.buyPrice.toLocaleString() }}원</div>
                    <div class="text-[10px] text-red-500 font-bold">매수 신호</div>
                  </div>
                </div>
                <div class="flex flex-wrap gap-1">
                  <span v-for="tag in s.issueTags" :key="tag" class="px-1.5 py-0.5 bg-white dark:bg-gray-800 rounded text-[9px] font-bold text-red-600 border border-red-100 dark:border-red-900/30">
                    #{{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Sell signals col -->
          <div v-if="filterSignal === 'all' || filterSignal === '매도'" class="p-stock-signal__timeline-col">
            <div class="p-stock-signal__timeline-line p-stock-signal__timeline-line--sell"></div>
            <div class="flex items-center gap-2 mb-6">
              <TrendingDown :size="14" class="text-blue-500" />
              <h3 class="text-xs font-bold text-blue-500 uppercase">Sell Signals</h3>
            </div>
            <div v-for="s in filteredSellSignals" :key="`${s.code}-${s.signalTime}`" class="p-stock-signal__timeline-item">
              <div class="p-stock-signal__timeline-dot p-stock-signal__timeline-dot--sell"></div>
              <div class="p-stock-signal__timeline-card p-stock-signal__timeline-card--sell" @click="openCustomerModal(s)">
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <div class="font-bold text-sm text-gray-900 dark:text-white">{{ s.name }}</div>
                    <div class="text-[10px] text-gray-400">{{ s.code }} · {{ s.signalTime }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-xs font-bold text-gray-900 dark:text-white">{{ s.sellPrice.toLocaleString() }}원</div>
                    <div class="text-[10px] text-blue-500 font-bold">수익률 +{{ s.profitRate }}%</div>
                  </div>
                </div>
                <div class="flex flex-wrap gap-1">
                  <span v-for="tag in s.issueTags" :key="tag" class="px-1.5 py-0.5 bg-white dark:bg-gray-800 rounded text-[9px] font-bold text-blue-600 border border-blue-100 dark:border-blue-900/30">
                    #{{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Market Insights -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Customer Holding TOP 10 -->
      <div class="c-card">
        <header class="c-card__header">
          <div class="c-card__title">
            <Flame :size="16" class="text-orange-500" />
            고객 보유 종목 TOP 10
          </div>
        </header>
        <div class="p-4">
          <div 
            v-for="(stock, idx) in customerHoldingStocks" 
            :key="stock.code"
            class="p-stock-signal__rank-item p-stock-signal__rank-item--holding"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="p-stock-signal__rank-idx bg-orange-500">{{ idx + 1 }}</div>
                <div>
                  <div class="text-sm font-bold">{{ stock.name }}</div>
                  <div class="text-[10px] text-gray-400">{{ stock.code }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-xs font-bold text-orange-600">{{ stock.customerCount }}명</div>
                <div class="text-[10px] text-gray-400">보유 고객수</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Rapid Rise -->
      <div class="c-card">
        <header class="c-card__header">
          <div class="c-card__title">
            <Zap :size="16" class="text-yellow-500" />
            최근 매수 후 급등 종목
          </div>
        </header>
        <div class="p-4">
          <div 
            v-for="stock in rapidRiseStocks" 
            :key="stock.code"
            class="p-stock-signal__rank-item p-stock-signal__rank-item--rapid"
          >
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm font-bold">{{ stock.name }}</div>
                <div class="text-[10px] text-gray-400">매수일: {{ stock.buyDate }}</div>
              </div>
              <div class="text-xl font-bold text-yellow-600">+{{ stock.profitRate }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Weekly Briefing -->
    <div class="c-card">
      <header class="c-card__header">
        <div class="c-card__title">
          <FileText :size="16" class="text-indigo-500" />
          라씨 주간 마켓 브리핑
        </div>
      </header>
      <div class="p-6">
        <div class="p-stock-signal__brief-grid">
          <div v-for="(b, idx) in briefings" :key="idx" class="p-stock-signal__brief-card">
            <img :src="b.thumbnail" :alt="b.title" class="p-stock-signal__brief-img" />
            <div class="p-4">
              <div class="text-[10px] font-bold text-indigo-500 mb-1">{{ b.date }}</div>
              <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{{ b.title }}</h4>
              <p class="text-xs text-gray-500 line-clamp-2">{{ b.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Customer Modal -->
    <transition name="t-fade">
      <div v-if="customerModal" class="c-modal-overlay" @click.self="customerModal = null">
        <div class="c-modal max-w-2xl">
          <div class="c-modal__header bg-orange-500 text-white">
            <div class="c-modal__title-group">
              <UserCheck :size="20" />
              <div>
                <h3 class="c-modal__title text-white">관련 고객 목록</h3>
                <p class="c-modal__subtitle text-orange-100">{{ customerModal.name }} 보유 및 관심 고객</p>
              </div>
            </div>
            <button class="c-modal__close text-white hover:bg-white/10" @click="customerModal = null">
              <X :size="20" />
            </button>
          </div>
          <div class="c-modal__body">
            <div class="flex items-center justify-between mb-4 px-1">
              <span class="text-xs font-bold text-gray-500">선택된 고객: {{ selectedCustomers.length }}명</span>
              <button class="text-xs text-primary font-bold" @click="toggleSelectAll">
                {{ selectedCustomers.length === customers.length ? '전체 해제' : '전체 선택' }}
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto p-1">
              <div 
                v-for="c in customers" 
                :key="c.id"
                class="c-customer-list-item"
                :class="{'c-customer-list-item--selected': selectedCustomers.includes(c.id)}"
                @click="toggleCustomer(c.id)"
              >
                <div class="flex-1">
                  <div class="font-bold text-sm">{{ c.name }}</div>
                  <div class="text-[10px] text-gray-400">보유: {{ c.holdings }} | 수익: {{ c.profit }}%</div>
                </div>
                <div v-if="selectedCustomers.includes(c.id)" class="text-orange-500">
                  <CheckCircle :size="18" />
                </div>
              </div>
            </div>
          </div>
          <div class="c-modal__footer">
            <div v-if="selectedCustomers.length > 0" class="flex gap-2 w-full">
              <button class="c-btn c-btn--warning flex-1" @click="sendSignal('카카오톡')">
                <MessageCircle :size="14" class="mr-1.5" /> 카톡 발송
              </button>
              <button class="c-btn c-btn--primary flex-1" @click="sendSignal('문자')">
                <Smartphone :size="14" class="mr-1.5" /> 문자 발송
              </button>
            </div>
            <button v-else class="c-btn c-btn--ghost w-full" @click="customerModal = null">닫기</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'StockSignalPage',
  data() {
    return {
      searchQuery: '',
      filterSignal: 'all',
      customerModal: null,
      selectedCustomers: [],
      signals: [
        { name: "카카오뱅크", code: "323410", signal: "매수", buyPrice: 28500, signalTime: "14:23", issueTags: ["금리인하", "핀테크 성장"] },
        { name: "SK하이닉스", code: "000660", signal: "매수", buyPrice: 132000, signalTime: "11:45", issueTags: ["AI 반도체", "HBM 수요"] },
        { name: "LG에너지솔루션", code: "373220", signal: "매도", sellPrice: 445000, profitRate: 5.9, signalTime: "10:15", issueTags: ["2차전지", "목표가 달성"] },
        { name: "삼성바이오로직스", code: "207940", signal: "매도", sellPrice: 895000, profitRate: 2.9, signalTime: "09:30", issueTags: ["바이오", "과열 구간"] }
      ],
      customerHoldingStocks: [
        { name: "삼성전자", code: "005930", customerCount: 247 },
        { name: "SK하이닉스", code: "000660", customerCount: 189 },
        { name: "LG에너지솔루션", code: "373220", customerCount: 156 },
        { name: "NAVER", code: "035420", customerCount: 142 },
        { name: "현대차", code: "005380", customerCount: 128 }
      ],
      rapidRiseStocks: [
        { name: "포스코퓨처엠", code: "003670", buyDate: "2026-01-30", profitRate: 5.2 },
        { name: "에코프로비엠", code: "247540", buyDate: "2026-01-27", profitRate: 7.2 }
      ],
      briefings: [
        { 
          title: "2026년 2월 첫째주 시장 브리핑", 
          date: "2026.02.02", 
          description: "반도체 업황 회복 신호와 2차전지 투자 전략 분석",
          thumbnail: "https://images.unsplash.com/photo-1738739905706-2cc26e57f67d?w=400&h=250&fit=crop"
        },
        { 
          title: "AI 반도체 시장 동향 분석", 
          date: "2026.01.28", 
          description: "글로벌 AI 반도체 수요 증가와 국내 기업 수혜 전망",
          thumbnail: "https://images.unsplash.com/photo-1767424196045-030bbde122a4?w=400&h=250&fit=crop"
        }
      ],
      customers: [
        { id: 1, name: "강동원", holdings: "120주", profit: 12.5 },
        { id: 2, name: "한지민", holdings: "85주", profit: 8.2 },
        { id: 3, name: "정우성", holdings: "210주", profit: 15.1 },
        { id: 4, name: "김혜수", holdings: "50주", profit: 5.4 }
      ]
    }
  },
  computed: {
    buySignals() {
      return this.signals.filter(s => s.signal === '매수');
    },
    sellSignals() {
      return this.signals.filter(s => s.signal === '매도');
    },
    filteredBuySignals() {
      if (!this.searchQuery) return this.buySignals;
      const q = this.searchQuery.toLowerCase();
      return this.buySignals.filter(s => s.name.toLowerCase().includes(q) || s.code.includes(q));
    },
    filteredSellSignals() {
      if (!this.searchQuery) return this.sellSignals;
      const q = this.searchQuery.toLowerCase();
      return this.sellSignals.filter(s => s.name.toLowerCase().includes(q) || s.code.includes(q));
    }
  },
  methods: {
    refreshSignals() {
      alert('시그널이 성공적으로 갱신되었습니다.');
    },
    openCustomerModal(stock) {
      this.customerModal = stock;
      this.selectedCustomers = [];
    },
    toggleCustomer(id) {
      if (this.selectedCustomers.includes(id)) {
        this.selectedCustomers = this.selectedCustomers.filter(cid => cid !== id);
      } else {
        this.selectedCustomers.push(id);
      }
    },
    toggleSelectAll() {
      if (this.selectedCustomers.length === this.customers.length) {
        this.selectedCustomers = [];
      } else {
        this.selectedCustomers = this.customers.map(c => c.id);
      }
    },
    sendSignal(method) {
      alert(`${this.selectedCustomers.length}명의 고객에게 ${method}(으)로 시그널을 발송했습니다.`);
      this.customerModal = null;
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/stock/signal.css';
</style>
