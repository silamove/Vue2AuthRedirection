import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import Home from '../views/Home.vue'
import Counter from '../views/Counter.vue'
import FetchData from '../views/FetchData.vue'
import Login from '../views/Login.vue'
import OrderEdit from '../views/OrderEdit.vue'

let isAuthenticated = false

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/counter',
    name: 'Counter',
    component: Counter
  },
  {
    path: '/fetchdata',
    name: 'FetchData',
    component: FetchData
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/order/edit/:id',
    name: 'OrderEdit',
    component: OrderEdit,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      try {
        await axios.get('/account/me')
        isAuthenticated = true
      } catch {
        next({ name: 'Login', query: { redirect: to.fullPath } })
        return
      }
    }
  }
  next()
})

// Export function to update auth state from components
export const setAuthenticated = (value) => {
  isAuthenticated = value
}

export default router
