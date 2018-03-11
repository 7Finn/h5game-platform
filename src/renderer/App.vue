<template>
  <div id="app">
    <div class="platform-appbar">
      <mu-paper>
        <mu-bottom-nav :value="activeNav" shift @change="handleNavChange">
          <mu-bottom-nav-item to="/" value="home" title="Home" icon="star"/>
          <mu-bottom-nav-item to="/store" value="store" title="Store" icon="inbox"/>
          <mu-bottom-nav-item to="/profile" value="books" title="Profile" icon="books"/>
        </mu-bottom-nav>
      </mu-paper>
    </div>
    <div class="platform-content">
      <router-view></router-view>
    </div>
    <invite-pop-up></invite-pop-up>
    <login-dialog></login-dialog>
    <registe-dialog></registe-dialog>
    <profile-dialog></profile-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import InvitePopUp from './components/InvitePopUp'
import LoginDialog from './components/LoginDialog'
import RegisteDialog from './components/RegisteDialog'
import ProfileDialog from './components/ProfileDialog'
// import { mapState, mapActions } from 'vuex'
export default {
  components: {
    'invite-pop-up': InvitePopUp,
    'login-dialog': LoginDialog,
    'registe-dialog': RegisteDialog,
    'profile-dialog': ProfileDialog
  },
  data () {
    return {
      activeNav: 'home',
      open: true,
      docked: true,
      userid: Date.now()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions(['openInvitePopUp']),
    handleNavChange (val) {
      this.activeNav = val
    },
    handleMenuChange (path) {
      if (!this.desktop) this.open = false
    },
    init () {
      // this.setSocket()
      // 告诉服务器端有用户登录
      this.$socket.emit('login', { userid: this.userid, username: 'finnwu' })
      this.$socket.on('invite', () => {
        this.openInvitePopUp()
      })
    }
  }
}
</script>

<style lang="less">
html, body {
  font-family: '微软雅黑';
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
}

.platform-content {
  height: calc(~'100% - 56px');
}

</style>