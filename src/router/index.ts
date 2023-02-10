import { createRouter, createWebHistory,RouteRecordRaw } from 'vue-router'

const routes:Array<RouteRecordRaw> = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/index.vue')
  }
]

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes // `routes: routes` 的缩写
})
