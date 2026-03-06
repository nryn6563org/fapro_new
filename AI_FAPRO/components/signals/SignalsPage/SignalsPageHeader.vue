<template>
  <div class="signals-page__header">
    <div class="signals-page__title-box">
      <h1 class="signals-page__title">AI 매매신호 포착</h1>
      <p class="signals-page__subtitle">
        오늘 발생한 AI매매신호 입니다. 신호 발생 사유와 매매내역을 확인해 보세요
      </p>
    </div>
    <div class="signals-page__action-box">
      <div class="signals-page__time-info">
        <p class="signals-page__time-text">{{ formattedTime }}</p>
        <p class="signals-page__time-label">최종 업데이트</p>
      </div>
      <button class="signals-page__refresh-btn" @click="$emit('refresh')">
        <refresh-cw-icon size="16" class="signals-page__refresh-icon" />
        <span class="signals-page__refresh-text">새로고침</span>
      </button>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI매매신호 페이지 헤더
 * 타이틀, 설명 및 실시간 업데이트 정보와 새로고침 버튼을 포함합니다.
 */
import { RefreshCwIcon } from "vue-feather-icons";

export default {
  name: "SignalsPageHeader",
  components: {
    RefreshCwIcon,
  },
  props: {
    // 포맷된 현재 시간 문자열
    formattedTime: {
      type: String,
      required: true,
    },
  },
};
</script>
