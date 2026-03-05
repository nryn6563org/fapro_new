<template>
  <div id="smart-onboarding-modal" class="onboarding-modal">
    <div class="onboarding-modal__overlay" @click="$emit('close')"></div>
    <div class="onboarding-modal__container animate__animated animate__zoomIn">
      <!-- Header -->
      <div class="onboarding-modal__header">
        <div class="flex items-center gap-3">
          <div class="onboarding-modal__icon-box">
            <zap-icon class="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 class="onboarding-modal__title">스마트온보딩</h2>
            <p class="onboarding-modal__subtitle">
              신규 고객 정보를 입력하거나 추출하세요
            </p>
          </div>
        </div>
        <button class="onboarding-modal__close" @click="$emit('close')">
          <x-icon class="w-6 h-6" />
        </button>
      </div>

      <!-- Content -->
      <div class="onboarding-modal__content">
        <!-- Smart Extraction Area -->
        <SmartOnboardingExtract @extracted="onExtracted" @reset="onReset" />

        <!-- Manual Form -->
        <SmartOnboardingForm :client.sync="localClient" :types="types" />

        <!-- AI Hint -->
        <div class="onboarding-modal__ai-hint">
          <zap-icon class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div class="flex-1">
            <p class="font-black text-slate-900 dark:text-white text-sm mb-1">
              AI 투자 성향 분석
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              {{ investmentHint }}
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="onboarding-modal__footer">
        <button
          class="onboarding-modal__btn onboarding-modal__btn--outline"
          @click="$emit('close')"
        >
          취소
        </button>
        <button
          class="onboarding-modal__btn onboarding-modal__btn--primary"
          @click="handleSave"
        >
          <user-plus-icon class="w-4 h-4 mr-2" /> 고객 등록
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 신규 고객 등록(스마트 온보딩) 모달
 */
import { ZapIcon, XIcon, UserPlusIcon } from "vue-feather-icons";
import "~/assets/css/pages/clients/SmartOnboardingModal/SmartOnboardingModal.css";
import SmartOnboardingExtract from "~/components/clients/SmartOnboardingExtract.vue";
import SmartOnboardingForm from "~/components/clients/SmartOnboardingForm.vue";

export default {
  name: "SmartOnboardingModal",
  components: {
    ZapIcon,
    XIcon,
    UserPlusIcon,
    SmartOnboardingExtract,
    SmartOnboardingForm,
  },
  data() {
    return {
      localClient: {
        name: "",
        phone: "",
        email: "",
        age: 0,
        investmentType: "중립형",
        totalAssets: "",
        holdings: "",
        notes: "",
        joinDate: new Date().toISOString().split("T")[0],
      },
      types: ["공격형", "중립형", "안정형"],
    };
  },
  computed: {
    investmentHint() {
      const hints = {
        공격형: "성장주, AI 반도체, 바이오 등 고성장 테마를 추천합니다.",
        중립형: "대형우량주와 성장주를 균형있게 배분하는 것을 추천합니다.",
        안정형: "배당주, 대형우량주 등 안정적인 종목을 추천합니다.",
      };
      return (
        hints[this.localClient.investmentType] || "투자 성향을 선택해 주세요."
      );
    },
  },
  methods: {
    onExtracted(data) {
      this.localClient = { ...this.localClient, ...data };
    },
    onReset() {
      this.localClient = {
        name: "",
        phone: "",
        email: "",
        age: 0,
        investmentType: "중립형",
        totalAssets: "",
        holdings: "",
        notes: "",
        joinDate: new Date().toISOString().split("T")[0],
      };
    },
    handleSave() {
      if (!this.localClient.name || !this.localClient.phone) {
        alert("필수 입력 항목을 확인해 주세요.");
        return;
      }
      this.$emit("save", this.localClient);
    },
  },
};
</script>
