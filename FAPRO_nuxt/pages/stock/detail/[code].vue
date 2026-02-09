<template>
  <div class="p-stock-detail">
    <nuxt-link to="/stock/ranking" class="p-stock-detail__back mb-4">
      <ChevronLeft :size="16" />
      대시보드로 돌아가기
    </nuxt-link>

    <!-- Stock Summary Header -->
    <div v-if="stock" class="p-stock-detail__header">
      <div class="p-stock-detail__header-top">
        <div class="p-stock-detail__title-group">
          <div class="p-stock-detail__name-row">
            <h1 class="p-stock-detail__name">{{ stock.name }}</h1>
            <span class="p-stock-detail__code">{{ code }}</span>
            <span class="text-xs text-gray-400 font-bold ml-2">{{ updateTime }}</span>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="p-stock-detail__price">{{ stock.price.toLocaleString() }}</span>
            <span class="p-stock-detail__change" :class="stock.change >= 0 ? 'text-red-500' : 'text-blue-500'">
              {{ stock.change >= 0 ? '+' : '' }}{{ stock.change }}%
            </span>
          </div>
          <div class="p-stock-detail__tags">
            <span v-for="tag in stock.tags" :key="tag" class="p-stock-detail__tag">{{ tag }}</span>
          </div>
        </div>

        <div class="p-stock-detail__actions">
          <button class="p-stock-detail__customer-btn" @click="showModal = 'customers'">
            <div class="p-stock-detail__customer-count">
              <Users :size="20" />
              {{ stock.totalCustomers }}
            </div>
            <span class="text-[10px] text-blue-600 font-bold">보유고객</span>
          </button>
          <button class="c-btn c-btn--ghost c-btn--sm h-12 w-12 p-0 rounded-xl" @click="isFavorite = !isFavorite">
            <Star :size="20" :class="isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'" />
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div v-if="stock" class="p-stock-detail__grid">
      <!-- Sidebar -->
      <aside class="p-stock-detail__side">
        <div class="c-signal-sidebar">
          <div class="c-signal-sidebar__hero">
            <div class="c-signal-sidebar__icon-box">
              <Activity :size="32" class="text-white" />
            </div>
            <div class="c-signal-sidebar__badge">AI 매매신호</div>
            <div class="c-signal-sidebar__status">보유중</div>
          </div>
          <div class="c-signal-sidebar__info">
            <div class="text-center space-y-4">
              <div>
                <p class="text-xs text-gray-500 mb-1">매수신호 발생일</p>
                <p class="text-sm font-bold">12월 22일 (23일째 보유)</p>
              </div>
              <div class="c-signal-sidebar__alert">
                라씨 AI는 {{ stock.name }}를 23일 전 {(stock.price * 0.7).toLocaleString()}원에 매수하여 현재 44.6% 수익률을 유지 중입니다.
              </div>
              <button class="c-btn c-btn--primary c-btn--sm w-full" @click="showModal = 'signals'">
                매매신호 상세내역
                <ChevronRight :size="14" class="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="p-stock-detail__main">
        <div class="c-card">
          <header class="c-card__header">
            <div class="c-card__title">
              <Clock :size="16" class="text-primary" />
              당일 이벤트 발생 내역
            </div>
            <div class="flex gap-2">
              <button class="c-btn c-btn--ghost c-btn--xs px-2 border border-gray-100">전체</button>
              <button class="c-btn c-btn--ghost c-btn--xs px-2 border border-gray-100">신호/공시</button>
            </div>
          </header>
          <div class="c-event-list">
            <div 
              v-for="e in events" 
              :key="e.id"
              class="c-event-item"
              :class="getEventConfig(e.type).border"
              @click="openEvent(e)"
            >
              <div class="c-event-item__icon-box" :class="getEventConfig(e.type).bg">
                <component :is="getEventConfig(e.type).icon" :size="16" :class="getEventConfig(e.type).color" />
              </div>
              <div class="c-event-item__time">{{ e.time }}</div>
              <div class="c-event-item__type" :class="[getEventConfig(e.type).bg, getEventConfig(e.type).color]">
                {{ e.type }}
              </div>
              <div class="c-event-item__summary">{{ e.summary }}</div>
              <ChevronRight :size="14" class="text-gray-300" />
            </div>
          </div>
          <div class="p-4 border-t border-gray-50 dark:border-gray-800 flex justify-center">
            <button class="text-xs font-bold text-gray-400 hover:text-primary transition-colors">이전 이벤트 더보기</button>
          </div>
        </div>
      </main>
    </div>

    <!-- Modals -->
    <transition name="t-fade">
      <div v-if="showModal" class="c-modal-overlay" @click.self="showModal = null">
        <!-- Event Detail -->
        <div v-if="showModal === 'event'" class="c-modal max-w-lg">
          <div class="c-modal__header">
            <div class="c-modal__title-group">
              <component :is="getEventConfig(activeEvent.type).icon" :size="20" :class="getEventConfig(activeEvent.type).color" />
              <div>
                <h3 class="c-modal__title">{{ activeEvent.summary }}</h3>
                <p class="c-modal__subtitle">{{ activeEvent.type }} · {{ activeEvent.time }}</p>
              </div>
            </div>
            <button class="c-modal__close" @click="showModal = null"><X :size="20" /></button>
          </div>
          <div class="c-modal__body c-event-detail-content">
            {{ activeEvent.detail }}
          </div>
        </div>

        <!-- Signal History -->
        <div v-if="showModal === 'signals'" class="c-modal max-w-2xl">
          <div class="c-modal__header">
            <div class="c-modal__title-group">
              <Activity :size="20" class="text-primary" />
              <h3 class="c-modal__title">AI 매매신호 상세내역</h3>
            </div>
            <button class="c-modal__close" @click="showModal = null"><X :size="20" /></button>
          </div>
          <div class="c-modal__body p-0">
            <table class="c-signal-history-table">
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>구분</th>
                  <th>체결가</th>
                  <th>수익률</th>
                  <th>신호사유</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="s in signalHistory" :key="s.id">
                  <td class="text-xs font-bold">{{ s.date }}</td>
                  <td>
                    <span :class="s.type === 'buy' ? 'text-red-500' : 'text-blue-500'" class="font-bold">
                      {{ s.type === 'buy' ? '매수' : '매도' }}
                    </span>
                  </td>
                  <td class="font-bold">{{ s.price.toLocaleString() }}원</td>
                  <td>
                    <span v-if="s.returnRate" class="text-red-500 font-bold">+{{ s.returnRate }}%</span>
                    <span v-else class="text-gray-300">-</span>
                  </td>
                  <td class="text-xs text-gray-500">{{ s.reason }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Customer List -->
        <div v-if="showModal === 'customers'" class="c-modal max-w-3xl">
          <div class="c-modal__header">
            <div class="c-modal__title-group">
              <Users :size="20" class="text-primary" />
              <h3 class="c-modal__title">종목 보유 고객 리스트</h3>
            </div>
            <button class="c-modal__close" @click="showModal = null"><X :size="20" /></button>
          </div>
          <div class="c-modal__body p-0">
            <table class="c-signal-history-table">
              <thead>
                <tr>
                  <th>고객명</th>
                  <th>등급</th>
                  <th>보유수량</th>
                  <th>평가금액</th>
                  <th>수익률</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in customers" :key="c.id">
                  <td class="font-bold text-gray-900">{{ c.name }}</td>
                  <td><span class="c-badge" :class="c.grade === 'VIP' ? 'c-badge--warning' : 'c-badge--primary'">{{ c.grade }}</span></td>
                  <td class="font-bold">{{ c.shares.toLocaleString() }}주</td>
                  <td class="font-bold">{{ (c.currentValue / 100000000).toFixed(1) }}억</td>
                  <td class="font-bold" :class="c.returnRate >= 0 ? 'text-red-500' : 'text-blue-500'">
                    {{ c.returnRate >= 0 ? '+' : '' }}{{ c.returnRate }}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'StockDetailPage',
  asyncData({ params }) {
    return { code: params.code }
  },
  data() {
    return {
      code: this.$route.params.code,
      isFavorite: false,
      showModal: null,
      activeEvent: null,
      updateTime: '02/03 16:45',
      stock: {
        name: "삼성전자",
        price: 158000,
        change: 2.3,
        totalCustomers: 87,
        tags: ["#반도체", "#높은실적", "#AI대응", "#글로벌"]
      },
      events: [
        { id: 1, type: "매매신호", time: "09:15", summary: "라씨 매수신호 발생", detail: "알고리즘 분석 결과 5일 이동평균선 상향 돌파가 확인되었습니다. 거래량 급증과 함께 단기 상승 모멘텀이 강화되고 있습니다." },
        { id: 2, type: "뉴스속보", time: "10:32", summary: "HBM3E 엔비디아 공급 확대", detail: "엔비디아로부터 추가 물량 주문을 확보했습니다. 생산 라인 증설로 인한 실적 개선이 기대됩니다." },
        { id: 3, type: "AI리포트", time: "15:30", summary: "AI 분석: 강세 지속 전망", detail: "향후 1개월간 상승 확률 85%로 예측됩니다. 기관의 지속적 매수세 유입이 확인되었습니다." }
      ],
      signalHistory: [
        { id: 1, date: '2026-02-03', type: 'buy', price: 158000, reason: '이평선 상향 돌파' },
        { id: 2, date: '2026-01-15', type: 'sell', price: 142000, reason: '목표가 도달', returnRate: 18.3 }
      ],
      customers: [
        { id: 1, name: '김철수', grade: 'VIP', shares: 1200, currentValue: 189600000, returnRate: 9.0 },
        { id: 2, name: '이영희', grade: 'Gold', shares: 850, currentValue: 134300000, returnRate: 3.9 }
      ]
    }
  },
  methods: {
    getEventConfig(type) {
      const configs = {
        "매매신호": { icon: 'Zap', color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
        "뉴스속보": { icon: 'Newspaper', color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
        "AI리포트": { icon: 'Brain', color: "text-pink-600", bg: "bg-pink-50", border: "border-pink-200" }
      };
      return configs[type] || { icon: 'HelpCircle', color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200" };
    },
    openEvent(event) {
      this.activeEvent = event;
      this.showModal = 'event';
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/stock/detail.css';
</style>
