<template>
  <mu-drawer right :open="open" :docked="false" @close="closeFriendsDrawer">
    <mu-list>
      <mu-sub-header>在线好友</mu-sub-header>
      <mu-list-item v-for="(friend, index) in friends" :title="friend.nickname" :key="index" @click="invite(friend)">
        <mu-avatar :src="friend.avatar" slot="leftAvatar"/>
        <mu-icon value="pan_tool" slot="right"/>
      </mu-list-item>
    </mu-list>
  </mu-drawer>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      open: state => state.FriendsDrawer.open,
      friends: state => state.UserState.friends.filter(friend => {
        return friend.online
      }),
      selectedGame: state => state.UserState.selectedGame,
      account: state => state.UserState.account,
      nickname: state => state.UserState.nickname
    })
  },
  methods: {
    ...mapActions(['openFriendsDrawer', 'closeFriendsDrawer']),
    invite (friend) {
      const roomId = `${this.selectedGame.gameId}_${Math.floor(Math.random() * 10000)}${Date.now()}`
      this.$socket.emit('invite', {
        inviter: {
          nickname: this.nickname,
          account: this.account
        },
        invitee: {
          nickname: friend.nickname,
          account: friend.account
        },
        game: this.selectedGame,
        roomId: roomId
      })

      const arg = {
        init: {
          roomId: roomId,
          game: this.selectedGame,
          competitor: {
            nickname: friend.nickname,
            account: friend.account
          },
          player: {
            nickname: this.nickname,
            account: this.account
          }
        }
      }
      ipcRenderer.send('open-iframe', arg)
    }
  }
}
</script>

<style lang="less">

</style>
