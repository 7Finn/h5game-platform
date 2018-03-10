const state = {
  open: true
}

const mutations = {
  OPEN_WAITINGJOINDIALOG (state) {
    state.open = true
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
