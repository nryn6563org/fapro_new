<template>
  <div class="auth-page-wrapper">
    <div class="auth-bg-circle circle-1"></div>
    <div class="auth-bg-circle circle-2"></div>

    <div class="auth-card">
      <div class="auth-header-v">
        <div class="auth-icon-box">
          <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
        </div>
        <h1 class="auth-title-large">FA Dashboard</h1>
        <p class="auth-desc-v">금융 전문가를 위한 데이터 플랫폼</p>
      </div>

      <form class="auth-form-v" @submit.prevent="handleLogin">
        <div class="auth-input-group">
          <label class="auth-label-v">아이디 (이메일)</label>
          <input
            v-model="loginForm.email"
            type="email"
            class="auth-input-v"
            placeholder="example@fapro.com"
            required
          />
        </div>

        <div class="auth-input-group">
          <label class="auth-label-v">비밀번호</label>
          <input
            v-model="loginForm.password"
            type="password"
            class="auth-input-v"
            placeholder="••••••••"
            required
          />
        </div>

        <div class="auth-extras-row">
          <label class="remember-me-box">
            <input type="checkbox" class="auth-checkbox-v" v-model="loginForm.rememberMe" />
            <span class="text-xs font-bold text-gray-500">로그인 상태 유지</span>
          </label>
          <a href="#" class="auth-link-sm">비밀번호를 잊으셨나요?</a>
        </div>

        <button type="submit" class="btn-auth-submit">로그인하기</button>
      </form>

      <div class="auth-footer-v">
        <span class="auth-footer-text">아직 계정이 없으신가요?</span>
        <nuxt-link to="/auth/register" class="auth-footer-link">회원가입</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Login Page Migration
 * - React Login을 Nuxt로 마이그레이션
 * - 레이아웃 미사용 (비로그인 전용 디자인)
 * - 공유 auth-style.css 활용
 */

export default {
  name: 'LoginPage',
  layout: 'empty', // 빈 레이아웃 사용 (만약 empty 레이아웃이 없다면 basic 등으로 대체 필요)
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
        rememberMe: false
      }
    }
  },
  methods: {
    handleLogin() {
      // 실제 로그인 로직 구현 전 대시보드로 이동
      alert('환영합니다! 대시보드로 이동합니다.')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/auth/style.css';
</style>
