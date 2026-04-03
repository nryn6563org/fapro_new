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
          <span class="customer-intelligence-card__badge-value">{{ items.length }}</span>
          <span class="customer-intelligence-card__badge-unit">명</span>
        </span>
      </div>
    </header>

    <div class="customer-intelligence-card__body">
      <div
        v-for="item in items"
        :key="item.id"
        class="customer-intelligence-item"
      >
        <div class="customer-intelligence-item__top">
          <div class="customer-intelligence-item__info">
            <h4 class="customer-intelligence-item__name">{{ item.name }}</h4>
            <button
              class="customer-intelligence-card__btn"
              @click="$emit('propose', 'CustomerIntelligence', item)"
            >
              <span class="customer-intelligence-card__btn-text">제안하기</span>
            </button>
          </div>
          
          <div class="customer-intelligence-item__stats">
            <div class="stat-row">
              <div class="stat-row__label-container">
                <span class="stat-row__label">총 자산</span>
              </div>
              <div class="stat-row__value-container">
                <span class="stat-row__value stat-row__value--emerald-600">{{ item.aum }}</span>
              </div>
            </div>
            <div class="stat-row">
              <div class="stat-row__label-container">
                <span class="stat-row__label">예수금</span>
              </div>
              <div class="stat-row__value-container">
                <span class="stat-row__value stat-row__value--bold">{{ item.cashBalance }}</span>
              </div>
            </div>
            <div class="stat-row">
              <div class="stat-row__label-container">
                <span class="stat-row__label">현금 비중</span>
              </div>
              <div class="stat-row__value-container">
                <span class="stat-row__value stat-row__value--medium">{{ item.cashRatio }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="customer-intelligence-alert customer-intelligence-alert--amber">
          <div class="customer-intelligence-alert__title-box">
            <div class="customer-intelligence-alert__icon">
              <!-- Using simple sparkle SVG inline simulating sparkles -->
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <span class="customer-intelligence-alert__title customer-intelligence-alert__title--amber">
              AI 대응 전략
            </span>
          </div>
          <div class="customer-intelligence-alert__text">{{ item.aiKeyword }}</div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "IntelligenceCashCard",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
