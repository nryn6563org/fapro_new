<template>
  <div class="app-sidebar__user-section">
    <transition name="fade">
      <div v-if="!isCollapsed" class="app-sidebar__user-wrapper">
        <!-- Thinkpool Banner -->
        <div class="app-sidebar__banner" @click="openThinkpool">
          <!-- Background Bubbles -->
          <div
            class="app-sidebar__banner-bubble app-sidebar__banner-bubble--1"
          ></div>
          <div
            class="app-sidebar__banner-bubble app-sidebar__banner-bubble--2"
          ></div>
          <div
            class="app-sidebar__banner-bubble app-sidebar__banner-bubble--3"
          ></div>

          <div class="app-sidebar__banner-header">
            <zap-icon size="14" class="text-white" />
            <span class="app-sidebar__banner-title">씽크풀</span>
          </div>
          <p class="app-sidebar__banner-text">
            종목 및 투자 정보는<br />씽크풀 사이트에서 확인해보세요
          </p>
        </div>

        <!-- User Profile -->
        <div class="app-sidebar__profile">
          <div class="app-sidebar__avatar">
            <user-icon size="16" class="text-teal-600" />
          </div>
          <div class="app-sidebar__profile-info">
            <div class="app-sidebar__profile-name">FA 김승원</div>
            <div class="app-sidebar__profile-role">Senior FA</div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="app-sidebar__actions">
          <button class="app-sidebar__logout-btn" @click="handleLogout">
            <log-out-icon size="14" />
            <span>로그아웃</span>
          </button>
          <button
            class="app-sidebar__theme-btn"
            title="테마 변경"
            @click="$bus.$emit('toggle-theme')"
          >
            <moon-icon size="14" />
          </button>
          <nuxt-link
            to="/settings"
            class="app-sidebar__settings-btn"
            title="설정"
          >
            <settings-icon size="14" />
          </nuxt-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/**
 * 기능: 사이드바 하단 프로필 및 부가 메뉴
 */
import {
  ZapIcon,
  UserIcon,
  MoonIcon,
  LogOutIcon,
  SettingsIcon,
} from "vue-feather-icons";
import "~/assets/css/layout/AppSidebarUser/AppSidebarUser.css";

export default {
  name: "AppSidebarUser",
  components: {
    ZapIcon,
    UserIcon,
    MoonIcon,
    LogOutIcon,
    SettingsIcon,
  },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /**
     * @description 씽크풀 사이트를 새 창으로 엽니다.
     */
    openThinkpool() {
      window.open("https://www.thinkpool.com/", "_blank");
    },
    /**
     * @description 로그아웃 처리를 수행합니다.
     */
    handleLogout() {
      this.$store.dispatch("auth/logout");
      // 메인 페이지로 이동 (필요시)
      this.$router.push("/");
    },
  },
};
</script>
