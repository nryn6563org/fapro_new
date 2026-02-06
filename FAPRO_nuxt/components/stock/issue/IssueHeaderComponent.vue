<template>
  <header class="issue-header">
    <div class="issue-header__title-group">
      <h1 class="issue-header__title">
        AI 이슈포착
        <span class="issue-header__badge">PRO</span>
      </h1>
      <p class="issue-header__subtitle">실시간 AI 이슈 및 관련 핵심 종목 분석</p>
    </div>
    <div class="issue-header__actions">
      <div class="issue-header__search-box">
        <div class="issue-header__search-icon-wrapper">
          <svg class="issue-header__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input
          type="text"
          class="issue-header__search-input"
          placeholder="이슈 키워드 또는 종목 검색"
          :value="value"
          @input="$emit('input', $event.target.value)"
        >
      </div>
      <button
        class="issue-header__btn-refresh"
        @click="$emit('refresh')"
      >
        <svg class="issue-header__btn-refresh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        데이터 갱신
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'IssueHeaderComponent',
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
