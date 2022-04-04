import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GraciasView from '../views/GraciasView.vue'
import ScoreView from '../views/GraciasView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/Home.vue')
  },
  {
    path: '/page/gracias',
    name: 'gracias',
    component: () => import('@/components/gracias.vue')
  },
  {
    path: '/:idcase',
    name: 'scoreParams',
    component: () => import('@/components/score.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
