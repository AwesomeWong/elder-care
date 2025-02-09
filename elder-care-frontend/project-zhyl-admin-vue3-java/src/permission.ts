import NProgress from 'nprogress' // progress bar//每次刷新页面或者重新进入页面的时候最顶部的进度条
import 'nprogress/nprogress.css' // progress bar style

import { getPermissionStore, getUserStore } from '@/store'
import router from '@/router'

// 是否显示环形进度条
NProgress.configure({ showSpinner: false })
// 路由跳转前的拦截
router.beforeEach(async (to, from, next) => {
  // 进度条开始
  NProgress.start()

  const userStore = getUserStore()
  const permissionStore = getPermissionStore()
  const { whiteListRouters } = permissionStore

  const { token } = userStore

  if (token) {
    if (to.path === '/login') {
      next()
      return
    }
    // 在路由权限里需要借助roles进行过来 这块先留着后面需要改掉
    const roles = ['all']
    await permissionStore.initRoutes(roles)
    next()
    return
  }
  /* white list router */
  if (whiteListRouters.indexOf(to.path) !== -1) {
    next()
  } else {
    next({
      path: '/login',
      query: { redirect: encodeURIComponent(to.fullPath) }
    })
  }
  // 进度条结束
  NProgress.done()
})
// 路由跳转后的拦截
router.afterEach((to) => {
  if (to.path === '/login') {
    const permissionStore = getPermissionStore()
    permissionStore.restore()
  }
  const permissionStore = getPermissionStore()
  // 显示左侧子菜单数据
  permissionStore.initCurrentRoutes()
  // 进度条结束
  NProgress.done()
})
