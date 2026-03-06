<template>
  <div class="app-sidebar__nav-item-wrapper">
    <!-- ── 하위 메뉴가 없는 단일 네비게이션 항목 ── -->
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

    <!-- ── 하위 메뉴가 있는 그룹 네비게이션 항목 ── -->
    <div v-if="item.children" class="app-sidebar__nav-group">
      <div
        class="app-sidebar__nav-item"
        :class="{
          'app-sidebar__nav-item--expanded': isExpanded,
          'app-sidebar__nav-item--parent-active': isChildActive,
        }"
        @click="$emit('parent-click', item)"
      >
        <component :is="item.icon" size="20" class="app-sidebar__nav-icon" />
        <transition name="fade">
          <div v-if="!isCollapsed" class="app-sidebar__nav-label-wrapper">
            <span class="app-sidebar__nav-label">{{ item.label }}</span>
            <chevron-down-icon
              size="16"
              class="transition-transform duration-200"
              :class="{ 'rotate-180': isExpanded }"
            />
          </div>
        </transition>
      </div>

      <!-- 하위 메뉴 목록 -->
      <transition name="slide">
        <div
          v-if="!isCollapsed && isExpanded"
          class="app-sidebar__subnav"
        >
          <nuxt-link
            v-for="(child, childIndex) in item.children"
            :key="'child-' + childIndex"
            :to="child.path"
            class="app-sidebar__subnav-item"
            :class="{
              'app-sidebar__subnav-item--active': $route.path === child.path,
            }"
          >
            <span class="app-sidebar__subnav-bullet">•</span>
            <span class="app-sidebar__subnav-label">{{ child.label }}</span>
          </nuxt-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 앱 사이드바 네비게이션 단일 항목/그룹 컴포넌트
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
  ChevronDownIcon,
} from "vue-feather-icons";

export default {
  name: "AppSidebarNavItem",
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
    ChevronDownIcon,
  },
  props: {
    item: { type: Object, required: true },
    isCollapsed: { type: Boolean, default: false },
    isExpanded: { type: Boolean, default: false },
  },
  computed: {
    /**
     * @description 자식 메뉴 중 활성화된 메뉴가 있는지 확인
     */
    isChildActive() {
      if (!this.item.children) return false;
      return this.item.children.some((child) => this.$route.path === child.path);
    },
  },
};
</script>
