<template>
  <div ref="grid" class="week-view__grid">
    <div v-for="hour in timeSlots" :key="hour" class="week-view__row">
      <div class="week-view__hour-label">
        {{ formatTimeLabel(hour) }}
      </div>
      <div v-for="day in weekDays" :key="day.getTime()" class="week-view__slot">
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
</template>

<script>
/**
 * 기능: 주간 뷰의 시간 그리드 영역
 */
import { formatTime, isSameDay } from "~/utils/scheduleUtils.js";

export default {
  name: "ScheduleWeekGrid",
  props: {
    timeSlots: { type: Array, required: true },
    weekDays: { type: Array, required: true },
    events: { type: Array, required: true },
    selectedDate: { type: Date, required: true },
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
        let hourToScroll = 9;

        if (dayEvents.length > 0) {
          const hours = dayEvents.map((e) => parseInt(e.startTime.split(":")[0]));
          hourToScroll = Math.min(...hours);
        }

        const scrollOffset = hourToScroll * 96;
        grid.scrollTo({ top: scrollOffset, behavior: "smooth" });
      });
    },
    formatTimeLabel(hour) {
      return formatTime(hour);
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
