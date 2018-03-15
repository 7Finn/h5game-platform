const state = {
  open: true
}

const mutations = {
  SOCKET_ALL_PLAYER_IN (state) {
    state.open = false
  },
  CLOSE_WAITINGJOINDIALOG (state) {
    state.open = false
  },
  TOGGLE_WAITINGJOINDIALOG (state) {
    state.open = !state.open
  }
}

const actions = {
  openWaitingJoinDialog ({ commit }) {
    commit('OPEN_WAITINGJOINDIALOG')
  },
  closeWaitingJoinDialog ({ commit }) {
    commit('CLOSE_WAITINGJOINDIALOG')
  },
  toggleWaitingJoinDialog ({ commit }) {
    commit('TOGGLE_WAITINGJOINDIALOG')
  }
}

export default {
  state,
  mutations,
  actions
}
