<template>
  <div id="app">
    <div class="platform-appbar">
      <mu-paper>
        <mu-bottom-nav :value="activeNav" shift @change="handleNavChange">
          <mu-bottom-nav-item value="movies" title="Movies" icon="ondemand_video"/>
          <mu-bottom-nav-item value="music" title="Music" icon="music_note"/>
          <mu-bottom-nav-item value="books" title="Books" icon="books"/>
          <mu-bottom-nav-item value="pictures" title="Pictures" icon="photo"/>
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
      activeNav: 'movies',
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