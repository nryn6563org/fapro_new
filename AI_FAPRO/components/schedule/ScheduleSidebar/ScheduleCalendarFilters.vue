<template>
  <div class="schedule-sidebar__filters">
    <h3 class="schedule-sidebar__section-title">내 캘린더</h3>
    <div class="schedule-sidebar__filter-list">
      <div
        v-for="cal in calendars"
        :key="cal.id"
        class="schedule-sidebar__filter-item"
        @click="$emit('toggle-calendar', cal.id)"
      >
        <div
          class="schedule-sidebar__filter-dot"
          :class="getFilterDotClass(cal)"
        ></div>
        <span class="schedule-sidebar__filter-label">{{ cal.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 캘린더 사이드바의 필터 목록 컴포넌트
 */
export default {
  name: "ScheduleCalendarFilters",
  props: {
    calendars: { type: Array, required: true },
  },
  methods: {
    getFilterDotClass(cal) {
      if (!cal.checked) return "schedule-sidebar__filter-dot--inactive";
      const colorName = cal.color.replace("bg-", "");
      return `schedule-sidebar__filter-dot--active-${colorName}`;
    },
  },
};
</script>
