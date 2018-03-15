<template>
  <mu-popup v-if="competitor" position="bottom" :overlay="true" popupClass="" :open="open">
    <mu-appbar title="游戏邀请">
      <mu-flat-button slot="right" label="关闭" color="white" @click="rejectInvite"/>
    </mu-appbar>
    <mu-content-block class="pop-up-content">
      <p class="invite-content">
        {{ competitor.nickname }}邀请你一起玩{{ game.name }}
      </p>
      <mu-raised-button label="加入游戏" primary @click="join"/>
    </mu-content-block>
  </mu-popup>
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
      open: state => state.InvitePopUp.open,
      competitor: state => state.InvitePopUp.competitor,
      player: state => state.InvitePopUp.player,
      game: state => state.InvitePopUp.game,
      roomId: state => state.InvitePopUp.roomId
    })
  },
  methods: {
    ...mapActions(['rejectInvite', 'closeInvitePopUp']),
    join () {
      const arg = {
        url: `http://localhost:9090/iframe.html`,
        init: {
          roomId: this.roomId,
          game: this.game,
          competitor: this.competitor,
          player: this.player
        }
      }
      ipcRenderer.send('open-iframe', arg)
      this.closeInvitePopUp()
    }
  }
}
</script>

<style lang="less">
.pop-up-content {
  text-align: center;
}

.invite-content {
  font-size: 18px;
}
</style>
