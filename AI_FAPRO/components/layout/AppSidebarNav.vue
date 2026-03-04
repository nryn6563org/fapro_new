<template>
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
          :class="{
            'app-sidebar__nav-item--expanded': isMenuExpanded(item.label),
            'app-sidebar__nav-item--parent-active': isChildActive(item)
          }"
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
</template>

<script>
/**
 * 기능: 앱 사이드바 네비게이션 메뉴
 */
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
  ChevronDownIcon
} from 'vue-feather-icons'
import '~/assets/css/layout/AppSidebarNav/AppSidebarNav.css'

export default {
  name: 'AppSidebarNav',
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
    ChevronDownIcon
  },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    },
    navItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      expandedMenus: {
        'AI 세일즈 파트너': true,
        '프리미엄 인사이트': true
      }
    }
  },
  methods: {
    toggleMenu(label) {
      this.$set(this.expandedMenus, label, !this.expandedMenus[label])
    },
    isMenuExpanded(label) {
      return !!this.expandedMenus[label]
    },
    isChildActive(item) {
      if (!item.children) return false
      return item.children.some(child => this.$route.path === child.path)
    }
  }
}
</script>
