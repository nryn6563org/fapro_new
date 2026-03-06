<template>
  <div class="landing-view">
    <div class="landing-view__card">
      <div class="landing-view__icon-wrapper">
        <div class="landing-view__icon-circle">
          <lock-icon class="landing-view__icon" />
        </div>
      </div>
      
      <div class="landing-view__content">
        <h1 class="landing-view__title">로그인이 필요한 서비스입니다.</h1>
        <p class="landing-view__description">
          AI FA Pro의 스마트한 일지 및 일정 관리 서비스를 이용하시려면<br />
          먼저 로그인을 진행해 주세요.
        </p>
      </div>

      <div class="landing-view__actions">
        <button class="landing-view__login-button" @click="handleLogin">
          <span class="landing-view__button-text">로그인하여 시작하기</span>
          <arrow-right-icon class="landing-view__button-icon" />
        </button>
      </div>
    </div>

    <!-- 배경 장식 요소 -->
    <div class="landing-view__blob landing-view__blob--1"></div>
    <div class="landing-view__blob landing-view__blob--2"></div>
  </div>
</template>

<script>
/**
 * 기능: 로그인 안내 랜딩 페이지
 * 미로그인 사용자가 접속 시 노출되는 시작 화면입니다.
 */
import { LockIcon, ArrowRightIcon } from "vue-feather-icons";
import "~/assets/css/components/auth/LandingView/LandingView.css";

export default {
  name: "LandingView",
  components: {
    LockIcon,
    ArrowRightIcon,
  },
  methods: {
    /**
     * @description 로그인 처리를 시작합니다 (Vuex 액션 호출)
     */
    handleLogin() {
      this.$store.dispatch('auth/login');
    }
  }
};
</script>
