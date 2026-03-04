<template>
  <aside class="app-sidebar" :class="{ 'app-sidebar--collapsed': isCollapsed }">
    <!-- Logo Section -->
    <div class="app-sidebar__logo-container">
      <transition name="fade">
        <div v-if="!isCollapsed" class="app-sidebar__logo-wrapper">
          <div class="app-sidebar__logo-icon">
            <zap-icon size="20" class="text-white" />
          </div>
          <span class="app-sidebar__logo-text">AI FA_pro</span>
        </div>
      </transition>
    </div>

    <!-- Toggle Button -->
    <button class="app-sidebar__toggle-btn" @click="toggleSidebar">
      <chevron-left-icon
        size="16"
        class="text-white transition-transform"
        :class="{ 'rotate-180': isCollapsed }"
      />
    </button>

    <!-- Navigation -->
    <AppSidebarNav :is-collapsed="isCollapsed" :nav-items="navItems" />

    <!-- User Info Section -->
    <AppSidebarUser :is-collapsed="isCollapsed" />
  </aside>
</template>

<script>
import {
  ZapIcon,
  ChevronLeftIcon
} from 'vue-feather-icons'
import AppSidebarNav from '~/components/layout/AppSidebarNav.vue'
import AppSidebarUser from '~/components/layout/AppSidebarUser.vue'

export default {
  name: 'AppSidebar',
  components: {
    ZapIcon,
    ChevronLeftIcon,
    AppSidebarNav,
    AppSidebarUser
  },
  data() {
    return {
      isCollapsed: false,
      navItems: [
        {
          label: 'AI 세일즈 파트너',
          icon: 'ZapIcon',
          children: [
            { path: '/', label: 'AI 컨텍 제안', icon: 'BriefcaseIcon' },
            { path: '/signals', label: 'AI 매매신호 포착', icon: 'TrendingUpIcon' },
            { path: '/discovery', label: 'AI 인텔리전스 리포트', icon: 'FileTextIcon' }
          ]
        },
        {
          label: '프리미엄 인사이트',
          icon: 'StarIcon',
          children: [
            { path: '/strategic-stocks', label: 'AI 전략 유망주', icon: 'StarIcon' },
            { path: '/issues', label: 'AI 이슈 포착', icon: 'TargetIcon' }
          ]
        },
        { path: '/customers', label: '고객 목록', icon: 'UsersIcon' },
        { path: '/schedule', label: '일정', icon: 'CalendarIcon' },
        { path: '/settings', label: '설정', icon: 'SettingsIcon' }
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>

<style src="~/assets/css/layout/AppSidebar/AppSidebar.css" />
<style src="~/assets/css/layout/AppSidebar/AppSidebarTheme.css" />
