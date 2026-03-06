export const state = () => ({
  isLoggedIn: true
});

export const mutations = {
  SET_LOGGED_IN(state, value) {
    state.isLoggedIn = value;
  }
};

export const actions = {
  login({ commit }) {
    // 시뮬레이션: 0.5초 후 로그인 처리
    setTimeout(() => {
      commit('SET_LOGGED_IN', true);
    }, 500);
  },
  logout({ commit }) {
    commit('SET_LOGGED_IN', false);
  }
};
