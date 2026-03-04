<template>
  <div class="settings-page">
    <div class="settings-page__container">
      <div class="mb-8">
        <h1 class="settings-page__title">설정</h1>
      </div>

      <!-- Account Management -->
      <settings-account-section />

      <!-- Billing & Payment Information -->
      <div class="settings-page__card mt-6">
        <div class="settings-page__header">
          <credit-card-icon class="settings-page__header-icon w-5 h-5" />
          <h2 class="settings-page__h2">결제 정보</h2>
        </div>

        <div class="p-6 space-y-6">
          <!-- Subscription Plans -->
          <div>
            <label class="text-xs font-bold text-slate-500 uppercase block mb-4">현재 구독 플랜</label>
            <div class="grid md:grid-cols-2 gap-4">
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

            <!-- Transition Button Logic (Design #33) -->
            <div class="mt-4">
              <div v-if="selectedPlan === activePlan" class="settings-page__status-box">
                <div v-if="activePlan === 'pro'" class="settings-page__pro-status">
                  <star-icon class="w-4 h-4" />
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
                  selectedPlan === 'pro' ? 'settings-page__transition-btn--upgrade' : 'settings-page__transition-btn--downgrade'
                ]"
                @click="handlePlanChange"
              >
                <component :is="selectedPlan === 'pro' ? 'star-icon' : 'arrow-down-icon'" class="w-4 h-4 mr-2" />
                {{ selectedPlan === 'pro' ? 'Pro 플랜으로 업그레이드' : '일반 플랜으로 다운그레이드' }}
              </button>
            </div>
          </div>

          <!-- Payment Info Component -->
          <div v-if="activePlan === 'pro'" class="pt-2">
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
import { CreditCardIcon, StarIcon, ArrowDownIcon } from 'vue-feather-icons'
import SettingsAccountSection from '~/components/settings/SettingsAccountSection.vue'
import SettingsPlanCard from '~/components/settings/SettingsPlanCard.vue'
import SettingsBillingInfo from '~/components/settings/SettingsBillingInfo.vue'
import '~/assets/css/pages/settings/SettingsPage/SettingsPage.css'

export default {
  name: 'SettingsPage',
  components: {
    SettingsAccountSection,
    SettingsPlanCard,
    SettingsBillingInfo,
    CreditCardIcon,
    StarIcon,
    ArrowDownIcon
  },
  layout: 'default',
  data() {
    return {
      activePlan: 'pro',
      selectedPlan: 'pro',
      paymentMethod: '신한카드 **** **** **** 1234',
      nextBillingDate: new Date(2025, 2, 26),
      basicFeatures: ['오늘의 제안 고객 추천', '오늘의 종목 제안 추천', '고객 및 일정관리'],
      proFeatures: [
        '오늘의 제안 고객 추천',
        '오늘의 종목 제안 추천',
        '고객 및 일정관리',
        'AI발굴종목',
        'AI이슈포착 정보',
        '투자정보 제공'
      ]
    }
  },
  computed: {
    nextBillingDateLabel() {
      return this.nextBillingDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  },
  methods: {
    handlePlanChange() {
      const action = this.selectedPlan === 'pro' ? '업그레이드' : '다운그레이드'
      if (confirm(`${this.selectedPlan === 'pro' ? 'Pro' : '일반'} 플랜으로 ${action}하시겠습니까?`)) {
        this.activePlan = this.selectedPlan
        alert(`${action}되었습니다!`)
      }
    }
  }
}
</script>
