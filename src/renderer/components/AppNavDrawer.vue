  <template>
  <mu-drawer @hide="handleHide" @close="handleClose" :open="open" :docked="docked" :overlay="docked" class="app-drawer" :zDepth="1">
      <mu-list style="height: 1000px">
        <mu-sub-header>最近的游戏</mu-sub-header>
        <mu-list-item title="拼图游戏">
          <mu-avatar src="assets/logo.png" slot="leftAvatar"/>
          <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
            <mu-menu-item title="删除" />
          </mu-icon-menu>
        </mu-list-item>
        <mu-list-item title="跳一跳">
          <mu-avatar src="assets/logo.png" slot="leftAvatar"/>
          <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
            <mu-menu-item title="删除" />
          </mu-icon-menu>
        </mu-list-item>
      </mu-list>
  </mu-drawer>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: true
    },
    docked: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    handleHide () {
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
.app-drawer {
  display: flex;
  flex-direction: column;
}

.platform-drawer-content {
  flex: 1;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    opacity: 0 !important;
  }
}
</style>
