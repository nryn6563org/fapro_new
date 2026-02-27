<template>
  <div v-if="show" class="schedule-sync-modal">
    <div class="schedule-sync-modal__overlay" @click="$emit('close')"></div>
    <div class="schedule-sync-modal__box animate__animated animate__zoomIn">
      <!-- Sync Start Modal -->
      <div v-if="mode === 'sync'" class="p-6">
        <div class="schedule-sync-modal__header">
          <div class="flex items-center gap-3">
            <div class="schedule-sync-modal__icon-box schedule-sync-modal__icon-box--teal">
              <link-icon class="w-6 h-6 text-white" />
            </div>
            <h2 class="schedule-sync-modal__title">Google Calendar 동기화</h2>
          </div>
          <button @click="$emit('close')" class="schedule-sync-modal__close-btn">
            <x-icon class="w-5 h-5" />
          </button>
        </div>
        <div class="mb-6">
          <p class="text-sm text-slate-600 mb-4 font-medium">
            Google Calendar와 동기화하면 다음 기능을 사용할 수 있습니다:
          </p>
          <ul class="space-y-3">
            <li class="schedule-sync-modal__list-item" v-for="(item, i) in benefits" :key="i">
              <check-circle-icon class="w-4 h-4 text-[#14B8A6] flex-shrink-0" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="flex justify-end gap-3">
          <button class="schedule-sync-modal__btn-cancel" @click="$emit('close')">취소</button>
          <button class="schedule-sync-modal__btn-primary" @click="$emit('confirm-sync')">
            <link-icon class="w-4 h-4 mr-2" />
            동기화 시작
          </button>
        </div>
      </div>

      <!-- Unsync Modal -->
      <div v-if="mode === 'unsync'" class="p-6">
        <div class="schedule-sync-modal__header">
          <div class="flex items-center gap-3">
            <div class="schedule-sync-modal__icon-box schedule-sync-modal__icon-box--red">
              <unlink-icon class="w-6 h-6 text-white" />
            </div>
            <h2 class="schedule-sync-modal__title">동기화 해제</h2>
          </div>
          <button @click="$emit('close')" class="schedule-sync-modal__close-btn">
            <x-icon class="w-5 h-5" />
          </button>
        </div>
        <div class="mb-6">
          <p class="text-sm text-slate-600 mb-4">Google Calendar와의 동기화를 해제하시겠습니까?</p>
          <div class="schedule-sync-modal__alert">
            <p class="schedule-sync-modal__alert-text m-0">
              동기화를 해제하면 실시간 일정 업데이트 및 자동 동기화 기능이 비활성화됩니다.
            </p>
          </div>
        </div>
        <div class="flex justify-end gap-3">
          <button class="schedule-sync-modal__btn-cancel" @click="$emit('close')">취소</button>
          <button class="schedule-sync-modal__btn-danger" @click="$emit('confirm-unsync')">
            <unlink-icon class="w-4 h-4 mr-2" />
            동기화 해제
          </button>
        </div>
      </div>

      <!-- Syncing Loading -->
      <div v-if="mode === 'syncing'" class="p-10 text-center">
        <div class="schedule-sync-modal__loader-box">
          <loader-icon class="w-10 h-10 text-white animate-spin" />
        </div>
        <h2 class="schedule-sync-modal__title mb-2">Google Calendar 동기화 중</h2>
        <p class="text-sm text-slate-500">잠시만 기다려주세요. 일정을 동기화하고 있습니다...</p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 캘린더 동기화 관련 모달 (동기화 시작, 해제, 진행 중)
 */
import { LinkIcon, XIcon, CheckCircleIcon, LoaderIcon } from 'vue-feather-icons'
import '~/assets/css/pages/schedule/ScheduleSyncModal.css'

export default {
  name: 'ScheduleSyncModal',
  components: {
    LinkIcon,
    XIcon,
    CheckCircleIcon,
    LoaderIcon
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
