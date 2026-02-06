<template>
  <div class="info-page">
    <!-- 헤더 영역 -->
    <div class="info-page__header">
      <h1 class="info-page__title">나의 정보</h1>
      <p class="info-page__subtitle">개인 정보 관리 및 계정 설정</p>
    </div>

    <!-- 프로필 정보 카드 -->
    <div class="info-page__card">
      <div class="info-page__card-header">
        <h2 class="info-page__card-title">프로필 정보</h2>
        <p class="info-page__card-desc">기본 프로필 정보를 관리하세요</p>
      </div>

      <div class="info-page__card-body">
        <!-- 아바타 섹션 -->
        <div class="info-page__avatar-section">
          <div class="info-page__avatar-wrapper">
            <div class="info-page__avatar">
              <img v-if="profileImg" :src="profileImg" class="info-page__avatar-img" alt="Profile" />
              <span v-else>FA</span>
            </div>
          </div>
          <div class="info-page__avatar-actions">
            <button class="info-page__btn-change-photo" @click="changePhoto">사진 변경</button>
            <p class="info-page__photo-hint">JPG, PNG 파일만 업로드 가능합니다 (최대 2MB)</p>
          </div>
        </div>

        <!-- 정보 입력 그리드 -->
        <div class="info-page__grid">
          <div v-for="field in infoFields" :key="field.id" class="info-page__field-group">
            <label :for="field.id" class="info-page__label">{{ field.label }}</label>
            <div class="info-page__input-wrapper">
              <component :is="field.icon" class="info-page__input-icon" width="20" height="20" />
              <input
                :id="field.id"
                v-model="field.value"
                :type="field.type"
                class="info-page__input"
                :placeholder="field.placeholder"
              />
            </div>
          </div>
        </div>

        <!-- 저장 버튼 -->
        <div class="info-page__form-actions">
          <button class="info-page__btn-cancel" @click="resetInfo">취소</button>
          <button class="info-page__btn-save" @click="saveInfo">저장하기</button>
        </div>
      </div>
    </div>

    <!-- 비밀번호 변경 카드 -->
    <div class="info-page__card info-page__card--password">
      <div class="info-page__card-header">
        <h2 class="info-page__card-title">비밀번호 변경</h2>
        <p class="info-page__card-desc">계정 보안을 위해 주기적으로 비밀번호를 변경하세요</p>
      </div>

      <div class="info-page__password-form">
        <div v-for="pw in passwordFields" :key="pw.id" class="info-page__field-group password-input">
          <label :for="pw.id" class="info-page__label">{{ pw.label }}</label>
          <input
            :id="pw.id"
            v-model="pw.value"
            type="password"
            class="info-page__input"
            :placeholder="pw.placeholder"
          />
        </div>

        <div class="info-page__form-actions">
          <button class="info-page__btn-change-pw" @click="changePassword">비밀번호 변경</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * My Info Page Migration
 * - React MyInfo를 Nuxt로 마이그레이션
 * - 프로필 정보 관리 및 비밀번호 변경 기능
 * - Lucide-like SVG 아이콘 인라인 구현
 */

export default {
  name: 'MyInfoPage',
  components: {
    UserIcon: {
      template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
    },
    MailIcon: {
      template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>'
    },
    PhoneIcon: {
      template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>'
    },
    BriefcaseIcon: {
      template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>'
    }
  },
  data() {
    return {
      profileImg: null,
      infoFields: [
        { id: 'name', label: '이름', value: '홍길동', type: 'text', placeholder: '성함을 입력하세요', icon: 'UserIcon' },
        { id: 'email', label: '이메일', value: 'hong@example.com', type: 'email', placeholder: '이메일을 입력하세요', icon: 'MailIcon' },
        { id: 'phone', label: '전화번호', value: '010-1234-5678', type: 'text', placeholder: '번호를 입력하세요', icon: 'PhoneIcon' },
        { id: 'position', label: '직책', value: '금융 전문가', type: 'text', placeholder: '직책을 입력하세요', icon: 'BriefcaseIcon' }
      ],
      passwordFields: [
        { id: 'curr-pw', label: '현재 비밀번호', value: '', placeholder: '현재 비밀번호를 입력하세요' },
        { id: 'new-pw', label: '새 비밀번호', value: '', placeholder: '새 비밀번호를 입력하세요' },
        { id: 'confirm-pw', label: '새 비밀번호 확인', value: '', placeholder: '새 비밀번호를 한 번 더 입력하세요' }
      ]
    }
  },
  methods: {
    changePhoto() {
      alert('사진 변경 기능을 준비 중입니다.')
    },
    saveInfo() {
      alert('성공적으로 저장되었습니다.')
    },
    resetInfo() {
      if (confirm('수정사항을 취소하시겠습니까?')) {
        // 원래 값으로 복구하는 로직 (목데이터라 생략)
      }
    },
    changePassword() {
      if (!this.passwordFields[1].value || this.passwordFields[1].value !== this.passwordFields[2].value) {
        alert('새 비밀번호가 일치하지 않습니다.')
        return
      }
      alert('비밀번호가 성공적으로 변경되었습니다.')
      this.passwordFields.forEach((f) => {
        f.value = ''
      })
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/my/my-info-style.css';
</style>
