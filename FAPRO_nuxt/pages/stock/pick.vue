<template>
  <div class="p-stock-pick">
    <!-- Header -->
    <header class="p-stock-pick__header">
      <h1 class="p-stock-pick__title">AI종목 발굴</h1>
      <p class="p-stock-pick__subtitle">AI가 분석한 오늘의 주목할 종목을 확인하세요.</p>
    </header>

    <!-- Date Bar -->
    <div class="p-stock-pick__date-bar">
      <div class="p-stock-pick__date-title">
        <Zap :size="18" class="text-indigo-500" />
        <span>오늘 pick AI종목</span>
        <span class="c-badge c-badge--primary ml-2">총 {{ stocks.length }}개 종목</span>
      </div>
      <div class="p-stock-pick__date-controls">
        <button class="c-btn c-btn--ghost c-btn--xs px-2" @click="goToToday">오늘</button>
        <button class="c-btn c-btn--ghost c-btn--xs px-1" @click="changeDate(-1)">
          <ChevronLeft :size="16" />
        </button>
        <div class="p-stock-pick__date-display">{{ formattedDate }}</div>
        <button 
          class="c-btn c-btn--ghost c-btn--xs px-1" 
          :disabled="isFuture"
          @click="changeDate(1)"
        >
          <ChevronRight :size="16" />
        </button>
      </div>
    </div>

    <!-- Stock List -->
    <div class="p-stock-pick__list">
      <DiscoveryCard 
        v-for="stock in stocks" 
        :key="stock.id"
        :stock="stock"
        @send-proposal="openProposal"
      />
    </div>

    <!-- Info Box -->
    <div class="c-card bg-blue-50/50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/30">
      <div class="p-4 flex items-start gap-3">
        <Zap :size="18" class="text-blue-500 mt-0.5" />
        <div class="text-xs text-blue-800 dark:text-blue-300">
          <p class="font-bold mb-1">AI 종목 발굴 안내</p>
          <ul class="space-y-1 opacity-80">
            <li>• AI가 매일 시장 데이터를 분석하여 주목할 만한 종목을 선정합니다.</li>
            <li>• AI 점수는 기술적 분석, 수급, 뉴스, 소셜 감성 등을 종합하여 산출됩니다. (100점 만점)</li>
            <li>• 투자 결정은 본인의 판단과 책임 하에 이루어져야 합니다.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Proposal Modal -->
    <transition name="t-fade">
      <div v-if="proposalModal" class="c-modal-overlay" @click.self="proposalModal = null">
        <div class="c-modal max-w-2xl">
          <div class="c-modal__header">
            <div class="c-modal__title-group">
              <Send :size="20" />
              <div>
                <h3 class="c-modal__title">종목 제안서 보내기</h3>
                <p class="c-modal__subtitle">{{ proposalModal.stockName }} ({{ proposalModal.stockCode }})</p>
              </div>
            </div>
            <button class="c-modal__close" @click="proposalModal = null">
              <X :size="20" />
            </button>
          </div>
          <div class="c-modal__body">
            <!-- Stock Brief -->
            <div class="c-proposal-brief">
              <h4 class="text-xs font-bold text-indigo-500 mb-3 flex items-center gap-1.2">
                <FileText :size="14" />
                종목 브리핑
              </h4>
              <div class="space-y-2">
                <div class="c-proposal-item">
                  <span class="c-proposal-label">현재가</span>
                  <span class="c-proposal-value">{{ proposalModal.currentPrice }}</span>
                  <span class="ml-2 text-xs font-bold" :class="proposalModal.changeRate.startsWith('+') ? 'text-red-500' : 'text-blue-500'">
                    {{ proposalModal.changeRate }}
                  </span>
                </div>
                <div class="c-proposal-item">
                  <span class="c-proposal-label">AI 점수</span>
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xs font-bold">
                      {{ proposalModal.score }}
                    </div>
                    <span class="text-[10px] text-gray-500">/ 100점</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- FA Opinion -->
            <div class="mb-6">
              <h4 class="text-xs font-bold text-emerald-500 mb-3 flex items-center gap-1.2">
                <MessageSquare :size="14" />
                FA 개인 의견 작성
              </h4>
              <textarea 
                v-model="faOpinion"
                placeholder="고객에게 전달할 추천 사유를 작성해주세요..."
                class="c-proposal-textarea"
              ></textarea>
            </div>

            <!-- Customer Selection -->
            <div>
              <h4 class="text-xs font-bold text-orange-500 mb-3 flex items-center gap-1.2">
                <Users :size="14" />
                보낼 고객 선택 ({{ selectedCustomers.length }}명)
              </h4>
              <div class="c-proposal-customer-list">
                <div 
                  v-for="customer in customers" 
                  :key="customer.id"
                  class="c-proposal-customer"
                  :class="{'c-proposal-customer--selected': selectedCustomers.includes(customer.id)}"
                  @click="toggleCustomer(customer.id)"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-bold">{{ customer.name }}</span>
                        <span class="c-badge" :class="`c-badge--${customer.grade === 'VIP' ? 'warning' : 'primary'}`">
                          {{ customer.grade }}
                        </span>
                      </div>
                      <p class="text-[10px] text-gray-400 mt-1">{{ customer.email }}</p>
                    </div>
                    <div v-if="selectedCustomers.includes(customer.id)" class="text-primary">
                      <CheckCircle :size="18" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="c-modal__footer gap-2">
            <button class="c-btn c-btn--ghost c-btn--sm" @click="proposalModal = null">취소</button>
            <button 
              class="c-btn c-btn--primary c-btn--sm" 
              :disabled="selectedCustomers.length === 0"
              @click="sendProposal"
            >
              제안서 전송
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'StockPickPage',
  data() {
    return {
      selectedDate: new Date(),
      proposalModal: null,
      faOpinion: '',
      selectedCustomers: [],
      stocks: [
        {
          id: 1,
          stockName: "삼성전자",
          stockCode: "005930",
          currentPrice: "75,400원",
          changeRate: "+2.4%",
          changeAmount: "+1,800원",
          tags: ["buy_signal", "popular", "ai_report"],
          reason: "라씨 AI가 매수 신호를 감지했으며, 반도체 업황 회복 기대감으로 거래량이 평균 대비 180% 증가.",
          score: 92
        },
        {
          id: 2,
          stockName: "SK하이닉스",
          stockCode: "000660",
          currentPrice: "168,500원",
          changeRate: "+4.8%",
          changeAmount: "+7,700원",
          tags: ["featured", "ai_pick", "issue"],
          reason: "미국 AI칩 수요 급증으로 HBM3 매출 확대 전망. 최근 실적 서프라이즈 기대감에 기관 매수 지속.",
          score: 95
        }
      ],
      customers: [
        { id: 1, name: "김철수", email: "kim@example.com", grade: "VIP" },
        { id: 2, name: "이영희", email: "lee@example.com", grade: "GOLD" },
        { id: 3, name: "박민수", email: "park@example.com", grade: "VIP" },
        { id: 4, name: "정수진", email: "jung@example.com", grade: "SILVER" }
      ]
    }
  },
  computed: {
    formattedDate() {
      const year = this.selectedDate.getFullYear();
      const month = String(this.selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(this.selectedDate.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}`;
    },
    isFuture() {
      const today = new Date();
      today.setHours(0,0,0,0);
      return this.selectedDate >= today;
    }
  },
  methods: {
    changeDate(days) {
      const newDate = new Date(this.selectedDate);
      newDate.setDate(newDate.getDate() + days);
      this.selectedDate = newDate;
    },
    goToToday() {
      this.selectedDate = new Date();
    },
    openProposal(stock) {
      this.proposalModal = stock;
      this.faOpinion = '';
      this.selectedCustomers = [];
    },
    toggleCustomer(id) {
      if (this.selectedCustomers.includes(id)) {
        this.selectedCustomers = this.selectedCustomers.filter(cid => cid !== id);
      } else {
        this.selectedCustomers.push(id);
      }
    },
    sendProposal() {
      alert(`${this.selectedCustomers.length}명의 고객에게 제안서를 전송했습니다.`);
      this.proposalModal = null;
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/stock/discovery.css';
</style>
