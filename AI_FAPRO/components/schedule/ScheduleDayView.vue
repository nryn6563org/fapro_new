<template>
  <div class="day-view">
    <div class="day-view__container">
      <!-- Day Header -->
      <div class="day-view__header">
        <div class="day-view__time-label">GMT+9</div>
        <div class="day-view__day-info">
          <div class="day-view__weekday">
            {{ formatWeekday(selectedDate) }}
          </div>
          <div :class="getDateNumLabelClass(selectedDate)">
            {{ selectedDate.getDate() }}
          </div>
        </div>
      </div>

      <!-- Time Grid -->
      <div ref="grid" class="day-view__grid">
        <div v-for="hour in timeSlots" :key="hour" class="day-view__row">
          <div class="day-view__hour-label">
            {{ formatTime(hour) }}
          </div>
          <div class="day-view__slot">
            <div
              v-for="event in getEventsForHour(hour)"
              :key="event.id"
              :class="getEventTagClass(event)"
            >
              <div class="day-view__event-header">
                <span class="day-view__event-title">{{ event.title }}</span>
                <span class="day-view__event-type">{{ event.type }}</span>
              </div>
              <div class="day-view__event-details">
                <div class="day-view__event-detail-item">
                  <clock-icon class="w-3 h-3" />
                  {{ event.startTime }} - {{ event.endTime }}
                </div>
                <div v-if="event.location" class="day-view__event-detail-item">
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
import { ClockIcon, MapPinIcon } from "vue-feather-icons";
import { isSameDay, formatTime, timeSlots } from "~/utils/scheduleUtils.js";
import "~/assets/css/pages/schedule/ScheduleDayView/ScheduleDayView.css";

export default {
  name: "ScheduleDayView",
  components: {
    ClockIcon,
    MapPinIcon,
  },
  props: {
    selectedDate: { type: Date, required: true },
    events: { type: Array, required: true },
  },
  data() {
    return {
      timeSlots,
    };
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
      return date.toLocaleDateString("ko-KR", { weekday: "long" });
    },
    formatTime(hour) {
      return formatTime(hour);
    },
    isToday(date) {
      return isSameDay(date, new Date());
    },
    getEventsForHour(hour) {
      return this.events.filter((e) => {
        const sameDay = isSameDay(e.date, this.selectedDate);
        const eventHour = parseInt(e.startTime.split(":")[0]);
        return sameDay && eventHour === hour;
      });
    },
    getDateNumLabelClass(date) {
      if (this.isToday(date)) return "day-view__date-num--today";
      return "day-view__date-num--default";
    },
    getEventTagClass(event) {
      const color = event.color.replace("bg-", "");
      return `day-view__event--${color}`;
    },
  },
};
</script>
