<template>
  <div class="strategic-card__expanded">
    <div class="strategic-card__expanded-inner">
      <!-- Upside Driver -->
      <StrategicStockCardPoints
        type="upside"
        title="상승 이유 (Upside Drivers)"
        icon="trending-up-icon"
        :items="stock.upside"
        header-color-class="text-emerald-600"
        text-color-class="text-emerald-700"
        bullet-bg-class="bg-emerald-500"
      />

      <!-- Risk -->
      <StrategicStockCardPoints
        type="risk"
        title="하락 위험 요소 (Downside Risks)"
        icon="alert-triangle-icon"
        :items="stock.downside"
        header-color-class="text-red-500"
        text-color-class="text-red-600"
        bullet-bg-class="bg-red-500"
      />

      <!-- Evidence -->
      <StrategicStockCardPoints
        type="evidence"
        title="투자 근거 (Rationale)"
        icon="info-icon"
        :items="stock.rationale"
        header-color-class="text-blue-600"
        text-color-class="text-blue-700"
        bullet-bg-class="bg-blue-500"
      />
    </div>
  </div>
</template>

<script>
/**
 * 기능: 전략 종목 카드의 펼침 상세 영역
 */
import StrategicStockCardPoints from "./StrategicStockCardPoints.vue";

export default {
  name: "StrategicStockCardExpanded",
  components: {
    StrategicStockCardPoints,
  },
  props: {
    stock: { type: Object, required: true },
  },
};
</script>
