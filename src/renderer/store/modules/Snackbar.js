const state = {
  open: false,
  message: ''
}

const mutations = {
  OPEN_SNACKBAR (state, msg) {
    state.open = true
    state.message = msg
  },
  CLOSE_SNACKBAR (state) {
    state.open = false
    state.message = ''
  }
}

let timer
const actions = {
  openSnackbar ({ commit, state }, payload) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      commit('CLOSE_SNACKBAR')
    }, 2000)
    commit('OPEN_SNACKBAR', payload)
  },
  closeSnackbar ({ commit }) {
    if (timer) clearTimeout(timer)
    commit('CLOSE_SNACKBAR')
  }
}

export default {
  state,
  mutations,
  actions
}
