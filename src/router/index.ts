import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@views/HomeView.vue'
import PageNotFound from '@views/PageNotFound/PageNotFound.vue'

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
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/404',
      name: 'NotFound',
      component: PageNotFound
    },
    { path: '/:pathMatch(.*)*', redirect: '404' }
  ]
})

export default router
