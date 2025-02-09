<!-- 基础表格组件 -->
<template>
  <div class="baseList">
    <div class="tableBoxs">
      <t-table
        :data="listData"
        :columns="
          taskStatus === 1
            ? COLUMNS
            : taskStatus === 2
            ? EXECUTE_COLUMNS
            : CANCEL_COLUMNS
        "
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
        <!-- 护理员 -->
        <template #nursingName="{ row }">{{
          row.nursingName ? row.nursingName.join(',') : '--'
        }}</template>
        <!-- end -->
        <!-- 老人姓名 -->
        <template #elderName="{ row }">{{ row.elderName || '--' }}</template>
        <!-- end -->
        <!-- 床位号 -->
        <template #bedNumber="{ row }">{{ row.bedNumber || '--' }}</template>
        <!-- end -->
        <!-- 项目类型 -->
        <template #taskType="{ row }">{{
          row.taskType === 2 ? '护理计划内' : '护理计划外'
        }}</template>
        <!-- end -->
        <!-- 项目类型 -->
        <template #creator="{ row }">{{
          row.taskType === 2 ? '系统' : row.creator
        }}</template>
        <!-- 取消人 -->
        <template #updater="{ row }">{{
          row.updater ? row.updater : '--'
        }}</template>
        <!-- end -->
        <!-- end -->
        <!-- 操作栏 -->
        <template #op="{ row }">
          <div class="operateCon">
            <a v-if="row.status === 1" class="btn-dl" @click="handleCancel(row)"
              >取消</a
            >
            <a class="font-bt" @click="handleCheck(row)">查看</a>
            <a
              v-if="row.status === 1"
              class="font-bt"
              @click="handleExecute(row)"
              >执行</a
            >
            <a
              v-if="row.status === 1"
              class="font-bt"
              @click="handleChangeDate(row)"
              >改期</a
            >
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
// 表格
import { COLUMNS, EXECUTE_COLUMNS, CANCEL_COLUMNS } from '../constants' // 表格列
// 无数据时显示的提示
import NoData from '@/components/noData/index.vue'
// 获取父级数据
const props = defineProps({
  taskStatus: {
    type: Number,
    default: 1
  },
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
const emit = defineEmits([
  'handleCancel',
  'handleTime',
  'handleExecute',

  'handleEdit',
  'handleClickDelete',
  'handleForbidden',
  'getCurrent'
])
// ------定义变量------
const router = useRouter() // 获取全局
// 行的key
const rowKey = 'index'
// 取消
const handleCancel = (row) => {
  emit('handleCancel', row)
  console.log(row)
}
// 查看
const handleCheck = (val) => {
  router.push({
    path: `/serve/serveDetails`,
    query: {
      id: val.id
    }
  })
}
// 执行
const handleExecute = (row) => {
  emit('handleExecute', row)
  console.log(row)
}
// 改期
const handleChangeDate = (row) => {
  emit('handleTime', row)
  console.log(row)
}
// 点击翻页
const onPageChange = (pageInfo) => {
  emit('getCurrent', pageInfo)
}
</script>
