<template>
  <div class="height-100">
    <mu-list-item :title="userNickname" @click="handleProfileClick">
      <mu-avatar src="" slot="leftAvatar"/>
    </mu-list-item>
    <mu-divider/>
    <mu-list class="content-appbar" :value="select" @change="handleSelectChange">
      <mu-sub-header>最近的游戏</mu-sub-header>
      <mu-list-item title="拼图游戏" value="1" :class="{ active: select === '1'}">
        <mu-avatar src="" slot="leftAvatar"/>
        <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
          <mu-menu-item title="删除" />
        </mu-icon-menu>
      </mu-list-item>
      <mu-list-item title="跳一跳" value="2" :class="{ active: select === '2'}">
        <mu-avatar src="" slot="leftAvatar"/>
        <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
          <mu-menu-item title="删除" />
        </mu-icon-menu>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      select: '1'
    }
  },
  computed: {
    ...mapState({
      loginState: state => state.UserState.login,
      userNickname: state => state.UserState.nickname
    })
  },
  methods: {
    ...mapActions(['openProfileDialog', 'openLoginDialog']),
    handleSelectChange (val) {
      this.select = val
      this.$emit('selectChange', val)
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

// .active {
//   background-color: #eee;
// }
</style>
