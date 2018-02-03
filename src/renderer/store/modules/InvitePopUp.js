const state = {
  open: false
}

const mutations = {
  OPEN_INVITEPOPUP (state) {
    state.open = true
  },
  CLOSE_INVITEPOPUP (state) {
    state.open = false
  },
  TOGGLE_INVITEPOPUP (state) {
    state.open = !state.open
  }
}

const actions = {
  openInvitePopUp ({ commit }) {
    commit('OPEN_INVITEPOPUP')
  },
  closeInvitePopUp ({ commit }) {
    commit('CLOSE_INVITEPOPUP')
  },
  toggleInvitePopUp ({ commit }) {
    commit('TOGGLE_INVITEPOPUP')
  }
}

export default {
  state,
  mutations,
  actions
}
