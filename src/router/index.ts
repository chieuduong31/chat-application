import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/chat',
      name: 'Chat',
      component: () => import('@/views/ChatRoom.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  const user = (await authStore.getCurrentUser()) as any

  if (user && (to.name === 'Home' || to.name === 'Chat') && !to.query.line_user_id) {
    next({
      ...to,
      query: {
        ...to.query,
        line_user_id: user.uid
      }
    })
  }

  if (user && to.name === 'Login')
    next({
      name: 'Home'
    })

  if (!user && to.name === 'Login') next()

  if (!user) {
    next({
      name: 'Login'
    })
  }

  next()
})

export default router
