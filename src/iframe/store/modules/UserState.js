const state = {
  gameId: 0,
  roomId: 0,
  account: '',
}

const mutations = {
  SET_INFO (state, info) {
    state.gameId = info.gameId
    state.roomId = info.roomId
    state.account = info.account
  }
}

const actions = {
  setInfo ({ commit }, payload) {
    commit('SET_INFO', payload.info)
  }
}

export default {
  state,
  mutations,
  actions
}
