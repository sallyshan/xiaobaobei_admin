import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    mate: {
      title: '登录'
    }

  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'home' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/users',
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      },
      {
        path: 'userDetail/:id',
        name: 'UserDetail',
        hidden: true,
        component: () => import('@/views/user/Detail'),
        meta: { title: '用户详情' }
      }

    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goodsMgr',
    children: [
      {
        path: 'goodsMgr',
        name: 'GoodsMgr',
        component: () => import('@/views/goods/index'),
        meta: { title: '商品管理', icon: 'table' }
      },
      {
        path: 'goodsEdit/:id',
        name: 'GoodsEdit',
        hidden: true,
        component: () => import('@/views/goods/GoodsForm'),
        meta: { title: '商品编辑' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/orders',
    children: [
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: '订单' }
      },
      {
        path: 'orderDetail/:id',
        name: 'OrderDetail',
        hidden: true,
        component: () => import('@/views/order/OrderDetail'),
        meta: { title: '订单详情', icon: 'tree' }
      }
    ]
  },
  {
    path: '/money',
    component: Layout,
    redirect: '/money/capital',
    meta: { title: '财务管理', icon: 'money' },
    children: [
      {
        path: 'capital',
        name: 'Capital',
        component: () => import('@/views/money/index'),
        meta: { title: '财务管理', icon: '财务管理' }
      },
      {
        path: 'personalWithdraw',
        name: 'PersonalWithdraw',
        component: () => import('@/views/money/personal/index'),
        meta: { title: '个人提现', icon: '提现' }
      },
      {
        path: 'enterpriseWithdrawal',
        name: 'EnterpriseWithdrawal',
        component: () => import('@/views/money/enterprise/index'),
        meta: { title: '企业提现', icon: '提现' }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    redirect: '/config/admins',
    meta: { title: '配置', icon: '配置' },
    children: [
      {
        path: 'admins',
        name: 'Admins',
        component: () => import('@/views/admin/index'),
        meta: { title: '运营人员白名单', icon: 'users' }
      },
      {
        path: 'rebateRatio',
        name: 'RebateRatio',
        component: () => import('@/views/rebateRatio/index'),
        meta: { title: '商品分佣比例', icon: '比例' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/password',
  //   component: Layout,
  //   redirect: '/passwords',
  //   children: [{
  //     path: 'passwords',
  //     name: 'passwords',
  //     component: () => import('@/views/password/index'),
  //     meta: { title: '修改密码', icon: 'password' }
  //   }]
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
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
