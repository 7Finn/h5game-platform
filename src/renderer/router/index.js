import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: require('@/components/WelcomePage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
