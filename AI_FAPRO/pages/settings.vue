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
        :basic-features="basicFeatures"
        :pro-features="proFeatures"
        :billing-info="billingInfo"
        :payment-method="paymentMethod"
        @subscribe="handleSubscribe"
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
      /* "none" = 미결제, "basic" = 일반 구독, "pro" = Pro 구독 */
      activePlan: "none",
      selectedPlan: "basic",
      paymentMethod: "신한카드 **** **** **** 1234",
      basicFeatures: [
        { label: "AI 컨텍 제안", description: "제안 고객 및 제안 종목을 자동 추출" },
        { label: "AI 이슈 포착", description: "종합·대형주·중소형주 별 이슈 제공" },
        { label: "AI 매매신호 포착", description: "실시간 매수·매도 시그널 발생 종목 제공" },
        { label: "AI 인텔리전스 리포트", description: "시그널 발생 종목의 심화 리포트" },
      ],
      proFeatures: [
        { label: "AI 컨텍 제안", description: "제안 고객 및 제안 종목을 자동 추출" },
        { label: "AI 이슈 포착", description: "종합·대형주·중소형주 별 이슈 제공" },
        { label: "AI 매매신호 포착", description: "실시간 매수·매도 시그널 발생 종목 제공" },
        { label: "AI 인텔리전스 리포트", description: "시그널 발생 종목의 심화 리포트" },
        { label: "AI 중장기 유망주", description: "중장기 포트폴리오 운영에 적합한 전략적 종목 제공" },
      ],
    };
  },
  computed: {
    /**
     * @description 플랜별 결제 정보 객체
     */
    billingInfo() {
      if (this.activePlan === "pro") {
        return {
          servicePeriod: "2025년 1월 26일 ~ 2025년 2월 25일",
          nextBillingDate: "2025년 2월 25일",
          monthlyPrice: "₩150,000",
          scheduledAmount: "₩150,000",
        };
      }
      if (this.activePlan === "basic") {
        return {
          servicePeriod: "2025년 1월 26일 ~ 2025년 2월 25일",
          nextBillingDate: "2025년 2월 25일",
          monthlyPrice: "₩100,000",
          scheduledAmount: "₩100,000",
        };
      }
      return {
        servicePeriod: "-",
        nextBillingDate: "-",
        monthlyPrice: "-",
        scheduledAmount: "-",
      };
    },
  },
  methods: {
    /**
     * @description 결제하기 (미결제 → 구독)
     */
    handleSubscribe() {
      const planLabel = this.selectedPlan === "pro" ? "Pro" : "일반";
      if (confirm(`${planLabel} 플랜을 결제하시겠습니까?`)) {
        this.activePlan = this.selectedPlan;
        alert("결제가 완료되었습니다!");
      }
    },
    /**
     * @description 구독 플랜 변경 핸들러 (업그레이드/다운그레이드)
     */
    handlePlanChange(plan) {
      const planLabel = plan === "pro" ? "Pro" : "일반";
      const action = plan === "pro" ? "업그레이드" : "다운그레이드";
      if (confirm(`${planLabel} 플랜으로 ${action}하시겠습니까?`)) {
        this.activePlan = plan;
        this.selectedPlan = plan;
        alert(`${action}되었습니다!`);
      }
    },
  },
};
</script>

