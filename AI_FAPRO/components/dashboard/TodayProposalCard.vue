<template>
  <div class="proposal-wrapper">
    <div class="today-proposal__header">
      <h2 class="today-proposal__header-title">
        {{ currentDate }} 오늘의 제안
      </h2>
      <button
        class="today-proposal__header-refresh-btn"
        @click="$emit('refresh')"
      >
        <refresh-cw-icon
          size="16"
          class="today-proposal__header-refresh-icon"
        />
        <span class="today-proposal__header-refresh-text">실시간 업데이트</span>
      </button>
    </div>

    <!-- Cards Container -->
    <div class="today-proposal__grid">
      <!-- 1) Buy Target -->
      <article class="today-proposal__card-teal">
        <header class="proposal-card__header">
          <div class="proposal-card__header-content">
            <div>
              <h3 class="proposal-card__title">오늘 타겟 고객</h3>
              <p class="proposal-card__desc">
                AI매매신호 발생 종목 대상 매수 또는 매도를 진행할 고객 입니다.
              </p>
            </div>
            <span class="today-proposal__badge today-proposal__badge--teal"
              >{{ customers.length }}명</span
            >
          </div>
        </header>
        <div class="proposal-card__body">
          <div v-for="item in customers" :key="item.id" class="proposal-item">
            <div class="proposal-item__top">
              <div class="proposal-item__info">
                <div class="proposal-item__name-row">
                  <span class="proposal-item__name">{{ item.name }}</span>
                  <span
                    :class="
                      item.action === 'buy'
                        ? 'today-proposal__badge-buy'
                        : 'today-proposal__badge-sell'
                    "
                  >
                    {{ item.action === "buy" ? "매수제안" : "매도제안" }}
                  </span>
                </div>
                <div class="proposal-item__meta">
                  {{ item.portfolio }} · {{ item.investmentStyle }}
                </div>
              </div>
              <button
                class="today-proposal__btn today-proposal__btn--teal"
                @click="openProposalModal('target-customer', item)"
              >
                <send-icon size="12" class="today-proposal__btn-icon" />
                제안하기
              </button>
            </div>
            <div class="proposal-item__bottom">
              제안 종목 :
              {{
                Array.isArray(item.targetStock)
                  ? item.targetStock.join(", ")
                  : item.targetStock
              }}
            </div>
          </div>
        </div>
      </article>

      <!-- Target Stocks (Buy) -->
      <article
        class="today-proposal__card-orange"
      >
        <header class="proposal-card__header">
          <div class="proposal-card__header-content">
            <div>
              <h3 class="proposal-card__title">오늘 매수 타겟 종목</h3>
              <p class="proposal-card__desc">
                매수 타겟 종목으로 고객에게 제안해 볼 종목 입니다.
              </p>
            </div>
            <span class="today-proposal__badge today-proposal__badge--orange"
              >{{ stocks.length }}종목</span
            >
          </div>
        </header>
        <div class="proposal-card__body">
          <div
            v-for="item in stocks"
            :key="item.ticker"
            class="today-proposal__item-group"
          >
            <div class="today-proposal-item__top">
              <div class="today-proposal-item__info">
                <div class="today-proposal-item__name-row">
                  <span class="today-proposal-item__name">{{ item.name }}</span>
                  <span
                    class="today-proposal__badge-buy"
                    >매수제안</span
                  >
                </div>
                <div class="today-proposal-item__meta">
                  {{ item.price }}
                  <span
                    :class="
                      item.change.startsWith('+')
                        ? 'today-proposal-item__change--up'
                        : 'today-proposal-item__change--down'
                    "
                    >{{ item.change }}</span
                  >
                </div>
              </div>
              <button
                class="today-proposal__btn today-proposal__btn--orange"
                @click="openProposalModal('target-stock', item)"
              >
                <send-icon size="12" class="today-proposal__btn-icon" />
                제안하기
              </button>
            </div>
            <div class="today-proposal-item__bottom">
              제안 적합 고객 :
              {{
                Array.isArray(item.customers) ? item.customers.join(", ") : ""
              }}
            </div>
          </div>
        </div>
      </article>

      <!-- Target Issues (Sell) -->
      <article
        class="today-proposal__card-violet"
      >
        <header class="proposal-card__header">
          <div class="proposal-card__header-content">
            <div>
              <h3 class="proposal-card__title">오늘 매도 타겟 종목</h3>
              <p class="proposal-card__desc">
                매도 타겟 종목으로 고객에게 제안해 볼 종목 입니다.
              </p>
            </div>
            <span class="today-proposal__badge today-proposal__badge--violet"
              >{{ issues.length }}종목</span
            >
          </div>
        </header>
        <div class="proposal-card__body">
          <div v-for="item in issues" :key="item.ticker" class="proposal-item">
            <div class="proposal-item__top">
              <div class="proposal-item__info">
                <div class="proposal-item__name-row">
                  <span class="proposal-item__name">{{ item.name }}</span>
                  <span
                    class="today-proposal__badge-sell"
                    >매도제안</span
                  >
                </div>
                <div class="proposal-item__meta">
                  {{ item.price }}
                  <span
                    :class="
                      item.change.startsWith('+')
                        ? 'proposal-item__change--up'
                        : 'proposal-item__change--down'
                    "
                    >{{ item.change }}</span
                  >
                </div>
              </div>
              <button
                class="today-proposal__btn today-proposal__btn--violet"
                @click="openProposalModal('target-stock', item)"
              >
                <send-icon size="12" class="today-proposal__btn-icon" />
                제안하기
              </button>
            </div>
            <div class="proposal-item__bottom">
              제안 적합 고객 :
              {{
                Array.isArray(item.customers) ? item.customers.join(", ") : ""
              }}
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
import { SendIcon, RefreshCwIcon } from "vue-feather-icons";
import {
  todayProposalCustomers,
  todayProposalStocks,
  todayIssueStocks,
} from "~/utils/mockData.js";
import "~/assets/css/pages/index/TodayProposalCard/TodayProposalCard.css";

export default {
  name: "TodayProposalCard",
  components: {
    SendIcon,
    RefreshCwIcon,
  },
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

