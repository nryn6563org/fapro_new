<template>
  <div class="settings-page__card mt-8">
    <div class="settings-page__header">
      <credit-card-icon class="settings-page__header-icon" />
      <h2 class="settings-page__h2">결제 정보</h2>
    </div>

    <div class="settings-page__content">
      <div class="space-y-6">
        <label class="settings-page__label">
          {{ activePlan === 'none' ? '현재 구독 플랜' : '플랜 구성' }}
        </label>

        <!-- 플랜 카드 그리드 -->
        <div class="settings-page__grid">
          <settings-plan-card
            type="basic"
            label="일반"
            :price="100000"
            :active="selectedPlan === 'basic'"
            :features="basicFeatures"
            @select="$emit('update:selectedPlan', 'basic')"
          />
          <settings-plan-card
            type="pro"
            label="Pro"
            :price="150000"
            :active="selectedPlan === 'pro'"
            :features="proFeatures"
            @select="$emit('update:selectedPlan', 'pro')"
          />
        </div>

        <!-- 버튼 영역 -->
        <div class="mt-8">
          <!-- 미결제 상태: 구독 상태 바 + 결제하기 버튼 -->
          <div v-if="activePlan === 'none'" class="settings-page__subscription-bar">
            <div class="settings-page__subscription-info">
              <award-icon class="settings-page__subscription-icon" />
              <span class="settings-page__subscription-text">
                {{ selectedPlan === 'pro' ? 'Pro' : '일반' }} 플랜을 구독 합니다.
              </span>
            </div>
            <button
              :class="[
                'settings-page__payment-btn',
                selectedPlan === 'pro'
                  ? 'settings-page__payment-btn--pro'
                  : 'settings-page__payment-btn--basic',
              ]"
              @click="$emit('subscribe')"
            >
              결제 하기
            </button>
          </div>

          <!-- 결제 상태: 다른 플랜 선택 시 해당 변경 버튼만 표시 -->
          <button
            v-else-if="selectedPlan !== activePlan && selectedPlan === 'basic'"
            class="settings-page__transition-btn settings-page__transition-btn--downgrade"
            @click="$emit('change-plan', 'basic')"
          >
            일반 플랜으로 변경
          </button>
          <button
            v-else-if="selectedPlan !== activePlan && selectedPlan === 'pro'"
            class="settings-page__transition-btn settings-page__transition-btn--upgrade"
            @click="$emit('change-plan', 'pro')"
          >
            <award-icon class="settings-page__btn-icon" />
            Pro 플랜으로 변경
          </button>
        </div>
      </div>

      <!-- 구분선 -->
      <div class="settings-page__billing-wrapper mt-10">
        <!-- 결제 수단 (항상 표시) -->
        <settings-billing-info
          :billing-info="billingInfo"
          :payment-method="paymentMethod"
        />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 설정 페이지의 결제 및 구독 관리 섹션
 */
import { CreditCardIcon, AwardIcon } from "vue-feather-icons";
import SettingsPlanCard from "~/components/settings/SettingsPlanCard.vue";
import SettingsBillingInfo from "~/components/settings/SettingsBillingInfo.vue";

export default {
  name: "SettingsBillingSection",
  components: {
    CreditCardIcon,
    AwardIcon,
    SettingsPlanCard,
    SettingsBillingInfo,
  },
  props: {
    activePlan: { type: String, required: true },
    selectedPlan: { type: String, required: true },
    basicFeatures: { type: Array, required: true },
    proFeatures: { type: Array, required: true },
    billingInfo: { type: Object, required: true },
    paymentMethod: { type: String, required: true },
  },
};
</script>
