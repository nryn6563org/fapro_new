<template>
  <!-- Default Layout: 사이드바와 상단바를 포함한 기본 레이아웃 -->
  <div class="layout-wrapper">
    <!-- 상단 헤더 -->
    <AppHeader />

    <div class="layout-body">
      <!-- 왼쪽 사이드바 -->
      <AppSidebar
        :is-collapsed="isCollapsed"
        @toggle="isCollapsed = !isCollapsed"
      />

      <!-- 메인 콘텐츠 영역 -->
      <main class="main-content">
        <div class="content-body">
          <Nuxt />
        </div>
        <!-- 하단 푸터 (메인 콘텐츠와 함께 이동/스크롤) -->
        <AppFooter />
      </main>

      <!-- 오른쪽 패널 -->
      <RightPanel />
    </div>
  </div>
</template>

<script>
/**
 * Default Layout: 프로젝트의 전역 레이아웃. 헤더, 사이드바, 푸터를 포함합니다.
 * Default Layout: Global layout of the project. Includes header, sidebar, and footer.
 */
import AppHeader from '~/components/common/AppHeader.vue'
import AppSidebar from '~/components/common/AppSidebar.vue'
import AppFooter from '~/components/common/AppFooter.vue'
import RightPanel from '~/components/common/RightPanel.vue'

export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
    AppSidebar,
    AppFooter,
    RightPanel
  },
  data() {
    return {
      isCollapsed: false
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/common/layout-style.css';
</style>
