<template>
  <mu-dialog :open="open" title="注册" @close="closeRegisteDialog" dialogClass="dialog">
      <mu-text-field labelFloat
        name="account" label="账号" hintText="请输入账号" type="text" errorColor="orange" icon="face"
        :fullWidth="true" :errorText="accountErrorText" :maxLength="10" v-model="account"
        @textOverflow="(isOverflow) => handleInputOverflow(isOverflow, 'account')"
        @focus="clearStatus" /><br/>
      <mu-text-field labelFloat
        name="password" label="密码" hintText="请输入密码" type="password" errorColor="orange" icon="lock"
        :fullWidth="true" :errorText="passwordErrorText" :maxLength="16" v-model="password"
        @textOverflow="(isOverflow) => handleInputOverflow(isOverflow, 'password')"
        @focus="clearStatus" /><br/>
      <mu-text-field labelFloat
        name="repassword" class="has-icon" label="重复密码" hintText="请重复输入密码" errorColor="orange" type="password"
        :fullWidth="true" :errorText="repasswordErrorText" :maxLength="16" v-model="repassword"
        @textOverflow="(isOverflow) => handleInputOverflow(isOverflow, 'repassword')"
        @focus="clearStatus" /><br/>
      <mu-flat-button slot="actions" @click="switchToLogin" primary label="返回登录"/>
      <mu-flat-button slot="actions" @click="registe" primary label="注册"/>
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
      repassword: '',
      accountErrorText: '',
      passwordErrorText: '',
      repasswordErrorText: ''
    }
  },
  computed: {
    ...mapState({
      open: state => state.RegisteDialog.open
    })
  },
  mounted () {
    this.$socket.on('registe', (data) => {
      if (data.ret === 0) {
        this.openSnackbar('注册成功')
        this.switchToLogin()
      }
    })
  },
  methods: {
    ...mapActions(['openLoginDialog', 'closeRegisteDialog', 'openSnackbar']),
    handleInputOverflow (isOverflow, text) {
      this.$data[text + 'ErrorText'] = isOverflow ? '超过啦！！！' : ''
    },
    switchToLogin () {
      this.closeRegisteDialog()
      this.openLoginDialog()
    },
    registe () {
      if (this.check()) {
        this.$socket.emit('registe', {
          account: this.account,
          password: this.password
        })
      }
    },
    clearStatus (event) {
      const name = event.target.name
      this.$data[name + 'ErrorText'] = ''
    },
    check () {
      const rules = {
        account: {
          reg: /^[a-zA-Z0-9]{6,10}$/,
          msg: '请输入6到10位字母与数字组合'
        },
        password: {
          reg: /^[a-zA-Z0-9]{6,16}$/,
          msg: '请输入6到10位字母与数字组合'
        },
        repassword: {
          reg: (value, args) => {
            return value === args.password
          },
          msg: '重复密码不一致'
        }
      }

      const param = {
        account: String(this.account).trim(),
        password: String(this.password).trim(),
        repassword: String(this.repassword).trim()
      }

      const args = {
        password: String(this.password).trim()
      }

      const result = validate(param, rules, args)
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
.registeTips {
  text-align: right;
  margin: 0;
}

.dialog {
  width: 50%;
}
</style>
