import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Home from '../views/home/home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(function (to, from, next) {
  if (to.path === '/home') {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
