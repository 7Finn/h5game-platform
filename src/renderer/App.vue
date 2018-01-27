<template>
  <div id="app">
    <div class="platform-appbar" :class="{'nav-hide': !open}">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="tab1" icon="phone" title="RECENTS"/>
        <mu-tab value="tab2" icon="favorite" title="FAVORITES"/>
        <mu-tab value="tab3" icon="person_pin" title="NEARBY"/>
      </mu-tabs>
    </div>
    <app-nav @change="handleMenuChange" @close="toggleNav" :open="open" :docked="docked" />
    <div class="platform-content" :class="{'nav-hide': !open }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppNavDrawer from './components/AppNavDrawer'
export default {
  components: {
    'app-nav': AppNavDrawer
  },
  data () {
    const desktop = this.isDesktop()
    return {
      activeTab: 'tab1',
      desktop: desktop,
      open: desktop,
      docked: desktop,
      title: ''
    }
  },
  mounted () {
    this.changeNav()
    this.handleResize = () => {
      this.changeNav()
    }
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    toggleNav () {
      this.open = !this.open
    },
    changeNav () {
      const desktop = this.isDesktop()
      this.docked = desktop
      if (desktop === this.desktop) return
      if (!desktop && this.desktop && this.open) {
        this.open = false
      }
      if (desktop && !this.desktop && !this.open) {
        this.open = true
      }
      this.desktop = desktop
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    handleMenuChange (path) {
      if (!this.desktop) this.open = false
    },
    isDesktop () {
      return window.innerWidth > 993
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="less">
.platform-appbar {
  position: fixed;
  left: 256px;
  right: 0;
  top: 0;
  width: auto;
  transition: all .45s cubic-bezier(0.23, 1, 0.32, 1);
  &.nav-hide {
    left: 0;
  }
}

.platform-content {
  padding-top: 56px;
  padding-left: 256px;
  transition: all .45s cubic-bezier(0.23, 1, 0.32, 1);
  &.nav-hide {
    padding-left: 0;
  }
}

.content-wrapper {
  padding: 48px 72px;
}

@media (min-width: 480px) {
  .platform-content{
    padding-top: 64px;
  }
}

@media (max-width: 993px) {
  .platform-appbar {
    left: 0;
  }
  .platform-content{
    padding-left: 0;
  }
  .content-wrapper {
    padding: 24px 36px;
  }
}
.home-page{
  padding: 0;
  .platform-content {
    transition-duration: 0s;
  }
}
</style>