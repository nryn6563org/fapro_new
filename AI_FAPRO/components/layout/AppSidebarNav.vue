<template>
  <nav class="app-sidebar__nav">
    <div v-for="(item, index) in navItems" :key="index">
      <!-- ── 하위 메뉴가 없는 단일 네비게이션 항목 ── -->
      <nuxt-link
        v-if="item.path"
        :to="item.path"
        class="app-sidebar__nav-item"
        :class="{ 'app-sidebar__nav-item--active': $route.path === item.path }"
      >
        <component :is="item.icon" size="20" class="app-sidebar__nav-icon" />
        <transition name="fade">
          <!-- 사이드바 펼침 상태일 때만 레이블 표시 -->
          <span v-if="!isCollapsed" class="app-sidebar__nav-label">
            {{ item.label }}
          </span>
        </transition>
      </nuxt-link>

      <!-- ── 하위 메뉴가 있는 그룹 네비게이션 항목 ── -->
      <div v-if="item.children" class="app-sidebar__nav-group">
        <!-- 그룹 헤더 (클릭 시 하위 메뉴 펼치기/접기) -->
        <div
          class="app-sidebar__nav-item"
          :class="{
            'app-sidebar__nav-item--expanded': isMenuExpanded(item.label),
            'app-sidebar__nav-item--parent-active': isChildActive(item),
          }"
          @click="handleParentClick(item)"
        >
          <component :is="item.icon" size="20" class="app-sidebar__nav-icon" />
          <transition name="fade">
            <!-- 사이드바 펼침 상태일 때 레이블과 화살표 아이콘 표시 -->
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

        <!-- ── 하위 메뉴 목록 (슬라이드 애니메이션) ── -->
        <transition name="slide">
          <div
            v-if="!isCollapsed && isMenuExpanded(item.label)"
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
  </nav>
</template>

<script>
/**
 * 기능: 앱 사이드바의 네비게이션 메뉴 컴포넌트
 * 단일 메뉴 항목과 하위 메뉴 그룹을 모두 지원하며,
 * 그룹 메뉴의 펼치기/접기 상태를 내부적으로 관리합니다.
 * 사이드바 접힘(isCollapsed) 상태에 따라 레이블 표시 여부를 조절합니다.
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
import "~/assets/css/layout/AppSidebarNav/AppSidebarNav.css";

export default {
  name: "AppSidebarNav",
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
    /** @prop {boolean} isCollapsed - 사이드바 접힘 상태 */
    isCollapsed: {
      type: Boolean,
      default: false,
    },
    /** @prop {Array} navItems - 네비게이션 메뉴 항목 배열 */
    navItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      /**
       * @type {Object} 각 그룹 메뉴의 펼침/접힘 상태 맵.
       * 키: 메뉴 레이블, 값: 펼침 여부(boolean).
       * 초기값으로 주요 그룹은 펼쳐진 상태로 설정됩니다.
       */
      expandedMenus: {
        "AI 세일즈 파트너": true,
        "프리미엄 인사이트": true,
      },
    };
  },
  methods: {
    /**
     * 특정 그룹 메뉴의 펼치기/접기 상태를 토글합니다.
     * @param {string} label - 토글할 메뉴 그룹의 레이블
     */
    toggleMenu(label) {
      this.$set(this.expandedMenus, label, !this.expandedMenus[label]);
    },
    /**
     * @description 부모 메뉴 클릭 핸들러
     * 사이드바가 접힌 상태이면 펼치기 이벤트를 발생시키고 첫 번째 자식 메뉴로 이동합니다.
     * 펼쳐진 상태이면 하위 메뉴를 토글합니다.
     * @param {Object} item - 클릭된 메뉴 항목
     */
    handleParentClick(item) {
      if (this.isCollapsed) {
        // 1. 사이드바 펼치기 이벤트 전송
        this.$emit('toggle-collapse');
        // 2. 첫 번째 자식 메뉴로 이동
        if (item.children && item.children.length > 0) {
          const firstChild = item.children[0];
          if (this.$route.path !== firstChild.path) {
            this.$router.push(firstChild.path);
          }
        }
      } else {
        this.toggleMenu(item.label);
      }
    },
    /**
     * 특정 그룹 메뉴가 현재 펼쳐진 상태인지 확인합니다.
     * @param {string} label - 확인할 메뉴 그룹의 레이블
     * @returns {boolean} 펼쳐진 상태이면 true
     */
    isMenuExpanded(label) {
      return !!this.expandedMenus[label];
    },
    /**
     * 그룹 메뉴의 하위 항목 중 현재 라우트와 일치하는 항목이 있는지 확인합니다.
     * 부모 메뉴에 활성화 스타일을 적용하기 위해 사용됩니다.
     * @param {Object} item - 확인할 메뉴 그룹 항목
     * @returns {boolean} 활성화된 자식 항목이 있으면 true
     */
    isChildActive(item) {
      if (!item.children) return false;
      return item.children.some((child) => this.$route.path === child.path);
    },
  },
};
</script>
