<template>
  <mu-dialog :open="open" title="Waiting" dialogClass="waiting-dialog">
    <mu-circular-progress :size="40" class="waiting-circle"></mu-circular-progress>
    {{ msg }}
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
      open: state => state.WaitingDialog.open,
      msg: state => state.WaitingDialog.msg
    })
  },
  methods: {
    ...mapActions(['openWaitingDialog', 'closeWaitingDialog']),
    close () {
      ipcRenderer.send('close-iframe')
    }
  }
}
</script>

<style lang="less">
.waiting-dialog {
  text-align: center;
  width: 50%;
}

.waiting-circle {
  margin-right: 20px;
  vertical-align: middle;
}
</style>
