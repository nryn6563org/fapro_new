<template>
  <div class="issue-list">
    <div v-if="selectedBubble" class="issue-list__filter-info">
      <div class="issue-list__filter-label">
        <div class="issue-list__filter-icon-box">
          <svg class="issue-list__filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <span class="issue-list__filter-text">필터링 키워드:</span>
        <span class="issue-list__filter-keyword">{{ selectedBubble[3] }}</span>
      </div>
      <button @click="$emit('clear-filter')" class="issue-list__btn-clear">전체보기</button>
    </div>

    <article v-for="issue in issues" :key="issue.id" class="issue-list__card">
      <header class="issue-list__card-header">
        <div class="issue-list__card-title-group">
          <span class="issue-list__card-category">{{ issue.keyword }}</span>
          <h3 class="issue-list__card-title">{{ issue.title }}</h3>
        </div>
        <span class="issue-list__card-date">{{ issue.date }}</span>
      </header>
      <p class="issue-list__card-desc">{{ issue.desc }}</p>

      <div class="issue-list__stocks-section">
        <div class="issue-list__stocks-header">
          <div class="issue-list__stocks-dot"></div>
          <span class="issue-list__stocks-label">주요 연관 종목</span>
        </div>
        <div class="issue-list__stocks-grid">
          <div
            v-for="stock in issue.stocks"
            :key="stock.name"
            class="issue-list__stock-item"
          >
            <span class="issue-list__stock-name">{{ stock.name }}</span>
            <div class="issue-list__stock-change-wrapper">
              <span
                class="issue-list__stock-change"
                :class="stock.change >= 0 ? 'issue-list__stock-change--up' : 'issue-list__stock-change--down'"
              >
                {{ stock.change >= 0 ? '▲' : '▼' }}{{ Math.abs(stock.change) }}%
              </span>
            </div>
          </div>
          <button class="issue-list__btn-add">
            <svg class="issue-list__btn-add-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </article>

    <div v-if="issues.length === 0" class="issue-list__empty">
      <div class="issue-list__empty-icon-box">
        <svg class="issue-list__empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <p class="issue-list__empty-text">해당 키워드와 관련된 실시간 이슈가 없습니다.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IssueListSection',
  props: {
    selectedBubble: {
      type: Array,
      default: null
    },
    issues: {
      type: Array,
      default: () => []
    }
  }
}
</script>
