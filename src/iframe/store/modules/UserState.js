const state = {
  roomId: '',
  game: null,
  competitor: null,
  player: null
}

const mutations = {
  SET_INFO (state, info) {
    state.roomId = info.roomId
    state.game = info.game
    state.competitor = info.competitor
    state.player = info.player
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
