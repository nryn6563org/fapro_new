<template>
  <transition name="zoom">
    <!-- 모달 오버레이: 배경 클릭 시 닫기 기능 -->
    <div v-if="isOpen" class="c-report-modal-overlay" @click.self="$emit('close')">
      <!-- AI 상세 리포트 모달 컨테이너 -->
      <div class="c-report-modal c-report-modal--lg">
        <!-- 모달 헤더: 제목 및 종목 정보 -->
        <header class="c-report-modal__header">
          <div class="c-report-modal__title-group">
            <FileText :size="20" class="c-report-modal__icon" />
            <h3 class="c-report-modal__title">AI 상세 리포트</h3>
            <span class="c-report-modal__subtitle">{{ stockName }} ({{ stockCode }})</span>
          </div>
          <!-- 닫기 버튼 -->
          <button class="c-report-modal__close" @click="$emit('close')">
            <X :size="20" />
          </button>
        </header>

        <!-- 모달 컨텐츠 영역 -->
        <div class="c-report-modal__content">
            <div class="c-report-modal__body">
                <!-- 투자의견 요약 섹션 -->
                <div class="c-investment-opinion">
                    <div class="c-investment-opinion__item">
                        <span class="c-investment-opinion__label">투자의견</span>
                        <span class="c-investment-opinion__value c-investment-opinion__value--buy">BUY</span>
                    </div>
                    <div class="c-investment-opinion__item">
                        <span class="c-investment-opinion__label">목표주가</span>
                        <span class="c-investment-opinion__price">85,000원</span>
                    </div>
                    <!-- AI 신뢰도 프로그레스 -->
                    <div class="c-investment-confidence">
                        <span class="c-investment-opinion__label">AI 신뢰도</span>
                        <div class="c-confidence-bar">
                            <div class="c-confidence-bar__fill" style="width: 92%"></div>
                        </div>
                        <span class="c-investment-confidence__value">92%</span>
                    </div>
                </div>

                <!-- 투자 포인트 요약 -->
                <div class="c-report-section">
                    <h4 class="c-report-section-title">투자 포인트</h4>
                    <ul class="c-report-list">
                        <li>HBM3 메모리 반도체 시장 점유율 확대 예상</li>
                        <li>생성형 AI 수요 급증에 따른 비메모리 부문 실적 개선 가시화</li>
                        <li>하반기 글로벌 반도체 장비 매출 회복 전망</li>
                    </ul>
                </div>

                <!-- 상세 분석 텍스트 -->
                <div class="c-report-section">
                    <h4 class="c-report-section-title">상세 분석</h4>
                    <p class="c-report-text c-report-text--mb">
                        동사는 현재 글로벌 메모리 반도체 시장에서 선도적인 입지를 구축하고 있으며, 최근 HBM3 제품의 수율 안정화와 주요 고객사 공급 확대로 수익성이 크게 개선될 것으로 전망됩니다. 특히 AI 서버 시장의 폭발적인 성장으로 인해 고대역폭 메모리 수요가 공급을 초과하는 상황이 지속될 것으로 보이며, 이는 동사의 판가 인상과 이익률 개선으로 이어질 것입니다.
                    </p>
                    <p class="c-report-text">
                        또한, 파운드리 사업부문에서도 미세 공정 경쟁력을 바탕으로 신규 고객 확보에 박차를 가하고 있어, 메모리와 비메모리 사업의 균형 잡힌 성장이 기대됩니다.
                    </p>
                </div>

                <!-- 면책 조항 -->
                <div class="c-report-disclaimer">
                    본 리포트는 AI 알고리즘에 의해 자동 생성된 정보로, 투자의 참고 자료로만 활용하시기 바랍니다. 실제 투자에 대한 책임은 투자자 본인에게 있습니다.
                </div>
            </div>
        </div>

        <!-- 모달 푸터: 닫기 버튼 -->
        <footer class="c-report-modal__footer">
          <button class="c-btn c-btn--primary c-btn--full" @click="$emit('close')">닫기</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { X, FileText } from 'lucide-vue'

export default {
  /**
   * AI 상세 리포트 모달 컴포넌트
   * 특정 종목에 대한 AI의 상세 투자 의견 및 리포트 내용을 제공합니다.
   */
  name: 'StockReportModal',
  components: { X, FileText },
  props: {
    isOpen: Boolean,      // 모달 오픈 여부
    stockName: String,    // 종목명
    stockCode: String,    // 종목코드
    report: Object        // 리포트 데이터 객체
  }
}
</script>

<style scoped>
/* 외부 스타일 시트 임포트 */
@import '@/assets/css/page/stock/modal/stock-report-modal.css';

/* Lucide 아이콘 색상 유지용 (Tailwind @apply로 제어하기 어려운 경우) */
.c-report-modal__icon {
  color: #3B82F6;
}
</style>
