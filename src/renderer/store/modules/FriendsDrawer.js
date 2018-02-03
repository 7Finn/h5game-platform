const state = {
  open: false
}

const mutations = {
  OPEN_FRIENDSDRAWER (state) {
    state.open = true
  },
  CLOSE_FRIENDSDRAWER (state) {
    state.open = false
  },
  TOGGLE_FRIENDSDRAWER (state) {
    state.open = !state.open
  }
}

const actions = {
  openFriendsDrawer ({ commit }) {
    commit('OPEN_FRIENDSDRAWER')
  },
  closeFriendsDrawer ({ commit }) {
    commit('CLOSE_FRIENDSDRAWER')
  },
  toggleFriendsDrawer ({ commit }) {
    commit('TOGGLE_FRIENDSDRAWER')
  }
}

export default {
  state,
  mutations,
  actions
}
