<template>
  <div class="calendar-wrapper">
    <!-- 헤더 -->
    <div class="calendar-header-v">
      <button class="nav-btn" @click="previousMonth">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <h2 class="current-month-text">
        {{ currentYear }}년 {{ currentMonthName }}
      </h2>

      <button class="nav-btn" @click="nextMonth">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>

    <!-- 요일 헤더 -->
    <div class="day-header-grid">
      <div v-for="(day, index) in dayNames" :key="day" :class="['day-name', { 'sun': index === 0, 'sat': index === 6 }]">
        {{ day }}
      </div>
    </div>

    <!-- 날짜 그리드 -->
    <div class="date-grid-modern">
      <div v-for="(empty, eIdx) in emptyDays" :key="'empty-' + eIdx" class="aspect-square"></div>

      <button
        v-for="day in daysInMonth"
        :key="day"
        @click="selectDate(day)"
        :class="['date-cell-v', {
          'selected': isSelected(day),
          'today': isToday(day),
          'sun': isSunday(day),
          'sat': isSaturday(day)
        }]"
      >
        <span class="date-num">{{ day }}</span>
        <div v-if="hasSchedule(day)" class="schedule-dot"></div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScheduleCalendar',
  props: {
    selectedDate: { type: Date, default: null },
    datesWithSchedules: { type: Set, default: () => new Set() }
  },
  data() {
    return {
      viewDate: new Date(),
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    }
  },
  computed: {
    currentYear() { return this.viewDate.getFullYear() },
    currentMonth() { return this.viewDate.getMonth() },
    currentMonthName() { return this.monthNames[this.currentMonth] },
    daysInMonth() {
      const year = this.currentYear
      const month = this.currentMonth
      return new Date(year, month + 1, 0).getDate()
    },
    emptyDays() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay()
      return Array(firstDay).fill(null)
    }
  },
  methods: {
    previousMonth() {
      this.viewDate = new Date(this.currentYear, this.currentMonth - 1, 1)
    },
    nextMonth() {
      this.viewDate = new Date(this.currentYear, this.currentMonth + 1, 1)
    },
    selectDate(day) {
      const newDate = new Date(this.currentYear, this.currentMonth, day)
      this.$emit('select-date', newDate)
    },
    isSelected(day) {
      if (!this.selectedDate) {
        return false
      }
      return this.selectedDate.getDate() === day &&
             this.selectedDate.getMonth() === this.currentMonth &&
             this.selectedDate.getFullYear() === this.currentYear
    },
    isToday(day) {
      const today = new Date()
      return today.getDate() === day &&
             today.getMonth() === this.currentMonth &&
             today.getFullYear() === this.currentYear
    },
    isSunday(day) {
      return new Date(this.currentYear, this.currentMonth, day).getDay() === 0
    },
    isSaturday(day) {
      return new Date(this.currentYear, this.currentMonth, day).getDay() === 6
    },
    hasSchedule(day) {
      const key = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      return this.datesWithSchedules.has(key)
    }
  }
}
</script>

<style scoped>
.calendar-wrapper {
  width: 100%;
}

.calendar-header-v {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.nav-btn {
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
}

.nav-btn:hover {
  background-color: #f9fafb;
}

.current-month-text {
  font-size: 1.125rem;
  font-weight: 900;
  color: #111827;
}

.day-header-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.day-name {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 900;
  color: #9ca3af;
  text-transform: uppercase;
}

.day-name.sun {
  color: #f87171;
}

.day-name.sat {
  color: #60a5fa;
}

.date-grid-modern {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.375rem;
}

.date-cell-v {
  aspect-ratio: 1 / 1;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s;
  border: 1px solid transparent;
  background-color: transparent;
  cursor: pointer;
  color: #374151;
}

.date-cell-v:hover {
  background-color: #f9fafb;
  border-color: #f3f4f6;
}

.date-cell-v.selected {
  background-color: #2563eb;
  color: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
  border-color: transparent;
}

.date-cell-v.today:not(.selected) {
  background-color: #eff6ff;
  color: #2563eb;
  border-color: #dbeafe;
}

.date-cell-v.sun:not(.selected) {
  color: #ef4444;
}

.date-cell-v.sat:not(.selected) {
  color: #3b82f6;
}

.schedule-dot {
  position: absolute;
  bottom: 0.5rem;
  width: 0.25rem;
  height: 0.25rem;
  background-color: #f97316;
  border-radius: 9999px;
}

.selected .schedule-dot {
  background-color: #ffffff;
}
</style>
