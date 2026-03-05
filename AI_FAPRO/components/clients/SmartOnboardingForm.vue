<template>
  <div class="onboarding-modal__form">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="onboarding-modal__form-field">
        <label class="onboarding-modal__form-label"
          >고객명 <span class="text-red-500">*</span></label
        >
        <input
          v-model="localClient.name"
          class="onboarding-modal__input"
          placeholder="고객명을 입력하세요"
        />
      </div>
      <div class="onboarding-modal__form-field">
        <label class="onboarding-modal__form-label"
          >연락처 <span class="text-red-500">*</span></label
        >
        <input
          v-model="localClient.phone"
          class="onboarding-modal__input"
          placeholder="010-0000-0000"
        />
      </div>
      <div class="onboarding-modal__form-field">
        <label class="onboarding-modal__form-label"
          >이메일 <span class="text-red-500">*</span></label
        >
        <input
          v-model="localClient.email"
          class="onboarding-modal__input"
          type="email"
        />
      </div>
      <div class="onboarding-modal__form-field">
        <label class="onboarding-modal__form-label">연령</label>
        <input
          v-model.number="localClient.age"
          class="onboarding-modal__input"
          type="number"
        />
      </div>
      <div class="onboarding-modal__form-field">
        <label class="onboarding-modal__form-label">투자유형</label>
        <div class="flex gap-2">
          <button
            v-for="type in types"
            :key="type"
            :class="[
              'onboarding-modal__type-btn',
              {
                'onboarding-modal__type-btn--active':
                  localClient.investmentType === type,
              },
            ]"
            @click="localClient.investmentType = type"
          >
            {{ type }}
          </button>
        </div>
      </div>
      <div class="onboarding-modal__form-field">
        <label class="onboarding-modal__form-label">총자산</label>
        <input
          v-model="localClient.totalAssets"
          class="onboarding-modal__input"
          placeholder="예: 10억"
        />
      </div>
      <div class="onboarding-modal__form-field col-span-2">
        <label class="onboarding-modal__form-label">보유종목</label>
        <input
          v-model="localClient.holdings"
          class="onboarding-modal__input"
          placeholder="쉼표로 구분"
        />
      </div>
      <div class="onboarding-modal__form-field col-span-2">
        <label class="onboarding-modal__form-label">특이사항</label>
        <textarea
          v-model="localClient.notes"
          class="onboarding-modal__input !h-auto"
          rows="3"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 온보딩 고객 입력 폼
 */
import "~/assets/css/pages/clients/SmartOnboardingForm/SmartOnboardingForm.css";

export default {
  name: "SmartOnboardingForm",
  props: {
    client: {
      type: Object,
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localClient: { ...this.client },
    };
  },
  watch: {
    client: {
      handler(newVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(this.localClient)) {
          this.localClient = { ...newVal };
        }
      },
      deep: true,
      immediate: true,
    },
    localClient: {
      handler(newVal) {
        this.$emit("update:client", newVal);
      },
      deep: true,
    },
  },
};
</script>
