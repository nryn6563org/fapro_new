<template>
  <div class="info-modal__content">
    <div class="info-modal__grid">
      <!-- Name -->
      <div class="info-modal__field">
        <label class="info-modal__label"
          ><user-icon class="w-4 h-4 mr-1" /> 고객명</label
        >
        <input
          v-if="isEditing"
          v-model="localClient.name"
          class="info-modal__input"
        />
        <p v-else class="info-modal__value font-bold">{{ localClient.name }}</p>
      </div>

      <!-- Phone -->
      <div class="info-modal__field">
        <label class="info-modal__label"
          ><phone-icon class="w-4 h-4 mr-1" /> 연락처</label
        >
        <input
          v-if="isEditing"
          v-model="localClient.phone"
          class="info-modal__input"
          placeholder="010-0000-0000"
        />
        <p v-else class="info-modal__value">{{ localClient.phone }}</p>
      </div>

      <!-- Email -->
      <div class="info-modal__field">
        <label class="info-modal__label"
          ><mail-icon class="w-4 h-4 mr-1" /> 이메일</label
        >
        <input
          v-if="isEditing"
          v-model="localClient.email"
          class="info-modal__input"
          type="email"
        />
        <p v-else class="info-modal__value">{{ localClient.email }}</p>
      </div>

      <!-- Age -->
      <div class="info-modal__field">
        <label class="info-modal__label"
          ><calendar-icon class="w-4 h-4 mr-1" /> 연령</label
        >
        <input
          v-if="isEditing"
          v-model.number="localClient.age"
          class="info-modal__input"
          type="number"
        />
        <p v-else class="info-modal__value">{{ localClient.age }}세</p>
      </div>

      <!-- Investment Type -->
      <div class="info-modal__field">
        <label class="info-modal__label"
          ><briefcase-icon class="w-4 h-4 mr-1" /> 투자유형</label
        >
        <div v-if="isEditing" class="flex gap-2">
          <button
            v-for="type in types"
            :key="type"
            :class="[
              'info-modal__type-btn',
              {
                'info-modal__type-btn--active':
                  localClient.investmentType === type,
              },
            ]"
            @click="localClient.investmentType = type"
          >
            {{ type }}
          </button>
        </div>
        <span
          v-else
          :class="[
            'info-modal__badge',
            getTypeClass(localClient.investmentType),
          ]"
        >
          {{ localClient.investmentType }}
        </span>
      </div>

      <!-- Total Assets -->
      <div class="info-modal__field">
        <label class="info-modal__label"
          ><trending-up-icon class="w-4 h-4 mr-1" /> 총자산</label
        >
        <input
          v-if="isEditing"
          v-model="localClient.totalAssets"
          class="info-modal__input"
        />
        <p v-else class="info-modal__value font-bold">
          {{ localClient.totalAssets }}
        </p>
      </div>

      <!-- Join Date -->
      <div class="info-modal__field">
        <label class="info-modal__label"
          ><calendar-icon class="w-4 h-4 mr-1" /> 가입일</label
        >
        <input
          v-if="isEditing"
          v-model="localClient.joinDate"
          class="info-modal__input"
          type="date"
        />
        <p v-else class="info-modal__value">{{ localClient.joinDate }}</p>
      </div>

      <!-- Holdings -->
      <div class="info-modal__field col-span-2">
        <label class="info-modal__label"
          ><bar-chart-2-icon class="w-4 h-4 mr-1" /> 보유종목</label
        >
        <input
          v-if="isEditing"
          v-model="localClient.holdings"
          class="info-modal__input"
          placeholder="보유 종목을 쉼표로 구분하여 입력"
        />
        <p v-else class="info-modal__value">{{ localClient.holdings }}</p>
      </div>

      <!-- Notes -->
      <div class="info-modal__field col-span-2">
        <label class="info-modal__label"
          ><file-text-icon class="w-4 h-4 mr-1" /> 특이사항</label
        >
        <textarea
          v-if="isEditing"
          v-model="localClient.notes"
          class="info-modal__textarea"
          rows="3"
        ></textarea>
        <p v-else class="info-modal__value leading-relaxed italic">
          {{ localClient.notes }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 정보 폼/디스플레이 영역
 */
import {
  UserIcon,
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  BriefcaseIcon,
  TrendingUpIcon,
  BarChart2Icon,
  FileTextIcon,
} from "vue-feather-icons";
import "~/assets/css/pages/clients/ClientInfoContent/ClientInfoContent.css";

export default {
  name: "ClientInfoContent",
  components: {
    UserIcon,
    PhoneIcon,
    MailIcon,
    CalendarIcon,
    BriefcaseIcon,
    TrendingUpIcon,
    BarChart2Icon,
    FileTextIcon,
  },
  props: {
    client: {
      type: Object,
      required: true,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localClient: JSON.parse(JSON.stringify(this.client)),
      types: ["공격형", "중립형", "안정형"],
    };
  },
  watch: {
    client: {
      handler(newVal) {
        this.localClient = JSON.parse(JSON.stringify(newVal));
      },
      deep: true,
    },
    localClient: {
      handler(newVal) {
        this.$emit("update:client", newVal);
      },
      deep: true,
    },
  },
  methods: {
    getTypeClass(type) {
      if (type === "공격형") return "info-modal__badge--aggressive";
      if (type === "안정형") return "info-modal__badge--stable";
      return "info-modal__badge--neutral";
    },
  },
};
</script>
