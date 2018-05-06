<template>
  <div id="app">
    <div class="platform-appbar">
      <mu-paper>
        <mu-bottom-nav :value="activeNav" shift @change="handleNavChange">
          <mu-bottom-nav-item to="/" value="home" title="Home" icon="star"/>
          <mu-bottom-nav-item to="/store" value="store" title="Store" icon="inbox"/>
          <mu-bottom-nav-item value="profile" title="Profile" icon="books"/>
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
    <update-dialog></update-dialog>
    <mu-snackbar v-if="snackbar" :message="snackbarMsg" action="关闭" @actionClick="closeSnackbar" @close="closeSnackbar"/>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapActions, mapState } from 'vuex'
import InvitePopUp from './components/InvitePopUp'
import LoginDialog from './components/LoginDialog'
import RegisteDialog from './components/RegisteDialog'
import ProfileDialog from './components/ProfileDialog'
import UpdateDialog from './components/UpdateDialog'
export default {
  components: {
    'invite-pop-up': InvitePopUp,
    'login-dialog': LoginDialog,
    'registe-dialog': RegisteDialog,
    'profile-dialog': ProfileDialog,
    'update-dialog': UpdateDialog
  },
  data () {
    return {
      activeNav: 'home',
      open: true,
      docked: true,
      userid: Date.now()
    }
  },
  computed: {
    ...mapState({
      loginState: state => state.UserState.login,
      userNickname: state => state.UserState.nickname,
      snackbar: state => state.Snackbar.open,
      snackbarMsg: state => state.Snackbar.message
    })
  },
  mounted () {
    ipcRenderer.on('update-info', (event, text) => {
      this.closeLoginDialog()
      this.openUpdateDialog()
      this.setUpdateDialog({ msg: text })
    })
    ipcRenderer.on('download-progress', (event, progressObj) => {
      this.setUpdateDialog({ progressObj: progressObj })
    })
    ipcRenderer.on('is-update-now', (event) => {
      this.setUpdateDialog({ finish: true })
    })
    this.openLoginDialog()
  },
  methods: {
    ...mapActions(['openInvitePopUp', 'openLoginDialog', 'closeLoginDialog', 'openSnackbar', 'closeSnackbar', 'openUpdateDialog', 'setUpdateDialog']),
    handleNavChange (val) {
      if (val === 'profile') {
        if (this.loginState) {
          this.$router.push('/profile')
          this.activeNav = val
        } else {
          this.openLoginDialog()
        }
      } else {
        this.activeNav = val
      }
    },
    handleMenuChange (path) {
      if (!this.desktop) this.open = false
    }
  }
}
</script>

<style lang="less">
html, body {
  font-family: '微软雅黑', 'Microsoft YaHei';
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