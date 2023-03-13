import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // name: 'home',
      // component: HomeView
      name: 'E - Quran',
      component: () => import('../views/E-Quran.vue')
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
      path: '/e-quran',
      name: 'Empty Content E-Quran Container',
      // component: () => import('../views/Empty.vue'),
      children: [
        {
          path: '',
          name: 'E - Quran',
          component: () => import('../views/E-Quran.vue')
        },
        {
          path: '/e-quran/:number',
          name: 'Detail Surah',
          component: () => import('../views/E-QuranId.vue')
        },
      ]
    }, 
  ]
})

export default router
