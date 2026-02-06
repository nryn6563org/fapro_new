<template>
  <Card class="dashboard-card dashboard-card--issue-stocks">
    <div class="dashboard-card__header">
      <div class="dashboard-card__header-main dashboard-card__header-main--column">
        <div class="dashboard-card__title-row">
          <div class="dashboard-card__title-group">
            <svg xmlns="http://www.w3.org/2000/svg" class="dashboard-card__title-icon dashboard-card__title-icon--orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span class="dashboard-card__title-text">AI이슈포착</span>
          </div>
          <div class="dashboard-card__header-meta">
            <span class="dashboard-card__update-time">{{ currentTime }}</span>
            <button class="dashboard-card__refresh-btn">
              <svg xmlns="http://www.w3.org/2000/svg" class="dashboard-card__refresh-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
        <!-- 탭 버튼 -->
        <div class="dashboard-card__tab-group dashboard-card__tab-group--center">
          <button
            @click="activeTab = 'domestic'"
            :class="['dashboard-card__tab-btn', { 'dashboard-card__tab-btn--active': activeTab === 'domestic' }]"
          >
            국내 이슈 포착
          </button>
          <button
            @click="activeTab = 'us'"
            :class="['dashboard-card__tab-btn', { 'dashboard-card__tab-btn--active': activeTab === 'us' }]"
          >
            미국 이슈 포착
          </button>
        </div>
      </div>
    </div>
    <div class="dashboard-card__content dashboard-card__content--horizontal">
      <!-- 좌측: 워드 클라우드 / 버블 차트 -->
      <div class="dashboard-card__visual-section">
        <div class="dashboard-card__visual-container dashboard-card__visual-container--orange">
          <BubbleChart
            :data="chartData"
            @bubble-click="handleBubbleClick"
          />
        </div>
        <nuxt-link
          to="/stock/issue"
          class="dashboard-card__view-more dashboard-card__view-more--orange"
        >
          더보기
        </nuxt-link>
      </div>

      <!-- 우측: 상세 정보 -->
      <div class="dashboard-card__detail-section">
        <div v-if="selectedKeywordData" class="dashboard-card__detail-content">
          <!-- 차트 영역 -->
          <div class="dashboard-card__detail-block">
            <h3 class="dashboard-card__detail-title">
              {{ selectedKeywordData.title }} <span class="dashboard-card__detail-title-accent">검색빈도 및 종목 누적 등락률</span>
            </h3>
            <div class="dashboard-card__detail-chart-wrapper">
              <LineChart :data="selectedKeywordData.timeSeriesData" />
            </div>
          </div>

          <!-- 주요종목 -->
          <div class="dashboard-card__detail-block">
            <h4 class="dashboard-card__detail-subtitle">주요종목</h4>
            <div class="dashboard-card__minor-list">
              <nuxt-link
                v-for="(stock, index) in selectedKeywordData.relatedStocks"
                :key="stock.code"
                :to="`/stock/detail/${stock.code}`"
                class="dashboard-card__minor-item dashboard-card__minor-item--hover"
              >
                <div class="dashboard-card__minor-info">
                  <div
                    class="dashboard-card__minor-dot"
                    :style="{ backgroundColor: getStockColor(index) }"
                  />
                  <span class="dashboard-card__minor-name">{{ stock.name }}</span>
                </div>
                <span :class="['dashboard-card__minor-change', stock.change >= 0 ? 'dashboard-card__minor-change--up' : 'dashboard-card__minor-change--down']">
                  {{ stock.change >= 0 ? '+' : '' }}{{ stock.change.toFixed(2) }}%
                </span>
              </nuxt-link>
            </div>
          </div>

          <!-- 관련 뉴스 -->
          <div class="dashboard-card__detail-block dashboard-card__detail-block--compact">
            <div class="dashboard-card__news-list">
              <div v-for="(item, index) in selectedKeywordData.news" :key="index" class="dashboard-card__news-item">
                <p class="dashboard-card__news-title">{{ item.title }}</p>
                <div class="dashboard-card__news-meta">
                   <span>{{ item.source }}</span>
                   <span>{{ item.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="dashboard-card__empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" class="dashboard-card__empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="dashboard-card__empty-text">좌측 버블을 클릭하세요</p>
          <p class="dashboard-card__empty-subtext">이슈 관련 상세 정보를 확인할 수 있습니다</p>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import BubbleChart from '~/components/common/charts/BubbleChart.vue'
import LineChart from '~/components/common/charts/LineChart.vue'
import { aiIssueKeywords, keywordDetails } from '~/assets/data/dashboard-data'

export default {
  name: 'IssueStocksCard',
  components: {
    BubbleChart,
    LineChart
  },
  props: {
    currentTime: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeTab: 'domestic',
      selectedKeyword: null,
      aiIssueKeywords,
      keywordDetails
    }
  },
  computed: {
    chartData() {
      // Convert to format BubbleChart expects: [x, y, size, label, group]
      // Since x, y are ignored by force layout, we just provide indices or placeholder
      return this.aiIssueKeywords.map((item, index) => [
        index,
        index,
        item.size,
        item.keyword,
        item.color.includes('red') ? 'red' : 'blue'
      ])
    },
    selectedKeywordData() {
      return this.selectedKeyword ? this.keywordDetails[this.selectedKeyword] : null
    }
  },
  methods: {
    handleBubbleClick(bubble) {
      // bubble is [x, y, size, label, group]
      this.selectedKeyword = bubble[3]
    },
    getStockColor(index) {
      const colors = ['#ef4444', '#f97316', '#a855f7', '#ec4899']
      return colors[index % colors.length]
    }
  }
}
</script>

<style scoped>
.card-header {
  border-bottom: 1px solid #f3f4f6;
}
</style>

<style scoped>
.bubble-chart-wrapper {
    width: 100%;
}
</style>
