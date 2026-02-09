<template>
  <div class="p-stock-quant">
    <!-- Header -->
    <header class="p-stock-quant__header">
      <div class="p-stock-quant__title-group">
        <h1 class="p-stock-quant__title">퀀트종목</h1>
        <p class="p-stock-quant__subtitle">AI 기반 퀀트 전략에 따른 포트폴리오를 확인하세요.</p>
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

    <!-- Strategy Tabs -->
    <div class="p-stock-quant__tabs">
      <button 
        v-for="tab in strategyTabs" 
        :key="tab.id"
        class="p-stock-quant__tab"
        :class="{'p-stock-quant__tab--active': activeTab === tab.id}"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Strategy Info -->
    <div class="c-card p-6">
      <div class="space-y-6">
        <div>
          <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-2">투자 및 운용 철학</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ activeStrategy.philosophy }}
          </p>
        </div>
        <div class="p-stock-quant__info-grid">
          <div v-for="info in strategyInfoItems" :key="info.label" class="p-stock-quant__info-item">
            <div class="p-stock-quant__info-label">{{ info.label }}</div>
            <div class="p-stock-quant__info-value">{{ info.value }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance -->
    <div class="p-stock-quant__perf">
      <!-- Chart area -->
      <div class="p-stock-quant__chart-area">
        <div class="absolute top-4 left-4 z-10">
          <h3 class="text-sm font-bold text-gray-900 dark:text-white">누적 수익률 추이</h3>
          <p class="text-[10px] text-gray-400">최근 1년 기준</p>
        </div>
        <!-- Simple SVG chart simulation -->
        <svg class="w-full h-full pt-12" viewBox="0 0 500 240" preserveAspectRatio="none">
          <polyline
            points="0,200 50,190 100,185 150,175 200,170 250,160 300,155 350,145 400,140 450,125 500,115"
            fill="none" stroke="#22c55e" stroke-width="2" stroke-dasharray="4"
          />
          <polyline
            points="0,230 50,210 100,190 150,160 200,140 250,115 300,95 350,70 400,50 450,35 500,15"
            fill="none" stroke="var(--color-primary)" stroke-width="3"
          />
        </svg>
      </div>

      <!-- Stats sidebar -->
      <div class="p-stock-quant__stats-sidebar">
        <div class="p-stock-quant__stat-card">
          <span class="p-stock-quant__stat-label">유형</span>
          <span class="text-xs font-bold text-red-500">지수추종형</span>
        </div>
        <div class="p-stock-quant__stat-card p-stock-quant__stat-card--highlight">
          <span class="p-stock-quant__stat-label">1개월 수익률</span>
          <span class="p-stock-quant__stat-value text-primary">+12.3%</span>
        </div>
        <div class="p-stock-quant__stat-card p-stock-quant__stat-card--highlight">
          <span class="p-stock-quant__stat-label">3개월 수익률</span>
          <span class="p-stock-quant__stat-value text-primary">+24.5%</span>
        </div>
        <div class="p-stock-quant__stat-card border-red-200 bg-red-50/30">
          <span class="p-stock-quant__stat-label">총 수익률</span>
          <span class="p-stock-quant__stat-value text-red-500">+52.8%</span>
        </div>
        <div class="p-stock-quant__stat-card">
          <span class="p-stock-quant__stat-label">코스피 대비</span>
          <span class="text-sm font-bold text-green-500">+109.8%</span>
        </div>
      </div>
    </div>

    <!-- Signal History -->
    <div class="c-card">
      <header class="c-card__header">
        <div class="c-card__title">
          <Activity :size="16" class="text-primary" />
          {{ activeTabLabel }} 시그널 현황
        </div>
        <span class="text-[10px] text-gray-400">최근 5건</span>
      </header>
      <div class="p-0">
        <table class="c-quant-table">
          <thead>
            <tr>
              <th>일시</th>
              <th class="text-center">상태</th>
              <th>종목</th>
              <th class="text-right">단가</th>
              <th class="text-right">비중</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(s, idx) in currentSignals" :key="idx">
              <td>
                <div class="text-xs font-bold">{{ s.datetime.split(' ')[0] }}</div>
                <div class="text-[10px] text-gray-400">{{ s.datetime.split(' ')[1] }}</div>
              </td>
              <td class="text-center">
                <span class="c-badge" :class="s.status === 'in' ? 'c-badge--success' : 'c-badge--warning'">
                  {{ s.status === 'in' ? '매수완료' : '매도완료' }}
                </span>
              </td>
              <td>
                <div class="font-bold text-gray-900 dark:text-white">{{ s.stockName }}</div>
                <div class="text-[10px] text-gray-400">{{ s.stockCode }}</div>
              </td>
              <td class="text-right font-bold text-gray-900 dark:text-white">
                {{ s.price.toLocaleString() }}원
              </td>
              <td class="text-right font-bold" :class="s.status === 'in' ? 'text-primary' : 'text-gray-400'">
                {{ s.weight }}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Holding Portfolio -->
    <div class="c-card">
      <header class="c-card__header">
        <div class="c-card__title">
          <BarChart3 :size="16" class="text-primary" />
          포트폴리오 보유 종목 ({{ filteredStocks.length }}개)
        </div>
      </header>
      <div class="p-0">
        <table class="c-quant-table">
          <thead>
            <tr>
              <th class="text-center w-12">순위</th>
              <th>종목명</th>
              <th class="text-right">현재가</th>
              <th class="text-right">수익률</th>
              <th class="text-right">비중</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stock, idx) in filteredStocks" :key="stock.code">
              <td class="text-center">
                <span v-if="idx < 3" class="text-lg">
                  {{ idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉' }}
                </span>
                <span v-else class="text-xs font-bold text-gray-400">{{ idx + 1 }}</span>
              </td>
              <td>
                <nuxt-link :to="`/stock/detail/${stock.code}`" class="font-bold text-gray-900 dark:text-white hover:text-primary transition-colors">
                  {{ stock.name }}
                </nuxt-link>
                <div class="text-[10px] text-gray-400">{{ stock.code }}</div>
              </td>
              <td class="text-right font-bold text-gray-900 dark:text-white">
                {{ stock.currentPrice.toLocaleString() }}원
              </td>
              <td class="text-right font-bold" :class="stock.profitRate >= 0 ? 'text-red-500' : 'text-blue-500'">
                {{ stock.profitRate >= 0 ? '+' : '' }}{{ stock.profitRate }}%
              </td>
              <td class="text-right font-bold text-gray-700 dark:text-gray-300">
                {{ stock.weight }}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockQuantPage',
  data() {
    return {
      searchQuery: '',
      activeTab: 'growth',
      strategyTabs: [
        { id: 'growth', label: '탈로스 (성장주)' },
        { id: 'value', label: '롤랑 (가치주)' },
        { id: 'market', label: '미스트랄 (시장주도주)' }
      ],
      strategies: {
        growth: {
          philosophy: '성장주 투자는 기업의 미래 가치에 투자하는 것입니다. 높은 매출 성장률과 이익 성장성을 보유한 기업들을 선별하여 중장기적 관점에서 포트폴리오를 구성합니다.',
          info: [
            { label: '투자상황', value: '성장기업 발굴' },
            { label: '투자기간', value: '중장기 (1년 이상)' },
            { label: '종목성향', value: '고성장 중소형주' },
            { label: '위험도', value: '★★☆☆☆' },
            { label: '운용규모', value: '5천만~5억원' }
          ]
        },
        value: {
          philosophy: '가치주 투자는 내재가치 대비 저평가된 우량기업을 발굴하는 것입니다. PER, PBR, 배당수익률 등 밸류에이션 지표를 종합적으로 분석합니다.',
          info: [
            { label: '투자상황', value: '저평가 우량주' },
            { label: '투자기간', value: '중기 (6개월~1년)' },
            { label: '종목성향', value: '대형 가치주' },
            { label: '위험도', value: '★☆☆☆☆' },
            { label: '운용규모', value: '1억~10억원' }
          ]
        },
        market: {
          philosophy: '시장주도주 투자는 현재 시장을 이끌어가는 대형주에 집중하는 전략입니다. 시가총액 상위 종목과 플랫폼 기업을 중심으로 안정적인 수익을 추구합니다.',
          info: [
            { label: '투자상황', value: '시장 선도주' },
            { label: '투자기간', value: '중단기 (3~6개월)' },
            { label: '종목성향', value: '초대형 우량주' },
            { label: '위험도', value: '★★★☆☆' },
            { label: '운용규모', value: '5억원 이상' }
          ]
        }
      },
      stocks: [
        { name: "에코프로비엠", code: "247540", currentPrice: 109225, profitRate: 28.5, weight: 18.2 },
        { name: "포스코퓨처엠", code: "003670", currentPrice: 397760, profitRate: 24.3, weight: 15.7 },
        { name: "LG에너지솔루션", code: "373220", currentPrice: 569760, profitRate: 18.7, weight: 12.8 },
        { name: "삼성SDI", code: "006400", currentPrice: 639100, profitRate: 16.2, weight: 11.5 }
      ],
      signals: [
        { datetime: '2026-02-03 09:15', status: 'in', stockName: '에코프로비엠', stockCode: '247540', price: 109225, weight: 18.2 },
        { datetime: '2026-02-02 14:30', status: 'out', stockName: '카카오게임즈', stockCode: '293490', price: 32500, weight: 0 },
        { datetime: '2026-02-01 10:45', status: 'in', stockName: '포스코퓨처엠', stockCode: '003670', price: 397760, weight: 15.7 }
      ]
    }
  },
  computed: {
    activeStrategy() {
      return this.strategies[this.activeTab];
    },
    activeTabLabel() {
      return this.strategyTabs.find(t => t.id === this.activeTab).label.split(' ')[0];
    },
    strategyInfoItems() {
      return this.activeStrategy.info;
    },
    currentSignals() {
      return this.signals;
    },
    filteredStocks() {
      if (!this.searchQuery) return this.stocks;
      const q = this.searchQuery.toLowerCase();
      return this.stocks.filter(s => s.name.toLowerCase().includes(q) || s.code.includes(q));
    }
  },
  methods: {
    refreshData() {
      alert('데이터가 갱신되었습니다.');
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/stock/quant.css';
</style>
