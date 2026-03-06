<template>
  <div
    :class="[
      'plan-card',
      { 'plan-card--active': active, 'plan-card--pro': type === 'pro' },
    ]"
    @click="$emit('select')"
  >
    <div
      v-if="active"
      :class="[
        'plan-card__check',
        type === 'pro' ? 'plan-card__check--pro' : 'plan-card__check--basic',
      ]"
    >
      <check-icon class="w-4 h-4 text-white" />
    </div>

    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <h3 class="plan-card__title">{{ label }}</h3>
        <component
          :is="type === 'pro' ? 'award-icon' : 'user-icon'"
          v-if="type === 'pro'"
          class="plan-card__crown-icon"
        />
      </div>

      <div>
        <p class="plan-card__price">
          ₩{{ price.toLocaleString() }}
          <span class="plan-card__period">/월</span>
        </p>
      </div>

      <div class="plan-card__divider"></div>

      <div class="space-y-3">
        <div
          v-for="(feature, i) in features"
          :key="i"
          class="plan-card__feature"
        >
          <check-icon
            :class="[
              'plan-card__feature-icon',
              type === 'pro'
                ? 'plan-card__feature-icon--pro'
                : 'plan-card__feature-icon--basic',
            ]"
          />
          <span class="plan-card__feature-text">{{ feature }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 구독 플랜 카드
 */
import { CheckIcon, StarIcon, AwardIcon, UserIcon } from "vue-feather-icons";
import "~/assets/css/pages/settings/SettingsPlanCard/SettingsPlanCard.css";

export default {
  name: "SettingsPlanCard",
  components: {
    CheckIcon,
    StarIcon,
    AwardIcon,
    UserIcon,
  },
  props: {
    type: { type: String, default: "basic" },
    active: { type: Boolean, default: false },
    label: { type: String, required: true },
    price: { type: Number, required: true },
    features: { type: Array, required: true },
  },
};
</script>
