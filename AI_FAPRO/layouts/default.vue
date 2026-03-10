<template>
  <div class="main-layout" :class="{ 'main-layout--collapsed': isSidebarCollapsed }">
    <template v-if="isLoggedIn">
      <app-sidebar />
      <div class="main-layout__content-wrapper">
        <main class="main-layout__main">
          <nuxt />
        </main>
      </div>
    </template>
    
    <landing-view v-else />

    <global-modal-manager />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppSidebar from "~/components/layout/AppSidebar.vue";
import LandingView from "~/components/auth/LandingView.vue";
import GlobalModalManager from "~/components/modal/GlobalModalManager.vue";
import "~/assets/css/layout/default/default.css";

/**
 * 기능: 기본 레이아웃
 * 사이드바와 메인 콘텐츠 영역, 글로벌 모달 관리자를 포함합니다.
 * 다크 모드 토글을 지원하며 localStorage에 테마 설정을 저장합니다.
 */
export default {
  name: "DefaultLayout",
  components: {
    AppSidebar,
    GlobalModalManager,
    LandingView,
  },
  data() {
    return {
      // 다크 모드 활성화 여부
      isDarkMode: false,
    };
  },
  head() {
    return {
      htmlAttrs: {
        class: this.isDarkMode ? "dark" : "",
      },
    };
  },
  computed: {
    ...mapState('auth', ['isLoggedIn']),
    ...mapState('ui', ['isSidebarCollapsed']),
  },
  mounted() {
    // localStorage 또는 시스템 환경 설정에서 다크 모드 초기값 확인
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      this.isDarkMode = true;
    }
    this.$bus.$on("toggle-theme", this.toggleTheme);
  },
  beforeDestroy() {
    // 컴포넌트 소멸 전 이벤트 버스 구독 해제
    this.$bus.$off("toggle-theme", this.toggleTheme);
  },
  methods: {
    /**
     * @description 다크 모드를 전환하고 설정을 localStorage에 저장합니다.
     */
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");
    },
  },
};
</script>

