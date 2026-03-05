<template>
  <footer class="clients-page__footer">
    <p>
      총
      <span class="font-black text-slate-900 dark:text-white">{{ filteredCount }}</span>명의 고객
      <span
        v-if="isFiltered"
        class="opacity-50 ml-1"
      >
        (전체 {{ totalCount }}명 중)
      </span>
    </p>
    <p class="opacity-50">마지막 업데이트: 2026년 2월 13일 14:32</p>
  </footer>
</template>

<script>
/**
 * 기능: 고객 목록 페이지의 하단 푸터 컴포넌트
 * 현재 조회 중인 고객 수와 마지막 업데이트 시간을 표시합니다.
 */
export default {
  name: "ClientsPageFooter",
  props: {
    totalCount: {
      type: Number,
      required: true,
    },
    filteredCount: {
      type: Number,
      required: true,
    },
    isFiltered: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
