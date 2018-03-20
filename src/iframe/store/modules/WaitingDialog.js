const state = {
  open: false,
  msg: ''
}

const mutations = {
  SOCKET_START_READY (state) {
    state.open = true
    state.msg = '已准备，等待对方准备'
  },
  SOCKET_START_COUNT_DOWN (state, payload) {
    const time = Math.floor(payload.time / 1000)
    if (time > 0) {
      state.open = true
      state.msg = time
    } else {
      state.open = false
    }
  },
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
