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
        <!-- 订单金额 -->
        <template #amount="{ row }">{{
          decimalsReplenish(row.amount)
        }}</template>
        <!-- end -->
        <!-- 操作栏 -->
        <template #op="{ row }">
          <div class="operateCon">
            <a
              class="font-bt"
              :class="row.status !== 0 ? 'disabled' : ''"
              @click="handleCancel(row)"
              >取消</a
            >
            <a
              class="font-bt"
              :class="
                (row.status === 1 && !row.refundRecordVo.refundStatus) ||
                (row.status === 1 && row.refundRecordVo.refundStatus === 3) ||
                row.status === 2
                  ? ''
                  : 'disabled'
              "
              @click="handleRefund(row)"
              >退款</a
            >
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
import { useRouter } from 'vue-router'
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
const router = useRouter() // 获取全局
// 行的key
const rowKey = 'index'
const emit = defineEmits([
  'handleOpen',
  'getCurrent',
  'handleCancel',
  'handleRefund'
])
// 打开操作弹窗
const handleOpen = (val) => {
  console.log(val)
  router.push({
    path: `/order/orderDetails`,
    query: { id: val.id }
  })
}
// 取消
const handleCancel = (row) => {
  if (row.status === 0) {
    emit('handleCancel', row)
  }
}
// 退款
const handleRefund = (row) => {
  if (
    (row.status === 1 && !row.refundRecordVo.refundStatus) ||
    (row.status === 1 && row.refundRecordVo.refundStatus === 3) ||
    row.status === 2
  ) {
    emit('handleRefund', row)
  }
}
// 点击翻页
const onPageChange = (pageInfo) => {
  emit('getCurrent', pageInfo)
}
</script>
