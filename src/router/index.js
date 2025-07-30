import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ParkList from '../views/ParkList.vue'
import Park from '../views/Park.vue'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/parks',
    component: ParkList,
    meta: { requiresAuth: true }
  },
  {
    path: '/parks/:code',
    component: Park,
    meta: { requiresAuth: true }
  },
  { path: '/', redirect: '/parks' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  onAuthStateChanged(auth, user => {
    if (requiresAuth && !user) {
      next('/login')
    } else {
      next()
    }
  })
})


export default router
