<template>
  <div v-if="client" class="info-modal">
    <div class="info-modal__overlay" @click="$emit('close')"></div>
    <div class="info-modal__container animate__animated animate__fadeInUp">
      <!-- Header -->
      <div class="info-modal__header">
        <div class="flex items-center gap-3">
          <div
            :class="[
              'info-modal__icon-box',
              isEditing ? 'info-modal__icon-box--edit' : 'info-modal__icon-box--view'
            ]"
          >
            <edit-icon v-if="isEditing" class="w-6 h-6 text-white" />
            <user-icon v-else class="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 class="info-modal__title">{{ client.name }}님의 정보</h2>
            <p class="info-modal__subtitle">
              {{ isEditing ? '고객 정보 수정' : '전체 고객 정보 상세보기' }}
            </p>
          </div>
        </div>
        <button @click="$emit('close')" class="info-modal__close">
          <x-icon class="w-6 h-6" />
        </button>
      </div>

      <!-- Content Grid -->
      <div class="info-modal__content">
        <div class="info-modal__grid">
          <!-- Name -->
          <div class="info-modal__field">
            <label class="info-modal__label"><user-icon class="w-4 h-4 mr-1" /> 고객명</label>
            <input v-if="isEditing" v-model="localClient.name" class="info-modal__input" />
            <p v-else class="info-modal__value font-bold">{{ client.name }}</p>
          </div>

          <!-- Phone -->
          <div class="info-modal__field">
            <label class="info-modal__label"><phone-icon class="w-4 h-4 mr-1" /> 연락처</label>
            <input
              v-if="isEditing"
              v-model="localClient.phone"
              class="info-modal__input"
              placeholder="010-0000-0000"
            />
            <p v-else class="info-modal__value">{{ client.phone }}</p>
          </div>

          <!-- Email -->
          <div class="info-modal__field">
            <label class="info-modal__label"><mail-icon class="w-4 h-4 mr-1" /> 이메일</label>
            <input
              v-if="isEditing"
              v-model="localClient.email"
              class="info-modal__input"
              type="email"
            />
            <p v-else class="info-modal__value">{{ client.email }}</p>
          </div>

          <!-- Age -->
          <div class="info-modal__field">
            <label class="info-modal__label"><calendar-icon class="w-4 h-4 mr-1" /> 연령</label>
            <input
              v-if="isEditing"
              v-model.number="localClient.age"
              class="info-modal__input"
              type="number"
            />
            <p v-else class="info-modal__value">{{ client.age }}세</p>
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
                @click="localClient.investmentType = type"
                :class="[
                  'info-modal__type-btn',
                  { 'info-modal__type-btn--active': localClient.investmentType === type }
                ]"
              >
                {{ type }}
              </button>
            </div>
            <span v-else :class="['info-modal__badge', getTypeClass(client.investmentType)]">
              {{ client.investmentType }}
            </span>
          </div>

          <!-- Total Assets -->
          <div class="info-modal__field">
            <label class="info-modal__label"
              ><trending-up-icon class="w-4 h-4 mr-1" /> 총자산</label
            >
            <input v-if="isEditing" v-model="localClient.totalAssets" class="info-modal__input" />
            <p v-else class="info-modal__value font-bold">{{ client.totalAssets }}</p>
          </div>

          <!-- Join Date -->
          <div class="info-modal__field">
            <label class="info-modal__label"><calendar-icon class="w-4 h-4 mr-1" /> 가입일</label>
            <input
              v-if="isEditing"
              v-model="localClient.joinDate"
              class="info-modal__input"
              type="date"
            />
            <p v-else class="info-modal__value">{{ client.joinDate }}</p>
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
            <p v-else class="info-modal__value">{{ client.holdings }}</p>
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
            <p v-else class="info-modal__value leading-relaxed italic">{{ client.notes }}</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="info-modal__footer">
        <div>
          <button
            v-if="!isEditing && client.holdingsDetail?.length"
            class="info-modal__btn info-modal__btn--outline"
            @click="$emit('view-holdings', client)"
          >
            <eye-icon class="w-4 h-4" /> 보유종목 상세보기
          </button>
        </div>
        <div class="flex gap-3">
          <template v-if="isEditing">
            <button class="info-modal__btn info-modal__btn--outline" @click="$emit('cancel')">
              취소
            </button>
            <button
              class="info-modal__btn info-modal__btn--primary"
              @click="$emit('save', localClient)"
            >
              <save-icon class="w-4 h-4" /> 저장
            </button>
          </template>
          <template v-else>
            <button class="info-modal__btn info-modal__btn--outline" @click="$emit('close')">
              닫기
            </button>
            <button class="info-modal__btn info-modal__btn--amber" @click="$emit('edit')">
              <edit-icon class="w-4 h-4" /> 수정
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 기본 정보 상세보기 및 수정 모달
 */
import {
  UserIcon,
  EditIcon,
  XIcon,
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  BriefcaseIcon,
  TrendingUpIcon,
  BarChart2Icon,
  FileTextIcon,
  EyeIcon,
  SaveIcon
} from 'vue-feather-icons'
import '~/assets/css/pages/clients/ClientInfoModal/ClientInfoModal.css'

export default {
  name: 'ClientInfoModal',
  components: {
    UserIcon,
    EditIcon,
    XIcon,
    PhoneIcon,
    MailIcon,
    CalendarIcon,
    BriefcaseIcon,
    TrendingUpIcon,
    BarChart2Icon,
    FileTextIcon,
    EyeIcon,
    SaveIcon
  },
  props: {
    client: { type: Object, default: null },
    isEditing: { type: Boolean, default: false }
  },
  data() {
    return {
      localClient: this.client ? JSON.parse(JSON.stringify(this.client)) : null,
      types: ['공격형', '중립형', '안정형']
    }
  },
  watch: {
    client: {
      handler(newVal) {
        if (newVal) this.localClient = JSON.parse(JSON.stringify(newVal))
      },
      deep: true
    }
  },
  methods: {
    getTypeClass(type) {
      if (type === '공격형') return 'info-modal__badge--aggressive'
      if (type === '안정형') return 'info-modal__badge--stable'
      return 'info-modal__badge--neutral'
    }
  }
}
</script>
