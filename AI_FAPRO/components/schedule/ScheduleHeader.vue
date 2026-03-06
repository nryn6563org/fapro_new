<template>
  <header class="schedule-header">
    <!-- 좌측 타이틀 및 네비게이션 (Modularized) -->
    <ScheduleHeaderTitle
      :current-date="currentDate"
      @today="$emit('today')"
      @prev="$emit('prev')"
      @next="$emit('next')"
    />

    <!-- 우측 액션 영역 (Modularized) -->
    <ScheduleHeaderActions
      :view-mode="viewMode"
      :is-synced="isSynced"
      :is-syncing="isSyncing"
      :search-query="searchQuery"
      @update:searchQuery="$emit('update:searchQuery', $event)"
      @update:viewMode="$emit('update:viewMode', $event)"
      @sync="$emit('sync')"
      @unsync="$emit('unsync')"
    />
  </header>
</template>

<script>
/**
 * 기능: 캘린더 상단 헤더 (Modularized)
 */
import ScheduleHeaderTitle from "./ScheduleHeader/ScheduleHeaderTitle.vue";
import ScheduleHeaderActions from "./ScheduleHeader/ScheduleHeaderActions.vue";
import "~/assets/css/pages/schedule/ScheduleHeader/ScheduleHeader.css";

export default {
  name: "ScheduleHeader",
  components: {
    ScheduleHeaderTitle,
    ScheduleHeaderActions,
  },
  props: {
    currentDate: { type: Date, required: true },
    viewMode: { type: String, default: "week" },
    isSynced: { type: Boolean, default: true },
    isSyncing: { type: Boolean, default: false },
    searchQuery: { type: String, default: "" },
  },
};
</script>

