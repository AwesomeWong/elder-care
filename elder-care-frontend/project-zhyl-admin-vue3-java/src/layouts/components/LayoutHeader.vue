<!-- 侧边栏头部 -->
<template>
  <l-header
    v-if="settingStore.showHeader"
    :show-logo="settingStore.showHeaderLogo"
    :theme="settingStore.displayMode"
    :layout="settingStore.layout"
    :is-fixed="settingStore.isHeaderFixed"
    :menu="headerMenu"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePermissionStore, useSettingStore, useUserStore } from '@/store'
import LHeader from '../simple2Components/Header.vue'

const userStore = useUserStore()
const permissionStore = usePermissionStore()
const settingStore = useSettingStore()
// 侧边栏头部菜单路由
const { routers, dynamic } = storeToRefs(permissionStore) // 静态路由
const { trendsRoute } = storeToRefs(userStore) // 动态路由
// 计算侧边栏头部菜单
// TODO  静态路由，动态路由修改
const headerMenu = computed(() => {
  // 动态路由(若路由无左侧子路由则不显示在头部导航菜单)
  return dynamic.value.filter((item) => item.children?.length)
  // 静态路由
  // return routers.value
})
</script>
