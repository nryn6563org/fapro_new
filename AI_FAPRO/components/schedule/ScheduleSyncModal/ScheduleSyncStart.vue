<template>
  <div class="schedule-sync-modal__body">
    <div class="schedule-sync-modal__header">
      <div class="schedule-sync-modal__header-content">
        <div class="schedule-sync-modal__icon-box schedule-sync-modal__icon-box--teal">
          <link-icon class="schedule-sync-modal__main-icon" />
        </div>
        <h2 class="schedule-sync-modal__title">Google Calendar 동기화</h2>
      </div>
      <button class="schedule-sync-modal__close-btn" @click="$emit('close')">
        <x-icon class="schedule-sync-modal__close-icon" />
      </button>
    </div>
    <div class="schedule-sync-modal__section">
      <p class="schedule-sync-modal__description">
        Google Calendar와 동기화하면 다음 기능을 사용할 수 있습니다:
      </p>
      <ul class="schedule-sync-modal__list">
        <li v-for="(item, i) in benefits" :key="i" class="schedule-sync-modal__list-item">
          <check-circle-icon class="schedule-sync-modal__check-icon" />
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
    <div class="schedule-sync-modal__footer">
      <button class="schedule-sync-modal__btn-cancel" @click="$emit('close')">
        취소
      </button>
      <button class="schedule-sync-modal__btn-primary" @click="$emit('confirm')">
        <link-icon class="schedule-sync-modal__btn-icon" />
        동기화 시작
      </button>
    </div>
  </div>
</template>

<script>
/**
 * 기능: Google Calendar 동기화 시작 안내 영역
 */
import { LinkIcon, XIcon, CheckCircleIcon } from "vue-feather-icons";

export default {
  name: "ScheduleSyncStart",
  components: {
    LinkIcon,
    XIcon,
    CheckCircleIcon,
  },
  data() {
    return {
      benefits: [
        "실시간 일정 자동 동기화",
        "고객 미팅 및 이벤트 자동 업데이트",
        "캘린더 알림 및 리마인더 연동",
      ],
    };
  },
};
</script>
