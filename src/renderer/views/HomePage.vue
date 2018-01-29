<template>
  <div class="content">
    <mu-paper class="content-left" :zDepth="1" :rounded="false">
      <app-nav :list="[]" @selectChange="selectMenuChange"></app-nav>
    </mu-paper>
    <div class="content-right">
      <div class="game-detail">
        <p>title</p>
      </div>
      <div class="bottom-buttons" >
        <mu-raised-button class="demo-raised-button" label="自己玩" icon="android" primary/>
        <mu-raised-button class="demo-raised-button" label="邀请好友" icon="android" primary/>
        <mu-raised-button class="demo-raised-button" icon="android" backgroundColor="#a4c639" />
      </div>
    </div>
  </div>
</template>

<script>
import { remote } from 'electron'
import axios from 'axios'
import AppNavDrawer from '../components/AppNavDrawer'
const BrowserWindow = remote.BrowserWindow

export default {
  components: {
    'app-nav': AppNavDrawer
  },
  data () {
    return {
      select: '1'
    }
  },
  mounted: function () {
  },
  methods: {
    selectMenuChange (val) {
      this.select = val
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
  width: 250px;
  height: 100%;
  float: left;
}

.content-right {
  position: relative;
  margin-left: 250px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0)
}

.bottom-buttons {
  text-align: right;
  width: 100%;
  padding: 10px 20px;
  position: absolute;
  bottom: 0;
}

.game-detail {
  padding: 20px;
}

</style>
