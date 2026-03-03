<template>
  <div class="proposal-wrapper">
    <!-- View All Header -->
    <div class="proposal-header">
      <h2 class="proposal-header__title">오늘의 제안</h2>
      <span class="badge badge--teal" style="margin-left:8px;">실시간 업데이트</span>
    </div>

    <!-- Cards Container -->
    <div class="today-proposal__grid">
      <!-- 1) Buy Target -->
      <article class="proposal-card proposal-card--teal animate-local-fade-up">
        <header class="proposal-card__header">
          <div class="proposal-card__header-content">
            <div>
              <h3 class="proposal-card__title">오늘 타겟 고객</h3>
              <p class="proposal-card__desc">AI매매신호 발생 종목 대상 고객</p>
            </div>
            <span class="badge badge--teal">{{ customers.length }}명</span>
          </div>
        </header>
        <div class="proposal-card__body">
          <div v-for="item in customers" :key="item.id" class="proposal-item">
            <div class="proposal-item__top">
              <div class="proposal-item__info">
                <div class="proposal-item__name-row">
                  <span class="proposal-item__name">{{ item.name }}</span>
                  <span
                    class="badge badge--outline"
                    :class="item.action === 'buy' ? 'badge--outline-red' : 'badge--outline-blue'"
                  >
                    {{ item.action === 'buy' ? '매수제안' : '매도제안' }}
                  </span>
                </div>
                <div class="proposal-item__meta">
                  {{ item.portfolio }} · {{ item.investmentStyle }}
                </div>
              </div>
              <button class="btn btn--sm btn--teal" @click="openProposalModal('customer', item)">
                <send-icon size="12" class="btn__icon" /> 제안하기
              </button>
            </div>
            <div class="proposal-item__bottom">
              추천 종목 :
              {{ Array.isArray(item.targetStock) ? item.targetStock.join(', ') : item.targetStock }}
            </div>
          </div>
        </div>
      </article>

      <!-- Target Stocks (Buy) -->
      <article class="proposal-card proposal-card--orange animate-local-fade-up" style="animation-delay: 100ms;">
        <header class="proposal-card__header">
          <div class="proposal-card__header-content">
            <div>
              <h3 class="proposal-card__title">오늘 매수 타겟 종목</h3>
              <p class="proposal-card__desc">AI발굴종목 제안 (매수)</p>
            </div>
            <span class="badge badge--orange">{{ stocks.length }}개</span>
          </div>
        </header>
        <div class="proposal-card__body">
          <div v-for="item in stocks" :key="item.ticker" class="proposal-item">
            <div class="proposal-item__top">
              <div class="proposal-item__info">
                <div class="proposal-item__name-row">
                  <span class="proposal-item__name">{{ item.name }}</span>
                  <span class="badge badge--outline badge--outline-red">매수제안</span>
                </div>
                <div class="proposal-item__meta">
                  {{ item.price }}
                  <span :class="item.change.startsWith('+') ? 'proposal-item__change--up' : 'proposal-item__change--down'">{{
                    item.change
                  }}</span>
                </div>
              </div>
              <button class="btn btn--sm btn--orange" @click="openProposalModal('stock', item)">
                <send-icon size="12" class="btn__icon" /> 제안하기
              </button>
            </div>
            <div class="proposal-item__bottom">
              추천 고객 : {{ Array.isArray(item.customers) ? item.customers.join(', ') : '' }}
            </div>
          </div>
        </div>
      </article>

      <!-- Target Issues (Sell) -->
      <article class="proposal-card proposal-card--violet animate-local-fade-up" style="animation-delay: 200ms;">
        <header class="proposal-card__header">
          <div class="proposal-card__header-content">
            <div>
              <h3 class="proposal-card__title">오늘 매도 타겟 종목</h3>
              <p class="proposal-card__desc">AI 시그널 기반 제안 (매도)</p>
            </div>
            <span class="badge badge--violet">{{ issues.length }}개</span>
          </div>
        </header>
        <div class="proposal-card__body">
          <div v-for="item in issues" :key="item.ticker" class="proposal-item">
            <div class="proposal-item__top">
              <div class="proposal-item__info">
                <div class="proposal-item__name-row">
                  <span class="proposal-item__name">{{ item.name }}</span>
                  <span class="badge badge--outline badge--outline-blue">매도제안</span>
                </div>
                <div class="proposal-item__meta">
                  {{ item.price }}
                  <span :class="item.change.startsWith('+') ? 'proposal-item__change--up' : 'proposal-item__change--down'">{{
                    item.change
                  }}</span>
                </div>
              </div>
              <button class="btn btn--sm btn--violet" @click="openProposalModal('issue', item)">
                <send-icon size="12" class="btn__icon" /> 제안하기
              </button>
            </div>
            <div class="proposal-item__bottom">
              추천 고객 : {{ Array.isArray(item.customers) ? item.customers.join(', ') : '' }}
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { SendIcon } from 'vue-feather-icons'
import { todayProposalCustomers, todayProposalStocks, todayIssueStocks } from '~/utils/mockData.js'
import TodayProposalModal from '~/components/dashboard/TodayProposalModal.vue'

export default {
  name: 'TodayProposalCard',
  components: { SendIcon },
  data() {
    return {
      customers: todayProposalCustomers,
      stocks: todayProposalStocks,
      issues: todayIssueStocks
    }
  },
  methods: {
    openProposalModal(type, data) {
      const ModalWrapper = Vue.extend(TodayProposalModal)
      const instance = new ModalWrapper({
        propsData: {
          proposalType: type,
          proposalData: data
        }
      })
      instance.$on('close-modal', () => {
        this.$modalV.hide()
      })
      instance.$mount()
      this.$modalV.show({
        content: instance.$el,
        buttons: [],
        closeButton: false,
        onHidden: () => {
          instance.$destroy()
        }
      })
    }
  }
}
</script>

<style src="~/assets/css/pages/index/TodayProposalCard.css" />
