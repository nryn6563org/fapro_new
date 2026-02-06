<template>
  <div class="auth-page-wrapper">
    <div class="auth-bg-circle circle-1"></div>
    <div class="auth-bg-circle circle-2"></div>

    <div class="auth-card">
      <div class="auth-header-v">
        <div class="auth-icon-box bg-indigo-600 shadow-indigo-200 -rotate-12">
          <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line>
          </svg>
        </div>
        <h1 class="auth-title-large">회원가입</h1>
        <p class="auth-desc-v">FA Dashboard의 새로운 파트너가 되어주세요</p>
      </div>

      <form class="auth-form-v" @submit.prevent="handleRegister">
        <div class="auth-input-group">
          <label class="auth-label-v">성함</label>
          <input
            v-model="regForm.name"
            type="text"
            class="auth-input-v"
            placeholder="홍길동"
            required
          />
        </div>

        <div class="auth-input-group">
          <label class="auth-label-v">이메일 주소</label>
          <input
            v-model="regForm.email"
            type="email"
            class="auth-input-v"
            placeholder="your@email.com"
            required
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="auth-input-group">
            <label class="auth-label-v">비밀번호</label>
            <input
              v-model="regForm.password"
              type="password"
              class="auth-input-v"
              placeholder="••••••••"
              required
            />
          </div>
          <div class="auth-input-group">
            <label class="auth-label-v">비밀번호 확인</label>
            <input
              v-model="regForm.confirmPassword"
              type="password"
              class="auth-input-v"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <div class="terms-box-v">
          <input type="checkbox" class="auth-checkbox-v mt-0.5" v-model="regForm.agree" required />
          <p class="terms-text-v">
            <a href="#" class="text-blue-600 hover:underline">서비스 이용약관</a> 및
            <a href="#" class="text-blue-600 hover:underline">개인정보 처리방침</a>에 모두 동의하며,
            제시된 약관을 숙지하였습니다.
          </p>
        </div>

        <button type="submit" class="btn-auth-submit">가입 신청하기</button>
      </form>

      <div class="auth-footer-v">
        <span class="auth-footer-text">이미 계정이 있으신가요?</span>
        <nuxt-link to="/auth/login" class="auth-footer-link">로그인</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Register Page Migration
 * - React Register를 Nuxt로 마이그레이션
 * - 레이아웃 미사용
 * - 공유 auth-style.css 활용
 */

export default {
  name: 'RegisterPage',
  layout: 'empty',
  data() {
    return {
      regForm: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false
      }
    }
  },
  methods: {
    handleRegister() {
      if (this.regForm.password !== this.regForm.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.')
        return
      }
      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.')
      this.$router.push('/auth/login')
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/auth/style.css';
</style>
