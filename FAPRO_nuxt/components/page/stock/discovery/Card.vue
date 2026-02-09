<template>
  <div class="c-discovery-card">
    <div class="c-discovery-card__top">
      <div class="c-discovery-card__info">
        <!-- Header -->
        <div class="c-discovery-card__header">
          <div class="c-discovery-card__score">{{ stock.score }}</div>
          <div class="c-discovery-card__name-group">
            <div class="c-discovery-card__name-row">
              <nuxt-link :to="`/stock/detail/${stock.stockCode}`" class="c-discovery-card__name">
                {{ stock.stockName }}
              </nuxt-link>
              <span class="c-discovery-card__code">({{ stock.stockCode }})</span>
              <button @click="isFavorite = !isFavorite">
                <Star 
                  :size="16" 
                  :class="isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'" 
                  class="transition-colors"
                />
              </button>
            </div>
            <div class="c-discovery-card__price-row">
              <span class="c-discovery-card__price">{{ stock.currentPrice }}</span>
              <span :class="isPositive ? 'text-red-500' : 'text-blue-500'" class="text-xs font-bold">
                {{ stock.changeRate }} ({{ stock.changeAmount }})
              </span>
            </div>
          </div>
        </div>

        <!-- Tags -->
        <div class="c-discovery-card__tags">
          <span 
            v-for="tag in stock.tags" 
            :key="tag" 
            class="c-badge"
            :class="`c-badge--status-${tag}`"
          >
            <component :is="getTagIcon(tag)" :size="10" class="mr-1" />
            {{ getTagLabel(tag) }}
          </span>
        </div>

        <!-- Reason -->
        <div class="c-discovery-card__reason">
          <div class="c-discovery-card__reason-title">오늘 Pick 종목 선정 이유</div>
          <p class="c-discovery-card__reason-text">{{ stock.reason }}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="c-discovery-card__actions">
        <nuxt-link :to="`/stock/detail/${stock.stockCode}`" class="c-btn c-btn--primary c-btn--sm w-full">
          종목 상세보기
          <ArrowRight :size="14" class="ml-1.5" />
        </nuxt-link>
        <button class="c-btn c-btn--ghost c-btn--sm w-full border border-gray-100" @click="$emit('send-proposal', stock)">
          <Send :size="14" class="mr-1.5" />
          제안서 보내기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiscoveryStockCard',
  props: {
    stock: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFavorite: false
    }
  },
  computed: {
    isPositive() {
      return this.stock.changeRate.startsWith('+');
    }
  },
  methods: {
    getTagIcon(tag) {
      const icons = {
        buy_signal: 'TrendingUp',
        featured: 'Star',
        watchlist: 'Eye',
        popular: 'Users',
        discussion: 'MessageCircle',
        ai_pick: 'Zap',
        ai_report: 'FileText',
        issue: 'AlertCircle'
      };
      return icons[tag] || 'HelpCircle';
    },
    getTagLabel(tag) {
      const labels = {
        buy_signal: '매수신호발생',
        featured: '오늘특징주선정',
        watchlist: '내관심종목',
        popular: '회원보유다수',
        discussion: '토론급증종목',
        ai_pick: 'AI추천',
        ai_report: 'AI리포트생성',
        issue: '이슈발생'
      };
      return labels[tag] || tag;
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/stock/discovery.css';
</style>
