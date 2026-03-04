<template>
  <div>
    <!-- AI Analysis Button -->
    <div v-if="!calculated" class="flex justify-center mt-8">
      <button class="holdings-modal__calc-btn" @click="$emit('calculate')">
        <activity-icon class="w-6 h-6 mr-2" />
        AI 수익률 계산 및 분석하기
      </button>
    </div>

    <!-- AI Analysis Result -->
    <transition name="fade-in">
      <div v-if="calculated" class="holdings-modal__analysis animate__animated animate__fadeIn">
        <div class="holdings-modal__ai-tag">
          <zap-icon class="w-5 h-5 text-amber-500" />
          <div class="flex-1">
            <div class="flex items-center justify-between mb-2">
              <span class="font-black text-slate-900 dark:text-white">AI 분석 완료</span>
              <span class="text-[10px] text-pink-500 font-bold">{{ analysisTime }} 기준</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              현재 시세를 기준으로 분석한 결과,
              <span
                :class="totalReturn >= 0 ? 'text-red-500' : 'text-blue-500'"
                class="font-bold"
              >
                {{ totalReturn.toFixed(2) }}% </span
              >의 손익을 기록 중입니다.
              {{ aiComment }}
            </p>

            <!-- Suggestions -->
            <div class="holdings-modal__suggestions">
              <div class="flex items-center gap-2 mb-3">
                <zap-icon class="w-4 h-4 text-teal-500" />
                <span class="text-sm font-black dark:text-white">AI 제안 종목</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="stock in suggestedStocks"
                  :key="stock"
                  class="holdings-modal__suggest-tag"
                >
                  {{ stock }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/**
 * 기능: AI 수익률 계산 버튼 및 분석 결과
 */
import { ZapIcon, ActivityIcon } from 'vue-feather-icons'
import '~/assets/css/pages/clients/ClientHoldingsAnalysis/ClientHoldingsAnalysis.css'

export default {
  name: 'ClientHoldingsAnalysis',
  components: {
    ZapIcon,
    ActivityIcon
  },
  props: {
    calculated: {
      type: Boolean,
      default: false
    },
    analysisTime: {
      type: String,
      default: ''
    },
    totalReturn: {
      type: Number,
      required: true
    },
    aiComment: {
      type: String,
      default: ''
    },
    suggestedStocks: {
      type: Array,
      default: () => []
    }
  }
}
</script>
