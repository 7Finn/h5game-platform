<template>
  <div class="content">
    <mu-paper class="content-left" :zDepth="1" :rounded="false">
      <mu-list class="content-appbar">
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
    </mu-paper>
    <div class="content-right">
    </div>
  </div>
</template>

<script>
import { remote } from 'electron'
import axios from 'axios'
const BrowserWindow = remote.BrowserWindow

export default {
  data () {
    return {
      activeTab: 'tab1'
    }
  },
  mounted: function () {
    this.$nextTick(this.init())
  },
  methods: {
    init () {
    },
    upload (event) {
      let file = event.target.files[0]
      let formData = new FormData()
      formData.append('file', file)
      formData.append('gameId', 1000)

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      axios.post('http://localhost:3000/upload', formData, config).then(function (res) {
      })
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    play () {
      const url = `http://localhost:3000/template.html?roomId=1000&gameId=1000&id=1`
      let win = new BrowserWindow({ width: 1400, height: 700 })
      win.on('close', () => {
        win = null
      })
      win.loadURL(url)
      win.show()
    }
  }
}
</script>

<style lang='less'>

.content {
  height: 100%;
  overflow: hidden;
}

.content-left {
  width: 30%;
  height: 100%;
  float: left;
}

.content-appbar {
  height: 100%;
}

.content-right {
  width: 70%;
  display: inline-block;
  float: right;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0)
}

</style>
