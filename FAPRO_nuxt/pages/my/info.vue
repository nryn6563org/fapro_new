<template>
  <div class="p-my-info">
    <header class="p-my-info__header">
      <h2 class="p-my-info__title">나의 정보</h2>
      <p class="p-my-info__desc">개인 정보 및 비밀번호를 관리합니다.</p>
    </header>

    <div class="p-my-info__content">
      <div class="p-my-info__section">
        <h3 class="p-my-info__section-title">기본 정보</h3>
        <div class="p-my-info__form">
          <div class="p-my-info__field">
            <label class="p-my-info__label">이름</label>
            <input type="text" value="홍길동" class="c-input" readonly />
          </div>
          <div class="p-my-info__field">
            <label class="p-my-info__label">이메일</label>
            <input type="email" value="gildong.hong@fapro.com" class="c-input" readonly />
          </div>
          <div class="p-my-info__field">
            <label class="p-my-info__label">소속 지점</label>
            <input type="text" value="강남 PB센터" class="c-input" />
          </div>
          <div class="p-my-info__field">
            <label class="p-my-info__label">직급</label>
            <input type="text" value="팀장" class="c-input" />
          </div>
        </div>
      </div>

      <div class="p-my-info__section">
        <h3 class="p-my-info__section-title">보안 설정</h3>
        <div class="p-my-info__form">
          <div class="p-my-info__field">
            <label class="p-my-info__label">현재 비밀번호</label>
            <input type="password" placeholder="********" class="c-input" />
          </div>
          <div class="p-my-info__field">
            <label class="p-my-info__label">새 비밀번호</label>
            <input type="password" placeholder="새 비밀번호 입력" class="c-input" />
          </div>
          <div class="p-my-info__field">
            <label class="p-my-info__label">새 비밀번호 확인</label>
            <input type="password" placeholder="새 비밀번호 재입력" class="c-input" />
          </div>
        </div>
      </div>

      <div class="p-my-info__actions">
        <button class="c-btn c-btn--primary">저장하기</button>
        <button class="c-btn c-btn--outline">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyInfoPage'
}
</script>

<style scoped>
@import '@/assets/css/page/my/info.css';
</style>
