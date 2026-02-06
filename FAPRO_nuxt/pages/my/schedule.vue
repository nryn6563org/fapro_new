<template>
  <div class="schedule-page">
    <!-- 헤더 -->
    <div class="schedule-page__header">
      <div class="schedule-page__title-group">
        <h1 class="schedule-page__title">일정 관리</h1>
        <p class="schedule-page__subtitle">상담 일정 및 주요 금융 일정 관리</p>
      </div>
      <button class="schedule-page__btn-add" @click="openAddModal">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        새 일정 추가
      </button>
    </div>

    <!-- 통계 카드 -->
    <div class="schedule-page__stats-grid">
      <div v-for="stat in stats" :key="stat.label" class="schedule-page__stat-card">
        <div class="schedule-page__stat-info">
          <span class="schedule-page__stat-label">{{ stat.label }}</span>
          <span class="schedule-page__stat-value">{{ stat.value }}</span>
        </div>
        <div class="schedule-page__stat-icon-box" :class="`schedule-page__stat-icon-box--${stat.iconBg.split('-')[1]}`">
          <component :is="stat.icon" width="24" height="24" />
        </div>
      </div>
    </div>

    <!-- 스플릿 뷰 (캘린더 + 당일 일정) -->
    <div class="schedule-page__split-view">
      <div class="schedule-page__calendar-column">
        <div class="schedule-page__calendar-header">
          <h2 class="schedule-page__calendar-title">캘린더</h2>
          <button class="schedule-page__calendar-link">외부 캘린더 연동</button>
        </div>
        <ScheduleCalendar
          :selected-date="selectedDate"
          :dates-with-schedules="datesWithSchedules"
          @select-date="onSelectDate"
        />
      </div>

      <div class="schedule-page__details-column">
        <div class="schedule-page__card-header">
          <h2 class="schedule-page__card-title">
            {{ formatSelectedDate }} 일정
          </h2>
        </div>
        <div class="schedule-page__details-list">
          <div v-if="selectedDaySchedules.length === 0" class="schedule-page__empty-state">
            <svg class="schedule-page__empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <p class="schedule-page__empty-text">이날은 등록된 일정이 없습니다.</p>
          </div>
          <div
            v-for="item in selectedDaySchedules"
            :key="item.id"
            class="schedule-page__item"
          >
            <div class="schedule-page__item-bar" :class="item.colorClass"></div>
            <div class="schedule-page__item-content">
              <div class="schedule-page__item-header">
                <h4 class="schedule-page__item-title">{{ item.title }}</h4>
                <div class="schedule-page__item-actions">
                  <button class="schedule-page__btn-icon" @click="editItem(item)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button class="schedule-page__btn-icon schedule-page__btn-icon--delete" @click="deleteItem(item.id)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="schedule-page__item-meta">
                <div class="schedule-page__meta-group">
                  <svg class="schedule-page__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {{ item.time }}
                </div>
                <div v-if="item.location !== '-'" class="schedule-page__meta-group">
                  <svg class="schedule-page__meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {{ item.location }}
                </div>
              </div>
              <p class="schedule-page__item-desc">{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 전체 일정 리스트 -->
    <div class="schedule-page__list-card">
      <div class="schedule-page__list-header">
        <h2 class="schedule-page__card-title">전체 일정 목록</h2>
        <div class="schedule-page__filter-group">
          <button
            v-for="f in filters"
            :key="f.id"
            class="schedule-page__filter-btn"
            :class="activeFilter === f.id ? 'schedule-page__filter-btn--active' : 'schedule-page__filter-btn--inactive'"
            @click="activeFilter = f.id"
          >
            {{ f.label }}
          </button>
        </div>
      </div>

      <div class="schedule-page__group-list">
        <div v-for="group in filteredGroups" :key="group.date" class="schedule-page__group">
          <div class="schedule-page__group-header" :class="`schedule-page__group-header--${getGroupBorder(group.date).split('-')[1]}`">
            <span class="schedule-page__group-title" :class="`schedule-page__group-title--${getGroupText(group.date).split('-')[1]}`">{{ formatDate(group.date) }}</span>
            <span class="schedule-page__group-count">{{ group.items.length }}</span>
          </div>
          <div class="schedule-page__group-items">
            <div v-for="item in group.items" :key="item.id" class="schedule-page__item">
              <div class="schedule-page__item-bar" :class="item.colorClass"></div>
              <div class="schedule-page__item-content">
                <div class="schedule-page__item-header">
                  <h4 class="schedule-page__item-title">{{ item.title }}</h4>
                  <span class="schedule-page__type-label">{{ item.type }}</span>
                </div>
                <div class="schedule-page__item-meta">
                  <span>{{ item.time }}</span>
                  <span v-if="item.location !== '-'">{{ item.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 일정 추가/수정 모달 (심플 구현) -->
    <div v-if="modal.show" class="schedule-modal-overlay" @click.self="modal.show = false">
      <div class="schedule-modal">
        <div class="schedule-modal__header">
          <h3 class="schedule-modal__title">{{ modal.isEdit ? '일정 수정' : '새 일정 추가' }}</h3>
          <button class="schedule-modal__btn-close" @click="modal.show = false">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="schedule-modal__body">
          <div class="schedule-modal__field-group">
            <label class="schedule-modal__label">일정 제목</label>
            <input v-model="modal.form.title" type="text" class="schedule-modal__input" placeholder="제목을 입력하세요" />
          </div>
          <div class="schedule-modal__grid">
            <div class="schedule-modal__field-group">
              <label class="schedule-modal__label">날짜</label>
              <input v-model="modal.form.date" type="date" class="schedule-modal__input" />
            </div>
            <div class="schedule-modal__field-group">
              <label class="schedule-modal__label">시간</label>
              <input v-model="modal.form.time" type="text" class="schedule-modal__input" placeholder="예: 14:00" />
            </div>
          </div>
          <div class="schedule-modal__field-group">
            <label class="schedule-modal__label">내용</label>
            <textarea v-model="modal.form.content" class="schedule-modal__input schedule-modal__input--textarea" placeholder="내용을 입력하세요"></textarea>
          </div>
        </div>
        <div class="schedule-modal__footer">
          <button class="schedule-modal__btn-cancel" @click="modal.show = false">취소</button>
          <button class="schedule-modal__btn-save" @click="saveModal">저장하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Schedule Management Migration
 * - React ScheduleManagement를 Nuxt로 마이그레이션
 * - 전용 ScheduleCalendar 컴포넌트 연동
 * - 일정 상태별 그룹화 및 필터링 기능 구현
 */

export default {
  name: 'SchedulePage',
  components: {
    CalendarIcon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>' },
    ClockIcon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>' },
    TaskIcon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>' },
    EventIcon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>' }
  },
  data() {
    return {
      selectedDate: new Date(),
      activeFilter: 'all',
      filters: [
        { id: 'all', label: '전체' },
        { id: 'today', label: '오늘' },
        { id: 'upcoming', label: '예정' },
        { id: 'past', label: '완료' }
      ],
      stats: [
        { label: '전체 일정', value: '12', icon: 'CalendarIcon', iconBg: 'bg-blue-soft' },
        { label: '미팅', value: '5', icon: 'ClockIcon', iconBg: 'bg-purple-soft' },
        { label: '업무', value: '4', icon: 'TaskIcon', iconBg: 'bg-orange-soft' },
        { label: '이벤트', value: '3', icon: 'EventIcon', iconBg: 'bg-green-soft' }
      ],
      schedules: [
        { id: 1, date: '2026-02-05', title: '김철수 고객 상담', time: '14:00', location: '본사 상담실', content: '포트폴리오 리밸런싱 상담', type: 'meeting', colorClass: 'bg-blue-500' },
        { id: 2, date: '2026-02-05', title: '분기 실적 발표', time: '전일', location: '-', content: '삼성전자 분기 실적 체크', type: 'event', colorClass: 'bg-purple-500' },
        { id: 3, date: '2026-02-08', title: '월간 리포트 마감', time: '18:00', location: '-', content: 'VIP 고객 리포트 발송', type: 'task', colorClass: 'bg-orange-500' },
        { id: 4, date: '2026-02-12', title: '투자 세미나 참석', time: '10:00', location: '강남 컨퍼런스홀', content: '상반기 투자 전략 연구', type: 'seminar', colorClass: 'bg-green-500' },
        { id: 5, date: '2026-01-20', title: '지난 상담 정리', time: '14:00', location: '-', content: '1월 상담 기록 업데이트', type: 'task', colorClass: 'bg-gray-400' }
      ],
      modal: {
        show: false,
        isEdit: false,
        form: { id: null, title: '', date: '', time: '', content: '' }
      }
    }
  },
  computed: {
    datesWithSchedules() {
      return new Set(this.schedules.map(s => s.date))
    },
    formatSelectedDate() {
      const d = this.selectedDate
      const days = ['일', '월', '화', '수', '목', '금', '토']
      return `${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`
    },
    selectedDaySchedules() {
      const key = this.selectedDate.toISOString().split('T')[0]
      return this.schedules.filter(s => s.date === key)
    },
    filteredGroups() {
      const today = new Date().toISOString().split('T')[0]
      let filtered = [...this.schedules]

      if (this.activeFilter === 'today') { filtered = filtered.filter(s => s.date === today) } else if (this.activeFilter === 'upcoming') { filtered = filtered.filter(s => s.date > today) } else if (this.activeFilter === 'past') { filtered = filtered.filter(s => s.date < today) }

      // 날짜별 그룹화
      const groups = {}
      filtered.forEach((item) => {
        if (!groups[item.date]) { groups[item.date] = [] }
        groups[item.date].push(item)
      })

      return Object.keys(groups).sort((a, b) => b.localeCompare(a)).map(date => ({
        date,
        items: groups[date]
      }))
    }
  },
  methods: {
    onSelectDate(date) {
      this.selectedDate = date
    },
    formatDate(dateStr) {
      const d = new Date(dateStr)
      const days = ['일', '월', '화', '수', '목', '금', '토']
      return `${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`
    },
    getGroupBorder(date) {
      const today = new Date().toISOString().split('T')[0]
      if (date === today) { return 'border-today' }
      if (date > today) { return 'border-upcoming' }
      return 'border-past'
    },
    getGroupText(date) {
      const today = new Date().toISOString().split('T')[0]
      if (date === today) { return 'text-today' }
      if (date > today) { return 'text-upcoming' }
      return 'text-past'
    },
    openAddModal() {
      this.modal.isEdit = false
      this.modal.form = { id: null, title: '', date: this.selectedDate.toISOString().split('T')[0], time: '14:00', content: '' }
      this.modal.show = true
    },
    editItem(item) {
      this.modal.isEdit = true
      this.modal.form = { ...item }
      this.modal.show = true
    },
    saveModal() {
      alert('성공적으로 저장되었습니다.')
      this.modal.show = false
    },
    deleteItem(id) {
      if (confirm('일정을 삭제하시겠습니까?')) {
        this.schedules = this.schedules.filter(s => s.id !== id)
      }
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/my/my-schedule-style.css';
</style>
