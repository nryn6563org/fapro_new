<template>
  <div class="month-view">
    <div class="month-view__grid">
      <!-- Weekday Headers -->
      <div
        v-for="(day, idx) in daysFull"
        :key="day"
        :class="['month-view__th', { 'text-red-600': idx === 0, 'text-blue-600': idx === 6 }]"
      >
        {{ day }}
      </div>

      <!-- Empty slots for previous month -->
      <div
        v-for="n in firstDay"
        :key="'empty-' + n"
        class="month-view__cell month-view__cell--empty"
      ></div>

      <!-- Actual days -->
      <div
        v-for="day in daysInMonth"
        :key="day"
        class="month-view__cell hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div :class="['month-view__day-num', getDayClass(day)]">
          {{ day }}
        </div>

        <div class="month-view__events">
          <div
            v-for="event in getEvents(day).slice(0, 2)"
            :key="event.id"
            :class="['month-view__event-tag', event.color]"
          >
            {{ event.startTime }} {{ event.title }}
          </div>
          <div v-if="getEvents(day).length > 2" class="month-view__more">
            +{{ getEvents(day).length - 2 }}개 더보기
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 월간 캘린더 뷰
 */
import { getDaysInMonth, getFirstDayOfMonth, isSameDay } from '~/utils/scheduleUtils.js'
import '~/assets/css/pages/schedule/ScheduleMonthView.css'

export default {
  name: 'ScheduleMonthView',
  props: {
    currentDate: { type: Date, required: true },
    events: { type: Array, required: true }
  },
  data() {
    return {
      daysFull: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
    }
  },
  computed: {
    daysInMonth() {
      return getDaysInMonth(this.currentDate)
    },
    firstDay() {
      return getFirstDayOfMonth(this.currentDate)
    }
  },
  methods: {
    getEvents(day) {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day)
      return this.events.filter((e) => isSameDay(e.date, date))
    },
    isToday(day) {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day)
      return isSameDay(date, new Date())
    },
    getDayClass(day) {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day)
      const dayOfWeek = date.getDay()

      if (this.isToday(day)) return 'month-view__day-num--today'
      if (dayOfWeek === 0) return 'text-red-600'
      if (dayOfWeek === 6) return 'text-blue-600'
      return 'text-slate-700 dark:text-slate-300'
    }
  }
}
</script>
