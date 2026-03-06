<template>
  <div class="customer-analysis">
    <div class="customer-analysis__header">
      <div class="customer-analysis__icon-box">
        <zap-icon />
      </div>
      <div class="customer-analysis__title-group">
        <h3 class="customer-analysis__title">AI 고객 분석</h3>
        <p class="customer-analysis__subtitle">포트폴리오 및 투자 성향 분석</p>
      </div>
    </div>

    <div class="customer-analysis__list">
      <div v-for="(item, index) in analysisItems" :key="index" class="customer-analysis__item">
        <span class="customer-analysis__bullet">•</span>
        <p>
          <span :class="['customer-analysis__label', item.isHighlight ? 'customer-analysis__label--highlight' : '']">
            {{ item.label }}:
          </span>
          {{ item.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 고객 분석 레포트 카드 (Redesign)
 */
import { ZapIcon } from "vue-feather-icons";
import "~/assets/css/pages/customers/CustomerDetailModal/CustomerDetailAnalysis.css";

export default {
  name: "CustomerDetailAnalysis",
  components: {
    ZapIcon,
  },
  props: {
    analysisData: { type: Object, default: null },
  },
  computed: {
    analysisItems() {
      if (!this.analysisData) {
        return [
          { label: "투자 성향", content: "데이터를 불러오는 중입니다." },
          { label: "수익률 분석", content: "데이터를 불러오는 중입니다." },
          { label: "리스크 진단", content: "데이터를 불러오는 중입니다." },
          { label: "추천 액션", content: "데이터를 불러오는 중입니다.", isHighlight: true },
        ];
      }
      return [
        { label: "투자 성향", content: this.analysisData.investmentTendency || this.analysisData.typeAnalysis || "업로드된 정보를 분석 중입니다." },
        { label: "수익률 분석", content: this.analysisData.returnAnalysis || "포트폴리오 수익률을 계산 중입니다." },
        { label: "리스크 진단", content: this.analysisData.riskDiagnosis || "보유 종목 리스크를 점검 중입니다." },
        { label: "추천 액션", content: this.analysisData.recommendedAction || "최적의 제안을 준비 중입니다.", isHighlight: true },
      ];
    }
  }
};
</script>
