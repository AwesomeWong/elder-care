import { useUserStore } from '@/store'
// 用来控制权限配置的按钮显示
export const hasRole = {
  install: (app: any) => {
    app.directive('hasRole', {
      mounted(el: any, binding: any) {
        const roles = []
        const routeStore = useUserStore()
        routeStore.routeNewButton.forEach((ele) => {
          roles.push(ele.name)
        })
        const value = binding.value
        const flag = value.filter((v: any) => {
          return roles.indexOf(v) !== -1
        })
        if (flag.length <= 0) {
          if (!el.parentNode) {
            el.style.display = 'none'
          } else {
            el.parentNode.removeChild(el)
          }
        }
      }
    })
  }
}
