<template>
  <header class="issues-header">
    <div class="issues-header-content">
      <div class="issues-header__title-box">
        <h1 class="issues-header__title">AI 이슈 포착</h1>
        <p class="issues-header__subtitle">
          오늘 AI가 추천하는 타겟 고객과 종목을 빠르게 제안해 보세요.
        </p>
      </div>
      <div class="issues-header__action-box">
        <p class="issues-header__time-text">{{ formattedTime }}</p>
        <button class="issues-header__btn-refresh" @click="$emit('refresh')">
          <refresh-cw-icon class="issues-header__refresh-icon" />
          <span class="issues-header__refresh-text">새로고침</span>
        </button>
      </div>
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
