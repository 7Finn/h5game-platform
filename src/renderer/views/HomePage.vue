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
        <mu-raised-button class="demo-raised-button" @click="toggleFriendsDrawer" label="邀请好友" icon="android" primary/>
        <mu-raised-button class="demo-raised-button" icon="android" backgroundColor="#a4c639" />
      </div>
      <mu-drawer right :open="friendsDrawer" :docked="false" @close="toggleFriendsDrawer">
        <mu-list>
          <mu-list>
            <mu-sub-header>邀请好友</mu-sub-header>
            <mu-list-item title="Mike Li">
              <mu-avatar src="/images/avatar1.jpg" slot="leftAvatar"/>
              <mu-icon value="pan_tool" slot="right"/>
            </mu-list-item>
            <mu-list-item title="Maco Mai">
              <mu-avatar src="/images/avatar2.jpg" slot="leftAvatar"/>
              <mu-icon value="pan_tool" slot="right"/>
            </mu-list-item>
            <mu-list-item title="Alex Qin">
              <mu-avatar src="/images/avatar3.jpg" slot="leftAvatar"/>
              <mu-icon value="pan_tool" slot="right"/>
            </mu-list-item>
            <mu-list-item title="Allen Qun">
              <mu-avatar src="/images/avatar4.jpg" slot="leftAvatar"/>
              <mu-icon value="pan_tool" slot="right"/>
            </mu-list-item>
            <mu-list-item title="Myron Liu">
              <mu-avatar src="/images/uicon.jpg" slot="leftAvatar"/>
              <mu-icon value="pan_tool" slot="right"/>
            </mu-list-item>
          </mu-list>
        </mu-list>
      </mu-drawer>
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
      select: '1',
      friendsDrawer: true
    }
  },
  mounted: function () {
  },
  methods: {
    selectMenuChange (val) {
      this.select = val
    },
    toggleFriendsDrawer () {
      this.friendsDrawer = !this.friendsDrawer
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
    openFriendsWindow () {
      const url = `/friends`
      let win = new BrowserWindow({ width: 200, height: 600 })
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
.friend-item {
  position: relative;
}
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
