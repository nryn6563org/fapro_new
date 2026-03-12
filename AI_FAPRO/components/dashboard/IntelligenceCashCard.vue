<template>
  <article
    class="customer-intelligence-card customer-intelligence-card--amber animate-local-fade-up"
    style="animation-delay: 300ms"
  >
    <header class="customer-intelligence-card__header">
      <div class="customer-intelligence-card__header-content">
        <div>
          <h3 class="customer-intelligence-card__title">매수 대기 고객</h3>
          <p class="customer-intelligence-card__desc">
            예수금이 많거나 현금 비중이 높은 고객들입니다.
          </p>
        </div>
        <span class="customer-intelligence-card__badge customer-intelligence-card__badge--amber">
          {{ items.length }}명
        </span>
      </div>
    </header>

    <div class="customer-intelligence-card__body">
      <div
        v-for="item in items"
        :key="item.id"
        class="customer-intelligence-item customer-intelligence-item--hover-amber"
      >
        <div class="customer-intelligence-item__top">
          <div class="customer-intelligence-item__info">
            <h4 class="customer-intelligence-item__name">{{ item.name }}</h4>
          </div>
          <button
            class="customer-intelligence-card__btn customer-intelligence-card__btn--compact customer-intelligence-card__btn--amber-solid"
            @click="$emit('propose', 'CustomerIntelligence', item)"
          >
            <send-icon size="12" class="customer-intelligence-card__btn-icon" />
            제안하기
          </button>
        </div>
        <div class="customer-intelligence-item__content">
          <div class="customer-intelligence-item__stats">
            <div class="stat-row">
              <span class="stat-row__label">총 자산</span>
              <span class="stat-row__value stat-row__value--semibold">{{ item.aum }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-row__label">예수금</span>
              <span class="stat-row__value stat-row__value--bold stat-row__value--amber-700">{{ item.cashBalance }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-row__label">현금 비중</span>
              <span class="stat-row__value stat-row__value--semibold stat-row__value--amber-600">{{ item.cashRatio }}</span>
            </div>
          </div>
        </div>

        <div class="customer-intelligence-alert customer-intelligence-alert--amber">
          <div class="customer-intelligence-alert__title customer-intelligence-alert__title--amber">
            ✨ AI 투자 제안
          </div>
          <div class="customer-intelligence-alert__text">{{ item.aiKeyword }}</div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { SendIcon } from "vue-feather-icons";

export default {
  name: "IntelligenceCashCard",
  components: { SendIcon },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
