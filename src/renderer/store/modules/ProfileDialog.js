const state = {
  open: false
}

const mutations = {
  OPEN_PROFILEDIALOG (state) {
    state.open = true
  },
  CLOSE_PROFILEDIALOG (state) {
    state.open = false
  },
  TOGGLE_PROFILEDIALOG (state) {
    state.open = !state.open
  }
}

const actions = {
  openProfileDialog ({ commit }) {
    commit('OPEN_PROFILEDIALOG')
  },
  closeProfileDialog ({ commit }) {
    commit('CLOSE_PROFILEDIALOG')
  },
  toggleProfileDialog ({ commit }) {
    commit('TOGGLE_PROFILEDIALOG')
  }
}

export default {
  state,
  mutations,
  actions
}
