  <template>
    <mu-list class="content-appbar" :value="select" @change="handleSelectChange">
      <mu-sub-header>最近的游戏</mu-sub-header>
      <mu-list-item title="拼图游戏" value="1" :class="{ active: select === '1'}">
        <mu-avatar src="assets/logo.png" slot="leftAvatar"/>
        <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
          <mu-menu-item title="删除" />
        </mu-icon-menu>
      </mu-list-item>
      <mu-list-item title="跳一跳" value="2" :class="{ active: select === '2'}">
        <mu-avatar src="assets/logo.png" slot="leftAvatar"/>
        <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
          <mu-menu-item title="删除" />
        </mu-icon-menu>
      </mu-list-item>
    </mu-list>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      select: '1'
    }
  },
  methods: {
    handleSelectChange (val) {
      this.select = val
      this.$emit('selectChange', val)
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
.content-appbar {
  height: 100%;
}

.active {
  background-color: #eee;
}
</style>
