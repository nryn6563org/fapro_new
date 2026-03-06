<template>
  <div class="settings-page">
    <div class="settings-page__container">
      <div class="settings-page__title-wrapper">
        <h1 class="settings-page__title">설정</h1>
      </div>

      <!-- 정보 관리 섹션 -->
      <SettingsAccountSection />

      <!-- 결제 및 구독 섹션 -->
      <SettingsBillingSection
        :active-plan="activePlan"
        :selected-plan.sync="selectedPlan"
        :payment-method="paymentMethod"
        :next-billing-date-label="nextBillingDateLabel"
        :basic-features="basicFeatures"
        :pro-features="proFeatures"
        @change-plan="handlePlanChange"
      />
    </div>
  </div>
</template>

<script>
/**
 * 기능: 설정 메인 페이지 (Modularized)
 */
import SettingsAccountSection from "~/components/settings/SettingsAccountSection.vue";
import SettingsBillingSection from "~/components/settings/SettingsPage/SettingsBillingSection.vue";
import "~/assets/css/pages/settings/SettingsPage/SettingsPage.css";

export default {
  name: "SettingsPage",
  components: {
    SettingsAccountSection,
    SettingsBillingSection,
  },
  layout: "default",
  data() {
    return {
      activePlan: "pro",
      selectedPlan: "pro",
      paymentMethod: "신한카드 **** **** **** 1234",
      nextBillingDate: new Date(2025, 2, 26),
      basicFeatures: [
        "AI 컨텍 제안",
        "AI 이슈포착",
        "AI 매매신호 포착",
        "AI 인텔리전스 리포트",
      ],
      proFeatures: [
        "AI 컨텍 제안",
        "AI 이슈포착",
        "AI 매매신호 포착",
        "AI 인텔리전스 리포트",
        "AI 중장기 유망주",
      ],
    };
  },
  computed: {
    /**
     * @description 다음 결제일 포맷팅 레이블
     */
    nextBillingDateLabel() {
      return this.nextBillingDate.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  methods: {
    /**
     * @description 구독 플랜 변경 핸들러
     */
    handlePlanChange() {
      const action = this.selectedPlan === "pro" ? "업그레이드" : "다운그레이드";
      if (
        confirm(
          `${this.selectedPlan === "pro" ? "Pro" : "일반"} 플랜으로 ${action}하시겠습니까?`
        )
      ) {
        this.activePlan = this.selectedPlan;
        alert(`${action}되었습니다!`);
      }
    },
  },
};
</script>

