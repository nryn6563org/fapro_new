<template>
  <div v-if="show" class="schedule-sync-modal">
    <div class="schedule-sync-modal__overlay" @click="$emit('close')"></div>
    <div class="schedule-sync-modal__box animate__animated animate__fadeIn animate__faster">
      <!-- 동기화 시작 모달 -->
      <ScheduleSyncStart
        v-if="mode === 'sync'"
        @close="$emit('close')"
        @confirm="$emit('confirm-sync')"
      />

      <!-- 동기화 해제 모달 -->
      <ScheduleUnsyncConfirm
        v-if="mode === 'unsync'"
        @close="$emit('close')"
        @confirm="$emit('confirm-unsync')"
      />

      <!-- 동기화 진행 중 모달 -->
      <ScheduleSyncingLoader v-if="mode === 'syncing'" />
    </div>
  </div>
</template>

<script>
/**
 * 기능: 캘린더 동기화 관련 모달 (Modularized)
 */
import ScheduleSyncStart from "./ScheduleSyncModal/ScheduleSyncStart.vue";
import ScheduleUnsyncConfirm from "./ScheduleSyncModal/ScheduleUnsyncConfirm.vue";
import ScheduleSyncingLoader from "./ScheduleSyncModal/ScheduleSyncingLoader.vue";
import "~/assets/css/pages/schedule/ScheduleSyncModal/ScheduleSyncModal.css";

export default {
  name: "ScheduleSyncModal",
  components: {
    ScheduleSyncStart,
    ScheduleUnsyncConfirm,
    ScheduleSyncingLoader,
  },
  props: {
    // 모달 표시 여부
    show: { type: Boolean, default: false },
    // 모달 모드 (sync, unsync, syncing)
    mode: { type: String, default: "sync" },
  },
  watch: {
    /**
     * @description 모달 표시 상태에 따라 body 스크롤 고정/해제
     */
    show(val) {
      if (val) document.body.classList.add("modal-open");
      else document.body.classList.remove("modal-open");
    },
  },
  mounted() {
    if (this.show) document.body.classList.add("modal-open");
  },
  beforeDestroy() {
    document.body.classList.remove("modal-open");
  },
};
</script>

