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
        <!-- 退款金额 -->
        <template #refundAmount="{ row }">{{
          decimalsReplenish(row.refundAmount)
        }}</template>
        <!-- end -->
        <!-- 申请人 -->
        <template #creator="{ row }">{{
          row.creator ? row.creator : row.adminCreator
        }}</template>
        <!-- end -->
        <!-- 退款时间 -->
        <template #updateTime="{ row }">{{
          row.updateTime ? row.updateTime : '--'
        }}</template>
        <!-- end -->
        <!-- 操作栏 -->
        <template #op="{ row }">
          <div class="operateCon">
            <a class="font-bt" @click="handleOpen(row)">查看</a>
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
import { decimalsReplenish } from '@/utils/index'
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
const emit = defineEmits(['handleOpen', 'getCurrent'])
// 打开操作弹窗
const handleOpen = (val) => {
  emit('handleOpen', val)
}
// 点击翻页
const onPageChange = (pageInfo) => {
  emit('getCurrent', pageInfo)
}
</script>
