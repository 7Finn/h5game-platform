const state = {
  open: false,
  msg: ''
}

const mutations = {
  OPEN_WAITINGDIALOG (state) {
    state.open = true
  },
  CLOSE_WAITINGDIALOG (state) {
    state.open = false
  }
}

const actions = {
  openWaitingDialog ({ commit }) {
    commit('OPEN_WAITINGDIALOG')
  },
  closeWaitingDialog ({ commit }) {
    commit('CLOSE_WAITINGDIALOG')
  },
  toggleWaitingDialog ({ commit }) {
    commit('TOGGLE_WAITINGDIALOG')
  }
}

export default {
  state,
  mutations,
  actions
}
