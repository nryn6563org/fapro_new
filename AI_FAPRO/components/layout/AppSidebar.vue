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
    <nav class="app-sidebar__nav">
      <div v-for="(item, index) in navItems" :key="index">
        <!-- Section without children -->
        <nuxt-link
          v-if="item.path"
          :to="item.path"
          class="app-sidebar__nav-item"
          :class="{ 'app-sidebar__nav-item--active': $route.path === item.path }"
        >
          <component :is="item.icon" size="20" class="app-sidebar__nav-icon" />
          <transition name="fade">
            <span v-if="!isCollapsed" class="app-sidebar__nav-label">
              {{ item.label }}
            </span>
          </transition>
        </nuxt-link>

        <!-- Section with children -->
        <div v-if="item.children" class="app-sidebar__nav-group">
          <div
            class="app-sidebar__nav-item"
            :class="{ 'app-sidebar__nav-item--expanded': isMenuExpanded(item.label) }"
            @click="!isCollapsed && toggleMenu(item.label)"
          >
            <component :is="item.icon" size="20" class="app-sidebar__nav-icon" />
            <transition name="fade">
              <div v-if="!isCollapsed" class="app-sidebar__nav-label-wrapper">
                <span class="app-sidebar__nav-label">{{ item.label }}</span>
                <chevron-down-icon
                  size="16"
                  class="transition-transform duration-200"
                  :class="{ 'rotate-180': isMenuExpanded(item.label) }"
                />
              </div>
            </transition>
          </div>

          <transition name="slide">
            <div v-if="!isCollapsed && isMenuExpanded(item.label)" class="app-sidebar__subnav">
              <nuxt-link
                v-for="(child, childIndex) in item.children"
                :key="'child-' + childIndex"
                :to="child.path"
                class="app-sidebar__subnav-item"
                :class="{ 'app-sidebar__subnav-item--active': $route.path === child.path }"
              >
                <span class="app-sidebar__subnav-bullet">•</span>
                <span class="app-sidebar__subnav-label">{{ child.label }}</span>
              </nuxt-link>
            </div>
          </transition>
        </div>
      </div>
    </nav>

    <!-- User Info Section (Implementation simplified for brevity) -->
    <div class="app-sidebar__user-section">
      <transition name="fade">
        <div v-if="!isCollapsed" class="app-sidebar__user-wrapper flex gap-2">
          <button
            @click="$bus.$emit('toggle-theme')"
            class="app-sidebar__theme-btn"
            title="테마 변경"
          >
            <moon-icon size="14" />
          </button>
          <nuxt-link to="/settings" class="app-sidebar__user-btn">
            <user-icon size="14" />
            <span>설정</span>
          </nuxt-link>
        </div>
      </transition>
    </div>
  </aside>
</template>

<script>
import {
  ZapIcon,
  StarIcon,
  BriefcaseIcon,
  TrendingUpIcon,
  FileTextIcon,
  TargetIcon,
  UsersIcon,
  CalendarIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  UserIcon,
  MoonIcon
} from 'vue-feather-icons'

export default {
  name: 'AppSidebar',
  components: {
    ZapIcon,
    StarIcon,
    BriefcaseIcon,
    TrendingUpIcon,
    FileTextIcon,
    TargetIcon,
    UsersIcon,
    CalendarIcon,
    SettingsIcon,
    ChevronLeftIcon,
    ChevronDownIcon,
    UserIcon,
    MoonIcon
  },
  data() {
    return {
      isCollapsed: false,
      expandedMenus: {
        'AI 세일즈 파트너': true,
        '프리미엄 인사이트': true
      },
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
    },
    toggleMenu(label) {
      this.$set(this.expandedMenus, label, !this.expandedMenus[label])
    },
    isMenuExpanded(label) {
      return !!this.expandedMenus[label]
    }
  }
}
</script>

<style src="~/assets/css/layout/AppSidebar/AppSidebar.css" />
<style src="~/assets/css/layout/AppSidebar/AppSidebarTheme.css" />
