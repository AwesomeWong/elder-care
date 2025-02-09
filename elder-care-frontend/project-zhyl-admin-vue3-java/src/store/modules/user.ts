import { defineStore } from 'pinia'
import { TOKEN_NAME } from '@/config/global'
import { store, usePermissionStore } from '@/store'

const InitUserInfo = {
  roles: []
}

export const useUserStore = defineStore('user', {
  state: () => ({
    unusualFloorId: [],
    floorId: '',
    token: '', // 默认token不走权限
    userInfo: { ...InitUserInfo } as any,
    userAvatar: {},
    floorInfo: {},
    trendsRoute: [],
    trendsRouteButton: [],
    routeNewButton: [],
    leftRoutes: [],
    roleSubmitData: [], // 角色模块的权限菜单和数据权限
    enterBaseData: {}, // 入住表单基本信息
    isShowTab3: false
  }),
  getters: {
    roles: (state) => {
      return state.userInfo?.roles
    }
  },
  actions: {
    async deleteUnusualFloorId(data) {
      this.unusualFloorId = this.unusualFloorId.filter((item) => item !== data)
    },
    async setUnusualFloorId(data: any) {
      const arr = []
      arr.push(data)
      this.unusualFloorId = [...arr]
      // console.log(data, [...data], 'data')
    },
    async login(token: string) {
      this.token = `${token}`
    },
    async setUserInfo(data: any) {
      this.userInfo = data
      this.userAvatar.avatar = data.avatar
      this.userAvatar.realName = data.realName
    },
    async setUserAvatar(data: any) {
      this.userAvatar = data
    },
    async logout() {
      localStorage.removeItem(TOKEN_NAME)
      this.token = ''
      this.userInfo = { ...InitUserInfo }
    },
    async removeToken() {
      this.token = ''
    },
    // 设置楼层信息
    async setFloorInfo(data: any) {
      this.floorInfo = data
    },
    // 动态路由存储 - 权限
    async setRoute(data: any) {
      this.trendsRoute = data
    },
    // 动态路由存储 - 权限按钮
    async setRouteButton(data: any) {
      this.trendsRouteButton = data
    },
    // 路由的菜单权限和数据权限的数据
    async setRoleData(data: any) {
      this.roleSubmitData = data
    },
    // 权限给配置的按钮
    async setRouteNewButton(data: any) {
      this.routeNewButton = data
    },
    async setLeftRoutes(data: any) {
      this.leftRoutes = data
    },
    // 存储入住基本信息到本地
    async setEnterBaseData(data: any) {
      this.enterBaseData = data
    },
    async setIsShowTab(data: any) {
      this.isShowTab3 = data
    },
    initCurrentRoutes() {
      const childrenRoutes = this.trendsRoute.filter((item) =>
        window.location.hash.includes(item.path)
      )
      const currentRoutes = childrenRoutes.length
        ? childrenRoutes[0].children
        : []
      this.leftRoutes = currentRoutes
      console.log(this.leftRoutes, '最新initCurrentRoutes')
    }
  },
  persist: {
    afterRestore: (ctx) => {
      if (ctx.store.roles && ctx.store.roles.length > 0) {
        const permissionStore = usePermissionStore()
        permissionStore.initRoutes(ctx.store.roles)
      }
    }
  }
})

export function getUserStore() {
  return useUserStore(store)
}
