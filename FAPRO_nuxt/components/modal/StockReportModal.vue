<template>
  <transition name="modal-fade">
    <!-- 모달 오버레이 -->
    <div v-if="isOpen" class="c-report-modal-overlay" @click.self="$emit('close')">
      <!-- AI 상세 리포트 모달 (Figma 스타일 반영) -->
      <div class="c-report-modal c-report-modal--lg">
        <!-- 모달 헤더: 보라색 배경, 종목명 및 코드 -->
        <header class="c-report-modal__header">
          <div class="c-report-modal__title-group">
            <h3 class="c-report-modal__title">{{ stockName }} AI 리포트</h3>
            <span class="c-report-modal__code">종목코드: {{ stockCode }}</span>
          </div>
          <button class="c-report-modal__close" @click="$emit('close')">
            <X :size="24" />
          </button>
        </header>

        <!-- 모달 컨텐츠 영역 -->
        <div class="c-report-modal__content">
            <div class="c-report-modal__body">
                <!-- 1. 요약 -->
                <section class="c-report-section">
                    <h4 class="c-report-section__title">요약</h4>
                    <div class="c-report-section__content">
                        {{ reportData.summary }}
                    </div>
                </section>

                <!-- 2. 시장 동향 -->
                <section class="c-report-section">
                    <h4 class="c-report-section__title">시장 동향</h4>
                    <div class="c-report-section__content">
                        {{ reportData.marketTrends }}
                    </div>
                </section>

                <!-- 3. 재무 분석 -->
                <section class="c-report-section">
                    <h4 class="c-report-section__title">재무 분석</h4>
                    <div class="c-report-section__content">
                        {{ reportData.financialAnalysis }}
                    </div>
                </section>

                <!-- 4. 투자 의견 -->
                <section class="c-report-section">
                    <h4 class="c-report-section__title">투자 의견</h4>
                    <div class="c-report-section__content">
                        {{ reportData.investmentOpinion }}
                    </div>
                </section>

                <!-- 5. 리스크 요인 -->
                <section class="c-report-section">
                    <h4 class="c-report-section__title">리스크 요인</h4>
                    <div class="c-report-section__content">
                        {{ reportData.riskFactors }}
                    </div>
                </section>

                <!-- 면책 조항 -->
                <p class="c-report-disclaimer">
                    본 리포트는 AI 알고리즘에 의해 자동 생성된 정보로, 투자의 참고 자료로만 활용하시기 바랍니다. 실제 투자에 대한 책임은 투자자 본인에게 있습니다.
                </p>
            </div>
        </div>

        <!-- 모달 푸터: 피그마 액션 버튼 구성 -->
        <footer class="c-report-modal__footer">
          <button class="c-report-modal__btn c-report-modal__btn--purple" @click="$emit('show-summary')">
            <FileText :size="16" />
            요약 보기
          </button>
          <button class="c-report-modal__btn c-report-modal__btn--purple">
            <Volume2 :size="16" />
            듣기
          </button>
          <button class="c-report-modal__btn c-report-modal__btn--gray" @click="$emit('close')">
            닫기
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { X, FileText, Volume2 } from 'lucide-vue'

export default {
  /**
   * AI 상세 리포트 모달 컴포넌트 (Figma Alignment)
   * 보라색 테마와 상세 분석 섹션(요약, 동향, 재무, 의견, 리스크)을 포함합니다.
   */
  name: 'StockReportModal',
  components: { X, FileText, Volume2 },
  props: {
    isOpen: Boolean,
    stockName: String,
    stockCode: String,
    // 리스트에서 전달받은 리포트 데이터
    report: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    /**
     * 리포트 데이터가 없을 경우 표시할 기본값 정의
     */
    reportData() {
      const defaultData = {
        summary: '반도체 업황 회복과 AI 수요 증가로 인해 향후 실적 개선이 뚜렷할 것으로 전망됩니다.',
        marketTrends: '글로벌 AI 칩 수요 폭발 및 HBM3 시장 선점으로 인한 우호적인 시장 환경이 조성되고 있습니다.',
        financialAnalysis: '1분기 영업이익은 전년 동기 대비 약 150% 증가한 6조 원대를 기록할 것으로 예상되며, 고부가가치 제품 비중 확대로 이익률이 개선될 것입니다.',
        investmentOpinion: '투자의견 BUY 유지 및 목표주가 85,000원으로 상향 조정합니다.',
        riskFactors: '글로벌 경기 침체 우려 및 규제 이슈가 잠재적 리스크로 작용할 수 있습니다.'
      }
      return { ...defaultData, ...this.report }
    }
  }
}
</script>

<style scoped>
/* 외부 스타일 시트 임포트 */
@import '@/assets/css/page/stock/modal/stock-report-modal.css';
</style>
