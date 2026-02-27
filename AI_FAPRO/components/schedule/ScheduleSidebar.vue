<template>
  <aside class="schedule-sidebar">
    <!-- Create Button -->
    <div class="schedule-sidebar__action">
      <button class="schedule-sidebar__create-btn">
        <plus-icon class="w-4 h-4 mr-2" />
        만들기
      </button>
    </div>

    <!-- Mini Calendar -->
    <div class="schedule-sidebar__mini-cal">
      <div class="flex items-center justify-between mb-3">
        <h3 class="schedule-sidebar__section-title">{{ miniCalLabel }}</h3>
        <div class="flex gap-1">
          <button @click="$emit('prev-month')" class="schedule-sidebar__mini-nav">
            <chevron-left-icon class="w-4 h-4" />
          </button>
          <button @click="$emit('next-month')" class="schedule-sidebar__mini-nav">
            <chevron-right-icon class="w-4 h-4" />
          </button>
        </div>
      </div>

      <div class="grid grid-cols-7 gap-1 mb-2">
        <div
          v-for="(day, idx) in daysOfWeek"
          :key="day"
          :class="[
            'schedule-sidebar__mini-dot',
            { 'text-red-600': idx === 0, 'text-blue-600': idx === 6 }
          ]"
        >
          {{ day }}
        </div>
      </div>

      <div class="grid grid-cols-7 gap-1">
        <div v-for="n in firstDay" :key="'empty-' + n" class="h-8"></div>
        <button
          v-for="day in daysInMonth"
          :key="day"
          @click="selectDate(day)"
          :class="['schedule-sidebar__day-btn', getDayClass(day)]"
        >
          {{ day }}
          <div v-if="hasEvents(day) && !isSelected(day)" class="schedule-sidebar__has-event"></div>
        </button>
      </div>
    </div>

    <!-- My Calendars -->
    <div class="schedule-sidebar__filters">
      <h3 class="schedule-sidebar__section-title">내 캘린더</h3>
      <div class="space-y-2">
        <label v-for="cal in calendars" :key="cal.id" class="schedule-sidebar__filter-item">
          <input
            type="checkbox"
            :checked="cal.checked"
            @change="$emit('toggle-calendar', cal.id)"
            class="schedule-sidebar__checkbox"
          />
          <div :class="['schedule-sidebar__color-box', cal.color]"></div>
          <span class="schedule-sidebar__filter-label">{{ cal.name }}</span>
        </label>
      </div>
    </div>
  </aside>
</template>

<script>
/**
 * 기능: 캘린더 사이드바 (미니 달력 및 필터)
 */
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from 'vue-feather-icons'
import { getDaysInMonth, getFirstDayOfMonth, isSameDay } from '~/utils/scheduleUtils.js'
import '~/assets/css/pages/schedule/ScheduleSidebar.css'

export default {
  name: 'ScheduleSidebar',
  components: {
    PlusIcon,
    ChevronLeftIcon,
    ChevronRightIcon
  },
  props: {
    currentDate: { type: Date, required: true },
    selectedDate: { type: Date, required: true },
    calendars: { type: Array, required: true },
    events: { type: Array, required: true }
  },
  data() {
    return {
      daysOfWeek: ['일', '월', '화', '수', '목', '금', '토']
    }
  },
  computed: {
    miniCalLabel() {
      return this.currentDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })
    },
    daysInMonth() {
      return getDaysInMonth(this.currentDate)
    },
    firstDay() {
      return getFirstDayOfMonth(this.currentDate)
    }
  },
  methods: {
    selectDate(day) {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day)
      this.$emit('update:selectedDate', date)
    },
    isSelected(day) {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day)
      return isSameDay(date, this.selectedDate)
    },
    isToday(day) {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day)
      return isSameDay(date, new Date())
    },
    hasEvents(day) {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day)
      return this.events.some((e) => isSameDay(e.date, date))
    },
    getDayClass(day) {
      if (this.isSelected(day)) return 'schedule-sidebar__day-btn--selected'
      if (this.isToday(day)) return 'schedule-sidebar__day-btn--today'
      return ''
    }
  }
}
</script>
