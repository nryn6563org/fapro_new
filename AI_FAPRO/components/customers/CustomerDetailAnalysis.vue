<template>
  <div class="customer-analysis">
    <div class="customer-analysis__section-label">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10.8337 1.66675L2.50033 11.6667H9.16699L8.33366 18.3334L16.667 8.33341H10.0003L10.8337 1.66675Z" stroke="#14B8A6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <h5 class="customer-analysis__section-title">AI 고객 분석 리포트</h5>
    </div>

    <div class="customer-analysis__grid">
      <div v-for="(item, index) in analysisItems" :key="index" :class="['customer-analysis__card', item.isHighlight ? 'customer-analysis__card--highlight' : '']">
        <div class="customer-analysis__card-header">
          <component :is="item.icon" class="customer-analysis__card-icon" />
          <span class="customer-analysis__card-label">{{ item.label }}</span>
        </div>
        <div class="customer-analysis__card-body">
          <p class="customer-analysis__card-content">{{ item.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 고객 분석 레포트 카드 (Redesign)
 */
import { TargetIcon, BarChart2Icon, AlertTriangleIcon, ActivityIcon } from "vue-feather-icons";
import "~/assets/css/pages/customers/CustomerDetailModal/CustomerDetailAnalysis.css";

export default {
  name: "CustomerDetailAnalysis",
  components: {
    TargetIcon,
    BarChart2Icon,
    AlertTriangleIcon,
    ActivityIcon,
  },
  props: {
    analysisData: { type: Object, default: null },
  },
  computed: {
    analysisItems() {
      if (!this.analysisData) {
        return [
          { label: "투자 성향", content: "데이터를 불러오는 중입니다.", icon: "TargetIcon" },
          { label: "수익률 분석", content: "데이터를 불러오는 중입니다.", icon: "BarChart2Icon" },
          { label: "리스크 진단", content: "데이터를 불러오는 중입니다.", icon: "AlertTriangleIcon" },
          { label: "추천 액션", content: "데이터를 불러오는 중입니다.", isHighlight: true, icon: "ActivityIcon" },
        ];
      }
      return [
        { label: "투자 성향", content: this.analysisData.investmentTendency || this.analysisData.typeAnalysis || "업로드된 정보를 분석 중입니다.", icon: "TargetIcon" },
        { label: "수익률 분석", content: this.analysisData.returnAnalysis || "포트폴리오 수익률을 계산 중입니다.", icon: "BarChart2Icon" },
        { label: "리스크 진단", content: this.analysisData.riskDiagnosis || "보유 종목 리스크를 점검 중입니다.", icon: "AlertTriangleIcon" },
        { label: "추천 액션", content: this.analysisData.recommendedAction || "최적의 제안을 준비 중입니다.", isHighlight: true, icon: "ActivityIcon" },
      ];
    }
  }
};
</script>
