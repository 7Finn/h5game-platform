const state = {
  login: false, // 是否登录
  online: false, // 是否在线
  account: '', // 用户账号（ID）
  avatar: '', // 头像
  nickname: '未登录', // 用户昵称
  friends: [], // 好友列表
  favorites: [], // 收藏的游戏列表
  selectedGame: null, // 选择的游戏
  applicants: [], // 好友申请列表
  storeGames: [] // 商店游戏
}

const mutations = {
  SOCKET_CONNECT (state) {
    state.online = true
  },
  SOCKET_DISCONNECT (state) {
    state.online = false
  },
  SOCKET_CONNECT_ERROR (state) {
    state.online = false
  },
  SOCKET_SET_FRIENDS (state, friends) {
    state.friends = friends
  },
  SOCKET_SET_APPLICANTS (state, applicants) {
    state.applicants = applicants
  },
  SOCKET_SET_FAVORITES (state, favorites) {
    state.favorites = favorites
  },
  SOCKET_FRIEND_ONLINE (state, user) {
    state.friends.forEach(element => {
      if (element.account === user.account) element.online = true
    })
  },
  SOCKET_FRIEND_OFFLINE (state, user) {
    state.friends.forEach(element => {
      if (element.account === user.account) element.online = false
    })
  },
  SOCKET_SET_STORE_GAMES (state, games) {
    state.storeGames = games
  },
  SET_USERINFO (state, user) {
    state.account = user.account
    state.nickname = user.nickname
    state.avatar = user.avatar
  },
  SET_FRIENDS (state, friends) {
    state.friends = friends
  },
  SET_APPLICANTS (state, applicants) {
    state.applicants = applicants
  },
  SET_SELECT_GAME (state, game) {
    state.selectedGame = game
  },
  LOGIN_USERSTATE (state) {
    state.login = true
  },
  LOGOUT_USERSTATE (state) {
    state.login = false
  }
}

const getters = {
  storeGamesFormat: (state) => {
    const storeList = [[]]
    for (let i = 0; i < state.storeGames.length; ++i) {
      let row = Math.floor(i / 3)
      if (!storeList[row]) {
        storeList.push([])
      }
      storeList[row].push(state.storeGames[i])
    }
    if (storeList[storeList.length - 1].length !== 3) {
      storeList[storeList.length - 1].length = 3
    }
    return storeList
  }
}

const actions = {
  socket_login ({ commit, dispatch }, payload) {
    if (payload.ret === 0) {
      commit('LOGIN_USERSTATE')
      commit('SET_USERINFO', payload.user)
      dispatch('closeLoginDialog')
      dispatch('openSnackbar', '登录成功')
    } else {
      commit('LOGOUT_USERSTATE')
    }
  },
  socket_connectError ({ commit, dispatch }) {
    dispatch('openSnackbar', '未能连接服务器，请检查网络')
  },
  socket_updateProfile ({ commit, dispatch }, payload) {
    commit('SET_USERINFO', payload.user)
    dispatch('closeProfileDialog')
    dispatch('openSnackbar', '更新成功')
  },
  socket_hasApplicantMsg ({ commit, dispatch }, payload) {
    dispatch('openSnackbar', '你有一条新的好友请求')
  },
  selectGame ({ commit }, payload) {
    commit('SET_SELECT_GAME', payload.game)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
