<template>
  <div class="schedule-page__main">
    <template v-if="isSynced">
      <schedule-day-view
        v-if="viewMode === 'day'"
        :selected-date="selectedDate"
        :events="events"
      />
      <schedule-week-view
        v-else-if="viewMode === 'week'"
        :current-date="currentDate"
        :selected-date="selectedDate"
        :events="events"
        @select-date="$emit('select-date', $event)"
      />
      <schedule-month-view
        v-else-if="viewMode === 'month'"
        :current-date="currentDate"
        :events="events"
        @select-date="$emit('select-date', $event)"
        @change-view="$emit('change-view', $event)"
      />
    </template>
    <schedule-placeholder v-else @sync="$emit('sync')" />
  </div>
</template>

<script>
/**
 * 기능: 캘린더 페이지의 메인 콘텐츠 영역 (모드 전환)
 */
import ScheduleDayView from "~/components/schedule/ScheduleDayView.vue";
import ScheduleWeekView from "~/components/schedule/ScheduleWeekView.vue";
import ScheduleMonthView from "~/components/schedule/ScheduleMonthView.vue";
import SchedulePlaceholder from "~/components/schedule/SchedulePlaceholder.vue";

export default {
  name: "SchedulePageMain",
  components: {
    ScheduleDayView,
    ScheduleWeekView,
    ScheduleMonthView,
    SchedulePlaceholder,
  },
  props: {
    isSynced: { type: Boolean, required: true },
    viewMode: { type: String, required: true },
    selectedDate: { type: Date, required: true },
    currentDate: { type: Date, required: true },
    events: { type: Array, required: true },
  },
};
</script>
