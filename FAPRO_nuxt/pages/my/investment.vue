<template>
  <div class="investment-page">
    <!-- 헤더 -->
    <div class="investment-page__header">
      <h1 class="investment-page__title">투자정보</h1>
      <p class="investment-page__subtitle">전문가 분석을 통한 핵심 투자 상품 큐레이션</p>
    </div>

    <!-- 카테고리 탭 -->
    <div class="investment-page__tabs">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="investment-page__tab-btn"
        :class="selectedCategory === cat.id ? 'investment-page__tab-btn--active' : 'investment-page__tab-btn--inactive'"
        @click="selectedCategory = cat.id"
      >
        <component :is="cat.icon" width="16" height="16" />
        {{ cat.label }}
      </button>
    </div>

    <!-- 상품 그리드 -->
    <div class="investment-page__product-grid">
      <div v-for="product in currentProducts" :key="product.id" class="investment-page__product-card">
        <div class="investment-page__product-header">
          <div class="investment-page__header-top">
            <div class="flex-1">
              <h3 class="investment-page__product-title">{{ product.name }}</h3>
              <p class="investment-page__product-desc">{{ product.description }}</p>
            </div>
            <component :is="getActiveIcon" width="24" height="24" />
          </div>
          <div class="investment-page__header-badges">
            <span v-if="product.type" class="investment-page__badge investment-page__badge--type">{{ product.type }}</span>
            <span v-if="product.issuer" class="investment-page__badge investment-page__badge--type">{{ product.issuer }}</span>
            <span v-if="product.risk" class="investment-page__badge" :class="getRiskBadgeClass(product.risk)">{{ product.risk }} 리스크</span>
            <span v-if="product.rating" class="investment-page__badge" :class="getRatingBadgeClass(product.rating)">등급: {{ product.rating }}</span>
          </div>
        </div>

        <div class="investment-page__card-body">
          <!-- AI 요약 -->
          <div class="investment-page__ai-summary">
            <div class="investment-page__ai-header">
              <svg class="investment-page__ai-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span class="investment-page__ai-label">AI 핵심 분석</span>
            </div>
            <p class="investment-page__ai-text">{{ product.aiSummary }}</p>
          </div>

          <!-- 수익률/금리 영역 -->
          <div
            class="investment-page__return-box"
            :class="isPositive(product) ? 'investment-page__return-box--plus' : 'investment-page__return-box--minus'"
          >
            <span class="investment-page__return-label">{{ getReturnLabel }}</span>
            <div class="investment-page__return-value" :class="isPositive(product) ? 'investment-page__return-value--plus' : 'investment-page__return-value--minus'">
              {{ getValueDisplay(product) }}
            </div>
          </div>

          <!-- 상세 정보 리스트 -->
          <div class="investment-page__details-list">
            <div v-for="(detail, dIdx) in getDetails(product)" :key="dIdx" class="investment-page__details-row">
              <span class="investment-page__details-label">{{ detail.label }}</span>
              <span class="investment-page__details-value">{{ detail.value }}</span>
            </div>
          </div>

          <button class="investment-page__btn-detail" @click="viewDetail(product)">상세 리포트 보기</button>
        </div>
      </div>
    </div>

    <!-- 유튜브 섹션 -->
    <div class="investment-page__youtube-header">
      <h2 class="investment-page__youtube-title">
        <svg class="investment-page__youtube-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon fill="white" points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
        하우투머니 TV
      </h2>
      <button class="investment-page__youtube-all-btn">전체보기</button>
    </div>

    <div class="investment-page__youtube-grid">
      <div v-for="video in youtubeVideos" :key="video.id" class="investment-page__video-card">
        <div class="investment-page__video-thumb-wrapper">
          <img :src="video.thumbnail" class="investment-page__video-thumb" alt="video thumbnail" />
          <span class="investment-page__video-duration">{{ video.duration }}</span>
          <div class="investment-page__play-overlay">
            <svg width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.5)"></circle>
              <polygon points="10 8 16 12 10 16 10 8"></polygon>
            </svg>
          </div>
        </div>
        <div class="investment-page__video-info">
          <h3 class="investment-page__video-title">{{ video.title }}</h3>
          <div class="investment-page__video-meta">
            <span>{{ video.channel }}</span>
            <span>조회수 {{ video.views }} • {{ video.uploadDate }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Investment Info Migration
 * - React InvestmentInfo를 Nuxt로 마이그레이션
 * - 펀드, 채권, ELS 세 가지 카테고리 지원
 * - AI 기반 상품 큐레이션 및 유튜브 연동 레이아웃
 */

export default {
  name: 'InvestmentInfoPage',
  components: {
    TrendingUpIcon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>' },
    ShieldIcon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>' },
    TargetIcon: { template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>' }
  },
  data() {
    return {
      selectedCategory: 'fund',
      categories: [
        { id: 'fund', label: '펀드 상품', icon: 'TrendingUpIcon' },
        { id: 'bond', label: '채권 상품', icon: 'ShieldIcon' },
        { id: 'els', label: 'ELS 상품', icon: 'TargetIcon' }
      ],
      funds: [
        { id: 1, name: '미래에셋 글로벌AI 펀드', description: 'AI 및 반도체 기술 기업 집중 투자', type: '주식형', return3m: 12.5, risk: '높음', minAmount: '1,000만', fee: '1.5%', aiSummary: 'AI 반도체 업황 호조로 강력한 상승세. 엔비디아 등 주요 기술주 실적 개선 지속 전망.' },
        { id: 2, name: '삼성 배당주 안정형 펀드', description: '우량 배당주 중심의 안정적 자산배분', type: '혼합형', return3m: 5.2, risk: '중간', minAmount: '500만', fee: '1.2%', aiSummary: '배당 성향이 높은 우량주 위주 포트폴리오. 금리 하락 국면에서 매력도 상승.' },
        { id: 3, name: 'KB 글로벌 테크 펀드', description: '글로벌 IT 대형주 및 신성장 기술주 분산', type: '주식형', return3m: 15.8, risk: '높음', minAmount: '1,000만', fee: '1.8%', aiSummary: '빅테크 기업들의 AI 클라우드 확장 수혜. 초장기 성장성 매우 우수.' },
        { id: 4, name: '신한 채권 안정 펀드', description: '국고채 및 우량 회사채 중심 저위험 펀드', type: '채권형', return3m: 2.8, risk: '낮음', minAmount: '300만', fee: '0.8%', aiSummary: '금리 안정화 수혜 및 높은 안정성 확보. 보수적 투자자에게 최적.' }
      ],
      bonds: [
        { id: 1, name: '삼성전자 회사채 3년', description: '국내 1위 반도체 기업의 안정적인 채권', issuer: '삼성전자', rating: 'AAA', yield: 4.2, maturity: '2027-12', minAmount: '1,000만', coupon: '4.0%', aiSummary: '견고한 재무구조로 신용등급 매우 안정적. 무위험에 가까운 투자처.' },
        { id: 2, name: 'SK하이닉스 회사채 5년', description: 'HBM 선두주자 SK하이닉스 중장기 채권', issuer: 'SK하이닉스', rating: 'AA+', yield: 4.8, maturity: '2029-06', minAmount: '1,000만', coupon: '4.5%', aiSummary: 'HBM 시장 지배력 기반 실적 개선 지속. AA+ 등급 및 여유로운 수익률.' }
      ],
      els: [
        { id: 1, name: 'KOSPI200 리자드형 ELS', description: 'KOSPI200 기반 지수형 스텝다운 구조', underlying: 'KOSPI200', maxReturn: 18.0, knockIn: 55, maturity: '3년', risk: '중간', aiSummary: '조기상환 가능성이 높은 스텝다운 형. 55% 낙인이상 유지 시 고수익 확정.' },
        { id: 2, name: 'S&P500 원금보장형 ELS', description: '미국 S&P500 지수 연동 원금 100% 보장', underlying: 'S&P500', maxReturn: 12.0, knockIn: 60, maturity: '2년', risk: '낮음', aiSummary: '원금 100% 보장과 동시에 북미 시장 수익률 공유 가능.' }
      ],
      youtubeVideos: [
        { id: 1, thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400', title: '2026년 상반기 투자 전략 - AI 반도체 중심 포트폴리오', channel: '스마트 투자 TV', views: '12.5만', duration: '15:24', uploadDate: '2일 전' },
        { id: 2, thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400', title: 'ELS 투자 가이드 - 초보자도 쉽게 이해하는 구조화 상품', channel: '금융 전문가', views: '8.9만', duration: '22:15', uploadDate: '5일 전' },
        { id: 3, thumbnail: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400', title: '채권 투자의 모든 것 - 금리 상승기 대응 전략', channel: '재테크 마스터', views: '20.3만', duration: '18:40', uploadDate: '1주 전' }
      ]
    }
  },
  computed: {
    currentProducts() {
      if (this.selectedCategory === 'fund') { return this.funds }
      if (this.selectedCategory === 'bond') { return this.bonds }
      return this.els
    },
    getActiveIcon() {
      const cat = this.categories.find(c => c.id === this.selectedCategory)
      return cat ? cat.icon : 'TrendingUpIcon'
    },
    getReturnLabel() {
      if (this.selectedCategory === 'fund') { return '3개월 수익률' }
      if (this.selectedCategory === 'bond') { return '예상 수익률' }
      return '최대 연 수익률'
    }
  },
  methods: {
    isPositive(p) {
      const val = p.return3m || p.yield || p.maxReturn || 0
      return val >= 0
    },
    getValueDisplay(p) {
      const val = p.return3m || p.yield || p.maxReturn || 0
      return (val >= 0 ? '+' : '') + val + '%'
    },
    getDetails(p) {
      const details = []
      if (p.minAmount) { details.push({ label: '최소 투자금액', value: p.minAmount + '원' }) }
      if (p.fee) { details.push({ label: '운용 수수료', value: p.fee }) }
      if (p.maturity) { details.push({ label: '만기 시점', value: p.maturity }) }
      if (p.coupon) { details.push({ label: '표면 금리', value: p.coupon }) }
      if (p.knockIn) { details.push({ label: '낙인 배리어', value: p.knockIn + '%' }) }
      return details
    },
    getRiskBadgeClass(risk) {
      if (risk === '높음') { return 'investment-page__badge--risk-high' }
      if (risk === '중간') { return 'investment-page__badge--risk-medium' }
      return 'investment-page__badge--risk-low'
    },
    getRatingBadgeClass(rating) {
      if (rating.startsWith('AAA')) { return 'investment-page__badge--rating-aaa' }
      if (rating.startsWith('AA')) { return 'investment-page__badge--rating-aa' }
      return 'investment-page__badge--rating-a'
    },
    viewDetail(product) {
      alert(`${product.name} 상세 리포트를 생성 중입니다...`)
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/my/my-investment-style.css';
</style>
