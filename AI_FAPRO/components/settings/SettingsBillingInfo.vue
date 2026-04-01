<template>
  <div class="settings-billing">
    <!-- 결제 정보 2x2 그리드 -->
    <div class="settings-billing__grid">
      <div class="settings-billing__item">
        <label class="settings-billing__label">서비스 이용 기간</label>
        <p class="settings-billing__value">
          {{ billingInfo.servicePeriod }}
        </p>
      </div>
      <div class="settings-billing__item">
        <label class="settings-billing__label">
          {{ billingInfo.nextBillingLabel }}
        </label>
        <p class="settings-billing__value">
          {{ billingInfo.nextBillingDate }}
        </p>
      </div>
      <div class="settings-billing__item">
        <label class="settings-billing__label">월 결제 금액</label>
        <p class="settings-billing__value">
          {{ billingInfo.monthlyPrice }}
        </p>
      </div>
      <div class="settings-billing__item">
        <label class="settings-billing__label">
          {{ billingInfo.paymentMethodLabel }}
        </label>
        <p class="settings-billing__value">
          {{ billingInfo.paymentMethod }}
        </p>
      </div>
    </div>

    <!-- 구독 중단 안내 -->
    <p class="settings-billing__notice">
      구독 중단 관련은 고객센터로 문의 주시기 바랍니다.
    </p>
  </div>
</template>

<script>
/**
 * 기능: 결제 정보 및 내역 표시 섹션
 */
import "~/assets/css/pages/settings/SettingsBillingInfo/SettingsBillingInfo.css";

export default {
  name: "SettingsBillingInfo",
  props: {
    billingInfo: { type: Object, required: true },
  },
};
</script>
