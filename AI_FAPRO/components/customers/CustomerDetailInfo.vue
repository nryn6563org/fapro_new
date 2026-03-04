<template>
  <div class="customer-info">
    <div class="customer-info__grid">
      <!-- Left: Basic Info -->
      <div class="customer-info__section">
        <h3 class="customer-info__title">기본 정보</h3>
        <div class="customer-info__list">
          <!-- 연락처 -->
          <div class="customer-info__item">
            <phone-icon class="customer-info__icon" />
            <div class="flex-1">
              <p class="customer-info__label">연락처</p>
              <p class="customer-info__value">{{ customer.phone || '-' }}</p>
            </div>
          </div>
          <!-- 이메일 -->
          <div class="customer-info__item">
            <mail-icon class="customer-info__icon" />
            <div class="flex-1">
              <p class="customer-info__label">이메일</p>
              <p class="customer-info__value">{{ customer.email || '-' }}</p>
            </div>
          </div>
          <!-- 투자유형 -->
          <div class="customer-info__item">
            <user-icon class="customer-info__icon" />
            <div class="flex-1">
              <p class="customer-info__label">투자유형</p>
              <div>
                <span :class="['customer-info__badge', getTypeClass(customer.investmentType)]">
                  {{ customer.investmentType || '-' }}
                </span>
              </div>
            </div>
          </div>
          <!-- 총자산 -->
          <div class="customer-info__item">
            <zap-icon class="customer-info__icon" />
            <div class="flex-1">
              <p class="customer-info__label">총자산</p>
              <p class="customer-info__value customer-info__value--bold">{{ customer.totalAssets || '-' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Notes -->
      <div class="customer-info__section">
        <h3 class="customer-info__title">특이사항 / 메모</h3>
        <div class="customer-info__notes-box">
          <star-icon class="customer-info__notes-icon" />
          <p class="customer-info__notes-text">
            {{ customer.notes || '등록된 메모가 없습니다.' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 상세 정보 푸터 (기본정보 및 특이사항)
 */
import { PhoneIcon, MailIcon, UserIcon, ZapIcon, StarIcon } from 'vue-feather-icons'
import '~/assets/css/pages/customers/CustomerDetailModal/CustomerDetailInfo.css'

export default {
  name: 'CustomerDetailInfo',
  components: {
    PhoneIcon,
    MailIcon,
    UserIcon,
    ZapIcon,
    StarIcon
  },
  props: {
    customer: { type: Object, required: true }
  },
  methods: {
    getTypeClass(type) {
      if (type === '공격형') return 'customer-info__badge--aggressive'
      if (type === '중립형') return 'customer-info__badge--neutral'
      return 'customer-info__badge--stable'
    }
  }
}
</script>
