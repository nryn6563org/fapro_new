<template>
  <div class="schedule-sidebar__mini-cal">
    <div class="schedule-sidebar__mini-header">
      <h3 class="schedule-sidebar__section-title">{{ miniCalLabel }}</h3>
      <div class="schedule-sidebar__mini-nav-container">
        <button class="schedule-sidebar__mini-nav" @click="$emit('prev-month')">
          <chevron-left-icon class="w-4 h-4" />
        </button>
        <button class="schedule-sidebar__mini-nav" @click="$emit('next-month')">
          <chevron-right-icon class="w-4 h-4" />
        </button>
      </div>
    </div>

    <div class="schedule-sidebar__mini-days">
      <div
        v-for="(day, idx) in daysOfWeek"
        :key="day"
        :class="[
          'schedule-sidebar__mini-dot',
          {
            'schedule-sidebar__mini-dot--sunday': idx === 0,
            'schedule-sidebar__mini-dot--saturday': idx === 6,
          },
        ]"
      >
        {{ day }}
      </div>
    </div>

    <div class="schedule-sidebar__mini-grid">
      <div
        v-for="n in firstDay"
        :key="'empty-' + n"
        class="schedule-sidebar__empty-day"
      ></div>
      <button
        v-for="day in daysInMonth"
        :key="day"
        :class="['schedule-sidebar__day-btn', getDayClass(day)]"
        @click="selectDate(day)"
      >
        {{ day }}
        <div
          v-if="hasEvents(day) && !isSelected(day)"
          class="schedule-sidebar__has-event"
        ></div>
      </button>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 캘린더 사이드바의 미니 달력 컴포넌트
 */
import { ChevronLeftIcon, ChevronRightIcon } from "vue-feather-icons";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  isSameDay,
} from "~/utils/scheduleUtils.js";

export default {
  name: "ScheduleMiniCalendar",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  props: {
    currentDate: { type: Date, required: true },
    selectedDate: { type: Date, required: true },
    events: { type: Array, required: true },
  },
  data() {
    return {
      daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
    };
  },
  computed: {
    miniCalLabel() {
      return this.currentDate.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
      });
    },
    daysInMonth() {
      return getDaysInMonth(this.currentDate);
    },
    firstDay() {
      return getFirstDayOfMonth(this.currentDate);
    },
  },
  methods: {
    selectDate(day) {
      const date = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        day
      );
      this.$emit("update:selectedDate", date);
    },
    isSelected(day) {
      const date = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        day
      );
      return isSameDay(date, this.selectedDate);
    },
    isToday(day) {
      const date = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        day
      );
      return isSameDay(date, new Date());
    },
    hasEvents(day) {
      const date = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        day
      );
      return this.events.some((e) => isSameDay(e.date, date));
    },
    getDayClass(day) {
      if (this.isSelected(day)) return "schedule-sidebar__day-btn--selected";
      if (this.isToday(day)) return "schedule-sidebar__day-btn--today";
      return "schedule-sidebar__day-btn--default";
    },
  },
};
</script>
