<!-- 边导航栏 -->
<template>
  <div :class="sideNavCls">
    <t-menu
      :class="menuCls"
      :theme="theme"
      :value="active"
      :collapsed="collapsed"
      :default-expanded="defaultExpanded"
    >
      <template #logo>
        <span
          v-if="showLogo && setting.mode.value === 'light'"
          :class="`${prefix}-side-nav-logo-wrapper`"
          @click="goHome"
        >
          <img
            v-if="!collapsed"
            class="logofull"
            src="@/assets/test-img/logofull.png"
          />
          <img v-if="collapsed" class="logo" src="@/assets/test-img/logo.png" />
        </span>
        <span
          v-if="showLogo && setting.mode.value === 'black'"
          :class="`${prefix}-side-nav-logo-wrapper`"
          @click="goHome"
        >
          <img
            v-if="!collapsed"
            class="logofull"
            src="@/assets/logBlackTemFull.png"
          />
          <img v-if="collapsed" class="logo" src="@/assets/logBlackTem.png" />
        </span>
      </template>
      <!-- <topMenuContent
        :nav-data="userStore.leftRoutes"
        is-child-routes
        :left="true"
      /> -->
      <topMenuContent
        class="sideNav"
        :nav-data="permissionStore.childrenRoutes"
        is-child-routes
        :left="true"
      />
      <template #operations>
        <log-info />
      </template>
    </t-menu>
    <div
      :class="`${prefix}-side-nav-placeholder${collapsed ? '-hidden' : ''}`"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import LogInfo from '../components/LogInfo.vue'

import { useSettingStore, usePermissionStore, useUserStore } from '@/store'
import { prefix } from '@/config/global'
import type { MenuRoute } from '@/types/interface'
import { getActive } from '@/router'

import topMenuContent from './topMenuContent.vue'

// const MIN_POINT = 992 - 1 // 992px

const userStore = useUserStore()
const router = useRouter()
const permissionStore = usePermissionStore()
const settingStore = useSettingStore()
const setting = storeToRefs(settingStore)

const props = defineProps({
  menu: {
    type: Array as PropType<MenuRoute[]>,
    default: () => []
  },
  showLogo: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  isFixed: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  layout: {
    type: String as PropType<string>,
    default: ''
  },
  headerHeight: {
    type: String as PropType<string>,
    default: '64px'
  },
  theme: {
    type: String as PropType<string>,
    default: 'light'
  },
  isCompact: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})
// collapsed是侧边栏是否收起
const collapsed = computed(() => useSettingStore().isSidebarCompact)
// 是否选中
const active = computed(() => {
  const data = getActive()
  // console.log(data, permissionStore.routers, '侧边栏导航')
  return data
})
// 展开的菜单
const defaultExpanded = computed(() => {
  const defaultExpanded = []
  // 将三级路由全部遍历添加到数组中并返回，确保点击三级对应的二级路由下拉不会收起
  permissionStore.routers.forEach((item) => {
    item.children.forEach((item1) => {
      if (item1.parent) {
        defaultExpanded.push(`${item.path}/${item1.path}`)
      }
    })
  })
  // console.log(defaultExpanded, 'defaultExpanded')
  // return ['/enterQuit/enterManage', '/enterQuit/quitManage']
  return defaultExpanded
})
// sideNavCls是计算侧边栏的样式
const sideNavCls = computed(() => {
  const { isCompact } = props
  return [
    `${prefix}-sidebar-layout`,
    {
      [`${prefix}-sidebar-compact`]: isCompact,
      modeStyle: setting.mode.value === 'black'
    }
  ]
})
// menuCls是计算侧边栏的样式
const menuCls = computed(() => {
  const { showLogo } = props
  return [
    `${prefix}-side-nav`,
    {
      [`${prefix}-side-nav-no-logo`]: !showLogo
    }
  ]
})
// autoCollapsed是自动收起
// const autoCollapsed = () => {
//   const isCompact = window.innerWidth <= MIN_POINT
//   settingStore.updateConfig({
//     isSidebarCompact: isCompact
//   })
// }

onMounted(() => {
  // autoCollapsed()
  // window.onresize = () => {
  //   autoCollapsed()
  // }
})
// 返回首页
const goHome = () => {
  router.push('/dashboard/base')
}
</script>

<style lang="less" scoped>
:deep(.t-default-menu .t-menu__operations:not(:empty)) {
  padding: 0;
  border-top: 0;
}
:deep(.t-default-menu__inner .t-menu__logo:not(:empty)) {
  border-bottom: 0;
  margin-top: 31px;
}
.logofull {
  width: 121px;
  height: 42px;
  margin-left: -50px;
}
.logo {
  width: 24px;
  height: 27px;
}
:deep(.t-default-menu__inner .t-menu--scroll) {
  // padding-top: 24px !important;
  overflow: hidden;
}
</style>
