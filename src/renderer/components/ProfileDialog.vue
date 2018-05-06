<template>
  <mu-dialog :open="open" @close="closeProfileDialog">
    <div class="left-block">
      <div class="avatar-pciker" :style="{ backgroundImage: 'url('+ tmpAvatar +')' }">
        <input type="file" class="file-button" accept="image/png,image/gif,image/jpeg" @change="upload">
      </div>
    </div>
    <div class="right-block">
      <mu-text-field v-model="tmpNickname" />
      <mu-badge :content="'ID:' + account" class="id-badge"/><br />
      <mu-text-field fullWidth hintText="个人简介" multiLine :rows="3" :rowsMax="6" /><br />
    </div>
    <mu-flat-button slot="actions" @click="closeProfileDialog" primary label="取消"/>
    <mu-flat-button slot="actions" @click="updateProfile" primary label="保存"/>
  </mu-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      tmpNickname: this.$store.state.UserState.nickname,
      tmpAvatar: this.$store.state.UserState.avatar
    }
  },
  computed: {
    ...mapState({
      open: state => state.ProfileDialog.open,
      account: state => state.UserState.account,
      nickname: state => state.UserState.nickname,
      avatar: state => state.UserState.avatar
    })
  },
  watch: {
    nickname (val) {
      this.tmpNickname = val
    },
    avatar (val) {
      this.tmpAvatar = val
    }
  },
  methods: {
    ...mapActions(['closeProfileDialog']),
    upload (event) {
      let file = event.target.files[0]
      if (file) {
        let formData = new FormData()
        formData.append('file', file)
        formData.append('account', this.account)

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

        this.$http.post('http://localhost:3000/uploadAvatar', formData, config).then(res => {
          if (res.data.ret === 0) {
            this.tmpAvatar = res.data.path
          }
        })
      }
    },
    updateProfile () {
      this.$socket.emit('update_profile', {
        nickname: this.tmpNickname,
        avatar: this.tmpAvatar
      })
    }
  }
}
</script>

<style lang="less" scoped>

.left-block {
  float: left;
  width: 100px;
}

.right-block {
  margin-left: 100px;
}

.id-badge {
  float: right;
}

.file-button {
  height: 100%;
  width: 100%;
  opacity: 0;
}

.avatar-pciker {
  cursor: pointer;
  background-size: cover;
  margin-right: 20px;
  height: 70px;
  width: 70px;
  border-radius: 50%;
}
</style>
