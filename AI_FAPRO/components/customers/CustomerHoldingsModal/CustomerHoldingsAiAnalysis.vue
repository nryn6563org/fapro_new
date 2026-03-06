<template>
  <div class="customer-holdings__ai-analysis">
    <div class="customer-holdings__ai-header">
      <div class="customer-holdings__ai-icon-box">
        <zap-icon class="customer-holdings__ai-zap-icon" />
      </div>
      <div>
        <h3 class="customer-holdings__ai-title">AI 고객 분석</h3>
        <p class="customer-holdings__ai-subtitle">포트폴리오 및 투자 성향 분석</p>
      </div>
    </div>
    <div class="customer-holdings__ai-content">
      <div class="customer-holdings__ai-item">
        <div class="customer-holdings__dot customer-holdings__dot-teal"></div>
        <p class="customer-holdings__ai-text">
          <span class="customer-holdings__ai-text-bold">투자 성향:</span>
          {{ investmentType }} 고객으로 현재 포트폴리오는 성장주 중심으로 구성되어
          있습니다.
        </p>
      </div>
      <div class="customer-holdings__ai-item">
        <div class="customer-holdings__dot customer-holdings__dot-teal"></div>
        <p class="customer-holdings__ai-text">
          <span class="customer-holdings__ai-text-bold">수익률 분석:</span>
          전체 포트폴리오가 +15.02%의 양호한 수익률을 보이고 있으며, 모든 보유
          종목이 수익 상태입니다.
        </p>
      </div>
      <div class="customer-holdings__ai-item">
        <div class="customer-holdings__dot customer-holdings__dot-amber"></div>
        <p class="customer-holdings__ai-text">
          <span class="customer-holdings__ai-text-bold-amber">추천 액션:</span>
          섹터 다각화를 통한 리스크 분산을 고려해보시고, 2차전지 또는 바이오 섹터
          추가 편입을 제안합니다.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 보유 종목 모달 - AI 분석 영역
 */
import { ZapIcon } from "vue-feather-icons";

export default {
  name: "CustomerHoldingsAiAnalysis",
  components: {
    ZapIcon,
  },
  props: {
    investmentType: { type: String, default: "" },
  },
};
</script>
