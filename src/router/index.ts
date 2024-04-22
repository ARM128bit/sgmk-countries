import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@views/Countries/List.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@views/AboutView.vue')
    },
    {
      path: '/country/:cca3',
      name: 'country',
      props: true,
      component: () => import('@views/Countries/Country.vue')
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('@views/PageNotFound/PageNotFound.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: '404' }
  ]
})

export default router
