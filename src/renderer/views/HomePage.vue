<template>
  <div class="home-content">
    <mu-paper class="content-left" :zDepth="1" :rounded="false">
      <app-nav></app-nav>
    </mu-paper>
    <div class="content-right">
      <div class="game-detail" v-if="selectedGame">
        <mu-card>
          <!-- <mu-card-header title="Myron Avatar" subTitle="sub title">
            <mu-avatar src="/images/uicon.jpg" slot="avatar"/>
          </mu-card-header> -->
          <mu-card-title :title="selectedGame.name"/>
          <mu-card-media >
            <div class="game-banner" :style="{ backgroundImage: `url(${selectedGame.banner})` }"></div>
            <!-- <img :src="selectedGame.banner" /> -->
          </mu-card-media>
          <mu-card-title title="游戏经历"/>
          <mu-card-text>
            <mu-table ref="table" :showCheckbox="false" v-if="experience">
              <mu-tbody>
                <mu-tr>
                  <mu-td>游戏次数</mu-td>
                  <mu-td>{{ experience.play_time }}</mu-td>
                </mu-tr>
                <mu-tr>
                  <mu-td>胜场</mu-td>
                  <mu-td>{{ experience.win_time }}</mu-td>
                </mu-tr>
                <mu-tr>
                  <mu-td>胜率</mu-td>
                  <mu-td>{{ experience.win_time / experience.play_time }}</mu-td>
                </mu-tr>
              </mu-tbody>
            </mu-table>
            <p v-if="!experience">暂未玩过该游戏</p>
          </mu-card-text>
          <mu-card-actions>
            <mu-flat-button icon="delete" label="从收藏中删除" @click="removeFavorite(selectedGame.gameId)"/>
          </mu-card-actions>
        </mu-card>
      </div>
      <div class="bottom-buttons" v-if="selectedGame">
        <mu-raised-button class="demo-raised-button" label="匹配对手" icon="keyboard" backgroundColor="#a4c639"  primary/>
        <mu-raised-button class="demo-raised-button" @click="openFriendsDrawer" label="邀请好友" icon="face" primary/>
      </div>
      <div class="empty-page" v-if="!selectedGame">
        <h1>欢迎回来</h1>
        <p>快选择一款游戏开始与好友对战吧！</p>
        <img src="../assets/pk.png" alt="">
      </div>
    </div>
    <friends-drawer :list="[]"></friends-drawer>
  </div>
</template>

<script>
// import { ipcRenderer } from 'electron'
import { mapActions, mapState } from 'vuex'
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
      experience: {}
    }
  },
  sockets: {
    'set_experience': function (data) {
      this.experience = data
    }
  },
  computed: {
    ...mapState({
      selectedGame: state => {
        return state.UserState.selectedGame
      }
    })
  },
  watch: {
    selectedGame: function () {
      this.$socket.emit('get_experience', { gameId: this.selectedGame.gameId })
    }
  },
  methods: {
    ...mapActions(['openFriendsDrawer']),
    removeFavorite (gameId) {
      this.$socket.emit('remove_out_favorite', { gameId: gameId })
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
  background-color: rgba(0, 0, 0, 0);
  overflow-x: hidden;
  overflow-y: scroll;
}

.game-banner {
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
}

.bottom-buttons {
  text-align: right;
  width: 100%;
  padding: 10px 20px;
  position: fixed;
  bottom: 0;
  right: 0;
}

.game-detail {
  padding: 20px;
}

.empty-page {
  text-align: center;
}

.empty-page h1 {
  font-size: 50px;
}

.empty-page p {
  font-size: 20px;
}

</style>
