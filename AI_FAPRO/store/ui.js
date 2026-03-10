export const state = () => ({
  isSidebarCollapsed: false,
});

export const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.isSidebarCollapsed = !state.isSidebarCollapsed;
  },
  SET_SIDEBAR_COLLAPSED(state, value) {
    state.isSidebarCollapsed = value;
  },
};
