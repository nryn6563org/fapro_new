<template>
  <Card class="dashboard-card dashboard-card--ai-report">
    <div class="dashboard-card__header">
      <div class="dashboard-card__header-main">
        <div class="dashboard-card__title-group">
          <svg xmlns="http://www.w3.org/2000/svg" class="dashboard-card__title-icon dashboard-card__title-icon--green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span class="dashboard-card__title-text">AI리포트 생성 종목</span>
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
    </div>

    <div class="dashboard-card__content dashboard-card__content--scrollable">
      <div class="dashboard-card__stock-list">
        <div
          v-for="stock in reportStocks"
          :key="`${stock.code}-${stock.datetime}`"
          class="dashboard-card__stock-item dashboard-card__stock-item--hover"
        >
          <div class="dashboard-card__stock-deco dashboard-card__stock-deco--green"></div>
          <div class="dashboard-card__stock-info-wrapper">
            <!-- 좌측: 종목 정보 -->
            <div class="dashboard-card__stock-main">
              <div class="dashboard-card__stock-header-row">
                <nuxt-link
                  :to="`/stock/detail/${stock.code}`"
                  class="dashboard-card__stock-name"
                >
                  {{ stock.name }}
                </nuxt-link>
                <span :class="['dashboard-card__stock-change', stock.change >= 0 ? 'dashboard-card__stock-change--up' : 'dashboard-card__stock-change--down']">
                  {{ stock.change >= 0 ? '+' : '' }}{{ stock.change }}%
                </span>
                <span v-if="isToday(stock.datetime)" class="dashboard-card__stock-badge-new">N</span>
              </div>
              <p class="dashboard-card__stock-summary">{{ stock.summary }}</p>
              <p class="dashboard-card__stock-time">{{ stock.datetime }}</p>
            </div>

            <!-- 우측: 버튼 그룹 -->
            <div class="dashboard-card__stock-actions">
              <button class="dashboard-page__btn-stock dashboard-page__btn-stock--orange">
                <span>투자인사이트</span>
              </button>

              <button class="dashboard-page__btn-stock dashboard-page__btn-stock--secondary">
                <span>AI리포트</span>
              </button>

              <button
                @click="playingAudio = playingAudio === stock.code ? null : stock.code"
                :class="['dashboard-page__btn-stock dashboard-page__btn-stock--secondary',
                        { 'dashboard-page__btn-stock--active': playingAudio === stock.code }]"
              >
                <span>{{ playingAudio === stock.code ? '재생중' : '듣기' }}</span>
              </button>

              <button class="dashboard-page__btn-stock dashboard-page__btn-stock--secondary">
                <span>요약</span>
              </button>

              <button class="dashboard-page__btn-stock dashboard-page__btn-stock--secondary">
                <span>고객</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <nuxt-link
        to="/stock/report"
        class="dashboard-card__view-more dashboard-card__view-more--green"
      >
        더보기
      </nuxt-link>
    </div>
  </Card>
</template>

<script>
import { reportStocks } from '~/assets/data/dashboard-data'

export default {
  name: 'AiReportCard',
  props: {
    currentTime: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      playingAudio: null,
      reportStocks
    }
  },
  methods: {
    isToday(datetime) {
      if (!datetime) {
        return false
      }
      const now = new Date()
      const todayStr = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
      return datetime.startsWith(todayStr)
    }
  }
}
</script>

<style scoped>
/* Scoped styles will be inherent from the global dashboard style for now, or moved here. */
</style>
