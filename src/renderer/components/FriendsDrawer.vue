<template>
  <mu-drawer right :open="open" :docked="false" @close="closeFriendsDrawer">
    <mu-list @itemClick="invite">
      <mu-text-field hintText="搜索昵称" icon="search"/><br/>
      <mu-sub-header>邀请好友</mu-sub-header>
      <mu-list-item title="Mike Li">
        <mu-avatar src="" slot="leftAvatar"/>
        <mu-icon value="pan_tool" slot="right"/>
      </mu-list-item>
      <mu-list-item title="Maco Mai">
        <mu-avatar src="" slot="leftAvatar"/>
        <mu-icon value="pan_tool" slot="right"/>
      </mu-list-item>
      <mu-list-item title="Alex Qin">
        <mu-avatar src="" slot="leftAvatar"/>
        <mu-icon value="pan_tool" slot="right"/>
      </mu-list-item>
      <mu-list-item title="Allen Qun">
        <mu-avatar src="" slot="leftAvatar"/>
        <mu-icon value="pan_tool" slot="right"/>
      </mu-list-item>
      <mu-list-item title="Myron Liu">
        <mu-avatar src="" slot="leftAvatar"/>
        <mu-icon value="pan_tool" slot="right"/>
      </mu-list-item>
    </mu-list>
  </mu-drawer>
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
    }
  },
  computed: {
    ...mapState({
      open: state => state.FriendsDrawer.open
    })
  },
  methods: {
    ...mapActions(['openFriendsDrawer', 'closeFriendsDrawer']),
    invite () {
      this.$socket.emit('invite')
    }
  }
}
</script>

<style lang="less">
</style>
