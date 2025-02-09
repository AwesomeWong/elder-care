<!-- 详情 -->
<template>
  <div class="detail-base">
    <div class="bg-wt min-steph">
      <!-- 基本信息 -->
      <BaseInfo :base-data="baseData"></BaseInfo>
      <!-- end -->
      <!-- 护理项目 -->
      <ServeProject :base-data="baseData"></ServeProject>
      <!-- end -->
      <!-- 执行记录 -->
      <div>
        <ExcuteAccord
          v-if="baseData.status === 2"
          :base-data="baseData"
        ></ExcuteAccord>
      </div>
      <!-- end -->
      <!-- end -->
      <!-- 取消记录 -->
      <div>
        <CancelAccord
          v-if="baseData.cancelReason"
          :base-data="baseData"
        ></CancelAccord>
      </div>
      <!-- end -->
    </div>
  </div>
  <div class="boxBottom fx fx-ct bg-wt">
    <button class="bt-grey wt-60" @click="handleReturn">返回</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// 接口
import { getTaskDetail } from '@/api/serve'
// 组件
// 基本信息
import BaseInfo from './components/BaseInfo.vue'
// 护理项目
import ServeProject from './components/serveProject.vue'
// // 执行记录
import ExcuteAccord from './components/excuteAccord.vue'
// // 取消记录
import CancelAccord from './components/cancelAccord.vue'
// ------定义变量------
const route = useRoute() // 获取局部
const router = useRouter() // 获取全局
const defaultCurrent = ref(0) // step 当前的选择
const baseData = ref<Object | any>({})
const taskId = ref('') // 账单id
// 生命周期
onMounted(() => {
  taskId.value = route.query.id
  getBaseData()
})
// ------定义方法------
// // 获取列表数据
const getBaseData = async () => {
  const res: any = await getTaskDetail({ taskId: taskId.value }) // 获取列表数据
  if (res.code === 200) {
    baseData.value = res.data
  }
}
// 返回
const handleReturn = () => {
  router.push('/serve/arrange')
}
</script>
<style lang="less" scoped>
.min-steph {
  min-height: calc(100vh - 160px);
}
</style>
