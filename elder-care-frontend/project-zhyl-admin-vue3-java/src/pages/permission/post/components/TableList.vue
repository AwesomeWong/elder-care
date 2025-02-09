<!-- 职位表格组件 -->
<template>
  <div class="deptAdmin baseList">
    <div class="tableBoxs">
      <div class="newBox">
        <div class="bt" @click="handleBulid()">新增职位</div>
      </div>
      <t-table
        :data="data"
        :columns="COLUMNS"
        rowKey="id"
        vertical-align="middle"
        :hover="true"
        :loading="dataLoading"
        :sort="sort"
        :filter-value="filterValue"
        :show-sort-column-bg-color="true"
        table-layout="auto"
        :selected-row-keys="selectedRowKeys"
        select-on-row-click
        @filter-change="FilterChange"
        @sort-change="sortChange"
        @select-change="rehandleSelectChange"
      >
        <!-- 描述 -->
        <template #description="{ row }">
          <div
            :class="{
              description: true,
              descriptionheight: row.description.length > 18
            }"
          >
            <span>{{ row.description }}</span>
            <span v-if="row.description.length > 36" class="hover">{{
              row.description
            }}</span>
          </div>
        </template>
        <!-- end -->
        <!-- 更新时间-->
        <template #updateTime="{ row }">
          <div class="updateTime">
            <span>{{ row.updateTime }}</span>
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
          <a class="font-bt line" @click="handleSetupContract(row)">编辑</a>
        </template>
        <!-- end -->
        <!-- end -->
        <!-- 暂无数据 -->
        <template #empty>
          <NoData></NoData>
        </template>
        <!-- end -->
      </t-table>
      <!-- 分页 -->
      <t-pagination
        v-if="pagination.total > 10"
        v-model="pagination.pageNum"
        v-model:pageSize="pagination.pageSize"
        :total="pagination.total"
        @change="onPageChange"
      />
      <!-- end -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { COLUMNS } from '../constants' // 表格列
// 组件
import NoData from '@/components/noData/index.vue'

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
  'getCurrent',
  'handleClickDisable'
])

// 监听器赋值
watch(props, () => {
  data.value = props.listData
  dataLoading.value = false
})

// 排序
const sort = ref({
  // 按照服务调用次数进行排序
  sortBy: 'serviceCallNumber'
})
// 表格数据
const data: any = ref([])
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
const handleSetupContract = (val) => {
  emit('handleSetupContract', val)
}
// 点击禁用/启用
const handleClickDisable = (row: { rowIndex: any }) => {
  emit('handleClickDisable', row)
}
// 点击删除
const handleClickDelete = (row: { rowIndex: any }) => {
  emit('handleClickDelete', row)
}
// 点击新建
const handleBulid = () => {
  emit('handleBulid')
}
// 点击翻页
const onPageChange = (val) => {
  emit('getCurrent', val)
}
</script>
<style lang="less" scoped src="../../index.less"></style>
