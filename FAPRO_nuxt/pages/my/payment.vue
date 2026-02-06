<template>
  <div class="payment-page">
    <!-- 헤더 -->
    <div class="payment-page__header">
      <h1 class="payment-page__title">결제 정보</h1>
      <p class="payment-page__subtitle">구독 플랜 관리 및 서비스 이용 내역</p>
    </div>

    <!-- 구독 플랜 그리드 -->
    <div class="payment-page__plan-grid">
      <div
        v-for="plan in plans"
        :key="plan.name"
        class="payment-page__plan-card"
        :class="{ 'payment-page__plan-card--active': plan.current }"
      >
        <span v-if="plan.current" class="payment-page__plan-badge">현재 이용 중</span>
        <div class="payment-page__plan-header">
          <h3 class="payment-page__plan-name">{{ plan.name }}</h3>
          <div class="payment-page__plan-price-box">
            <span class="payment-page__plan-price">₩{{ plan.price.toLocaleString() }}</span>
            <span class="payment-page__plan-period">/월</span>
          </div>
        </div>

        <ul class="payment-page__feature-list">
          <li v-for="(feat, fIdx) in plan.features" :key="fIdx" class="payment-page__feature-item">
            <svg class="payment-page__feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span class="payment-page__feature-text">{{ feat }}</span>
          </li>
        </ul>

        <button
          class="payment-page__btn-plan"
          :class="plan.current ? 'payment-page__btn-plan--outline' : 'payment-page__btn-plan--primary'"
          :disabled="plan.current"
          @click="changePlan(plan.name)"
        >
          {{ plan.current ? '현재 사용 중인 플랜' : '플랜 변경하기' }}
        </button>
      </div>
    </div>

    <!-- 결제 수단 카드 -->
    <div class="payment-page__card">
      <div class="payment-page__card-header">
        <h2 class="payment-page__card-title">결제 수단</h2>
        <span class="payment-page__card-desc">등록된 카드로 자동 결제됩니다</span>
      </div>
      <div class="payment-page__card-body">
        <div class="payment-page__method-row">
          <div class="payment-page__method-info">
            <div class="payment-page__method-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <div class="payment-page__method-details">
              <p class="payment-page__method-name">신한카드 (**** 1234)</p>
              <p class="payment-page__method-expiry">만료일: 12/25</p>
            </div>
          </div>
          <div class="payment-page__method-actions">
            <button class="payment-page__btn-method" @click="editMethod">변경</button>
            <button class="payment-page__btn-method" @click="deleteMethod">삭제</button>
          </div>
        </div>
        <button class="payment-page__btn-add-method" @click="addMethod">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          새로운 결제 수단 추가
        </button>
      </div>
    </div>

    <!-- 결제 내역 카드 -->
    <div class="payment-page__card">
      <div class="payment-page__card-header">
        <h2 class="payment-page__card-title">최근 결제 내역</h2>
      </div>
      <div class="payment-page__card-body">
        <div class="payment-page__history-list">
          <div v-for="(hist, hIdx) in history" :key="hIdx" class="payment-page__history-item">
            <div class="payment-page__history-left">
              <div class="payment-page__history-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div class="payment-page__history-details">
                <p class="payment-page__history-title">{{ hist.plan }} 플랜 정기결제</p>
                <p class="payment-page__history-date">{{ hist.date }}</p>
              </div>
            </div>
            <div class="payment-page__history-right">
              <p class="payment-page__history-amount">₩{{ hist.amount.toLocaleString() }}</p>
              <span class="payment-page__status-badge">{{ hist.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Payment Info Migration
 * - React PaymentInfo를 Nuxt로 마이그레이션
 * - 구독 플랜 선택 및 활성 상태 표시
 * - 결제 수단 관리 및 히스토리 레이아웃 구현
 */

export default {
  name: 'PaymentPage',
  data() {
    return {
      plans: [
        {
          name: 'Basic',
          price: 100000,
          features: ['기본 종목 분석', '월간 리포트 제공', '고객 관리 (최대 50명)'],
          current: false
        },
        {
          name: 'Professional',
          price: 150000,
          features: ['AI 시그널 실시간 분석', '프리미엄 리포트 무제한', '고객 관리 (최대 200명)', '퀀트 투자 전략 제공', 'AI 고객 자동 매칭'],
          current: true
        }
      ],
      history: [
        { date: '2026-02-01', plan: 'Professional', amount: 150000, status: '결제완료' },
        { date: '2026-01-01', plan: 'Professional', amount: 150000, status: '결제완료' },
        { date: '2025-12-01', plan: 'Basic', amount: 100000, status: '결제완료' }
      ]
    }
  },
  methods: {
    changePlan(name) {
      alert(`${name} 플랜으로 변경을 진행하시겠습니까?`)
    },
    addMethod() {
      alert('카드 등록 팝업을 준비 중입니다.')
    },
    editMethod() { alert('기존 결제 수단을 변경하시겠습니까?') },
    deleteMethod() {
      if (confirm('결제 수단을 삭제하시겠습니까? 삭제 시 자동 결제가 중단됩니다.')) {
        alert('삭제되었습니다.')
      }
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/my/my-payment-style.css';
</style>
