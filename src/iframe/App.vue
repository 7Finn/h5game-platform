<template>
  <div>
    <iframe class="left-frame" :src="leftUrl" frameborder="0"></iframe>
    <iframe class="right-frame" :src="rightUrl" frameborder="0"></iframe>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { config } from './tools/config'

export default {
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
.left-frame {
  width: 48%;
  height: 1000px;
}

.right-frame {
  width: 48%;
  height: 1000px;
}
</style>
