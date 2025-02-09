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
        <!-- 处理结果 -->
        <template #processingResult="{ row }">
          {{ row.processingResult ? row.processingResult : '--' }}
        </template>
        <!-- end -->
        <!-- 处理人 -->
        <template #processor="{ row }">
          {{ row.processor ? row.processor : '--' }}
        </template>
        <!-- end -->
        <!-- 处理时间 -->
        <template #processingTime="{ row }">
          {{ row.processingTime ? row.processingTime : '--' }}
        </template>
        <!-- end -->
        <!-- 操作栏 -->
        <template #op="{ row }">
          <div class="operateCon">
            <a
              class="font-bt"
              :class="row.status === 3 ? 'disabled' : ''"
              @click="handleOpen(row)"
              >处理</a
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
// 行的key
const rowKey = 'index'
const emit = defineEmits(['handleOpen', 'getCurrent', 'handleCancelOpen'])
// 打开操作弹窗
const handleOpen = (val) => {
  if (val.status === 2) {
    emit('handleOpen', val)
  }
}
// 点击翻页
const onPageChange = (pageInfo) => {
  emit('getCurrent', pageInfo)
}
</script>
