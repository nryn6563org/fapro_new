<template>
  <div class="week-view">
    <div class="week-view__container">
      <!-- 주간 헤더 -->
      <div class="week-view__header">
        <div class="week-view__time-label">GMT+9</div>
        <div
          v-for="day in weekDays"
          :key="day.getTime()"
          :class="[
            'week-view__day-col',
            { 'week-view__day-col--selected': isSelected(day) },
          ]"
          @click="$emit('select-date', day)"
        >
          <div :class="['week-view__weekday', getWeekdayClass(day)]">
            {{ formatWeekday(day) }}
          </div>
          <div :class="['week-view__date-num', getDateNumClass(day)]">
            {{ day.getDate() }}
          </div>
        </div>
      </div>

      <!-- 시간 격자 -->
      <div class="week-view__grid">
        <div v-for="hour in timeSlots" :key="hour" class="week-view__row">
          <div class="week-view__hour-label">
            {{ formatTime(hour) }}
          </div>
          <div
            v-for="day in weekDays"
            :key="day.getTime()"
            class="week-view__slot"
          >
            <div
              v-for="event in getEventsForSlot(day, hour)"
              :key="event.id"
              :class="[
                'week-view__event',
                'animate__animated',
                'animate__fadeIn',
                getEventColorClass(event.color),
              ]"
            >
              <div class="week-view__event-title">{{ event.title }}</div>
              <div class="week-view__event-time">
                {{ event.startTime }} - {{ event.endTime }}
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
 * 기능: 주간 캘린더 뷰
 */
import {
  getWeekDays,
  isSameDay,
  formatTime,
  timeSlots,
} from "~/utils/scheduleUtils.js";
import "~/assets/css/pages/schedule/ScheduleWeekView/ScheduleWeekView.css";

export default {
  name: "ScheduleWeekView",
  props: {
    currentDate: { type: Date, required: true },
    selectedDate: { type: Date, required: true },
    events: { type: Array, required: true },
  },
  data() {
    return {
      timeSlots,
    };
  },
  computed: {
    weekDays() {
      return getWeekDays(this.currentDate);
    },
  },
  methods: {
    formatWeekday(date) {
      return date.toLocaleDateString("ko-KR", { weekday: "short" });
    },
    formatTime(hour) {
      return formatTime(hour);
    },
    isSelected(date) {
      return isSameDay(date, this.selectedDate);
    },
    isToday(date) {
      return isSameDay(date, new Date());
    },
    getWeekdayClass(date) {
      const d = date.getDay();
      if (d === 0) return "text-red-500 dark:text-red-400";
      if (d === 6) return "text-blue-500 dark:text-blue-400";
      return "text-slate-500 dark:text-slate-400";
    },
    getDateNumClass(date) {
      if (this.isToday(date)) return "week-view__date-num--today";

      let baseClass = "text-slate-700 dark:text-slate-300";
      const d = date.getDay();
      if (d === 0) baseClass = "text-red-500 dark:text-red-400";
      if (d === 6) baseClass = "text-blue-500 dark:text-blue-400";

      if (this.isSelected(date)) return `${baseClass} font-black`;
      return baseClass;
    },
    getEventsForSlot(day, hour) {
      return this.events.filter((e) => {
        const sameDay = isSameDay(e.date, day);
        const eventHour = parseInt(e.startTime.split(":")[0]);
        return sameDay && eventHour === hour;
      });
    },
    getEventColorClass(color) {
      // 'bg-blue-500' 형식을 BEM 클래스로 변환
      return `week-view__event--${color.replace("bg-", "")}`;
    },
  },
};
</script>
