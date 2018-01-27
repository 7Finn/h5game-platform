<template>
  <div class="layout">
    
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

<style>
.file-button{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}

.content{
  overflow: hidden;
}

.content-left{
  width: 30%;
  float: left;
  background-color: white;
  margin-bottom: -4000px;
  padding-bottom: 4000px;
}

.content-right{
  width: 70%;
  display: inline-block;
  float: right;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0)
}

</style>
