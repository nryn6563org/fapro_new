<template>
  <!-- ── 스마트 고객관리 인텔리전스 섹션 전체 래퍼 ── -->
  <div class="customer-intelligence-section">
    <!-- ── 섹션 헤더: 타이틀 표시 ── -->
    <div class="customer-intelligence-section__header">
      <h2 class="customer-intelligence-section__title">스마트 고객관리</h2>
      <span class="customer-intelligence-section__update-time">업데이트 03/26 15:45</span>
    </div>

    <!-- ── 인텔리전스 카드 3열 그리드 (매수대기 / 수익 상위 / 수익 하위) ── -->
    <div class="customer-intelligence-section__grid">
      <IntelligenceCashCard
        :items="cashHolding"
        @propose="(type, item) => $emit('propose', type, item)"
      />
      <IntelligenceTopCard
        :items="topPerforming"
        @propose="(type, item) => $emit('propose', type, item)"
      />
      <IntelligenceDropCard
        :items="declining"
        @propose="(type, item) => $emit('propose', type, item)"
      />
    </div>
  </div>
</template>

<script>
/**
 * 기능: 대시보드의 스마트 고객관리 인텔리전스 카드 컴포넌트.
 * 고객을 세 그룹(매수 대기 / 수익률 상위 / 수익률 하위)으로 분류하여
 * 각 그룹에 맞는 AI 투자 제안 전략을 표시하고 제안 액션을 지원합니다.
 *
 * @emits {propose} 제안하기 버튼 클릭 시 발행 - ('CustomerIntelligence', item) 형태
 */
import { customerIntelligence } from "~/utils/mockData.js";
import "~/assets/css/pages/contact/CustomerIntelligenceCard/CustomerIntelligenceCard.css";
import IntelligenceCashCard from "~/components/dashboard/IntelligenceCashCard.vue";
import IntelligenceTopCard from "~/components/dashboard/IntelligenceTopCard.vue";
import IntelligenceDropCard from "~/components/dashboard/IntelligenceDropCard.vue";

export default {
  name: "CustomerIntelligenceCard",
  components: {
    IntelligenceCashCard,
    IntelligenceTopCard,
    IntelligenceDropCard,
  },
  data() {
    return {
      /** @type {Array} 매수 대기 고객 목록 (예수금·현금 비중 높은 고객) */
      cashHolding: customerIntelligence.cashHolding,
      /** @type {Array} 수익률 상위 고객 목록 (최근 3개월 수익 상승률 상위) */
      topPerforming: customerIntelligence.topPerforming,
      /** @type {Array} 수익률 하위 고객 목록 (최근 3개월 수익 하락률 상위) */
      declining: customerIntelligence.declining,
    };
  },
};
</script>
