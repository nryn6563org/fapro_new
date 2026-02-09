<template>
  <div class="c-ranking-item">
    <!-- Rank -->
    <div class="c-ranking-item__rank">
      <span v-if="stock.rank <= 3" class="c-ranking-item__rank-icon">
        {{ stock.rank === 1 ? '🥇' : stock.rank === 2 ? '🥈' : '🥉' }}
      </span>
      <span v-else class="c-ranking-item__rank-text">{{ stock.rank }}</span>
    </div>

    <!-- Content -->
    <div class="c-ranking-item__content">
      <div class="c-ranking-item__top">
        <nuxt-link :to="`/stock/detail/${stock.code}`" class="c-ranking-item__name">
          {{ stock.name }}
        </nuxt-link>
        <span class="c-ranking-item__code">{{ stock.code }}</span>
        <span class="c-ranking-item__change" :class="stock.change >= 0 ? 'text-red-500' : 'text-blue-500'">
          {{ stock.change >= 0 ? '+' : '' }}{{ stock.change }}%
        </span>
        
        <!-- Badges -->
        <div class="c-ranking-item__badges">
          <span 
            v-for="(event, idx) in randomEvents" 
            :key="idx"
            class="c-badge"
            :class="`c-badge--status-${event.type}`"
            :title="event.label"
          >
            <component :is="event.icon" :size="10" class="mr-0.5" />
            {{ event.label }}
          </span>
        </div>
      </div>

      <div class="c-ranking-item__meta">
        <span>보유 고객 <span class="c-ranking-item__meta-highlight">{{ stock.customers }}명</span></span>
        <span>•</span>
        <span>평균 {{ stock.avgHolding }}</span>
        <span>•</span>
        <span>총액 {{ stock.totalValue }}</span>
      </div>
    </div>

    <!-- Actions -->
    <div class="c-ranking-item__actions">
      <button 
        class="c-ranking-item__action-btn c-ranking-item__action-btn--orange"
        title="투자인사이트"
        @click="$emit('show-insight', stock.code)"
      >
        <TrendingUp :size="18" />
      </button>
      <button 
        class="c-ranking-item__action-btn c-ranking-item__action-btn--purple"
        title="AI리포트"
        @click="$emit('show-report', stock.code)"
      >
        <FileText :size="18" />
      </button>
      <button 
        class="c-ranking-item__action-btn c-ranking-item__action-btn--blue"
        title="뉴스요약"
        @click="$emit('show-news', stock.code)"
      >
        <Newspaper :size="18" />
      </button>
      <button 
        class="c-ranking-item__action-btn c-ranking-item__action-btn--green"
        title="커뮤니티요약"
        @click="$emit('show-community', stock.code)"
      >
        <MessageSquare :size="18" />
      </button>
      <button 
        class="c-ranking-item__action-btn c-ranking-item__action-btn--gray"
        title="관련 고객 보기"
        @click="$emit('show-customers', stock.code)"
      >
        <Users :size="18" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RankingStockItem',
  props: {
    stock: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      events: [
        { type: 'buySignal', icon: 'TrendingUp', label: '매수신호' },
        { type: 'issue', icon: 'AlertCircle', label: '이슈발생' },
        { type: 'aiReport', icon: 'FileText', label: 'AI리포트' },
        { type: 'aiRecommend', icon: 'Brain', label: 'AI추천' },
        { type: 'popular', icon: 'Users', label: '회원보유다수' }
      ]
    }
  },
  computed: {
    randomEvents() {
      // For demo purposes, pick 1-2 random events
      const count = Math.floor(Math.random() * 2) + 1;
      return [...this.events].sort(() => 0.5 - Math.random()).slice(0, count);
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/stock/ranking.css';
</style>
