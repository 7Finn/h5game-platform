<template>
  <div class="height-100">
    <mu-flexbox :gutter="0" align="stretch" class="height-100">
      <mu-flexbox-item>
        <iframe class="left-frame" :src="leftUrl" frameborder="0"></iframe>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <iframe class="right-frame" :src="rightUrl" frameborder="0"></iframe>
      </mu-flexbox-item>
    </mu-flexbox>
    <waiting-join-dialog></waiting-join-dialog>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { config } from './tools/config'
import WaitingJoinDialog from './components/WaitingJoinDialog'

export default {
  components: {
    'waiting-join-dialog': WaitingJoinDialog
  },
  data () {
    ipcRenderer.on('init', (event, arg) => {
      this.gameId = arg.gameId
      this.roomId = arg.roomId
      this.userId = arg.userId
    })
    return {
      gameId: 0,
      roomId: 0,
      userId: 0
    }
  },
  computed: {
    leftUrl () {
      return this.gameId ? `${config.service}/${this.gameId}/index.html?roomId=${this.roomId}&gameId=${this.gameId}&userId=${this.userId}&role=${0}` : ''
    },
    rightUrl () {
      return this.gameId ? `${config.service}/${this.gameId}/index.html?roomId=${this.roomId}&gameId=${this.gameId}&userId=${this.userId}&role=${1}` : ''
    }
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

.right-frame {
  width: 100%;
  height: 100%;
  border: 4px solid #4caf50;
}
</style>
