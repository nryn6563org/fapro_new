<template>
  <div class="settings-billing space-y-6">
    <!-- Card Details -->
    <div class="space-y-3">
          <label class="text-xs font-bold text-slate-500 uppercase">결제 수단</label>
          <div class="settings-billing__info-box">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <credit-card-icon class="w-6 h-6 text-slate-600" />
                <div>
                  <p class="font-bold text-slate-900 dark:text-white m-0">{{ paymentMethod }}</p>
                  <p class="text-[10px] text-slate-500 m-0 mt-1 font-bold">주결제 카드</p>
                </div>
              </div>
              <button class="settings-billing__change-btn">변경</button>
            </div>
          </div>
        </div>

        <!-- Billing Dates -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-500">다음 결제일</label>
            <p class="text-lg font-black text-slate-900 dark:text-white m-0">
              {{ nextBillingDate }}
            </p>
          </div>
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-500">월 결제 금액</label>
            <p class="text-lg font-black text-slate-900 dark:text-white m-0">
              ₩{{ monthlyPrice.toLocaleString() }}
            </p>
          </div>
        </div>

        <div class="settings-billing__divider"></div>

      <!-- Actions -->
      <div class="space-y-2 mt-4">
        <button class="settings-billing__action-btn">결제 내역 조회</button>
        <button class="settings-billing__action-btn settings-billing__action-btn--danger">
          구독 취소
        </button>
      </div>
  </div>
</template>

<script>
/**
 * 기능: 결제 정보 및 내역 관리 섹션
 */
import { CreditCardIcon } from 'vue-feather-icons'
import '~/assets/css/pages/settings/SettingsBillingInfo.css'

export default {
  name: 'SettingsBillingInfo',
  components: {
    CreditCardIcon
  },
  props: {
    paymentMethod: { type: String, required: true },
    nextBillingDate: { type: String, required: true },
    monthlyPrice: { type: Number, required: true }
  }
}
</script>
