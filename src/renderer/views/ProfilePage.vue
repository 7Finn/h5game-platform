<template>
  <div class="profile-content">
    <mu-card>
      <mu-card-header :title="userNickname" :subTitle="`ID: ${userAccount}`">
        <mu-avatar :src="avatar" slot="avatar"/>
        <mu-icon-button icon="settings" class="edit-btn" @click="openProfileDialog" />
      </mu-card-header>
    </mu-card>
    <mu-flexbox class="mt8" align="flex-start">
      <mu-flexbox-item grow="3">
        <mu-card>
          <mu-card-title subTitle="我的游戏"/>
        </mu-card>
        <mu-flexbox class="mt8">
          <mu-flexbox-item class="mygame-item">
            <!-- <div class="store-item" @click="toItemPage(item)">
              <div class="item-cover" :style="{ backgroundImage: `url(${item.cover})` }"></div>
              <div class="item-info">
                <div class="item-title">{{ item.name }}</div>
                <div class="item-descript">{{ item.description }}</div>
              </div>
            </div> -->
          </mu-flexbox-item>
          <mu-flexbox-item class="mygame-item">
          </mu-flexbox-item>
          <mu-flexbox-item class="mygame-item">
          </mu-flexbox-item>
        </mu-flexbox>
      </mu-flexbox-item>
      <mu-flexbox-item grow="1">
        <mu-card>
          <mu-linear-progress v-show="searching"/>
          <mu-card-title subTitle="添加好友"/>
          <mu-card-actions class="search-input">
            <mu-text-field hintText="搜索昵称" fullWidth icon="search" v-model="searchKey" @change="search"/><br/>
          </mu-card-actions>
          <mu-list-item disabled v-if="searchResult" :title="searchResult.nickname" :describeText="added ? '申请已提交' : ''" >
            <mu-avatar :src="searchResult.avatar" slot="leftAvatar"/>
            <mu-icon-button class="mt5" v-show="!added" icon="add" slot="right" @click="addContact"/>
          </mu-list-item>
          <mu-sub-header v-if="applicants.length > 0">申请列表</mu-sub-header>
          <mu-list-item v-for="(applicant, index) in applicants" :title="applicant.nickname" :describeText="'ID: ' + applicant.account" disabled :key="index">
            <mu-avatar :src="applicant.avatar" slot="leftAvatar"/>
            <mu-icon-menu class="mt5" slot="right" icon="more_vert" :anchorOrigin="rightTop" :targetOrigin="rightTop">
              <mu-menu-item title="同意" @click="approveApplication(applicant.account)" />
              <mu-menu-item title="忽略" @click="neglectApplication(applicant.account)" />
            </mu-icon-menu>
          </mu-list-item>
        </mu-card>
        <mu-card class="mt8">
          <mu-card-title subTitle="我的好友"/>
          <mu-list>
            <mu-list-item v-for="(friend, index) in friends" :title="friend.nickname" :describeText="'ID: ' + friend.account" :key="index">
              <mu-avatar :src="friend.avatar" slot="leftAvatar"/>
            </mu-list-item>
          </mu-list>
        </mu-card>
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      searchKey: '',
      searching: false,
      added: false,
      searchResult: null,
      rightTop: {horizontal: 'right', vertical: 'top'}
    }
  },
  sockets: {
    'search': function (data) {
      this.searching = false
      this.searchResult = data.user
    },
    'add_contact': function (data) {
      if (data.ret === 0) {
        this.added = true
      } else {
        this.added = false
      }
    }
  },
  computed: {
    ...mapState({
      loginState: state => state.UserState.login,
      onlineState: state => state.UserState.online,
      userNickname: state => state.UserState.nickname,
      userAccount: state => state.UserState.account,
      avatar: state => state.UserState.avatar,
      friends: state => state.UserState.friends,
      applicants: state => state.UserState.applicants
    })
  },
  methods: {
    ...mapActions(['openProfileDialog', 'openSnackbar']),
    search () {
      this.$socket.emit('search', { nickname: this.searchKey })
      this.searching = true
      this.added = false
    },
    addContact () {
      this.$socket.emit('add_contact', {
        nickname: this.searchResult.nickname
      })
    },
    approveApplication (account) {
      this.$socket.emit('approve_application', { account: account })
    },
    neglectApplication (account) {
      this.$socket.emit('neglect_application', { account: account })
    }
  }
}
</script>

<style lang="less" scoped>
.profile-content {
  background-image: url(../assets/science.png);
  height: 100%;
  padding: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.add-friend-tips {
  margin: 0;
  text-align: center;
}

.edit-btn {
  position: absolute;
  right: 20px;
}

.mt8 {
  margin-top: 8px;
}

.mt5 {
  margin-top: 5px;
}

.search-btn {
  position: absolute;
  right: 0;
  top: 0;
}

.mygame-item {
  cursor: pointer;
  background-color: #eee;
  border-radius: 2px;
  display: inline-block;
  width: 100%;
  height: 300px;
  -webkit-transition: all .6s cubic-bezier(.23,1,.32,1);
  transition: all .6s cubic-bezier(.23,1,.32,1);
}

.mygame-item:hover {
  box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
}

.item-info {
  height: 70px;
  border-radius: 0 0 2px 2px;
  padding: 10px 20px 10px 20px;
}

.item-cover {
  border-radius: 2px 2px 0 0;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 150px;
}

.item-title {
  font-size: 18px;
}

.item-descript {
  font-size: 14px;
  color: rgba(71, 74, 79, 0.54);
}

</style>
