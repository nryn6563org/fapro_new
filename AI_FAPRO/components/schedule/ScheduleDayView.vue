<template>
  <div class="day-view">
    <div class="day-view__container">
      <!-- Day Header -->
      <div class="day-view__header">
        <div class="day-view__time-label">GMT+9</div>
        <div class="day-view__day-info">
          <div class="text-sm font-black text-slate-500 uppercase tracking-widest mb-1">
            {{ formatWeekday(selectedDate) }}
          </div>
          <div
            :class="['day-view__date-num', { 'day-view__date-num--today': isToday(selectedDate) }]"
          >
            {{ selectedDate.getDate() }}
          </div>
        </div>
      </div>

      <!-- Time Grid -->
      <div class="day-view__grid">
        <div v-for="hour in timeSlots" :key="hour" class="day-view__row">
          <div class="day-view__hour-label">
            {{ formatTime(hour) }}
          </div>
          <div
            class="day-view__slot hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
          >
            <div
              v-for="event in getEventsForHour(hour)"
              :key="event.id"
              :class="['day-view__event', 'animate__animated animate__fadeInRight', event.color]"
            >
              <div class="flex items-center justify-between mb-1">
                <span class="font-black text-sm">{{ event.title }}</span>
                <span class="text-[10px] opacity-80">{{ event.type }}</span>
              </div>
              <div class="flex items-center gap-3 text-xs opacity-90">
                <div class="flex items-center gap-1">
                  <clock-icon class="w-3 h-3" />
                  {{ event.startTime }} - {{ event.endTime }}
                </div>
                <div v-if="event.location" class="flex items-center gap-1">
                  <map-pin-icon class="w-3 h-3" />
                  {{ event.location }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 일간 캘린더 뷰
 */
import { ClockIcon, MapPinIcon } from 'vue-feather-icons'
import { isSameDay, formatTime, timeSlots } from '~/utils/scheduleUtils.js'
import '~/assets/css/pages/schedule/ScheduleDayView.css'

export default {
  name: 'ScheduleDayView',
  components: {
    ClockIcon,
    MapPinIcon
  },
  props: {
    selectedDate: { type: Date, required: true },
    events: { type: Array, required: true }
  },
  data() {
    return {
      timeSlots
    }
  },
  methods: {
    formatWeekday(date) {
      return date.toLocaleDateString('ko-KR', { weekday: 'long' })
    },
    formatTime(hour) {
      return formatTime(hour)
    },
    isToday(date) {
      return isSameDay(date, new Date())
    },
    getEventsForHour(hour) {
      return this.events.filter((e) => {
        const sameDay = isSameDay(e.date, this.selectedDate)
        const eventHour = parseInt(e.startTime.split(':')[0])
        return sameDay && eventHour === hour
      })
    }
  }
}
</script>
