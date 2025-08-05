import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

// createRouter 创建路由实例，===> new VueRouter()
// 1. history模式: createWebHistory()   http://xxx/user
// 2. hash模式: createWebHashHistory()  http://xxx/#/user

// vite 的配置 import.meta.env.BASE_URL 是路由的基准地址，默认是 ’/‘
// https://vitejs.dev/guide/build.html#public-base-path

// 如果将来部署的域名路径是：http://xxx/my-path/user
// vite.config.ts  添加配置  base: my-path，路由这就会加上 my-path 前缀了
const router = createRouter({
  history: createWebHistory('/gld'),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      name: 'article',
      path: '/',
      redirect: '/article/manage',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      children: [
        {
          name: 'manage',
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          name: 'channel',
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          name: 'profile',
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          name: 'avatar',
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          name: 'password',
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 登录访问拦截
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})

export default router
