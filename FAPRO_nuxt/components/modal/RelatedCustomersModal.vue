<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="c-modal-overlay" @click.self="$emit('close')">
      <div class="c-report-modal">
        <header class="c-report-modal__header">
          <div class="c-report-modal__title-group">
            <Users :size="20" class="text-primary" />
            <h3 class="c-report-modal__title">보유 고객 목록</h3>
            <span class="c-report-modal__subtitle">{{ stockName }} ({{ stockCode }})</span>
          </div>
          <button class="c-report-modal__close" @click="$emit('close')">
            <X :size="20" />
          </button>
        </header>
        
        <div class="c-report-modal__content">
          <div v-if="customers.length > 0" class="c-customer-list">
            <div v-for="(customer, idx) in customers" :key="idx" class="c-customer-item">
              <div class="c-customer-item__avatar">
                <User :size="16" />
              </div>
              <div class="c-customer-item__info">
                <div class="c-customer-item__name-row">
                  <span class="c-customer-item__name">{{ customer.name || '김철수' }}</span>
                  <span class="c-customer-item__age">{{ customer.age || '40' }}세</span>
                </div>
                <div class="c-customer-item__tags">
                  <span class="c-tag c-tag--tendency">{{ customer.tendency || '공격투자형' }}</span>
                  <span class="c-tag c-tag--asset">{{ customer.assetClass || 'VIP' }}</span>
                </div>
              </div>
              <div class="c-customer-item__holding">
                <span class="c-customer-item__holding-label">보유수량</span>
                <span class="c-customer-item__holding-value">{{ customer.holding || '120' }}주</span>
              </div>
            </div>
          </div>
          <div v-else class="py-10 text-center text-gray-400 text-sm">
            보유 고객 데이터가 없습니다.
          </div>
        </div>
        
        <footer class="c-report-modal__footer">
          <button class="c-btn c-btn--primary c-btn--full" @click="$emit('close')">확인</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { X, Users, User } from 'lucide-vue'

export default {
  name: 'RelatedCustomersModal',
  components: { X, Users, User },
  props: {
    isOpen: Boolean,
    stockName: String,
    stockCode: String,
    customers: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/modal/related-customers-modal.css';
</style>
