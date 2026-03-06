<template>
  <div class="week-view">
    <div class="week-view__container">
      <!-- Week Header -->
      <div class="week-view__header">
        <div class="week-view__time-label">GMT+9</div>
        <div
          v-for="day in weekDays"
          :key="day.getTime()"
          :class="getDayColClass(day)"
          @click="$emit('select-date', day)"
        >
          <div :class="getWeekdayLabelClass(day)">
            {{ formatWeekday(day) }}
          </div>
          <div :class="getDateNumLabelClass(day)">
            {{ day.getDate() }}
          </div>
        </div>
      </div>

      <!-- Time Grid -->
      <div ref="grid" class="week-view__grid">
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
              :class="getEventTagClass(event)"
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
  watch: {
    selectedDate: {
      immediate: true,
      handler(newDate) {
        this.scrollToFirstEvent(newDate);
      },
    },
  },
  methods: {
    scrollToFirstEvent(date) {
      this.$nextTick(() => {
        const grid = this.$refs.grid;
        if (!grid) return;

        const dayEvents = this.events.filter((e) => isSameDay(e.date, date));
        let hourToScroll = 9; // 기본 9시

        if (dayEvents.length > 0) {
          const hours = dayEvents.map((e) =>
            parseInt(e.startTime.split(":")[0])
          );
          hourToScroll = Math.min(...hours);
        }

        const scrollOffset = hourToScroll * 96; // h-24 = 96px
        grid.scrollTo({
          top: scrollOffset,
          behavior: "smooth",
        });
      });
    },
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
    getDayColClass(date) {
      if (this.isSelected(date)) return "week-view__day-col--selected";
      return "week-view__day-col--default";
    },
    getWeekdayLabelClass(date) {
      const d = date.getDay();
      if (d === 0) return "week-view__weekday--sun";
      if (d === 6) return "week-view__weekday--sat";
      return "week-view__weekday--default";
    },
    getDateNumLabelClass(date) {
      const isToday = this.isToday(date);
      const isSelected = this.isSelected(date);
      const d = date.getDay();

      if (isToday) return "week-view__date-num--today";

      let modifier = "default";
      if (d === 0) modifier = "sun";
      else if (d === 6) modifier = "sat";

      if (isSelected) {
        return `week-view__date-num--selected-${modifier}`;
      }
      return `week-view__date-num--${modifier}`;
    },
    getEventsForSlot(day, hour) {
      return this.events.filter((e) => {
        const sameDay = isSameDay(e.date, day);
        const eventHour = parseInt(e.startTime.split(":")[0]);
        return sameDay && eventHour === hour;
      });
    },
    getEventTagClass(event) {
      const color = event.color.replace("bg-", "");
      return `week-view__event--${color}`;
    },
  },
};
</script>
