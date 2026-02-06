<template>
  <div class="p-my-payment">
    <header class="p-my-payment__header">
      <h2 class="p-my-payment__title">결제 정보</h2>
      <p class="p-my-payment__desc">현재 이용 중인 멤버십과 결제 내역을 확인합니다.</p>
    </header>

    <div class="p-my-payment__content">
      <!-- Membership Card -->
      <div class="p-my-payment__membership">
        <div class="p-my-payment__membership-info">
          <span class="p-my-payment__badge">PREMIUM</span>
          <h3 class="p-my-payment__plan-name">FA Pro 프리미엄 요금제</h3>
          <p class="p-my-payment__period">다음 결제일: 2026년 3월 15일</p>
        </div>
        <div class="p-my-payment__membership-action">
          <span class="p-my-payment__price">월 59,000원</span>
          <button class="c-btn c-btn--outline c-btn--sm">멤버십 변경</button>
        </div>
      </div>

      <!-- Payment History -->
      <div class="p-my-payment__history">
        <h3 class="p-my-payment__subtitle">결제 내역</h3>
        <table class="p-my-payment__table">
          <thead>
            <tr>
              <th>결제일</th>
              <th>상품명</th>
              <th>결제금액</th>
              <th>상태</th>
              <th>영수증</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in history" :key="item.id">
              <td>{{ item.date }}</td>
              <td>{{ item.plan }}</td>
              <td>{{ item.amount.toLocaleString() }}원</td>
              <td><span class="p-my-payment__status p-my-payment__status--paid">결제완료</span></td>
              <td><button class="c-btn c-btn--ghost c-btn--xs">보기</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPaymentPage',
  data() {
    return {
      history: [
        { id: 1, date: '2026.02.15', plan: 'FA Pro 프리미엄 (월간)', amount: 59000 },
        { id: 2, date: '2026.01.15', plan: 'FA Pro 프리미엄 (월간)', amount: 59000 },
        { id: 3, date: '2025.12.15', plan: 'FA Pro 프리미엄 (월간)', amount: 59000 }
      ]
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/my/payment.css';
</style>
