<template>
  <div
    :class="[
      'strategic-card__detail-section',
      `strategic-card__detail-section--${type}`,
    ]"
  >
    <div :class="['strategic-card__section-header', headerColorClass]">
      <component :is="icon" class="strategic-card__section-icon" />
      <h3 class="strategic-card__section-title">
        {{ title }}
      </h3>
    </div>
    <ul :class="['strategic-card__point-list', textColorClass]">
      <li
        v-for="(item, idx) in items"
        :key="idx"
        class="strategic-card__point-item"
      >
        <span :class="['strategic-card__point-bullet', bulletBgClass]"></span>
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * 기능: 전략 종목 카드의 상세 포인트(상승, 하락, 근거) 리스트 컴포넌트
 */
import {
  TrendingUpIcon,
  AlertTriangleIcon,
  InfoIcon,
} from "vue-feather-icons";

export default {
  name: "StrategicStockCardPoints",
  components: {
    TrendingUpIcon,
    AlertTriangleIcon,
    InfoIcon,
  },
  props: {
    type: { type: String, required: true }, // upside, risk, evidence
    title: { type: String, required: true },
    icon: { type: String, required: true },
    items: { type: Array, required: true },
    headerColorClass: { type: String, required: true },
    textColorClass: { type: String, required: true },
    bulletBgClass: { type: String, required: true },
  },
};
</script>
