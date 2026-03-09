<template>
  <modal-vanilla
    v-if="isOpen"
    :is-open="isOpen"
    custom-dialog-class="ai-analysis-report-modal__dialog"
    @close="$emit('close')"
  >
    <!-- Custom Header -->
    <template #header>
      <div class="ai-analysis-report-modal__header">
        <h2 class="ai-analysis-report-modal__title">종합 의견 및 대응 전략 상세</h2>
        <button 
          type="button" 
          class="ai-analysis-report-modal__close-btn" 
          aria-label="모달 닫기"
          @click="$emit('close')"
        >
          <x-icon size="24" />
        </button>
      </div>
    </template>

    <!-- Modal Body -->
    <div class="ai-analysis-report-modal__content">
      <!-- 1. 기술적 분석 -->
      <section class="ai-analysis-report-modal__section">
        <h3 class="ai-analysis-report-modal__section-title ai-analysis-report-modal__section-title--tech">
          📊 1. 기술적 분석 (차트 해석)
        </h3>
        
        <div class="ai-analysis-report-modal__sub-container">
          <div class="ai-analysis-report-modal__sub-title ai-analysis-report-modal__sub-title--positive">
            ✅ 긍정적인 부분: 추세 전환의 시도
          </div>
          <ul class="ai-analysis-report-modal__list">
            <li class="ai-analysis-report-modal__list-item">
              <div class="ai-analysis-report-modal__item-title">장기 하락 추세 탈피</div>
              <p class="ai-analysis-report-modal__item-desc">주봉을 보면 2021년부터 이어진 긴 하락 흐름을 최근에야 멈추고 횡보하다가 고개를 들기 시작했습니다.</p>
            </li>
            <li class="ai-analysis-report-modal__list-item">
              <div class="ai-analysis-report-modal__item-title">이동평균선 정배열 초기</div>
              <p class="ai-analysis-report-modal__item-desc">일봉 차트에서 단기·중기 이동평균선들이 모이면서 정배열(단기 이평선이 위로 올라가는 형태)을 만들고 있습니다. 이는 에너지가 응축되었다가 위로 발산하려는 신호로 보기도 합니다.</p>
            </li>
            <li class="ai-analysis-report-modal__list-item">
              <div class="ai-analysis-report-modal__item-title">대량 거래량 동반</div>
              <p class="ai-analysis-report-modal__item-desc">최근 바닥권에서 이전에 없던 역대급 거래량이 터졌습니다. 보통 바닥권에서의 대량 거래는 '주인이 바뀌었거나' 혹은 '상승을 위한 매집'으로 해석하는 경우가 많습니다.</p>
            </li>
          </ul>
        </div>

        <div class="ai-analysis-report-modal__sub-container mt-6">
          <div class="ai-analysis-report-modal__sub-title ai-analysis-report-modal__sub-title--caution">
            ⚠️ 우려되는 부분: 변동성과 매물대
          </div>
          <ul class="ai-analysis-report-modal__list">
            <li class="ai-analysis-report-modal__list-item">
              <div class="ai-analysis-report-modal__item-title">윗꼬리가 많은 캔들</div>
              <p class="ai-analysis-report-modal__item-desc">차트를 보면 위로 쐈다가 길게 윗꼬리를 달고 내려오는 모습이 자주 보입니다. 이는 상단에 물려있는 매물이 많아 매수세가 강하게 유지되지 못함을 뜻합니다.</p>
            </li>
            <li class="ai-analysis-report-modal__list-item">
              <div class="ai-analysis-report-modal__item-title">직전 고점 저항</div>
              <p class="ai-analysis-report-modal__item-desc">최근 698원 부근에서 강한 저항을 받고 밀렸습니다. 현재 가격(537원)에서 다시 상승하려면 이 저항대를 뚫어주는 거래량이 한번 더 필요합니다.</p>
            </li>
          </ul>
        </div>
      </section>

      <!-- 2. 재무 및 펀더멘털 -->
      <section class="ai-analysis-report-modal__section">
        <h3 class="ai-analysis-report-modal__section-title ai-analysis-report-modal__section-title--fundamental">
          📔 2. 재무 및 펀더멘털 (매우 주의)
        </h3>
        <p class="ai-analysis-report-modal__item-desc mb-4 text-slate-600 dark:text-slate-300">
          재무제표를 보면 <span class="ai-analysis-report-modal__highlight-text">상당히 위험한 신호들이 많습니다.</span>
        </p>
        <ul class="ai-analysis-report-modal__list">
          <li class="ai-analysis-report-modal__list-item">
            <div class="ai-analysis-report-modal__item-title">지속적인 적자</div>
            <p class="ai-analysis-report-modal__item-desc">영업이익과 순이익이 2024년 4분기부터 2025년 3분기까지 계속 <span class="ai-analysis-report-modal__highlight-text">마이너스(적자)</span>입니다. 영업이익률이 -10% ~ -20%대로 사업 모델의 수익성이 매우 취약한 상태입니다.</p>
          </li>
          <li class="ai-analysis-report-modal__list-item">
            <div class="ai-analysis-report-modal__item-title">시가총액 규모</div>
            <p class="ai-analysis-report-modal__item-desc">시가총액이 <span class="ai-analysis-report-modal__highlight-text">395억 원</span>에 불과한 소형주입니다. 이런 종목은 적은 금액으로도 주가가 크게 흔들리기 때문에 소위 '작전'이나 '세력'의 움직임에 휘말리기 쉽습니다.</p>
          </li>
          <li class="ai-analysis-report-modal__list-item">
            <div class="ai-analysis-report-modal__item-title">상장 유지 능력 우려</div>
            <p class="ai-analysis-report-modal__item-desc">적자가 수년간 지속될 경우 <span class="ai-analysis-report-modal__highlight-text">관리종목 지정이나 상장폐지 실질심사 대상</span>이 될 리스크를 항상 염두에 두어야 합니다. (특히 3월은 상장사들의 결산 시즌이라 주의가 필요합니다.)</p>
          </li>
        </ul>
      </section>

      <!-- 3. 종합 의견 및 대응 전략 -->
      <section class="ai-analysis-report-modal__section ai-analysis-report-modal__section--total">
        <h3 class="ai-analysis-report-modal__section-title ai-analysis-report-modal__section-title--total">
          💡 3. 종합 의견 및 대응 전략
        </h3>
        <p class="ai-analysis-report-modal__item-desc mb-4 text-slate-700 dark:text-slate-200">
          지인분이 추천하신 이유는 아마도 <span class="font-bold">'바닥권에서 거래량이 터졌으니 조만간 크게 한 번 쓸 것이다'</span>라는 기대감 때문일 가능성이 큽니다. 하지만 <span class="ai-analysis-report-modal__highlight-text">기술적 분석보다 재무적 리스크가 더 큰 상황</span>입니다.
        </p>
        
        <div class="ai-analysis-report-modal__box">
          <div class="ai-analysis-report-modal__box-title">만약 매수하신다면?</div>
          <div class="ai-analysis-report-modal__box-list">
            <div class="ai-analysis-report-modal__box-item">
              <span class="ai-analysis-report-modal__box-num">1.</span>
              <span>소액 투자: 잃어도 일상에 지장이 없는 수준의 '복권' 같은 금액으로만 접근하세요.</span>
            </div>
            <div class="ai-analysis-report-modal__box-item">
              <span class="ai-analysis-report-modal__box-num">2.</span>
              <span>손절선 엄격 준수: 최근 지지를 받았던 400원~450원 라인을 이탈하면 미련 없이 매도한다는 원칙이 필수입니다.</span>
            </div>
            <div class="ai-analysis-report-modal__box-item">
              <span class="ai-analysis-report-modal__box-num">3.</span>
              <span>단기 대응: 장기 보유보다는 거래량이 터지며 급등할 때 빠르게 수익을 챙기고 나오는 단기 스윙 전략이 적합해 보입니다.</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 한 줄 요약 -->
      <section class="ai-analysis-report-modal__section ai-analysis-report-modal__section--summary">
        <div class="ai-analysis-report-modal__summary-content">
          <span class="text-lg mr-2">📌</span>
          <span class="font-bold">한 줄 요약:</span>
          차트상 바닥 탈출 신호는 보이나, <span class="font-bold text-slate-900 dark:text-white">회사의 기초 체력(재무)이 너무 부실합니다.</span> 
          <span class="ai-analysis-report-modal__highlight-text text-base">"High Risk, High Return"</span>을 노리는 투기적 접근이 아니라면 
          <span class="ai-analysis-report-modal__highlight-text text-base underline decoration-2 underline-offset-4">신중하시길 권합니다.</span>
        </div>
      </section>
      <div class="ai-analysis-report-modal__footer">
        <button 
          type="button" 
          class="ai-analysis-report-modal__confirm-btn" 
          @click="$emit('close')"
        >
          확인
        </button>
      </div>
    </div>
  </modal-vanilla>
</template>

<script>
/**
  * 기능: 종합 의견 및 대응 전략 상세 모달
  * 디자인을 프로젝트 표준에 맞게 통일하고, 이미지의 분석 내용을 상세히 렌더링합니다.
  */
import { XIcon } from "vue-feather-icons";
import ModalVanilla from "~/components/modal/ModalVanilla.vue";
import "~/assets/css/pages/signals/AIAnalysisReportModal/AIAnalysisReportModal.css";

export default {
  name: "AIAnalysisReportModal",
  components: {
    XIcon,
    ModalVanilla,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    // 상위에서 전달받는 데이터 (확장성 대비)
    data: {
      type: Object,
      default: null,
    },
  },
};
</script>
