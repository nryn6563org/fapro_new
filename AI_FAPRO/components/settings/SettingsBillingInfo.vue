<template>
  <div class="settings-billing">
    <!-- 결제 수단 -->
    <div class="settings-billing__payment-section">
      <label class="settings-billing__label">결제 수단</label>
      <div class="settings-billing__info-box">
        <div class="settings-billing__card-row">
          <div class="settings-billing__card-info">
            <div class="settings-billing__card-icon-wrapper">
              <credit-card-icon class="settings-billing__card-icon" />
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

    <!-- 결제 정보 2x2 그리드 -->
    <div class="settings-billing__grid">
      <div class="settings-billing__item">
        <label class="settings-billing__label">서비스 이용 기간</label>
        <p class="settings-billing__value">
          {{ billingInfo.servicePeriod }}
        </p>
      </div>
      <div class="settings-billing__item">
        <label class="settings-billing__label">다음 결제일</label>
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
        <label class="settings-billing__label">결제 수단</label>
        <p class="settings-billing__value">
          {{ billingInfo.scheduledAmount }}
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
import { CreditCardIcon } from "vue-feather-icons";
import "~/assets/css/pages/settings/SettingsBillingInfo/SettingsBillingInfo.css";

export default {
  name: "SettingsBillingInfo",
  components: {
    CreditCardIcon,
  },
  props: {
    billingInfo: { type: Object, required: true },
    paymentMethod: { type: String, required: true },
  },
};
</script>
