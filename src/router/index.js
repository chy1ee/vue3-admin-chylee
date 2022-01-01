import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/about',
    children: [
      {
        path: '/about',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/xtwh',
    component: Layout,
    redirect: 'yhgl',
    meta: { title: '系统维护', icon: 'guide' },
    children: [
      {
        path: 'yhgl',
        name: 'Yhgl',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'glgl',
        name: 'Glgl',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
        meta: { title: '功能管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/xtwh2',
    component: Layout,
    redirect: 'yhgl2',
    meta: { title: '系统维护2', icon: 'pdf' },
    children: [
      {
        path: 'yhgl2',
        name: 'Yhgl2',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: { title: '用户管理2', icon: 'qq' }
      },
      {
        path: 'glgl2',
        name: 'Glgl2',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
        meta: { title: '功能管理2', icon: 'wechat' }
      }
    ]
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
