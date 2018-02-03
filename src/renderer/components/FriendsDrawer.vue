<template>
  <mu-drawer right :open="open" :docked="false" @close="closeFriendsDrawer">
    <mu-list @itemClick="invite">
      <mu-sub-header>邀请好友</mu-sub-header>
      <mu-list-item title="Mike Li">
        <mu-avatar src="/images/avatar1.jpg" slot="leftAvatar"/>
        <mu-icon value="pan_tool" slot="right"/>
      </mu-list-item>
      <mu-list-item title="Maco Mai">
        <mu-avatar src="/images/avatar2.jpg" slot="leftAvatar"/>
        <mu-icon value="pan_tool" slot="right"/>
      </mu-list-item>
      <mu-list-item title="Alex Qin">
        <mu-avatar src="/images/avatar3.jpg" slot="leftAvatar"/>
        <mu-icon value="pan_tool" slot="right"/>
      </mu-list-item>
      <mu-list-item title="Allen Qun">
        <mu-avatar src="/images/avatar4.jpg" slot="leftAvatar"/>
        <mu-icon value="pan_tool" slot="right"/>
      </mu-list-item>
      <mu-list-item title="Myron Liu">
        <mu-avatar src="/images/uicon.jpg" slot="leftAvatar"/>
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
