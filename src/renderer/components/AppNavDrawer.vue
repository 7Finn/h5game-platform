<template>
<mu-drawer @hide="handleHide" @close="handleClose" :open="open" :docked="docked" :overlay="docked" class="app-drawer" :zDepth="1">
  <div class="platform-drawer-content">
    <mu-list>
    </mu-list>
  </div>
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
