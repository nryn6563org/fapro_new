<template>
  <div class="week-view">
    <div class="week-view__container">
      <!-- 주간 헤더 (Modularized) -->
      <ScheduleWeekHeader
        :week-days="weekDays"
        :selected-date="selectedDate"
        @select-date="$emit('select-date', $event)"
      />

      <!-- 시간 그리드 (Modularized) -->
      <ScheduleWeekGrid
        :time-slots="timeSlots"
        :week-days="weekDays"
        :events="events"
        :selected-date="selectedDate"
      />
    </div>
  </div>
</template>

<script>
/**
 * 기능: 주간 캘린더 뷰 (Modularized)
 */
import ScheduleWeekHeader from "./ScheduleWeekView/ScheduleWeekHeader.vue";
import ScheduleWeekGrid from "./ScheduleWeekView/ScheduleWeekGrid.vue";
import { getWeekDays, timeSlots } from "~/utils/scheduleUtils.js";
import "~/assets/css/pages/schedule/ScheduleWeekView/ScheduleWeekView.css";

export default {
  name: "ScheduleWeekView",
  components: {
    ScheduleWeekHeader,
    ScheduleWeekGrid,
  },
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
    /**
     * @description 현재 날짜 기준 해당 주의 날짜 배열
     */
    weekDays() {
      return getWeekDays(this.currentDate);
    },
  },
};
</script>

