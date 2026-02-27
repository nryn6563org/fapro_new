<template>
  <div class="trading-signal-card">
    <div class="trading-signal-card__header-box">
      <div class="trading-signal-card__info-row">
        <div class="trading-signal-card__info-left">
          <div class="trading-signal-card__time-badge">
            <span
              :class="[
                'trading-signal-card__time-text',
                type === 'buy'
                  ? 'trading-signal-card__time-text--buy'
                  : 'trading-signal-card__time-text--sell'
              ]"
              >{{ signal.time }} {{ type === 'buy' ? '매수' : '매도' }}신호 발생</span
            >
          </div>
          <h3 class="trading-signal-card__name">{{ signal.name }}</h3>
          <div class="trading-signal-card__price-row">
            <span class="trading-signal-card__price"
              >{{ type === 'buy' ? '매수가' : '매도가' }} {{ signal.price }}</span
            >
            <span v-if="type === 'sell'" class="trading-signal-card__change">{{
              signal.change
            }}</span>
          </div>
        </div>
      </div>

      <div class="trading-signal-card__actions">
        <button class="trading-signal-card__btn-detail" @click="$emit('toggle-detail')">
          <trending-up-icon size="14" class="trading-signal-card__btn-icon" />
          {{ isDetailOpen ? '매매내역 접기' : '매매내역 보기' }}
        </button>
        <button class="trading-signal-card__btn-report" @click="$emit('open-report', signal)">
          <star-icon size="14" class="trading-signal-card__btn-icon" />
          AI 리포트
        </button>
      </div>
    </div>

    <div v-if="signal.reason" class="trading-signal-card__reason-box">
      <h4 class="trading-signal-card__reason-title">시그널 발생 사유</h4>
      <p class="trading-signal-card__reason-text">{{ signal.reason }}</p>
    </div>

    <!-- 상세 영역 (전환 애니메이션은 부모나 CSS 트랜지션으로 처리) -->
    <div v-show="isDetailOpen" class="trading-signal-card__detail-box">
      <!-- 매매 이력 (간단히 테이블로 표현. D3차트는 생략하거나 단순화) -->
      <h4 class="trading-signal-card__reason-title">가격/매매 추이</h4>
      <div class="trading-signal-card__table-wrapper">
        <table class="trading-signal-card__table">
          <thead>
            <tr>
              <th class="trading-signal-card__th">일자</th>
              <th class="trading-signal-card__th">신호</th>
              <th class="trading-signal-card__th trading-signal-card__table-right">가격</th>
              <th class="trading-signal-card__th trading-signal-card__table-right">수익률</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(trade, idx) in signal.tradeHistory" :key="idx">
              <td
                :class="[
                  'trading-signal-card__td',
                  idx === signal.tradeHistory.length - 1 ? 'trading-signal-card__td--last' : ''
                ]"
              >
                {{ trade.date }}
              </td>
              <td
                :class="[
                  'trading-signal-card__td',
                  idx === signal.tradeHistory.length - 1 ? 'trading-signal-card__td--last' : ''
                ]"
              >
                <span
                  :class="[
                    'trading-signal-card__badge',
                    trade.signal === '매수'
                      ? 'trading-signal-card__badge--buy'
                      : 'trading-signal-card__badge--sell'
                  ]"
                >
                  {{ trade.signal }}
                </span>
              </td>
              <td
                :class="[
                  'trading-signal-card__td',
                  'trading-signal-card__table-right',
                  idx === signal.tradeHistory.length - 1 ? 'trading-signal-card__td--last' : ''
                ]"
              >
                {{ trade.price }}
              </td>
              <td
                :class="[
                  'trading-signal-card__td',
                  'trading-signal-card__table-right',
                  getReturnClass(trade.return),
                  idx === signal.tradeHistory.length - 1 ? 'trading-signal-card__td--last' : ''
                ]"
              >
                {{ trade.return }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: AI 매매 신호 (매수/매도) 개별 카드 렌더링
 */
import { TrendingUpIcon, StarIcon } from 'vue-feather-icons'
import '~/assets/css/pages/signals/TradingSignalCard.css'

export default {
  name: 'TradingSignalCard',
  components: {
    TrendingUpIcon,
    StarIcon
  },
  props: {
    signal: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: 'buy', // 'buy' or 'sell'
      validator: (value) => ['buy', 'sell'].includes(value)
    },
    isDetailOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getReturnClass(ret) {
      if (!ret || ret === '-') return 'trading-signal-card__return--neutral'
      return ret.startsWith('+')
        ? 'trading-signal-card__return--positive'
        : 'trading-signal-card__return--negative'
    }
  }
}
</script>
