import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home/index.vue'
import Reviews from '@/views/Reviews/index.vue'
import Reports from '@/views/Reports/index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Visão Geral',
    component: Home,
    meta: {
      layout: 'dashboard-layout'
    }
  },
  {
    path: '/avaliacoes',
    name: 'Avaliações',
    component: Reviews,
    meta: {
      layout: 'dashboard-layout'
    }
  },
  {
    path: '/relatorios',
    name: 'Relatórios',
    component: Reports,
    meta: {
      layout: 'dashboard-layout'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
