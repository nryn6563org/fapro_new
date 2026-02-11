<template>
  <div class="p-schedule">
    <div class="p-schedule__header">
      <div class="p-schedule__title-group">
        <h1 class="p-schedule__title">일정관리</h1>
        <p class="p-schedule__desc">일정을 확인하고 관리할 수 있습니다</p>
      </div>
      <button class="p-schedule__add-btn" @click="openAddModal">
        <plus-icon :size="18" />
        <span>새 일정 추가</span>
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="p-schedule__summary">
      <div v-for="(stat, idx) in summaryStats" :key="idx" :class="['p-schedule__summary-card', `p-schedule__summary-card--${stat.color}`]">
        <div class="p-schedule__summary-content">
          <p class="p-schedule__summary-label">{{ stat.label }}</p>
          <p class="p-schedule__summary-count">{{ stat.count }}</p>
        </div>
        <div class="p-schedule__summary-icon-box">
          <component :is="stat.icon" :size="24" />
        </div>
      </div>
    </div>

    <div class="p-schedule__content">
      <!-- Left: Calendar Card -->
      <div class="p-schedule__main-left">
        <div class="p-schedule__calendar-card">
          <div class="p-schedule__calendar-card-header">
            <h2 class="p-schedule__card-title">캘린더</h2>
            <button class="p-schedule__sync-btn" @click="isSyncActive = true">
              <external-link-icon :size="16" />
              <span>외부 캘린더 연동</span>
            </button>
          </div>
          <client-only>
            <v-calendar
              v-model="selectedDate"
              is-expanded
              :is-dark="$colorMode.value === 'dark'"
              class="p-schedule-v-calendar"
              :attributes="calendarAttributes"
              :select-attribute="selectAttribute"
              :masks="{ title: 'YYYY년 MM월' }"
              @dayclick="onDayClick"
            />
            <div slot="placeholder" class="p-schedule-skeleton">
              <div class="p-schedule-skeleton__header"></div>
              <div class="p-schedule-skeleton__grid">
                <div v-for="i in 35" :key="i" class="p-schedule-skeleton__day"></div>
              </div>
            </div>
          </client-only>
        </div>
      </div>

      <!-- Right: Daily Schedule -->
      <div class="p-schedule__main-right">
        <div class="p-schedule__detail-card">
          <div class="p-schedule__detail-header">
            <h2 class="p-schedule__detail-title">{{ formattedSelectedDate }}의 일정</h2>
          </div>
          <div class="p-schedule__detail-list">
            <div v-if="selectedDateSchedules.length === 0" class="p-schedule__empty">
              일정이 없습니다.
            </div>
            <div v-for="schedule in selectedDateSchedules" :key="schedule.id" class="p-schedule__item">
              <div class="p-schedule__item-info">
                <div class="p-schedule__item-top">
                  <span class="p-schedule__item-title">{{ schedule.title }}</span>
                  <span :class="['p-schedule__item-badge', `p-schedule__item-badge--${schedule.type}`]">
                    {{ getScheduleTypeText(schedule.type) }}
                  </span>
                </div>
                <div class="p-schedule__item-meta">
                  <div class="p-schedule__meta-item">
                    <clock-icon :size="14" />
                    <span>{{ schedule.time }}</span>
                  </div>
                  <div v-if="schedule.location" class="p-schedule__meta-item">
                    <map-pin-icon :size="14" />
                    <span>{{ schedule.location }}</span>
                  </div>
                </div>
                <p v-if="schedule.desc" class="p-schedule__item-desc">{{ schedule.desc }}</p>
              </div>
              <div class="p-schedule__item-actions">
                <button class="p-schedule__action-btn" title="수정" @click="openEditModal(schedule)"><edit-icon :size="16" /></button>
                <button class="p-schedule__action-btn p-schedule__action-btn--delete" title="삭제" @click="deleteSchedule(schedule.dateStr || getFormatDate(selectedDate), schedule.id)"><trash-icon :size="16" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom: Bottom Event List -->
    <div class="p-schedule__list-section">
      <div class="p-schedule__list-header">
        <h2 class="p-schedule__list-title">일정 목록</h2>
        <div class="p-schedule__tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab.id" 
            :class="['p-schedule__tab', { 'p-schedule__tab--active': activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <div class="p-schedule__full-list">
        <div v-for="group in groupedFilteredSchedules" :key="group.dateStr" class="p-schedule__group">
          <div class="p-schedule__group-header">
            <calendar-icon :size="16" />
            <span class="p-schedule__group-date">{{ formatDateLabel(group.dateStr) }}</span>
            <span :class="['p-schedule__group-badge', `p-schedule__group-badge--${group.status.code}`]">
              {{ group.status.label }}
            </span>
            <span class="p-schedule__group-count">{{ group.items.length }}개</span>
          </div>
          <div class="p-schedule__group-items">
             <div 
               v-for="schedule in group.items" 
               :key="schedule.id" 
               class="p-schedule__item p-schedule__item--row"
               :class="`p-schedule__item--${group.status.code}`"
             >
                <div class="p-schedule__item-info">
                  <div class="p-schedule__item-top">
                    <span class="p-schedule__item-title">{{ schedule.title }}</span>
                    <span :class="['p-schedule__item-badge', `p-schedule__item-badge--${schedule.type}`]">
                      {{ getScheduleTypeText(schedule.type) }}
                    </span>
                  </div>
                  <div class="p-schedule__item-meta">
                    <div class="p-schedule__meta-item"><clock-icon :size="14" /><span>{{ formatScheduleTime(schedule) }}</span></div>
                    <div v-if="schedule.location" class="p-schedule__meta-item"><map-pin-icon :size="14" /><span>{{ schedule.location }}</span></div>
                  </div>
                </div>
                <div class="p-schedule__item-actions">
                  <button class="p-schedule__action-btn" title="수정" @click="openEditModal(schedule)"><edit-icon :size="16" /></button>
                  <button class="p-schedule__action-btn p-schedule__action-btn--delete" title="삭제" @click="deleteSchedule(schedule.dateStr, schedule.id)"><trash-icon :size="16" /></button>
                </div>
             </div>
          </div>
        </div>
        <div v-if="groupedFilteredSchedules.length === 0" class="p-schedule__empty">
          표시할 일정이 없습니다.
        </div>
      </div>
    </div>

    <!-- Add/Edit Schedule Modal -->
    <transition name="fade">
      <div v-if="isAddModalOpen" class="p-schedule__modal-overlay" @click.self="closeAddModal">
        <div class="p-schedule__modal">
          <div class="p-schedule__modal-header">
            <h3>{{ isEditMode ? '일정 수정' : '새 일정 추가' }}</h3>
            <button class="p-schedule__modal-close" @click="closeAddModal">&times;</button>
          </div>
          <div class="p-schedule__modal-body">
            <div class="p-schedule__form-group">
              <label class="p-schedule__label">제목</label>
              <input v-model="scheduleForm.title" type="text" class="p-schedule__input" placeholder="일정 제목을 입력하세요" />
            </div>

            <div class="p-schedule__form-group">
              <label class="p-schedule__label">유형</label>
              <select v-model="scheduleForm.type" class="p-schedule__select">
                <option value="meeting">미팅</option>
                <option value="task">업무</option>
                <option value="event">이벤트</option>
              </select>
            </div>

            <div class="p-schedule__form-group">
              <label class="p-schedule__chk-label">
                <input type="checkbox" v-model="scheduleForm.isAllDay" class="p-schedule__checkbox" />
                <span>하루종일</span>
              </label>
            </div>

            <!-- Start Date/Time -->
            <div class="p-schedule__form-row">
              <div class="p-schedule__form-group">
                <label class="p-schedule__label">시작일</label>
                <input v-model="scheduleForm.startDate" type="date" class="p-schedule__input" />
              </div>
              <div class="p-schedule__form-group" v-if="!scheduleForm.isAllDay">
                <label class="p-schedule__label">시작 시간</label>
                <input v-model="scheduleForm.startTime" type="time" class="p-schedule__input" />
              </div>
            </div>

            <!-- End Date/Time -->
            <div class="p-schedule__form-row">
              <div class="p-schedule__form-group">
                <label class="p-schedule__label">종료일</label>
                <input v-model="scheduleForm.endDate" type="date" class="p-schedule__input" />
              </div>
              <div class="p-schedule__form-group" v-if="!scheduleForm.isAllDay">
                <label class="p-schedule__label">종료 시간</label>
                <input v-model="scheduleForm.endTime" type="time" class="p-schedule__input" />
              </div>
            </div>

            <div class="p-schedule__form-group">
              <label class="p-schedule__label">장소</label>
              <input v-model="scheduleForm.location" type="text" class="p-schedule__input" placeholder="장소를 입력하세요" />
            </div>
            <div class="p-schedule__form-group">
              <label class="p-schedule__label">설명</label>
              <textarea v-model="scheduleForm.desc" class="p-schedule__textarea" placeholder="상세 내용을 입력하세요"></textarea>
            </div>
          </div>
          <div class="p-schedule__modal-footer">
            <button class="p-schedule__modal-btn p-schedule__modal-btn--cancel" @click="closeAddModal">취소</button>
            <button class="p-schedule__modal-btn p-schedule__modal-btn--confirm" @click="saveSchedule">{{ isEditMode ? '수정' : '추가' }}</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Delete Confirmation Modal -->
    <transition name="fade">
      <div v-if="isDeleteModalOpen" class="p-schedule__modal-overlay" @click.self="closeDeleteModal">
         <div class="p-schedule__modal p-schedule__modal--small">
          <div class="p-schedule__modal-header">
            <h3>일정 삭제</h3>
            <button class="p-schedule__modal-close" @click="closeDeleteModal">&times;</button>
          </div>
          <div class="p-schedule__modal-body">
            <p class="text-center text-gray-700 my-4">정말로 이 일정을 삭제하시겠습니까?<br>삭제된 일정은 복구할 수 없습니다.</p>
          </div>
          <div class="p-schedule__modal-footer">
            <button class="p-schedule__modal-btn p-schedule__modal-btn--cancel" @click="closeDeleteModal">취소</button>
            <button class="p-schedule__modal-btn p-schedule__modal-btn--delete" @click="confirmDelete">삭제</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- External Sync Modal -->
    <transition name="fade">
      <div v-if="isSyncActive" class="p-schedule__modal-overlay" @click.self="isSyncActive = false">
        <div class="p-schedule__modal">
          <div class="p-schedule__modal-header">
            <h3>외부 캘린더 연결</h3>
            <button class="p-schedule__modal-close" @click="isSyncActive = false">&times;</button>
          </div>
          <div class="p-schedule__modal-body">
            <p class="p-schedule__modal-desc">연결할 캘린더를 선택하면 외부 일정을 자동으로 동기화할 수 있습니다.</p>
            <div class="p-schedule__sync-options">
              <div class="p-schedule__sync-item">
                <div class="p-schedule__sync-brand">
                  <div class="p-schedule__sync-icon-circle p-schedule__sync-icon-circle--google">
                    <img src="https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png" alt="Google" />
                  </div>
                  <div>
                    <span class="p-schedule__sync-name">구글 캘린더</span>
                    <span class="p-schedule__sync-hint">Google Calendar와 연동</span>
                  </div>
                </div>
                <button 
                  :class="['p-schedule__sync-toggle-btn', { 'p-schedule__sync-toggle-btn--active': syncStatus.google }]"
                  @click="toggleSync('google')"
                >
                  {{ syncStatus.google ? '해제' : '연결' }}
                </button>
              </div>
              <div class="p-schedule__sync-item">
                <div class="p-schedule__sync-brand">
                   <div class="p-schedule__sync-icon-circle p-schedule__sync-icon-circle--naver">
                    <span class="text-white font-bold text-xs">N</span>
                  </div>
                  <div>
                    <span class="p-schedule__sync-name">네이버 캘린더</span>
                    <span class="p-schedule__sync-hint">Naver Calendar와 연동</span>
                  </div>
                </div>
                <button 
                  :class="['p-schedule__sync-toggle-btn', { 'p-schedule__sync-toggle-btn--active': syncStatus.naver }]"
                  @click="toggleSync('naver')"
                >
                  {{ syncStatus.naver ? '해제' : '연결' }}
                </button>
              </div>
            </div>
          </div>
          <div class="p-schedule__modal-footer">
            <button class="p-schedule__modal-btn" @click="isSyncActive = false">닫기</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Edit2, 
  Trash2,
  CheckCircle
} from 'lucide-vue'

