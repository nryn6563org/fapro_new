<template>
  <div class="onboarding-modal">
    <div class="onboarding-modal__overlay" @click="$emit('close')"></div>
    <div class="onboarding-modal__container animate__animated animate__zoomIn">
      <!-- Header -->
      <div class="onboarding-modal__header">
        <div class="flex items-center gap-3">
          <div class="onboarding-modal__icon-box">
            <zap-icon class="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 class="onboarding-modal__title">스마트온보딩</h2>
            <p class="onboarding-modal__subtitle">신규 고객 정보를 입력하거나 추출하세요</p>
          </div>
        </div>
        <button class="onboarding-modal__close" @click="$emit('close')">
          <x-icon class="w-6 h-6" />
        </button>
      </div>

      <!-- Content -->
      <div class="onboarding-modal__content">
        <!-- Smart Extraction Area -->
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

        <!-- Manual Form -->
        <div class="onboarding-modal__form">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="onboarding-modal__form-field">
              <label class="onboarding-modal__form-label">고객명 <span class="text-red-500">*</span></label>
              <input
                v-model="localClient.name"
                class="onboarding-modal__input"
                placeholder="고객명을 입력하세요"
              />
            </div>
            <div class="onboarding-modal__form-field">
              <label class="onboarding-modal__form-label">연락처 <span class="text-red-500">*</span></label>
              <input
                v-model="localClient.phone"
                class="onboarding-modal__input"
                placeholder="010-0000-0000"
              />
            </div>
            <div class="onboarding-modal__form-field">
              <label class="onboarding-modal__form-label">이메일 <span class="text-red-500">*</span></label>
              <input v-model="localClient.email" class="onboarding-modal__input" type="email" />
            </div>
            <div class="onboarding-modal__form-field">
              <label class="onboarding-modal__form-label">연령</label>
              <input
                v-model.number="localClient.age"
                class="onboarding-modal__input"
                type="number"
              />
            </div>
            <div class="onboarding-modal__form-field">
              <label class="onboarding-modal__form-label">투자유형</label>
              <div class="flex gap-2">
                <button
                  v-for="type in types"
                  :key="type"
                  :class="[
                    'onboarding-modal__type-btn',
                    { 'onboarding-modal__type-btn--active': localClient.investmentType === type }
                  ]"
                  @click="localClient.investmentType = type"
                >
                  {{ type }}
                </button>
              </div>
            </div>
            <div class="onboarding-modal__form-field">
              <label class="onboarding-modal__form-label">총자산</label>
              <input
                v-model="localClient.totalAssets"
                class="onboarding-modal__input"
                placeholder="예: 10억"
              />
            </div>
            <div class="onboarding-modal__form-field col-span-2">
              <label class="onboarding-modal__form-label">보유종목</label>
              <input
                v-model="localClient.holdings"
                class="onboarding-modal__input"
                placeholder="쉼표로 구분"
              />
            </div>
            <div class="onboarding-modal__form-field col-span-2">
              <label class="onboarding-modal__form-label">특이사항</label>
              <textarea
                v-model="localClient.notes"
                class="onboarding-modal__input !h-auto"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- AI Hint -->
        <div class="onboarding-modal__ai-hint">
          <zap-icon class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div class="flex-1">
            <p class="font-black text-slate-900 dark:text-white text-sm mb-1">AI 투자 성향 분석</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              {{ investmentHint }}
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="onboarding-modal__footer">
        <button
          class="onboarding-modal__btn onboarding-modal__btn--outline"
          @click="$emit('close')"
        >
          취소
        </button>
        <button class="onboarding-modal__btn onboarding-modal__btn--primary" @click="handleSave">
          <user-plus-icon class="w-4 h-4 mr-2" /> 고객 등록
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 신규 고객 등록(스마트 온보딩) 모달
 */
import {
  ZapIcon,
  XIcon,
  ClipboardIcon,
  ImageIcon,
  RefreshCwIcon,
  UserPlusIcon
} from 'vue-feather-icons'
import { extractClientInfoFromText } from '~/utils/clientUtils.js'
import '~/assets/css/pages/clients/SmartOnboardingModal.css'

export default {
  name: 'SmartOnboardingModal',
  components: {
    ZapIcon,
    XIcon,
    ClipboardIcon,
    ImageIcon,
    RefreshCwIcon,
    UserPlusIcon
  },
  data() {
    return {
      pasteText: '',
      isExtracting: false,
      localClient: {
        name: '',
        phone: '',
        email: '',
        age: 0,
        investmentType: '중립형',
        totalAssets: '',
        holdings: '',
        notes: '',
        joinDate: new Date().toISOString().split('T')[0]
      },
      types: ['공격형', '중립형', '안정형']
    }
  },
  computed: {
    investmentHint() {
      const hints = {
        공격형: '성장주, AI 반도체, 바이오 등 고성장 테마를 추천합니다.',
        중립형: '대형우량주와 성장주를 균형있게 배분하는 것을 추천합니다.',
        안정형: '배당주, 대형우량주 등 안정적인 종목을 추천합니다.'
      }
      return hints[this.localClient.investmentType] || '투자 성향을 선택해 주세요.'
    }
  },
  methods: {
    handlePaste(e) {
      this.isExtracting = true
      // Actual extraction logic in Utils
      setTimeout(() => {
        const text = e.clipboardData.getData('text')
        if (text) {
          const extracted = extractClientInfoFromText(text)
          this.localClient = { ...this.localClient, ...extracted }
        }
        this.isExtracting = false
      }, 500)
    },
    extractInfo() {
      this.isExtracting = true
      setTimeout(() => {
        const extracted = extractClientInfoFromText(this.pasteText)
        this.localClient = { ...this.localClient, ...extracted }
        this.isExtracting = false
      }, 500)
    },
    resetPaste() {
      this.pasteText = ''
      this.localClient = {
        name: '',
        phone: '',
        email: '',
        age: 0,
        investmentType: '중립형',
        totalAssets: '',
        holdings: '',
        notes: '',
        joinDate: new Date().toISOString().split('T')[0]
      }
    },
    handleSave() {
      if (!this.localClient.name || !this.localClient.phone) {
        alert('필수 입력 항목을 확인해 주세요.')
        return
      }
      this.$emit('save', this.localClient)
    }
  }
}
</script>
