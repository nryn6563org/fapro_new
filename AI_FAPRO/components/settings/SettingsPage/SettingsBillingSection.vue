<template>
  <div class="settings-page__card mt-8">
    <div class="settings-page__header">
      <credit-card-icon class="settings-page__header-icon" />
      <h2 class="settings-page__h2">결제 정보</h2>
    </div>

    <div class="settings-page__content">
      <div class="space-y-6">
        <label class="settings-page__label">현재 구독 플랜</label>
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

        <div class="mt-8">
          <div v-if="selectedPlan === activePlan" class="settings-page__status-box">
            <div v-if="activePlan === 'pro'" class="settings-page__pro-status">
              <award-icon class="w-5 h-5" />
              Pro 플랜 이용 중
            </div>
            <div v-else class="settings-page__basic-status">
              일반 플랜 이용 중
            </div>
          </div>

          <button
            v-else
            :class="[
              'settings-page__transition-btn',
              selectedPlan === 'pro'
                ? 'settings-page__transition-btn--upgrade'
                : 'settings-page__transition-btn--downgrade',
            ]"
            @click="$emit('change-plan')"
          >
            <component
              :is="selectedPlan === 'pro' ? 'award-icon' : 'arrow-down-icon'"
              class="settings-page__btn-icon"
            />
            {{
              selectedPlan === "pro"
                ? "Pro 플랜으로 업그레이드"
                : "일반 플랜으로 다운그레이드"
            }}
          </button>
        </div>
      </div>

      <div v-if="activePlan === 'pro'" class="settings-page__billing-wrapper mt-10">
        <settings-billing-info
          :payment-method="paymentMethod"
          :next-billing-date="nextBillingDateLabel"
          :monthly-price="150000"
        />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 설정 페이지의 결제 및 구독 관리 섹션
 */
import { CreditCardIcon, AwardIcon, ArrowDownIcon } from "vue-feather-icons";
import SettingsPlanCard from "~/components/settings/SettingsPlanCard.vue";
import SettingsBillingInfo from "~/components/settings/SettingsBillingInfo.vue";

export default {
  name: "SettingsBillingSection",
  components: {
    CreditCardIcon,
    AwardIcon,
    ArrowDownIcon,
    SettingsPlanCard,
    SettingsBillingInfo,
  },
  props: {
    activePlan: { type: String, required: true },
    selectedPlan: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    nextBillingDateLabel: { type: String, required: true },
    basicFeatures: { type: Array, required: true },
    proFeatures: { type: Array, required: true },
  },
};
</script>
