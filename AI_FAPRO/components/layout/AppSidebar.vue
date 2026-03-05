<template>
  <aside class="app-sidebar" :class="{ 'app-sidebar--collapsed': isCollapsed }">
    <!-- ── 로고 영역 ── -->
    <div class="app-sidebar__logo-container">
      <transition name="fade">
        <!-- 사이드바 펼침 상태일 때만 로고 텍스트 표시 -->
        <div v-if="!isCollapsed" class="app-sidebar__logo-wrapper">
          <div class="app-sidebar__logo-icon">
            <zap-icon size="20" class="text-white" />
          </div>
          <span class="app-sidebar__logo-text">AI FA_pro</span>
        </div>
      </transition>
    </div>

    <!-- ── 사이드바 접기/펼치기 토글 버튼 ── -->
    <button class="app-sidebar__toggle-btn" @click="toggleSidebar">
      <chevron-left-icon
        size="16"
        class="text-white transition-transform"
        :class="{ 'rotate-180': isCollapsed }"
      />
    </button>

    <!-- ── 네비게이션 메뉴 ── -->
    <AppSidebarNav :is-collapsed="isCollapsed" :nav-items="navItems" />

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
import { ZapIcon, ChevronLeftIcon } from "vue-feather-icons";
import AppSidebarNav from "~/components/layout/AppSidebarNav.vue";
import AppSidebarUser from "~/components/layout/AppSidebarUser.vue";
import "~/assets/css/layout/AppSidebar/AppSidebar.css";
import "~/assets/css/layout/AppSidebar/AppSidebarTheme.css";

export default {
  name: "AppSidebar",
  components: {
    ZapIcon,
    ChevronLeftIcon,
    AppSidebarNav,
    AppSidebarUser,
  },
  data() {
    return {
      /** @type {boolean} 사이드바 접힘 상태 (true: 접힘, false: 펼침) */
      isCollapsed: false,
      /**
       * @type {Array} 네비게이션 메뉴 항목 목록.
       * 그룹(children 포함)과 단일 메뉴 항목을 모두 지원합니다.
       */
      navItems: [
        {
          label: "AI 세일즈 파트너",
          icon: "ZapIcon",
          children: [
            { path: "/", label: "AI 컨텍 제안", icon: "BriefcaseIcon" },
            { path: "/issues", label: "AI 이슈 포착", icon: "TargetIcon" },
            {
              path: "/signals",
              label: "AI 매매신호 포착",
              icon: "TrendingUpIcon",
            },
            {
              path: "/discovery",
              label: "AI 인텔리전스 리포트",
              icon: "FileTextIcon",
            },
          ],
        },
        {
          label: "프리미엄 인사이트",
          icon: "StarIcon",
          children: [
            {
              path: "/strategic-stocks",
              label: "AI 중장기 유망주",
              icon: "StarIcon",
            },
          ],
        },
        { path: "/customers", label: "고객 목록", icon: "UsersIcon" },
        { path: "/schedule", label: "일정", icon: "CalendarIcon" },
        { path: "/settings", label: "설정", icon: "SettingsIcon" },
      ],
    };
  },
  methods: {
    /**
     * 사이드바 접기/펼치기 상태를 토글합니다.
     * isCollapsed 값을 반전시켜 사이드바 너비를 변경합니다.
     */
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>
