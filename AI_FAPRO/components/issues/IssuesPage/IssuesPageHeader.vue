<template>
  <header class="issues-header">
    <div class="issues-header__title-box">
      <h1 class="issues-header__title">AI이슈포착</h1>
      <p class="issues-header__subtitle">
        중소형주 및 대형주 이슈를 포착 합니다
      </p>
    </div>
    <div class="issues-header__action-box">
      <div class="issues-header__time-info">
        <p class="issues-header__time-text">{{ formattedTime }}</p>
      </div>
      <button class="issues-header__btn-refresh" @click="$emit('refresh')">
        <refresh-cw-icon size="16" class="issues-header__refresh-icon" />
        <span class="issues-header__refresh-text">새로고침</span>
      </button>
    </div>
  </header>
</template>

<script>
/**
 * 기능: AI 이슈 포착 페이지 - 헤더 영역
 */
import { RefreshCwIcon } from "vue-feather-icons";

export default {
  name: "IssuesPageHeader",
  components: {
    RefreshCwIcon,
  },
  props: {
    formattedTime: { type: String, required: true },
  },
};
</script>
