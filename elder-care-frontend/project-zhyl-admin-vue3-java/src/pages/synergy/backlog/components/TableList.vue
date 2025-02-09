<!-- 基础表格组件 -->
<template>
  <div class="baseList">
    <div class="tableBoxs">
      <t-table
        :data="listData"
        :columns="pagination.isHandle === 0 ? COLUMNS : COLUMNS2"
        :row-key="rowKey"
        vertical-align="middle"
        :hover="true"
        :loading="dataLoading"
        table-layout="fixed"
        table-content-width="100%"
      >
        <!-- 序号 -->
        <template #rowIndex="{ rowIndex }">{{ rowIndex + 1 }}</template>
        <!-- end -->
        <!--  -->
        <template #type="{ row }">
          <span v-if="row.type === 1">退住</span>
          <span v-else-if="row.type === 2">请假</span>
          <span v-else>入住</span>
        </template>
        <!-- end -->
        <!-- 等待时长 -->
        <template #waitingTime="{ row }">
          {{ getTimeData(row.applicationTime) }}
        </template>
        <!-- end -->
        <!-- 完成时间 -->
        <template #finishTime="{ row }">
          {{ row.finishTime ? row.finishTime : '--' }}
        </template>
        <!-- end -->
        <!-- 操作栏 -->
        <template #op="{ row }">
          <div class="operateCon">
            <a
              v-if="pagination.isHandle === 0"
              class="font-bt"
              @click="handleOpen(row)"
              >处理</a
            >
            <a v-else class="font-bt" @click="handleOpen(row)">查看</a>
          </div>
        </template>
        <!-- end -->
        <!-- 暂无数据 -->
        <template #empty>
          <NoData></NoData>
        </template>
        <!-- end -->
      </t-table>
      <!-- 分页 -->
      <t-pagination
        v-if="total > 10"
        v-model="pagination.pageNum"
        v-model:pageSize="pagination.pageSize"
        :total="total"
        @change="onPageChange"
      />
      <!-- end -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { COLUMNS, COLUMNS2 } from '../constants' // 表格列
import { useUserStore } from '@/store'
// 组件
import NoData from '@/components/noData/index.vue'

// 获取父级数据
const props = defineProps({
  // 列表数据
  listData: {
    type: Object,
    default: () => {
      return []
    }
  },
  // 总条数
  total: {
    type: Number,
    default: 0
  },
  // 分页
  pagination: {
    type: Object,
    default: () => ({})
  },
  // 加载状态
  dataLoading: {
    type: Boolean,
    default: false
  }
})
// ------定义变量------
const router = useRouter() // 获取全局
const userStore = useUserStore()
// 行的key
const rowKey = 'index'
const emit = defineEmits(['handleOpen', 'getCurrent'])
// 打开操作弹窗
const handleOpen = (val) => {
  userStore.setEnterBaseData({})
  if (val.type === 1) {
    router.push({
      path: `/active/applyDetails`,
      query: {
        assigneeId: val.assigneeId,
        code: val.code,
        isHandle: val.isHandle,
        taskId: val.id,
        path: 'backlogAfter'
      }
    })
  } else if (val.type === 2) {
    console.log(val)
  } else {
    router.push({
      path: `/active/checkDetails`,
      query: {
        assigneeId: val.assigneeId,
        code: val.code,
        isHandle: val.isHandle,
        taskId: val.id,
        path: 'backlogAfter'
      }
    })
  }
}
// 获取时间戳
const getTimeData = (time) => {
  const date = new Date(time)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const h = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()

  return CountDown(y, m, d, h, min, sec)
}
// 等待时长
const CountDown = (year, month, day, hours, min, sec) => {
  const now = new Date()
  const endDate = new Date(year, month - 1, day, hours, min, sec)
  let leftTime = now.getTime() - endDate.getTime() // 计算剩余的毫秒数
  if (leftTime <= 0) {
    leftTime = 0
  }
  const leftsecond = parseInt(leftTime / 1000) // 计算剩余的秒数
  day = Math.floor(leftsecond / (60 * 60 * 24))
  const hour = Math.floor((leftsecond - day * 24 * 60 * 60) / 3600)
  const minute = Math.floor(
    (leftsecond - day * 24 * 60 * 60 - hour * 3600) / 60
  )
  const second = Math.floor((leftTime / 1000) % 60, 10)
  let times = ''
  if (day > 0) {
    times = `${day}天${hour}小时${minute}分钟${second}秒`
  } else if (hour > 0) {
    times = `${hour}小时${minute}分钟${second}秒`
  } else if (minute > 0) {
    times = `${minute}分钟${second}秒`
  } else {
    times = `${second}秒`
  }

  return times
}
// 点击翻页
const onPageChange = (pageInfo) => {
  emit('getCurrent', pageInfo)
}
</script>
