<template>
  <div class="customer-holdings__header">
    <div class="customer-holdings__header-left">
      <div class="customer-holdings__avatar">
        <user-icon class="customer-holdings__avatar-icon" />
      </div>
      <div>
        <h2 class="customer-holdings__title">{{ name }}</h2>
        <p class="customer-holdings__subtitle">보유종목 상세 정보</p>
      </div>
    </div>
    <div class="customer-holdings__header-right">
      <button class="customer-holdings__edit-btn" @click="$emit('edit')">
        <edit-icon class="customer-holdings__btn-icon" />
        수정
      </button>
      <button class="customer-holdings__close-btn" @click="$emit('close')">
        <x-icon class="customer-holdings__close-icon" />
      </button>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 고객 보유 종목 모달 - 헤더 영역
 */
import { UserIcon, EditIcon, XIcon } from "vue-feather-icons";

export default {
  name: "CustomerHoldingsHeader",
  components: {
    UserIcon,
    EditIcon,
    XIcon,
  },
  props: {
    name: { type: String, required: true },
  },
};
</script>
