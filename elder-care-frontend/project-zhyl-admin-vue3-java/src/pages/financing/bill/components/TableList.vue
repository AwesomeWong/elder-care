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
        <!-- 账单 -->
        <template #billType="{ row }">
          {{ row.billType === 1 ? '费用账单' : '月度账单' }}
        </template>
        <!-- end -->
        <!-- 账单金额 -->
        <template #billAmount="{ row }">
          {{
            isDecimals(row.billAmount)
              ? decimalsReplenish(row.billAmount)
              : row.billAmount + '.00'
          }}
        </template>
        <!-- end -->
        <!-- 应付金额 -->
        <template #payableAmount="{ row }">
          {{
            isDecimals(row.payableAmount)
              ? decimalsReplenish(row.payableAmount)
              : row.payableAmount + '.00'
          }}
        </template>
        <!-- end -->
        <!-- 操作栏 -->
        <template #op="{ row }">
          <div class="operateCon">
            <!-- 账单状态（0：未支付，1已支付, 2已关闭） -->
            <a
              class="font-bt"
              :class="
                (row.transactionStatus !== 0 && row.billType === 0) ||
                (row.transactionStatus <= 2 && row.billType === 1)
                  ? 'disabled'
                  : ''
              "
              @click="handlePay(row)"
              >支付</a
            >
            <a
              class="font-bt"
              :class="row.transactionStatus !== 0 ? 'disabled' : ''"
              @click="handleCancel(row)"
              >取消</a
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
import { isDecimals } from '@/utils/validate'
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
const emit = defineEmits(['handleOpen', 'getCurrent', 'handleCancelOpen'])
// 打开操作弹窗
const handleOpen = (val) => {
  router.push({
    path: `/finance/billDetails`,
    query: {
      id: val.id
    }
  })
}
// 支付
const handlePay = (row) => {
  if (
    (row.transactionStatus !== 0 && row.billType === 0) ||
    (row.transactionStatus <= 2 && row.billType === 1)
  ) {
    return false
  }
  emit('handleOpen', row.id)
}
// 取消
const handleCancel = (row) => {
  if (row.transactionStatus !== 0) {
    return false
  }
  emit('handleCancelOpen', row)
}
// 点击翻页
const onPageChange = (pageInfo) => {
  emit('getCurrent', pageInfo)
}
</script>
