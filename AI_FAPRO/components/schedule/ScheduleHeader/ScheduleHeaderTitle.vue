<template>
  <div class="schedule-header__left">
    <div class="schedule-header__title-group">
      <div class="schedule-header__icon-box">
        <calendar-icon class="w-5 h-5 text-white" />
      </div>
      <h1 class="schedule-header__title">캘린더</h1>
    </div>

    <button class="schedule-header__today-btn" @click="$emit('today')">
      오늘
    </button>

    <div class="schedule-header__nav-group">
      <button class="schedule-header__nav-btn" @click="$emit('prev')">
        <chevron-left-icon class="w-4 h-4" />
      </button>
      <button class="schedule-header__nav-btn" @click="$emit('next')">
        <chevron-right-icon class="w-4 h-4" />
      </button>
    </div>

    <h2 class="schedule-header__date-text">{{ dateLabel }}</h2>
  </div>
</template>

<script>
/**
 * 기능: 캘린더 헤더의 좌측 타이틀 및 네비게이션 영역
 */
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "vue-feather-icons";

export default {
  name: "ScheduleHeaderTitle",
  components: {
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  props: {
    currentDate: { type: Date, required: true },
  },
  computed: {
    dateLabel() {
      return this.currentDate.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
      });
    },
  },
};
</script>
