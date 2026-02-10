export const state = () => ({
  selectedDate: new Date(new Date().setHours(0, 0, 0, 0)),
  schedules: {
    '2026-02-04': [
      { id: 101, title: '월간 리포트 작성', desc: '고객 월간 리포트 작성 마감일', type: 'task', time: '09:00', location: '본사 1층' }
    ],
    '2026-02-06': [
      { id: 201, title: '투자 성향 분석 미팅', desc: '신규 고객 투자 성향 분석 및 포트폴리오 제안', type: 'meeting', time: '14:00', location: '온라인 Zoom' }
    ],
    '2026-02-10': [
      { id: 301, title: '이영희 고객 미팅', desc: '신규 종목 추천 미팅', type: 'meeting', time: '11:00', location: '본사 1층 카페' },
      { id: 302, title: '시장분석 회의', desc: '주간 시장 동향 및 투자 전략 수립', type: 'task', time: '15:30', location: '제2회의실' }
    ],
    '2026-02-11': [
      { id: 401, title: 'VIP 고객 자산 관리 세미나', desc: '우수 고객 대상 글로벌 거시 경제 전망 발표', type: 'event', time: '10:00', location: '그랜드 홀' }
    ],
    '2026-02-15': [
      { id: 501, title: '재무 설계 상담', desc: '은퇴 설계 및 노후 자금 준비 상담', type: 'meeting', time: '13:00', location: '고객 자택' }
    ],
    '2026-02-20': [
      { id: 601, title: '분기 실적 리뷰', desc: '팀별 실적 점검 및 다음 분기 계획 수립', type: 'task', time: '16:00', location: '대회의실' }
    ]
  },
  syncStatus: {
    google: true,
    naver: false
  }
})

export const getters = {
  getSchedulesByDate: (state) => (dateStr) => {
    return state.schedules[dateStr] || []
  },
  selectedDateSchedules: (state) => {
    const d = state.selectedDate
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    return state.schedules[dateStr] || []
  }
}

export const mutations = {
  SET_SELECTED_DATE(state, date) {
    state.selectedDate = new Date(new Date(date).setHours(0, 0, 0, 0))
  },
  TOGGLE_SYNC(state, provider) {
    if (state.syncStatus.hasOwnProperty(provider)) {
      state.syncStatus[provider] = !state.syncStatus[provider]
    }
  },
  ADD_SCHEDULE(state, { dateStr, event }) {
    if (!state.schedules[dateStr]) {
      this._vm.$set(state.schedules, dateStr, [])
    }
    state.schedules[dateStr].push({
      id: Date.now(),
      ...event
    })
  },
  UPDATE_SCHEDULE(state, { dateStr, originalDateStr, event }) {
    if (originalDateStr && originalDateStr !== dateStr) {
      if (state.schedules[originalDateStr]) {
        state.schedules[originalDateStr] = state.schedules[originalDateStr].filter(s => s.id !== event.id)
      }
      if (!state.schedules[dateStr]) {
        this._vm.$set(state.schedules, dateStr, [])
      }
      state.schedules[dateStr].push(event)
    } else {
      if (state.schedules[dateStr]) {
        const index = state.schedules[dateStr].findIndex(s => s.id === event.id)
        if (index !== -1) {
          this._vm.$set(state.schedules[dateStr], index, event)
        }
      }
    }
  },
  DELETE_SCHEDULE(state, { dateStr, id }) {
    if (state.schedules[dateStr]) {
      state.schedules[dateStr] = state.schedules[dateStr].filter(s => s.id !== id)
    }
  }
}

export const actions = {
  updateSelectedDate({ commit }, date) {
    commit('SET_SELECTED_DATE', date)
  },
  toggleCalendarSync({ commit }, provider) {
    commit('TOGGLE_SYNC', provider)
  },
  addSchedule({ commit }, payload) {
    commit('ADD_SCHEDULE', payload)
  },
  updateSchedule({ commit }, payload) {
    commit('UPDATE_SCHEDULE', payload)
  },
  deleteSchedule({ commit }, payload) {
    commit('DELETE_SCHEDULE', payload)
  }
}
