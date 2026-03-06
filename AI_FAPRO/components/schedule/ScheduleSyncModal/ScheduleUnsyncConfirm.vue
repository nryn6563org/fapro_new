<template>
  <div class="schedule-sync-modal__body">
    <div class="schedule-sync-modal__header">
      <div class="schedule-sync-modal__header-content">
        <div class="schedule-sync-modal__icon-box schedule-sync-modal__icon-box--red">
          <alert-triangle-icon
            class="schedule-sync-modal__main-icon text-red-600 dark:text-red-500"
          />
        </div>
        <h2 class="schedule-sync-modal__title">동기화 해제</h2>
      </div>
      <button class="schedule-sync-modal__close-btn" @click="$emit('close')">
        <x-icon class="schedule-sync-modal__close-icon" />
      </button>
    </div>
    <div class="schedule-sync-modal__section">
      <p class="schedule-sync-modal__description-bold">동기화를 해제하시겠습니까?</p>
      <div class="schedule-sync-modal__alert">
        <p class="schedule-sync-modal__alert-text m-0">
          동기화를 해제하면 실시간 일정 업데이트 및 자동 동기화 기능이 비활성화됩니다.
        </p>
      </div>
    </div>
    <div class="schedule-sync-modal__footer">
      <button class="schedule-sync-modal__btn-cancel" @click="$emit('close')">
        닫기
      </button>
      <button class="schedule-sync-modal__btn-danger" @click="$emit('confirm')">
        동기화 해제
      </button>
    </div>
  </div>
</template>

<script>
/**
 * 기능: Google Calendar 동기화 해제 확인 영역
 */
import { AlertTriangleIcon, XIcon } from "vue-feather-icons";

export default {
  name: "ScheduleUnsyncConfirm",
  components: {
    AlertTriangleIcon,
    XIcon,
  },
};
</script>
