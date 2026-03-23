<template>
  <article
    class="customer-intelligence-card customer-intelligence-card--rose animate-local-fade-up"
    style="animation-delay: 500ms"
  >
    <header class="customer-intelligence-card__header">
      <div class="customer-intelligence-card__header-content">
        <div>
          <h3 class="customer-intelligence-card__title">수익률 하위 고객</h3>
          <p class="customer-intelligence-card__desc">
            자산 수익 하락률이 높은 고객들입니다.
          </p>
        </div>
        <span class="customer-intelligence-card__badge customer-intelligence-card__badge--rose">
          {{ items.length }}명
        </span>
      </div>
    </header>

    <div class="customer-intelligence-card__body">
      <div
        v-for="item in items"
        :key="item.id"
        class="customer-intelligence-item customer-intelligence-item--hover-rose"
      >
        <div class="customer-intelligence-item__top">
          <div class="customer-intelligence-item__info">
            <h4 class="customer-intelligence-item__name">{{ item.name }}</h4>
          </div>
          <button
            class="customer-intelligence-card__btn customer-intelligence-card__btn--compact customer-intelligence-card__btn--rose-solid"
            @click="$emit('propose', 'CustomerIntelligence', item)"
          >
            <send-icon size="12" class="customer-intelligence-card__btn-icon" />
            제안하기
          </button>
        </div>
        <div class="customer-intelligence-item__content">
          <div class="customer-intelligence-item__stats">
            <div class="stat-row">
              <span class="stat-row__label">총 수익률</span>
              <span class="stat-row__value stat-row__value--semibold stat-row__value--rose-600">{{ item.recent3MonthReturn }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-row__label">총 손실금액</span>
              <span class="stat-row__value stat-row__value--bold stat-row__value--rose-700">{{ item.totalLoss }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-row__label">최대 손실</span>
              <span class="stat-row__value stat-row__value--medium">{{ item.lossContributor }}</span>
            </div>
          </div>
        </div>

        <div class="customer-intelligence-alert customer-intelligence-alert--rose">
          <div class="customer-intelligence-alert__title customer-intelligence-alert__title--rose">
            ✨ AI 대응 전략
          </div>
          <div class="customer-intelligence-alert__text">{{ item.aiStrategy }}</div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { SendIcon } from "vue-feather-icons";

export default {
  name: "IntelligenceDropCard",
  components: { SendIcon },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
