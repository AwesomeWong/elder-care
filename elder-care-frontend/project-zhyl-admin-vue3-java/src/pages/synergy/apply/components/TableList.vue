<!-- 基础表格组件 -->
<template>
  <div class="baseList">
    <div class="tableBoxs">
      <t-table
        :data="listData"
        :columns="COLUMNS"
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
        <template #type="{ row }">
          <span v-if="row.type === 1">退住</span>
          <span v-else-if="row.type === 2">请假</span>
          <span v-else>入住</span>
        </template>
        <!-- 完成时间-->
        <template #finishTime="{ row }">
          {{ row.finishTime ? row.finishTime : '--' }}
        </template>
        <!-- end -->
        <!-- 在操作栏添加删除、编辑、查看三种操作 -->
        <template #op="{ row }">
          <div class="operateCon">
            <a
              class="font-bt"
              :class="
                row.status === 2 ||
                row.status === 3 ||
                (row.status === 1 && row.flowStatus > 5)
                  ? 'disabled'
                  : ''
              "
              @click="handleOpen(row)"
              >撤销</a
            >
            <a class="font-bt" @click="handleRevocation(row)">查看</a>
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
import { COLUMNS } from '../constants' // 表格列
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
// 行的key
const rowKey = 'index'
const emit = defineEmits(['handleOpen', 'getCurrent'])
// 打开操作弹窗
const handleRevocation = (val) => {
  if (val.type === 1) {
    router.push({
      path: `/active/applyDetails`,
      query: {
        assigneeId: val.assigneeId,
        code: val.code,
        taskId: val.id,
        path: 'apply'
      }
    })
  } else if (val.type === 2) {
    console.log(val.type)
  } else {
    router.push({
      path: `/active/checkDetails`,
      query: {
        assigneeId: val.assigneeId,
        code: val.code,
        taskId: val.id,
        path: 'apply'
      }
    })
  }
}
// 点击翻页
const onPageChange = (pageInfo) => {
  emit('getCurrent', pageInfo)
}
// 打开撤回弹层
const handleOpen = (val) => {
  if (val.type === 1 && val.status === 1 && val.flowStatus <= 5) {
    emit('handleOpen', val)
  }
  if (val.type === 3 && val.status === 1) {
    emit('handleOpen', val)
  }
}
</script>
