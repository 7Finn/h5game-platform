<template>
  <mu-dialog :open="open" title="游戏结束" dialogClass="result-dialog">
    {{ msg }}
  </mu-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      open: state => state.ResultDialog.open,
      msg: state => state.ResultDialog.msg
    })
  },
  methods: {
    ...mapActions(['openResultDialog', 'closeResultDialog'])
  }
}
</script>

<style lang="less">
.result-dialog {
  text-align: center;
  width: 50%;
}
</style>
