const state = {
  open: false,
  msg: '',
  progressObj: null,
  finish: false
}

const mutations = {
  OPEN_UPDATEDIALOG (state) {
    state.open = true
  },
  CLOSE_UPDATEDIALOG (state) {
    state.open = false
  },
  SET_UPDATEDIALOG (state, payload) {
    state.msg = payload.msg === undefined ? state.msg : payload.msg
    state.progressObj = payload.progressObj === undefined ? state.progressObj : payload.progressObj
    state.finish = payload.finish === undefined ?  state.finish : payload.finish
  }
}

const actions = {
  openUpdateDialog ({ commit }) {
    commit('OPEN_UPDATEDIALOG')
  },
  closeUpdateDialog ({ commit }) {
    commit('CLOSE_UPDATEDIALOG')
  },
  setUpdateDialog ({ commit }, payload) {
    commit('SET_UPDATEDIALOG', payload)
  }
}

export default {
  state,
  mutations,
  actions
}
