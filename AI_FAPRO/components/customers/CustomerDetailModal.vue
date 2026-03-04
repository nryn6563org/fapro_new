<template>
  <div class="customer-detail">
    <div class="customer-detail__modal animate__animated animate__fadeInUp">
      <!-- Header -->
      <div class="customer-detail__header">
        <div class="customer-detail__header-left">
          <div class="customer-detail__avatar">
            <user-icon class="customer-detail__avatar-icon" />
          </div>
          <div>
            <h2 class="customer-detail__title">{{ customer.name }}</h2>
            <p class="customer-detail__subtitle">고객 상세 정보</p>
          </div>
        </div>
        <div class="customer-detail__header-right">
          <button class="customer-detail__edit-btn" @click="handleEdit">
            <edit-icon class="customer-detail__btn-icon" />
            수정
          </button>
          <button class="customer-detail__close-btn" @click="$emit('close')">
            <x-icon class="customer-detail__close-icon" />
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="customer-detail__body">
        <div class="customer-detail__grid">
          <!-- Left: Basic Info -->
          <div class="customer-detail__section-left">
            <h3 class="customer-detail__section-title">기본 정보</h3>
            <div class="customer-detail__info-list">
              <div class="customer-detail__info-item">
                <phone-icon class="customer-detail__info-icon" />
                <div class="customer-detail__info-content">
                  <p class="customer-detail__info-label">연락처</p>
                  <p class="customer-detail__info-value">{{ customer.phone }}</p>
                </div>
              </div>
              <div class="customer-detail__info-item">
                <mail-icon class="customer-detail__info-icon" />
                <div class="customer-detail__info-content">
                  <p class="customer-detail__info-label">이메일</p>
                  <p class="customer-detail__info-value">{{ customer.email }}</p>
                </div>
              </div>
              <div class="customer-detail__info-item">
                <user-icon class="customer-detail__info-icon" />
                <div class="customer-detail__info-content">
                  <p class="customer-detail__info-label">투자유형</p>
                  <span
                    :class="['customer-detail__type-badge', getTypeClass(customer.investmentType)]"
                  >
                    {{ customer.investmentType }}
                  </span>
                </div>
              </div>
              <div class="customer-detail__info-item">
                <zap-icon class="customer-detail__info-icon" />
                <div class="customer-detail__info-content">
                  <p class="customer-detail__info-label">총자산</p>
                  <p class="customer-detail__info-value customer-detail__info-value--bold">
                    {{ customer.totalAssets }}
                  </p>
                </div>
              </div>
              <div class="customer-detail__info-item">
                <calendar-icon class="customer-detail__info-icon" />
                <div class="customer-detail__info-content">
                  <p class="customer-detail__info-label">가입일</p>
                  <p class="customer-detail__info-value">{{ customer.joinDate }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Holdings -->
          <div class="customer-detail__section-right">
            <h3 class="customer-detail__section-title">보유종목</h3>
            <div class="customer-detail__holdings-box">
              <table class="customer-detail__holdings-table">
                <thead>
                  <tr>
                    <th class="customer-detail__th">종목명</th>
                    <th class="customer-detail__th">수량</th>
                    <th class="customer-detail__th">평가금액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(holding, index) in customer.holdingDetails" :key="index">
                    <td class="customer-detail__td customer-detail__holding-name">{{ holding.name }}</td>
                    <td class="customer-detail__td customer-detail__holding-qty">{{ holding.quantity }}</td>
                    <td class="customer-detail__td customer-detail__holding-val">{{ holding.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div class="customer-detail__notes-section">
          <h3 class="customer-detail__section-title">특이사항 / 메모</h3>
          <div class="customer-detail__notes-box">
            <div class="customer-detail__notes-content">
              <zap-icon class="customer-detail__notes-icon" />
              <p class="customer-detail__notes-text">{{ customer.notes }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 상세 정보 조회 모달 (Modal-Vanilla 호환)
 */
import {
  UserIcon,
  EditIcon,
  XIcon,
  PhoneIcon,
  MailIcon,
  ZapIcon,
  CalendarIcon
} from 'vue-feather-icons'
import '~/assets/css/pages/customers/CustomerDetailModal/CustomerDetailModal.css'

export default {
  name: 'CustomerDetailModal',
  components: {
    UserIcon,
    EditIcon,
    XIcon,
    PhoneIcon,
    MailIcon,
    ZapIcon,
    CalendarIcon
  },
  props: {
    customer: { type: Object, required: true }
  },
  methods: {
    getTypeClass(type) {
      if (type === '공격형') return 'customer-detail__type-badge--aggressive'
      if (type === '중립형') return 'customer-detail__type-badge--neutral'
      return 'customer-detail__type-badge--stable'
    },
    handleEdit() {
      alert('수정 기능은 준비 중입니다.')
    }
  }
}
</script>
