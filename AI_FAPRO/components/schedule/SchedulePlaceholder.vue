<template>
  <div class="schedule-placeholder">
    <div class="schedule-placeholder__content">
      <div class="schedule-placeholder__icon-wrapper">
        <calendar-icon class="schedule-placeholder__icon" />
      </div>
      <h2 class="schedule-placeholder__title">구글 캘린더 동기화 전 화면</h2>
      <p class="schedule-placeholder__description">
        구글 캘린더를 동기화하여 실시간으로 일정을 관리해 보세요.<br />
        동기화 시 고객 미팅 및 주요 이벤트를 자동으로 연동할 수 있습니다.
      </p>
      <button class="schedule-placeholder__sync-btn" @click="$emit('sync')">
        지금 동기화하기
      </button>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 캘린더 동기화 전 표시되는 플레이스홀더 화면
 */
import { CalendarIcon } from 'vue-feather-icons'
import '~/assets/css/pages/schedule/SchedulePlaceholder/SchedulePlaceholder.css'

export default {
  name: 'SchedulePlaceholder',
  components: {
    CalendarIcon
  }
}
</script>
