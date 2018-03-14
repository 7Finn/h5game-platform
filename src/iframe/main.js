import Vue from 'vue'
import axios from 'axios'
import MuseUI from 'muse-ui'
import SocketIO from 'socket.io-client'
import VueSocketio from '../modules/vue-socket/Main'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'

import App from './App'
import store from './store'

Vue.use(VueSocketio, SocketIO('http://localhost:3000/iframe'), store)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(MuseUI)

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  template: '<App/>'
}).$mount('#app')
