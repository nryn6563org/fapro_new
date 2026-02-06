<template>
  <div class="p-ranking">
    <header class="p-ranking__header">
      <h2 class="p-ranking__title">고객 보유종목 랭킹</h2>
      <p class="p-ranking__desc">우리 고객들이 가장 많이 보유하고 있는 종목 순위입니다.</p>
    </header>

    <div class="p-ranking__content">
      <div class="p-ranking__table-wrapper">
        <table class="p-ranking__table">
          <thead>
            <tr>
              <th class="p-ranking__th">순위</th>
              <th class="p-ranking__th">종목명</th>
              <th class="p-ranking__th">현재가</th>
              <th class="p-ranking__th">등락률</th>
              <th class="p-ranking__th">보유 고객 수</th>
              <th class="p-ranking__th">AI 진단</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in rankings" :key="item.code" class="p-ranking__tr">
              <td class="p-ranking__td p-ranking__td--rank">{{ index + 1 }}</td>
              <td class="p-ranking__td p-ranking__td--name">
                <div class="p-ranking__stock-info">
                  <span class="p-ranking__stock-name">{{ item.name }}</span>
                  <span class="p-ranking__stock-code">{{ item.code }}</span>
                </div>
              </td>
              <td class="p-ranking__td p-ranking__td--price">{{ item.price.toLocaleString() }}원</td>
              <td class="p-ranking__td p-ranking__td--change" :class="item.change >= 0 ? 'text-red-500' : 'text-blue-500'">
                {{ item.change > 0 ? '+' : '' }}{{ item.change }}%
              </td>
              <td class="p-ranking__td">{{ item.holders.toLocaleString() }}명</td>
              <td class="p-ranking__td">
                <span class="p-ranking__badge" :class="`p-ranking__badge--${item.rating}`">{{ item.ratingText }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockRankingPage',
  data() {
    return {
      rankings: [
        { name: '삼성전자', code: '005930', price: 74200, change: 1.5, holders: 12503, rating: 'buy', ratingText: '매수' },
        { name: 'SK하이닉스', code: '000660', price: 132500, change: 2.8, holders: 8420, rating: 'strong-buy', ratingText: '강력매수' },
        { name: 'POSCO홀딩스', code: '005490', price: 450000, change: -0.5, holders: 6100, rating: 'hold', ratingText: '보유' },
        { name: '현대차', code: '005380', price: 235000, change: -1.2, holders: 5900, rating: 'hold', ratingText: '보유' },
        { name: 'LG에너지솔루션', code: '373220', price: 412000, change: 0.8, holders: 4800, rating: 'buy', ratingText: '매수' },
        { name: 'NAVER', code: '035420', price: 205000, change: -2.3, holders: 4200, rating: 'sell', ratingText: '매도' },
        { name: '카카오', code: '035720', price: 54300, change: 1.1, holders: 3900, rating: 'hold', ratingText: '보유' },
        { name: '삼성바이오로직스', code: '207940', price: 820000, change: 0.5, holders: 3100, rating: 'buy', ratingText: '매수' },
        { name: '기아', code: '000270', price: 95000, change: -0.8, holders: 2800, rating: 'buy', ratingText: '매수' },
        { name: 'KB금융', code: '105560', price: 62000, change: 3.2, holders: 2500, rating: 'strong-buy', ratingText: '강력매수' }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/stock/ranking.css';
</style>
