<template>
  <div v-if="client" class="info-modal">
    <div class="info-modal__overlay" @click="$emit('close')"></div>
    <div class="info-modal__container animate__animated animate__fadeInUp">
      <!-- Header -->
      <ClientInfoHeader
        :client-name="client.name"
        :is-editing="isEditing"
        @close="$emit('close')"
      />

      <!-- Content Grid -->
      <ClientInfoContent
        :client.sync="localClient"
        :is-editing="isEditing"
      />

      <!-- Footer -->
      <div class="info-modal__footer">
        <div>
          <button
            v-if="!isEditing && client.holdingsDetail?.length"
            class="info-modal__btn info-modal__btn--outline"
            @click="$emit('view-holdings', client)"
          >
            <eye-icon class="w-4 h-4" /> 보유종목 상세보기
          </button>
        </div>
        <div class="flex gap-3">
          <template v-if="isEditing">
            <button class="info-modal__btn info-modal__btn--outline" @click="$emit('cancel')">
              취소
            </button>
            <button
              class="info-modal__btn info-modal__btn--primary"
              @click="$emit('save', localClient)"
            >
              <save-icon class="w-4 h-4" /> 저장
            </button>
          </template>
          <template v-else>
            <button class="info-modal__btn info-modal__btn--outline" @click="$emit('close')">
              닫기
            </button>
            <button class="info-modal__btn info-modal__btn--amber" @click="$emit('edit')">
              <edit-icon class="w-4 h-4" /> 수정
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 기본 정보 상세보기 및 수정 모달
 */
import {
  EditIcon,
  EyeIcon,
  SaveIcon
} from 'vue-feather-icons'
import ClientInfoHeader from '~/components/clients/ClientInfoHeader.vue'
import ClientInfoContent from '~/components/clients/ClientInfoContent.vue'
import '~/assets/css/pages/clients/ClientInfoModal/ClientInfoModal.css'

export default {
  name: 'ClientInfoModal',
  components: {
    ClientInfoHeader,
    ClientInfoContent,
    EditIcon,
    EyeIcon,
    SaveIcon
  },
  props: {
    client: { type: Object, default: null },
    isEditing: { type: Boolean, default: false }
  },
  data() {
    return {
      localClient: this.client ? JSON.parse(JSON.stringify(this.client)) : null,
      types: ['공격형', '중립형', '안정형']
    }
  },
  watch: {
    client: {
      handler(newVal) {
        if (newVal) this.localClient = JSON.parse(JSON.stringify(newVal))
      },
      deep: true
    }
  }
}
</script>
