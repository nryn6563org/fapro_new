<template>
  <header class="schedule-header">
    <div class="schedule-header__left">
      <div class="schedule-header__title-group">
        <div class="schedule-header__icon-box">
          <calendar-icon class="schedule-header__title-icon" />
        </div>
        <h1 class="schedule-header__title">캘린더</h1>
      </div>

      <button class="schedule-header__today-btn" @click="$emit('today')">
        오늘
      </button>

      <div class="schedule-header__nav-group">
        <button class="schedule-header__nav-btn" @click="$emit('prev')">
          <chevron-left-icon class="schedule-header__nav-icon" />
        </button>
        <button class="schedule-header__nav-btn" @click="$emit('next')">
          <chevron-right-icon class="schedule-header__nav-icon" />
        </button>
      </div>

      <h2 class="schedule-header__date-text">{{ dateLabel }}</h2>
    </div>

    <div class="schedule-header__right">
      <!-- Search -->
      <div class="schedule-header__search-container">
        <search-icon class="schedule-header__search-icon" />
        <input
          ref="searchInput"
          type="text"
          placeholder="검색"
          class="schedule-header__search-input"
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
        />
      </div>

      <!-- Sync Status -->
      <button
        v-if="isSynced"
        class="schedule-header__sync-badge schedule-header__sync-badge--active"
        @click="$emit('unsync')"
      >
        <check-circle-icon
          class="schedule-header__sync-icon--success"
        />
        <span class="schedule-header__sync-label">캘린더 동기화 해제</span>
      </button>
      <button
        v-else
        class="schedule-header__sync-badge"
        :disabled="isSyncing"
        @click="$emit('sync')"
      >
        <loader-icon
          v-if="isSyncing"
          class="schedule-header__sync-icon--loading"
        />
        <refresh-cw-icon v-else class="schedule-header__sync-icon" />
        <span class="schedule-header__sync-label">{{
          isSyncing ? "동기화 중" : "캘린더 동기화"
        }}</span>
      </button>

      <!-- Google Calendar Link -->
      <button class="schedule-header__ext-btn" @click="openGoogleCalendar">
        <external-link-icon class="schedule-header__ext-icon" />
        Google Calendar
      </button>

      <!-- View Select -->
      <div class="schedule-header__view-select">
        <button
          v-for="v in ['day', 'week', 'month']"
          :key="v"
          :class="[
            'schedule-header__view-btn',
            { 'schedule-header__view-btn--active': viewMode === v },
          ]"
          @click="$emit('update:viewMode', v)"
        >
          {{ v === "day" ? "일" : v === "week" ? "주" : "월" }}
        </button>
      </div>
    </div>
  </header>
</template>

<script>
/**
 * 기능: 캘린더 상단 헤더 (네비게이션 및 동기화)
 */
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  CheckCircleIcon,
  RefreshCwIcon,
  LoaderIcon,
  ExternalLinkIcon,
} from "vue-feather-icons";
import "~/assets/css/pages/schedule/ScheduleHeader/ScheduleHeader.css";

export default {
  name: "ScheduleHeader",
  components: {
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    SearchIcon,
    CheckCircleIcon,
    RefreshCwIcon,
    LoaderIcon,
    ExternalLinkIcon,
  },
  props: {
    currentDate: { type: Date, required: true },
    viewMode: { type: String, default: "week" },
    isSynced: { type: Boolean, default: true },
    isSyncing: { type: Boolean, default: false },
    searchQuery: { type: String, default: "" },
  },
  computed: {
    dateLabel() {
      return this.currentDate.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
      });
    },
  },
  mounted() {
    this.$autocomplete(this.$refs.searchInput, {
      fetch: (text, update) => {
        const items = ["미팅", "리서치", "팀 회의", "세미나"];
        const suggestions = items
          .filter((s) => s.toLowerCase().includes(text.toLowerCase()))
          .map((s) => ({ label: s, value: s }));
        update(suggestions);
      },
      onSelect: (item) => {
        this.$emit("update:searchQuery", item.value);
      },
    });
  },
  methods: {
    openGoogleCalendar() {
      window.open("https://calendar.google.com", "_blank");
    },
  },
};
</script>
