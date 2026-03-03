<template>
  <div class="schedule-page">
    <schedule-header
      :current-date="currentDate"
      :selected-date="selectedDate"
      :view-mode.sync="viewMode"
      :is-synced="isSynced"
      :is-syncing="isSyncing"
      :search-query.sync="searchQuery"
      @today="goToday"
      @prev="navigate(-1)"
      @next="navigate(1)"
      @sync="showSyncModal = true"
      @unsync="showUnsyncModal = true"
    />

    <div class="schedule-page__body">
      <!-- Sidebar -->
      <schedule-sidebar
        :current-date="currentDate"
        :selected-date="selectedDate"
        :calendars="calendars"
        :events="events"
        @update:selectedDate="handleSidebarDateSelect"
        @prev-month="navigateMonth(-1)"
        @next-month="navigateMonth(1)"
        @toggle-calendar="toggleCalendar"
      />

      <!-- Main Calendar View -->
      <div class="schedule-page__main">
        <schedule-day-view
          v-if="viewMode === 'day'"
          :selected-date="selectedDate"
          :events="filteredEvents"
        />
        <schedule-week-view
          v-else-if="viewMode === 'week'"
          :current-date="currentDate"
          :selected-date="selectedDate"
          :events="filteredEvents"
          @select-date="selectedDate = $event"
        />
        <schedule-month-view
          v-else-if="viewMode === 'month'"
          :current-date="currentDate"
          :events="filteredEvents"
        />
      </div>
    </div>

    <!-- Sync Modals -->
    <schedule-sync-modal
      :show="showSyncModal"
      mode="sync"
      @close="showSyncModal = false"
      @confirm-sync="handleConfirmSync"
    />
    <schedule-sync-modal
      :show="showUnsyncModal"
      mode="unsync"
      @close="showUnsyncModal = false"
      @confirm-unsync="handleConfirmUnsync"
    />
    <schedule-sync-modal :show="isSyncing" mode="syncing" />
  </div>
</template>

<script>
/**
 * 기능: 캘린더 메인 페이지 (일정 관리 및 동기화)
 */
import ScheduleHeader from '~/components/schedule/ScheduleHeader.vue'
import ScheduleSidebar from '~/components/schedule/ScheduleSidebar.vue'
import ScheduleDayView from '~/components/schedule/ScheduleDayView.vue'
import ScheduleWeekView from '~/components/schedule/ScheduleWeekView.vue'
import ScheduleMonthView from '~/components/schedule/ScheduleMonthView.vue'
import ScheduleSyncModal from '~/components/schedule/ScheduleSyncModal.vue'
import { events, myCalendars } from '~/utils/scheduleMockData.js'
import '~/assets/css/pages/schedule/SchedulePage.css'

export default {
  name: 'SchedulePage',
  components: {
    ScheduleHeader,
    ScheduleSidebar,
    ScheduleDayView,
    ScheduleWeekView,
    ScheduleMonthView,
    ScheduleSyncModal
  },
  layout: 'default',
  data() {
    return {
      currentDate: new Date(),
      selectedDate: new Date(),
      viewMode: 'week',
      isSynced: true,
      isSyncing: false,
      searchQuery: '',
      events: [...events],
      calendars: [...myCalendars],
      showSyncModal: false,
      showUnsyncModal: false
    }
  },
  computed: {
    filteredEvents() {
      const activeTypes = this.calendars.filter((c) => c.checked).map((c) => c.name)
      return this.events.filter((e) => {
        const matchesType = activeTypes.includes(e.type)
        const matchesSearch = e.title.includes(this.searchQuery)
        return matchesType && matchesSearch
      })
    }
  },
  methods: {
    goToday() {
      this.currentDate = new Date()
      this.selectedDate = new Date()
    },
    navigate(direction) {
      const newDate = new Date(this.currentDate)
      if (this.viewMode === 'week') {
        newDate.setDate(newDate.getDate() + direction * 7)
      } else if (this.viewMode === 'day') {
        newDate.setDate(newDate.getDate() + direction)
      } else {
        newDate.setMonth(newDate.getMonth() + direction)
      }
      this.currentDate = newDate
    },
    navigateMonth(direction) {
      const newDate = new Date(this.currentDate)
      newDate.setMonth(newDate.getMonth() + direction)
      this.currentDate = newDate
    },
    toggleCalendar(id) {
      const cal = this.calendars.find((c) => c.id === id)
      if (cal) cal.checked = !cal.checked
    },
    handleSidebarDateSelect(date) {
      this.selectedDate = date
      this.currentDate = date
    },
    handleConfirmSync() {
      this.showSyncModal = false
      this.isSyncing = true
      setTimeout(() => {
        this.isSyncing = false
        this.isSynced = true
      }, 2000)
    },
    handleConfirmUnsync() {
      this.showUnsyncModal = false
      this.isSynced = false
    }
  }
}
</script>
