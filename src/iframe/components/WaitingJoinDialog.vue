<template>
  <mu-dialog :open="open" title="Waiting" dialogClass="waiting-join-dialog">
    <mu-circular-progress :size="40" class="waiting-circle"></mu-circular-progress>
    等待对手加入中
    <mu-flat-button slot="actions" @click="close" primary label="取消等待并退出"/>
  </mu-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { ipcRenderer } from 'electron'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      open: state => state.WaitingJoinDialog.open
    })
  },
  methods: {
    ...mapActions(['openWaitingJoinDialog', 'closeWaitingJoinDialog']),
    close () {
      ipcRenderer.send('close-iframe')
    }
  }
}
</script>

<style lang="less">
.waiting-join-dialog {
  text-align: center;
  width: 50%;
}

.waiting-circle {
  margin-right: 20px;
  vertical-align: middle;
}
</style>
