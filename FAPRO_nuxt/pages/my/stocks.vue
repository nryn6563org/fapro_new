<template>
  <div class="my-stocks-page">
    <!-- 헤더 영역 -->
    <div class="my-stocks-page__header">
      <div class="my-stocks-page__title-group">
        <h1 class="my-stocks-page__title">MY 종목</h1>
        <p class="my-stocks-page__subtitle">나의 관심 종목 및 보유 현황</p>
      </div>
      <button class="my-stocks-page__btn-add" @click="addStock">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        종목 추가
      </button>
    </div>

    <!-- 종목 카드 섹션 -->
    <div class="my-stocks-page__card">
      <div class="my-stocks-page__card-header">
        <div class="my-stocks-page__actions-left">
          <label class="my-stocks-page__checkbox-label">
            <input
              type="checkbox"
              class="my-stocks-page__checkbox"
              :checked="allSelected"
              @change="toggleAll"
            />
            <span class="my-stocks-page__checkbox-text">전체 선택</span>
          </label>
          <span class="my-stocks-page__selection-count">({{ selectedStocks.length }}/{{ paginatedStocks.length }})</span>
          <button
            v-if="selectedStocks.length > 0"
            class="my-stocks-page__btn-delete"
            @click="deleteSelected"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            선택 삭제
          </button>
        </div>

        <div class="my-stocks-page__legend">
          <div class="my-stocks-page__legend-item">
            <svg width="14" height="14" class="my-stocks-page__legend-icon--today" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10"></circle><path d="M12 8l-2 4h4l-2 4" fill="white"></path>
            </svg>
            <span>오늘의 PICK</span>
          </div>
          <div class="my-stocks-page__legend-item">
            <svg width="14" height="14" class="my-stocks-page__legend-icon--event" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span>이벤트 발생</span>
          </div>
        </div>
      </div>

      <!-- 종목 그리드 -->
      <div class="my-stocks-page__grid">
        <div v-for="stock in paginatedStocks" :key="stock.id" class="my-stocks-page__item-wrapper">
          <input
            type="checkbox"
            class="my-stocks-page__checkbox"
            :checked="selectedStocks.includes(stock.id)"
            @change="toggleStock(stock.id)"
          />
          <nuxt-link :to="'/stock/detail/' + stock.code" class="my-stocks-page__link">
            <div class="my-stocks-page__item-card">
              <div class="my-stocks-page__info-left">
                <span class="my-stocks-page__name">{{ stock.name }}</span>
                <div v-if="stock.isTodayPick" class="my-stocks-page__badge my-stocks-page__badge--today" title="오늘의 PICK">
                  <svg width="12" height="12" class="my-stocks-page__legend-icon--today" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10"></circle><path d="M12 8l-2 4h4l-2 4" fill="white"></path>
                  </svg>
                </div>
                <div v-if="stock.hasEvent" class="my-stocks-page__badge my-stocks-page__badge--event" title="이벤트 발생">
                  <svg width="12" height="12" class="my-stocks-page__legend-icon--event" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </div>
              </div>

              <div class="my-stocks-page__price-box">
                <span class="my-stocks-page__price">₩{{ stock.currentPrice.toLocaleString() }}</span>
                <span
                  class="my-stocks-page__change"
                  :class="stock.changeRate >= 0 ? 'my-stocks-page__change--up' : 'my-stocks-page__change--down'"
                >
                  {{ stock.changeRate >= 0 ? '+' : '' }}{{ stock.changeRate.toFixed(2) }}%
                </span>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>

      <!-- 페이지네이션 -->
      <div class="my-stocks-page__pagination">
        <button
          class="my-stocks-page__btn-page"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          이전
        </button>
        <span class="my-stocks-page__page-status">페이지 {{ currentPage }} / {{ totalPages }}</span>
        <button
          class="my-stocks-page__btn-page"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          다음
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * My Stocks Page Migration
 * - React MyStocks를 Nuxt로 마이그레이션
 * - 체크박스 기반 종목 다중 선택 및 삭제 지원
 * - 오늘의 PICK 및 이벤트 뱃지 표시
 */

export default {
  name: 'MyStocksPage',
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
      selectedStocks: [],
      myStocks: [
        { id: 1, name: '삼성전자', code: '005930', currentPrice: 72000, changeRate: 2.86, hasEvent: true, isTodayPick: true },
        { id: 2, name: 'SK하이닉스', code: '000660', currentPrice: 168000, changeRate: 4.8, hasEvent: true, isTodayPick: true },
        { id: 3, name: '카카오', code: '035720', currentPrice: 52000, changeRate: -1.5, hasEvent: false, isTodayPick: false },
        { id: 4, name: 'NAVER', code: '035420', currentPrice: 215000, changeRate: 1.8, hasEvent: true, isTodayPick: false },
        { id: 5, name: '현대차', code: '005380', currentPrice: 248000, changeRate: 3.2, hasEvent: true, isTodayPick: true },
        { id: 6, name: 'LG에너지솔루션', code: '373220', currentPrice: 485000, changeRate: -2.1, hasEvent: false, isTodayPick: false },
        { id: 7, name: '삼성바이오로직스', code: '207940', currentPrice: 892000, changeRate: 1.5, hasEvent: true, isTodayPick: false },
        { id: 8, name: '포스코홀딩스', code: '005490', currentPrice: 378000, changeRate: 2.8, hasEvent: false, isTodayPick: false },
        { id: 9, name: '기아', code: '000270', currentPrice: 98700, changeRate: -0.8, hasEvent: true, isTodayPick: true },
        { id: 10, name: 'KB금융', code: '105560', currentPrice: 68400, changeRate: 1.2, hasEvent: false, isTodayPick: false },
        { id: 11, name: '신한지주', code: '055550', currentPrice: 45200, changeRate: 0.5, hasEvent: false, isTodayPick: false },
        { id: 12, name: '셀트리온', code: '068270', currentPrice: 185000, changeRate: -1.3, hasEvent: true, isTodayPick: true }
      ]
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.myStocks.length / this.itemsPerPage)
    },
    paginatedStocks() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.myStocks.slice(start, start + this.itemsPerPage)
    },
    allSelected() {
      return this.paginatedStocks.length > 0 &&
             this.paginatedStocks.every(s => this.selectedStocks.includes(s.id))
    }
  },
  methods: {
    toggleStock(id) {
      const idx = this.selectedStocks.indexOf(id)
      if (idx > -1) {
        this.selectedStocks.splice(idx, 1)
      } else {
        this.selectedStocks.push(id)
      }
    },
    toggleAll() {
      if (this.allSelected) {
        this.selectedStocks = this.selectedStocks.filter(id =>
          !this.paginatedStocks.find(s => s.id === id)
        )
      } else {
        this.paginatedStocks.forEach((s) => {
          if (!this.selectedStocks.includes(s.id)) {
            this.selectedStocks.push(s.id)
          }
        })
      }
    },
    deleteSelected() {
      if (confirm(`선택한 ${this.selectedStocks.length}개 종목을 삭제하시겠습니까?`)) {
        this.myStocks = this.myStocks.filter(s => !this.selectedStocks.includes(s.id))
        this.selectedStocks = []
        alert('삭제되었습니다.')
      }
    },
    addStock() {
      alert('종목 추가 팝업을 준비 중입니다.')
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/my/my-stocks-style.css';
</style>
