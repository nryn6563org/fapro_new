<template>
  <aside class="c-sidebar" :class="{'c-sidebar--minimized': isMinimized}">
    <div class="c-sidebar__header">
      <div v-if="!isMinimized" class="c-sidebar__logo-wrapper">
        <span class="c-sidebar__logo">FA Pro</span>
      </div>
      <button class="c-sidebar__toggle" @click="$emit('toggle')" aria-label="메뉴 토글">
        <ChevronRight v-if="isMinimized" :size="20" />
        <ChevronLeft v-else :size="20" />
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
        <button 
          v-if="!isMinimized"
          class="c-sidebar__category-toggle" 
          @click="toggleSection('stock')"
        >
          <div class="c-sidebar__category-title">
            <TrendingUp class="c-sidebar__icon" :size="20" />
            <span class="c-sidebar__label">종목관리</span>
          </div>
          <ChevronRight 
            class="c-sidebar__arrow" 
            :class="{'c-sidebar__arrow--open': openSections.includes('stock')}" 
            :size="16" 
          />
        </button>
        <div v-else class="c-sidebar__item">
          <TrendingUp class="c-sidebar__icon" :size="20" />
        </div>

        <div v-if="!isMinimized && openSections.includes('stock')" class="c-sidebar__submenu">
          <nuxt-link to="/stock/ranking" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Crown class="c-sidebar__icon" :size="16" />
            <span class="c-sidebar__label">고객 보유 종목 랭킹</span>
          </nuxt-link>
          <nuxt-link to="/stock/reports" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <FileText class="c-sidebar__icon" :size="16" />
            <span class="c-sidebar__label">AI리포트 생성 종목</span>
          </nuxt-link>
          <nuxt-link to="/stock/issue" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <AlertCircle class="c-sidebar__icon" :size="16" />
            <span class="c-sidebar__label">이슈 발생 종목</span>
          </nuxt-link>
          <nuxt-link to="/stock/signals" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Activity class="c-sidebar__icon" :size="16" />
            <span class="c-sidebar__label">라씨시그널 발생 종목</span>
          </nuxt-link>
          <nuxt-link to="/stock/quant" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Calculator class="c-sidebar__icon" :size="16" />
            <span class="c-sidebar__label">퀀트 종목</span>
          </nuxt-link>
          <nuxt-link to="/stock/discovery" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Sparkles class="c-sidebar__icon" :size="16" />
            <span class="c-sidebar__label">AI종목발굴</span>
          </nuxt-link>
        </div>
      </div>

      <!-- Customer Management -->
      <div class="c-sidebar__section">
        <button 
          v-if="!isMinimized"
          class="c-sidebar__category-toggle" 
          @click="toggleSection('customer')"
        >
          <div class="c-sidebar__category-title">
            <Users class="c-sidebar__icon" :size="20" />
            <span class="c-sidebar__label">고객 관리</span>
          </div>
          <ChevronRight 
            class="c-sidebar__arrow" 
            :class="{'c-sidebar__arrow--open': openSections.includes('customer')}" 
            :size="16" 
          />
        </button>
        <div v-else class="c-sidebar__item">
          <Users class="c-sidebar__icon" :size="20" />
        </div>

        <div v-if="!isMinimized && openSections.includes('customer')" class="c-sidebar__submenu">
          <nuxt-link to="/customer/statistics" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <PieChart class="c-sidebar__icon" :size="16" />
            <span class="c-sidebar__label">고객 통계</span>
          </nuxt-link>
          <nuxt-link to="/customer/list" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Crown class="c-sidebar__icon" :size="16" />
            <span class="c-sidebar__label">고객 리스트</span>
          </nuxt-link>
          <nuxt-link to="/customer/consultation" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <MessageSquare class="c-sidebar__icon" :size="16" />
            <span class="c-sidebar__label">고객 상담 노트</span>
          </nuxt-link>
        </div>
      </div>

      <!-- MY -->
      <div class="c-sidebar__section">
        <button 
          v-if="!isMinimized"
          class="c-sidebar__category-toggle" 
          @click="toggleSection('my')"
        >
          <div class="c-sidebar__category-title">
            <UserCircle class="c-sidebar__icon" :size="20" />
            <span class="c-sidebar__label">MY</span>
          </div>
          <ChevronRight 
            class="c-sidebar__arrow" 
            :class="{'c-sidebar__arrow--open': openSections.includes('my')}" 
            :size="16" 
          />
        </button>
        <div v-else class="c-sidebar__item">
          <UserCircle class="c-sidebar__icon" :size="20" />
        </div>

        <div v-if="!isMinimized && openSections.includes('my')" class="c-sidebar__submenu">
          <nuxt-link to="/my/schedule" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Calendar class="c-sidebar__icon" :size="16" />
            <span class="c-sidebar__label">일정관리</span>
          </nuxt-link>
          <nuxt-link to="/my/stocks" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Briefcase class="c-sidebar__icon" :size="16" />
            <span class="c-sidebar__label">MY종목</span>
          </nuxt-link>
          <nuxt-link to="/my/investment" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Wallet class="c-sidebar__icon" :size="16" />
            <span class="c-sidebar__label">투자정보</span>
          </nuxt-link>
          <nuxt-link to="/my/info" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Info class="c-sidebar__icon" :size="16" />
            <span class="c-sidebar__label">나의정보</span>
          </nuxt-link>
          <nuxt-link to="/my/payment" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <CreditCard class="c-sidebar__icon" :size="16" />
            <span class="c-sidebar__label">결제정보</span>
          </nuxt-link>
          <nuxt-link to="/my/faq" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <HelpCircle class="c-sidebar__icon" :size="16" />
            <span class="c-sidebar__label">FAQ</span>
          </nuxt-link>
        </div>
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
import { 
  ChevronRight, 
  ChevronLeft, 
  LayoutDashboard, 
  TrendingUp, 
  Crown, 
  FileText, 
  AlertCircle, 
  Activity, 
  Calculator, 
  Sparkles, 
  Users, 
  PieChart, 
  MessageSquare, 
  UserCircle, 
  Calendar, 
  Briefcase, 
  Wallet, 
  Info, 
  CreditCard, 
  HelpCircle, 
  LogOut 
} from 'lucide-vue'

export default {
  name: 'SidebarComponent',
  components: {
    ChevronRight,
    ChevronLeft,
    LayoutDashboard,
    TrendingUp,
    Crown,
    FileText,
    AlertCircle,
    Activity,
    Calculator,
    Sparkles,
    Users,
    PieChart,
    MessageSquare,
    UserCircle,
    Calendar,
    Briefcase,
    Wallet,
    Info,
    CreditCard,
    HelpCircle,
    LogOut
  },
  props: {
    isMinimized: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      openSections: ['stock', 'customer', 'my']
    }
  },
  methods: {
    toggleSection(section) {
      if (this.openSections.includes(section)) {
        this.openSections = this.openSections.filter(s => s !== section)
      } else {
        this.openSections.push(section)
      }
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/area/sidebar.css';
</style>
