const state = {
  open: false
}

const mutations = {
  OPEN_REGISTEDIALOG (state) {
    state.open = true
  },
  CLOSE_REGISTEDIALOG (state) {
    state.open = false
  },
  TOGGLE_REGISTEDIALOG (state) {
    state.open = !state.open
  }
}

const actions = {
  openRegisteDialog ({ commit }) {
    commit('OPEN_REGISTEDIALOG')
  },
  closeRegisteDialog ({ commit }) {
    commit('CLOSE_REGISTEDIALOG')
  },
  toggleRegisteDialog ({ commit }) {
    commit('TOGGLE_REGISTEDIALOG')
  }
}

export default {
  state,
  mutations,
  actions
}
