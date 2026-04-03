<template>
  <nav class="app-sidebar__nav">
    <div v-for="(item, index) in navItems" :key="index">
      <app-sidebar-nav-item
        :item="item"
        :is-collapsed="isCollapsed"
        :is-expanded="!!expandedMenus[item.label]"
        @parent-click="handleParentClick"
      />
    </div>
  </nav>
</template>

<script>
/**
 * 기능: 앱 사이드바의 네비게이션 메뉴 컴포넌트 (Modularized)
 */
import AppSidebarNavItem from "./AppSidebarNav/AppSidebarNavItem.vue";
import "~/assets/css/layout/AppSidebarNav/AppSidebarNav.css";

export default {
  name: "AppSidebarNav",
  components: {
    AppSidebarNavItem,
  },
  props: {
    // 사이드바 접힘 상태
    isCollapsed: {
      type: Boolean,
      default: false,
    },
    // 네비게이션 메뉴 항목 배열
    navItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // 그룹 메뉴의 펼침/접힘 상태 맵
      expandedMenus: {
        "AI 세일즈 파트너": true,
        "프리미엄 인사이트": true,
      },
    };
  },
  methods: {
    /**
     * @description 부모 메뉴 클릭 핸들러
     * @param {Object} item - 클릭된 메뉴 항목
     */
    handleParentClick(item) {
      if (item.children && item.children.length > 0) {
        const firstChild = item.children[0];
        if (this.$route.path !== firstChild.path) {
          this.$router.push(firstChild.path);
        }
        if (!this.isCollapsed) {
          this.$set(this.expandedMenus, item.label, true);
        }
      }
    },
  },
};
</script>

