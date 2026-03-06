<template>
  <aside class="schedule-sidebar">
    <!-- Create Button -->
    <div class="schedule-sidebar__action">
      <button class="schedule-sidebar__create-btn">
        <plus-icon class="w-4 h-4 mr-2" />
        일정 업데이트
      </button>
    </div>

    <!-- Mini Calendar -->
    <schedule-mini-calendar
      :current-date="currentDate"
      :selected-date="selectedDate"
      :events="events"
      @prev-month="$emit('prev-month')"
      @next-month="$emit('next-month')"
      @update:selectedDate="$emit('update:selectedDate', $event)"
    />

    <!-- My Calendars (Filters) -->
    <schedule-calendar-filters
      :calendars="calendars"
      @toggle-calendar="$emit('toggle-calendar', $event)"
    />
  </aside>
</template>

<script>
/**
 * 기능: 캘린더 사이드바 (Modularized)
 */
import { PlusIcon } from "vue-feather-icons";
import ScheduleMiniCalendar from "./ScheduleSidebar/ScheduleMiniCalendar.vue";
import ScheduleCalendarFilters from "./ScheduleSidebar/ScheduleCalendarFilters.vue";
import "~/assets/css/pages/schedule/ScheduleSidebar/ScheduleSidebar.css";

export default {
  name: "ScheduleSidebar",
  components: {
    PlusIcon,
    ScheduleMiniCalendar,
    ScheduleCalendarFilters,
  },
  props: {
    // 캘린더 현재 표시 날짜
    currentDate: { type: Date, required: true },
    // 선택된 날짜
    selectedDate: { type: Date, required: true },
    // 캘린더 목록 (필터용)
    calendars: { type: Array, required: true },
    // 전체 이벤트 목록
    events: { type: Array, required: true },
  },
};
</script>

