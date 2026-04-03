<template>
  <div class="proposal-wrapper">
    <div class="today-proposal__header">
      <h2 class="today-proposal__header-title">
        {{ currentDate }} 오늘의 제안
      </h2>
      <span class="today-proposal__update-time">업데이트 03/26 15:45</span>
    </div>

    <!-- Cards Container -->
    <div class="today-proposal__grid">
      <!-- 1) Buy Target -->
      <article class="today-proposal__card-teal">
        <header class="proposal-card__header">
          <div class="proposal-card__header-content">
            <div class="flex flex-col flex-1 shrink-0">
              <h3 class="proposal-card__title">오늘의 타겟 고객</h3>
              <p class="proposal-card__desc" title="AI매매신호 발생 종목중 매수/매도를 진행할 고객 입니다.">
                AI매매신호 발생 종목 대상 매수/매도를 진행할 고객 입니다.
              </p>
            </div>
            <span class="today-proposal__badge today-proposal__badge--teal">
              <span class="today-proposal__badge-value">{{ customers.length }}</span>
              <span class="today-proposal__badge-unit">명</span>
            </span>
          </div>
        </header>
        <div class="proposal-card__body">
          <div v-for="item in customers" :key="item.id" class="proposal-item">
            <div class="proposal-item__top">
              <div class="proposal-item__info">
                <div class="proposal-item__name-row">
                  <span class="proposal-item__name">{{ item.name }}</span>
                  <span :class="item.action === 'buy' ? 'today-proposal__badge-buy' : 'today-proposal__badge-sell'">
                    {{ item.action === "buy" ? "매수제안" : "매도제안" }}
                  </span>
                </div>
                <div class="proposal-item__meta">
                  {{ item.portfolio }} · {{ item.investmentStyle }}
                </div>
              </div>
              <button class="today-proposal__btn" @click="openProposalModal('target-customer', item)">
                제안하기
              </button>
            </div>
            <div class="proposal-item__bottom">
              <p>
                <span class="proposal-item__bottom-label">제안종목 : </span>
                <span class="proposal-item__bottom-value">
                  {{ Array.isArray(item.targetStock) ? item.targetStock.join(", ") : item.targetStock }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </article>

      <!-- Target Stocks (Buy) -->
      <article class="today-proposal__card-orange">
        <header class="proposal-card__header">
          <div class="proposal-card__header-content">
            <div class="flex flex-col flex-1 shrink-0">
              <h3 class="proposal-card__title">
                오늘 <span class="text-buy">매수</span> 타겟 종목
              </h3>
              <p class="proposal-card__desc" title="매수 타겟 종목으로 고객에게 제안해 볼 종목 입니다.">
                매수 타겟 종목으로 고객에게 제안해 볼 종목 입니다.
              </p>
            </div>
            <span class="today-proposal__badge today-proposal__badge--orange">
              <span class="today-proposal__badge-value">{{ stocks.length }}</span>
              <span class="today-proposal__badge-unit">종목</span>
            </span>
          </div>
        </header>
        <div class="proposal-card__body">
          <div v-for="item in stocks" :key="item.ticker" class="today-proposal-item">
            <div class="today-proposal-item__top">
              <div class="today-proposal-item__info">
                <div class="today-proposal-item__name-row">
                  <span class="today-proposal-item__name">{{ item.name }}</span>
                  <span class="today-proposal__badge-buy">매수제안</span>
                </div>
                <div class="today-proposal-item__meta">
                  <span class="today-proposal-item__price">{{ item.price }} <span>원</span></span>
                  <span :class="item.change.startsWith('+') ? 'today-proposal-item__change--up' : 'today-proposal-item__change--down'">
                    {{ item.change }}
                  </span>
                </div>
              </div>
              <button class="today-proposal__btn" @click="openProposalModal('target-stock', item)">
                제안하기
              </button>
            </div>
            <div class="today-proposal-item__bottom">
              <p>
                <span class="today-proposal-item__bottom-label">제안종목 : </span>
                <span class="today-proposal-item__bottom-value">
                  {{ Array.isArray(item.customers) ? item.customers.join(", ") : "" }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </article>

      <!-- Target Issues (Sell) -->
      <article class="today-proposal__card-violet">
        <header class="proposal-card__header">
          <div class="proposal-card__header-content">
            <div class="flex flex-col flex-1 shrink-0">
              <h3 class="proposal-card__title">
                오늘 <span class="text-[#2773ff]">매도</span> 타겟 종목
              </h3>
              <p class="proposal-card__desc" title="매도 타겟 종목으로 고객에게 제안해 볼 종목 입니다.">
                매도 타겟 종목으로 고객에게 제안해 볼 종목 입니다.
              </p>
            </div>
            <span class="today-proposal__badge today-proposal__badge--violet">
              <span class="today-proposal__badge-value">{{ issues.length }}</span>
              <span class="today-proposal__badge-unit">종목</span>
            </span>
          </div>
        </header>
        <div class="proposal-card__body">
          <div v-for="item in issues" :key="item.ticker" class="today-proposal-item">
            <div class="today-proposal-item__top">
              <div class="today-proposal-item__info">
                <div class="today-proposal-item__name-row">
                  <span class="today-proposal-item__name">{{ item.name }}</span>
                  <span class="today-proposal__badge-sell">매도제안</span>
                </div>
                <div class="today-proposal-item__meta">
                  <span class="today-proposal-item__price">{{ item.price }} <span>원</span></span>
                  <span :class="item.change.startsWith('+') ? 'today-proposal-item__change--up' : 'today-proposal-item__change--down'">
                    {{ item.change }}
                  </span>
                </div>
              </div>
              <button class="today-proposal__btn" @click="openProposalModal('target-stock', item)">
                제안하기
              </button>
            </div>
            <div class="today-proposal-item__bottom">
              <p>
                <span class="today-proposal-item__bottom-label">제안종목 : </span>
                <span class="today-proposal-item__bottom-value">
                  {{ Array.isArray(item.customers) ? item.customers.join(", ") : "" }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>

  </div>
</template>

<script>
/**
 * 기능: 대시보드 오늘의 제안 카드 컴포넌트
 * 오늘 타겟 고객, 매수 타겟 종목, 매도 타겟 종목 3개 카드를 표시합니다.
 * 각 항목의 제안하기 버튼 클릭 시 ContactProposalModal을 구동합니다.
 */
import {
  todayProposalCustomers,
  todayProposalStocks,
  todayIssueStocks,
} from "~/utils/mockData.js";
import "~/assets/css/pages/contact/TodayProposalCard/TodayProposalCard.css";

export default {
  name: "TodayProposalCard",
  props: {
    currentDate: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      customers: todayProposalCustomers,
      stocks: todayProposalStocks,
      issues: todayIssueStocks,
    };
  },
  methods: {
    openProposalModal(type, data) {
      this.$emit("propose", type, data);
    },
  },
};
</script>
