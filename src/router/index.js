import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/surah',
      name: 'Content Surah',
      // component: () => import('../views/Empty.vue'),
      children: [
        {
          path: '',
          name: 'Surah',
          component: () => import('../views/surah/Index.vue')
        },
        {
          path: '/surah/:id',
          name: 'Detail Surah',
          component: () => import('../views/surah/Detail.vue')
        },
      ]
    },
    {
      path: '/*',
      name: 'Empty Content',
      component: () => import('../views/Empty.vue')
    }
  ]
})

export default router
