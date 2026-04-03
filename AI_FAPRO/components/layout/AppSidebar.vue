<template>
    <aside class="app-sidebar" :class="{ 'app-sidebar--collapsed': isCollapsed }">
    <!-- ── 로고 영역 ── -->
    <nuxt-link to="/" class="app-sidebar__logo-container">
      <div class="app-sidebar__logo-wrapper">
        <!-- New Logo Structure: Persistent Icon + Conditional Text -->
        <div class="app-sidebar__logo-icon-img"></div>
        <transition name="fade">
          <img
            v-if="!isCollapsed"
            src="~/assets/img/layout/logo_text.png"
            class="app-sidebar__logo-text-img"
          />
        </transition>
      </div>
    </nuxt-link>

    <!-- ── 사이드바 접기/펼치기 토글 버튼 ── -->
    <button class="app-sidebar__toggle-btn" @click="toggleSidebar">
      <img src="~/assets/img/layout/app-sidebar__toggle-btn.png" width="35">
    </button>

    <!-- ── 네비게이션 메뉴 ── -->
    <AppSidebarNav
      :is-collapsed="isCollapsed"
      :nav-items="navItems"
      @toggle-collapse="toggleSidebar"
    />

    <!-- ── 사용자 정보 영역 ── -->
    <AppSidebarUser :is-collapsed="isCollapsed" />
  </aside>
</template>

<script>
/**
 * 기능: 애플리케이션의 메인 사이드바 컴포넌트.
 * 로고, 네비게이션 메뉴, 사용자 정보 영역으로 구성되며,
 * 접기/펼치기 토글 기능을 제공합니다.
 * 하위 컴포넌트로 AppSidebarNav(네비게이션)와 AppSidebarUser(사용자 정보)를 포함합니다.
 */
import { mapState, mapMutations } from "vuex";
import AppSidebarNav from "~/components/layout/AppSidebarNav.vue";
import AppSidebarUser from "~/components/layout/AppSidebarUser.vue";
import "~/assets/css/layout/AppSidebar/AppSidebar.css";
import "~/assets/css/layout/AppSidebar/AppSidebarTheme.css";

export default {
  name: "AppSidebar",
  components: {
    AppSidebarNav,
    AppSidebarUser,
  },
  data() {
    return {
      /**
       * @type {Array} 네비게이션 메뉴 항목 목록.
       * 그룹(children 포함)과 단일 메뉴 항목을 모두 지원합니다.
       */
      navItems: [
        {
          label: "AI 세일즈 파트너",
          iconSvg: require("~/assets/img/layout/icons/nav-home.svg"),
          children: [
            { path: "/", label: "AI 인텔리전스 리포트" },
            { path: "/contact", label: "AI 컨텍 제안" },
            { path: "/issues", label: "AI 이슈 포착" },
            { path: "/signals", label: "AI 매매신호 포착" },
          ],
        },
        {
          label: "프리미엄 인사이트",
          iconSvg: require("~/assets/img/layout/icons/nav-list.svg"),
          children: [
            { path: "/strategic-stocks", label: "AI 중장기 유망주" },
          ],
        },
        { path: "/customers", label: "고객 목록", iconSvg: require("~/assets/img/layout/icons/nav-users.svg") },
        { path: "/schedule", label: "일정", iconSvg: require("~/assets/img/layout/icons/nav-package.svg") },
        { path: "/settings", label: "설정", iconSvg: require("~/assets/img/layout/icons/nav-settings.svg") },
      ],
    };
  },
  computed: {
    ...mapState("ui", {
      isCollapsed: (state) => state.isSidebarCollapsed,
    }),
  },
  methods: {
    ...mapMutations("ui", ["TOGGLE_SIDEBAR"]),
    /**
     * 사이드바 접기/펼치기 상태를 토글합니다.
     * isCollapsed 값을 반전시켜 사이드바 너비를 변경합니다.
     */
    toggleSidebar() {
      this.TOGGLE_SIDEBAR();
    },
  },
};
</script>
