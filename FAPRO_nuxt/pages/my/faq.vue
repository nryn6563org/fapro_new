<template>
  <div class="faq-page">
    <!-- 헤더 -->
    <div class="faq-page__header">
      <h1 class="faq-page__title">FAQ</h1>
      <p class="faq-page__subtitle">자주 묻는 질문과 답변을 확인하세요</p>
    </div>

    <!-- 검색 바 -->
    <div class="faq-page__search-box">
      <svg class="faq-page__search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
      <input
        v-model="searchQuery"
        type="text"
        class="faq-page__search-input"
        placeholder="도움말 검색..."
      />
    </div>

    <!-- 카테고리별 FAQ 리스트 -->
    <div v-for="(cat, cIdx) in filteredFaqs" :key="cIdx" class="faq-page__category">
      <div class="faq-page__category-header">
        <svg class="faq-page__category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <h2 class="faq-page__category-title">{{ cat.category }}</h2>
      </div>

      <div class="faq-page__list">
        <div v-for="(item, iIdx) in cat.items" :key="iIdx" class="faq-page__item">
          <button
            class="faq-page__trigger"
            @click="toggleItem(cIdx, iIdx)"
          >
            <span class="faq-page__question">{{ item.question }}</span>
            <svg
              class="faq-page__chevron"
              :class="{ 'faq-page__chevron--active': isOpen(cIdx, iIdx) }"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div
            v-if="isOpen(cIdx, iIdx)"
            class="faq-page__content"
          >
            <p class="faq-page__answer">{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 추가 문의 카드 -->
    <div class="faq-page__contact">
      <h1 class="faq-page__contact-title">추가 문의</h1>
      <p class="faq-page__contact-desc">원하는 답변을 찾지 못하셨나요? 고객지원팀에 문의하세요.</p>

      <div class="faq-page__contact-list">
        <div class="faq-page__contact-item">
          <span class="faq-page__contact-label">이메일</span>
          <span class="faq-page__contact-value">support@fadashboard.com</span>
        </div>
        <div class="faq-page__contact-item">
          <span class="faq-page__contact-label">전화번호</span>
          <span class="faq-page__contact-value">1588-1234</span>
        </div>
        <div class="faq-page__contact-item">
          <span class="faq-page__contact-label">운영시간</span>
          <span class="faq-page__contact-value">평일 09:00 - 18:00 (주말/공휴일 제외)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * FAQ Page Migration
 * - React FAQ를 Nuxt로 마이그레이션
 * - 카테고리별 아코디언 인터페이스 및 검색 필터링 구현
 * - 외부 라이브러리 없이 순수 Vue state로 아코디언 제어
 */

export default {
  name: 'FAQPage',
  data() {
    return {
      searchQuery: '',
      openItems: {}, // { categoryIndex_itemIndex: boolean }
      faqs: [
        {
          category: '일반',
          items: [
            { question: 'FA Dashboard는 어떤 서비스인가요?', answer: 'FA Dashboard는 금융 전문가(FA)를 위한 종합 고객 및 종목 관리 시스템입니다. 고객 포트폴리오 관리, 종목 분석, AI 기반 투자 시그널 등 다양한 기능을 제공합니다.' },
            { question: '무료 체험이 가능한가요?', answer: '네, 14일간 무료 체험이 가능합니다. Professional 플랜의 모든 기능을 제한 없이 사용하실 수 있습니다.' }
          ]
        },
        {
          category: '종목관리',
          items: [
            { question: '종목 데이터는 얼마나 자주 업데이트되나요?', answer: '실시간 시세 데이터는 장중에 실시간으로 업데이트되며, 기업 정보 및 재무 데이터는 매일 업데이트됩니다.' },
            { question: '라씨 시그널은 무엇인가요?', answer: '라씨 시그널은 AI 기반 매매 신호 시스템으로, 과거 데이터와 시장 상황을 분석하여 매수/매도 타이밍을 추천해드립니다.' }
          ]
        },
        {
          category: '고객관리',
          items: [
            { question: '고객 정보는 안전하게 보관되나요?', answer: '고객 정보는 암호화되어 저장되며, 금융보안 표준을 준수합니다. 정기적인 보안 감사를 통해 안전성을 유지하고 있습니다.' },
            { question: '고객 수 제한이 있나요?', answer: '플랜에 따라 다릅니다. Basic 플랜은 최대 50명, Professional 플랜은 200명, Enterprise 플랜은 무제한입니다.' }
          ]
        },
        {
          category: '결제',
          items: [
            { question: '플랜을 중도에 변경할 수 있나요?', answer: '네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 변경된 요금은 다음 결제일부터 적용됩니다.' },
            { question: '환불 정책은 어떻게 되나요?', answer: '결제 후 7일 이내에는 전액 환불이 가능합니다. 단, 서비스를 실제로 사용한 경우 일할 계산하여 환불해드립니다.' }
          ]
        }
      ]
    }
  },
  computed: {
    filteredFaqs() {
      if (!this.searchQuery) { return this.faqs }

      return this.faqs.map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
          item.question.includes(this.searchQuery) ||
          item.answer.includes(this.searchQuery)
        )
      })).filter(cat => cat.items.length > 0)
    }
  },
  methods: {
    toggleItem(cIdx, iIdx) {
      const key = `${cIdx}_${iIdx}`
      this.$set(this.openItems, key, !this.openItems[key])
    },
    isOpen(cIdx, iIdx) {
      return this.openItems[`${cIdx}_${iIdx}`]
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/common/faq-style.css';
</style>
