import { createRouter, createWebHistory } from 'vue-router'
// import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/loginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/layoutContainer.vue'),
      redirect: '/manage/employee',
      children: [
        {
          path: '/manage/employee',
          component: () => import('@/views/manage/employeeManage.vue')
        },
        {
          path: '/manage/foodClass',
          component: () => import('@/views/manage/foodClass.vue')
        },
        {
          path: '/manage/foodSet',
          component: () => import('@/views/manage/foodSet.vue')
        },
        {
          path: '/manage/orderForm',
          component: () => import('@/views/manage/orderForm.vue')
        },
        {
          path: '/manage/food',
          component: () => import('@/views/manage/dishEat.vue')
        },
        {
          path: '/user/info',
          component: () => import('@/views/user/userInfo.vue')
        }
      ]
    },

    // 配置404页面
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/error/404Page.vue')
    }
  ]
})

// 登录访问拦截
// router.beforeEach((to) => {
//   //如果没有token，且访问非登录页,拦截
//   const useStore = useUserStore()
//   if (!useStore.token && to.path !== '/login') {
//     console.log('导航错误')
//     return '/login'
//   }

//   return true
// })

export default router