export default {
  name: 'MySchedulePage',
  components: {
    PlusIcon: Plus,
    CalendarIcon: Calendar,
    ClockIcon: Clock,
    MapPinIcon: MapPin,
    ExternalLinkIcon: ExternalLink,
    EditIcon: Edit2,
    TrashIcon: Trash2,
    CheckCircleIcon: CheckCircle
  },
  data() {
    return {
      isSyncActive: false,
      isAddModalOpen: false,
      isDeleteModalOpen: false,
      deleteTargetDate: null,
      deleteTargetId: null,
      isEditMode: false,
      activeTab: 'all',
      scheduleForm: {
        id: null,
        title: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        isAllDay: false,
        type: 'meeting',
        location: '',
        desc: ''
      },
      originalEditDate: null,
      tabs: [
        { id: 'all', label: '전체' },
        { id: 'today', label: '오늘' },
        { id: 'upcoming', label: '예정' },
        { id: 'completed', label: '완료' }
      ],
      selectAttribute: {
        highlight: {
          color: 'blue',
          fillMode: 'solid',
        },
      }
    }
  },
  computed: {
    selectedDate: {
      get() {
        return this.$store.state.schedule.selectedDate
      },
      set(val) {
        this.$store.dispatch('schedule/updateSelectedDate', val)
      }
    },
    formattedSelectedDate() {
      const d = this.selectedDate
      const days = ['일', '월', '화', '수', '목', '금', '토']
      return `${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`
    },
    selectedDateSchedules() {
      return this.$store.getters['schedule/selectedDateSchedules']
    },
    syncStatus() {
      return this.$store.state.schedule.syncStatus
    },
    allSchedules() {
      return this.$store.state.schedule.schedules
    },
    summaryStats() {
      const schedules = this.allSchedules
      let total = 0
      let meeting = 0
      let task = 0
      let event = 0

      Object.values(schedules).forEach(daySchedules => {
        daySchedules.forEach(s => {
          total++
          if (s.type === 'meeting') meeting++
          else if (s.type === 'task') task++
          else if (s.type === 'event') event++
        })
      })

      return [
        { label: '전체 일정', count: total, icon: 'calendar-icon', color: 'blue' },
        { label: '미팅', count: meeting, icon: 'clock-icon', color: 'purple' },
        { label: '업무', count: task, icon: 'map-pin-icon', color: 'orange' },
        { label: '이벤트', count: event, icon: 'check-circle-icon', color: 'green' }
      ]
    },
    calendarAttributes() {
      const schedules = this.allSchedules
      const attributes = []
      
      Object.keys(schedules).forEach(dateStr => {
        attributes.push({
          key: `event-${dateStr}`,
          customData: schedules[dateStr],
          dates: new Date(dateStr),
          dot: {
            color: 'blue',
            class: 'vc-dot--custom'
          }
        })
      })
      
      return attributes
    },
    filteredSchedules() {
      const schedules = this.allSchedules
      const flatSchedules = []
      const now = new Date()
      now.setHours(0,0,0,0)

      Object.keys(schedules).forEach(dateStr => {
        const date = new Date(dateStr)
        schedules[dateStr].forEach(s => {
          // Backward compatibility mapping for display
          const displayTime = s.startTime || s.time
          flatSchedules.push({ ...s, dateStr, date, time: displayTime })
        })
      })

      // Sort by date and time
      flatSchedules.sort((a, b) => {
        if (a.dateStr !== b.dateStr) return a.dateStr.localeCompare(b.dateStr)
        return a.time.localeCompare(b.time)
      })

      if (this.activeTab === 'today') {
        const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
        return flatSchedules.filter(s => s.dateStr === todayStr)
      } else if (this.activeTab === 'upcoming') {
        return flatSchedules.filter(s => s.date >= now)
      } else if (this.activeTab === 'completed') {
        return flatSchedules.filter(s => s.date < now)
      }

      return flatSchedules
    },
    groupedFilteredSchedules() {
      const grouped = {}
      this.filteredSchedules.forEach(s => {
        if (!grouped[s.dateStr]) grouped[s.dateStr] = []
        grouped[s.dateStr].push(s)
      })
      
      // Convert to array and sort
      const sortedGroups = Object.keys(grouped).sort().map(dateStr => {
        // Normalize both dates to midnight for accurate day difference
        const date = new Date(dateStr)
        date.setHours(0, 0, 0, 0)
        
        const now = new Date()
        now.setHours(0, 0, 0, 0)
        
        const diffTime = date.getTime() - now.getTime()
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) // Use round for integer days

        let status = { label: '완료', code: 'completed' }
        
        if (diffDays === 0) {
          status = { label: '오늘', code: 'today' }
        } else if (diffDays > 0) {
          status = { label: `예정 (D-${diffDays})`, code: 'upcoming' }
        }
        
        return {
          dateStr,
          items: grouped[dateStr],
          status
        }
      })
      
      return sortedGroups
    }
  },
  methods: {
    onDayClick(day) {
      this.selectedDate = day.date
    },
    toggleSync(provider) {
      this.$store.dispatch('schedule/toggleCalendarSync', provider)
    },
    getScheduleTypeText(type) {
      const maps = { 'meeting': '미팅', 'task': '업무', 'event': '이벤트' }
      return maps[type] || '기타'
    },
    formatDateLabel(dateStr) {
      if (!dateStr) return ''
      const d = new Date(dateStr)
      const days = ['일', '월', '화', '수', '목', '금', '토']
      return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`
    },
    formatScheduleTime(schedule) {
      if (!schedule.startDate) return ''
      
      const start = new Date(schedule.startDate)
      const end = schedule.endDate ? new Date(schedule.endDate) : start
      const days = ['일', '월', '화', '수', '목', '금', '토']
      
      const startStr = `${start.getMonth() + 1}.${start.getDate()}(${days[start.getDay()]})`
      const endStr = `${end.getMonth() + 1}.${end.getDate()}(${days[end.getDay()]})`
      
      if (schedule.isAllDay) {
        if (startStr === endStr) {
          return `${startStr} 하루종일`
        } else {
          return `${startStr} - ${endStr}`
        }
      } else {
        const startTime = schedule.startTime || ''
        const endTime = schedule.endTime || ''
        
        if (startStr === endStr) {
           return `${startStr} ${startTime} - ${endTime}`
        } else {
           return `${startStr} ${startTime} - ${endStr} ${endTime}`
        }
      }
    },
    getFormatDate(date) {
      if (!date) return ''
      if (typeof date === 'string') return date
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    },
    openAddModal() {
      this.isEditMode = false
      this.originalEditDate = null
      const todayStr = this.getFormatDate(this.selectedDate)
      this.scheduleForm = {
        id: null,
        title: '',
        startDate: todayStr,
        startTime: '09:00',
        endDate: todayStr,
        endTime: '10:00',
        isAllDay: false,
        type: 'meeting',
        location: '',
        desc: ''
      }
      this.isAddModalOpen = true
    },
    openEditModal(schedule) {
      this.isEditMode = true
      
      // If schedule comes from filteredSchedules, it has dateStr/date.
      const dateStr = schedule.dateStr || this.getFormatDate(schedule.date) || this.getFormatDate(this.selectedDate)
      this.originalEditDate = dateStr
      
      // Mapping old data to new structure
      this.scheduleForm = { 
        ...schedule, 
        startDate: schedule.startDate || dateStr,
        endDate: schedule.endDate || dateStr,
        startTime: schedule.startTime || schedule.time || '09:00',
        endTime: schedule.endTime || schedule.time || '10:00', // fallbacks
        isAllDay: schedule.isAllDay || false
      }
      this.isAddModalOpen = true
    },
    closeAddModal() {
      this.isAddModalOpen = false
    },
    saveSchedule() {
      if (!this.scheduleForm.title || !this.scheduleForm.startDate) {
        alert('제목과 시작일을 입력해주세요.')
        return
      }

      // Use startDate as the key for the store (to show up on the calendar on that day)
      const dateStr = this.scheduleForm.startDate

      const event = {
        title: this.scheduleForm.title,
        type: this.scheduleForm.type,
        location: this.scheduleForm.location,
        desc: this.scheduleForm.desc,
        startDate: this.scheduleForm.startDate,
        endDate: this.scheduleForm.endDate,
        startTime: this.scheduleForm.startTime,
        endTime: this.scheduleForm.endTime,
        isAllDay: this.scheduleForm.isAllDay,
        time: this.scheduleForm.isAllDay ? '하루종일' : this.scheduleForm.startTime // display fallback
      }

      if (this.isEditMode) {
        event.id = this.scheduleForm.id
        this.$store.dispatch('schedule/updateSchedule', {
          dateStr: dateStr,
          originalDateStr: this.originalEditDate,
          event
        })
      } else {
        this.$store.dispatch('schedule/addSchedule', {
          dateStr: dateStr,
          event
        })
      }
      this.closeAddModal()
    },
    deleteSchedule(dateStr, id) {
      this.deleteTargetDate = dateStr
      this.deleteTargetId = id
      this.isDeleteModalOpen = true
    },
    closeDeleteModal() {
      this.isDeleteModalOpen = false
      this.deleteTargetDate = null
      this.deleteTargetId = null
    },
    confirmDelete() {
      if (this.deleteTargetDate && this.deleteTargetId) {
        this.$store.dispatch('schedule/deleteSchedule', {
          dateStr: this.deleteTargetDate,
          id: this.deleteTargetId
        })
      }
      this.closeDeleteModal()
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/page/my/schedule.css';
</style>
