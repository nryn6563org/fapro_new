<template>
  <div class="intelligence-section">
    <div class="intelligence-section__header">
      <h2 class="intelligence-section__title">고객 인텔리전스</h2>
      <span class="badge badge--violet-solid">AI 분석</span>
    </div>

    <div class="intelligence-section__grid">
      <!-- Cash Holding Customers -->
      <article class="intelligence-card intelligence-card--amber animate-local-fade-up" style="animation-delay: 300ms;">
        <header class="intelligence-card__header">
          <div class="intelligence-card__header-content">
            <h3 class="intelligence-card__title">매수 대기 고객</h3>
            <span class="badge badge--amber">{{ cashHolding.length }}명</span>
          </div>
          <p class="intelligence-card__desc">계좌 예수금이 많거나 현금 비중이 높은 고객들입니다.</p>
        </header>
        <div class="intelligence-card__body">
          <div
            v-for="item in cashHolding"
            :key="item.id"
            class="intelligence-item intelligence-item--hover-amber"
          >
            <div class="intelligence-item__content">
              <h4 class="intelligence-item__name">{{ item.name }}</h4>
              <div class="intelligence-item__stats">
                <div class="stat-row">
                  <span class="stat-row__label">총 자산</span>
                  <span class="stat-row__value stat-row__value--semibold">{{ item.aum }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-row__label">예수금</span>
                  <span class="stat-row__value stat-row__value--bold stat-row__value--amber-700">{{
                    item.cashBalance
                  }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-row__label">현금 비중</span>
                  <span class="stat-row__value stat-row__value--semibold stat-row__value--amber-600">{{
                    item.cashRatio
                  }}</span>
                </div>
              </div>
            </div>

            <div class="intelligence-alert intelligence-alert--amber">
              <div class="intelligence-alert__title intelligence-alert__title--amber">💰 AI 투자 제안</div>
              <div class="intelligence-alert__text">{{ item.aiKeyword }}</div>
            </div>

            <button
              class="btn btn--block btn--amber-solid"
              @click="$emit('propose', 'CustomerIntelligence', item)"
            >
              <send-icon size="12" class="btn__icon--mr-1" /> 제안하기
            </button>
          </div>
        </div>
      </article>

      <!-- Top Performing Customers -->
      <article class="intelligence-card intelligence-card--emerald animate-local-fade-up" style="animation-delay: 400ms;">
        <header class="intelligence-card__header">
          <div class="intelligence-card__header-content">
            <h3 class="intelligence-card__title">수익률 상위 고객</h3>
            <span class="badge badge--emerald">{{ topPerforming.length }}명</span>
          </div>
          <p class="intelligence-card__desc">자산 수익률 상승률이 높은 고객들입니다.</p>
        </header>
        <div class="intelligence-card__body">
          <div
            v-for="item in topPerforming"
            :key="item.id"
            class="intelligence-item intelligence-item--hover-emerald"
          >
            <div class="intelligence-item__content">
              <h4 class="intelligence-item__name">{{ item.name }}</h4>
              <div class="intelligence-item__stats">
                <div class="stat-row">
                  <span class="stat-row__label">총 수익률</span>
                  <span class="stat-row__value stat-row__value--semibold stat-row__value--emerald-600">{{
                    item.recent3MonthReturn
                  }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-row__label">총 수익금액</span>
                  <span class="stat-row__value stat-row__value--bold stat-row__value--emerald-700">{{
                    item.totalProfit
                  }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-row__label">최대 수익</span>
                  <span class="stat-row__value stat-row__value--medium">{{ item.profitContributor }}</span>
                </div>
              </div>
            </div>

            <div class="intelligence-alert intelligence-alert--emerald">
              <div class="intelligence-alert__title intelligence-alert__title--emerald">🎯 AI 대응 전략</div>
              <div class="intelligence-alert__text">{{ item.aiStrategy }}</div>
            </div>

            <button
              class="btn btn--block btn--emerald-solid"
              @click="$emit('propose', 'CustomerIntelligence', item)"
            >
              <send-icon size="12" class="btn__icon--mr-1" /> 제안하기
            </button>
          </div>
        </div>
      </article>

      <!-- Declining Customers -->
      <article class="intelligence-card intelligence-card--rose animate-local-fade-up" style="animation-delay: 500ms;">
        <header class="intelligence-card__header">
          <div class="intelligence-card__header-content">
            <h3 class="intelligence-card__title">수익률 하위 고객</h3>
            <span class="badge badge--rose">{{ declining.length }}명</span>
          </div>
          <p class="intelligence-card__desc">자산 수익률 하락률이 높은 고객들입니다.</p>
        </header>
        <div class="intelligence-card__body">
          <div
            v-for="item in declining"
            :key="item.id"
            class="intelligence-item intelligence-item--hover-rose"
          >
            <div class="intelligence-item__content">
              <h4 class="intelligence-item__name">{{ item.name }}</h4>
              <div class="intelligence-item__stats">
                <div class="stat-row">
                  <span class="stat-row__label">총 수익률</span>
                  <span class="stat-row__value stat-row__value--semibold stat-row__value--rose-600">{{
                    item.recent3MonthReturn
                  }}</span>
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

            <div class="intelligence-alert intelligence-alert--rose">
              <div class="intelligence-alert__title intelligence-alert__title--rose">🎯 AI 대응 전략</div>
              <div class="intelligence-alert__text">{{ item.aiStrategy }}</div>
            </div>

            <button
              class="btn btn--block btn--rose-solid"
              @click="$emit('propose', 'CustomerIntelligence', item)"
            >
              <send-icon size="12" class="btn__icon--mr-1" /> 제안하기
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { SendIcon } from 'vue-feather-icons'
import { customerIntelligence } from '~/utils/mockData.js'
import '~/assets/css/pages/index/CustomerIntelligenceCard.css'

export default {
  name: 'CustomerIntelligenceCard',
  components: { SendIcon },
  data() {
    return {
      cashHolding: customerIntelligence.cashHolding,
      topPerforming: customerIntelligence.topPerforming,
      declining: customerIntelligence.declining
    }
  }
}
</script>

<style scoped>
</style>
