<template>
  <div class="home-content">
    <mu-paper class="content-left" :zDepth="1" :rounded="false">
      <app-nav :list="[]" @selectChange="selectMenuChange"></app-nav>
    </mu-paper>
    <div class="content-right">
      <div class="game-detail">
        <mu-card>
          <mu-card-header title="Myron Avatar" subTitle="sub title">
            <mu-avatar src="/images/uicon.jpg" slot="avatar"/>
          </mu-card-header>
          <mu-card-media title="Image Title" subTitle="Image Sub Title">
            <img src="/images/sun.jpg" />
          </mu-card-media>
          <mu-card-title title="Content Title" subTitle="Content Title"/>
          <mu-card-text>
            散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
            调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
            似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
            找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
          </mu-card-text>
          <mu-card-actions>
            <mu-flat-button icon="delete" label="从收藏中删除"/>
          </mu-card-actions>
        </mu-card>
      </div>
      <div class="bottom-buttons" >
        <mu-raised-button class="demo-raised-button" label="自己玩" icon="android" primary @click="invite"/>
        <mu-raised-button class="demo-raised-button" @click="openFriendsDrawer" label="邀请好友" icon="android" primary/>
        <mu-raised-button class="demo-raised-button" icon="android" backgroundColor="#a4c639" />
      </div>
    </div>
    <friends-drawer :list="[]"></friends-drawer>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapActions } from 'vuex'
import { ROLE } from '../tools/vars'
import axios from 'axios'
import AppNavDrawer from '../components/AppNavDrawer'
import FriendsDrawer from '../components/FriendsDrawer'

export default {
  components: {
    'app-nav': AppNavDrawer,
    'friends-drawer': FriendsDrawer
  },
  data () {
    return {
      select: '1'
    }
  },
  methods: {
    ...mapActions(['openFriendsDrawer']),
    selectMenuChange (val) {
      this.select = val
    },
    invite (item) {
      const arg = {
        url: `http://localhost:9090/iframe.html`,
        init: {
          roomId: 1000,
          gameId: 1000,
          role: ROLE.PLAYER,
          userId: 1
        }
      }
      ipcRenderer.send('open-iframe', arg)
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
    }
  }
}
</script>

<style lang='less'>
.friend-item {
  position: relative;
}
.home-content {
  height: 100%;
  background-image: url(../assets/science.png);
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
