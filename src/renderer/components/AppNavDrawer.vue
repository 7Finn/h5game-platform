<template>
  <div class="height-100">
    <mu-list-item :title="userNickname" @click="handleProfileClick">
      <mu-avatar :src="avatar" slot="leftAvatar"/>
    </mu-list-item>
    <mu-divider/>
    <mu-list class="content-appbar" :value="select" @change="handleSelectChange">
      <mu-sub-header>收藏的游戏</mu-sub-header>
      <mu-list-item v-for="(game, index) in favorites" :title="game.name" :value="index" :class="{ active: select === '1'}" :key="index">
        <mu-icon-menu slot="right" icon="more_vert" :anchorOrigin="anchorOrigin" :targetOrigin="targetOrigin">
          <mu-menu-item title="删除" />
        </mu-icon-menu>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      select: '1',
      anchorOrigin: { 'vertical': 'bottom', 'horizontal': 'left' },
      targetOrigin: { 'vertical': 'top', 'horizontal': 'left' }
    }
  },
  computed: {
    ...mapState({
      loginState: state => state.UserState.login,
      userNickname: state => state.UserState.nickname,
      avatar: state => state.UserState.avatar,
      favorites: state => state.UserState.favorites
    })
  },
  methods: {
    ...mapActions(['openProfileDialog', 'openLoginDialog', 'selectGame']),
    handleSelectChange (val) {
      this.selectGame({ game: this.favorites[val] })
    },
    handleProfileClick () {
      if (this.loginState) {
        this.openProfileDialog()
      } else {
        this.openLoginDialog()
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
.content-appbar {
  height: 100%;
}

.height-100 {
  height: 100%;
}

.mt5 {
  margin-top: 5px;
}

// .active {
//   background-color: #eee;
// }
</style>
