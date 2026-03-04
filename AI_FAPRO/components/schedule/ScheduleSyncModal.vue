<template>
  <div v-if="show" class="schedule-sync-modal">
    <div class="schedule-sync-modal__overlay" @click="$emit('close')"></div>
    <div class="schedule-sync-modal__box animate__animated animate__zoomIn">
      <!-- Sync Start Modal -->
      <div v-if="mode === 'sync'" class="schedule-sync-modal__body">
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
          <button class="schedule-sync-modal__btn-cancel" @click="$emit('close')">취소</button>
          <button class="schedule-sync-modal__btn-primary" @click="$emit('confirm-sync')">
            <link-icon class="schedule-sync-modal__btn-icon" />
            동기화 시작
          </button>
        </div>
      </div>

      <!-- Unsync Modal -->
      <div v-if="mode === 'unsync'" class="schedule-sync-modal__body">
        <div class="schedule-sync-modal__header">
          <div class="schedule-sync-modal__header-content">
            <div class="schedule-sync-modal__icon-box schedule-sync-modal__icon-box--red">
              <alert-triangle-icon class="schedule-sync-modal__main-icon text-red-600 dark:text-red-500" />
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
          <button class="schedule-sync-modal__btn-cancel" @click="$emit('close')">닫기</button>
          <button class="schedule-sync-modal__btn-danger" @click="$emit('confirm-unsync')">
            동기화 해제
          </button>
        </div>
      </div>

      <!-- Syncing Loading -->
      <div v-if="mode === 'syncing'" class="schedule-sync-modal__body text-center">
        <div class="schedule-sync-modal__loader-box">
          <loader-icon class="schedule-sync-modal__loader-icon" />
        </div>
        <h2 class="schedule-sync-modal__title schedule-sync-modal__title--mb-2">Google Calendar 동기화 중</h2>
        <p class="schedule-sync-modal__loading-text">잠시만 기다려주세요. 일정을 동기화하고 있습니다...</p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 캘린더 동기화 관련 모달 (동기화 시작, 해제, 진행 중)
 */
import { LinkIcon, XIcon, CheckCircleIcon, LoaderIcon, AlertTriangleIcon } from 'vue-feather-icons'
import '~/assets/css/pages/schedule/ScheduleSyncModal/ScheduleSyncModal.css'

export default {
  name: 'ScheduleSyncModal',
  components: {
    LinkIcon,
    XIcon,
    CheckCircleIcon,
    LoaderIcon,
    AlertTriangleIcon
  },
  props: {
    show: { type: Boolean, default: false },
    mode: { type: String, default: 'sync' } // sync, unsync, syncing
  },
  data() {
    return {
      benefits: [
        '실시간 일정 자동 동기화',
        '고객 미팅 및 이벤트 자동 업데이트',
        '캘린더 알림 및 리마인더 연동'
      ]
    }
  }
}
</script>
