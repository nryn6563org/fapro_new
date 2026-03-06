<template>
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
</template>

<script>
/**
 * 기능: 주간 뷰의 상단 날짜 헤더 영역
 */
export default {
  name: "ScheduleWeekHeader",
  props: {
    weekDays: { type: Array, required: true },
    selectedDate: { type: Date, required: true },
  },
  methods: {
    formatWeekday(date) {
      return date.toLocaleDateString("ko-KR", { weekday: "short" });
    },
    isSelected(date) {
      const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const d2 = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate());
      return d1.getTime() === d2.getTime();
    },
    isToday(date) {
      const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const now = new Date();
      const d2 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return d1.getTime() === d2.getTime();
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

      if (isSelected) return `week-view__date-num--selected-${modifier}`;
      return `week-view__date-num--${modifier}`;
    },
  },
};
</script>
