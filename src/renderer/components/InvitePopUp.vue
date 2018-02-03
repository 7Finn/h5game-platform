<template>
  <mu-popup position="bottom" :overlay="false" popupClass="" :open="open" @close="closeInvitePopUp">
    <mu-appbar title="邀请">
      <mu-flat-button slot="right" label="关闭" color="white" @click="closeInvitePopUp"/>
    </mu-appbar>
    <mu-content-block>
      <p>
        Popup 弹出框组件，可以从上下左右四个方位弹出，也可以直接渐变透明度显示，弹出框的宽度高度需要自己设置
      </p>
    </mu-content-block>
  </mu-popup>
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
      open: state => state.InvitePopUp.open
    })
  },
  methods: {
    ...mapActions(['closeInvitePopUp'])
  }
}
</script>

<style lang="less">
</style>
