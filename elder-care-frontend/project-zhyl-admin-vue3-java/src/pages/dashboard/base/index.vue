<!-- 首页 -->
<template>
  <div class="container home-wrapper">
    <!-- 顶部 card  -->
    <top-panel
      class="row-container"
      :baseData="baseData"
      :roleListData="roleListData"
    />
    <!-- 中部图表  -->
    <middle-chart class="row-container" />
    <!-- 列表排名 -->
    <rank-list class="row-container" />
    <!-- 出入库概览 -->
    <!-- <output-overview class="row-container" /> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import TopPanel from './components/TopPanel.vue'
import MiddleChart from './components/MiddleChart.vue'
import RankList from './components/RankList.vue'
import OutputOverview from './components/OutputOverview.vue'
import { getpersonal } from '@/api/user'

const baseData = ref({}) // 用户信息
const roleListData = ref('') // 角色
const getpersonalData = async () => {
  const res = await getpersonal()
  baseData.value = res.data
  const arr = []
  baseData.value.roleLabels.forEach((ele) => {
    arr.push(ele)
  })
  roleListData.value = arr.join(',')
}
onMounted(() => {
  getpersonalData()
})
</script>
<style lang="less" src="./../index.less"></style>
<style scoped>
.row-container:not(:last-child) {
  margin-bottom: 16px;
}
:deep() .t-card__body {
  padding-top: 0;
}
:deep(a) {
  cursor: pointer;
}
:deep(a:active) {
  color: #1c55cf;
}
:deep(a:hover) {
  color: rgba(0, 97, 253, 0.8);
}
</style>
