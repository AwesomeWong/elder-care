<!-- 基础表格组件 -->
<template>
  <div class="baseList">
    <div class="tableBoxs">
      <div class="newBox">
        <button class="bt wt-120" @click="handleAdd()">新增报警规则</button>
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
        <!-- 操作栏 -->
        <template #op="{ row }">
          <div class="operateCon">
            <a class="btn-dl" @click="handleClickDelete(row)">删除</a>
            <a class="font-bt" @click="handleEdit(row)">编辑</a>
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
const emit = defineEmits([
  'getCurrent',
  'handleForbidden',
  'handleBulid',
  'handleClickDelete'
])
// 打开编辑弹窗
const handleEdit = (val) => {
  router.push({
    path: `/intelligence/ruleDetails`,
    query: { id: val.id }
  })
}
// 点击删除
const handleClickDelete = (row) => {
  emit('handleClickDelete', row)
}
// 点击翻页
const onPageChange = (pageInfo) => {
  emit('getCurrent', pageInfo)
}
// 禁用
const handleForbidden = (val) => {
  emit('handleForbidden', val)
}
// 点击新建
const handleAdd = () => {
  router.push({
    path: `/intelligence/ruleDetails`,
    query: { id: null }
  })
}
</script>
