<template>
  <aside class="c-right-panel">
    <div class="c-right-panel__inner">
      <!-- Schedule Section -->
      <section class="c-right-panel__section">
        <div class="c-right-panel__header">
          <h2 class="c-right-panel__title">상담 일정</h2>
          <button class="c-right-panel__action-btn" aria-label="일정 추가">
            <Plus :size="16" />
          </button>
        </div>
        <div class="c-right-panel__calendar">
          <div class="c-calendar-placeholder">
            <div class="c-calendar-placeholder__header">
              <button class="c-right-panel__action-btn" aria-label="이전 달">
                <ChevronLeft :size="16" />
              </button>
              <span class="c-calendar-placeholder__month">2026.02</span>
              <button class="c-right-panel__action-btn" aria-label="다음 달">
                <ChevronRight :size="16" />
              </button>
            </div>
            <div class="c-calendar-placeholder__grid">
              <div v-for="i in 31" :key="i" class="c-calendar-placeholder__day" :class="{
                'c-calendar-placeholder__day--today': i === 6, 
                'c-calendar-placeholder__day--has-event': [10, 15, 20].includes(i)
              }">
                {{ i }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Real-time Issues Section -->
      <section class="c-right-panel__section">
        <div class="c-right-panel__header">
          <h2 class="c-right-panel__title">실시간 이슈</h2>
          <button class="c-right-panel__action-btn" aria-label="이슈 새로고침">
            <RefreshCw :size="14" />
          </button>
        </div>
        <div class="c-right-panel__issue-list">
          <div v-for="(issue, index) in dummyIssues" :key="index" class="c-issue-item">
            <div class="c-issue-item__header">
              <span class="c-issue-item__badge" :class="`c-issue-item__badge--${issue.type}`">{{ issue.typeName }}</span>
              <span class="c-issue-item__time">{{ issue.time }}</span>
            </div>
            <p class="c-issue-item__content">{{ issue.content }}</p>
          </div>
        </div>
      </section>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'RightPanelComponent',
  data() {
    return {
      dummyIssues: [
        { type: 'news', typeName: '뉴스', time: '방금 전', content: 'LG에너지솔루션, 북미 최대 배터리 공급 계약 체결' },
        { type: 'issue', typeName: '이슈', time: '10분 전', content: '반도체 소부장 기업 실적 호조에 따른 섹터 전반 강세' },
        { type: 'social', typeName: '소셜', time: '25분 전', content: '국내 주요 커뮤니티 "전고체 배터리" 언급량 전일 대비 200% 증가' },
        { type: 'news', typeName: '뉴스', time: '1시간 전', content: '한국은행, 금리 동결 발표... 금융주 변동성 확대 주의' },
        { type: 'issue', typeName: '이슈', time: '2시간 전', content: 'AI 반도체 수요 폭증, 관련주 연일 신고가 갱신' }
      ],
      scrollInterval: null
    }
  },
  mounted() {
    this.startAutoScroll()
  },
  beforeDestroy() {
    this.stopAutoScroll()
  },
  methods: {
    startAutoScroll() {
      const list = this.$el.querySelector('.c-right-panel__issue-list')
      if (!list) return

      this.scrollInterval = setInterval(() => {
        if (list.scrollTop + list.clientHeight >= list.scrollHeight) {
          list.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          list.scrollBy({ top: 60, behavior: 'smooth' })
        }
      }, 3000)
    },
    stopAutoScroll() {
      if (this.scrollInterval) {
        clearInterval(this.scrollInterval)
        this.scrollInterval = null
      }
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/area/right-panel.css';
</style>
