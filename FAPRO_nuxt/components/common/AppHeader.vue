<template>
  <!-- Header 상단바 컴포넌트 -->
  <header class="header-container">
    <div class="header-inner">
      <!-- 로고 및 서비스명 섹션 -->
      <div class="header-logo-section">
        <h1 class="header-title">FA pro Dashboard</h1>
      </div>

      <!-- 종목 검색 섹션 -->
      <div class="header-search-section">
        <div class="search-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="search-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="종목 검색..."
            class="search-input"
          />
        </div>
      </div>

      <!-- 사용자 정보 및 설정 섹션 -->
      <div class="header-actions">
        <nuxt-link to="/my/info" class="user-avatar-link">
          <span>FA</span>
        </nuxt-link>
        <nuxt-link to="/my/payment" class="settings-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="settings-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
/**
 * Header 컴포넌트: 대시보드 상단바. 검색 및 사용자 아이콘 포함.
 * Header Component: Dashboard top bar. Includes search and user icons.
 */
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
@import '~/assets/css/common/header-style.css';
</style>
