<!-- 上下标签tab布局layout，目前短暂弃用 -->
<template>
  <t-layout :class="`${prefix}-layout ${sideNavCls}`">
    <t-tabs
      v-if="settingStore.isUseTabsRouter"
      theme="card"
      :class="`${prefix}-layout-tabs-nav`"
      :value="$route.path"
      :style="{ position: 'sticky', top: 0, width: '100%' }"
      @change="handleChangeCurrentTab"
      @remove="handleRemove"
    >
      <t-tab-panel
        v-for="(routeItem, index) in tabRouters"
        :key="`${routeItem.path}_${index}`"
        :value="routeItem.path"
        :removable="!routeItem.isHome"
      >
        <template #label>
          <t-dropdown
            trigger="context-menu"
            :min-column-width="128"
            :popup-props="{
              overlayClassName: 'route-tabs-dropdown',
              onVisibleChange: (visible, ctx) =>
                handleTabMenuClick(visible, ctx, routeItem.path),
              visible: activeTabPath === routeItem.path
            }"
          >
            <template v-if="!routeItem.isHome">
              {{ routeItem.title }}
            </template>
            <t-icon v-else name="home" />
            <template #dropdown>
              <t-dropdown-menu>
                <t-dropdown-item @click="() => handleRefresh(routeItem, index)">
                  <t-icon name="refresh" />
                  刷新
                </t-dropdown-item>
                <t-dropdown-item
                  v-if="index > 1"
                  @click="() => handleCloseAhead(routeItem.path, index)"
                >
                  <t-icon name="arrow-left" />
                  关闭左侧
                </t-dropdown-item>
                <t-dropdown-item
                  v-if="index < tabRouters.length - 1"
                  @click="() => handleCloseBehind(routeItem.path, index)"
                >
                  <t-icon name="arrow-right" />
                  关闭右侧
                </t-dropdown-item>
                <t-dropdown-item
                  v-if="tabRouters.length > 2"
                  @click="() => handleCloseOther(routeItem.path, index)"
                >
                  <t-icon name="close-circle" />
                  关闭其它
                </t-dropdown-item>
              </t-dropdown-menu>
            </template>
          </t-dropdown>
        </template>
      </t-tab-panel>
    </t-tabs>
    <t-content :class="`${prefix}-content-layout`">
      <l-breadcrumb
        v-if="
          settingStore.showBreadcrumb && settingStore.style !== 'noSecondMenu'
        "
      />
      <l-content />
    </t-content>
    <div class="companyFooter">
      Copyright @ 2019-2020 Tencent. All Rights Reserved
    </div>
  </t-layout>
</template>

<script setup lang="ts">
import { nextTick, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSettingStore, useTabsRouterStore } from '@/store'
import { prefix } from '@/config/global'
import type { TRouterInfo } from '@/types/interface'

import LContent from './Content.vue' //
import LBreadcrumb from './Breadcrumb.vue'

const route = useRoute()
const router = useRouter()

const settingStore = useSettingStore()
const tabsRouterStore = useTabsRouterStore()
// 计算当前tab路由
const tabRouters = computed(() =>
  tabsRouterStore.tabRouters.filter((route) => route.isAlive || route.isHome)
)
const activeTabPath = ref('')
// 生命周期
onMounted(() => {
  // 监听页面滚动事件
  document
    .querySelector('.czri-layout')
    .addEventListener('scroll', scrolling, true)
})
// 页面滚动，根据滚动距离显示隐藏tab
const scrolling = (e) => {
  let setDom = <HTMLImageElement>document.querySelector('.set')
  if (!setDom) return
  if (e.target.scrollTop > 0) {
    setDom.style.display = 'none'
  } else {
    setDom.style.display = 'block'
  }
}
// 处理tab操作后的效果
const handleChangeCurrentTab = (path: string) => {
  const { tabRouters } = tabsRouterStore
  const route = tabRouters.find((i) => i.path === path)
  router.push({ path, query: route.query })
}
// handleRemove是关闭tab的回调
const handleRemove = ({ value: path, index }) => {
  const { tabRouters } = tabsRouterStore
  const nextRouter = tabRouters[index + 1] || tabRouters[index - 1]

  tabsRouterStore.subtractCurrentTabRouter({ path, routeIdx: index })
  if (path === route.path)
    router.push({ path: nextRouter.path, query: nextRouter.query })
}
// handleRefresh是刷新tab的回调
const handleRefresh = (route: TRouterInfo, routeIdx: number) => {
  tabsRouterStore.toggleTabRouterAlive(routeIdx)
  nextTick(() => {
    tabsRouterStore.toggleTabRouterAlive(routeIdx)
    router.replace({ path: route.path, query: route.query })
  })
  activeTabPath.value = null
}
// handleTabMenuClick是tab右键菜单的回调
const handleCloseAhead = (path: string, routeIdx: number) => {
  tabsRouterStore.subtractTabRouterAhead({ path, routeIdx })

  handleOperationEffect('ahead', routeIdx)
}
// 关闭右侧
const handleCloseBehind = (path: string, routeIdx: number) => {
  tabsRouterStore.subtractTabRouterBehind({ path, routeIdx })

  handleOperationEffect('behind', routeIdx)
}
// 关闭其它
const handleCloseOther = (path: string, routeIdx: number) => {
  tabsRouterStore.subtractTabRouterOther({ path, routeIdx })

  handleOperationEffect('other', routeIdx)
}

// 处理非当前路由操作的副作用
const handleOperationEffect = (
  type: 'other' | 'ahead' | 'behind',
  routeIndex: number
) => {
  const currentPath = router.currentRoute.value.path
  const { tabRouters } = tabsRouterStore

  const currentIdx = tabRouters.findIndex((i) => i.path === currentPath)
  // 存在三种情况需要刷新当前路由
  // 点击非当前路由的关闭其他、点击非当前路由的关闭左侧且当前路由小于触发路由、点击非当前路由的关闭右侧且当前路由大于触发路由
  const needRefreshRouter =
    (type === 'other' && currentIdx !== routeIndex) ||
    (type === 'ahead' && currentIdx < routeIndex) ||
    (type === 'behind' && currentIdx === -1)
  if (needRefreshRouter) {
    const nextRouteIdx = type === 'behind' ? tabRouters.length - 1 : 1
    const nextRouter = tabRouters[nextRouteIdx]
    router.push({ path: nextRouter.path, query: nextRouter.query })
  }

  activeTabPath.value = null
}
// tab右键菜单的回调
const handleTabMenuClick = (visible: boolean, ctx, path: string) => {
  if (ctx.trigger === 'document') activeTabPath.value = null
  if (visible) activeTabPath.value = path
}
// 计算tab的宽度，之后计算tab的滚动距离，使tab处于可视区域，如果tab的宽度大于可视区域的宽度，就需要滚动
const sideNavCls = computed(() => {
  return settingStore.isSidebarCompact ? `${prefix}-content-compact` : ''
})
</script>
