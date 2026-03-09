<template>
  <div class="ai-report-factors">
    <div class="ai-report-factors__grid">
      <!-- 투자포인트 -->
      <div class="ai-report-factors__card">
        <div class="ai-report-factors__card-header pb-2 border-b-0">
          <h3 class="ai-report-factors__card-title text-sm font-bold">투자포인트</h3>
        </div>
        <div class="ai-report-factors__card-body ai-report-factors__card-body--padded">
          <ul class="ai-report-factors__list">
            <li v-for="(item, index) in investmentPoints" :key="'inv-' + index" class="ai-report-factors__list-item">
              <span class="ai-report-factors__list-bullet">•</span>
              <span class="ai-report-factors__list-text">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 리스크요인 -->
      <div class="ai-report-factors__card">
        <div class="ai-report-factors__card-header pb-2 border-b-0">
          <h3 class="ai-report-factors__card-title text-sm font-bold">리스크요인</h3>
        </div>
        <div class="ai-report-factors__card-body ai-report-factors__card-body--padded">
          <ul class="ai-report-factors__list">
            <li v-for="(item, index) in riskFactors" :key="'risk-' + index" class="ai-report-factors__list-item">
              <span class="ai-report-factors__list-bullet">•</span>
              <span class="ai-report-factors__list-text">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 리포트의 투자포인트 및 리스크요인 영역
 */
import "~/assets/css/pages/signals/AIReportFactors/AIReportFactors.css";

export default {
  name: "AIReportFactors",
  props: {
    investmentPoints: {
      type: Array,
      default: () => [
        "압도적 저평가: 2026년 예상 실적 기준 PER이 9배 수준으로, 글로벌 경쟁사(평균 20배) 대비 절반 이하의 매력적인 가격대입니다.",
        "수익성 레벨업: 영업이익률이 7%에서 18% 이상으로 급등하며 체질 개선에 성공했고, 무차입 경영에 가까운 극강의 재무 안정성을 보유하고 있습니다.",
        "사우디 국산화 수혜: 사우디 아람코의 현지화 정책(Iktva) 수혜로 SNT Gulf를 통한 중동 수주 독점권 및 우선권 확보가 강력한 성장 동력입니다.",
        "지지선 확보: 6.9만 원 고점 대비 40%가량 조정받은 후, 40,000원~43,000원 구간에서 강력한 하방 경직성을 보이며 바닥을 다지고 있습니다."
      ],
    },
    riskFactors: {
      type: Array,
      default: () => [
        "밸류에이션 트랩 위험: 과거 중동 플랜트 기자재주가 겪었던 '저PER 국면의 장기화' 리스크가 있으며, 시장에서 '기계 업종' 이상의 프리미엄을 받지 못할 가능성이 존재합니다.",
        "높은 PBR 부담: 단기 주가 급등으로 인해 PBR이 2.5~2.9배 수준까지 상승하여, 장부가치 대비 저렴하다는 인식이 과거보다 옅어진 상태입니다.",
        "유가 및 정책 변동성: 매출의 80% 이상이 오일/가스 플랜트에 집중되어 있어, 국제 유가 급락이나 미국의 LNG 수출 규제 등 대외 환경 변화에 실적이 민감하게 반응합니다.",
        "하락 추세 지속: 주요 이동평균선들이 역배열 상태이거나 저항으로 작용하고 있어, 거래량을 동반한 52,000원 돌파 전까지는 지지부진한 횡보가 길어질 수 있습니다."
      ],
    },
  },
};
</script>
