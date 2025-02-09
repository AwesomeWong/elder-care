<template>
  <router-view :class="[mode]" />
  <ExpBall></ExpBall>
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingStore } from '@/store'
import STYLE_CONFIG from '@/config/style'
import ExpBall from './components/ExpBall.vue'

const route = useRoute()
const store = useSettingStore()
const mode = computed(() => {
  return store.displayMode
})
onMounted(() => {
  // 修改文件中的配置可以在页面中显示生效
  store.updateConfig(STYLE_CONFIG)
})
// 监听路由变化
watch(
  () => route.path,
  () => {
    const { back } = window.history.state
    // 兼容重新打开一个浏览器窗口此时back为null的情况
    if (!back) return
    // 其中从登录页跳转之后的api也需要保留
    if (back.indexOf('/login?') === -1) {
      store.clearRequestList()
    }
  }
)
</script>

<style lang="less" scoped>
#nprogress .bar {
  background: var(--td-brand-color) !important;
}
</style>
