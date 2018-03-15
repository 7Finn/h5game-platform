<template>
  <mu-dialog :open="open" @close="closeProfileDialog">
    <mu-list-item disabled :describeText="'ID: ' + account">
      <mu-avatar slot="left" :src="tmpAvatar" class="avatar-pciker">
        <input type="file" class="file-button" accept="image/png,image/gif,image/jpeg" @change="upload">
      </mu-avatar>
      <mu-text-field slot="title" v-model="tmpNickname" /><br/>
    </mu-list-item>
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

<style lang="less">
.file-button{
  height: 100%;
  width: 100%;
  opacity: 0;
}
</style>
