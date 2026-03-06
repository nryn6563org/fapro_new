<template>
  <div class="settings-page">
    <div class="settings-page__container">
      <div class="settings-page__title-wrapper">
        <h1 class="settings-page__title">설정</h1>
      </div>

      <!-- Account Management -->
      <settings-account-section />

      <!-- Billing & Payment Information -->
      <div class="settings-page__card mt-8">
        <div class="settings-page__header">
          <credit-card-icon class="settings-page__header-icon" />
          <h2 class="settings-page__h2">결제 정보</h2>
        </div>

        <div class="settings-page__content">
          <!-- Subscription Plans -->
          <div class="space-y-6">
            <label class="settings-page__label">현재 구독 플랜</label>
            <div class="settings-page__grid">
              <settings-plan-card
                type="basic"
                label="일반"
                :price="100000"
                :active="selectedPlan === 'basic'"
                :features="basicFeatures"
                @select="selectedPlan = 'basic'"
              />
              <settings-plan-card
                type="pro"
                label="Pro"
                :price="150000"
                :active="selectedPlan === 'pro'"
                :features="proFeatures"
                @select="selectedPlan = 'pro'"
              />
            </div>

            <!-- Promotion / Transition Button -->
            <div class="mt-8">
              <div
                v-if="selectedPlan === activePlan"
                class="settings-page__status-box"
              >
                <div
                  v-if="activePlan === 'pro'"
                  class="settings-page__pro-status"
                >
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
                @click="handlePlanChange"
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

          <!-- Payment Info Component -->
          <div v-if="activePlan === 'pro'" class="settings-page__billing-wrapper mt-10">
            <settings-billing-info
              :payment-method="paymentMethod"
              :next-billing-date="nextBillingDateLabel"
              :monthly-price="activePlan === 'pro' ? 150000 : 100000"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 설정 메인 페이지 (회원정보 및 구독 관리)
 */
import { CreditCardIcon, StarIcon, AwardIcon, ArrowDownIcon } from "vue-feather-icons";
import SettingsAccountSection from "~/components/settings/SettingsAccountSection.vue";
import SettingsPlanCard from "~/components/settings/SettingsPlanCard.vue";
import SettingsBillingInfo from "~/components/settings/SettingsBillingInfo.vue";
import "~/assets/css/pages/settings/SettingsPage/SettingsPage.css";

export default {
  name: "SettingsPage",
  components: {
    SettingsAccountSection,
    SettingsPlanCard,
    SettingsBillingInfo,
    CreditCardIcon,
    StarIcon,
    AwardIcon,
    ArrowDownIcon,
  },
  layout: "default",
  data() {
    return {
      activePlan: "pro",
      selectedPlan: "pro",
      paymentMethod: "신한카드 **** **** **** 1234",
      nextBillingDate: new Date(2025, 2, 26),
      basicFeatures: [
        "오늘의 제안 고객 추천",
        "오늘의 종목 제안 추천",
        "고객 및 일정관리",
      ],
      proFeatures: [
        "오늘의 제안 고객 추천",
        "오늘의 종목 제안 추천",
        "고객 및 일정관리",
        "AI발굴종목",
        "AI이슈포착 정보",
        "투자정보 제공",
      ],
    };
  },
  computed: {
    nextBillingDateLabel() {
      return this.nextBillingDate.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  methods: {
    handlePlanChange() {
      const action =
        this.selectedPlan === "pro" ? "업그레이드" : "다운그레이드";
      if (
        confirm(
          `${
            this.selectedPlan === "pro" ? "Pro" : "일반"
          } 플랜으로 ${action}하시겠습니까?`
        )
      ) {
        this.activePlan = this.selectedPlan;
        alert(`${action}되었습니다!`);
      }
    },
  },
};
</script>
