const state = {
  login: false,
  online: false,
  account: '',
  nickname: '未登录',
  friends: []
}

const mutations = {
  LOGIN_USERSTATE (state, user) {
    state.login = true
    state.account = user.account
    state.nickname = user.nickname
    state.friends = user.friends
  },
  LOGOUT_USERSTATE (state) {
    state.login = false
  }
}

const actions = {
  loginUserState ({ commit }, payload) {
    commit('LOGIN_USERSTATE', payload)
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
