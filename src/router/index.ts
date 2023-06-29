import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    beforeEnter: (to, from, next) => {
      let username = localStorage.getItem('username')
      if (!username)
        next("/login");
      else
        next("/stores")
    },
    path: '/',
    name: 'home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    beforeEnter: (to, from, next) => {
      let username = localStorage.getItem('username')
      if (!username)
        next("/login");
      else
        next()
    },
    path: '/stores',
    name: 'store',
    component: () => import('@/views/StorePage.vue')
  },
  {
    beforeEnter: (to, from, next) => {
      let username = localStorage.getItem('username')
      if (!username)
        next("/login");
      else if (from.name !== 'store')
        next("/stores");
      else
        next()
    },
    path: '/home',
    name: 'home',
    component: () => import('@/views/LayoutPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
