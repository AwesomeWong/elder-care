<!-- 基础表格组件 -->
<template>
  <div class="deptAdmin baseList">
    <div class="tableBoxs">
      <div class="newBox">
        <button class="bt newBoxbutton" @click="handleBulid()">新增部门</button>
      </div>
      <t-table
        :data="data"
        :columns="COLUMNS"
        row-key="deptNo"
        vertical-align="middle"
        :hover="true"
        :expanded-row-keys="expandedRowKeys"
        :expand-on-row-click="expandOnRowClick"
        :expand-icon="expandIcon"
        :selected-row-keys="selectedRowKeys"
        :loading="dataLoading"
        :sort="sort"
        :filter-value="filterValue"
        :hide-sort-tips="true"
        :show-sort-column-bg-color="true"
        table-layout="auto"
        @filter-change="FilterChange"
        @sort-change="sortChange"
        @select-change="rehandleSelectChange"
        @expand-change="rehandleExpandChange"
      >
        <!-- 更新时间-->
        <template #updateTime="{ row }">
          <div class="updateTime">
            <span>{{ row.updateTime || `2023-3-23 3:33:33` }}</span>
          </div>
        </template>
        <!-- end -->
        <!-- 在操作栏添加删除、编辑、查看三种操作 -->
        <template #op="{ row }">
          <a
            class="btn-dl line btn-split-right pdo"
            @click="handleClickDelete(row)"
            >删除</a
          >
          <a
            :class="`${
              row.dataState === '0' ? 'btn-dl' : ''
            } line btn-split-right`"
            @click="handleClickDisable(row)"
            >{{ row.dataState === '0' ? '禁用' : '启用' }}</a
          >
          <a class="font-bt line" @click="handleSetupContract(row, 'edit')"
            >编辑</a
          >
          <a
            class="font-bt btn-split-left"
            @click="handleSetupContract(row, 'add')"
            >新增部门</a
          >
        </template>
        <!-- end -->
        <!-- 展开 -->
        <template #expandedRow="{ row }">
          <Table
            :rowData="row"
            @handleSetupContract="handleSetupContract"
            @handleBulid="handleBulid"
            @handleClickDelete="handleClickDelete"
            @handleClickDisable="handleClickDisable"
            @fetchData="fetchData"
          ></Table>
        </template>
        <!-- end -->
        <!-- 暂无数据 -->
        <template #empty>
          <NoData></NoData>
        </template>
        <!-- end -->
      </t-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { COLUMNS } from '../constants' // 表格列
// 组件
import NoData from '@/components/noData/index.vue'
import Table from './Table.vue'

const expandIcon = ref(true)
const expandOnRowClick = ref(false)
const expandedRowKeys = ref([])

// 展开列表
const rehandleExpandChange = (value) => {
  console.log(value, 'value')
  // alert(value)
  expandedRowKeys.value = value
}

const props = defineProps({
  listData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  pagination: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const emit = defineEmits([
  'fetchData',
  'handleSetupContract',
  'handleBulid',
  'handleClickDelete',
  'handleClickDisable'
])

// 监听器赋值
watch(props, () => {
  data.value = props.listData
  pagination.value = props.pagination
  dataLoading.value = false
})

// 排序
const sort = ref({
  // 按照服务调用次数进行排序
  sortBy: 'serviceCallNumber'
})
// 表格数据
const data: any = ref([])
// 分页
const pagination: any = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1 // 默认当前页
})
// 行的key
const filterValue = ref({
  status: ''
}) // 过滤
// 加载状态
const dataLoading = ref(true)

// 排序
const sortChange = (val) => {
  // 将排序的结果赋值给sort
  sort.value = val
  // 调用onFilterChange方法进行排序
  onFilterChange(val)
}
// 模拟异步请求进行排序
const onFilterChange = (val) => {
  emit('fetchData', val)
}
// 筛选
const FilterChange = (val) => {
  ONFilterChange(val)
}
// 模拟异步请求进行筛选
const ONFilterChange = (val) => {
  emit('fetchData', val)
}

// 选中的行
const selectedRowKeys = ref([1, 2])
const rehandleSelectChange = (val: number[]) => {
  selectedRowKeys.value = val
}
// 打开编辑弹窗
const handleSetupContract = (val, tg) => {
  // 这个方法可能是递归子组件来的 所有需要判断
  if (val.tg) {
    emit('handleSetupContract', { ...val })
  } else {
    emit('handleSetupContract', { data: val, tg })
  }
}
// 点击删除
const deleteIdx = ref(-1) // 删除的索引
const handleClickDelete = (row: { rowIndex: any }) => {
  emit('handleClickDelete', row)
  deleteIdx.value = row.rowIndex
}

// 点击禁用/启用
const handleClickDisable = (row: { rowIndex: any }) => {
  emit('handleClickDisable', row)
}

// 点击新建
const handleBulid = () => {
  emit('handleBulid')
}
// 事件传递 - 递归组件的且套
const fetchData = () => {
  console.log('tableList')
  emit('fetchData')
}
</script>

<style lang="less" scoped src="../../index.less"></style>
