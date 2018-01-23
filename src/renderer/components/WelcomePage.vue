<template>
<mu-paper>
  <mu-bottom-nav :value="bottomNav" @change="handleChange">
    <mu-bottom-nav-item value="recents" title="Recents" icon="restore"/>
    <mu-bottom-nav-item value="favorites" title="Favorites" icon="favorite"/>
    <mu-bottom-nav-item value="nearby" title="Nearby" icon="location_on"/>
  </mu-bottom-nav>
  <mu-raised-button label="玩游戏" class="demo-raised-button" primary @click="play"/>
  <mu-raised-button class="demo-raised-button" label="选择文件">
    <input type="file" class="file-button" @change="upload($event)">
  </mu-raised-button>
</mu-paper>
</template>

<script>
import { remote } from 'electron'
import axios from 'axios'
const BrowserWindow = remote.BrowserWindow

export default {
  data () {
    return {
      bottomNav: 'recents'
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
    handleChange (val) {
      this.bottomNav = val
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

<style>
.file-button{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}
</style>
