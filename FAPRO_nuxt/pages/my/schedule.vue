<template>
  <div class="p-schedule">
    <header class="p-schedule__header">
      <div class="p-schedule__title-group">
        <h2 class="p-schedule__title">일정 관리</h2>
        <p class="p-schedule__desc">상담 일정 및 주요 이벤트를 관리합니다.</p>
      </div>
      <button class="c-btn c-btn--primary">
        <Plus :size="16" class="mr-2" />
        새 일정
      </button>
    </header>

    <div class="p-schedule__content">
      <div class="p-schedule__calendar-wrapper">
        <div class="p-schedule__nav">
          <button class="c-btn c-btn--ghost c-btn--icon"><ChevronLeft :size="20" /></button>
          <span class="p-schedule__current-month">2026년 2월</span>
          <button class="c-btn c-btn--ghost c-btn--icon"><ChevronRight :size="20" /></button>
        </div>
        
        <div class="p-schedule__grid-header">
          <div v-for="day in ['일', '월', '화', '수', '목', '금', '토']" :key="day" class="p-schedule__day-name">
            {{ day }}
          </div>
        </div>
        <div class="p-schedule__grid">
          <div v-for="date in calendarDates" :key="date.fullDate" class="p-schedule__cell" :class="{'p-schedule__cell--today': date.isToday, 'p-schedule__cell--other-month': !date.isCurrentMonth}">
            <span class="p-schedule__date-num">{{ date.day }}</span>
            <div class="p-schedule__events">
              <div v-for="event in date.events" :key="event.id" class="p-schedule__event" :class="`p-schedule__event--${event.type}`">
                {{ event.title }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-schedule__sidebar">
        <div class="p-schedule__sync-card">
          <h3 class="p-schedule__sync-title">캘린더 연동</h3>
          <div class="p-schedule__sync-items">
            <div class="p-schedule__sync-item">
              <div class="flex items-center">
                <img src="https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png" alt="Google" class="w-6 h-6 mr-2">
                <span class="text-sm font-medium">구글 캘린더</span>
              </div>
              <label class="c-toggle">
                <input type="checkbox" checked>
                <span class="c-toggle__slider"></span>
              </label>
            </div>
            <div class="p-schedule__sync-item">
              <div class="flex items-center">
                <span class="w-6 h-6 mr-2 flex items-center justify-center bg-green-500 text-white rounded-md text-[10px] font-bold">N</span>
                <span class="text-sm font-medium">네이버 캘린더</span>
              </div>
              <label class="c-toggle">
                <input type="checkbox">
                <span class="c-toggle__slider"></span>
              </label>
            </div>
          </div>
        </div>

        <h3 class="p-schedule__sidebar-title">오늘의 일정</h3>
        <div class="p-schedule__event-list">
          <div v-for="event in todayEvents" :key="event.id" class="p-schedule__list-item" :class="`p-schedule__list-item--${event.type}`">
            <span class="p-schedule__time">{{ event.time }}</span>
            <div class="p-schedule__item-content">
              <span class="p-schedule__item-title">{{ event.title }}</span>
              <span class="p-schedule__item-desc">{{ event.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MySchedulePage',
  data() {
    return {
      todayEvents: [
        { id: 1, time: '10:00', title: '팀 주간 회의', desc: '대회의실 A', type: 'meeting' },
        { id: 2, time: '14:00', title: '김철수 고객 상담', desc: '자산 리밸런싱 미팅', type: 'consultation' },
        { id: 3, time: '16:30', title: '투자 전략 세미나', desc: '온라인 Zoom', type: 'seminar' }
      ]
    }
  },
  computed: {
    calendarDates() {
      // Mock calendar data generation for Feb 2026
      const dates = []
      // Previous month padding
      for(let i=25; i<=31; i++) dates.push({ day: i, isCurrentMonth: false, events: [] })
      // Current month
      for(let i=1; i<=28; i++) {
        const events = []
        if(i === 6) events.push({ id: 1, title: '팀 회의', type: 'meeting' }, { id: 2, title: '고객 상담', type: 'consultation' })
        if(i === 12) events.push({ id: 3, title: '세미나', type: 'seminar' })
        if(i === 20) events.push({ id: 4, title: '결산', type: 'task' })
        dates.push({ day: i, isCurrentMonth: true, isToday: i === 6, events, fullDate: `2026-02-${i}` })
      }
      return dates
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/my/schedule.css';
</style>
