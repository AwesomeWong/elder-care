<!-- 侧边栏主页面 -->
<template>
  <l-side-nav
    v-if="settingStore.showSidebar"
    :show-logo="settingStore.showSidebarLogo"
    :menu="sideMenu"
    :theme="settingStore.displayMode"
    :is-compact="settingStore.isSidebarCompact"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePermissionStore, useSettingStore, useUserStore } from '@/store'
import LSideNav from '../simple2Components/SideNav.vue' // 侧边栏

const permissionStore = usePermissionStore()
const settingStore = useSettingStore()
const userStore = useUserStore()
const { routers: menuRouters } = storeToRefs(permissionStore)
const { trendsRoute } = storeToRefs(userStore)
// sideMenu是侧边栏的菜单路由
const sideMenu = computed(() => {
  // console.log(permissionStore, 'permissionStore')
  // console.log(trendsRoute, 'useUserStore')
  const newMenuRouters = []
  return newMenuRouters
})
</script>
