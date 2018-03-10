const state = {
  login: true,
  online: false,
  account: '879788904',
  username: 'Finn'
}

const mutations = {
  LOGIN_USERSTATE (state) {
    state.login = true
  },
  LOGOUT_USERSTATE (state) {
    state.login = false
  }
}

const actions = {
  loginUserState ({ commit }) {
    commit('LOGIN_USERSTATE')
  },
  logoutUserState ({ commit }) {
    commit('LOGOUT_USERSTATE')
  }
}

export default {
  state,
  mutations,
  actions
}
