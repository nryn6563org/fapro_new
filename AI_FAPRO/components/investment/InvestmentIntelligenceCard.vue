<template>
  <div
    class="intelligence-card"
    :class="[currentSummary.borderColor, currentSummary.bgColor]"
    @mouseenter="$emit('pause', true)"
    @mouseleave="$emit('pause', false)"
  >
    <!-- Header 영역 -->
    <investment-intelligence-card-header
      :title="currentSummary.title"
      :color="currentSummary.color"
      :icon-component="iconComponent"
      :index="index"
      :summaries-length="summaries.length"
      :current-time="currentTime"
      @update:index="$emit('update:index', $event)"
      @next="$emit('next')"
    />

    <!-- Content 영역 -->
    <investment-intelligence-card-body
      :summary="currentSummary"
      :index="index"
      :summary-class="summaryClass"
    />
  </div>
</template>

<script>
/**
 * 기능: 투자 정보pro 인텔리전스 요약 카드 (Modularized)
 */
import InvestmentIntelligenceCardHeader from "./InvestmentIntelligenceCard/InvestmentIntelligenceCardHeader.vue";
import InvestmentIntelligenceCardBody from "./InvestmentIntelligenceCard/InvestmentIntelligenceCardBody.vue";
import "~/assets/css/pages/investment/InvestmentIntelligenceCard/InvestmentIntelligenceCard.css";

export default {
  name: "InvestmentIntelligenceCard",
  components: {
    InvestmentIntelligenceCardHeader,
    InvestmentIntelligenceCardBody,
  },
  props: {
    // 인텔리전스 요약 데이터 목록
    summaries: {
      type: Array,
      required: true,
    },
    // 현재 표시 중인 인덱스
    index: {
      type: Number,
      default: 0,
    },
    // 업데이트 시각 문자열
    currentTime: {
      type: String,
      default: "",
    },
  },
  computed: {
    /**
     * @description 현재 인덱스에 해당하는 요약 데이터
     */
    currentSummary() {
      return this.summaries[this.index];
    },
    /**
     * @description 유형에 따른 아이콘 컴포넌트 이름
     */
    iconComponent() {
      const icons = {
        issue: "AlertCircleIcon",
        news: "ActivityIcon",
        usIssue: "TrendingUpIcon",
        stock: "ZapIcon",
      };
      return icons[this.currentSummary.type] || "AlertCircleIcon";
    },
    /**
     * @description 유형에 따른 요약 박스 CSS 클래스
     */
    summaryClass() {
      const classes = {
        issue: "intelligence-card__summary-box--orange",
        news: "intelligence-card__summary-box--teal",
        usIssue: "intelligence-card__summary-box--blue",
        stock: "intelligence-card__summary-box--purple",
      };
      return classes[this.currentSummary.type] || "";
    },
  },
};
</script>

