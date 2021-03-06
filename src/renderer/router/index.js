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
      path: '/item/:id',
      name: 'item',
      component: require('@/views/ItemPage').default
    },
    {
      path: '/profile',
      name: 'profile',
      component: require('@/views/ProfilePage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
