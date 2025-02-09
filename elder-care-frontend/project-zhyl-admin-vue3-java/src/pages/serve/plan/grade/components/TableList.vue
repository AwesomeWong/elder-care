<!-- 基础表格组件 -->
<template>
  <div class="baseList">
    <div class="tableBoxs">
      <div class="newBox">
        <button class="bt wt-120" @click="handleBulid()">新增护理等级</button>
      </div>
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
        <!-- 护理费用 -->
        <template #fee="{ row }">{{
          isDecimals(row.fee) ? row.fee : row.fee + '.00'
        }}</template>
        <!-- end -->
        <!-- 操作栏 -->
        <template #op="{ row }">
          <div class="operateCon">
            <a
              class="btn-dl"
              :class="row.cid !== undefined ? 'disabled' : ''"
              @click="handleClickDelete(row)"
              >删除</a
            >
            <a
              class="font-bt"
              :class="row.cid !== undefined ? 'disabled' : ''"
              @click="handleEdit(row)"
              >编辑</a
            >
            <a
              :class="row.status === 1 ? 'btn-dl' : 'font-bt'"
              @click="handleForbidden(row)"
              >{{ row.status === 1 ? '禁用' : '启用' }}</a
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
// 表格
import { COLUMNS } from '../constants' // 表格列
// 校验
import { isDecimals } from '@/utils/validate'
// 无数据时显示的提示
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
const emit = defineEmits([
  'handleEdit',
  'handleBulid',
  'handleClickDelete',
  'handleForbidden',
  'getCurrent'
])
// ------定义变量------
// 行的key
const rowKey = 'index'
// 禁用
const handleForbidden = (val) => {
  emit('handleForbidden', val)
}
// 打开编辑弹窗
const handleEdit = (row) => {
  if (row.cid === undefined) {
    emit('handleEdit', row)
  }
}
// 点击删除
const handleClickDelete = (row) => {
  if (row.cid === undefined) {
    emit('handleClickDelete', row)
  }
}
// 点击翻页
const onPageChange = (pageInfo) => {
  emit('getCurrent', pageInfo)
}
// 点击新建
const handleBulid = () => {
  emit('handleBulid')
}
</script>
