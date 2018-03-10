const state = {
  open: false
}

const mutations = {
  OPEN_LOGINDIALOG (state) {
    state.open = true
  },
  CLOSE_LOGINDIALOG (state) {
    state.open = false
  },
  TOGGLE_LOGINDIALOG (state) {
    state.open = !state.open
  }
}

const actions = {
  openLoginDialog ({ commit }) {
    commit('OPEN_LOGINDIALOG')
  },
  closeLoginDialog ({ commit }) {
    commit('CLOSE_LOGINDIALOG')
  },
  toggleLoginDialog ({ commit }) {
    commit('TOGGLE_LOGINDIALOG')
  }
}

export default {
  state,
  mutations,
  actions
}
