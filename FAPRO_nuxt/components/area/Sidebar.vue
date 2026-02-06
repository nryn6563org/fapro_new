<template>
  <aside class="c-sidebar" :class="{'c-sidebar--minimized': isMinimized}">
    <div class="c-sidebar__header">
      <button class="c-sidebar__toggle" @click="$emit('toggle')">
        <LayoutDashboard v-if="isMinimized" :size="20" />
        <span v-else class="c-sidebar__logo">FA Pro</span>
      </button>
    </div>

    <nav class="c-sidebar__nav">
      <!-- Dashboard Section -->
      <div class="c-sidebar__section">
        <nuxt-link to="/" class="c-sidebar__item" exact-active-class="c-sidebar__item--active">
          <LayoutDashboard class="c-sidebar__icon" :size="20" />
          <span v-if="!isMinimized" class="c-sidebar__label">대시보드</span>
        </nuxt-link>
      </div>

      <!-- Stock Management -->
      <div class="c-sidebar__section">
        <h2 v-if="!isMinimized" class="c-sidebar__title">종목관리</h2>
        <nuxt-link to="/stock/ranking" class="c-sidebar__item" active-class="c-sidebar__item--active"><BarChart3 class="c-sidebar__icon" :size="20" /><span v-if="!isMinimized" class="c-sidebar__label">종목랭킹</span></nuxt-link>
        <nuxt-link to="/stock/reports" class="c-sidebar__item" active-class="c-sidebar__item--active"><FileText class="c-sidebar__icon" :size="20" /><span v-if="!isMinimized" class="c-sidebar__label">AI 리포트</span></nuxt-link>
        <nuxt-link to="/stock/signals" class="c-sidebar__item" active-class="c-sidebar__item--active"><Zap class="c-sidebar__icon" :size="20" /><span v-if="!isMinimized" class="c-sidebar__label">시그널</span></nuxt-link>
        <nuxt-link to="/stock/quant" class="c-sidebar__item" active-class="c-sidebar__item--active"><PieChart class="c-sidebar__icon" :size="20" /><span v-if="!isMinimized" class="c-sidebar__label">퀀트</span></nuxt-link>
        <nuxt-link to="/stock/discovery" class="c-sidebar__item" active-class="c-sidebar__item--active"><Search class="c-sidebar__icon" :size="20" /><span v-if="!isMinimized" class="c-sidebar__label">AI종목발굴</span></nuxt-link>
      </div>

      <!-- Customer Management -->
      <div class="c-sidebar__section">
        <h2 v-if="!isMinimized" class="c-sidebar__title">고객관리</h2>
        <nuxt-link to="/customer/statistics" class="c-sidebar__item" active-class="c-sidebar__item--active"><LineChart class="c-sidebar__icon" :size="20" /><span v-if="!isMinimized" class="c-sidebar__label">고객통계</span></nuxt-link>
        <nuxt-link to="/customer/list" class="c-sidebar__item" active-class="c-sidebar__item--active"><Users class="c-sidebar__icon" :size="20" /><span v-if="!isMinimized" class="c-sidebar__label">고객목록</span></nuxt-link>
        <nuxt-link to="/customer/consultation" class="c-sidebar__item" active-class="c-sidebar__item--active"><MessageCircle class="c-sidebar__icon" :size="20" /><span v-if="!isMinimized" class="c-sidebar__label">상담관리</span></nuxt-link>
      </div>

      <!-- MY -->
      <div class="c-sidebar__section">
        <h2 v-if="!isMinimized" class="c-sidebar__title">MY</h2>
        <nuxt-link to="/my/schedule" class="c-sidebar__item" active-class="c-sidebar__item--active"><Calendar class="c-sidebar__icon" :size="20" /><span v-if="!isMinimized" class="c-sidebar__label">일정관리</span></nuxt-link>
        <nuxt-link to="/my/stocks" class="c-sidebar__item" active-class="c-sidebar__item--active"><Star class="c-sidebar__icon" :size="20" /><span v-if="!isMinimized" class="c-sidebar__label">관심종목</span></nuxt-link>
        <nuxt-link to="/my/investment" class="c-sidebar__item" active-class="c-sidebar__item--active"><BookOpen class="c-sidebar__icon" :size="20" /><span v-if="!isMinimized" class="c-sidebar__label">투자정보</span></nuxt-link>
        <nuxt-link to="/my/info" class="c-sidebar__item" active-class="c-sidebar__item--active"><User class="c-sidebar__icon" :size="20" /><span v-if="!isMinimized" class="c-sidebar__label">나의당보</span></nuxt-link>
        <nuxt-link to="/my/payment" class="c-sidebar__item" active-class="c-sidebar__item--active"><CreditCard class="c-sidebar__icon" :size="20" /><span v-if="!isMinimized" class="c-sidebar__label">결제정보</span></nuxt-link>
      </div>
    </nav>

    <div class="c-sidebar__footer">
      <button class="c-sidebar__logout-btn">
        <LogOut :size="18" />
        <span v-if="!isMinimized" class="c-sidebar__logout-label">로그아웃</span>
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'SidebarComponent',
  props: {
    isMinimized: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/area/sidebar.css';
</style>
