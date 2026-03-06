<template>
  <div class="schedule-sync-modal__body text-center">
    <div class="schedule-sync-modal__loader-box">
      <loader-icon class="schedule-sync-modal__loader-icon" />
    </div>
    <h2 class="schedule-sync-modal__title schedule-sync-modal__title--mb-2">
      Google Calendar 동기화 중
    </h2>
    <p class="schedule-sync-modal__loading-text">
      잠시만 기다려주세요. 일정을 동기화하고 있습니다...
    </p>
  </div>
</template>

<script>
/**
 * 기능: 동기화 진행 중 인디케이터 영역
 */
import { LoaderIcon } from "vue-feather-icons";

export default {
  name: "ScheduleSyncingLoader",
  components: {
    LoaderIcon,
  },
};
</script>
