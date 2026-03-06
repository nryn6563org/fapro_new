<template>
  <article
    class="customer-intelligence-card customer-intelligence-card--emerald animate-local-fade-up"
  >
    <header class="customer-intelligence-card__header">
      <div class="customer-intelligence-card__header-content">
        <div>
          <h3 class="customer-intelligence-card__title">수익률 상위 고객</h3>
          <p class="customer-intelligence-card__desc">
            자산 수익 상승률이 높은 고객들입니다. (최근 일주일)
          </p>
        </div>
        <span class="customer-intelligence-card__badge customer-intelligence-card__badge--emerald">
          {{ items.length }}명
        </span>
      </div>
    </header>

    <div class="customer-intelligence-card__body">
      <div
        v-for="item in items"
        :key="item.id"
        class="customer-intelligence-item customer-intelligence-item--hover-emerald"
      >
        <div class="customer-intelligence-item__content">
          <h4 class="customer-intelligence-item__name">{{ item.name }}</h4>
          <div class="customer-intelligence-item__stats">
            <div class="stat-row">
              <span class="stat-row__label">총 수익률</span>
              <span class="stat-row__value stat-row__value--semibold stat-row__value--emerald-600">{{ item.recent3MonthReturn }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-row__label">총 수익금액</span>
              <span class="stat-row__value stat-row__value--bold stat-row__value--emerald-700">{{ item.totalProfit }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-row__label">최대 수익</span>
              <span class="stat-row__value stat-row__value--medium">{{ item.profitContributor }}</span>
            </div>
          </div>
        </div>

        <div class="customer-intelligence-alert customer-intelligence-alert--emerald">
          <div class="customer-intelligence-alert__title customer-intelligence-alert__title--emerald">
            ✨ AI 대응 전략
          </div>
          <div class="customer-intelligence-alert__text">{{ item.aiStrategy }}</div>
        </div>

        <button
          class="customer-intelligence-card__btn customer-intelligence-card__btn--block customer-intelligence-card__btn--emerald-solid"
          @click="$emit('propose', 'CustomerIntelligence', item)"
        >
          <send-icon size="12" class="customer-intelligence-card__btn-icon" />
          제안하기
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import { SendIcon } from "vue-feather-icons";

export default {
  name: "IntelligenceTopCard",
  components: { SendIcon },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
