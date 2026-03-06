<template>
  <div class="settings-billing">
    <!-- Card Details -->
    <div class="settings-billing__section">
      <label class="settings-billing__label"
        >결제 수단</label
      >
      <div class="settings-billing__info-box">
        <div class="settings-billing__info-row">
          <div class="settings-billing__info-left">
            <credit-card-icon class="settings-billing__card-icon" />
            <div>
              <p class="settings-billing__card-name">
                {{ paymentMethod }}
              </p>
              <p class="settings-billing__card-sub">
                주결제 카드
              </p>
            </div>
          </div>
          <button class="settings-billing__change-btn">변경</button>
        </div>
      </div>
    </div>

    <!-- Billing Dates -->
    <div class="settings-billing__dates-grid">
      <div class="settings-billing__date-item">
        <label class="settings-billing__date-label">다음 결제일</label>
        <p class="settings-billing__date-value">
          {{ nextBillingDate }}
        </p>
      </div>
      <div class="settings-billing__date-item">
        <label class="settings-billing__date-label">월 결제 금액</label>
        <p class="settings-billing__date-value">
          ₩{{ monthlyPrice.toLocaleString() }}
        </p>
      </div>
    </div>

    <div class="settings-billing__divider"></div>

    <div class="settings-billing__actions">
      <button class="settings-billing__action-btn">결제 내역 조회</button>
      <button
        class="settings-billing__action-btn settings-billing__action-btn--danger"
        @click="cancelSubscription"
      >
        구독 취소
      </button>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 결제 정보 및 내역 관리 섹션
 */
import { CreditCardIcon } from "vue-feather-icons";
import "~/assets/css/pages/settings/SettingsBillingInfo/SettingsBillingInfo.css";

export default {
  name: "SettingsBillingInfo",
  components: {
    CreditCardIcon,
  },
  props: {
    paymentMethod: { type: String, required: true },
    nextBillingDate: { type: String, required: true },
    monthlyPrice: { type: Number, required: true },
  },
  methods: {
    cancelSubscription() {
      alert("준비중 입니다");
    },
  },
};
</script>
