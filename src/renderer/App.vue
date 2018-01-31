<template>
  <div id="app">
    <div class="platform-appbar">
      <mu-paper>
        <mu-bottom-nav :value="activeNav" shift @change="handleNavChange">
          <mu-bottom-nav-item to="/" value="main" title="Main" icon="star"/>
          <mu-bottom-nav-item to="/store" value="store" title="Store" icon="inbox"/>
          <mu-bottom-nav-item value="books" title="Books" icon="books"/>
        </mu-bottom-nav>
      </mu-paper>
    </div>
    <div class="platform-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      activeNav: 'main',
      open: true,
      docked: true,
      userid: Date.now()
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    handleNavChange (val) {
      this.activeNav = val
    },
    handleMenuChange (path) {
      if (!this.desktop) this.open = false
    },
    init () {
      // this.setSocket()
      // 告诉服务器端有用户登录
      // this.socket.emit('login', { userid: this.userid, username: 'finnwu' })
    }
  }
}
</script>

<style lang="less">
html, body {
  height: 100%;
}

#app {
  height: 100%;
}

.platform-content {
  height: calc(~'100% - 56px');
}

</style>