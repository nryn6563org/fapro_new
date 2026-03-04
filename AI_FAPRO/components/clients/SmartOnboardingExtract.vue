<template>
  <div class="onboarding-modal__extract-area">
    <div class="flex items-center gap-2 mb-3">
      <div class="onboarding-modal__extract-icon-box">
        <clipboard-icon class="w-4 h-4 text-white" />
      </div>
      <div>
        <h3 class="onboarding-modal__extract-title">스마트 정보 추출</h3>
        <p class="onboarding-modal__extract-subtitle">
          스크린샷 또는 텍스트를 붙여넣으면 자동으로 고객정보를 추출합니다
        </p>
      </div>
    </div>

    <textarea
      v-model="pasteText"
      class="onboarding-modal__textarea"
      rows="4"
      placeholder="여기에 고객 정보를 붙여넣으세요 (Ctrl+V)&#10;&#10;예시:&#10;이름: 김철수&#10;연락처: 010-1234-5678"
      @paste="handlePaste"
    ></textarea>

    <div class="flex items-center justify-between mt-3">
      <div class="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
        <image-icon class="w-3.5 h-3.5 text-teal-500" />
        <span>이미지 또는 텍스트 붙여넣기 지원</span>
      </div>
      <div class="flex gap-2">
        <button
          v-if="pasteText"
          class="onboarding-modal__extract-btn-outline"
          @click="resetPaste"
        >
          초기화
        </button>
        <button
          class="onboarding-modal__extract-btn-primary"
          :disabled="!pasteText || isExtracting"
          @click="extractInfo"
        >
          <refresh-cw-icon v-if="isExtracting" class="w-3.5 h-3.5 mr-1 animate-spin" />
          <zap-icon v-else class="w-3.5 h-3.5 mr-1" />
          정보 추출
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 온보딩 시 스마트 정보 추출 영역
 */
import { ClipboardIcon, ImageIcon, RefreshCwIcon, ZapIcon } from 'vue-feather-icons'
import { extractClientInfoFromText } from '~/utils/clientUtils.js'
import '~/assets/css/pages/clients/SmartOnboardingExtract/SmartOnboardingExtract.css'

export default {
  name: 'SmartOnboardingExtract',
  components: {
    ClipboardIcon,
    ImageIcon,
    RefreshCwIcon,
    ZapIcon
  },
  data() {
    return {
      pasteText: '',
      isExtracting: false
    }
  },
  methods: {
    handlePaste(e) {
      this.isExtracting = true
      setTimeout(() => {
        const text = e.clipboardData.getData('text')
        if (text) {
          const extracted = extractClientInfoFromText(text)
          this.$emit('extracted', extracted)
        }
        this.isExtracting = false
      }, 500)
    },
    extractInfo() {
      this.isExtracting = true
      setTimeout(() => {
        const extracted = extractClientInfoFromText(this.pasteText)
        this.$emit('extracted', extracted)
        this.isExtracting = false
      }, 500)
    },
    resetPaste() {
      this.pasteText = ''
      this.$emit('reset')
    }
  }
}
</script>
