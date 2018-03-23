<template>
  <mu-dialog :open="open" :title="msg">
    <mu-linear-progress v-if="progressObj" mode="determinate" :value="progressObj.percent"/>
    <template v-if="progressObj">
      {{ (progressObj.bytesPerSecond / 1024).toFixed(2) }} K/s ，总共{{ (progressObj.total / (1024*1024)).toFixed(2) }}M
    </template>
    <mu-flat-button v-show="finish" label="重启并更新" slot="actions" primary @click="update"/>
  </mu-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { ipcRenderer } from 'electron'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      open: state => state.UpdateDialog.open,
      progressObj: state => state.UpdateDialog.progressObj,
      msg: state => state.UpdateDialog.msg,
      finish: state => state.UpdateDialog.finish
    })
  },
  methods: {
    update () {
      ipcRenderer.send('is-update-now')
    }
  }
}
</script>
