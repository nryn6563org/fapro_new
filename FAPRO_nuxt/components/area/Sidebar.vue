<template>
  <aside class="c-sidebar" :class="{'c-sidebar--minimized': isMinimized}">
    <!-- 상단 헤더 영역 (제거됨) -->

    <nav class="c-sidebar__nav">
      <!-- 대시보드 섹션 -->
      <div class="c-sidebar__section">
        <nuxt-link to="/" class="c-sidebar__item" exact-active-class="c-sidebar__item--active">
          <LayoutDashboard class="c-sidebar__icon text-purple-500" :size="20" />
          <span class="c-sidebar__label">대시보드</span>
        </nuxt-link>
      </div>

      <!-- 종목 관리 섹션 -->
      <div class="c-sidebar__section">
        <button 
          v-if="!isMinimized"
          class="c-sidebar__category-toggle" 
          @click="toggleSection('stock')"
        >
          <div class="c-sidebar__category-title">
            <TrendingUp class="c-sidebar__icon text-blue-500" :size="20" />
            <span class="c-sidebar__label">종목관리</span>
          </div>
          <ChevronRight 
            class="c-sidebar__arrow" 
            :class="{'c-sidebar__arrow--open': openSections.includes('stock')}" 
            :size="16" 
          />
        </button>

        <div v-if="isMinimized || openSections.includes('stock')" class="c-sidebar__submenu">
          <nuxt-link to="/stock/ranking" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Crown class="c-sidebar__icon text-yellow-500" :size="16" />
            <span class="c-sidebar__label">고객 보유 종목 랭킹</span>
          </nuxt-link>
          <nuxt-link to="/stock/reports" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <FileText class="c-sidebar__icon text-green-500" :size="16" />
            <span class="c-sidebar__label">AI리포트 생성 종목</span>
          </nuxt-link>
          <nuxt-link to="/stock/issue" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <AlertCircle class="c-sidebar__icon text-red-500" :size="16" />
            <span class="c-sidebar__label">이슈 발생 종목</span>
          </nuxt-link>
          <nuxt-link to="/stock/signals" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Activity class="c-sidebar__icon text-indigo-500" :size="16" />
            <span class="c-sidebar__label">라씨시그널 발생 종목</span>
          </nuxt-link>
          <nuxt-link to="/stock/quant" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Calculator class="c-sidebar__icon text-pink-500" :size="16" />
            <span class="c-sidebar__label">퀀트 종목</span>
          </nuxt-link>
          <nuxt-link to="/stock/discovery" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Sparkles class="c-sidebar__icon text-violet-500" :size="16" />
            <span class="c-sidebar__label">AI종목발굴</span>
          </nuxt-link>
        </div>
      </div>

      <!-- 고객 관리 섹션 -->
      <div class="c-sidebar__section">
        <button 
          v-if="!isMinimized"
          class="c-sidebar__category-toggle" 
          @click="toggleSection('customer')"
        >
          <div class="c-sidebar__category-title">
            <Users class="c-sidebar__icon text-teal-500" :size="20" />
            <span class="c-sidebar__label">고객 관리</span>
          </div>
          <ChevronRight 
            class="c-sidebar__arrow" 
            :class="{'c-sidebar__arrow--open': openSections.includes('customer')}" 
            :size="16" 
          />
        </button>

        <div v-if="isMinimized || openSections.includes('customer')" class="c-sidebar__submenu">
          <nuxt-link to="/customer/statistics" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <PieChart class="c-sidebar__icon text-cyan-500" :size="16" />
            <span class="c-sidebar__label">고객 통계</span>
          </nuxt-link>
          <nuxt-link to="/customer/list" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Crown class="c-sidebar__icon text-orange-500" :size="16" />
            <span class="c-sidebar__label">고객 리스트</span>
          </nuxt-link>
          <nuxt-link to="/customer/consultation" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <MessageSquare class="c-sidebar__icon text-orange-400" :size="16" />
            <span class="c-sidebar__label">고객 상담 노트</span>
          </nuxt-link>
        </div>
      </div>

      <!-- MY(마이페이지) 섹션 -->
      <div class="c-sidebar__section">
        <button 
          v-if="!isMinimized"
          class="c-sidebar__category-toggle" 
          @click="toggleSection('my')"
        >
          <div class="c-sidebar__category-title">
            <UserCircle class="c-sidebar__icon text-indigo-600" :size="20" />
            <span class="c-sidebar__label">MY</span>
          </div>
          <ChevronRight 
            class="c-sidebar__arrow" 
            :class="{'c-sidebar__arrow--open': openSections.includes('my')}" 
            :size="16" 
          />
        </button>

        <div v-if="isMinimized || openSections.includes('my')" class="c-sidebar__submenu">
          <nuxt-link to="/my/schedule" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Calendar class="c-sidebar__icon text-blue-400" :size="16" />
            <span class="c-sidebar__label">일정관리</span>
          </nuxt-link>
          <nuxt-link to="/my/stocks" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Briefcase class="c-sidebar__icon text-amber-600" :size="16" />
            <span class="c-sidebar__label">MY종목</span>
          </nuxt-link>
          <nuxt-link to="/my/investment" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Wallet class="c-sidebar__icon text-emerald-600" :size="16" />
            <span class="c-sidebar__label">투자정보</span>
          </nuxt-link>
          <nuxt-link to="/my/info" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <Info class="c-sidebar__icon text-sky-500" :size="16" />
            <span class="c-sidebar__label">나의정보</span>
          </nuxt-link>
          <nuxt-link to="/my/payment" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <CreditCard class="c-sidebar__icon text-rose-500" :size="16" />
            <span class="c-sidebar__label">결제정보</span>
          </nuxt-link>
          <nuxt-link to="/my/faq" class="c-sidebar__subitem" active-class="c-sidebar__subitem--active">
            <HelpCircle class="c-sidebar__icon text-slate-500" :size="16" />
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
      // 열려있는 하위 메뉴 섹션 ID 목록
      openSections: ['stock', 'customer', 'my']
    }
  },
  methods: {
    /**
     * 사이드바 섹션(카테고리) 토글 함수
     * @param {string} section - 토글할 섹션 ID ('stock', 'customer', 'my')
     * 이미 열려있으면 닫고, 닫혀있으면 엽니다.
     */
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
