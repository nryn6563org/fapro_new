<template>
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
      class="schedule-header__sync-badge--active"
      @click="$emit('unsync')"
    >
      <check-circle-icon class="w-4 h-4 schedule-header__sync-icon--success" />
      <span class="schedule-header__sync-label">캘린더 동기화 해제</span>
    </button>
    <button
      v-else
      class="schedule-header__sync-badge--default"
      :disabled="isSyncing"
      @click="$emit('sync')"
    >
      <loader-icon v-if="isSyncing" class="w-4 h-4 schedule-header__sync-icon--loading" />
      <refresh-cw-icon v-else class="w-4 h-4 schedule-header__sync-icon" />
      <span class="schedule-header__sync-label">
        {{ isSyncing ? "동기화 중" : "캘린더 동기화" }}
      </span>
    </button>

    <!-- Google Calendar Link -->
    <button class="schedule-header__ext-btn" @click="openGoogleCalendar">
      <external-link-icon class="w-4 h-4 schedule-header__ext-icon" />
      Google Calendar
    </button>

    <!-- View Select -->
    <div class="schedule-header__view-select">
      <button
        v-for="v in ['day', 'week', 'month']"
        :key="v"
        :class="getViewBtnClass(v)"
        @click="$emit('update:viewMode', v)"
      >
        {{ v === "day" ? "일" : v === "week" ? "주" : "월" }}
      </button>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 캘린더 헤더의 우측 액션 영역 (검색, 동기화, 뷰 전환)
 */
import {
  SearchIcon,
  CheckCircleIcon,
  RefreshCwIcon,
  LoaderIcon,
  ExternalLinkIcon,
} from "vue-feather-icons";

export default {
  name: "ScheduleHeaderActions",
  components: {
    SearchIcon,
    CheckCircleIcon,
    RefreshCwIcon,
    LoaderIcon,
    ExternalLinkIcon,
  },
  props: {
    viewMode: { type: String, required: true },
    isSynced: { type: Boolean, required: true },
    isSyncing: { type: Boolean, required: true },
    searchQuery: { type: String, required: true },
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
    getViewBtnClass(v) {
      if (this.viewMode === v) return "schedule-header__view-btn--active";
      return "schedule-header__view-btn--default";
    },
  },
};
</script>
