<template>
  <div class="today-proposal">
    <div class="today-proposal__header">
      <h2 class="today-proposal__title">오늘의 제안</h2>
      <span class="badge today-proposal__badge">실시간 업데이트</span>
    </div>

    <div class="today-proposal__grid">
      <!-- Target Customers -->
      <article class="proposal-card proposal-card--teal">
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
              <button class="btn btn--sm btn--teal" @click="$emit('propose', 'customer', item)">
                <send-icon size="12" class="mr-1" /> 제안하기
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
      <article class="proposal-card proposal-card--orange">
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
                  <span :class="item.change.startsWith('+') ? 'text-red-500' : 'text-blue-500'">{{
                    item.change
                  }}</span>
                </div>
              </div>
              <button class="btn btn--sm btn--orange" @click="$emit('propose', 'stock', item)">
                <send-icon size="12" class="mr-1" /> 제안하기
              </button>
            </div>
            <div class="proposal-item__bottom">
              추천 고객 : {{ Array.isArray(item.customers) ? item.customers.join(', ') : '' }}
            </div>
          </div>
        </div>
      </article>

      <!-- Target Issues (Sell) -->
      <article class="proposal-card proposal-card--violet">
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
                  <span :class="item.change.startsWith('+') ? 'text-red-500' : 'text-blue-500'">{{
                    item.change
                  }}</span>
                </div>
              </div>
              <button class="btn btn--sm btn--violet" @click="$emit('propose', 'issue', item)">
                <send-icon size="12" class="mr-1" /> 제안하기
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
import { SendIcon } from 'vue-feather-icons'
import { todayProposalCustomers, todayProposalStocks, todayIssueStocks } from '~/utils/mockData.js'

export default {
  name: 'TodayProposalCard',
  components: { SendIcon },
  data() {
    return {
      customers: todayProposalCustomers,
      stocks: todayProposalStocks,
      issues: todayIssueStocks
    }
  }
}
</script>

<style src="~/assets/css/pages/index/TodayProposalCard.css" />
