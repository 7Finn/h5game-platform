<template>
  <mu-dialog :open="open" title="登录" @close="closeLoginDialog" dialogClass="dialog">
    <mu-text-field 
      label="账号" hintText="请输入账号" type="text" errorColor="orange" icon="face" labelFloat
      :fullWidth="true" :errorText="accountErrorText" v-model="account" /><br/>
    <mu-text-field label="密码" hintText="请输入密码" type="password" errorColor="orange" icon="lock" labelFloat
      :fullWidth="true" :errorText="passwordErrorText" v-model="password"/><br/>
    <p class="registeTips">没有账号？点击<a href="javascript:void(0)" @click="switchToRegiste">注册</a></p>
    <mu-flat-button slot="actions" @click="closeLoginDialog" primary label="取消"/>
    <mu-flat-button slot="actions" @click="login" primary label="登录"/>
  </mu-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { validate } from '../tools/utils'
export default {
  data () {
    return {
      account: '',
      password: '',
      accountErrorText: '',
      passwordErrorText: ''
    }
  },
  computed: {
    ...mapState({
      open: state => state.LoginDialog.open
    })
  },
  mounted () {
    this.$socket.on('login', (data) => {
      console.log(data)
      if (data.ret === 0) {
        this.loginUserState(data.user)
        this.closeLoginDialog()
        this.openSnackbar('登录成功')
      }
    })
  },
  methods: {
    ...mapActions(['openRegisteDialog', 'closeLoginDialog', 'loginUserState', 'openSnackbar']),
    switchToRegiste () {
      this.closeLoginDialog()
      this.openRegisteDialog()
    },
    login () {
      if (this.check()) {
        this.$socket.emit('login', {
          account: this.account,
          password: this.password
        })
      }
    },
    check () {
      const rules = {
        account: {
          reg: /^[a-zA-Z0-9]{6,10}$/,
          msg: '请输入正确的账号'
        },
        password: {
          reg: /^[a-zA-Z0-9]{8,16}$/,
          msg: '请输入正确的密码'
        }
      }

      const param = {
        account: String(this.account).trim(),
        password: String(this.password).trim()
      }

      const result = validate(param, rules)
      if (result.key) {
        this.$data[result.key + 'ErrorText'] = result.error
        return false
      }

      return true
    }
  }
}
</script>

<style lang="less">

.dialog {
  width: 50%;
}
</style>
