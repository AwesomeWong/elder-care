import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import router, { asyncRouterList } from '@/router'
import { store, useUserStore } from '@/store'
import { routerFormat } from '@/utils'

function filterPermissionsRouters(
  routes: Array<RouteRecordRaw>,
  roles: Array<unknown>
) {
  const res = []
  const removeRoutes = []
  routes.forEach((route) => {
    const children = []
    route.children?.forEach((childRouter) => {
      const roleCode = childRouter.meta?.roleCode || childRouter.name
      if (roles.indexOf(roleCode) !== -1) {
        children.push(childRouter)
      } else {
        removeRoutes.push(childRouter)
      }
    })
    if (children.length > 0) {
      route.children = children
      res.push(route)
    }
  })
  return { accessedRouters: res, removeRoutes }
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    whiteListRouters: ['/login'],
    routers: [], // 静态路由
    dynamic: [], // 动态路由
    removeRoutes: [],
    childrenRoutes: [] // 左侧子菜单路由
  }),
  actions: {
    // 用于style风格中的tooMany当页面刷新时， 左侧菜单数据保存,并且将路由的二级路由带parent字段的整合到parent对应的二级路由中作为三级路由
    initCurrentRoutes() {
      // 动态路由(动态路由配置时需要保证菜单路径和本地路由路径统一)
      // const dynamicChildrenRoutes = this.dynamic.filter((item) =>
      //   window.location.hash.includes(item.path)
      // )
      // console.log(dynamicChildrenRoutes, 'dynamicChildrenRoutes')
      // // 判断是三级路由还是二级路由

      // const haveThirdBySecond = [] // 拥有三级路由的二级路由
      // dynamicChildrenRoutes.forEach((item) => {
      //   if (item.children?.length) {
      //     item.children.forEach((item1) => {
      //       if (item1.children?.length) haveThirdBySecond.push(item1)
      //       // console.log(item1, 'item1')
      //     })
      //   }
      // })
      // console.log(haveThirdBySecond, 'haveThirdBySecond')
      // const arr = [] // 把拥有三级路由的二级路由的中的children全部平铺出来
      // haveThirdBySecond.forEach((item) => {
      //   if (item.children?.length) {
      //     item.children.forEach((item1) => {
      //       arr.push(item1)
      //     })
      //   }
      //   arr.push(item)
      // })
      // // 静态路由
      // const childrenRoutes = this.routers.filter((item) =>
      //   window.location.hash.includes(item.path)
      // )
      // const result = [] // 将最后得出的arr与静态路由映射并取值
      // let currentRoutes = childrenRoutes.length
      //   ? childrenRoutes[0].children
      //   : []

      // if (!haveThirdBySecond.length) {
      //   // const noThird = []
      //   currentRoutes.filter((item) => {
      //     dynamicChildrenRoutes[0]?.children.filter((item1) => {
      //       if (item.meta.title === item1.name) {
      //         result.push(item)
      //       }
      //     })
      //   })
      // } else {
      //   currentRoutes.filter((item) => {
      //     arr.filter((item1) => {
      //       if (item.meta.title === item1.name) {
      //         result.push(item)
      //       }
      //     })
      //   })
      // }
      // currentRoutes = result
      //    // 静态路由
      const childrenRoutes = this.routers.filter((item) =>
        window.location.hash.includes(item.path)
      )
      const currentRoutes = childrenRoutes.length
        ? childrenRoutes[0].children
        : []

      const haveParent = currentRoutes.filter((item) => item.parent)
      const noHaveParent = currentRoutes.filter((item) => !item.parent)
      haveParent.forEach((item) => {
        noHaveParent.forEach((item1) => {
          if (item1.name === item.parent) {
            if (
              item1.children &&
              !item1.children.filter((item2) => item2.name === item.name).length
            ) {
              item1.children.push(item)
            } else {
              item1.children = [{ ...item }]
            }
          }
        })
      })
      this.childrenRoutes = noHaveParent
    },
    // 根据roles的角色权限动态处理路由
    async initRoutes(roles: Array<unknown>) {
      // 从后端拿到的动态路由信息
      const routeStore = useUserStore()
      const baseRouter = routerFormat(routeStore.$state.trendsRoute)

      let accessedRouters = []
      let removeRoutes = []
      if (roles.includes('all')) {
        // console.log(89889, baseRouter)
        accessedRouters = asyncRouterList // 这里是控制权限菜单 默认asyncRouterList 使用静态菜单
      } else {
        const res = filterPermissionsRouters(baseRouter, roles)
        accessedRouters = res.accessedRouters
        removeRoutes = res.removeRoutes
      }
      this.routers = accessedRouters
      this.removeRoutes = removeRoutes

      removeRoutes.forEach((item: RouteRecordRaw) => {
        if (router.hasRoute(item.name)) {
          router.removeRoute(item.name)
        }
      })
    },
    async restore() {
      this.removeRoutes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item)
      })
    },
    setRouters(data: any) {
      this.dynamic = data
    }
  },
  persist: true
})

export function getPermissionStore() {
  return usePermissionStore(store)
}
