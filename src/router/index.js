import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout/Layout'

export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/main',
        children: [{
            path: 'main',
            name: 'main',
            // component: () => import('@/views/dashboard/index'),
            meta: { title: '八个牙路思密达', icon: 'dashboard' }
        }]
    },
    // 404 必须放最后
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
