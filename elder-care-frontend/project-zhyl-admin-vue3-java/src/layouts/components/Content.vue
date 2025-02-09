<!-- 内置组件，避免重复渲染DOM -->
<template>
  <router-view v-if="!isRefreshing" v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive :include="aliveViews">
        <div>
          <component :is="Component" />
        </div>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useTabsRouterStore } from '@/store'

// aliveViews是一个数组，里面存放的是当前页面的name
const aliveViews = computed(() => {
  const tabsRouterStore = useTabsRouterStore()
  const { tabRouters } = tabsRouterStore

  return tabRouters.filter((route) => route.isAlive).map((route) => route.name)
}) as ComputedRef<string[]>
// isRefreshing是一个布尔值，用来判断是否正在刷新页面
const isRefreshing = computed(() => {
  const tabsRouterStore = useTabsRouterStore()
  const { refreshing } = tabsRouterStore
  return refreshing
})
</script>
<style lang="less" scoped>
.fade-leave-active,
.fade-enter-active {
  transition: opacity @anim-duration-slow @anim-time-fn-easing;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
