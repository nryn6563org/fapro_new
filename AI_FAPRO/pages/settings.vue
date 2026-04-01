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
        :basic-summary-features="basicSummaryFeatures"
        :pro-features="proFeatures"
        :pro-summary-features="proSummaryFeatures"
        :billing-info="billingInfo"
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
      /* 일반 플랜 상세 피처 (구독 중일 때 표시) */
      basicFeatures: [
        { label: "AI 컨텍 제안", description: "제안 고객 및 제안 종목을 자동 추출" },
        { label: "AI 이슈 포착", description: "종합·대형주·중소형주 별 이슈 제공" },
        { label: "AI 매매신호 포착", description: "실시간 매수·매도 시그널 발생 종목 제공" },
        { label: "AI 인텔리전스 리포트", description: "시그널 발생 종목의 심화 리포트" },
      ],
      /* 일반 플랜 요약 피처 (비활성 시 표시) */
      basicSummaryFeatures: [
        "오늘의 제안 고객 추천",
        "오늘의 종목 제안 추천",
        "고객 및 일정관리",
      ],
      /* Pro 플랜 상세 피처 (구독 중일 때 표시) */
      proFeatures: [
        { label: "AI 컨텍 제안", description: "제안 고객 및 제안 종목을 자동 추출" },
        { label: "AI 이슈 포착", description: "종합·대형주·중소형주 별 이슈 제공" },
        { label: "AI 매매신호 포착", description: "실시간 매수·매도 시그널 발생 종목 제공" },
        { label: "AI 인텔리전스 리포트", description: "시그널 발생 종목의 심화 리포트" },
        { label: "AI 중장기 유망주", description: "중장기 포트폴리오 운영에 적합한 전략적 종목 제공" },
      ],
      /* Pro 플랜 요약 피처 (비활성 시 표시) */
      proSummaryFeatures: [
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
    /**
     * @description 플랜별 결제 정보 객체
     */
    billingInfo() {
      if (this.activePlan === "pro") {
        return {
          servicePeriod: "2025년 1월 26일 ~ 2025년 2월 25일",
          nextBillingDate: "2025년 2월 25일",
          monthlyPrice: "₩150,000",
          paymentMethod: "₩150,000",
          nextBillingLabel: "다음 결제 예정일",
          paymentMethodLabel: "결제 예정 금액",
        };
      }
      return {
        servicePeriod: "-",
        nextBillingDate: "-",
        monthlyPrice: "-",
        paymentMethod: "-",
        nextBillingLabel: "다음 결제일",
        paymentMethodLabel: "결제 수단",
      };
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

