import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/views/HomePage').default
    },
    {
      path: '/store',
      name: 'store',
      component: require('@/views/StorePage').default
    },
    {
      path: '/friends',
      name: 'friends',
      component: require('@/views/FriendsPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
