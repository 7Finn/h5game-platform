<template>
  <div class="height-100">
    <mu-flexbox :gutter="0" align="stretch" class="height-100">
      <mu-flexbox-item>
        <div class="left-cover"></div>
        <iframe class="left-frame" :src="leftUrl" frameborder="0"></iframe>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <!-- <div class="right-cover"></div> -->
        <iframe class="right-frame" :src="rightUrl" frameborder="0"></iframe>
      </mu-flexbox-item>
    </mu-flexbox>
    <waiting-join-dialog></waiting-join-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { ipcRenderer } from 'electron'
import { config } from './tools/config'
import WaitingJoinDialog from './components/WaitingJoinDialog'

export default {
  components: {
    'waiting-join-dialog': WaitingJoinDialog
  },
  created () {
    ipcRenderer.on('init', (event, arg) => {
      this.setInfo({ info: arg })
      this.$socket.emit('init', arg)
    })
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      game: state => state.UserState.game,
      competitor: state => state.UserState.competitor,
      player: state => state.UserState.player,
      roomId: state => state.UserState.roomId
    }),
    leftUrl () {
      return this.player ? `${config.service}/${this.game.gameId}/index.html?roomId=${this.roomId}&gameId=${this.game.gameId}&account=${this.competitor.account}&role=${1}` : ''
    },
    rightUrl () {
      return this.player ? `${config.service}/${this.game.gameId}/index.html?roomId=${this.roomId}&gameId=${this.game.gameId}&account=${this.player.account}&role=${0}` : ''
    }
  },
  methods: {
    ...mapActions(['setInfo'])
  }
}
</script>


<style lang="less">
html, body {
  height: 100%;
  overflow: hidden;
}
.height-100 {
  height: 100%;
}

.left-frame {
  width: 100%;
  height: 100%;
  border: 4px solid #d32f2f;
}

.left-cover {
  position: absolute;
  z-index: 999;
  width: 50%;
  height: 100%;
  background-color: rgba(0,0,0,.4)
}

.right-cover {
  position: absolute;
  z-index: 999;
  width: 50%;
  height: 100%;
  background-color: rgba(0,0,0,.4)
}

.right-frame {
  width: 100%;
  height: 100%;
  border: 4px solid #4caf50;
}
</style>
