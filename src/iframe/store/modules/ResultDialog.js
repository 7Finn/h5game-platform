const state = {
  open: false,
  msg: ''
}

const mutations = {
  SOCKET_GAME_RESULT (state, payload) {
    state.open = true
    state.msg = payload.msg
  },
  OPEN_RESULTDIALOG (state) {
    state.open = true
  },
  CLOSE_RESULTDIALOG (state) {
    state.open = false
  }
}

const actions = {
  openResultDialog ({ commit }) {
    commit('OPEN_RESULTDIALOG')
  },
  closeResultDialog ({ commit }) {
    commit('CLOSE_RESULTDIALOG')
  }
}

export default {
  state,
  mutations,
  actions
}
