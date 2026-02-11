<template>
  <transition name="modal-fade">
    <!-- 모달 오버레이 -->
    <div v-if="isOpen" class="c-summary-modal-overlay" @click.self="$emit('close')">
      <!-- 요약 스크립트 모달 컨테이너 -->
      <div class="c-summary-modal">
        <!-- 헤더 -->
        <header class="c-summary-modal__header">
          <h3 class="c-summary-modal__title">요약 스크립트</h3>
          <button class="c-summary-modal__close" @click="$emit('close')">
            <X :size="24" />
          </button>
        </header>

        <!-- 컨텐츠: 요약된 텍스트 박스 -->
        <div class="c-summary-modal__content">
          <div class="c-summary-modal__script-box">
            <p class="c-summary-modal__text">
              {{ scriptContent }}
            </p>
          </div>
        </div>

        <!-- 푸터: 스크립트 복사 액션 -->
        <footer class="c-summary-modal__footer">
          <button class="c-summary-modal__btn--copy" @click="copyScript">
            <Copy :size="20" />
            스크립트 복사
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { X, Copy } from 'lucide-vue'

export default {
  /**
   * 요약 스크립트 제공 모달
   * AI 리포트 내용을 바탕으로 작성된 구두 보고용 스크립트를 제공하며, 클립보드 복사 기능을 지원합니다.
   */
  name: 'SummaryScriptModal',
  components: { X, Copy },
  props: {
    isOpen: Boolean,
    stockName: String,
    content: String
  },
  computed: {
    /**
     * 표시할 스크립트 내용 (기본 예시 스크립트 포함)
     */
    scriptContent() {
      return this.content || `${this.stockName}에 대한 AI 분석 리포트 요약입니다. 최근 반도체 업향의 긍정적인 회복세와 함께 AI 서버향 수요가 폭발적으로 증가하며, 동사의 수익성이 크게 개선될 것으로 보입니다. 전문 기관들은 목표주가를 85,000원 선으로 상향 조정하며 투자의견 매수를 유지하고 있습니다. 상세 리스크 요인으로는 글로벌 거시 경제의 불확실성이 있으나, 기술적 우위를 바탕으로 한 견조한 시장 지위는 유효할 것으로 판단됩니다.`
    }
  },
  methods: {
    /**
     * 클립보드 복사 기능
     */
    copyScript() {
      navigator.clipboard.writeText(this.scriptContent).then(() => {
        alert('스크립트가 클립보드에 복사되었습니다.')
      })
    }
  }
}
</script>

<style scoped>
/* 외부 스타일 시트 임포트 */
@import '@/assets/css/page/stock/modal/summary-script-modal.css';
</style>
