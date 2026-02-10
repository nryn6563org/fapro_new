<template>
  <div class="c-ranking-item">
    <!-- 순위 표시 영역 -->
    <div class="c-ranking-item__rank">
      <!-- 1~3위는 메달 이모지 표시 -->
      <span v-if="stock.rank <= 3" class="c-ranking-item__rank-icon">
        {{ stock.rank === 1 ? '🥇' : stock.rank === 2 ? '🥈' : '🥉' }}
      </span>
      <!-- 4위부터는 숫자로 표시 -->
      <span v-else class="c-ranking-item__rank-text">{{ stock.rank }}</span>
    </div>

    <!-- 종목 정보 컨텐츠 영역 -->
    <div class="c-ranking-item__content">
      <div class="c-ranking-item__top">
        <!-- 종목명 (상세 페이지 링크) -->
        <nuxt-link :to="`/stock/detail/${stock.code}`" class="c-ranking-item__name">
          {{ stock.name }}
        </nuxt-link>
        <!-- 종목코드 -->
        <span class="c-ranking-item__code">{{ stock.code }}</span>
        <!-- 등락률 표시 (양수: 빨강, 음수: 파랑) -->
        <span class="c-ranking-item__change" :class="stock.change >= 0 ? 'c-ranking-item__change--up' : 'c-ranking-item__change--down'">
          {{ stock.change >= 0 ? '+' : '' }}{{ stock.change }}%
        </span>
        
        <!-- 상태 뱃지 그룹 (매수신호, 이슈 등) -->
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

      <!-- 메타 정보 (고객 수, 평균 단가, 총 보유액) -->
      <div class="c-ranking-item__meta">
        <span>보유 고객 <span class="c-ranking-item__meta-highlight">{{ stock.customers }}명</span></span>
        <span>•</span>
        <span>평균 {{ stock.avgHolding }}</span>
        <span>•</span>
        <span>총액 {{ stock.totalValue }}</span>
      </div>
    </div>

    <!-- 액션 버튼 그룹 -->
    <div class="c-ranking-item__actions">
      <!-- 투자인사이트 모달 오픈 -->
      <button 
        class="c-ranking-item__action-btn c-ranking-item__action-btn--orange"
        title="투자인사이트"
        @click="$emit('show-insight', stock.code)"
      >
        <TrendingUp :size="18" />
      </button>
      <!-- AI리포트 모달 오픈 -->
      <button 
        class="c-ranking-item__action-btn c-ranking-item__action-btn--purple"
        title="AI리포트"
        @click="$emit('show-report', stock.code)"
      >
        <FileText :size="18" />
      </button>
      <!-- 뉴스요약 모달 오픈 -->
      <button 
        class="c-ranking-item__action-btn c-ranking-item__action-btn--blue"
        title="뉴스요약"
        @click="$emit('show-news', stock.code)"
      >
        <Newspaper :size="18" />
      </button>
      <!-- 커뮤니티요약 모달 오픈 -->
      <button 
        class="c-ranking-item__action-btn c-ranking-item__action-btn--green"
        title="커뮤니티요약"
        @click="$emit('show-community', stock.code)"
      >
        <MessageSquare :size="18" />
      </button>
      <!-- 관련 고객 리스트 모달 오픈 -->
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
  /**
   * 종목 랭킹 아이템 컴포넌트
   * 개별 종목의 순위, 정보, 상태 뱃지 및 다양한 모달 액션을 제공합니다.
   */
  name: 'RankingStockItem',
  props: {
    stock: {
      type: Object,
      required: true // 종목 정보 객체
    }
  },
  data() {
    return {
      // 종목에 표시될 수 있는 이벤트/상태 정의
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
    /**
     * 데모용으로 1~2개의 랜덤 이벤트를 선별합니다.
     */
    randomEvents() {
      const count = Math.floor(Math.random() * 2) + 1;
      return [...this.events].sort(() => 0.5 - Math.random()).slice(0, count);
    }
  }
}
</script>

<style scoped>
/* 외부 스타일 시트 임포트: BEM 클래스 정의 포함 */
@import '@/assets/css/page/stock/ranking.css';
</style>
