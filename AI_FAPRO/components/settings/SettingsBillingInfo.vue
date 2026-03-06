<template>
  <div class="settings-billing space-y-8">
    <!-- Card Details -->
    <div class="space-y-4">
      <label class="settings-billing__label">결제 수단</label>
      <div class="settings-billing__info-box">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="settings-billing__card-icon-wrapper">
              <credit-card-icon class="w-6 h-6 text-slate-500" />
            </div>
            <div>
              <p class="settings-billing__card-name">
                {{ paymentMethod }}
              </p>
              <p class="settings-billing__card-desc">
                주결제 카드
              </p>
            </div>
          </div>
          <button class="settings-billing__change-btn">변경</button>
        </div>
      </div>
    </div>

    <!-- Billing Dates -->
    <div class="grid grid-cols-2 gap-8 px-2">
      <div class="space-y-3">
        <label class="settings-billing__label">다음 결제일</label>
        <p class="settings-billing__date-value">
          {{ nextBillingDate }}
        </p>
      </div>
      <div class="space-y-3">
        <label class="settings-billing__label">월 결제 금액</label>
        <p class="settings-billing__price-value">
          ₩{{ monthlyPrice.toLocaleString() }}
        </p>
      </div>
    </div>

    <div class="settings-billing__divider"></div>

    <div class="flex justify-center mt-4">
      <button
        class="settings-billing__cancel-btn"
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
