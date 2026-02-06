<template>
  <!-- Sidebar 사이드바 컴포넌트 -->
  <aside
    class="sidebar-container"
    :class="isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'"
  >
    <!-- 사이드바 상단 타이틀 및 토글 버튼 -->
    <div class="sidebar-header">
      <span v-if="!isCollapsed" class="sidebar-header-title">메뉴</span>
      <button class="sidebar-toggle-btn" @click="$emit('toggle')">
        <svg v-if="isCollapsed" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>

    <!-- 네비게이션 메뉴 -->
    <nav class="sidebar-nav">
      <!-- 대시보드 메인 링크 -->
      <nuxt-link to="/" class="nav-item-btn" :class="$route.path === '/' ? 'nav-item-active' : 'nav-item-ghost'">
        <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span v-if="!isCollapsed" class="nav-label">대시보드</span>
      </nuxt-link>

      <!-- 종목관리 섹션 -->
      <div class="nav-section">
        <button
          v-if="!isCollapsed"
          class="nav-section-trigger"
          @click="toggleSection('stock')"
        >
          <div class="nav-section-label-group">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span class="nav-label">종목관리</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="nav-chevron" :class="openSections.includes('stock') ? 'nav-chevron-rotated' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div v-show="isCollapsed || openSections.includes('stock')" class="nav-sub-menu" :class="{ 'collapsed-sub-menu': isCollapsed }">
           <nuxt-link v-for="item in stockMenuItems" :key="item.path" :to="item.path" class="nav-sub-item-btn" :class="{ 'nav-sub-item-active': checkActive(item) }" :title="isCollapsed ? item.label : ''">
             <svg xmlns="http://www.w3.org/2000/svg" class="nav-sub-icon" :class="{ 'nav-sub-icon--collapsed': isCollapsed }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
             </svg>
             <span v-if="!isCollapsed" class="nav-label">{{ item.label }}</span>
           </nuxt-link>
        </div>
      </div>

      <!-- 고객관리 섹션 -->
      <div class="nav-section">
        <button
          v-if="!isCollapsed"
          class="nav-section-trigger"
          @click="toggleSection('customer')"
        >
          <div class="nav-section-label-group">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span class="nav-label">고객 관리</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="nav-chevron" :class="openSections.includes('customer') ? 'nav-chevron-rotated' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div v-show="isCollapsed || openSections.includes('customer')" class="nav-sub-menu" :class="{ 'collapsed-sub-menu': isCollapsed }">
           <nuxt-link v-for="item in customerMenuItems" :key="item.path" :to="item.path" class="nav-sub-item-btn" :class="{ 'nav-sub-item-active': checkActive(item) }" :title="isCollapsed ? item.label : ''">
             <svg xmlns="http://www.w3.org/2000/svg" class="nav-sub-icon" :class="{ 'nav-sub-icon--collapsed': isCollapsed }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
             </svg>
             <span v-if="!isCollapsed" class="nav-label">{{ item.label }}</span>
           </nuxt-link>
        </div>
      </div>

      <!-- MY 섹션 -->
      <div class="nav-section">
        <button
          v-if="!isCollapsed"
          class="nav-section-trigger"
          @click="toggleSection('my')"
        >
          <div class="nav-section-label-group">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="nav-label">MY</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="nav-chevron" :class="openSections.includes('my') ? 'nav-chevron-rotated' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div v-show="isCollapsed || openSections.includes('my')" class="nav-sub-menu" :class="{ 'collapsed-sub-menu': isCollapsed }">
           <nuxt-link v-for="item in myMenuItems" :key="item.path" :to="item.path" class="nav-sub-item-btn" :class="{ 'nav-sub-item-active': checkActive(item) }" :title="isCollapsed ? item.label : ''">
             <svg xmlns="http://www.w3.org/2000/svg" class="nav-sub-icon" :class="{ 'nav-sub-icon--collapsed': isCollapsed }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
             </svg>
             <span v-if="!isCollapsed" class="nav-label">{{ item.label }}</span>
           </nuxt-link>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script>
/**
 * Sidebar 컴포넌트: 왼쪽 네비게이션 메뉴. 아코디언 메뉴 및 축소/확장 기능 포함.
 * Sidebar Component: Left navigation menu. Includes accordion menus and collapse/expand features.
 */
export default {
  name: 'AppSidebar',
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      openSections: ['stock', 'customer', 'my'],
      stockMenuItems: [
        { path: '/stock/ranking', label: '고객 보유 종목 랭킹', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { path: '/stock/report', label: 'AI리포트 생성 종목', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { path: '/stock/issue', label: '이슈 발생 종목', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { path: '/stock/racy-signal', label: '라씨시그널 발생 종목', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        { path: '/stock/quant', label: '퀀트 종목', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' },
        { path: '/stock/ai-discovery', label: 'AI종목발굴', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' }
      ],
      customerMenuItems: [
        { path: '/customer/statistics', label: '고객 통계', icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z' },
        { path: '/customer/ranking', label: '고객 리스트', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
        { path: '/customer/ranking?tab=investment', label: '고객 랭킹', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { path: '/customer/ranking?tab=return', label: '고객 수익률', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' }
      ],
      myMenuItems: [
        { path: '/my/schedule', label: '일정관리', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { path: '/my/stocks', label: 'MY종목', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
        { path: '/my/investment', label: '투자정보', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
        { path: '/my/info', label: '나의정보', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { path: '/my/payment', label: '결제정보', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
        { path: '/my/faq', label: 'FAQ', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
      ]
    }
  },
  methods: {
    /**
     * 섹션 열림/닫힘 상태를 토글합니다.
     * Toggles the open/close state of a section.
     */
    toggleSection(section) {
      if (this.openSections.includes(section)) {
        this.openSections = this.openSections.filter(s => s !== section)
      } else {
        this.openSections.push(section)
      }
    },
    checkActive(item) {
      const currentPath = this.$route.path
      const currentQuery = this.$route.query

      // URL 파싱 (path / query 분리)
      const [path, queryString] = item.path.split('?')

      // 1. Path 불일치 시 false
      if (currentPath !== path) { return false }

      // 2. Query String이 없는 항목이면 Path만 일치하면 true
      if (!queryString) {
        // 단, 현재 URL에 tab 등 주요 쿼리가 있는데 메뉴 항목에는 없다면?
        // 일반 메뉴는 쿼리 무관하게 활성화 될 수도 있지만,
        // 여기서는 "고객 리스트(쿼리X)" vs "고객 랭킹(쿼리O)" 구분을 위해
        // "메뉴에 쿼리가 없으면 현재 쿼리도 주요 키가 없어야 한다"는 로직이 필요할 수 있음.
        // 하지만 단순화를 위해 path 일치 시 활성화 (기존 로직 보완)
        // 고객 리스트(/ranking)와 고객 랭킹(/ranking?tab=...)이 공존하므로
        // tab 쿼리가 있으면 "고객 리스트"는 비활성화 되어야 할 수도 있음.
        // 로직: item.path에 쿼리가 없으면, 현재 쿼리에 'tab'이 없어야 완전 일치로 본다.
        if (path.includes('ranking') && currentQuery.tab) { return false }
        return true
      }

      // 3. Query String 비교
      const itemParams = new URLSearchParams(queryString)
      for (const [key, value] of itemParams) {
        if (currentQuery[key] !== value) { return false }
      }

      return true
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/common/sidebar-style.css';
</style>
