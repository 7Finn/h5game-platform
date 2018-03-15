const state = {
  open: false,
  game: null,
  player: null,
  competitor: null,
  roomId: ''
}

const mutations = {
  OPEN_INVITEPOPUP (state, payload) {
    state.open = true
    state.game = payload.game
    state.player = payload.invitee
    state.competitor = payload.inviter
    state.roomId = payload.roomId
  },
  REJECT_INVITEPOPUP (state) {
    state.open = false
    state.game = null
    state.player = null
    state.competitor = null
    state.roomId = ''
  },
  CLOSE_INVITEPOPUP (state) {
    state.open = false
  }
}

const actions = {
  socket_inviteMsg ({ commit }, payload) {
    commit('OPEN_INVITEPOPUP', payload)
  },
  rejectInvite ({ commit }) {
    commit('REJECT_INVITEPOPUP')
  },
  closeInvitePopUp ({ commit }) {
    commit('CLOSE_INVITEPOPUP')
  }
}

export default {
  state,
  mutations,
  actions
}
