<template>
  <div class="info-modal__header">
    <div class="flex items-center gap-3">
      <div
        :class="[
          'info-modal__icon-box',
          isEditing ? 'info-modal__icon-box--edit' : 'info-modal__icon-box--view'
        ]"
      >
        <edit-icon v-if="isEditing" class="w-6 h-6 text-white" />
        <user-icon v-else class="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 class="info-modal__title">{{ clientName }}님의 정보</h2>
        <p class="info-modal__subtitle">
          {{ isEditing ? '고객 정보 수정' : '전체 고객 정보 상세보기' }}
        </p>
      </div>
    </div>
    <button @click="$emit('close')" class="info-modal__close">
      <x-icon class="w-6 h-6" />
    </button>
  </div>
</template>

<script>
/**
 * 기능: 고객 정보 모달 헤더
 */
import { UserIcon, EditIcon, XIcon } from 'vue-feather-icons'

export default {
  name: 'ClientInfoHeader',
  components: {
    UserIcon,
    EditIcon,
    XIcon
  },
  props: {
    clientName: {
      type: String,
      default: ''
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  }
}
</script>
