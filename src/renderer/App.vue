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
export default {
  data () {
    return {
      activeNav: 'main',
      open: true,
      docked: true,
      title: ''
    }
  },
  mounted () {
  },
  methods: {
    handleNavChange (val) {
      this.activeNav = val
    },
    handleMenuChange (path) {
      if (!this.desktop) this.open = false
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