<template>
  <mu-drawer right :open="open" :docked="false" @close="closeFriendsDrawer">
    <mu-list @itemClick="invite">
      <mu-sub-header>在线好友</mu-sub-header>
      <mu-list-item v-for="(user, index) in onlineFriends" :title="user.nickname" :key="index">
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
      open: state => state.FriendsDrawer.open,
      friends: state => state.UserState.friends
    }),
    onlineFriends () {
      return this.friends
    }
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
